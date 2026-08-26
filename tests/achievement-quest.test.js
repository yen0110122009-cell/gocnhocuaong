import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const appPath = path.resolve(here, '..', 'assets', 'js', 'app.js');
const source = fs.readFileSync(appPath, 'utf8');
const cssSource = fs.readFileSync(path.resolve(here, '..', 'assets', 'css', 'app.css'), 'utf8');

function extractFunction(name, endMarker) {
  const start = source.indexOf(`function ${name}`);
  assert.ok(start >= 0, `Không tìm thấy hàm ${name}`);
  const end = source.indexOf(endMarker, start);
  assert.ok(end > start, `Không tìm thấy điểm kết thúc hàm ${name}`);
  return source.slice(start, end);
}

test('nhiệm vụ thói quen nhận đúng khi dữ liệu ngày dùng khóa số hoặc chuỗi ngày', () => {
  const fnSource = extractFunction('dailyHabitPercent', 'function awardQuestZone');
  const ownerId = 'member-1';
  const state = {
    habits: {},
    userData: {
      accounts: {
        [ownerId]: {
          habits: {
            '2026-08': [
              { id: 'legacy-a', days: { 8: true } },
              { id: 'legacy-b', days: { '2026-08-08': false } },
              { id: 'other', ownerId: 'member-2', days: { 8: true } }
            ]
          }
        }
      }
    }
  };
  const getOwnerScopedData = id => state.userData.accounts[id];
  const dailyHabitPercent = vm.runInNewContext(`${fnSource}; dailyHabitPercent`, { state, getOwnerScopedData });
  const value = dailyHabitPercent(ownerId, '2026-08-08');
  assert.equal(value, 50, 'Hai thói quen hợp lệ, một hoàn thành phải cho 50%');
});

test('XP mốc thói quen được đưa vào khóa dữ liệu cá nhân và không làm mất dữ liệu cũ', () => {
  assert.match(source, /questClaims:\[\], dailyHabitXPClaims:\{\}/);
  assert.match(source, /'questClaims','dailyHabitXPClaims','customAchievements'/);
});

test('các thay đổi hoàn thành kế hoạch và thói quen yêu cầu vẽ lại bảng nhiệm vụ ngay lập tức', () => {
  const toggleTodoStart = source.indexOf('function toggleTodoDone');
  const toggleTodoEnd = source.indexOf('function editTodo', toggleTodoStart);
  const toggleTodo = source.slice(toggleTodoStart, toggleTodoEnd);
  assert.match(toggleTodo, /renderQuestBoard\(\)/);

  const toggleHabitStart = source.indexOf('function toggleHabit');
  const toggleHabitEnd = source.indexOf('function renderHabitQuickSummary', toggleHabitStart);
  const toggleHabit = source.slice(toggleHabitStart, toggleHabitEnd);
  assert.match(toggleHabit, /renderQuestBoard\(\)/);
});

test('nội dung Kết ngày và Nhật ký giữ nguyên xuống dòng khi lưu và hiển thị', () => {
  assert.match(source, /endDay:\{mood:moodDisplay,gratitude,lesson,tomorrow\}/);
  assert.match(source, /const content\s*=\s*\$\('jContent'\)\.value\.trim\(\)/);
  assert.match(cssSource, /\.history-v21-value\{[^}]*white-space:pre-wrap/);
  assert.match(cssSource, /\.history-v21-preview\{[^}]*white-space:pre-wrap/);
});

test('các ngưỡng thành tích cơ bản đã được nâng lên nhưng vẫn giữ nguyên cơ chế ID', () => {
  assert.match(source, /const difficultyFloors=\{/);
  assert.match(source, /tasks:\[8,20,50,120/);
  assert.match(source, /habits:\[15,40,100,250/);
  assert.match(source, /streak:\[5,14,30,60/);
  assert.match(source, /if\(difficultyFloors\[key\]\?\.\[ti\]\)threshold=Math\.max\(threshold,difficultyFloors\[key\]\[ti\]\)/);
});

test('sao lưu tự động được móc vào đồng bộ Supabase và có khôi phục', () => {
  assert.match(source, /captureSnapshot\(snapshot,'before-cloud-write'\)/);
  assert.match(source, /captureCurrent\('before-cloud-pull'\)/);
  assert.match(source, /captureSnapshot\(\{state:applied\.state,external:applied\.external,meta:applied\.meta\},'after-cloud-write'\)/);
  assert.match(source, /study_empire_auto_backup_v1/);
  assert.match(source, /indexedDB\.open\(DB_NAME,1\)/);
  assert.match(source, /restorePrompt/);
});

test('nhiệm vụ thủ công không bị chặn bởi điều kiện nhiệm vụ tự động', () => {
  const latestClaimStart = source.lastIndexOf('claimCustomQuest=function');
  const latestClaimEnd = source.indexOf('\n  renderQuestBoard=function', latestClaimStart);
  const latestClaim = source.slice(latestClaimStart, latestClaimEnd);
  assert.match(latestClaim, /if\(q\.auto && !dailyQuestProgress\(q,ownerId\)\)/);
  assert.match(source, /const ready=!q\.auto\|\|done/);
});

// The test intentionally exercises only pure logic extracted from the app source;
// it does not call Supabase or mutate the user's real local/cloud state.
void appPath;
