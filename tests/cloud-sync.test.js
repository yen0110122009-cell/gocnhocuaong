import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const appPath = path.resolve(here, '..', 'assets', 'js', 'app.js');
const appSource = fs.readFileSync(appPath, 'utf8');
const syncMarker = '/* ---- extracted script block 13: <script id="study-empire-supabase-sync-v2"> ---- */';
const syncStart = appSource.indexOf('(function(){', appSource.indexOf(syncMarker));
const syncEnd = appSource.indexOf('\n})();', syncStart) + '\n})();'.length;
assert.ok(syncStart > 0 && syncEnd > syncStart, 'Không tìm thấy khối Supabase sync trong app.js');
const syncSource = appSource.slice(syncStart, syncEnd);

const clone = value => value === undefined ? undefined : JSON.parse(JSON.stringify(value));

class MemoryStorage {
  constructor(seed = {}) { this.values = new Map(Object.entries(seed)); }
  get length() { return this.values.size; }
  key(index) { return [...this.values.keys()][index] ?? null; }
  getItem(key) { return this.values.has(String(key)) ? this.values.get(String(key)) : null; }
  setItem(key, value) { this.values.set(String(key), String(value)); }
  removeItem(key) { this.values.delete(String(key)); }
  clear() { this.values.clear(); }
}

function response(status, body) {
  const textBody = body === undefined ? '' : JSON.stringify(body);
  return {
    ok: status >= 200 && status < 300,
    status,
    async json() { return body; },
    async text() { return textBody; }
  };
}

function makeHarness({ initialState, remoteState, remoteExternal = null, concurrentPayloadAfterFirstPatch = null, startOffline = false } = {}) {
  const localStorage = new MemoryStorage();
  let serverPayload = {
    ...(clone(remoteState) || {}),
    __studyEmpireSync: {
      version: 2,
      externalStores: remoteExternal || {},
      clientId: 'remote-client',
      seq: 1,
      savedAt: '2026-01-01T00:00:00.000Z'
    }
  };
  const calls = [];
  let saveStateCalls = 0;
  let patchCount = 0;
  let networkOnline = !startOffline;

  const state = clone(initialState || { userData: { _initialized: true, accounts: {} } });
  const context = {
    console,
    Date,
    JSON,
    Math,
    Promise,
    setTimeout: (fn, _ms, ...args) => setTimeout(fn, 0, ...args),
    clearTimeout,
    localStorage,
    state,
    window: {},
    ensureUserStore() {
      if (!state.userData || typeof state.userData !== 'object') state.userData = {};
      if (!state.userData.accounts || typeof state.userData.accounts !== 'object') state.userData.accounts = {};
    },
    saveStateWithoutSession() { saveStateCalls += 1; },
    fetch: async (url, options = {}) => {
      const method = String(options.method || 'GET').toUpperCase();
      calls.push({ method, url: String(url), body: options.body ? JSON.parse(options.body) : null });
      if (!networkOnline) throw new TypeError('Failed to fetch: simulated network disconnect');
      if (method === 'GET') return response(200, [{ payload: clone(serverPayload) }]);
      if (method === 'PATCH') {
        serverPayload = JSON.parse(options.body).payload;
        patchCount += 1;
        // Mô phỏng thiết bị B hoàn tất push ngay sau PATCH đầu tiên của thiết bị A.
        if (patchCount === 1 && concurrentPayloadAfterFirstPatch) serverPayload = clone(concurrentPayloadAfterFirstPatch);
        return response(204);
      }
      if (method === 'POST') {
        serverPayload = JSON.parse(options.body).payload;
        return response(201);
      }
      return response(405, { error: 'unsupported method' });
    }
  };
  context.window.window = context.window;
  vm.runInNewContext(syncSource, context, { filename: appPath });

  return {
    state: context.state,
    sync: context.window.studyEmpireCloudSync,
    calls,
    get serverPayload() { return clone(serverPayload); },
    get saveStateCalls() { return saveStateCalls; },
    setNetworkOnline(value) { networkOnline = Boolean(value); }
  };
}

function account({ todos = [], habits = {}, savedAt = 0 } = {}) {
  return { _lastSavedAt: savedAt, todos, habits };
}

function stateWithAccount(id, bucket) {
  return {
    sessionAuth: { role: 'Member', memberId: id, code: 'TEST-CODE' },
    userData: { _initialized: true, _version: 2, accounts: { [id]: bucket } },
    todos: clone(bucket.todos),
    habits: clone(bucket.habits)
  };
}

function accountFromPayload(payload, id) {
  return payload?.userData?.accounts?.[id];
}

test('pull → merge → push giữ cả dữ liệu cũ và dữ liệu local, đồng thời tự bổ sung metadata', async () => {
  const id = 'member-test-1';
  const fallbackMs = 1700000000000;
  const remote = stateWithAccount(id, account({
    savedAt: fallbackMs,
    todos: [{ id: 'todo-legacy', title: 'Kế hoạch cũ', date: '2026-08-20', ownerId: id }],
    habits: { '2026-08': [{ id: 'habit-legacy', name: 'Đọc sách', ownerId: id }] }
  }));
  delete remote.sessionAuth;

  const local = stateWithAccount(id, account({
    todos: [{ id: 'todo-local', title: 'Kế hoạch local', date: '2026-08-21', ownerId: id, createdAt: '2026-08-21T08:00:00.000Z', updatedAt: '2026-08-21T08:00:00.000Z' }],
    habits: { '2026-08': [{ id: 'habit-local', name: 'Ôn bài', ownerId: id, createdAt: '2026-08-21T08:00:00.000Z', updatedAt: '2026-08-21T08:00:00.000Z' }] }
  }));

  const h = makeHarness({ initialState: local, remoteState: remote });
  assert.equal(await h.sync.pull(), true);
  await h.sync.flush();

  const pushed = accountFromPayload(h.serverPayload, id);
  assert.equal(pushed.todos.length, 2, 'Merge phải giữ todo remote và local');
  assert.equal(pushed.habits['2026-08'].length, 2, 'Merge phải giữ habit remote và local');

  const legacyTodo = pushed.todos.find(row => row.id === 'todo-legacy');
  const legacyHabit = pushed.habits['2026-08'].find(row => row.id === 'habit-legacy');
  assert.equal(legacyTodo.createdAt, new Date(fallbackMs).toISOString());
  assert.equal(legacyTodo.updatedAt, new Date(fallbackMs).toISOString());
  assert.equal(legacyHabit.createdAt, new Date(fallbackMs).toISOString());
  assert.equal(legacyHabit.updatedAt, new Date(fallbackMs).toISOString());
  assert.ok(h.saveStateCalls > 0, 'Pull phải lưu state local sau migration metadata');
  assert.ok(h.calls.some(call => call.method === 'PATCH'), 'Pull có metadata mới phải push snapshot đã sửa lên cloud');
});

test('push merge giữ bản ghi cloud không có trong local và không ghi đè metadata mới hơn', async () => {
  const id = 'member-test-2';
  const remote = stateWithAccount(id, account({
    savedAt: 1700000000000,
    todos: [
      { id: 'todo-shared', title: 'Bản cloud cũ', date: '2026-08-21', ownerId: id, createdAt: '2026-08-21T07:00:00.000Z', updatedAt: '2026-08-21T07:00:00.000Z' },
      { id: 'todo-remote-only', title: 'Chỉ có trên cloud', date: '2026-08-21', ownerId: id }
    ],
    habits: { '2026-08': [{ id: 'habit-remote-only', name: 'Cloud habit', ownerId: id }] }
  }));
  delete remote.sessionAuth;

  const local = stateWithAccount(id, account({
    todos: [{ id: 'todo-shared', title: 'Bản local mới', date: '2026-08-21', ownerId: id, createdAt: '2026-08-21T08:00:00.000Z', updatedAt: '2026-08-21T09:00:00.000Z' }],
    habits: { '2026-08': [{ id: 'habit-local', name: 'Local habit', ownerId: id, createdAt: '2026-08-21T08:00:00.000Z', updatedAt: '2026-08-21T08:00:00.000Z' }] }
  }));

  const h = makeHarness({ initialState: local, remoteState: remote });
  assert.equal(await h.sync.push(), true);
  const pushed = accountFromPayload(h.serverPayload, id);
  const shared = pushed.todos.find(row => row.id === 'todo-shared');

  assert.equal(shared.title, 'Bản local mới', 'Bản ghi local có updatedAt mới hơn phải thắng');
  assert.ok(pushed.todos.some(row => row.id === 'todo-remote-only'), 'Không được làm mất bản ghi chỉ có trên cloud');
  assert.ok(pushed.habits['2026-08'].some(row => row.id === 'habit-remote-only'), 'Không được làm mất habit chỉ có trên cloud');
  assert.ok(pushed.habits['2026-08'].some(row => row.id === 'habit-local'), 'Phải giữ habit local');
});

test('push giữ nguyên metadata đã có và bổ sung metadata cho bản ghi mới', async () => {
  const id = 'member-test-3';
  const createdAt = '2026-08-01T10:00:00.000Z';
  const updatedAt = '2026-08-21T10:00:00.000Z';
  const local = stateWithAccount(id, account({
    todos: [{ id: 'todo-stamped', title: 'Đã có metadata', ownerId: id, createdAt, updatedAt }],
    habits: { '2026-08': [{ id: 'habit-new', name: 'Thói quen mới', ownerId: id }] }
  }));
  const h = makeHarness({ initialState: local, remoteState: { userData: { _initialized: true, accounts: {} } } });

  assert.equal(await h.sync.push(), true);
  const pushed = accountFromPayload(h.serverPayload, id);
  const stamped = pushed.todos.find(row => row.id === 'todo-stamped');
  const newHabit = pushed.habits['2026-08'].find(row => row.id === 'habit-new');

  assert.equal(stamped.createdAt, createdAt);
  assert.equal(stamped.updatedAt, updatedAt);
  assert.match(newHabit.createdAt, /^\d{4}-\d{2}-\d{2}T/);
  assert.match(newHabit.updatedAt, /^\d{4}-\d{2}-\d{2}T/);
});

test('test harness không gọi endpoint Supabase thật', async () => {
  const h = makeHarness({
    initialState: stateWithAccount('member-test-4', account()),
    remoteState: { userData: { _initialized: true, accounts: {} } }
  });
  await h.sync.pull();
  await h.sync.flush();
  await h.sync.push();
  assert.ok(h.calls.length > 0);
  assert.ok(h.calls.every(call => call.url.includes('cuompgnxcbzufaeodgvx.supabase.co')));
  assert.ok(h.calls.every(call => call.body === null || typeof call.body === 'object'));
});

test('xung đột đồng thời hai thiết bị: rebase sau PATCH không làm mất dữ liệu và metadata', async () => {
  const id = 'member-concurrent-1';
  const base = stateWithAccount(id, account({
    savedAt: 1700000000000,
    todos: [{ id: 'todo-base', title: 'Bản ghi nền', date: '2026-08-21', ownerId: id, createdAt: '2026-08-21T07:00:00.000Z', updatedAt: '2026-08-21T07:00:00.000Z' }],
    habits: { '2026-08': [{ id: 'habit-base', name: 'Thói quen nền', ownerId: id, createdAt: '2026-08-21T07:00:00.000Z', updatedAt: '2026-08-21T07:00:00.000Z' }] }
  }));
  delete base.sessionAuth;

  const deviceA = stateWithAccount(id, account({
    todos: [{ id: 'todo-a', title: 'Thiết bị A', date: '2026-08-21', ownerId: id, createdAt: '2026-08-21T08:00:00.000Z', updatedAt: '2026-08-21T08:00:00.000Z' }],
    habits: { '2026-08': [{ id: 'habit-a', name: 'Thói quen A', ownerId: id, createdAt: '2026-08-21T08:00:00.000Z', updatedAt: '2026-08-21T08:00:00.000Z' }] }
  }));
  const deviceB = stateWithAccount(id, account({
    todos: [
      { id: 'todo-base', title: 'Bản ghi nền', date: '2026-08-21', ownerId: id, createdAt: '2026-08-21T07:00:00.000Z', updatedAt: '2026-08-21T07:00:00.000Z' },
      { id: 'todo-b', title: 'Thiết bị B', date: '2026-08-21', ownerId: id, createdAt: '2026-08-21T08:01:00.000Z', updatedAt: '2026-08-21T08:01:00.000Z' }
    ],
    habits: { '2026-08': [
      { id: 'habit-base', name: 'Thói quen nền', ownerId: id, createdAt: '2026-08-21T07:00:00.000Z', updatedAt: '2026-08-21T07:00:00.000Z' },
      { id: 'habit-b', name: 'Thói quen B', ownerId: id, createdAt: '2026-08-21T08:01:00.000Z', updatedAt: '2026-08-21T08:01:00.000Z' }
    ] }
  }));
  delete deviceB.sessionAuth;

  const h = makeHarness({
    initialState: deviceA,
    remoteState: base,
    concurrentPayloadAfterFirstPatch: {
      ...deviceB,
      __studyEmpireSync: {
        version: 2,
        externalStores: {},
        clientId: 'device-b',
        seq: 4,
        savedAt: '2026-08-21T08:01:00.000Z'
      }
    }
  });

  assert.equal(await h.sync.push(), true);
  const pushed = accountFromPayload(h.serverPayload, id);
  const todoIds = new Set(pushed.todos.map(row => row.id));
  const habitIds = new Set(pushed.habits['2026-08'].map(row => row.id));
  assert.ok(todoIds.has('todo-base'), 'Không được mất bản ghi nền');
  assert.ok(todoIds.has('todo-a'), 'Không được mất dữ liệu thiết bị A');
  assert.ok(todoIds.has('todo-b'), 'Không được mất dữ liệu thiết bị B');
  assert.ok(habitIds.has('habit-base') && habitIds.has('habit-a') && habitIds.has('habit-b'), 'Phải giữ habit của cả hai thiết bị');
  for (const row of [...pushed.todos, ...pushed.habits['2026-08']]) {
    assert.match(row.createdAt, /^2026-08-21T/);
    assert.match(row.updatedAt, /^2026-08-21T/);
  }
  assert.ok(h.calls.filter(call => call.method === 'PATCH').length >= 2, 'Xung đột phải kích hoạt ít nhất một lần rebase/retry');
});

 test('xung đột cùng một id chọn bản ghi có updatedAt mới hơn', async () => {
  const id = 'member-concurrent-2';
  const remote = stateWithAccount(id, account({
    todos: [{ id: 'todo-shared', title: 'Thiết bị B mới hơn', ownerId: id, updatedAt: '2026-08-21T10:00:00.000Z', createdAt: '2026-08-21T07:00:00.000Z' }]
  }));
  delete remote.sessionAuth;
  const local = stateWithAccount(id, account({
    todos: [{ id: 'todo-shared', title: 'Thiết bị A cũ hơn', ownerId: id, updatedAt: '2026-08-21T09:00:00.000Z', createdAt: '2026-08-21T07:00:00.000Z' }]
  }));
  const h = makeHarness({ initialState: local, remoteState: remote });
  assert.equal(await h.sync.push(), true);
  assert.equal(accountFromPayload(h.serverPayload, id).todos.find(row => row.id === 'todo-shared').title, 'Thiết bị B mới hơn');
});


test('mất kết nối mạng đột ngột khi đang push giữ pending snapshot và retry không mất dữ liệu', async () => {
  const id = 'member-network-drop-1';
  const remote = stateWithAccount(id, account({
    todos: [{ id: 'todo-remote', title: 'Bản ghi cloud', date: '2026-08-21', ownerId: id, createdAt: '2026-08-21T07:00:00.000Z', updatedAt: '2026-08-21T07:00:00.000Z' }],
    habits: { '2026-08': [{ id: 'habit-remote', name: 'Thói quen cloud', ownerId: id, createdAt: '2026-08-21T07:00:00.000Z', updatedAt: '2026-08-21T07:00:00.000Z' }] }
  }));
  delete remote.sessionAuth;
  const local = stateWithAccount(id, account({
    todos: [{ id: 'todo-local', title: 'Bản ghi local', date: '2026-08-21', ownerId: id, createdAt: '2026-08-21T08:00:00.000Z', updatedAt: '2026-08-21T08:00:00.000Z' }],
    habits: { '2026-08': [{ id: 'habit-local', name: 'Thói quen local', ownerId: id, createdAt: '2026-08-21T08:00:00.000Z', updatedAt: '2026-08-21T08:00:00.000Z' }] }
  }));
  const h = makeHarness({ initialState: local, remoteState: remote, startOffline: true });
  const beforeDisconnect = h.serverPayload;

  assert.equal(await h.sync.push(), false, 'Push phải báo thất bại khi mất mạng');
  assert.deepEqual(h.serverPayload, beforeDisconnect, 'Mất mạng trước PATCH không được làm thay đổi snapshot cloud');
  assert.equal(h.sync.status().pending, true, 'Snapshot local phải được giữ trong hàng đợi retry');
  assert.equal(h.calls.filter(call => call.method === 'PATCH').length, 0, 'Không được có PATCH thành công khi đang offline');

  h.setNetworkOnline(true);
  assert.equal(await h.sync.flush(), true, 'Flush lại phải thành công sau khi mạng khôi phục');
  const pushed = accountFromPayload(h.serverPayload, id);
  assert.ok(pushed.todos.some(row => row.id === 'todo-remote'), 'Retry phải giữ bản ghi cloud');
  assert.ok(pushed.todos.some(row => row.id === 'todo-local'), 'Retry phải giữ bản ghi local');
  assert.ok(pushed.habits['2026-08'].some(row => row.id === 'habit-remote'), 'Retry phải giữ habit cloud');
  assert.ok(pushed.habits['2026-08'].some(row => row.id === 'habit-local'), 'Retry phải giữ habit local');
  assert.equal(h.sync.status().pending, false, 'Hàng đợi phải được dọn sau khi retry thành công');
  assert.ok(h.calls.filter(call => call.method === 'PATCH').length >= 1, 'Retry phải thực hiện PATCH sau khi mạng khôi phục');
});
