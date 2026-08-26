/* ---- extracted script block 1: <script id="fast-auth-input-init"> ---- */
(function(){
  /* Hiển thị form sớm trong lúc Supabase đang tải nền; không chạm dữ liệu ứng dụng. */
  try{
    const hasSession=!!sessionStorage.getItem('study_tracker_session_v1');
    const auth=document.getElementById('authScreen');
    if(auth && !hasSession) auth.style.display='flex';
  }catch(e){
    const auth=document.getElementById('authScreen');
    if(auth) auth.style.display='flex';
  }
})();


/* ---- extracted script block 2: <script> ---- */
/* ===== FINAL LEVEL SYSTEM ===== */
function finalGetXP(){
  return Math.max(0, Number(state.xp || 0));
}
function finalGetLevel(){
  return Math.floor(finalGetXP()/100);
}
function finalLevelHTML(){
  const xp=finalGetXP();
  const level=Math.floor(xp/100)+1;
  const inLevel=xp%100;
  const pct=inLevel;
  return `<div class="level-panel-final">
    <div class="lv-top">
      <div>
        <div class="lv-title">🏅 CẤP ĐỘ</div>
        <div class="lv-number">Cấp ${level}</div>
      </div>
      <div style="text-align:right">
        <div class="lv-xp">⚡ ${xp} XP</div>
        <div class="lv-next">${100-inLevel===100?'Cần 100 XP':'Còn '+(100-inLevel)+' XP'} để lên Cấp ${level+1}</div>
      </div>
    </div>
    <div class="lv-bar"><div class="lv-fill" style="width:${pct}%"></div></div>
    <div class="lv-next">${inLevel}/100 XP trong Cấp ${level}</div>
  </div>`;
}
function finalRefreshLevelPanels(){
  document.querySelectorAll('[data-final-level-panel]').forEach(el=>{
    el.innerHTML=finalLevelHTML();
  });
}


const KEY='study_momentum_ong_v9';
const toISODate = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const todayISO=()=>toISODate(new Date());
const yesterdayKey=()=>{const d=new Date();d.setDate(d.getDate()-1);return toISODate(d)};
const ymISO=()=>{const d = new Date();return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0')};
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
const fmtMin=m=>{m=Math.max(0,Math.round(m||0));return `${Math.floor(m/60)}h ${String(m%60).padStart(2,'0')}m`};
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const isoDay=d=>new Date(d+'T12:00:00');

const defaultState = {
 sessionAuth: null,
 adminPassword: null,
 founderPassword: null,
 memberAccounts: [],
 membersList: [
   // Không tạo sẵn tài khoản mẫu; Founder/Admin cấp tài khoản thật khi cần.
 ],
 todos:[],sessions:[],goals:{day:120,week:600,month:2500},habits:{},habitArchive:[],moods:[],schedules:[],journals:[],moments:[],
 pomo:{focus:25,short:5,long:15,rounds:4,sound:true},
 trash:{home:[],endday:[],todo:[],study:[],achievements:[],achievement:[],quest:[],habit:[],mood:[],schedule:[],moments:[],journal:[],summary:[],data:[]},
 sheetLinks:[{id:uid(),title:'Thói quen tháng',url:''},{id:uid(),title:'Kế hoạch tuần',url:''},{id:uid(),title:'Lịch trình',url:''}],
 xp:0, level:1, streak:0, bestStreak:0, activities:0, bestTasks:0, bestXPDay:0, todayXP:0, todayActivities:0, lastActivityDate:'',
 unlockedAchievements:[], activityDates:[], timeline:[], questClaims:[], dailyHabitXPClaims:{},
 customAchievements:[],
 customQuests:[],
 dailyQuestDate:'',
 dailyQuestSeed:0,
 memberZones:{},
 achievementBadgePrefs:{},
 customMoods:[],
 currentEmotion:null,
 // Lời nhắn cảm xúc do Admin/Founder gán riêng cho từng memberId.
 memberComforts:{},
 superMinds:[
   "Tập trung vào 1 nhiệm vụ duy nhất trong 15 phút tới mà không chuyển tab.",
   "Đặt câu hỏi: 'Điều gì nếu hoàn thành sẽ làm hôm nay cực kỳ thành công?'",
   "Chia nhỏ mục tiêu lớn thành 3 bước nhỏ nhất có thể.",
   "Nhớ lại lý do bạn bắt đầu hành trình này để thắp lại ngọn lửa nhiệt huyết."
 ],
 superMes:[
   "Dọn dẹp góc bàn học gọn gàng trong 3 phút.",
   "Uống một cốc nước và vươn vai thư giãn cột sống.",
   "Đọc lại 3 trang ghi chú cũ quan trọng.",
   "Viết ra 1 điều bạn đang bận tâm và gạch bỏ nó."
 ],
 customMotivations:['Bạn đã cố gắng rất nhiều rồi, mỗi ngày một bước tiến nhỏ! 🐝🍀','Hôm nay chắc chắn sẽ là một ngày rực rỡ!'],
 completionMotivations:['Mỗi ngày tích lũy thêm một chút, bạn đang tiến gần mục tiêu hơn rồi! 🌱','Không cần hoàn hảo — chỉ cần tiến thêm một bước hôm nay. 🍀'],
 rankMotivations:{
   '🥇 Hạng 1':['Quá đỉnh! Bạn đang dẫn đầu — nhưng đừng quên giữ nhịp thật bền nhé! 🏆🐝','Bạn không chỉ chạy nhanh, bạn đang chạy rất chắc. Tiếp tục nào! 🚀'],
   '🥈 Hạng 2':['Chỉ còn một bước nữa thôi! Giữ nhịp và bứt phá nhé! 💪🍀','Bạn đang ở rất gần vị trí dẫn đầu — cố thêm một chút nữa! ✨'],
   '🥉 Hạng 3':['Top 3 rồi! Một cú tăng tốc nhỏ có thể đổi thứ hạng đấy! 🔥','Bạn đang đi đúng hướng. Đừng bỏ cuộc ở đoạn này nhé! 🐝'],
   '🌱 Đang tiến bộ':['Mỗi bước tiến đều đáng giá. Cứ tiếp tục, bạn sẽ thấy mình khác hẳn! 🍀','Chưa cần đứng đầu — chỉ cần hôm nay tiến hơn hôm qua một chút. 💚']
 },
  customComforts:{
   'Vui':['Thật tuyệt khi hôm nay bạn đang vui. Hãy tận hưởng khoảnh khắc này và để nguồn năng lượng tích cực ấy lan tỏa nhé. 💛'],
   'Bình yên':['Thật tốt khi bạn đang cảm thấy bình yên. Hãy tận hưởng khoảng lặng này và cho bản thân một chút thời gian để thở. 🌿'],
   'Buồn':['Không sao nếu hôm nay bạn buồn. Bạn không cần phải ổn ngay lập tức. Hãy cho bản thân thời gian và tiến từng bước nhỏ thôi nhé. 💙'],
   'Đau lòng':['Có những lúc trái tim cần được nghỉ ngơi. Đừng ép mình phải mạnh mẽ ngay lúc này, hãy nhẹ nhàng với chính mình nhé. ❤️‍🩹'],
   'Lo lắng':['Đừng quên tự ghi nhận những điều nhỏ bé mà bạn đã hoàn thành hôm nay. Bạn không cần giải quyết mọi thứ cùng một lúc. Hãy hít thở và đi từng bước một nhé. 🌿'],
   'Tức giận':['Hãy cho bản thân một khoảng dừng. Cảm xúc của bạn là điều có thật, nhưng bạn vẫn có thể chọn cách phản hồi bình tĩnh hơn. 🌱'],
   'Mệt mỏi':['Bạn đã cố gắng đủ nhiều rồi. Hãy cho mình một chút thời gian nghỉ ngơi. Nghỉ ngơi không phải bỏ cuộc, mà là nạp lại năng lượng. 🫶'],
   'Cô đơn':['Bạn không cần phải tự mình chịu đựng mọi thứ. Hãy nhớ rằng một khoảng thời gian cô đơn không định nghĩa giá trị của bạn. 🌷'],
   'Hy vọng':['Hãy giữ lấy tia hy vọng nhỏ bé đó. Một bước nhỏ hôm nay cũng có thể đưa bạn đến một ngày tốt đẹp hơn. ☀️'],
   'Hứng khởi':['Nguồn năng lượng này thật tuyệt! Hãy tận dụng nó để bắt đầu điều bạn đang mong muốn và biến ý tưởng thành hành động. 🚀'],
   'Tập trung':['Bạn đang có một trạng thái rất tốt để tiến về phía trước. Hãy chọn một việc quan trọng và hoàn thành từng bước thật chắc chắn. 🎯'],
   'Biết ơn':['Thật đẹp khi bạn nhận ra những điều đáng trân trọng. Hãy giữ lại cảm giác này và để lòng biết ơn mang đến thêm nhiều điều tích cực. 💛'],
   'Yêu đời':['Hãy tận hưởng nguồn năng lượng tuyệt vời này. Những khoảnh khắc nhỏ khiến bạn yêu cuộc sống chính là những điều rất đáng trân trọng. 🌸'],
   'Phát khóc':['Nếu bạn cần khóc, hãy để cảm xúc được giải tỏa. Bạn không cần phải che giấu cảm xúc của mình. Hãy nhẹ nhàng với bản thân nhé. ❤️‍🩹'],
   'Phấn chấn':['Bạn đang có một nguồn năng lượng thật tuyệt! Hãy biến sự phấn chấn này thành một hành động nhỏ nhưng có ý nghĩa ngay hôm nay. ✨'],
   'Thư giãn':['Hãy chậm lại một chút. Không phải mọi thứ đều cần được hoàn thành ngay bây giờ. Hít thở sâu và tận hưởng khoảnh khắc hiện tại. 🌿'],
   'Chán nản':['Không phải ngày nào cũng cần thật năng suất. Nếu hôm nay bạn thiếu động lực, hãy bắt đầu bằng một việc thật nhỏ. Bạn vẫn đang tiến về phía trước. 🌱'],
   'Tự hào':['Bạn có quyền tự hào về những gì mình đã làm được. Hãy nhìn lại hành trình của mình và ghi nhận những nỗ lực của chính bạn. 🏆'],
   'Xấu hổ':['Ai cũng có những khoảnh khắc khiến mình ngại ngùng. Một khoảnh khắc không định nghĩa con người bạn. Hãy cho bản thân cơ hội bước tiếp. 🌷'],
   'Bất an':['Hãy quay về với những điều bạn có thể kiểm soát ngay lúc này. Hít thở chậm, tập trung vào hiện tại và tiến từng bước nhỏ. 🌿'],
   'Ngạc nhiên':['Cuộc sống đôi khi mang đến những điều thật bất ngờ. Hãy cho bản thân một chút thời gian để đón nhận và khám phá điều đang xảy ra nhé. ✨'],
   'Bực bội':['Bạn có thể cho mình một khoảng nghỉ trước khi tiếp tục. Không phải mọi chuyện đều cần được giải quyết ngay lập tức. Hãy bình tĩnh lại và bắt đầu từ điều bạn có thể kiểm soát. 🌿'],
   'Chạnh lòng':['Cảm xúc này cho thấy bạn đang thật sự quan tâm. Hãy cho phép mình cảm nhận nó và đối xử với bản thân bằng sự dịu dàng. 💗'],
   'Mất mát':['Mất mát có thể để lại một khoảng trống rất lớn. Hãy cho bản thân thời gian để cảm nhận, nghỉ ngơi và bước tiếp theo nhịp độ của riêng mình. ❤️‍🩹'],
   'Có động lực':['Bạn đang có một nguồn năng lượng rất đáng quý. Hãy chọn một mục tiêu và bắt đầu bằng một bước nhỏ ngay bây giờ. Bạn làm được! 💪'],
   'Yêu bản thân':['Bạn cũng xứng đáng nhận được sự quan tâm mà bạn dành cho người khác. Hãy đối xử với chính mình bằng sự tử tế và yêu thương nhé. 🫶']
  }
};

let state=JSON.parse(localStorage.getItem(KEY)||'null')||defaultState;
Object.keys(defaultState).forEach(k=>{if(state[k]===undefined)state[k]=defaultState[k]});
// Dọn ba tài khoản mẫu cũ nếu chúng còn nằm trong dữ liệu đã lưu.
const SAMPLE_MEMBER_IDS=new Set(['m1','m2','m3']);
state.membersList=(state.membersList||[]).filter(m=>!SAMPLE_MEMBER_IDS.has(String(m.id)) && !['Nguyễn A','Trần B','Lê C'].includes(String(m.name)));
state.memberAccounts=(state.memberAccounts||[]).filter(a=>!SAMPLE_MEMBER_IDS.has(String(a.memberId)));
if(state.userData?.accounts){SAMPLE_MEMBER_IDS.forEach(id=>delete state.userData.accounts[id]);}
const SESSION_KEY='study_tracker_session_v1';
const REMEMBER_SESSION_KEY='study_tracker_remembered_session_v1';
try{state.sessionAuth=JSON.parse(sessionStorage.getItem(SESSION_KEY)||'null');}catch(e){state.sessionAuth=null;}
if(!state.sessionAuth){
  try{
    const remembered=JSON.parse(localStorage.getItem(REMEMBER_SESSION_KEY)||'null');
    if(remembered && remembered.role && remembered.code){state.sessionAuth=remembered;sessionStorage.setItem(SESSION_KEY,JSON.stringify(remembered));}
  }catch(e){try{localStorage.removeItem(REMEMBER_SESSION_KEY);}catch(ignore){}}
}
function setSessionAuth(auth,options={}){
  const previous=state.sessionAuth;
  const previousId=previous?.memberId||null;
  const nextId=auth?.memberId||null;
  if(previous && previousId && nextId && String(previousId)!==String(nextId)){
    try{persistActiveUserData();}catch(e){console.warn('Không thể lưu bucket trước khi đổi tài khoản',e);}
  }
  state.sessionAuth=auth||null;
  try{
    if(auth)sessionStorage.setItem(SESSION_KEY,JSON.stringify(auth));else sessionStorage.removeItem(SESSION_KEY);
    if(auth && options.remember)localStorage.setItem(REMEMBER_SESSION_KEY,JSON.stringify(auth));
    if(!auth || !options.remember)localStorage.removeItem(REMEMBER_SESSION_KEY);
  }catch(e){}
}
function saveStateWithoutSession(){
  const copy=cloneValue(state);
  delete copy.sessionAuth;
  try{
    const latest=JSON.parse(localStorage.getItem(KEY)||'null');
    const oldAccounts=latest?.userData?.accounts||{};
    const newAccounts=copy.userData?.accounts||{};
    const merged={...oldAccounts,...newAccounts};
    Object.keys(oldAccounts).forEach(id=>{
      const oldStamp=Number(oldAccounts[id]?._lastSavedAt||0);
      const newStamp=Number(newAccounts[id]?._lastSavedAt||0);
      if(oldStamp>newStamp) merged[id]=oldAccounts[id];
    });
    if(copy.userData) copy.userData.accounts=merged;
  }catch(e){console.warn('Không thể hợp nhất dữ liệu giữa các tab',e);}
  localStorage.setItem(KEY,JSON.stringify(copy));
}

/* 🔐 ISOLATION DỮ LIỆU THEO TÀI KHOẢN
   Dữ liệu cá nhân không còn dùng chung một state cho mọi tài khoản.
   Hồ sơ/tài khoản, cấp bậc và dữ liệu quản trị vẫn là dữ liệu hệ thống;
   kế hoạch, nhật ký, thói quen, cảm xúc, khoảnh khắc, thành tích mở khóa, XP...
   được lưu theo memberId cố định. */
const USER_DATA_KEYS=['todos','sessions','goals','habits','habitArchive','moods','schedules','journals','moments','pomo','trash','sheetLinks','xp','level','streak','bestStreak','bestTasks','bestXPDay','todayXP','todayActivities','activities','lastActivityDate','unlockedAchievements','activityDates','timeline','questClaims','dailyHabitXPClaims','customAchievements','customQuests','dailyQuestDate','dailyQuestSeed','memberZones','achievementBadgePrefs','monthlyHabitXPClaims','adminStudyTimes','privateXPHistory','customMoods','currentEmotion'];
const USER_DATA_VERSION=2;
function accountOwnerId(auth=state.sessionAuth){
  if(!auth || auth.role==='Guest') return null;
  if(auth.memberId) return auth.memberId;
  if(auth.role==='Member'){
    const code=String(auth.code||'').trim().toUpperCase();
    return state.memberAccounts.find(a=>String(a.code||'').trim().toUpperCase()===code)?.memberId||null;
  }
  return state.membersList.find(m=>String(m.name||'').trim()===String(auth.name||'').trim() && m.role===auth.role)?.id||null;
}
function cloneValue(v){return v===undefined?undefined:JSON.parse(JSON.stringify(v));}
function daysInMonth(ym){ const m=String(ym||'').match(/^(\d{4})-(\d{2})$/); if(!m)return 31; return new Date(Number(m[1]),Number(m[2]),0).getDate(); }
function blankUserData(){
  const d={};
  USER_DATA_KEYS.forEach(k=>d[k]=cloneValue(defaultState[k]));
  d._version=USER_DATA_VERSION;
  return d;
}
function ensureUserStore(){
  if(!state.userData || typeof state.userData!=='object') state.userData={};
  if(!state.userData._initialized){
    const legacy=blankUserData();
    USER_DATA_KEYS.forEach(k=>{ if(state[k]!==undefined) legacy[k]=cloneValue(state[k]); });
    state.userData={_initialized:true,_version:USER_DATA_VERSION,accounts:{},_legacy:legacy};
  }
  if(!state.userData.accounts) state.userData.accounts={};
}
function persistActiveUserData(){
  ensureUserStore();
  const id=accountOwnerId();
  if(!id) return;
  const bucket=state.userData.accounts[id]||blankUserData();
  USER_DATA_KEYS.forEach(k=>{ if(state[k]!==undefined) bucket[k]=cloneValue(state[k]); });
  bucket._lastSavedAt=Date.now();
  state.userData.accounts[id]=bucket;
  // Keep comparison/profile progress synchronized with the active personal state.
  const progress=getProgressRecord ? getProgressRecord(id) : null;
  if(progress){
    progress.xp=Math.max(0,Number(state.xp)||0);
    progress.level=Math.max(1,Number(state.level)||1);
    progress.streak=Math.max(0,Number(state.streak)||0);
    progress.activities=Math.max(0,Number(state.activities)||0);
  }
}
function switchUserData(auth){
  ensureUserStore();
  const id=accountOwnerId(auth);
  if(!id) return;
  // On first migration, only the first real account to log in receives the old shared data.
  let bucket=state.userData.accounts[id];
  if(!bucket){
    const hasAny=Object.keys(state.userData.accounts).length>0;
    bucket=hasAny?blankUserData():cloneValue(state.userData._legacy||blankUserData());
    bucket._version=USER_DATA_VERSION;
    state.userData.accounts[id]=bucket;
  }
  USER_DATA_KEYS.forEach(k=>{ state[k]=cloneValue(bucket[k]!==undefined?bucket[k]:defaultState[k]); });
  const progress=getProgressRecord(id);
  if(progress){
    state.xp=Math.max(0,Number(progress.xp)||0);
    try{finalRefreshLevelPanels();}catch(e){}
    state.level=Math.max(1,Number(progress.level)||1);
    state.streak=Math.max(0,Number(progress.streak)||0);
    state.activities=Math.max(0,Number(progress.activities)||0);
  }
}
ensureUserStore();
window.studyEmpireStateAccess={
  get:()=>state,
  replace:next=>{
    const session=state.sessionAuth||null;
    Object.keys(state).forEach(k=>delete state[k]);
    Object.assign(state,cloneValue(next)||{});
    state.sessionAuth=session;
    try{ensureUserStore();}catch(e){}
    return state;
  }
};

/* =========================================================
   ☁️ SUPABASE CLOUD SYNC
   Bảng hiện tại:
   app_state
   ├── id         text       -> global_state
   ├── created_at timestamptz
   └── payload    jsonb
   ========================================================= */

const SUPABASE_URL='https://cuompgnxcbzufaeodgvx.supabase.co';
const SUPABASE_REST=SUPABASE_URL+'/rest/v1';
const SUPABASE_KEY='sb_publishable_7aYuYqRgExVRMDGoC-WuQg_vDv18v4L';
const SUPABASE_TABLE='app_state';
const SUPABASE_STATE_ID='global_state';

function supabaseHeaders(extra={}){
  return Object.assign({
    'apikey':SUPABASE_KEY,
    'Authorization':'Bearer '+SUPABASE_KEY,
    'Content-Type':'application/json',
    'Accept':'application/json'
  },extra);
}

/* Tải đúng dòng id = global_state */
async function pullStateFromServer(){
  return window.studyEmpireCloudSync?.pull ? window.studyEmpireCloudSync.pull() : false;
}

/* Cập nhật trực tiếp dòng id = global_state */
async function pushStateToServer(){
  return window.studyEmpireCloudSync?.push ? window.studyEmpireCloudSync.push('state-save') : false;
}

/* Tạo dòng global_state nếu bảng chưa có dòng này */
async function createInitialSupabaseState(){
  return window.studyEmpireCloudSync?.create ? window.studyEmpireCloudSync.create() : false;
}

let renderFrameId=0;
let cloudPushTimer=0;

function requestRenderAll(){
  if(renderFrameId) return;
  const paint=()=>{
    renderFrameId=0;
    try{renderAll();}catch(e){console.error('Lỗi render giao diện',e);}
  };
  if(window.requestAnimationFrame) renderFrameId=requestAnimationFrame(paint);
  else renderFrameId=setTimeout(paint,0);
}

function scheduleCloudPush(immediate=false){
  clearTimeout(cloudPushTimer);
  const push=()=>{
    cloudPushTimer=0;
    try{pushStateToServer();}
    catch(e){console.warn('Không thể xếp hàng đồng bộ cloud',e);}
  };
  if(immediate || document.visibilityState==='hidden') push();
  else cloudPushTimer=setTimeout(push,900);
}

function save(options={}){
  /* Tái tính các chỉ số suy ra trước khi ghi: kế hoạch, thói quen và study time
     phải dùng chung nguồn cho Tổng quan, Thành tích và Bảng xếp hạng. */
  try{const ownerId=accountOwnerId();if(ownerId)recalculateCurrentProgress(ownerId,{persist:false});}catch(e){console.warn('Không thể tái tính tiến độ trước khi lưu',e);}
  persistActiveUserData();
  saveStateWithoutSession();
  if(!options || options.render!==false) requestRenderAll();
  scheduleCloudPush(Boolean(options && options.immediateCloud));
}
window.addEventListener('pagehide',()=>scheduleCloudPush(true));
function moveTrash(type,item){
  state.trash=state.trash&&typeof state.trash==='object'?state.trash:{};
  if(!Array.isArray(state.trash[type]))state.trash[type]=[];
  const ownerId=item?.ownerId||accountOwnerId()||null;
  const copy={...cloneValue(item),ownerId,_trashType:type,_deletedAt:new Date().toISOString()};
  state.trash[type].push(copy);
  try{const id=accountOwnerId();if(id){ensureUserStore();const bucket=state.userData.accounts[id]||blankUserData();bucket.trash=cloneValue(state.trash);state.userData.accounts[id]=bucket;}}catch(e){}
  return state.trash[type][state.trash[type].length-1];
}
function del(type,id){
  const arr=state[type];const i=Array.isArray(arr)?arr.findIndex(x=>x.id===id):-1;if(i<0)return;
  const removed=arr[i];const ownerId=removed?.ownerId||accountOwnerId();
  const beforeBase=ownerId?Number(calculateBaseXP(ownerId)?.baseXP||0):0;
  const trashItem=moveTrash(type,removed);
  arr.splice(i,1);
  const afterBase=ownerId?Number(calculateBaseXP(ownerId)?.baseXP||0):beforeBase;
  const reversal=Math.min(0,afterBase-beforeBase);
  if(trashItem){
    trashItem._xpReversal=reversal;
    trashItem._xpReversalDetail=reversal<0?`Trừ ${Math.abs(reversal)} XP vì đã xóa ${type}: ${trashItem.title||trashItem.name||trashItem.text||'mục đã xóa'}`:'';
  }
  if(ownerId)recalculateCurrentProgress(ownerId,{persist:false});
  save();renderTrash();
}
function edit(type,id,patch){const x=state[type].find(x=>x.id===id);if(!x)return;Object.assign(x,patch);save()}
function showModal(title,body){$('modalTitle').textContent=title;$('modalBody').innerHTML=body;$('modal').classList.add('show')}
function closeModal(){$('modal').classList.remove('show')}
function $(id){return document.getElementById(id)}
/* 🔐 AUTHENTICATION & SESSION LOGIC */
function checkAuthSession(){
  if(!state.sessionAuth){
    $('authScreen').style.display = 'flex';
  } else {
    $('authScreen').style.display = 'none';
    setupNavAndAdminRole();
  }
}

function normalizeStateAccounts(){
  if(!Array.isArray(state.memberAccounts)) state.memberAccounts=[];
  if(state.adminPassword===undefined) state.adminPassword=null;
  if(state.founderPassword===undefined) state.founderPassword=null;
  if(!state.rankMotivations) state.rankMotivations=JSON.parse(JSON.stringify(defaultState.rankMotivations));
  if(!Array.isArray(state.customRoles)) state.customRoles=[];
  // Custom roles are independent from system roles and can be multiple per account.
  (state.membersList||[]).forEach(m=>{ if(m.customRoleId && !Array.isArray(m.customRoleIds)) m.customRoleIds=[m.customRoleId]; if(!Array.isArray(m.customRoleIds)) m.customRoleIds=[]; });
  (state.memberAccounts||[]).forEach(a=>{ if(a.customRoleId && !Array.isArray(a.customRoleIds)) a.customRoleIds=[a.customRoleId]; if(!Array.isArray(a.customRoleIds)) a.customRoleIds=[]; });
  // Migrate the old 111 Admin into the Founder role once. New Admin code is 999.
  const oldAdmins=(state.membersList||[]).filter(m=>m.role==='Admin' && String(m.code||'')==='111');
  if(oldAdmins.length){
    const founder=oldAdmins[0]; founder.role='Founder'; founder.code='111'; if(!founder.password && state.adminPassword!==null) founder.password=state.adminPassword;
    if(state.founderPassword===null && state.adminPassword!==null) state.founderPassword=state.adminPassword;
    for(let i=1;i<oldAdmins.length;i++){ oldAdmins[i].code='999'; oldAdmins[i].password=oldAdmins[i].password||state.adminPassword; }
    state.adminPassword=state.adminPassword || null;
  }
  // 🛡️ Nếu hệ thống chưa có ai giữ vai trò Người sáng lập, tự tạo 1 tài khoản mặc định (mã 111).
  if(!(state.membersList||[]).some(m=>m.role==='Founder')){
    state.membersList=state.membersList||[];
    state.membersList.unshift({id:'founder1', name:'Ong', role:'Founder', status:'Đang hoạt động', currentAction:'Quản trị web', lastActive:'Vừa xong', locked:false, password:null, code:'111', customRoleIds:[]});
  }
}
normalizeStateAccounts();

function randomMemberCode(){
  let code='';
  do{
    code='TV-' + Math.floor(100000 + Math.random()*900000);
  }while(state.memberAccounts.some(a=>a.code===code));
  return code;
}

// Tài khoản thành viên được định danh cố định bằng memberId; mã chỉ là thông tin đăng nhập có thể cấp lại.
function findMemberAccount(auth=state.sessionAuth){
  if(!auth || auth.role!=='Member') return null;
  const byId=auth.memberId ? state.memberAccounts.find(a=>String(a.memberId)===String(auth.memberId)) : null;
  if(byId) return byId;
  const code=String(auth.code||'').trim().toUpperCase();
  return code ? state.memberAccounts.find(a=>String(a.code||'').trim().toUpperCase()===code) || null : null;
}
function findMemberRecord(auth=state.sessionAuth){
  const account=findMemberAccount(auth);
  if(!account) return null;
  return state.membersList.find(m=>String(m.id)===String(account.memberId)) || null;
}
function ensureMemberAccountLink(account){
  if(!account?.memberId) return null;
  state.membersList=Array.isArray(state.membersList)?state.membersList:[];
  let member=state.membersList.find(m=>String(m.id)===String(account.memberId));
  if(!member){
    const normalizedName=String(account.name||'').trim().toLocaleLowerCase('vi-VN');
    member=state.membersList.find(m=>String(m.code||'').trim().toUpperCase()===String(account.code||'').trim().toUpperCase() && String(m.name||'').trim().toLocaleLowerCase('vi-VN')===normalizedName);
    if(member && !state.membersList.some(m=>String(m.id)===String(account.memberId))) member.id=account.memberId;
  }
  if(!member){
    member={id:account.memberId,name:account.name||'Thành viên',role:account.role||'Member',status:'Chưa đăng nhập',currentAction:'Chưa bắt đầu',lastActive:'Chưa đăng nhập',locked:Boolean(account.locked),code:account.code,password:account.password||null};
    state.membersList.push(member);
  }
  member.name=account.name||member.name;
  member.role=account.role||member.role||'Member';
  member.code=account.code;
  member.locked=Boolean(account.locked);
  return member;
}

function completeLoginSession(auth){
  if(auth?.role==='Member'){
    const account=findMemberAccount(auth);
    if(account) auth={...auth,name:account.name,code:account.code,memberId:account.memberId};
  }
  const remember=Boolean($('rememberLogin')?.checked);
  setSessionAuth(auth,{remember});
  switchUserData(state.sessionAuth);
  /* Lưu local ngay, nhưng không render lại toàn trang và không chờ cloud. */
  save({render:false,deferCloud:true});
  checkAuthSession();
  currentNavId='home';
  menuCompact=false;
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  const home=$('home');
  if(home) home.classList.add('active');
  updateMenu();
  /* Cho trình duyệt vẽ màn hình đã đăng nhập trước khi render dữ liệu nặng. */
  const paint=()=>{try{renderAll()}catch(e){console.error('Lỗi render sau đăng nhập',e)}};
  if(window.requestAnimationFrame) requestAnimationFrame(paint); else setTimeout(paint,0);
  setTimeout(showPendingRoleNotifs,300);
}

function handleLoginSubmit(){
  normalizeStateAccounts();
  const name=$('loginNameInput').value.trim();
  const password=$('loginPasswordInput').value;
  const code=$('loginCodeInput').value.trim().toUpperCase();

  if(!code){
    return alert('⚠️ Vui lòng nhập mã thành viên hoặc mã quản trị viên.');
  }

  /* 🛡️ Mã 111 = Người sáng lập web. */
  if(code==='111'){
    const founder=state.membersList.find(m=>m.role==='Founder');
    if(!founder) return alert('❌ Mã không hợp lệ.');
    if(founder.locked) return alert('🔒 Tài khoản đang bị khóa.');
    if(!password) return alert('⚠️ Vui lòng nhập mật khẩu.');
    if(!founder.password){
      if(password.length<4) return alert('⚠️ Mật khẩu cần ít nhất 4 ký tự để tạo lần đầu.');
      founder.password=password; state.founderPassword=password;
    }else if(founder.password!==password){
      return alert('❌ Mật khẩu không đúng.');
    }
    completeLoginSession({name:founder.name,role:'Founder',code:'111',memberId:founder.id});
    return;
  }

  /* 👑 Mã 999 = Quản trị viên. */
  if(code==='999'){
    const admin=state.membersList.find(m=>m.role==='Admin');
    if(!admin) return alert('❌ Mã không hợp lệ.');
    if(admin.locked) return alert('🔒 Tài khoản đang bị khóa.');
    if(!password) return alert('⚠️ Vui lòng nhập mật khẩu.');
    if(!admin.password){
      if(password.length<4) return alert('⚠️ Mật khẩu cần ít nhất 4 ký tự để tạo lần đầu.');
      admin.password=password;
      const acc=state.memberAccounts.find(a=>a.memberId===admin.id); if(acc) acc.password=password;
      state.adminPassword=password;
    }else if(admin.password!==password){
      return alert('❌ Mật khẩu không đúng.');
    }
    completeLoginSession({name:admin.name,role:'Admin',code:'999',memberId:admin.id});
    return;
  }

  /* 👤 THÀNH VIÊN: cần đúng tên + mật khẩu + mã được cấp. */
  if(!name || !password){
    return alert('⚠️ Vui lòng nhập đủ tên và mật khẩu.');
  }
  const normalizedLoginName=name.toLocaleLowerCase('vi-VN');

  const duplicateAccounts=state.memberAccounts.filter(a=>String(a.name||'').trim().toLocaleLowerCase('vi-VN')===normalizedLoginName);
  const duplicateMembers=state.membersList.filter(m=>String(m.name||'').trim().toLocaleLowerCase('vi-VN')===normalizedLoginName);
  if(duplicateAccounts.length>1 || duplicateMembers.length>1){
    return alert('🚨 Tên thành viên đang bị trùng. Hãy dùng đúng mã thành viên được cấp để xác định tài khoản.');
  }

  const account=findMemberAccount({role:'Member',code});
  if(!account){
    return alert('❌ Mã thành viên không tồn tại hoặc không còn là mã của tài khoản Thành viên.');
  }
  if(account.locked){
    return alert('🔒 Tài khoản này đang bị khóa. Hãy liên hệ Quản trị viên.');
  }
  if(String(account.name||'').trim().toLocaleLowerCase('vi-VN')!==normalizedLoginName){
    return alert('❌ Tên thành viên không khớp với mã được cấp.');
  }

  if(account.password===null || account.password===''){
    account.password=password;
    const firstMember=state.membersList.find(m=>m.id===account.memberId);
    if(firstMember) firstMember.password=password;
  }else if(account.password!==password){
    return alert('❌ Mật khẩu không đúng.');
  }

  if(!account.firstLoginAt){ account.firstLoginAt=new Date().toISOString(); resetProgressForNewMember(); }
  const member=ensureMemberAccountLink(account);
  if(member){
    member.status='Đang hoạt động';
    member.lastActive='Vừa xong';
    member.currentAction='Học tập';
  }
  completeLoginSession({name:account.name||name,role:'Member',code:account.code,memberId:account.memberId});
}

function handleLogout(){
  const current=state.sessionAuth;
  persistActiveUserData();
  if(current && current.role==='Member'){
    const now=new Date().toISOString();
    const a=findMemberAccount(current);
    const m=a ? state.membersList.find(x=>String(x.id)===String(a.memberId)) : null;
    if(a){ a.lastLogout=now; a.lastActive='Đã đăng xuất'; }
    if(m){ m.status='Đã đăng xuất'; m.currentAction='Đã thoát'; m.lastActive='Đã đăng xuất'; }
  }
  setSessionAuth(null);
  save();
  menuCompact=false;
  currentNavId='home';
  $('authScreen').style.display='flex';
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  const home=$('home'); if(home) home.classList.add('active');
  $('loginNameInput').value='';$('loginPasswordInput').value='';$('loginCodeInput').value='';
}

function handleGuestLogin(){
  /* Guest là phiên xem thử, KHÔNG ghi đè dữ liệu thật của thành viên/Admin. */
  state.sessionAuth={name:'Khách (Guest)',role:'Guest',code:'GUEST'};
  document.body.dataset.role='Guest';
  checkAuthSession();
  currentNavId='home';
  menuCompact=false;
  go('home');
}

function resetProgressForNewMember(){
  state.xp=0;
    try{finalRefreshLevelPanels();}catch(e){}state.level=0;state.streak=0;state.bestStreak=0;state.activities=0;state.bestTasks=0;state.bestXPDay=0;state.todayXP=0;state.todayActivities=0;state.lastActivityDate='';state.unlockedAchievements=[];state.activityDates=[];
}

const UI_ICON_PATHS={
  home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z"/><path d="M9 21v-6h6v6"/>',
  moon:'<path d="M20.5 14.3A8.5 8.5 0 0 1 9.7 3.5 8.5 8.5 0 1 0 20.5 14.3Z"/>',
  todo:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  study:'<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
  trophy:'<path d="M8 4h8v4a4 4 0 0 1-8 0Z"/><path d="M8 6H5v2a3 3 0 0 0 3 3M16 6h3v2a3 3 0 0 1-3 3M12 12v4M8 20h8M10 16h4"/>',
  leaf:'<path d="M20 4C12 4 6 7 6 14c0 3 2 5 5 5 7 0 9-6 9-15Z"/><path d="M4 20c4-5 8-8 14-11"/>',
  heart:'<path d="M20.8 8.7c0 5.2-8.8 10.3-8.8 10.3S3.2 13.9 3.2 8.7A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8.8 2.3Z"/>',
  calendar:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  camera:'<path d="M4 7h3l2-3h6l2 3h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z"/><circle cx="12" cy="13" r="3.5"/>',
  image:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9" r="1.5"/><path d="m3 17 5-5 4 4 3-3 6 6"/>',
  book:'<path d="M4 5a2 2 0 0 1 2-2h6v17H6a2 2 0 0 0-2 2Z"/><path d="M20 5a2 2 0 0 0-2-2h-6v17h6a2 2 0 0 1 2 2Z"/>',
  chart:'<path d="M4 19V5M4 19h17"/><path d="m7 15 3-4 3 2 5-6"/>',
  bot:'<rect x="4" y="7" width="16" height="13" rx="3"/><path d="M12 3v4M8 12h.01M16 12h.01M8 16h8"/>',
  trash:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  shield:'<path d="M12 3 20 6v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6Z"/><path d="m9 12 2 2 4-4"/>',
  crown:'<path d="m3 7 4 4 5-7 5 7 4-4-2 13H5Z"/><path d="M5 17h14"/>',
};
function uiIcon(name,label=''){
  const path=UI_ICON_PATHS[name]||UI_ICON_PATHS.todo;
  return `<svg class="ui-icon" viewBox="0 0 24 24" role="img" aria-label="${esc(label)}" focusable="false">${path}</svg>`;
}

function setupNavAndAdminRole(){
  const role = state.sessionAuth ? state.sessionAuth.role : 'Guest';
  document.body.dataset.role = role;

  /* KHÁCH VẪN ĐƯỢC XEM VÀ ĐI QUA TOÀN BỘ CÁC TRANG.
     Chỉ các thao tác làm thay đổi dữ liệu mới bị khóa. */
  let baseNav = [
      ['home','home','Tổng quan'],['endday','moon','Kết ngày'],['todo','todo','Kế hoạch'],['study','study','Học tập'],
      ['achievements','trophy','Thành tích'],['habit','leaf','Thói quen'],['mood','heart','Cảm xúc'],
      ['schedule','calendar','Lịch'],['moments','camera','Khoảnh khắc'],['journey','image','Hành trình'],['journal','book','Nhật ký'],['summary','chart','Tổng kết'],['compare','trophy','Bảng xếp hạng'],['data','bot','Dữ liệu'],['trash','trash','Thùng rác'],['profile','user','Profile']
    ];
  if(['Admin','Founder'].includes(role)) baseNav.splice(1,0,['admin',role==='Founder'?'shield':'crown','Quản trị']);
  $('nav').innerHTML=baseNav.map(([id,icon,label])=>`<button type="button" class="navbtn" data-go="${id}">${uiIcon(icon,label)}<span>${esc(label)}</span></button>`).join('');
  const adminControls=$('adminAchievementControls'); if(adminControls) adminControls.style.display=(['Admin','Founder'].includes(role))?'grid':'none';
  const aiThemeCommandBox=$('aiThemeCommandBox'); if(aiThemeCommandBox) aiThemeCommandBox.style.display=(['Admin','Founder'].includes(role))?'block':'none';
  document.querySelectorAll('.admin-only-command').forEach(el=>el.style.display=(['Admin','Founder'].includes(role))?'':'none');
  document.querySelectorAll('.founder-only-admin-card').forEach(el=>el.style.display=(role==='Founder')?'':'none');
  const adminMotivationCard=$('adminMotivationCard'); if(adminMotivationCard) adminMotivationCard.style.display=(['Admin','Founder'].includes(role))?'':'none';
  applyGuestReadOnly();
  updateMenu();
}

function applyGuestReadOnly(){
  const isGuest = state.sessionAuth && state.sessionAuth.role === 'Guest';
  document.querySelectorAll('input,textarea,select').forEach(el=>{
    if(isGuest){
      if(el.tagName==='SELECT' || el.type==='checkbox' || el.type==='radio') el.disabled=true;
      else el.readOnly=true;
      el.classList.toggle('guest-disabled',true);
    }else{
      el.disabled=false;
      el.readOnly=false;
      el.classList.remove('guest-disabled');
    }
  });
}

/* 🧭 CHỈ THU GỌN MENU — KHÔNG ẨN/THU GỌN BẤT KỲ NỘI DUNG NÀO */
let menuCompact=false;
let currentNavId='home';

function updateMenu(){
  const nav=$('nav');
  if(!nav) return;
  nav.classList.toggle('compact',menuCompact);
  nav.querySelectorAll('.navbtn').forEach(b=>{
    b.classList.toggle('active',b.dataset.go===currentNavId);
  });
}

function go(id){
  const role = state.sessionAuth ? state.sessionAuth.role : 'Guest';
  /* Guest được mở mọi trang để xem; khóa dữ liệu được xử lý ở thao tác nhập/lưu. */
  const target=$(id);
  if(!target) return;

  /* Bấm lại đúng menu đang chọn => mở toàn bộ menu */
  if(id===currentNavId){
    menuCompact=!menuCompact;
  }else{
    currentNavId=id;
    menuCompact=true;
  }

  /* Chỉ đổi trang nội dung. Không đụng các card/section bên trong. */
  document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));
  target.classList.add('active');

  location.hash=id;
  updateMenu();
  requestRenderAll();
}

function adminAddMotivation(){
  if(!['Admin','Founder'].includes(state.sessionAuth?.role)) return alert('⚠️ Chỉ Quản trị viên hoặc Người sáng lập mới có quyền thêm lời động viên.');
  const rank=$('adminMotivationRank')?.value; const text=$('adminMotivationText')?.value.trim();
  if(!rank || !text) return alert('⚠️ Hãy chọn hạng và nhập lời động viên.');
  state.rankMotivations=state.rankMotivations||{}; state.rankMotivations[rank]=state.rankMotivations[rank]||[];
  state.rankMotivations[rank].push(text); save(); renderAdminMotivations(); renderComparison();
}
function adminDeleteMotivation(rank,index){
  if(!['Admin','Founder'].includes(state.sessionAuth?.role)) return;
  if(!state.rankMotivations?.[rank]) return; state.rankMotivations[rank].splice(index,1); save(); renderAdminMotivations(); renderComparison();
}
function renderAdminMotivations(){
  const box=$('adminMotivationList'); if(!box) return;
  if(!['Admin','Founder'].includes(state.sessionAuth?.role)){box.innerHTML='';return;}
  const entries=Object.entries(state.rankMotivations||{}).flatMap(([rank,arr])=>(arr||[]).map((t,i)=>({rank,t,i})));
  box.innerHTML=entries.length?entries.map(x=>`<div class="card" style="padding:10px;margin:6px 0"><b>${esc(x.rank)}</b><div>${esc(x.t)}</div><button class="btn danger sm" style="margin-top:6px" onclick="adminDeleteMotivation('${esc(x.rank)}',${x.i})">Xóa</button></div>`).join(''):'<p class="muted">Chưa có lời động viên tùy chỉnh.</p>';
}

/* 🛡️ FOUNDER PERMISSION MATRIX — CHỈ HIỂN THỊ, KHÔNG TẠO STATE/SCHEMA MỚI */
const FOUNDER_PERMISSION_GROUPS = [
  {title:'👥 Thành viên & liên kết tài khoản',items:[
    ['Xem danh sách hợp nhất','membersList + memberAccounts được nối theo memberId; phục hồi bản ghi hiển thị bị thiếu.'],
    ['Xem hoạt động và tiến độ','Tên, memberId, trạng thái, hoạt động gần nhất, XP, số hoạt động và phút học đã lưu.'],
    ['Cấp mã / cấp lại mã','Tạo mã mới hoặc chỉ thay code; mật khẩu, tiến độ, lịch sử và userData được giữ nguyên.'],
    ['Khóa / mở khóa tài khoản','Founder có thể khóa hoặc mở khóa Member/Admin; không thể khóa Founder.'],
    ['Nâng cấp / hạ cấp vai trò','Quản lý Member/Admin và bảo vệ nguyên tắc chỉ có một Founder.'],
    ['Xóa tài khoản','Được phép xóa tài khoản thành viên theo thao tác xác nhận; không thể xóa Founder.']
  ]},
  {title:'🏆 Nội dung & cộng đồng',items:[
    ['Quản lý thành tích và nhiệm vụ','Thêm/xóa nội dung quản trị và nhiệm vụ nhận XP theo các thao tác Admin/Founder hiện có.'],
    ['Quản lý lời động viên','Thêm/xóa lời động viên theo hạng trong bảng xếp hạng.'],
    ['Tạo và gán Role tùy chỉnh','Tạo Role, màu sắc, hiệu ứng và gán cho thành viên; chỉ Founder được dùng xưởng Role.']
  ]},
  {title:'🔐 Bảo toàn dữ liệu',items:[
    ['Không đổi schema','Bảng quyền chỉ là giao diện mô tả, không tạo key state hoặc bảng dữ liệu mới.'],
    ['Không tự động xóa dữ liệu','Các thao tác phá dữ liệu đều yêu cầu hành động riêng và xác nhận; cấp lại mã không xóa dữ liệu.'],
    ['Theo dõi quyền đang áp dụng','Mọi thao tác nhạy cảm tiếp tục được kiểm tra bằng role Founder trong runtime.']
  ]}
];
function renderFounderPermissionMatrix(){
  const box=$('founderPermissionMatrix');
  if(!box) return;
  if(state.sessionAuth?.role!=='Founder'){box.innerHTML='';return;}
  box.innerHTML=FOUNDER_PERMISSION_GROUPS.map(group=>`<section class="founder-permission-group"><h4>${esc(group.title)}</h4><div class="founder-permission-list">${group.items.map(([name,detail])=>`<div class="founder-permission-row"><span class="founder-permission-check">✓</span><div><b>${esc(name)}</b><div class="muted">${esc(detail)}</div></div></div>`).join('')}</div></section>`).join('');
}

/* 👑 ADMIN MEMBER MANAGEMENT */
function renderAdminView(){
  if(!state.sessionAuth || !['Admin','Founder'].includes(state.sessionAuth.role)) return;
  const founderOnly = state.sessionAuth.role==='Founder';
  document.querySelectorAll('.founder-only-admin-card').forEach(el=>el.style.display=founderOnly?'':'none');
  normalizeStateAccounts();
  const repaired=reconcileMemberAccountRecords();
  if(repaired)save({render:false});
  if(founderOnly){
    renderFounderPermissionMatrix();
    renderCustomRoles();
  }
  const container=$('adminMemberListContainer');
  if(!container) return;
  container.hidden=false;
  container.dataset.canViewMembers='true';
  container.dataset.canManageMembers=founderOnly?'true':'false';
  const accounts = (state.membersList||[]).filter(m=>m.role==='Member'||m.role==='Admin'||m.role==='Founder').map(m=>({m,a:state.memberAccounts.find(x=>String(x.memberId)===String(m.id))||null}));
  container.innerHTML=`<h3 style="color:var(--red);margin-bottom:6px;">👥 QUẢN LÝ THÀNH VIÊN</h3><p class="muted" style="margin:0 0 12px">Admin và Founder đều có thể xem danh sách và thông tin thành viên; thao tác khóa, xóa hoặc thay đổi cấp bậc vẫn chỉ dành cho Người sáng lập.</p>`+
    (accounts.length ? accounts.map(({m,a})=>{
      const code=a?.code || m.code || '—';
      return `<div class="card" style="margin-bottom:12px;padding:14px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
        <div>
          <b>${m.role==='Founder'?'🛡️':m.role==='Admin'?'👑':'👤'} ${esc(m.name)}</b> <span class="tag">${esc(m.role||'Member')}</span>${renderRoleBadges(m.id)}${renderPublicAchievementBadges(m.id)}${renderPublicZoneBadges(m.id)}
          <div class="kpi">Mã: <b>${esc(code)}</b> | ${m.locked?'🔒 Đang khóa':'✨ Đang hoạt động'}</div>
          <div class="kpi">Tiến độ: <b>${Number(getAdminProgress(m.id,a).xp)||0} XP</b> · ${Number(getAdminProgress(m.id,a).activities)||0} hoạt động · ${Number(getAdminProgress(m.id,a).studyMinutes)||0} phút học</div>
          <div style="font-size:11px;color:var(--muted)">${esc(m.lastActive||'Chưa đăng nhập')}</div>
        </div>
        <div class="actions">
          <button class="btn sm light" onclick="adminViewMember('${m.id}')">Xem</button>
          ${state.sessionAuth.role==='Founder' && m.role!=='Founder'?`<button class="btn sm ${m.locked?'':'gray'}" onclick="adminToggleLock('${m.id}')">${m.locked?'Mở khóa':'Khóa'}</button>`:''}
          ${state.sessionAuth.role==='Founder' && m.role==='Admin'?`<button class="btn sm" onclick="adminDemoteToMember('${m.id}')">Hạ cấp</button>`:''}          ${state.sessionAuth.role==='Founder' && m.role!=='Founder'?`<button class="btn sm danger" onclick="adminDeleteMember('${m.id}')">Xóa</button>`:''}
          ${m.role==='Member'&&a?`<button class="btn sm light" onclick="adminResetMemberCode('${m.id}')">🔐 Cấp lại mã</button>`:''}
        </div>
      </div>`;
    }).join('') : '<p class="muted">Chưa có mã thành viên nào. Hãy nhấn “Cấp mã thành viên mới”.</p>');
}

function getAdminProgress(memberId,account){
  const bucket=state.userData?.accounts?.[String(memberId)]||state.userData?.accounts?.[memberId]||{};
  const source=account?.progress||{};
  return {xp:Number(bucket.xp??source.xp??0)||0,activities:Number(bucket.activities??source.activities??0)||0,studyMinutes:Number(bucket.studyMinutes??source.studyMinutes??0)||0};
}
function reconcileMemberAccountRecords(){
  if(!Array.isArray(state.memberAccounts))state.memberAccounts=[];
  if(!Array.isArray(state.membersList))state.membersList=[];
  let changed=false;
  state.memberAccounts.forEach(account=>{
    if(!account?.memberId)return;
    let member=state.membersList.find(x=>String(x.id)===String(account.memberId));
    if(!member){
      member={id:account.memberId,name:account.name||'Thành viên',role:account.role||'Member',status:account.lastActive==='Đã đăng xuất'?'Đã đăng xuất':'Chưa đăng nhập',currentAction:'Chưa bắt đầu',lastActive:account.lastActive||'Chưa đăng nhập',locked:Boolean(account.locked),code:account.code,password:account.password||null};
      state.membersList.push(member);changed=true;
    }
    const next={name:account.name||member.name,role:account.role||member.role||'Member',code:account.code,locked:Boolean(account.locked)};
    Object.entries(next).forEach(([key,value])=>{if(member[key]!==value){member[key]=value;changed=true;}});
    if(account.lastActive && member.lastActive!==account.lastActive){member.lastActive=account.lastActive;changed=true;}
  });
  return changed;
}

function adminIssueMemberCode(){
  if(!state.sessionAuth || !['Admin','Founder'].includes(state.sessionAuth.role)) return;
  showModal('🎟️ Cấp mã thành viên', `
    <div class="form">
      <label>Tên thành viên</label>
      <input id="issueMemberName" placeholder="Ví dụ: Nguyễn Văn A">
      <label>Mã thành viên mong muốn</label>
      <input id="issueMemberCode" maxlength="20" autocomplete="off" placeholder="Ví dụ: YEN123, TOAN2026">
      <small style="display:block;color:var(--muted);margin-top:5px;">💡 Thành viên có thể chọn mã dễ nhớ. Mã phải là duy nhất; không được dùng 111 hoặc 999.</small>
      <button class="btn" style="margin-top:12px" onclick="confirmIssueMemberCode()">🎟️ Cấp mã ngay</button>
    </div>`);
}

function confirmIssueMemberCode(){
  if(!state.sessionAuth || !['Admin','Founder'].includes(state.sessionAuth.role)) return;
  const name=$('issueMemberName')?.value.trim();
  const code=($('issueMemberCode')?.value||'').trim().toUpperCase();
  if(!name || !code) return alert('⚠️ Hãy nhập đủ tên thành viên và mã thành viên.');
  if(code==='111' || code==='999') return alert('🔒 111 và 999 là mã vai trò hệ thống, không thể cấp làm mã thành viên.');
  if(!/^[A-Z0-9_-]{3,20}$/.test(code)) return alert('⚠️ Mã thành viên dài 3–20 ký tự, chỉ gồm chữ cái không dấu, số, dấu gạch ngang hoặc gạch dưới.');
  const normalizedName=name.toLocaleLowerCase('vi-VN');
  if(state.memberAccounts.some(a=>String(a.name||'').trim().toLocaleLowerCase('vi-VN')===normalizedName) || state.membersList.some(m=>String(m.name||'').trim().toLocaleLowerCase('vi-VN')===normalizedName)) return alert('🚨 Tên thành viên đã tồn tại. Vui lòng dùng một tên khác.');
  if(state.memberAccounts.some(a=>String(a.code||'').trim().toUpperCase()===code) || state.membersList.some(m=>String(m.code||'').trim().toUpperCase()===code)) return alert('🚨 Mã thành viên này đã được sử dụng. Mỗi mã chỉ được gắn với một tài khoản. Hãy chọn mã khác.');
  const memberId=uid();
  const account={memberId,code,name,password:null,role:'Member',locked:false,createdAt:new Date().toISOString(),progress:{studyMinutes:0,tasksDone:0,tasksTotal:0,habitsDone:0,habitsTotal:0,overall:0,activities:0,streak:0,xp:0,studyUpdatedAt:null}};
  state.memberAccounts.push(account);
  state.membersList.push({id:memberId,name,role:'Member',status:'Chưa đăng nhập',currentAction:'Chưa bắt đầu',lastActive:'Chưa đăng nhập',locked:false,code,password:null});
  save();
  $('modalTitle').textContent='✅ Đã cấp mã thành viên';
  $('modalBody').innerHTML=`
    <div style="text-align:center;padding:10px 0;">
      <div style="font-size:40px">🎟️</div>
      <p><b>Tên:</b> ${esc(name)}</p>
      <p style="font-size:24px;margin:12px 0"><b>${esc(code)}</b></p>
      <p class="muted">Mã này chỉ thuộc về tài khoản <b>${esc(name)}</b>. Mật khẩu sẽ do thành viên tự thiết lập ở lần đăng nhập đầu tiên.</p>
      <button class="btn" onclick="closeModal();renderAdminView()">Đã lưu mã</button>
    </div>`;
}

function adminResetMemberCode(id){
  if(!state.sessionAuth || !['Admin','Founder'].includes(state.sessionAuth.role)) return alert('🔒 Chỉ Admin hoặc Founder mới có quyền cấp lại mã thành viên.');
  const m=state.membersList.find(x=>String(x.id)===String(id));
  const a=state.memberAccounts.find(x=>String(x.memberId)===String(id));
  if(!m || !a) return alert('❌ Không tìm thấy liên kết tài khoản thành viên.');
  if(m.role!=='Member') return alert('ℹ️ Chỉ có thể cấp lại mã cho tài khoản Thành viên.');
  const nextCode=randomMemberCode();
  a.code=nextCode;
  m.code=nextCode;
  // Chỉ đổi mã đăng nhập; password, progress, userData và lịch sử được giữ nguyên.
  save();
  renderAdminView();
  showModal('✅ Đã cấp lại mã thành viên', `<div style="text-align:center;padding:10px 0"><div style="font-size:40px">🎟️</div><p><b>Tài khoản:</b> ${esc(a.name||m.name)}</p><p style="font-size:24px;margin:12px 0"><b>${esc(nextCode)}</b></p><p class="muted">Mã cũ đã được thay thế. Mật khẩu, tiến độ, lịch sử và hoạt động của tài khoản vẫn được giữ nguyên.</p><button class="btn" onclick="closeModal()">Đã hiểu</button></div>`);
}

function adminViewMember(id){
  const m = state.membersList.find(x => String(x.id) === String(id));
  if(!m) return;
  const a=state.memberAccounts.find(x=>String(x.memberId)===String(m.id));
  const p=getAdminProgress(m.id,a);
  showModal(`👤 Thông tin thành viên: ${m.name}`, `
    <p><b>Tên:</b> ${esc(m.name)}</p>
    <p><b>memberId liên kết:</b> <code>${esc(a?.memberId||m.id||'—')}</code></p>
    <p><b>Vai trò:</b> ${esc(m.role)}</p>
    <p><b>Trạng thái:</b> ${esc(m.status)}</p>
    <p><b>Hoạt động hiện tại:</b> ${esc(m.currentAction)}</p>
    <p><b>Thời điểm hoạt động gần nhất:</b> ${esc(m.lastActive)}</p>
    <p><b>Tình trạng khóa:</b> ${m.locked?'Đang bị khóa':'Hoạt động'}</p>
    <p><b>Mã đăng nhập hiện tại:</b> ${esc(a?.code || m.code || '—')}</p>
    <p><b>Tiến độ đã lưu:</b> ${Number(p.activities)||0} hoạt động · ${Number(p.studyMinutes)||0} phút học · ${Number(p.xp)||0} XP</p>
    ${m.role==='Member'&&a?`<button class="btn light" onclick="adminResetMemberCode('${esc(String(m.id))}')">🔐 Cấp lại mã, giữ nguyên dữ liệu</button>`:''}
  `);
}

function adminToggleLock(id){
  if(!state.sessionAuth || state.sessionAuth.role!=='Founder') return alert('🔒 Chỉ Người sáng lập web mới có quyền khóa/mở khóa tài khoản.');
  const m=state.membersList.find(x=>x.id===id);
  const a=state.memberAccounts.find(x=>x.memberId===id);
  if(!m || !a) return alert('❌ Không tìm thấy tài khoản.');
  if(m.role==='Founder') return alert('🛡️ Không thể khóa tài khoản Người sáng lập web.');
  a.locked=!a.locked;
  m.locked=a.locked;
  m.status=a.locked?'Không hoạt động':'Đang hoạt động';
  save(); renderAdminView();
  alert(`Đã ${a.locked?'khóa':'mở khóa'} tài khoản ${m.name}.`);
}

function adminChangeRoleByCode(){
  if(!state.sessionAuth || state.sessionAuth.role!=='Founder') return alert('🔒 Chỉ Người sáng lập web mới có quyền nâng cấp/hạ cấp tài khoản tại khu Quản trị.');
  const name=($('roleTargetName')?.value||'').trim();
  const code=($('roleTargetCode')?.value||'').trim();
  if(!name || !['111','999'].includes(code)) return alert('⚠️ Hãy nhập tên tài khoản và mã 111 hoặc 999.');
  const target=state.membersList.find(m=>String(m.name||'').trim().toLocaleLowerCase('vi-VN')===name.toLocaleLowerCase('vi-VN'));
  if(!target) return alert('❌ Không tìm thấy tài khoản này.');
  const actor=state.sessionAuth.role;
  if(target.role==='Founder' && actor!=='Founder') return alert('🛡️ Chỉ Người sáng lập web mới có thể thay đổi tài khoản Người sáng lập.');
  if(code==='111'){
    if(actor!=='Founder') return alert('🔒 Chỉ Người sáng lập web mới được nâng cấp tài khoản thành Người sáng lập.');
    const currentFounder=state.membersList.find(m=>m.role==='Founder' && m.id!==target.id);
    if(currentFounder) return alert('⚠️ Chỉ có một tài khoản Người sáng lập web.');
    target.role='Founder'; target.code='111'; target.locked=false;
    const targetAcc=state.memberAccounts.find(a=>a.memberId===target.id);
    if(targetAcc){ target.password=targetAcc.password; targetAcc.role='Founder'; targetAcc.code='111'; state.founderPassword=targetAcc.password; }
    state.sessionAuth={...state.sessionAuth};
    save(); renderAdminView(); alert(`🛡️ ${target.name} đã trở thành Người sáng lập web.`); return;
  }
  // 999 = Admin
  if(target.role==='Founder') return alert('🛡️ Không thể hạ cấp Người sáng lập web bằng mã 999.');
  if(target.role==='Admin' && actor==='Admin') return alert('🔒 Quản trị viên không thể tự hạ cấp hoặc thay đổi cấp của Quản trị viên khác.');
  target.role='Admin'; target.code='999'; target.locked=false;
  const acc=state.memberAccounts.find(a=>a.memberId===target.id);
  if(acc){ target.password=acc.password; acc.role='Admin'; acc.code='999'; }
  save(); renderAdminView(); alert(`👑 ${target.name} đã được nâng cấp thành Quản trị viên (999).`);
}

function adminDemoteToMember(id){
  if(!state.sessionAuth || state.sessionAuth.role!=='Founder') return alert('🔒 Chỉ Người sáng lập web mới có quyền hạ cấp tài khoản.');
  const target=state.membersList.find(x=>x.id===id);
  if(!target) return;
  if(target.role==='Founder') return alert('🛡️ Không thể hạ cấp Người sáng lập web.');
  if(target.role!=='Admin') return alert('ℹ️ Tài khoản này không phải Quản trị viên.');
  if(state.sessionAuth.role==='Admin' && target.name===state.sessionAuth.name) return alert('🔒 Bạn không thể tự hạ cấp chính mình.');
  const code=randomMemberCode();
  const existing=state.memberAccounts.find(a=>a.memberId===id);
  if(existing){ existing.role='Member'; existing.code=code; existing.password=target.password||existing.password; }
  else state.memberAccounts.push({memberId:id,code,name:target.name,password:target.password||'',locked:false,createdAt:new Date().toISOString(),progress:target.progress||{studyMinutes:0,tasksDone:0,tasksTotal:0,habitsDone:0,habitsTotal:0,overall:0,activities:0,streak:0,xp:0,studyUpdatedAt:null}});
  target.role='Member'; target.code=code; target.locked=false; delete target.password;
  save(); renderAdminView(); alert(`👤 ${target.name} đã được hạ cấp thành Thành viên. Mã mới: ${code}`);
}

function adminDeleteMember(id){
  if(!state.sessionAuth || state.sessionAuth.role!=='Founder') return alert('🔒 Chỉ Người sáng lập web mới có quyền xóa tài khoản.');
  const m=state.membersList.find(x=>x.id===id);
  const a=state.memberAccounts.find(x=>x.memberId===id);
  if(!m || !a) return alert('❌ Không tìm thấy tài khoản.');
  if(m.role==='Founder') return alert('🛡️ Không thể xóa tài khoản Người sáng lập web.');
  if(confirm(`Bạn có chắc muốn xóa tài khoản ${m.name} và mã ${a.code}?`)){
    state.memberAccounts=state.memberAccounts.filter(x=>x.memberId!==id);
    state.membersList=state.membersList.filter(x=>x.id!==id);
    save(); renderAdminView();
    alert('🗑️ Đã xóa tài khoản thành viên.');
  }
}

/* 🎨 CUSTOM ROLE SYSTEM — CHỈ FOUNDER TẠO/GÁN ROLE */
function getCustomRolesForMember(memberId){
  if(!memberId) return [];
  const m=state.membersList.find(x=>x.id===memberId);
  const a=state.memberAccounts.find(x=>x.memberId===memberId);
  const ids=[...(Array.isArray(m?.customRoleIds)?m.customRoleIds:[]),...(Array.isArray(a?.customRoleIds)?a.customRoleIds:[])];
  if(m?.customRoleId) ids.push(m.customRoleId);
  if(a?.customRoleId) ids.push(a.customRoleId);
  return [...new Set(ids)].map(id=>(state.customRoles||[]).find(r=>r.id===id)).filter(Boolean);
}
function getCustomRoleForMember(memberId){ return getCustomRolesForMember(memberId)[0]||null; }

/* 🎨 300 KIỂU PHẦN THƯỞNG ROLE = 30 chủ đề icon bay xung quanh × 10 bảng màu rực rỡ */
const ROLE_ICON_THEMES=[
  {name:'Động vật rừng',icons:['🦊','🐺','🦁','🐻','🦌']},
  {name:'Động vật biển',icons:['🐬','🐳','🐠','🦈','🐙']},
  {name:'Chim chóc',icons:['🦅','🦉','🕊️','🦜','🦚']},
  {name:'Côn trùng',icons:['🐝','🦋','🐞','🐛','🦗']},
  {name:'Trái tim bay',icons:['💖','💕','💓','💗','💝']},
  {name:'Lấp lánh',icons:['✨','🌟','💫','⭐','🌠']},
  {name:'Phép thuật',icons:['🔮','🪄','🌙','⚡','🧿']},
  {name:'Hoa cỏ',icons:['🌸','🌺','🌻','🌼','🌷']},
  {name:'Vũ trụ',icons:['🪐','🚀','🛸','🌌','☄️']},
  {name:'Rồng huyền thoại',icons:['🐉','🐲','🔥','⚔️','🛡️']},
  {name:'Kho báu',icons:['💎','👑','🏆','🥇','💰']},
  {name:'Thời tiết',icons:['⛅','🌈','❄️','⚡','🌙']},
  {name:'Trái cây',icons:['🍎','🍊','🍇','🍓','🍒']},
  {name:'Kẹo ngọt',icons:['🍭','🍬','🧁','🍩','🍫']},
  {name:'Bóng bay tiệc',icons:['🎈','🎉','🎊','🎁','🪅']},
  {name:'Sách vở',icons:['📚','📖','✏️','🎓','🧠']},
  {name:'Ngọn lửa',icons:['🔥','🌋','⚡','💥','✨']},
  {name:'Băng giá',icons:['❄️','🧊','⛄','🌨️','💎']},
  {name:'Mèo cún',icons:['🐱','🐶','🐹','🐰','🐨']},
  {name:'Khủng long',icons:['🦕','🦖','🐊','🦎','🥚']},
  {name:'Thiên thần',icons:['😇','🕊️','✨','🌟','💫']},
  {name:'Cầu vồng',icons:['🌈','🦄','☀️','🌸','🎨']},
  {name:'Nhạc điệu',icons:['🎵','🎶','🎼','🎸','🥁']},
  {name:'Vương miện',icons:['👑','💍','💎','🏰','⚜️']},
  {name:'Sao băng',icons:['🌠','☄️','⭐','🌌','✨']},
  {name:'Đại dương sâu',icons:['🐋','🐡','🦑','🪸','🐚']},
  {name:'Rừng xanh',icons:['🌳','🌲','🍃','🌿','🍄']},
  {name:'Chiến binh',icons:['⚔️','🛡️','🏹','🗡️','🔱']},
  {name:'Bươm bướm hoa',icons:['🦋','🌸','🌺','🐝','🌼']},
  {name:'Thiên hà',icons:['🌌','🪐','⭐','🌠','🚀']}
];
const ROLE_COLOR_PALETTES=[
  {name:'Xuân xanh',colors:['#a8e6cf','#56c596','#2e8b57','#dcedc1']},
  {name:'Hồng phấn',colors:['#ffd1dc','#ff9fb2','#ff6f91','#ffc2d1']},
  {name:'Hoàng hôn',colors:['#ff9a56','#ff6f61','#ffcc70','#f76c5e']},
  {name:'Đại dương',colors:['#48c6ef','#6f86d6','#0575e6','#00c6fb']},
  {name:'Tím huyền bí',colors:['#a18cd1','#fbc2eb','#8e2de2','#4a00e0']},
  {name:'Vàng kim',colors:['#f6d365','#fda085','#ffd700','#f7971e']},
  {name:'Bầu trời đêm',colors:['#0f2027','#203a43','#2c5364','#4b6cb7']},
  {name:'Cầu vồng',colors:['#ff0000','#ff9900','#33cc33','#3399ff','#9933ff']},
  {name:'Ngọc lục bảo',colors:['#11998e','#38ef7d','#00b09b','#96c93d']},
  {name:'Ánh kim rực rỡ',colors:['#ee0979','#ff6a00','#fdc830','#f37335']}
];
const ROLE_ANIM_STYLES=['roleSpin','roleFlow','rolePulse'];
function ensureRoleDecorStyles(){
  if(document.getElementById('roleDecorStyles')) return;
  const st=document.createElement('style'); st.id='roleDecorStyles'; st.textContent=`
    @keyframes roleSpin{to{background-position:200% center}}
    @keyframes roleFlow{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
    @keyframes rolePulse{0%,100%{filter:brightness(1)}50%{filter:brightness(1.25)}}
    @keyframes roleDriftA{0%{transform:translate(0,0) rotate(0deg)}50%{transform:translate(8px,-14px) rotate(12deg)}100%{transform:translate(0,0) rotate(0deg)}}
    @keyframes roleDriftB{0%{transform:translate(0,0) rotate(0deg)}50%{transform:translate(-10px,-10px) rotate(-14deg)}100%{transform:translate(0,0) rotate(0deg)}}
    .role-decor-box{position:relative;overflow:hidden;border-radius:18px;padding:22px 10px;text-align:center}
    .role-decor-float{position:absolute;font-size:22px;opacity:.85;pointer-events:none;animation-duration:3.4s;animation-iteration-count:infinite;animation-timing-function:ease-in-out}
  `; document.head.appendChild(st);
}
function roleGradientCss(role,angle){
  const palette=(ROLE_COLOR_PALETTES[role?.paletteId]||{}).colors || [role?.color1||'#e8f5e9', role?.color2||role?.color1||'#c8e6c9'];
  return `linear-gradient(${angle||135}deg,${palette.join(',')})`;
}
function renderRoleFloatingDecor(role,count){
  const theme=ROLE_ICON_THEMES[role?.iconThemeId] || ROLE_ICON_THEMES[5];
  const n=count||10; let out='';
  for(let i=0;i<n;i++){
    const icon=theme.icons[i%theme.icons.length];
    const top=Math.round(Math.random()*80)+5, left=Math.round(Math.random()*90)+2;
    const delay=(Math.random()*2).toFixed(2), dur=(2.6+Math.random()*2.2).toFixed(2);
    const anim=i%2===0?'roleDriftA':'roleDriftB';
    out+=`<span class="role-decor-float" style="top:${top}%;left:${left}%;animation-name:${anim};animation-duration:${dur}s;animation-delay:${delay}s">${icon}</span>`;
  }
  return out;
}
function renderRoleCelebrationBox(role,innerHtml){
  ensureRoleDecorStyles();
  const grad=roleGradientCss(role,135);
  const anim=role?.animStyle||'roleFlow';
  const bgSize = anim==='roleSpin' ? '250% 100%' : '300% 300%';
  return `<div class="role-decor-box" style="background:${grad};background-size:${bgSize};animation:${anim} ${anim==='rolePulse'?'2.2s':'6s'} ease-in-out infinite">
    ${renderRoleFloatingDecor(role,12)}
    <div style="position:relative;z-index:2">${innerHtml}</div>
  </div>`;
}
function renderRoleBadges(memberId){
  const roles=getCustomRolesForMember(memberId);
  if(!roles.length) return '';
  return '<span style="display:inline-flex;gap:5px;flex-wrap:wrap;margin-left:5px">'+roles.map(r=>`<span class="tag" title="Bấm để xem nguồn gốc" style="cursor:pointer;background:${getCustomRoleBackground(r)};color:#17321b;border:1px solid rgba(0,0,0,.08)" onclick="showRoleOrigin('${r.id}')">${esc(r.icon||'🏷️')} ${esc(r.name)}</span>`).join('')+'</span>';
}
function showRoleOrigin(roleId){
  const role=(state.customRoles||[]).find(r=>String(r.id)===String(roleId)); if(!role)return;
  const pick=(...a)=>a.find(x=>x!==undefined&&x!==null&&String(x).trim()!=='')||'';
  const x=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const sourceType=role.originType||role.sourceType||(role.achievementId?'achievement':(role.weeklyRewardId?'weekly_reward':(role.founderGift?'founder':'custom')));
  const source=sourceType==='achievement'?`🏆 Nguồn gốc từ Thành tích: ${x(pick(role.achievementName,role.achievementId,'Thành tích'))}`:sourceType==='weekly_reward'?`🎁 Nguồn gốc từ Kế hoạch hàng tuần: ${x(pick(role.weeklyRewardName,role.weeklyRewardId,'Phần thưởng tuần'))}`:sourceType==='founder'||role.founderGift?`👑 Do Người sáng lập tạo`:`🎨 Role tùy chỉnh`;
  const color=(label,val)=>`<span class="stable-origin-chip"><i style="background:${x(val||'#94a3b8')}"></i>${label}: ${x(val||'Chưa thiết lập')}</span>`;
  const d=role.design||{},e=role.effects||{};
  const html=`<div class="stable-origin-hero"><div class="stable-origin-name">${x(role.icon||'🏷️')} ${x(role.name||'Role')}</div><div class="stable-origin-source">${source}</div><div class="stable-origin-title">📜 NGUỒN GỐC ROLE</div><p>${x(pick(role.origin,role.sourceDescription,role.description,'Chưa có nguồn gốc được ghi lại.'))}</p></div><section class="stable-origin-section"><h3>🧭 Phân loại nguồn gốc</h3><p>${source}</p><p><b>Người tạo:</b> ${x(pick(role.createdByName,role.creatorName,sourceType==='founder'?'Người sáng lập web':'' ,'Chưa xác định'))}</p></section><section class="stable-origin-section"><h3>🎨 Màu sắc & phong cách</h3><p><b>Phong cách:</b> ${x(pick(role.style,d.style,'Chưa xác định'))}</p><p><b>Ý nghĩa bảng màu:</b> ${x(pick(role.paletteMeaning,d.paletteMeaning,'Chưa có giải thích màu.'))}</p><div class="stable-origin-swatches">${color('Màu 1',pick(role.color1,d.color1,''))}${color('Màu 2',pick(role.color2,d.color2,''))}${color('Màu chữ',pick(role.textColor,d.textColor,''))}${color('Màu viền',pick(role.borderColor,d.borderColor,''))}${color('Icon góc',pick(role.decorColor,e.decorColor,d.decorColor,''))}</div><p><b>Gradient:</b> ${x(pick(role.gradientCss,d.gradientCss,role.gradient,''))}</p><p><b>Ý nghĩa icon:</b> ${x(pick(role.iconMeaning,d.iconMeaning,'Chưa có dữ liệu.'))}</p></section><section class="stable-origin-section"><h3>✨ Hiệu ứng hiển thị</h3><p><b>Animation:</b> ${x(pick(role.animation,e.animation,d.animation,'none'))} · <b>Preset ánh sáng:</b> ${x(pick(role.lightPreset,e.lightPreset,d.lightPreset,'none'))}</p><p><b>Tốc độ:</b> ${x(pick(role.speed,e.speed,d.speed,'Chưa thiết lập'))} · <b>Độ mạnh:</b> ${x(pick(role.strength,e.strength,d.strength,'Chưa thiết lập'))} · <b>Hướng:</b> ${x(pick(role.direction,e.direction,d.direction,'Chưa thiết lập'))}</p><p><b>Glow:</b> ${x(String(pick(role.glow,e.glow,d.glow,'Chưa thiết lập')))} · <b>Icon góc:</b> ${x(Array.isArray(pick(role.cornerIcons,e.cornerIcons,d.cornerIcons,''))?pick(role.cornerIcons,e.cornerIcons,d.cornerIcons,'').join(', '):pick(role.cornerIcons,e.cornerIcons,d.cornerIcons,'Chưa thiết lập'))}</p></section>`;
  showModal(`${x(role.icon||'🏷️')} ${x(role.name||'Role')}`,html);
}
function getCustomRoleBackground(role){
  if(!role) return '#e8f5e9';
  if(role.gradient===false) return role.color1||'#e8f5e9';
  if(typeof role.paletteId==='number') return roleGradientCss(role,135);
  return `linear-gradient(135deg,${role.color1||'#e8f5e9'},${role.color2||role.color1||'#c8e6c9'})`;
}
function renderCustomRoles(){
  const box=$('customRolesList'); if(!box) return;
  const roles=state.customRoles||[];
  box.innerHTML=roles.length ? roles.map(r=>`<div class="card" style="padding:12px;margin:8px 0;display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap"><span style="display:inline-flex;align-items:center;gap:8px;padding:7px 12px;border-radius:999px;font-weight:800;background:${getCustomRoleBackground(r)};border:1px solid rgba(0,0,0,.08)">${esc(r.icon||'🏷️')} ${esc(r.name)}</span><div class="actions"><button class="btn sm light" onclick="founderAssignRole('${r.id}')">👤 Gán / bỏ role</button><button class="btn sm danger" onclick="founderDeleteRole('${r.id}')">Xóa role</button></div></div>`).join('') : '<p class="muted">Chưa có role tùy chỉnh. Người sáng lập có thể tạo role đầu tiên ở đây.</p>';
}
function founderCreateRole(){
  if(state.sessionAuth?.role!=='Founder') return alert('🔒 Chỉ Người sáng lập web mới được tạo role.');
  const themeOptions=ROLE_ICON_THEMES.map((t,i)=>`<option value="${i}">${t.icons.join(' ')} ${esc(t.name)}</option>`).join('');
  const paletteOptions=ROLE_COLOR_PALETTES.map((p,i)=>`<option value="${i}">🎨 ${esc(p.name)}</option>`).join('');
  showModal('🎉 Tạo role mới (300 kiểu màu mè)',`<div class="form">
    <div><label>🏷️ Tên role</label><input id="newRoleName" placeholder="Ví dụ: Người dẫn đường"></div>
    <div><label>✨ Biểu tượng huy hiệu</label><input id="newRoleIcon" maxlength="4" value="🌟"></div>
    <div><label>🦋 Icon bay xung quanh</label><select id="newRoleTheme">${themeOptions}</select></div>
    <div><label>🎨 Bảng màu</label><select id="newRolePalette">${paletteOptions}</select></div>
    <div class="full"><label><input id="newRoleGradient" type="checkbox" checked style="width:18px"> 🌈 Dùng chuyển màu động (xoay/trôi nhiều màu, không giới hạn)</label></div>
    <div class="full" id="newRolePreviewWrap" style="margin-top:6px"></div>
    <div class="full"><label>📜 Nguồn gốc / Vì sao có role này</label><textarea id="newRoleOrigin" placeholder="Ví dụ: Được tặng vì hoàn thành xuất sắc sự kiện mùa hè 2026, hoặc từ nhiệm vụ cũ..."></textarea></div>
    <div class="full"><label><input id="newRoleFounderGift" type="checkbox" style="width:18px"> 🛡️ Do Người sáng lập đích thân tặng</label></div>
  </div><button class="btn" style="margin-top:12px" onclick="confirmFounderCreateRole()">✨ Tạo role</button>`);
  const refreshPreview=()=>{
    const wrap=$('newRolePreviewWrap'); if(!wrap) return;
    const fakeRole={paletteId:Number($('newRolePalette').value),iconThemeId:Number($('newRoleTheme').value),gradient:$('newRoleGradient').checked,animStyle:ROLE_ANIM_STYLES[Number($('newRoleTheme').value)%ROLE_ANIM_STYLES.length]};
    wrap.innerHTML=renderRoleCelebrationBox(fakeRole,`<span style="font-weight:800;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.4)">${$('newRoleIcon').value||'🌟'} ${esc($('newRoleName').value||'Xem trước role')}</span>`);
  };
  ['newRoleTheme','newRolePalette','newRoleGradient','newRoleIcon','newRoleName'].forEach(id=>{ const el=$(id); if(el) el.addEventListener('input',refreshPreview); });
  refreshPreview();
}
function confirmFounderCreateRole(){
  const name=$('newRoleName')?.value.trim(), icon=$('newRoleIcon')?.value.trim()||'🏷️';
  if(!name) return alert('⚠️ Tên role không được để trống.');
  if((state.customRoles||[]).some(r=>String(r.name).toLocaleLowerCase('vi-VN')===name.toLocaleLowerCase('vi-VN'))) return alert('🚨 Role này đã tồn tại.');
  const iconThemeId=Number($('newRoleTheme').value)||0;
  const paletteId=Number($('newRolePalette').value)||0;
  const palette=ROLE_COLOR_PALETTES[paletteId].colors;
  state.customRoles.push({id:uid(),name,icon,iconThemeId,paletteId,color1:palette[0],color2:palette[palette.length-1],gradient:$('newRoleGradient').checked,animStyle:ROLE_ANIM_STYLES[iconThemeId%ROLE_ANIM_STYLES.length],origin:$('newRoleOrigin')?.value.trim()||'',founderGift:!!$('newRoleFounderGift')?.checked,createdAt:new Date().toISOString()});
  save(); closeModal(); renderCustomRoles(); renderAdminView();
}
function founderAssignRole(roleId){
  if(state.sessionAuth?.role!=='Founder') return alert('🔒 Chỉ Người sáng lập web mới được gán role.');
  const role=(state.customRoles||[]).find(r=>r.id===roleId); if(!role) return;
  const members=(state.membersList||[]).filter(m=>['Member','Admin','Founder'].includes(m.role));
  showModal('👤 Gán role: '+esc(role.name),`<div class="form"><div class="full"><label>Chọn một hoặc nhiều tài khoản</label><div id="assignRoleMembers" style="display:grid;gap:8px;max-height:320px;overflow:auto">${members.map(m=>`<label style="display:flex;align-items:center;gap:8px;padding:8px;border:1px solid var(--line);border-radius:10px"><input type="checkbox" class="assign-role-member" value="${m.id}" ${getCustomRolesForMember(m.id).some(r=>r.id===roleId)?'checked':''} style="width:18px;height:18px"><span>${m.role==='Founder'?'🛡️':m.role==='Admin'?'👑':'👤'} ${esc(m.name)} · ${esc(m.role||'Member')}</span></label>`).join('')}</div></div></div><button class="btn" style="margin-top:12px" onclick="confirmFounderAssignRole('${roleId}')">💾 Lưu gán role</button>`);
}
function confirmFounderAssignRole(roleId){
  const role=(state.customRoles||[]).find(r=>r.id===roleId); if(!role) return;
  const ids=[...document.querySelectorAll('.assign-role-member:checked')].map(x=>x.value);
  (state.membersList||[]).forEach(m=>{
    if(!['Member','Admin','Founder'].includes(m.role)) return;
    const hadRoleBefore=Array.isArray(m.customRoleIds)&&m.customRoleIds.includes(roleId);
    m.customRoleIds=Array.isArray(m.customRoleIds)?m.customRoleIds.filter(id=>id!==roleId):[];
    const nowHasRole=ids.includes(m.id);
    if(nowHasRole) m.customRoleIds.push(roleId);
    delete m.customRoleId;
    const a=state.memberAccounts.find(x=>x.memberId===m.id);
    if(a){ a.customRoleIds=Array.isArray(a.customRoleIds)?a.customRoleIds.filter(id=>id!==roleId):[]; if(nowHasRole) a.customRoleIds.push(roleId); delete a.customRoleId; }
    // 🔔 Thông báo cho thành viên khi họ vừa được tặng role mới (chưa từng có trước đó).
    if(nowHasRole && !hadRoleBefore){
      m.pendingRoleNotifs=Array.isArray(m.pendingRoleNotifs)?m.pendingRoleNotifs:[];
      m.pendingRoleNotifs.push(roleId);
      if(a){ a.pendingRoleNotifs=Array.isArray(a.pendingRoleNotifs)?a.pendingRoleNotifs:[]; a.pendingRoleNotifs.push(roleId); }
    }
  });
  save(); closeModal(); renderCustomRoles(); renderAdminView(); renderProfileView(); renderComparison();
  alert(`🎨 Đã cập nhật role ${role.icon||'🏷️'} ${role.name} cho ${ids.length} tài khoản.`);
}
function showPendingRoleNotifs(){
  const account = state.sessionAuth?.role==='Member'
    ? state.memberAccounts.find(a=>a.memberId===state.sessionAuth.memberId)
    : state.membersList.find(m=>m.id===state.sessionAuth?.memberId);
  if(!account || !Array.isArray(account.pendingRoleNotifs) || !account.pendingRoleNotifs.length) return;
  const ids=[...account.pendingRoleNotifs];
  account.pendingRoleNotifs=[];
  const member=state.membersList.find(m=>m.id===state.sessionAuth.memberId);
  if(member) member.pendingRoleNotifs=[];
  save();
  ids.forEach(roleId=>{
    const role=(state.customRoles||[]).find(r=>r.id===roleId); if(!role) return;
    const box=renderRoleCelebrationBox(role,`
        <div style="font-size:40px">🎁</div>
        <p style="color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.4)">Chúc mừng bạn đã được <b>Người sáng lập web</b> tặng role nhé!</p>
        <div style="margin-top:6px;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.4)">Role hiện tại:</div>
        <span style="display:inline-flex;align-items:center;gap:8px;margin-top:8px;padding:9px 16px;border-radius:999px;font-weight:800;font-size:16px;background:rgba(255,255,255,.9);border:1px solid rgba(0,0,0,.08)">${role.icon||'🏷️'} ${esc(role.name)}</span>
    `);
    showModal(`🎉 Chúc mừng bạn!`, box);
  });
}
function founderDeleteRole(roleId){
  if(state.sessionAuth?.role!=='Founder') return alert('🔒 Chỉ Người sáng lập web mới được xóa role.');
  const role=(state.customRoles||[]).find(r=>r.id===roleId); if(!role) return;
  if(!confirm(`Xóa role "${role.name}"? Role này sẽ bị gỡ khỏi mọi tài khoản, nhưng không ảnh hưởng vai trò hệ thống.`)) return;
  state.customRoles=state.customRoles.filter(r=>r.id!==roleId);
  state.membersList.forEach(m=>{m.customRoleIds=(m.customRoleIds||[]).filter(id=>id!==roleId); delete m.customRoleId;});
  state.memberAccounts.forEach(a=>{a.customRoleIds=(a.customRoleIds||[]).filter(id=>id!==roleId); delete a.customRoleId;});
  save(); renderCustomRoles(); renderAdminView(); renderProfileView(); renderComparison();
}

/* 👤 PROFILE LOGIC */

function getAllAchievements(){ return defaultAchievementGroups.flatMap(g=>g.items||[]).filter(a=>a.id!=='__xp_history__'); }
function renderProfileAchievementBadges(){
  const box=$('profileAchievementBadges'), prefsBox=$('profileBadgePrivacy'), zoneBox=$('profileZoneBadges'); const ownerId=accountOwnerId(); if(!ownerId)return;
  const unlocked=getAllAchievements().filter(a=>(state.unlockedAchievements||[]).includes(a.id));
  state.achievementBadgePrefs=state.achievementBadgePrefs||{}; state.achievementBadgePrefs[ownerId]=state.achievementBadgePrefs[ownerId]||{};
  if(box) box.innerHTML=unlocked.map(a=>{const on=state.achievementBadgePrefs[ownerId][a.id]===true;return `<span class="tag" style="font-size:18px;padding:6px 9px;opacity:${on?1:.55}" title="${esc(a.name)} — ${on?'Công khai':'Riêng tư'}">${a.icon||'🏆'}${on?'':'🔒'}</span>`}).join('')||'<span class="muted">Chưa có huy hiệu thành tích.</span>';
  if(prefsBox) prefsBox.innerHTML=unlocked.length?unlocked.map(a=>{const on=state.achievementBadgePrefs[ownerId][a.id]===true;return `<label style="display:flex;align-items:center;gap:8px"><input type="checkbox" style="width:18px" ${on?'checked':''} onchange="toggleAchievementBadgePublic('${a.id}',this.checked)"> ${a.icon||'🏆'} ${esc(a.name)} — ${on?'🌍 Công khai':'🔒 Riêng tư'}</label>`}).join(''):'<span class="muted">Khi mở khóa thành tích, bạn sẽ có thể bật/tắt từng huy hiệu.</span>';
  const z=ownerZoneStore(ownerId);
  if(zoneBox) zoneBox.innerHTML=(z.zones||[]).map(x=>`<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap"><span class="tag" style="background:linear-gradient(135deg,${x.color1||'#c8e6c9'},${x.color2||x.color1||'#81c784'});font-size:16px" title="Zone ${esc(x.name)}">${x.icon||'✨'} ${esc(x.name)}</span><label class="muted"><input type="checkbox" style="width:18px" ${(z.publicZones||{})[x.name]===true?'checked':''} onchange="toggleZonePublic('${esc(x.name)}',this.checked)"> 🌍 Công khai</label></div>`).join('')||'<span class="muted">Chưa nhận Zone.</span>';
}
function toggleZonePublic(name,on){const ownerId=accountOwnerId();if(!ownerId)return;const z=ownerZoneStore(ownerId);z.publicZones[name]=!!on;save();renderProfileView();renderComparison();}

function toggleAchievementBadgePublic(id,on){const ownerId=accountOwnerId();if(!ownerId)return;state.achievementBadgePrefs=state.achievementBadgePrefs||{};state.achievementBadgePrefs[ownerId]=state.achievementBadgePrefs[ownerId]||{};state.achievementBadgePrefs[ownerId][id]=!!on;save();renderProfileView();renderComparison();}
function renderPublicZoneBadges(memberId){ const z=(state.memberZones||{})[memberId]; if(!z)return ''; return '<span style="display:inline-flex;gap:4px;flex-wrap:wrap;margin-left:5px">'+(z.zones||[]).filter(x=>(z.publicZones||{})[x.name]===true).map(x=>`<span class="tag" title="Zone ${esc(x.name)}" style="background:linear-gradient(135deg,${x.color1||'#c8e6c9'},${x.color2||x.color1||'#81c784'});font-size:14px;padding:3px 6px">${x.icon||'✨'}</span>`).join('')+'</span>'; }
function renderPublicAchievementBadges(memberId){
  const prefs=(state.achievementBadgePrefs||{})[memberId]||{};
  const progress=getProgressRecord(memberId);
  const unlocked=Array.isArray(progress?.unlockedAchievements)?progress.unlockedAchievements:[];
  const visible=unlocked.filter(id=>prefs[id]===true);
  const all=getAllAchievements();
  return '<span style="display:inline-flex;gap:4px;flex-wrap:wrap;margin-left:5px">'+visible.map(id=>{const a=all.find(x=>x.id===id);return a?`<span class="tag" title="${esc(a.name)} — bấm để xem nguồn gốc" style="font-size:15px;padding:3px 6px;cursor:pointer" onclick="openAchievementDetail('${id}')">${a.icon||'🏆'}</span>`:''}).join('')+'</span>';
}
function renderProfileView(){
  if(!state.sessionAuth) return;
  $('profileDisplayName').textContent=state.sessionAuth.name;
  const badge=$('profileRoleBadge');
  const base=state.sessionAuth.role==='Founder'?'🛡️ Người sáng lập web':state.sessionAuth.role==='Admin'?'👑 Quản trị viên':'👤 Thành viên';
  if(badge){
    badge.innerHTML=`<span style="display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap"><span class="tag red">${base}</span>${renderRoleBadges(state.sessionAuth.memberId)}${renderPublicAchievementBadges(state.sessionAuth.memberId)}${renderPublicZoneBadges(state.sessionAuth.memberId)}</span>`;
    badge.style.cssText='display:block;padding:0;border-radius:999px;font-weight:800;';
  }
  $('editProfileNameInput').value=state.sessionAuth.name;
  try{renderProfileAchievementBadges();}catch(e){}
}

function getCurrentAccount(){
  if(!state.sessionAuth) return null;
  if(state.sessionAuth.role==='Admin') return {password:state.membersList.find(m=>m.role==='Admin'&&m.name===state.sessionAuth.name)?.password || state.adminPassword};
  if(state.sessionAuth.role==='Founder') return {password:state.membersList.find(m=>m.role==='Founder'&&m.name===state.sessionAuth.name)?.password || state.founderPassword};
  if(state.sessionAuth.role==='Member') return findMemberAccount(state.sessionAuth);
  return null;
}
function changeProfilePassword(){
  if(!state.sessionAuth || state.sessionAuth.role==='Guest') return alert('👤 Tài khoản khách không có mật khẩu để thay đổi.');
  const current=$('currentPasswordInput').value;
  const next=$('newPasswordInput').value;
  const confirmNext=$('confirmPasswordInput').value;
  const account=getCurrentAccount();
  if(!account) return alert('❌ Không tìm thấy tài khoản.');
  if(current!==account.password) return alert('❌ Mật khẩu hiện tại không đúng.');
  if(next.length<4) return alert('⚠️ Mật khẩu mới cần ít nhất 4 ký tự.');
  if(next!==confirmNext) return alert('⚠️ Hai lần nhập mật khẩu mới không khớp.');
  account.password=next;
  if(state.sessionAuth.role==='Admin'){ const m=state.membersList.find(x=>x.role==='Admin'&&x.name===state.sessionAuth.name); if(m) m.password=next; state.adminPassword=next; }
  if(state.sessionAuth.role==='Founder'){ const m=state.membersList.find(x=>x.role==='Founder'&&x.name===state.sessionAuth.name); if(m) m.password=next; state.founderPassword=next; }
  save();
  $('currentPasswordInput').value='';$('newPasswordInput').value='';$('confirmPasswordInput').value='';
  alert('✅ Đã đổi mật khẩu thành công. Hãy tự ghi nhớ mật khẩu mới.');
}
function togglePasswordVisibility(){
  const ids=['loginPasswordInput','currentPasswordInput','newPasswordInput','confirmPasswordInput'];
  ids.forEach(id=>{const el=$(id);if(el)el.type=$('showLoginPassword')?.checked||$('showPasswordInputs')?.checked?'text':'password';});
}

function saveProfileName(){
  const newName=$('editProfileNameInput').value.trim();
  if(!newName) return alert('Tên không được để trống!');
  const oldName=state.sessionAuth.name;
  const normalizedNew=newName.toLocaleLowerCase('vi-VN');
  const duplicate=state.memberAccounts.some(a=>a.memberId!==state.sessionAuth.memberId && String(a.name||'').trim().toLocaleLowerCase('vi-VN')===normalizedNew) || state.membersList.some(m=>m.id!==state.sessionAuth.memberId && String(m.name||'').trim().toLocaleLowerCase('vi-VN')===normalizedNew);
  if(duplicate) return alert('🚨 Tên này đã được sử dụng bởi tài khoản khác. Không thể đổi tên trùng.');
  state.sessionAuth.name=newName;
  const m=state.membersList.find(x=>x.id===state.sessionAuth.memberId || x.name===oldName);
  const account=state.memberAccounts.find(x=>x.memberId===state.sessionAuth.memberId || x.name===oldName);
  if(m) m.name=newName;
  if(account) account.name=newName;
  save(); renderProfileView(); setupNavAndAdminRole();
  alert(`Đã đổi tên thành công từ "${oldName}" thành "${newName}"! 🐝 Mã thành viên vẫn giữ nguyên và tiếp tục gắn với tài khoản này.`);
}

function exportDataJSON(){
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", `GocNhoCuaOng_Backup_${todayISO()}.json`);
  document.body.appendChild(dlAnchor);
  dlAnchor.click();
  dlAnchor.remove();
}

function importDataJSONPrompt(){
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,application/json,text/json';
  input.setAttribute('aria-label','Chọn file JSON backup');
  input.style.position = 'fixed';
  input.style.left = '-10000px';
  input.style.width = '1px';
  input.style.height = '1px';
  input.style.opacity = '0';
  input.onchange = async function(){
    const file = input.files && input.files[0];
    input.remove();
    if(!file) return;
    try {
      const text = await file.text();
      const raw = JSON.parse(text);
      const parsed = raw && raw.projectState && typeof raw.projectState === 'object' ? raw.projectState : raw;
      if(!parsed || typeof parsed !== 'object' || parsed.xp === undefined){
        alert('Dữ liệu không hợp lệ! Hãy chọn đúng file Backup JSON được xuất từ Study Empire.');
        return;
      }
      const currentSessionAuth = state && state.sessionAuth ? state.sessionAuth : null;
      state = parsed;
      if(currentSessionAuth) state.sessionAuth = currentSessionAuth;
      if(typeof defaultState === 'object' && defaultState){
        Object.keys(defaultState).forEach(k=>{ if(state[k] === undefined) state[k] = cloneValue(defaultState[k]); });
      }
      save();
      if(typeof renderAll === 'function') renderAll();
      alert('Đã khôi phục dữ liệu từ file JSON thành công! 🐝🍀');
    } catch(e) {
      alert('Không thể đọc file JSON. Hãy chọn một file JSON hợp lệ.');
    }
  };
  document.body.appendChild(input);
  input.click();
}

/* 👤 GUEST GUARD: khách được xem, nhưng không được ghi dữ liệu. */
document.addEventListener('click', function(e){
  if(document.body.dataset.role !== 'Guest') return;
  const target=e.target.closest('button,[onclick],[data-command-target],input[type="checkbox"],.check');
  if(!target) return;
  if(target.closest('[data-go]')) return;                 // điều hướng: được phép
  if(target.classList.contains('guest-theme-control')) return; // thử màu: được phép
  if(target.classList.contains('command-help-inline')) return; // xem hướng dẫn: được phép
  if(target.tagName==='SUMMARY') return;

  const fn=(target.getAttribute('onclick')||'').toLowerCase();
  const id=(target.id||'').toLowerCase();
  const cls=(target.className||'').toString().toLowerCase();
  const mutating = /save|add|delete|del\(|reset|run|import|export|recordactivity|claim|togglehabit|toggletask|remove|update|create|edit|backup/.test(fn+' '+id+' '+cls)
                 || target.hasAttribute('data-command-target')
                 || target.matches('.check,input[type="checkbox"]');
  if(mutating){
    e.preventDefault();
    e.stopImmediatePropagation();
    alert('👤 Chế độ khách chỉ được xem. Bạn không thể nhập, chạy lệnh, lưu, xóa hoặc sao lưu dữ liệu.');
  }
}, true);

document.addEventListener('click',e=>{const b=e.target.closest('[data-go]');if(b)go(b.dataset.go)});
$('modalClose').onclick=closeModal;$('modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal()});

/* 🏆 RENOVATED ACHIEVEMENT SYSTEM */
let defaultAchievementGroups = [
 {id:'de',title:'🟢 DỄ',items:[
  {id:'a1',xp:10,name:'Bước đầu tiên',tier:'🟢 DỄ',desc:'Hoàn thành công việc đầu tiên trong Kế hoạch theo ngày.',icon:'🌱',cond:d=>d.todos.some(t=>t.done)},
  {id:'a2',xp:10,name:'Ngày đầu tiên',tier:'🟢 DỄ',desc:'Mở khóa khi hệ thống ghi nhận ít nhất 1 ngày có hoạt động hợp lệ của tài khoản. Hoạt động hợp lệ gồm hoàn thành Kế hoạch, có phiên học, hoàn thành Thói quen hoặc ghi nhận nội dung học tập.',icon:'🌅',cond:d=>(d.activityDates||[]).length>=1},
  {id:'a3',xp:20,name:'20 XP đầu tiên',tier:'🟢 DỄ',desc:'Tích lũy đủ 20 XP.',icon:'⭐',cond:d=>d.xp>=20},
  {id:'a4',xp:15,name:'Mầm thói quen',tier:'🟢 DỄ',desc:'Hoàn thành 5 lượt thói quen.',icon:'🌱',cond:d=>Object.values(d.habits).some(arr=>arr.some(h=>Object.values(h.days).filter(Boolean).length>=5))}
 ]},
 {id:'trung-binh',title:'🔵 TRUNG BÌNH',items:[
  {id:'b1',xp:30,name:'Giữ nhịp học tập',tier:'🔵 TRUNG BÌNH',desc:'Tích lũy ít nhất 90 phút học chính thức.',icon:'📚',cond:d=>(d.studyMinutes||0)>=90},
  {id:'c1',xp:30,name:'Không bỏ cuộc',tier:'🔵 TRUNG BÌNH',desc:'Đạt chuỗi 3 ngày hoạt động liên tiếp.',icon:'🔥',cond:d=>d.bestStreak>=3},
  {id:'d2',xp:40,name:'Nhịp sống đều đặn',tier:'🔵 TRUNG BÌNH',desc:'Hoàn thành 15 lượt thói quen.',icon:'🌳',cond:d=>Object.values(d.habits).some(arr=>arr.some(h=>Object.values(h.days).filter(Boolean).length>=15))},
  {id:'e1',xp:50,name:'Tích lũy năng lượng',tier:'🔵 TRUNG BÌNH',desc:'Đạt 150 XP.',icon:'⚡',cond:d=>d.xp>=150},
  {id:'b4',xp:50,name:'Một tháng có nhịp',tier:'🔵 TRUNG BÌNH',desc:'Có hoạt động trong ít nhất 15 ngày khác nhau.',icon:'🗓️',cond:d=>d.activityDates.length>=15}
 ]},
 {id:'kho',title:'🟠 KHÓ',items:[
  {id:'b2',xp:75,name:'Tập trung chuyên sâu',tier:'🟠 KHÓ',desc:'Tích lũy 600 phút học chính thức.',icon:'🔥',cond:d=>(d.studyMinutes||0)>=600},
  {id:'e2',xp:100,name:'Cỗ máy tiến bộ',tier:'🟠 KHÓ',desc:'Đạt 1.000 XP.',icon:'💫',cond:d=>d.xp>=1000},
  {id:'d3',xp:100,name:'Thói quen thép',tier:'🟠 KHÓ',desc:'Hoàn thành 30 lượt thói quen.',icon:'🛡️',cond:d=>Object.values(d.habits).some(arr=>arr.some(h=>Object.values(h.days).filter(Boolean).length>=30))},
  {id:'b5',xp:100,name:'Bền bỉ 30 ngày',tier:'🟠 KHÓ',desc:'Hoạt động trong ít nhất 30 ngày khác nhau.',icon:'📅',cond:d=>d.activityDates.length>=30}
 ]},
 {id:'rat-kho',title:'🔴 RẤT KHÓ',items:[
  {id:'c2',xp:150,name:'Một tuần bền bỉ',tier:'🔴 RẤT KHÓ',desc:'Đạt chuỗi 7 ngày hoạt động liên tiếp.',icon:'⭐',cond:d=>d.bestStreak>=7},
  {id:'c4',xp:300,name:'Kỷ luật 30 ngày',tier:'🔴 RẤT KHÓ',desc:'Đạt chuỗi 30 ngày hoạt động liên tiếp.',icon:'🔥',cond:d=>d.bestStreak>=30},
  {id:'e4',xp:250,name:'Kho XP khổng lồ',tier:'🔴 RẤT KHÓ',desc:'Đạt 2.500 XP.',icon:'💎',cond:d=>d.xp>=2500},
  {id:'b6',xp:500,name:'100 giờ kiên định',tier:'🔴 RẤT KHÓ',desc:'Tích lũy 6.000 phút học chính thức.',icon:'⏳',cond:d=>(d.studyMinutes||0)>=6000}
 ]},
 {id:'huyen-thoai',title:'⚫ HUYỀN THOẠI',items:[
  {id:'b3',xp:1000,name:'Bậc thầy tri thức',tier:'⚫ HUYỀN THOẠI',desc:'Tích lũy ít nhất 15.000 phút học chính thức.',icon:'👑',cond:d=>(d.studyMinutes||0)>=15000},
  {id:'c3',xp:1500,name:'Người duy trì kỷ luật',tier:'⚫ HUYỀN THOẠI',desc:'Đạt chuỗi 180 ngày hoạt động liên tiếp.',icon:'🏆',cond:d=>d.bestStreak>=180},
  {id:'e3',xp:1000,name:'Huyền thoại học tập',tier:'⚫ HUYỀN THOẠI',desc:'Đạt 10.000 XP.',icon:'👑',cond:d=>d.xp>=10000},
  {id:'l1',xp:2000,name:'365 ngày không biến mất',tier:'⚫ HUYỀN THOẠI',desc:'Có hoạt động trong ít nhất 365 ngày khác nhau.',icon:'🌌',cond:d=>d.activityDates.length>=365},
  {id:'l2',xp:2500,name:'Thời gian không tưởng',tier:'⚫ HUYỀN THOẠI',desc:'Tích lũy 20.000 phút học chính thức.',icon:'🕰️',cond:d=>(d.studyMinutes||0)>=20000},
  {id:'l3',xp:2000,name:'Thói quen bất khuất',tier:'⚫ HUYỀN THOẠI',desc:'Hoàn thành 365 lượt thói quen.',icon:'🌲',cond:d=>Object.values(d.habits).some(arr=>arr.some(h=>Object.values(h.days).filter(Boolean).length>=365))},
  {id:'l4',xp:3000,name:'Vượt giới hạn',tier:'⚫ HUYỀN THOẠI',desc:'Đạt 25.000 XP.',icon:'🌠',cond:d=>d.xp>=25000},
  {id:'l5',xp:5000,name:'Hai năm bền chí',tier:'⚫ HUYỀN THOẠI',desc:'Đạt chuỗi 730 ngày hoạt động liên tiếp.',icon:'🗿',cond:d=>d.bestStreak>=730}
 ]}
];


/* =========================================================
   🏆 900 ACHIEVEMENTS / 11 TIERS — càng về cuối càng khó
   ========================================================= */
const ACHIEVEMENT_TIER_META=[
 {id:'de',title:'🌱 1. DỄ',label:'Dễ',bg:'#dff7e7',accent:'#238b45',leaf:'🌱'},
 {id:'trung-binh',title:'🍃 2. TRUNG BÌNH',label:'Trung Bình',bg:'#d8f0ff',accent:'#1877b5',leaf:'🍃'},
 {id:'kho',title:'🌿 3. KHÓ',label:'Khó',bg:'#e8ddff',accent:'#6941c6',leaf:'🌿'},
 {id:'thu-thach',title:'🍀 4. THỬ THÁCH',label:'Thử Thách',bg:'#fff0b8',accent:'#a66b00',leaf:'🍀'},
 {id:'cuc-kho',title:'🍂 5. CỰC KHÓ',label:'Cực Khó',bg:'#ffd9b0',accent:'#c45100',leaf:'🍂'},
 {id:'ac-mong',title:'🍁 6. ÁC MỘNG',label:'Ác Mộng',bg:'#ffc2c8',accent:'#b42336',leaf:'🍁'},
 {id:'kiet-xuat',title:'🌳 7. KIỆT XUẤT',label:'Kiệt Xuất',bg:'#f0c7e6',accent:'#9b1c72',leaf:'🌳'},
 {id:'huyen-thoai',title:'🌌 8. HUYỀN THOẠI',label:'Huyền Thoại',bg:'linear-gradient(135deg,#4c1d95,#7c3aed,#2563eb,#06b6d4)',accent:'#4c1d95',leaf:'🌌'},
 {id:'truyen-thuyet',title:'👑 9. TRUYỀN THUYẾT',label:'Truyền Thuyết',bg:'linear-gradient(135deg,#7f1d1d,#dc2626,#f59e0b,#fde047,#a855f7,#2563eb)',accent:'#7f1d1d',leaf:'👑'},
 {id:'vo-cuc',title:'🌟 10. VÔ CỰC',label:'Vô Cực',bg:'radial-gradient(circle at 18% 20%,rgba(129,140,248,.95),transparent 20%),radial-gradient(circle at 82% 78%,rgba(236,72,153,.75),transparent 22%),radial-gradient(circle at 50% 45%,rgba(56,189,248,.32),transparent 38%),linear-gradient(135deg,#020617,#111827 38%,#312e81 70%,#0f172a)',accent:'#0f172a',leaf:'🌟'},
 {id:'than-thoai',title:'💠 11. THẦN THOẠI',label:'Thần Thoại',bg:'radial-gradient(circle at 22% 22%,rgba(250,204,21,.95),transparent 13%),radial-gradient(circle at 78% 76%,rgba(220,38,38,.78),transparent 22%),radial-gradient(circle at 50% 50%,rgba(168,85,247,.32),transparent 38%),linear-gradient(135deg,#09090b,#240b36 42%,#581c87 68%,#713f12)',accent:'#000000',leaf:'💠'}
];
const ACHIEVEMENT_ICONS=['🌱','🍃','🌿','🍀','🌳','🌲','🌵','🌻','🌺','🌸','🪻','🌼','📚','📖','📝','✏️','🧠','💡','🔬','🧪','⏱️','⌛','⏳','🎯','🎓','🏫','🧩','🛡️','⚔️','🔥','⚡','🌋','🌪️','🌊','❄️','☀️','🌙','⭐','🌟','✨','💫','🌌','🪐','🚀','🛰️','💎','👑','🏆','🥇','🥈','🥉','🎖️','🏅','🎗️','🗝️','🔓','🧭','🗺️','🏁','🚩','🎲','🎮','🎼','🎨','🧵','🛠️','🔧','🧱','🏗️','🧘','🦉','🦅','🐝','🦊','🐺','🦁','🐉','🦄','🐲','🪄','🔮','💠','🧿','🕯️','🌠','☄️','🌈','🍎','🍋','🍊','🍇','🍓','🥝','🥑','🌽','🍒','🥭','🧿','🪽','🗿','🧬','🧮','📐','📈','🧭','🪜','🏔️','🌋','🌠','🕊️','🦋','🐉','🦄'];
const TIER_COUNTS=[40,50,60,70,80,90,100,110,110,100,90];/* data-900-achievement-policy: 11 groups, 900 achievements, ascending difficulty */;
const TIER_MULTIPLIERS=[1,2,4,8,16,32,64,128,256,512,1024];
const TIER_XP=[3,5,8,12,18,25,35,50,80,120,180];
const ACHIEVEMENT_RECIPES=[
  ['Kế hoạch','Hoàn thành {n} kế hoạch','tasks',5],
  ['Học tập','Học chính thức tổng {n} phút','study',120],
  ['Thói quen','Hoàn thành {n} lượt thói quen','habits',10],
  ['Kỷ luật','Duy trì chuỗi {n} ngày','streak',3],
  ['Hoạt động','Có hoạt động trong {n} ngày khác nhau','days',5],
  ['Phiên học','Hoàn thành {n} phiên học','sessions',5],
  ['Nhật ký','Ghi {n} nhật ký','journals',5],
  ['Cảm xúc','Ghi nhận {n} ngày cảm xúc','moods',5],
  ['Ngày học','Có hoạt động học trong {n} ngày','studyDays',5],
  ['Ngày học đỉnh cao','Học {n} phút trong MỘT NGÀY','dailyStudy',120],
  ['Mốc 12 giờ trong ngày','Học {n} phút trong MỘT NGÀY','dailyStudy',720],
  ['Tuần học đều','Có hoạt động học trong {n} ngày','studyDays',7],
  ['Kế hoạch bền bỉ','Hoàn thành {n} kế hoạch','tasks',25],
  ['XP tích lũy','Đạt {n} XP','xp',100],
  ['Kế hoạch hoàn hảo','Hoàn thành 100% Kế hoạch trong một ngày','todoPct',100]
];
function build100Achievements(){
  const groups=[]; let num=1;
  ACHIEVEMENT_TIER_META.forEach((meta,ti)=>{
    const group={...meta,items:[]}; const count=TIER_COUNTS[ti];
    for(let j=0;j<count;j++,num++){
      let recipe=ACHIEVEMENT_RECIPES[(num-1)%ACHIEVEMENT_RECIPES.length];
      // Sau mốc tối đa 12 giờ/ngày, chuyển sang nhiệm vụ khác thay vì tạo mốc phút vô lý.
      if(recipe[2]==='dailyStudy' && (ti>=8 || (ti===7 && j>=10))){
        const alternatives=[
          ['Thói quen bền bỉ','Hoàn thành {n} lượt thói quen','habits',25],
          ['Phiên học chuyên sâu','Hoàn thành {n} phiên học','sessions',20],
          ['Nhật ký trưởng thành','Ghi {n} nhật ký','journals',20],
          ['Kỷ luật cảm xúc','Ghi nhận {n} ngày cảm xúc','moods',20],
          ['Kế hoạch chủ động','Hoàn thành {n} kế hoạch','tasks',30]
        ];
        recipe=alternatives[(j+ti)%alternatives.length];
      }
      const base=recipe[3];
      let threshold=Math.max(1,Math.round(base*TIER_MULTIPLIERS[ti]*(1+j/(count*0.85))));
      if(recipe[2]==='todoPct') threshold=100;
      if(recipe[0]==='Mốc 12 giờ trong ngày') threshold=720;
      if(ti===6 && recipe[2]==='dailyStudy' && !recipe[0].startsWith('Mốc ')) threshold=Math.min(720,240 + j*30);
      if(ti===7 && recipe[2]==='dailyStudy') threshold=Math.min(720,420 + j*30);
      const name=`${recipe[0]} — ${meta.label} ${String(num).padStart(3,'0')}`;
      const desc=recipe[1].replace('{n}',threshold);
      let cond;
      if(recipe[2]==='tasks') cond=d=>(d.todos||[]).filter(t=>t.done).length>=threshold;
      else if(recipe[2]==='study') cond=d=>(d.studyMinutes||0)>=threshold;
      else if(recipe[2]==='habits') cond=d=>Object.values(d.habits||{}).flat().reduce((n,h)=>n+Object.values(h.days||{}).filter(Boolean).length,0)>=threshold;
      else if(recipe[2]==='streak') cond=d=>(d.bestStreak||0)>=threshold;
      else if(recipe[2]==='days') cond=d=>(d.activityDates||[]).length>=threshold;
      else if(recipe[2]==='sessions') cond=d=>(d.sessions||[]).length>=threshold;
      else if(recipe[2]==='journals') cond=d=>(d.journals||[]).length>=threshold;
      else if(recipe[2]==='moments') cond=d=>(d.moments||[]).length>=threshold;
      else if(recipe[2]==='moods') cond=d=>(d.moods||[]).length>=threshold;
      else if(recipe[2]==='xp') cond=d=>(d.xp||0)>=threshold;
      else if(recipe[2]==='todoPct') cond=d=>{ const byDay={}; (d.todos||[]).filter(t=>t.date).forEach(t=>{(byDay[t.date]||(byDay[t.date]=[])).push(t);}); return Object.values(byDay).some(arr=>arr.length>0&&arr.every(t=>t.done)); };
      else if(recipe[2]==='dailyStudy') cond=d=>{
        const raw=d.adminStudyTimes||[]; const rows=Array.isArray(raw)?raw:Object.values(raw).flat();
        const totals={}; rows.filter(r=>r&&r.date).forEach(r=>{totals[r.date]=(totals[r.date]||0)+Number(r.deltaMinutes??r.minutes??r.amount??0)});
        return Object.values(totals).some(v=>Math.min(720, Number(v)||0)>=threshold);
      };
      else cond=()=>false;
      group.items.push({id:`gen${String(num).padStart(3,'0')}`,xp:TIER_XP[ti],name,tier:meta.title,desc,icon:ACHIEVEMENT_ICONS[(num-1)%ACHIEVEMENT_ICONS.length],cond});
    }
    groups.push(group);
  });
  return groups;
}
defaultAchievementGroups=build100Achievements();
let achievementGroupCollapsed = Object.fromEntries(ACHIEVEMENT_TIER_META.map(x=>[x.id,false]));

function toggleAchievementGroup(groupId){
    achievementGroupCollapsed[groupId] = !achievementGroupCollapsed[groupId];
    renderAchievementsView();
}

function currentMemberAccount(){
  if(!state.sessionAuth || state.sessionAuth.role!=='Member') return null;
  const a=findMemberAccount(state.sessionAuth);
  if(a && !a.progress) a.progress={studyMinutes:0,tasksDone:0,habitsDone:0,overall:0,activities:0,streak:0,xp:0};
  return a;
}
function getProgressRecord(ownerId=null){
  const auth=state.sessionAuth;
  let id=ownerId;
  if(!id && auth){
    if(auth.role==='Admin') id=state.membersList.find(m=>(m.role==='Admin'||m.role==='Founder')&&m.name===auth.name)?.id||null;
    else id=findMemberAccount(auth)?.memberId||null;
  }
  if(!id) return null;
  const member=state.membersList.find(m=>m.id===id);
  if(member && (member.role==='Admin'||member.role==='Founder')){
    member.progress=member.progress||{studyMinutes:0,tasksDone:0,tasksTotal:0,habitsDone:0,habitsTotal:0,overall:0,activities:0,streak:0,xp:0,studyUpdatedAt:null};
    return member.progress;
  }
  const a=state.memberAccounts.find(x=>x.memberId===id);
  if(a){ a.progress=a.progress||{studyMinutes:0,tasksDone:0,tasksTotal:0,habitsDone:0,habitsTotal:0,overall:0,activities:0,streak:0,xp:0,studyUpdatedAt:null}; return a.progress; }
  return null;
}
function normalizeStudyTimeRecord(record){
  if(!record) return null;
  const n = Number.isFinite(Number(record.deltaMinutes))
    ? Number(record.deltaMinutes)
    : Number(record.minutes);
  return {...record, deltaMinutes:Number.isFinite(n)?n:0};
}


/* =========================================================
   🔒 PRIVATE XP LEDGER
   - Lưu lịch sử XP nhưng KHÔNG render cho Member/Guest.
   - Admin/Founder có thể dùng nội bộ khi cần kiểm tra.
   - Nguồn XP công khai: chỉ hiển thị kết quả, không lộ công thức.
   ========================================================= */
function recordPrivateXPHistory(ownerId, delta, source, detail=''){
  if(!ownerId || !Number.isFinite(Number(delta)) || Number(delta)===0) return;
  state.privateXPHistory = Array.isArray(state.privateXPHistory) ? state.privateXPHistory : [];
  state.privateXPHistory.push({
    id: uid(),
    ownerId,
    delta: Number(delta),
    source: String(source||''),
    detail: String(detail||''),
    at: new Date().toISOString()
  });
}

function syncXPProgressUI(ownerId){
  const p=getProgressRecord(ownerId);
  if(!p) return;
  if(accountOwnerId()===ownerId){
    state.xp=Math.max(0,Number(p.xp)||0);
    state.level=Math.max(1,Math.floor(state.xp/100)+1);
    try{finalRefreshLevelPanels();}catch(e){}
  }
}

function addXPFromTask(ownerId, detail=''){
  const gain = 1;
  const p = getProgressRecord(ownerId);
  if(!p) return 0;
  p.xp = Math.max(0, (Number(p.xp)||0) + gain);
  p.level = Math.max(1, Math.floor(p.xp/100) + 1);
  recordPrivateXPHistory(ownerId, gain, '📋 Kế hoạch', detail || 'Hoàn thành kế hoạch');
  syncXPProgressUI(ownerId);
  return gain;
}


function awardMonthlyHabitXP(ownerId, completedCount, monthKey, totalHabits=completedCount){
  const count = Math.max(0, Math.floor(Number(completedCount)||0));
  const total = Math.max(0, Math.floor(Number(totalHabits)||0));
  if(!ownerId || !count || !monthKey) return 0;
  const p = getProgressRecord(ownerId);
  if(!p) return 0;

  state.monthlyHabitXPClaims = state.monthlyHabitXPClaims || {};
  const key = String(ownerId) + '|' + String(monthKey);
  const previous = state.monthlyHabitXPClaims[key] || {completed:0, awarded:0};
  const previousCompleted = Math.max(0, Math.floor(Number(previous.completed)||0));

  // XP thói quen là XP TĂNG DẦN theo số thói quen hoàn thành.
  // Ví dụ 10 thói quen: 30% (3/10) => +3 XP; sau đó 50% (5/10) => chỉ +2 XP.
  const gain = Math.max(0, count - previousCompleted);
  if(!gain){
    state.monthlyHabitXPClaims[key] = {
      ...previous,
      completed: Math.max(previousCompleted, count),
      totalHabits: total || previous.totalHabits || count,
      updatedAt: new Date().toISOString()
    };
    return 0;
  }

  state.monthlyHabitXPClaims[key] = {
    completed: count,
    awarded: previous.awarded + gain,
    totalHabits: total || previous.totalHabits || count,
    at: previous.at || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const oldPct = total ? Math.round(previousCompleted/total*100) : 0;
  const newPct = total ? Math.round(count/total*100) : 0;
  p.xp = Math.max(0, (Number(p.xp)||0) + gain);
  p.level = Math.max(1, Math.floor(p.xp/100) + 1);
  recordPrivateXPHistory(
    ownerId,
    gain,
    '🍀 Thói quen',
    `Thói quen ${monthKey}: ${oldPct}% → ${newPct}% (${previousCompleted}/${total || '?'} → ${count}/${total || '?'} thói quen) — chỉ cộng phần tăng thêm`
  );

  syncXPProgressUI(ownerId);
  return gain;
}

function awardAchievementXP(ownerId, amount, achievementName=''){
  const gain = Math.max(0, Number(amount)||0);
  if(!gain) return 0;
  const p = getProgressRecord(ownerId);
  if(!p) return 0;
  p.xp = Math.max(0, (Number(p.xp)||0) + gain);
  p.level = Math.max(1, Math.floor(p.xp/100) + 1);
  recordPrivateXPHistory(ownerId, gain, '🏆 Thành tích', achievementName);
  syncXPProgressUI(ownerId);
  return gain;
}

function getPrivateXPHistoryForAdmin(){
  return getCurrentXPHistoryDerived(accountOwnerId());
}

function updateAccountProgress(type,gainedXP=0,ownerId=null,amount=0){
  const p=getProgressRecord(ownerId); if(!p)return;
  if(type==='task_created') p.tasksTotal=(p.tasksTotal||0)+1;
  if(type==='task_done') p.tasksDone=Math.max(0,(p.tasksDone||0)+amount);
  if(type==='habit_created') p.habitsTotal=(p.habitsTotal||0)+Math.max(0,Number(amount)||0);
  if(type==='habit_done') p.habitsDone=Math.max(0,(p.habitsDone||0)+amount);
  if(type==='study') p.studyMinutes=(p.studyMinutes||0)+Math.max(0,Number(amount)||0);
  // Study Time là dữ liệu thời lượng chính thức, không tự cộng XP.
  const xpGain = type==='study' ? 0 : Math.max(0,Number(gainedXP)||0);
  p.activities=(p.activities||0)+(xpGain?1:0); p.xp=(p.xp||0)+xpGain;
  p.streak=state.streak||0;
  const taskPct=(p.tasksTotal||0)?Math.min(100,Math.round((p.tasksDone||0)/p.tasksTotal*100)):0;
  const habitPct=(p.habitsTotal||0)?Math.min(100,Math.round((p.habitsDone||0)/p.habitsTotal*100)):0;
  p.overall=Math.round((taskPct+habitPct)/2);
}

function recordActivity(type="task", customXP=0, detail='', options={}){
    // 📋 KẾ HOẠCH: mỗi kế hoạch hoàn thành = +1 XP.
    // Chỉ cộng đúng lúc chuyển từ CHƯA HOÀN THÀNH → HOÀN THÀNH.
    // Học tập/Pomodoro/thói quen/nhật ký không đi qua luồng XP này.
    const gainedXP = type==='task' ? 1 : 0;
    if(gainedXP>0){
        const ownerId = accountOwnerId();
        let actualGain = 0;
        if(ownerId){
            actualGain = addXPFromTask(ownerId, detail || 'Hoàn thành kế hoạch');
            const p=getProgressRecord(ownerId);
            if(actualGain && p){
                state.xp=Math.max(0,Number(p.xp)||0);
                state.level=Math.max(1,Math.floor(state.xp/100)+1);
                try{finalRefreshLevelPanels();}catch(e){}
            }
        }else{
            actualGain = gainedXP;
            state.xp=Math.max(0,(Number(state.xp)||0)+actualGain);
            state.level=Math.max(1,Math.floor(state.xp/100)+1);
            recordPrivateXPHistory(state.sessionAuth?.id||'session', actualGain, '📋 Kế hoạch', detail || 'Hoàn thành kế hoạch');
            try{finalRefreshLevelPanels();}catch(e){}
        }
        state.activities++;
        state.todayXP += actualGain;
        state.todayActivities++;
    }else{
        state.activities++;
        state.todayActivities++;
    }

    const today=todayISO(), yesterday=yesterdayKey();
    if(state.lastActivityDate===yesterday){state.streak++;}
    else if(state.lastActivityDate!==today){state.streak=state.streak>0?state.streak:1;}
    if(state.streak>state.bestStreak)state.bestStreak=state.streak;
    state.lastActivityDate=today;
    if(!state.activityDates.includes(today))state.activityDates.push(today);
    if(state.todayActivities>state.bestTasks)state.bestTasks=state.todayActivities;
    if(state.todayXP>state.bestXPDay)state.bestXPDay=state.todayXP;
    if(gainedXP>0) addTimeline('Hoàn thành kế hoạch',`+${gainedXP} XP`);
    updateLevel();
    checkAchievements();
    if(!options || options.deferSave!==true) save();
}
function getActivityName(type){
    return {task:"Hoàn thành công việc", study:"Học tập", pomodoro:"Hoàn thành Pomodoro", habit:"Duy trì thói quen", journal:"Viết nhật ký", review:"Ôn tập", achievement:"Thành tích mới"}[type]||"Hoạt động mới";
}

function updateLevel(){
    state.level = Math.max(1, Math.floor((Number(state.xp)||0)/100) + 1);
}

/* =========================================================
   ♻️ DERIVED PROGRESS / XP REBUILD
   Mọi chỉ số có thể suy ra từ dữ liệu hiện tại phải được tính lại.
   Vì vậy khi một Kế hoạch / Thói quen / dữ liệu học tập bị xóa,
   XP, cấp độ, streak và thành tích không được giữ lại từ dữ liệu cũ.
   ========================================================= */
function customAchievementCondition(ca){
  const raw=String(ca.condition||'').trim().toUpperCase();
  if(!raw) return ()=>false;
  const m=raw.match(/^(XP|STUDY_TIME|TASKS|HABITS|STREAK|ACTIVITY_DAYS|TODO_PCT|HABIT_PCT)\s*(>=|>|=|<=|<)\s*(\d+(?:\.\d+)?)$/);
  if(!m) return ()=>false;
  const [,key,op,numRaw]=m; const n=Number(numRaw);
  return d=>{
    const tasks=(d.todos||[]).filter(t=>t.done).length;
    const totalTasks=(d.todos||[]).length;
    const habitsDone=Object.values(d.habits||{}).flat().reduce((sum,h)=>sum+Object.values(h.days||{}).filter(Boolean).length,0);
    const habitTotal=Object.values(d.habits||{}).flat().reduce((sum,h)=>sum+Object.values(h.days||{}).length,0);
    const vals={XP:Number(d.xp)||0,STUDY_TIME:Number(d.studyMinutes)||0,TASKS:tasks,HABITS:habitsDone,STREAK:Number(d.bestStreak)||0,ACTIVITY_DAYS:(d.activityDates||[]).length,TODO_PCT:totalTasks?tasks/totalTasks*100:0,HABIT_PCT:habitTotal?habitsDone/habitTotal*100:0};
    const v=Number(vals[key]||0);
    return op==='>='?v>=n:op==='>'?v>n:op==='='?v===n:op==='<='?v<=n:v<n;
  };
}
function getAchievementDefinitions(){
  const groups=[...defaultAchievementGroups].map(g=>({id:g.id,title:g.title,items:[...(g.items||[])]}));
  const custom=(state.customAchievements||[]);
  const customGroup=groups.find(g=>g.id==='kho')||groups[groups.length-1];
  custom.forEach(ca=>{if(!customGroup.items.some(i=>i.id===ca.id))customGroup.items.push({...ca,cond:customAchievementCondition(ca)});});
  return groups;
}
function getStudyRowsForOwner(ownerId){
  if(!ownerId) return [];
  const sources=[];
  const accounts=state.userData?.accounts||{};
  Object.entries(accounts).forEach(([bucketOwnerId,bucket])=>{
    const raw=bucket?.adminStudyTimes;
    (Array.isArray(raw)?raw:Object.values(raw||{}).flat()).forEach(row=>{
      if(row) sources.push({...row,__bucketOwnerId:String(bucketOwnerId)});
    });
  });
  if(String(accountOwnerId()||'')===String(ownerId)){
    const raw=state.adminStudyTimes;
    (Array.isArray(raw)?raw:Object.values(raw||{}).flat()).forEach(row=>{
      if(row) sources.push({...row,__bucketOwnerId:String(ownerId)});
    });
  }
  const seen=new Set();
  return sources
    .filter(x=>x && x.date && String(x.memberId||x.ownerId||x.__bucketOwnerId||'')===String(ownerId))
    .map(x=>{const y={...x,memberId:String(x.memberId||x.ownerId||x.__bucketOwnerId),deltaMinutes:Number.isFinite(Number(x.deltaMinutes))?Number(x.deltaMinutes):Number(x.minutes)||0}; delete y.__bucketOwnerId; return y;})
    .filter(x=>x.deltaMinutes!==0 && (!x.id || !seen.has(String(x.id))) && (!x.id || seen.add(String(x.id))));
}
function getOfficialStudyMinutesForOwner(ownerId){
  return Math.max(0,getStudyRowsForOwner(ownerId).reduce((sum,x)=>sum+Number(x.deltaMinutes||0),0));
}
function getOfficialStudyMinutesForDate(ownerId,date){
  return Math.max(0,getStudyRowsForOwner(ownerId).filter(x=>x.date===date).reduce((sum,x)=>sum+Number(x.deltaMinutes||0),0));
}
function getOwnerScopedData(ownerId){
  const id=String(ownerId||'');
  const active=String(accountOwnerId()||'');
  if(active===id){
    return {todos:Array.isArray(state.todos)?state.todos:[], schedules:Array.isArray(state.schedules)?state.schedules:[], habits:state.habits&&typeof state.habits==='object'?state.habits:{}, sessions:Array.isArray(state.sessions)?state.sessions:[], journals:Array.isArray(state.journals)?state.journals:[], moods:Array.isArray(state.moods)?state.moods:[]};
  }
  const bucket=state.userData?.accounts?.[id]||{};
  return {todos:Array.isArray(bucket.todos)?bucket.todos:[], schedules:Array.isArray(bucket.schedules)?bucket.schedules:[], habits:bucket.habits&&typeof bucket.habits==='object'?bucket.habits:{}, sessions:Array.isArray(bucket.sessions)?bucket.sessions:[], journals:Array.isArray(bucket.journals)?bucket.journals:[], moods:Array.isArray(bucket.moods)?bucket.moods:[]};
}

function collectCurrentActivityDates(ownerId){
  const dates=new Set();
  const scoped=getOwnerScopedData(ownerId);
  scoped.todos.filter(t=>t.done&&(!t.ownerId||String(t.ownerId)===String(ownerId))).forEach(t=>{if(t.date)dates.add(t.date)});
  scoped.sessions.filter(x=>!(x&&((x.source==='pomodoro')||(x.kind==='pomodoro')||(x.isPomodoro===true)))).forEach(x=>{if(x.date)dates.add(x.date)});
  scoped.journals.forEach(x=>{if(x.date)dates.add(x.date)});
  scoped.moods.forEach(x=>{if(x.date)dates.add(x.date)});
  Object.keys(scoped.habits||{}).forEach(ym=>(scoped.habits[ym]||[]).filter(h=>!h.ownerId||String(h.ownerId)===String(ownerId)).forEach(h=>Object.keys(h.days||{}).forEach(day=>{if(h.days[day])dates.add(`${ym}-${String(day).padStart(2,'0')}`)})));
  getStudyRowsForOwner(ownerId).forEach(x=>{if(x.date)dates.add(x.date)});
  return [...dates].filter(Boolean).sort();
}
function calculateStreaksFromDates(dateList){
  const dates=[...new Set(dateList)].sort(); if(!dates.length)return {current:0,best:0,last:''};
  let best=1,run=1;
  for(let i=1;i<dates.length;i++){
    const prev=new Date(dates[i-1]+'T12:00:00'),cur=new Date(dates[i]+'T12:00:00');
    if(Math.round((cur-prev)/86400000)===1){run++;best=Math.max(best,run)}else run=1;
  }
  const today=todayISO(),yesterday=yesterdayKey(); let current=0; const anchor=dates.includes(today)?today:(dates.includes(yesterday)?yesterday:'');
  if(anchor){current=1;let d=new Date(anchor+'T12:00:00');while(true){d.setDate(d.getDate()-1);const key=toISODate(d);if(dates.includes(key))current++;else break;}}
  return {current,best,last:dates[dates.length-1]||''};
}
function calculateHabitMilestoneXP(ownerId){
  // XP thói quen là XP theo MỐC, không cộng dồn lại toàn bộ phần trăm.
  // 30%=+3, 50%=+2, 90%=+4, 100%=+1 => tối đa 10 XP/ngày.
  const milestones=[{pct:30,xp:3},{pct:50,xp:2},{pct:90,xp:4},{pct:100,xp:1}]; let totalXP=0; const ledger=[];
  const scoped=getOwnerScopedData(ownerId);
  Object.keys(scoped.habits||{}).forEach(ym=>{
    const habits=(scoped.habits[ym]||[]).filter(h=>!h.ownerId||String(h.ownerId)===String(ownerId)); if(!habits.length)return;
    for(let day=1;day<=daysInMonth(ym);day++){
      const completed=habits.filter(h=>{const days=h.days||{};const key=String(day).padStart(2,'0');return Boolean(days[day] ?? days[key] ?? days[`${ym}-${key}`]);}).length; if(!completed)continue;
      const pct=Math.round(completed/habits.length*100);
      milestones.forEach(m=>{
        if(pct>=m.pct){
          totalXP+=m.xp;
          ledger.push({month:ym,day,pct,completed,total:habits.length,gain:m.xp,milestone:m.pct});
        }
      });
    }
  });
  return {xp:totalXP,ledger};
}
function calculateBaseXP(ownerId){
  const scoped=getOwnerScopedData(ownerId);
  const taskXP=scoped.todos.filter(t=>t.done&&(!t.ownerId||String(t.ownerId)===String(ownerId))).length;
  const habit=calculateHabitMilestoneXP(ownerId);
  const questIds=new Set((state.customQuests||[]).map(q=>q.id));
  const questXP=(state.questClaims||[]).filter(c=>String(c.ownerId)===String(ownerId)&&questIds.has(c.questId)).reduce((sum,c)=>sum+Math.max(0,Number(c.xp)||0),0);
  return {taskXP,habitXP:habit.xp,questXP,habitLedger:habit.ledger,baseXP:taskXP+habit.xp+questXP};
}
function recalculateCurrentProgress(ownerId,opts={}){
  if(!ownerId)return null; const p=getProgressRecord(ownerId); if(!p)return null;
  const isCurrentOwner = accountOwnerId()===ownerId;
  const previousUnlocked=Array.isArray(p.unlockedAchievements)?p.unlockedAchievements:[];
  const activityDates=collectCurrentActivityDates(ownerId), streaks=calculateStreaksFromDates(activityDates), base=calculateBaseXP(ownerId);
  const studyMinutes=getOfficialStudyMinutesForOwner(ownerId);
  const scoped=getOwnerScopedData(ownerId);
  const completedTasks=scoped.todos.filter(t=>t.done&&(!t.ownerId||String(t.ownerId)===String(ownerId))).length;
  const allTasks=scoped.todos.filter(t=>!t.ownerId||String(t.ownerId)===String(ownerId)).length;
  const habitEntries=Object.values(scoped.habits||{}).flat().filter(h=>!h.ownerId||String(h.ownerId)===String(ownerId));
  const habitDone=habitEntries.reduce((n,h)=>n+Object.values(h.days||{}).filter(Boolean).length,0);
  const snapshot={...state,...scoped,sessions:scoped.sessions.filter(x=>!(x&&((x.source==='pomodoro')||(x.kind==='pomodoro')||(x.isPomodoro===true)))),xp:base.baseXP,studyMinutes,adminStudyTimes:getStudyRowsForOwner(ownerId),activityDates,activities:activityDates.length,bestStreak:streaks.best,streak:streaks.current,todos:scoped.todos,habits:scoped.habits};
  const defs=getAchievementDefinitions().flatMap(g=>g.items||[]).filter(a=>a.id!=='__xp_history__');
  let xp=base.baseXP,unlocked=[];
  for(let pass=0;pass<defs.length+2;pass++){
    const before=xp; snapshot.xp=xp;
    unlocked=defs.filter(a=>{try{return !!a.cond(snapshot)}catch(e){return false}}).map(a=>a.id);
    xp=base.baseXP+defs.filter(a=>unlocked.includes(a.id)).reduce((sum,a)=>sum+Math.max(0,Number(a.xp)||0),0);
    if(xp===before)break;
  }
  p.unlockedAchievements=unlocked;
  p.xp=Math.max(0,xp); p.level=Math.max(1,Math.floor(p.xp/100)+1);
  if(isCurrentOwner){
    state.unlockedAchievements=unlocked; state.xp=p.xp; state.level=p.level;
    state.activities=activityDates.length; state.activityDates=activityDates; state.streak=streaks.current; state.bestStreak=streaks.best; state.lastActivityDate=streaks.last||'';
  }
  const dayCounts=scoped.todos.filter(t=>t.done&&(!t.ownerId||String(t.ownerId)===String(ownerId))).reduce((m,t)=>(m[t.date]=(m[t.date]||0)+1,m),{});
  const todayXPValue=Number(dayCounts[todayISO()]||0)+calculateHabitMilestoneXP(ownerId).ledger.filter(x=>`${x.month}-${String(x.day).padStart(2,'0')}`===todayISO()).reduce((n,x)=>n+x.gain,0);
  p.tasksDone=completedTasks;p.tasksTotal=allTasks;p.habitsDone=habitDone;p.habitsTotal=habitEntries.reduce((n,h)=>n+(Number(h.target)||0),0);p.activities=activityDates.length;p.streak=streaks.current;
  p.todayXP=todayXPValue; p.todayActivities=Number(dayCounts[todayISO()]||0);
  if(isCurrentOwner){ state.bestTasks=Math.max(0,...Object.values(dayCounts).map(Number),0); state.todayActivities=p.todayActivities; state.todayXP=todayXPValue; state.bestXPDay=Math.max(0,Number(state.bestXPDay)||0,state.todayXP); }
  const taskPct=allTasks?completedTasks/allTasks*100:0,habitPct=p.habitsTotal?p.habitsDone/p.habitsTotal*100:0;p.overall=Math.round((taskPct+habitPct)/2);
  if(isCurrentOwner){try{finalRefreshLevelPanels()}catch(e){}}
  if(opts.persist!==false)saveDerivedProgressOnly();
  return {oldUnlocked:previousUnlocked,newUnlocked:unlocked,xp:p.xp,level:p.level,base,studyMinutes,activityDates,streaks};
}
function saveDerivedProgressOnly(){
  ensureUserStore(); const id=accountOwnerId();
  if(id){const bucket=state.userData.accounts[id]||blankUserData();USER_DATA_KEYS.forEach(k=>{if(state[k]!==undefined)bucket[k]=cloneValue(state[k])});bucket._lastSavedAt=Date.now();state.userData.accounts[id]=bucket;}
  saveStateWithoutSession();
}
function getCurrentXPHistoryDerived(ownerId){
  if(!ownerId)return []; const rows=[];
  (state.todos||[]).filter(t=>t.done&&(!t.ownerId||String(t.ownerId)===String(ownerId))).forEach(t=>rows.push({delta:1,source:'📋 Kế hoạch',detail:`Hoàn thành kế hoạch: ${t.title||'Không tên'}`,at:t.completedAt||t.updatedAt||t.date||todayISO()}));
  calculateHabitMilestoneXP(ownerId).ledger.forEach(x=>rows.push({delta:x.gain,source:'🍀 Thói quen',detail:`Ngày ${x.month}-${String(x.day).padStart(2,'0')}: ${x.completed}/${x.total} thói quen (${x.pct}%) → đạt mốc ${x.milestone}% → +${x.gain} XP`,at:`${x.month}-${String(x.day).padStart(2,'0')}`}));
  // Nếu dữ liệu vừa bị xóa nhưng vẫn còn trong Thùng rác, hiển thị rõ phần XP đã bị thu hồi.
  Object.keys(state.trash||{}).forEach(type=>(state.trash[type]||[]).filter(x=>String(x.ownerId)===String(ownerId)&&Number(x._xpReversal||0)<0).forEach(x=>rows.push({delta:Number(x._xpReversal),source:'🗑️ Thu hồi XP',detail:x._xpReversalDetail||`Trừ ${Math.abs(Number(x._xpReversal)||0)} XP vì đã xóa ${type}: ${x.title||x.name||x.text||'mục đã xóa'}`,at:x._deletedAt||todayISO()})));
  const questMap=new Map((state.customQuests||[]).map(q=>[q.id,q]));
  (state.questClaims||[]).filter(c=>String(c.ownerId)===String(ownerId)&&questMap.has(c.questId)).forEach(c=>{const q=questMap.get(c.questId);rows.push({delta:Number(c.xp)||0,source:'🎯 Nhiệm vụ',detail:`Hoàn thành nhiệm vụ: ${q.title||'Không tên'}`,at:c.claimedAt||todayISO()});});
  getAchievementDefinitions().flatMap(g=>g.items||[]).filter(a=>((getProgressRecord(ownerId)?.unlockedAchievements)||[]).includes(a.id)).forEach(a=>rows.push({delta:Number(a.xp)||0,source:'🏆 Thành tích',detail:`Mở khóa: ${a.name}`,at:todayISO()}));
  return rows.sort((a,b)=>String(a.at).localeCompare(String(b.at)));
}
function checkAchievements(){
  const ownerId=accountOwnerId(); if(!ownerId)return [];
  const result=recalculateCurrentProgress(ownerId,{persist:false})||{}; const oldSet=new Set(result.oldUnlocked||[]);
  const newly=(result.newUnlocked||[]).filter(id=>!oldSet.has(id));
  const defs=getAchievementDefinitions().flatMap(g=>g.items||[]),items=defs.filter(a=>newly.includes(a.id));
  if(items.length){
    state.moments=Array.isArray(state.moments)?state.moments:[];
    items.forEach(ach=>state.moments.unshift({id:uid(),date:todayISO(),title:`${ach.icon||'🏆'} Mở khóa: ${ach.name}`,desc:`${ach.desc||'Một cột mốc mới đã được mở khóa.'}${ach.xp?` — Phần thưởng hiện tại: +${ach.xp} XP.`:''}`,type:'achievement'}));
    setTimeout(()=>alert(`🎉 Thành tích mới!\n\n${items.map(a=>`${a.icon||'🏆'} ${a.name}`).join('\n')}\n\nĐã cập nhật lại XP và cấp độ theo dữ liệu hiện tại. 🐝🍀`),0);
  }
  saveDerivedProgressOnly(); return items;
}

function renderTimelineSummary(){
    const box=$('timelineSummary');
    if(!box) return;
    const rows=Array.isArray(state.timeline)?state.timeline:[];
    if(!rows.length){
        box.innerHTML='<div class="muted">Chưa có hoạt động nào được ghi vào dòng thời gian.</div>';
        return;
    }
    box.innerHTML=rows.slice(0,50).map(x=>`<div style="display:flex;gap:10px;align-items:flex-start;padding:9px 0;border-bottom:1px solid var(--line)">
      <span style="min-width:72px;font-size:12px;color:var(--muted)">${esc(x.date||'')} ${esc(x.time||'')}</span>
      <div><b>${esc(x.title||'Hoạt động')}</b><div class="muted" style="margin-top:2px">${esc(x.subtitle||'')}</div></div>
    </div>`).join('');
}

function addTimeline(title, subtitle){
    // 🕰️ Timeline hành trình hoàn toàn độc lập với state.moments.
    state.timeline = Array.isArray(state.timeline) ? state.timeline : [];
    state.timeline.unshift({
        id: uid(),
        date: todayISO(),
        title: String(title || ''),
        subtitle: String(subtitle || ''),
        time: new Date().toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"})
    });
    state.timeline=state.timeline.slice(0,50);
}

let studyTimer=null,studyStartAt=null,studyElapsed=0,studyPaused=false;
let pomoTimer=null,pomoSec=25*60,pomoMode='focus',pomoRunning=false,pomoCount=0,pomoTargetSessions=4,pomoCompletedSessions=0,pomoPlanCompleted=false;

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// Tăng âm lượng riêng cho Pomodoro, không ảnh hưởng âm thanh Flashcard/Role.
const POMO_VOLUME_BOOST = 1.55;
const pomoCompressor = audioCtx.createDynamicsCompressor();
pomoCompressor.threshold.value = -18;
pomoCompressor.knee.value = 12;
pomoCompressor.ratio.value = 4;
pomoCompressor.attack.value = 0.003;
pomoCompressor.release.value = 0.18;
pomoCompressor.connect(audioCtx.destination);
function playBeep(freq=880, duration=0.2, type='sine', volume=1.0) {
    if(state.pomo.sound === false) return;
    if(audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    const boostedVolume = Math.min(1.8, Math.max(0.0001, Number(volume) || 0) * POMO_VOLUME_BOOST);
    gain.gain.setValueAtTime(boostedVolume, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(pomoCompressor);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}
function playAlarmMelody() {
    if(state.pomo.sound === false) return;
    playBeep(1046.50, 0.4, 'triangle', 1.0);
    setTimeout(()=>playBeep(1318.51, 0.4, 'triangle', 1.0), 400);
    setTimeout(()=>playBeep(1567.98, 0.6, 'triangle', 1.0), 800);
}

function updatePomoSettings(){
    state.pomo.focus = parseFloat($('pomoFocusInput').value) || 25;
    state.pomo.short = parseFloat($('pomoShortInput').value) || 5;
    state.pomo.long = parseFloat($('pomoLongInput').value) || 15;
    if($('pomoSoundCheck')) state.pomo.sound = $('pomoSoundCheck').checked;
    save();
    setPomoMode(pomoMode, true);
}

function applyPomoPreset(f, s, l, r){
    state.pomo.focus = f;
    state.pomo.short = s;
    state.pomo.long = l;
    state.pomo.rounds = r;
    $('pomoFocusInput').value = f;
    $('pomoShortInput').value = s;
    $('pomoLongInput').value = l;
    if($('pomoSoundCheck')) $('pomoSoundCheck').checked = state.pomo.sound;
    save();
    setPomoMode('focus', true);
    alert(`Đã áp dụng mẫu Pomodoro ${f}/${s} thành công! 🐝🍀`);
}

function setPomoMode(mode,reset=true){
    pomoMode=mode;
    if(reset) pomoSec=Math.round((state.pomo[mode==='focus'?'focus':mode==='short'?'short':'long']||25)*60);
    pomoRunning=false; clearInterval(pomoTimer); renderPomoClock();
}
function getPomoSessionTarget(){
    const select=$('pomoSessionCount'),custom=$('pomoCustomSessionCount');
    const raw=select&&select.value==='custom'?(custom&&custom.value):select&&select.value;
    return Math.max(1,Math.min(50,Math.floor(Number(raw)||4)));
}
function togglePomoCustomSessions(){
    const select=$('pomoSessionCount'),wrap=$('pomoCustomSessionWrap');
    if(wrap) wrap.style.display=select&&select.value==='custom'?'block':'none';
    if(!studyStartAt){
        pomoTargetSessions=getPomoSessionTarget();
        renderPomoClock();
        updateStudyStateText();
    }
}
function renderPomoClock(){
    const m=Math.floor(pomoSec/60), s=pomoSec%60;
    $('studyClock').textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    document.querySelectorAll('[data-mode]').forEach(b=>b.classList.toggle('active',b.dataset.mode===pomoMode));
    if($('pomoSoundCheck')) $('pomoSoundCheck').checked = state.pomo.sound;
    const progress=$('pomoSessionProgress');
    if(progress) progress.textContent=`Phiên tập trung: ${pomoCompletedSessions}/${pomoTargetSessions||getPomoSessionTarget()}`;
}
function startStudy(){
    if(pomoPlanCompleted){
        updateStudyStateText();
        return;
    }
    if(!studyStartAt){
        studyStartAt=Date.now();
        studyElapsed=0;
        studyPaused=false;
        pomoTargetSessions=getPomoSessionTarget();
        pomoCompletedSessions=0;
        pomoCount=0;
    } else if(studyPaused){
        studyStartAt=Date.now()-studyElapsed*1000;
        studyPaused=false;
    }
    if(!pomoRunning){
        pomoRunning=true;
        pomoTimer=setInterval(()=>{
            pomoSec--;
            studyElapsed++;
            if(pomoSec >= 1 && pomoSec <= 9) playBeep(750, 0.15, 'square', 0.8);
            if(pomoSec<=0){
                clearInterval(pomoTimer);
                pomoRunning=false;
                playAlarmMelody();
                if(pomoMode==='focus'){
                    pomoCount++;
                    pomoCompletedSessions++;
                    const target=Math.max(1,pomoTargetSessions||getPomoSessionTarget());
                    if(pomoCompletedSessions>=target){
                        pomoPlanCompleted=true;
                        studyPaused=true;
                        pomoSec=0;
                        renderPomoClock();
                        updateStudyStateText();
                        return;
                    }
                    const longBreakEvery=Math.max(1,Number(state.pomo.rounds)||4);
                    if(pomoCount%longBreakEvery===0) setPomoMode('long'); else setPomoMode('short');
                    // Chuyển sang thời gian nghỉ nhưng vẫn giữ cùng một kế hoạch Pomodoro.
                    // setPomoMode reset bộ đếm và dừng interval cũ, nên khởi động lại ngay để nghỉ tiếp tục chạy.
                    if(studyStartAt&&!pomoPlanCompleted) startStudy();
                } else {
                    setPomoMode('focus');
                    if(studyStartAt&&!pomoPlanCompleted) startStudy();
                }
            }
            renderPomoClock();
        },1000);
    }
    updateStudyStateText();
}
function pauseStudy(){
    if(studyStartAt&&!studyPaused){
        studyPaused=true; pomoRunning=false; clearInterval(pomoTimer);
        updateStudyStateText();
    }
}
function stopStudy(){
    if(!studyStartAt)return;
    pomoRunning=false;
    clearInterval(pomoTimer);
    let sec = studyElapsed;
    if(sec>10){
        let mins=Math.round(sec/60);
        state.sessions.push({id:uid(),date:todayISO(),subject:$('studySubject').value||'Chưa chọn môn',minutes:mins,seconds:sec,source:'pomodoro',kind:'pomodoro',isPomodoro:true,createdAt:new Date().toISOString()});
        /* Pomodoro chỉ là bộ đếm/ghi phiên tham khảo; KHÔNG cộng XP. XP học tập do lệnh STUDY_TIME quản lý. */
    }
    studyStartAt=null;
    studyElapsed=0;
    studyPaused=false;
    pomoCount=0;
    pomoCompletedSessions=0;
    pomoTargetSessions=getPomoSessionTarget();
    pomoPlanCompleted=false;
    setPomoMode('focus', true);
    renderPomoClock();
    save();
}
function updateStudyStateText(){
    if(pomoPlanCompleted){
        $('studyState').textContent=`Đã hoàn thành ${pomoCompletedSessions}/${pomoTargetSessions} phiên Pomodoro. Nhấn “Dừng & lưu phiên” để lưu lại.`;
    } else {
        $('studyState').textContent = studyStartAt ? (studyPaused ? 'Đang tạm dừng.' : `Đang học / Pomodoro (${pomoMode})...`) : 'Chưa bắt đầu phiên học.';
    }
}
document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>setPomoMode(b.dataset.mode));
$('studyStart').onclick=startStudy; $('studyPause').onclick=pauseStudy; $('studyStop').onclick=stopStudy;
if($('pomoSessionCount')) togglePomoCustomSessions();
$('saveGoals').onclick=()=>{state.goals.day=+$('goalDay').value||0;state.goals.week=+$('goalWeek').value||0;state.goals.month=+$('goalMonth').value||0;save();alert('Đã lưu mục tiêu! 🐝🍀')};

$('addTodo').onclick=()=>{
    const title=$('todoTitle').value.trim();if(!title)return alert('Bạn nhập nội dung công việc trước nha 🐝🍀');
    const ownerId=accountOwnerId();
    const now=new Date().toISOString();
    state.todos.push({id:uid(),ownerId,date:$('todoDate').value||todayISO(),title,priority:$('todoPriority').value,time:$('todoTime').value,note:$('todoNote').value,done:false,createdAt:now,updatedAt:now});
    updateAccountProgress('task_created',0,ownerId);
    $('todoTitle').value='';$('todoNote').value='';save({immediateCloud:true})
};
$('todoSearch').oninput=renderTodos;
function renderTodos(){
    const date=$('todoDate').value||todayISO(),q=($('todoSearch').value||'').toLowerCase();
    const a=state.todos.filter(x=>x.date===date&&(x.title+' '+(x.note||'')).toLowerCase().includes(q));
    $('todoList').innerHTML=a.length?a.map(x=>`<div class="todo ${x.done?'done':''}"><div class="title"><b>${esc(x.title)}</b><div class="kpi">${x.time?x.time+' • ':''}${esc(x.note||'')}</div></div><span class="tag ${x.priority==='cao'?'red':x.priority==='trung'?'yellow':''}">${x.priority==='cao'?'Cao':x.priority==='trung'?'Trung bình':'Thấp'}</span><input type="checkbox" ${x.done?'checked':''} onchange="toggleTodoDone('${x.id}', this.checked)" style="width:20px;height:20px;cursor:pointer"><button class="btn light sm" onclick="editTodo('${x.id}')">Sửa</button><button class="btn danger sm" onclick="del('todos','${x.id}')">Xóa</button></div>`).join(''):`<div class="empty">Chưa có việc cho ngày ${date}.</div>`
}
function toggleTodoDone(id, checked){
    const todo=state.todos.find(x=>x.id===id);
    if(!todo) return;

    const nextDone=!!checked;
    const wasDone=!!todo.done;
    if(wasDone===nextDone){
        renderTodos();
        return;
    }

    // Optimistic update: đổi trạng thái ngay, không gọi edit() vì edit() tự save/render.
    const changedAt=new Date().toISOString();
    Object.assign(todo,{done:nextDone,completedAt:nextDone?changedAt:'',updatedAt:changedAt});

    if(todo.ownerId) updateAccountProgress('task_done',0,todo.ownerId,nextDone?1:-1);

    // Chỉ cộng XP khi chuyển từ chưa hoàn thành sang hoàn thành; không cộng lại khi reload/bấm lại.
    if(nextDone && !wasDone){
        recordActivity('task',1,`Hoàn thành kế hoạch: ${todo.title}`,{deferSave:true});
    }

    const ownerId=accountOwnerId();
    if(ownerId){
        recalculateCurrentProgress(ownerId,{persist:false});
        const p=getProgressRecord(ownerId);
        if(p && ownerId===accountOwnerId()){
            state.xp=Math.max(0,Number(p.xp)||0);
            state.level=Math.max(1,Math.floor(state.xp/100)+1);
        }
    }

    checkAchievements();

    // Vẽ riêng danh sách To-do ngay lập tức, sau đó lưu cloud không render lại toàn trang.
    renderTodos();
    renderTodayDashboard();
    try{renderQuestBoard();}catch(e){}
    persistActiveUserData();
    save({render:false});
}
function editTodo(id){
    const x=state.todos.find(a=>String(a.id)===String(id));if(!x)return;
    showModal('✏️ Sửa công việc',`<div class="form"><div class="full"><label>Nội dung</label><input id="todoEditTitle" value="${esc(x.title||'')}" required></div><div><label>Giờ</label><input id="todoEditTime" type="time" value="${esc(x.time||'')}"></div><div><label>Ưu tiên</label><select id="todoEditPriority"><option value="cao">Cao</option><option value="trung">Trung bình</option><option value="thap">Thấp</option></select></div><div class="full"><label>Ghi chú</label><input id="todoEditNote" value="${esc(x.note||'')}"></div></div><button class="btn" style="margin-top:10px" onclick="editTodoSubmit('${esc(String(id))}')">Lưu</button>`);
    setTimeout(()=>{const select=$('todoEditPriority');if(select)select.value=x.priority||'thap';},0);
}
function editTodoSubmit(id){
    const x=state.todos.find(a=>String(a.id)===String(id));if(!x)return;
    const title=$('todoEditTitle')?.value.trim();if(!title)return alert('Nội dung kế hoạch không được để trống.');
    x.title=title;x.time=$('todoEditTime')?.value||'';x.priority=$('todoEditPriority')?.value||x.priority||'thap';x.note=$('todoEditNote')?.value||'';
    save();closeModal();renderTodos();
}
window.editTodoSubmit=editTodoSubmit
$('todoDate').onchange=renderTodos;

function loadMotivation(){
  const arr=[...(state.superMinds||[]),...(state.superMes||[]),...(state.customMotivations||[])].filter(Boolean);
  const box=$('motivationBox');
  if(!box)return;
  box.textContent=arr.length?'💪 '+arr[Math.floor(Math.random()*arr.length)]:'✨ Hãy chọn một việc nhỏ nhất bạn có thể làm trong 3 phút tới.';
}
function loadSuperMind(){loadMotivation();}
function loadSuperMe(){loadMotivation();}

function getStudyLogRows(ownerId){
  if(!ownerId) return [];
  const bucket=state.userData?.accounts?.[ownerId];
  const raw=bucket?.adminStudyTimes ?? (accountOwnerId()===ownerId ? state.adminStudyTimes : []);
  const rows=Array.isArray(raw)?raw:Object.values(raw||{}).flat();
  return rows.filter(x=>String(x?.memberId||x?.ownerId||'')===String(ownerId) && x?.date)
    .map(x=>({...x, minutes:Number.isFinite(Number(x.deltaMinutes))?Number(x.deltaMinutes):Number(x.minutes)||0}))
    .filter(x=>x.minutes!==0)
    .sort((a,b)=>String(b.date).localeCompare(String(a.date)) || String(b.updatedAt||b.createdAt||'').localeCompare(String(a.updatedAt||a.createdAt||'')));
}
function renderStudySessions(){
  const el=$('studySessions'); if(!el) return;
  const ownerId=accountOwnerId();
  const rows=getStudyLogRows(ownerId);
  if(!rows.length){ el.innerHTML='<div class="empty">Chưa có phiên học chính thức nào được ghi nhận.</div>'; return; }
  const byDay={};
  rows.forEach(r=>(byDay[r.date]||(byDay[r.date]=[])).push(r));
  const days=Object.keys(byDay).sort((a,b)=>b.localeCompare(a)).slice(0,7);
  el.innerHTML=days.map(date=>{
    const total=Math.max(0,byDay[date].reduce((sum,r)=>sum+r.minutes,0));
    const label=new Date(date+'T12:00:00').toLocaleDateString('vi-VN',{weekday:'short',day:'2-digit',month:'2-digit',year:'numeric'});
    return `<div style="padding:10px 0;border-bottom:1px solid var(--line)">
      <div style="display:flex;justify-content:space-between;gap:10px"><b>📅 ${esc(label)}</b><b>⏱️ ${fmtMin(total)}</b></div>
      <div class="muted" style="margin-top:4px">${byDay[date].length} lần cập nhật thời gian học chính thức</div>
    </div>`;
  }).join('');
}
function renderFounderSubjectStats(){
  const el=$('subjectStats'); if(!el) return;
  if(state.sessionAuth?.role!=='Founder'){ el.innerHTML=''; return; }
  const rows=getStudyLogRows(accountOwnerId());
  const by={};
  rows.forEach(r=>{ const subject=String(r.subject||'Chưa phân loại').trim()||'Chưa phân loại'; by[subject]=(by[subject]||0)+Math.max(0,Number(r.minutes)||0); });
  const entries=Object.entries(by).sort((a,b)=>b[1]-a[1]);
  el.innerHTML=entries.length ? entries.map(([subject,min])=>`<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--line)"><b>📚 ${esc(subject)}</b><span>${fmtMin(min)}</span></div>`).join('') : '<div class="empty">Chưa có dữ liệu thời gian học theo môn.</div>';
}

let todayTodoFilter='all';
function todoCompletionISO(todo){
  const raw=String(todo?.completedAt||'').trim();
  if(/^\\d{4}-\\d{2}-\\d{2}$/.test(raw)) return raw;
  if(raw){const date=new Date(raw);if(!Number.isNaN(date.getTime()))return toISODate(date);}
  return todo?.done?String(todo?.date||''):'';
}
function currentWeekRangeISO(){
  const today=new Date(),day=today.getDay(),diff=day===0?-6:1-day;
  const start=new Date(today);start.setHours(12,0,0,0);start.setDate(start.getDate()+diff);
  const end=new Date(start);end.setDate(end.getDate()+6);
  return {start:toISODate(start),end:toISODate(end)};
}
function countCompletedTodosThisWeek(todos){
  const range=currentWeekRangeISO();
  return todos.filter(x=>x.done).filter(x=>{const date=todoCompletionISO(x);return date>=range.start&&date<=range.end;}).length;
}
function setTodayTodoFilter(value){
  todayTodoFilter=['all','pending','done'].includes(value)?value:'all';
  renderTodayDashboard();
}
window.setTodayTodoFilter=setTodayTodoFilter;
function renderTodayDashboard(){
  const host=$('todayDashboard');
  if(!host)return;
  const d=todayISO();
  const ownerId=accountOwnerId();
  const scoped=ownerId?getOwnerScopedData(ownerId):{todos:state.todos||[],schedules:state.schedules||[],habits:state.habits||{}};
  const todos=Array.isArray(scoped.todos)?scoped.todos.filter(x=>x&&(!x.ownerId||String(x.ownerId)===String(ownerId))&&x.date===d):[];
  const schedules=Array.isArray(scoped.schedules)?scoped.schedules.filter(x=>x&&(!x.ownerId||String(x.ownerId)===String(ownerId))&&x.date===d):[];
  const currentYM=ymISO();
  const habits=Array.isArray(scoped.habits?.[currentYM])?scoped.habits[currentYM].filter(h=>!h.ownerId||String(h.ownerId)===String(ownerId)):[];
  const mins=ownerId?studyMinutesForDate(ownerId,d):0;
  const goalMin=Math.max(1,Number(state.goals?.day)||120);
  const doneTodos=todos.filter(x=>x.done).length;
  const pendingTodos=todos.length-doneTodos;
  const completedThisWeek=countCompletedTodosThisWeek(scoped.todos||[]);
  const visibleTodos=todos.filter(x=>todayTodoFilter==='done'?x.done:todayTodoFilter==='pending'?!x.done:true);
  const todoPct=todos.length?Math.min(100,Math.round(doneTodos/todos.length*100)):0;
  const studyPct=Math.min(100,Math.round(mins/goalMin*100));
  const habitTarget=habits.reduce((sum,h)=>sum+Math.max(0,Number(h?.target)||0),0);
  const habitDone=habits.reduce((sum,h)=>sum+Object.values(h?.days||{}).filter(Boolean).length,0);
  const habitPct=habitTarget?Math.min(100,Math.round(habitDone/habitTarget*100)):0;
  const priorityWeight={cao:0,trung:1,thap:2};
  const orderedTodos=[...todos].sort((a,b)=>Number(Boolean(a.done))-Number(Boolean(b.done)) || (priorityWeight[a.priority]??3)-(priorityWeight[b.priority]??3) || String(a.time||'').localeCompare(String(b.time||'')));
  const orderedSchedules=[...schedules].sort((a,b)=>String(a.time||'').localeCompare(String(b.time||'')));
  const statRows=[
    {value:`${pendingTodos}`,label:'Việc còn lại',progress:null},
    {value:`${doneTodos}/${todos.length}`,label:`Việc hoàn thành (${todoPct}%)`,progress:todoPct},
    {value:`${completedThisWeek}`,label:'Việc hoàn thành tuần này',progress:null},
    {value:fmtMin(mins),label:`Thời gian học / ${fmtMin(goalMin)}`,progress:studyPct},
    {value:`${habitDone}/${habitTarget}`,label:`Lượt thói quen (${habitPct}%)`,progress:habitPct}
  ];
  const statBox=(row)=>`<div class="today-dashboard-stat"><strong>${esc(row.value)}</strong><span>${esc(row.label)}</span>${row.progress===null?'':`<div class="progress" aria-label="${esc(row.label)}"><i style="width:${row.progress}%"></i></div>`}</div>`;
  const todoLabel=(x)=>x.done?'Đã xong':(x.priority==='cao'?'Ưu tiên cao':x.priority==='trung'?'Ưu tiên trung bình':'Chưa hoàn thành');
  const todoRows=visibleTodos.map(x=>`<label class="today-dashboard-item ${x.done?'done':''}" for="today-todo-${esc(x.id)}"><span class="today-dashboard-item-main"><span class="today-dashboard-item-title">${esc(x.title||'Việc chưa đặt tên')}</span><span class="today-dashboard-item-meta">${esc([x.time,todoLabel(x)].filter(Boolean).join(' • '))}</span></span><input class="today-dashboard-todo-check" id="today-todo-${esc(x.id)}" type="checkbox" ${x.done?'checked':''} onchange="toggleTodoDone('${esc(x.id)}', this.checked)" aria-label="Đánh dấu ${esc(x.title||'Việc chưa đặt tên')} hoàn thành"></label>`).join('');
  const scheduleRows=orderedSchedules.slice(0,5).map(x=>`<div class="today-dashboard-item"><span class="today-dashboard-item-marker">${uiIcon('calendar','Lịch')}</span><div class="today-dashboard-item-main"><div class="today-dashboard-item-title">${esc(x.title||'Lịch chưa đặt tên')}</div><div class="today-dashboard-item-meta">${esc(x.time||'Cả ngày')}${x.note?` • ${esc(x.note)}`:''}</div></div></div>`).join('');
  const more=(count)=>count>5?`<div class="today-dashboard-more">Còn ${count-5} lịch trong dữ liệu hôm nay.</div>`:'';
  const formatDate=new Date(d+'T12:00:00').toLocaleDateString('vi-VN',{weekday:'long',day:'numeric',month:'numeric'});
  $('todayDashboardSubtitle').textContent=`Tóm tắt ${formatDate} từ dữ liệu hiện tại của tài khoản.`;
  $('todayDashboardSync').textContent='State hiện tại • đồng bộ nền';
  $('todayDashboardStats').innerHTML=statRows.map(statBox).join('');
  const filter=$('todayTodoFilter');if(filter)filter.value=todayTodoFilter;
  $('todayDashboardTodoCount').textContent=todayTodoFilter==='all'?`${todos.length} mục`:`${visibleTodos.length}/${todos.length} mục`;
  $('todayDashboardScheduleCount').textContent=`${schedules.length} lịch`;
  const todoEmpty=todayTodoFilter==='done'?'Hôm nay chưa có việc đã hoàn thành.':todayTodoFilter==='pending'?'Hôm nay không còn việc chưa hoàn thành.':'Hôm nay chưa có việc.';
  $('todayDashboardTodos').innerHTML=todoRows||`<div class="empty">${todoEmpty}</div>`;
  $('todayDashboardSchedule').innerHTML=scheduleRows||'<div class="empty">Hôm nay chưa có lịch trình.</div>';
  $('todayDashboardSchedule').insertAdjacentHTML('beforeend',more(schedules.length));
}

function renderHome(){
    const restoredEmotion=state.currentEmotion||null;
    if(restoredEmotion && realtimeThemeDefs.some(m=>m.name===restoredEmotion)){
      activeThemeMood=restoredEmotion;
      activeMood=restoredEmotion;
      const restoredDef=realtimeThemeDefs.find(m=>m.name===restoredEmotion);
      document.body.className=restoredDef?.theme||'theme-vui';
      const restoredList=getMemberComfortMessages(accountOwnerId(),restoredEmotion);
      const restoredText=restoredList[Math.floor(Math.random()*restoredList.length)];
      const rt=$('realtimeComfortText'); if(rt){rt.textContent=restoredText; if(rt.parentElement)rt.parentElement.style.display='block';}
      const oldComfort=$('comfort'); if(oldComfort){oldComfort.textContent=restoredText;oldComfort.style.display='block';}
    }
    const d=todayISO(), ownerId=accountOwnerId(), scoped=ownerId?getOwnerScopedData(ownerId):{todos:state.todos||[],schedules:state.schedules||[],habits:state.habits||{}};
    const mins=ownerId?studyMinutesForDate(ownerId,d):0;
    const goalMin=state.goals.day||120;
    const studyPct=Math.min(100, Math.round(mins/goalMin*100));
    
    const todosToday=(scoped.todos||[]).filter(x=>(!x.ownerId||String(x.ownerId)===String(ownerId))&&x.date===d);
    const doneTodos=todosToday.filter(x=>x.done).length;
    const todoPct=todosToday.length?Math.round(doneTodos/todosToday.length*100):0;
    
    const currentYM=ymISO();
    const habitList=(scoped.habits?.[currentYM]||[]).filter(h=>!h.ownerId||String(h.ownerId)===String(ownerId));
    const totalHabitTarget=habitList.reduce((s,h)=>s+h.target,0);
    const totalHabitDone=habitList.reduce((s,h)=>s+Object.values(h.days).filter(Boolean).length,0);
    const habitPct=totalHabitTarget?Math.min(100,Math.round(totalHabitDone/totalHabitTarget*100)):0;
    
    const overallPct=Math.round((studyPct + todoPct + habitPct)/3);

    $('todayText').innerHTML=`Chào bạn đã đến với trang web của nhóm nhé! 🌷 Không biết hôm nay bạn muốn làm gì nào?<br><span class="muted" style="font-weight:400">${new Date().toLocaleDateString('vi-VN',{weekday:'long',day:'numeric',month:'numeric',year:'numeric'})}</span>`;
    
    $('homeRealtimeMoodButtons').innerHTML = realtimeThemeDefs.map((m,i)=>`<button type="button" class="mood-btn guest-theme-control ${activeThemeMood===m.name?'selected':''}" data-theme-index="${i}" aria-label="${esc(m.name)}"><span class="mood-icon">${esc(m.icon)}</span><span class="mood-label">${esc(m.name)}</span></button>`).join('');
    bindRealtimeMoodButtons();

    $('homeProgressSummary').innerHTML=`
        <div class="stat"><b>${fmtMin(mins)} / ${fmtMin(goalMin)}</b><span>Học tập (${studyPct}%)</span><div class="progress"><i style="width:${studyPct}%"></i></div></div>
        <div class="stat"><b>${doneTodos}/${todosToday.length} việc kế hoạch</b><span>Công việc hôm nay (${todoPct}%)</span><div class="progress"><i style="width:${todoPct}%"></i></div></div>
        <div class="stat"><b>${totalHabitDone}/${totalHabitTarget}</b><span>Thói quen (${habitPct}%)</span><div class="progress"><i style="width:${habitPct}%"></i></div></div>
        <div class="stat"><b>${overallPct}%</b><span>Tiến độ tổng hợp</span><div class="progress"><i style="width:${overallPct}%"></i></div></div>
    `;

    renderTodayDashboard();

    let totalAchCount = 0;
    defaultAchievementGroups.forEach(g => totalAchCount += g.items.length);
    if(state.customAchievements) totalAchCount += state.customAchievements.length;

    $('homeStats').innerHTML=[
        ['🔥', state.streak, 'Ngày liên tiếp'],
        ['⭐', state.unlockedAchievements.length+'/'+totalAchCount, 'Thành tích mở khóa'],
        ['🌱', state.activities, 'Hoạt động đã làm']
    ].map(x=>`<div class="stat"><b>${x[0]} ${x[1]}</b><span>${x[2]}</span></div>`).join('');
    
    const legacyTodos=$('todayTodos');
    if(legacyTodos) legacyTodos.innerHTML=todosToday.map(x=>`<div class="todo ${x.done?'done':''}"><div class="title">${esc(x.title)}</div><span>${x.done?'☑️':'⬜'}</span></div>`).join('')||'<div class="empty">Hôm nay chưa có việc.</div>';
    const legacySchedule=$('todaySchedule');
    if(legacySchedule) legacySchedule.innerHTML=(scoped.schedules||[]).filter(x=>(!x.ownerId||String(x.ownerId)===String(ownerId))&&x.date===d).sort((a,b)=>(a.time||'').localeCompare(b.time||'')).map(x=>`<div class="todo"><b>${x.time||'—'}</b><div class="title">${esc(x.title)}</div></div>`).join('')||'<div class="empty">Chưa có lịch.</div>';
    
    const mo=state.moods.find(x=>x.date===d);
    $('homeMood').innerHTML=mo?`${mo.emoji} ${esc(mo.name)}<br><span class="muted">${esc(mo.note||'')}</span>`:'Chưa ghi cảm xúc hôm nay.';
    
    const moodMots = state.customMotivations && state.customMotivations.length ? state.customMotivations : ['Mỗi cảm xúc đều đáng được lắng nghe. 🍀'];
    const randMot = moodMots[Math.floor(Math.random()*moodMots.length)];
    $('homeMotivationBox').innerHTML = `"${esc(randMot)}"`;

    $('streak').innerHTML=`<b style="font-size:32px;color:var(--red)">${state.streak}</b> ngày liên tiếp có hoạt động thực tế. <br><span class="tag" style="margin-top:6px;display:inline-block">✨ Dựa trên hành động thực tế</span>`;
    const completionMots = state.completionMotivations && state.completionMotivations.length ? state.completionMotivations : ['Mỗi ngày tích lũy thêm một chút, bạn sẽ đạt được mục tiêu lớn! 🐝🍀'];
    const completionMot = completionMots[Math.floor(Math.random()*completionMots.length)];
    $('overallCompletionSummary').innerHTML=`
        <p><b>Việc hoàn thành:</b> ${doneTodos} việc hôm nay + ${totalHabitDone} lượt thói quen.</p>
        <p class="kpi">${esc(completionMot)}</p>
    `;
}

function promptAddMotivation(){
    if(state.sessionAuth?.role!=='Admin') return alert('🔒 Chỉ Quản trị viên mới có thể thêm lời động viên.');
    const mot = prompt("Nhập câu động viên mới của bạn:");
    if(mot){
        state.customMotivations.push(mot);
        save();
        alert("Đã thêm câu động viên thành công! 🐝🍀");
        renderHome();
    }
}


function popRandomMoment(){
    const memorable = (Array.isArray(state.moments)?state.moments:[])
        .filter(m => !m.type || m.type === 'user');

    if(!memorable.length){
        alert("Chưa có khoảnh khắc đáng nhớ nào. Hãy tự thêm một khoảnh khắc ở mục 📸 Khoảnh khắc nhé! 🐝🍀");
        return;
    }

    const rand = memorable[Math.floor(Math.random()*memorable.length)];
    showModal(
        `🌟 Khoảnh khắc đáng nhớ (${rand.date})`,
        `<h3 style="color:var(--red)">${esc(rand.title)}</h3>
         <p>${esc(rand.desc||'Không có mô tả chi tiết.')}</p>
         <p class="quote">Bạn đã tự tạo nên khoảnh khắc này. Nhớ cảm giác tuyệt vời đó nhé! 🐝🍀</p>`
    );
}

function saveEndDaySnapshot(){
    const gratitude=$('endGratitude').value, lesson=$('endLesson').value, tomorrow=$('endTomorrow').value, moodDisplay=$('endMoodDisplay').value;
    state.moments.unshift({
        id:uid(),
        date:todayISO(),
        title:`Kết ngày ${todayISO()} 🐝🍀`,
        desc:`Cảm xúc: ${moodDisplay} | Biết ơn: ${gratitude} | Bài học: ${lesson} | Ngày mai: ${tomorrow}`,
        type:'endday'
    });
    alert('Đã lưu kết ngày thành công! Chúc bạn ngủ ngon 🌙🐝🍀');
    save();
    renderEndDay();
}

function renderEndDay(){
    const todayMo = state.moods.find(x=>x.date===todayISO());
    $('endMoodDisplay').value = todayMo ? `${todayMo.emoji} ${todayMo.name} (${todayMo.note||'Không có ghi chú'})` : 'Chưa ghi nhận cảm xúc hôm nay (Hãy bấm ở mục Cảm xúc).';
    $('endDayHistory').innerHTML = state.moments.filter(m=>m.title.includes('Kết ngày')).map(m=>`<div class="card" style="margin-bottom:10px;padding:14px"><b>${m.date}</b><p>${esc(m.desc)}</p><button class="btn danger sm" onclick="del('moments','${m.id}')">Xóa</button></div>`).join('')||'<div class="empty">Chưa có kết ngày nào được lưu.</div>';
}


function openAchievementDetail(id){
  if(id==='__xp_history__'){
    const rows=getPrivateXPHistoryForAdmin().slice().reverse();
    const body=rows.length?rows.map(x=>`<div class="todo" style="margin-bottom:8px"><div><b>${esc(x.source||'XP')}</b><div class="kpi">${esc(x.detail||'')} · ${new Date(x.at).toLocaleString('vi-VN')}</div></div><span class="tag" style="color:${Number(x.delta)<0?'var(--red)':'var(--green)'};font-weight:800">${Number(x.delta)>0?'+':''}${x.delta} XP</span></div>`).join(''):`<div class="empty">🌱 Chưa có lịch sử XP theo dữ liệu hiện tại.</div>`;
    showModal('🧩 Chi tiết tiến độ',`<div style="margin-bottom:10px"><b>Lịch sử XP cá nhân</b><div class="muted">Lịch sử này được tính lại trực tiếp từ dữ liệu đang còn tồn tại. Nếu bạn xóa một Kế hoạch hoặc Thói quen, phần XP tương ứng và thành tích phụ thuộc vào nó cũng sẽ giảm theo.</div></div>${body}`);return;
  }
  const all=[];defaultAchievementGroups.forEach(g=>g.items.forEach(a=>all.push(a)));(state.customAchievements||[]).forEach(a=>all.push(a));const ach=all.find(a=>a.id===id);if(!ach)return;
  const unlocked=(state.unlockedAchievements||[]).includes(id),reward=Number(ach.xp)||0;
  const extra=id==='a2'?`<div class="card" style="text-align:left;margin-top:12px;padding:12px"><b>🔎 Thành tích này nghĩa là gì?</b><p style="margin:7px 0">Hệ thống sẽ tìm ngày đầu tiên có dữ liệu hoạt động thật của tài khoản.</p><p style="margin:7px 0"><b>Ví dụ:</b> bạn hoàn thành một <b>Kế hoạch</b> vào 10/08/2026 → hệ thống ghi nhận 10/08/2026 là ngày hoạt động đầu tiên → thành tích được mở khóa.</p><p style="margin:7px 0">Nếu dữ liệu tạo nên ngày hoạt động đó bị xóa, hệ thống sẽ tính lại từ dữ liệu còn lại; thành tích và XP thưởng có thể bị thu hồi.</p></div>`:'';
  showModal(`${ach.icon||'🏆'} ${esc(ach.name)}`,`<div style="text-align:center;padding:8px"><div style="font-size:54px">${ach.icon||'🏆'}</div><h3 style="margin:6px 0">${esc(ach.name)}</h3><div class="tag">${esc(ach.tier||'Thành tích')}</div><p>${esc(ach.desc||'')}</p>${extra}<div style="font-size:20px;font-weight:800;color:var(--red);margin-top:12px">⚡ +${reward} XP khi đủ điều kiện</div><div class="kpi" style="margin-top:8px">${unlocked?'✨ Đã mở khóa':'🔒 Chưa mở khóa'}</div></div>`);
}

function renderAchievementsView(){
    try{ensureDailyQuests();renderQuestBoard();}catch(e){}
    const container=$('rebuiltAchievementGroups') || $('achievementList');
    if(!container) return;

    const groups=defaultAchievementGroups.map(g=>({id:g.id,title:g.title,items:[...(g.items||[])]}));
    const custom=(state.customAchievements||[]);
    const customGroup=groups.find(g=>g.id==='kho') || groups[groups.length-1];
    custom.forEach(a=>{ if(!customGroup.items.some(x=>x.id===a.id)) customGroup.items.push(a); });

    const legendary=groups.find(g=>g.id==='huyen-thoai');
    if(legendary && !legendary.items.some(a=>a.id==='__xp_history__')){
      legendary.items.push({id:'__xp_history__',name:'Chi tiết tiến độ',tier:'⚫ HUYỀN THOẠI',desc:'Bí mật tiến độ cá nhân — nhấn để mở lịch sử XP của chính bạn.',icon:'🧩',xp:0});
    }

    container.innerHTML=groups.map(g=>{
      const collapsed=!!achievementGroupCollapsed[g.id];
      return `<div class="achievement-group card" data-tier="${g.id}" style="padding:0;overflow:hidden;border:2px solid ${g.accent||'var(--line)'};background:${g.bg||'var(--card)'}">
        <button type="button" class="btn" style="width:100%;text-align:left;border:0;border-radius:0;display:flex;justify-content:space-between;align-items:center;background:${g.bg||'var(--card)'};color:${g.accent||'inherit'};font-weight:900" onclick="toggleAchievementGroup('${g.id}')">
          <span style="display:flex;align-items:center;gap:8px"><span style="font-size:24px">${g.leaf||'🍀'}</span>${g.title}</span><span>${collapsed?'＋':'−'}</span>
        </button>
        <div style="display:${collapsed?'none':'grid'};gap:10px;padding:12px">
          ${g.items.map(a=>{
            const special=a.id==='__xp_history__';
            const unlocked=!special && (state.unlockedAchievements||[]).includes(a.id);
            return `<button type="button" class="achievement ${unlocked?'':'locked'}" onclick="openAchievementDetail('${a.id}')" style="width:100%;text-align:left;cursor:pointer;border:1px solid ${g.accent||'var(--line)'};background:linear-gradient(135deg,${g.bg||'var(--card)'},#ffffff);border-radius:16px;padding:14px;display:flex;gap:12px;align-items:center">
              <div class="achievement-tier-icon">${a.icon||g.leaf||'🍀'}</div>
              <div style="flex:1">
                <div><b>${esc(a.name)}</b> <span class="tag sm">${esc(a.tier||'Thành tích')}</span></div>
                <div class="kpi">${esc(a.desc||'')}</div>
                ${special?'<div style="margin-top:5px;font-weight:800;color:var(--red)">✨ Nhấn để mở bất ngờ</div>':`<div style="margin-top:5px;font-weight:800;color:var(--red)">${unlocked?'🏆 Đã mở khóa':'🔒 Chưa mở khóa'} · ⚡ +${Number(a.xp)||0} XP</div>`}${(state.customAchievements||[]).some(c=>c.id===a.id)&&['Admin','Founder'].includes(state.sessionAuth?.role||'')?`<span style="display:inline-flex;gap:6px;flex-wrap:wrap;margin-top:7px"><button type="button" class="btn light sm" onclick="event.stopPropagation();editCustomAchievement('${a.id}')">✏️ Sửa</button><button type="button" class="btn danger sm" onclick="event.stopPropagation();deleteCustomAchievement('${a.id}')">🗑️ Xóa thành tích</button></span>`:''}
              </div>
            </button>`;
          }).join('')}
        </div>
      </div>`;
    }).join('');

    // Tổng quan: bản thu gọn chỉ là bản xem nhanh, không phải ô lệnh.
    const summary=$('summaryAchievementList');
    if(summary){
      const flat=groups.flatMap(g=>g.items.filter(a=>a.id!=='__xp_history__'));
      summary.innerHTML=flat.map(a=>{
        const unlocked=(state.unlockedAchievements||[]).includes(a.id);
        return `<button type="button" class="achievement ${unlocked?'':'locked'}" onclick="openAchievementDetail('${a.id}')" style="width:100%;text-align:left;margin-bottom:8px;cursor:pointer;border:1px solid var(--line);background:var(--card);border-radius:14px;padding:11px;display:flex;gap:10px;align-items:center">
          <span style="font-size:24px">${a.icon||'🏆'}</span><span><b>${esc(a.name)}</b><small class="muted"> · ${esc(a.tier||'')}</small><br><small>${unlocked?'🏆 Đã mở khóa':'🔒 Chưa mở khóa'} · ⚡ +${Number(a.xp)||0} XP</small></span>
        </button>`;
      }).join('');
    }
}

function ownerZoneStore(ownerId){
  state.memberZones=state.memberZones||{};
  state.memberZones[ownerId]=state.memberZones[ownerId]||{badges:[],publicBadges:{},zones:[],publicZones:{}};
  return state.memberZones[ownerId];
}
function ensureDailyQuests(){
  const date=todayISO();
  if(state.dailyQuestDate===date && (state.customQuests||[]).some(q=>String(q.id).startsWith('daily-'))) return;
  state.customQuests=(state.customQuests||[]).filter(q=>!String(q.id).startsWith('daily-'));
  const tasks=[
    {title:'⏱️ Học chính thức ít nhất 30 phút hôm nay',xp:5,kind:'study',zone:{name:'Tập Trung',icon:'🎯',color1:'#81d4fa',color2:'#4fc3f7'}},
    {title:'🍀 Hoàn thành ít nhất 50% Thói quen hôm nay',xp:5,kind:'habit',zone:{name:'Kỷ Luật Xanh',icon:'🍀',color1:'#a5d6a7',color2:'#66bb6a'}},
    {title:'📋 Hoàn thành 100% Kế hoạch hôm nay',xp:5,kind:'todo',zone:{name:'Hoàn Thành',icon:'🏁',color1:'#ffe082',color2:'#ffca28'}}
  ];
  const dayNum=Number(date.slice(-2));
  if(dayNum%5===0) tasks.push({title:'✨ NHIỆM VỤ ĐẶC BIỆT · Hoàn thành cả 3 nhiệm vụ thường hôm nay',xp:20,special:true,kind:'special',zone:{name:'Tinh Tú Đặc Biệt',icon:'🌌',color1:'#ce93d8',color2:'#7e57c2'}});
  state.customQuests.push(...tasks.map((q,i)=>({...q,id:`daily-${date}-${i+1}`,date,auto:true})));
  state.dailyQuestDate=date;
}
function dailyQuestProgress(q,ownerId){
  const p=getProgressRecord(ownerId)||{}; const date=q.date||todayISO();
  if(q.kind==='study') return studyMinutesForDate(ownerId,date)>=30;
  if(q.kind==='habit') return Number(dailyHabitPercent(ownerId,date)||0)>=50;
  if(q.kind==='todo') { const ts=(state.todos||[]).filter(t=>String(t.ownerId)===String(ownerId)&&t.date===date); return ts.length>0 && ts.every(t=>t.done); }
  if(q.kind==='special') return (state.questClaims||[]).filter(c=>String(c.ownerId)===String(ownerId)&&String(c.questId).startsWith(`daily-${date}-`)).length>=3;
  return false;
}
function studyMinutesForDate(ownerId,date){
  return getOfficialStudyMinutesForDate(ownerId,date);
}
function dailyHabitPercent(ownerId,date){
  if(!ownerId || !date)return 0;
  const iso=String(date), ym=iso.slice(0,7), day=Number(iso.slice(8,10)), dayKey=String(day).padStart(2,'0');
  const scoped=typeof getOwnerScopedData==='function'?getOwnerScopedData(ownerId):{habits:state.habits||{}};
  const hs=(scoped.habits?.[ym]||[]).filter(h=>!h.ownerId||String(h.ownerId)===String(ownerId));
  if(!hs.length)return 0;
  const done=hs.filter(h=>{const days=h?.days||{};return Boolean(days[day] ?? days[dayKey] ?? days[iso]);}).length;
  return Math.round(done/hs.length*100);
}
function awardQuestZone(ownerId,q){
  if(!q.zone)return; const z=ownerZoneStore(ownerId); const key=q.zone.name;
  if(!z.zones.some(x=>x.name===key)) z.zones.push({...q.zone,id:uid(),sourceQuest:q.id,earnedAt:new Date().toISOString()});
  if(z.publicZones[key]===undefined) z.publicZones[key]=false;
}
function renderQuestBoard(){
    const container=$('questBoard'); if(!container)return;
    ensureDailyQuests();
    const quests=Array.isArray(state.customQuests)?state.customQuests:[];
    const role=state.sessionAuth?.role||'Guest'; const ownerId=accountOwnerId();
    container.innerHTML=quests.length?quests.map(q=>{
      const claimed=!!ownerId&&(state.questClaims||[]).some(c=>String(c.ownerId)===String(ownerId)&&c.questId===q.id);
      const done=ownerId&&dailyQuestProgress(q,ownerId);
      const special=q.special?'✨ NHIỆM VỤ ĐẶC BIỆT':'🎯 NHIỆM VỤ HÔM NAY';
      return `<div class="todo" style="margin-bottom:8px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;border-left:4px solid ${q.special?'#7e57c2':'#66bb6a'}">
        <div style="flex:1"><b>${special} · ${esc(q.title||'Nhiệm vụ')}</b><div class="kpi">⚡ +${Number(q.xp)||0} XP ${q.zone?`· ${q.zone.icon} Zone ${esc(q.zone.name)}`:''}</div>${q.auto&&done?'<div style="color:var(--green);font-weight:800">✅ Đã hoàn thành điều kiện</div>':''}</div>
        ${ownerId?`<button class="btn sm ${claimed?'light':''}" ${claimed||(!done&&q.auto)?'disabled':''} onclick="claimCustomQuest('${q.id}')">${claimed?'✅ Đã nhận XP':done?'⚡ Nhận XP':'🔒 Chưa đủ điều kiện'}</button>`:''}
        ${!q.auto&&['Admin','Founder'].includes(role)?`<button class="btn danger sm" onclick="deleteCustomQuest('${q.id}')">🗑️ Xóa</button>`:''}
      </div>`;
    }).join(''):'<div class="empty">Chưa có nhiệm vụ hôm nay.</div>';
}
function claimCustomQuest(id){
    const q=(state.customQuests||[]).find(x=>x.id===id),ownerId=accountOwnerId(); if(!q||!ownerId)return;
    state.questClaims=Array.isArray(state.questClaims)?state.questClaims:[];
    if(state.questClaims.some(c=>String(c.ownerId)===String(ownerId)&&c.questId===id)){alert('⚠️ Nhiệm vụ này đã được nhận.');return;}
    if(q.auto&&!dailyQuestProgress(q,ownerId)) return alert('🔒 Chưa đủ điều kiện để nhận nhiệm vụ này.');
    state.questClaims.push({id:uid(),questId:id,ownerId,xp:Math.max(0,Number(q.xp)||0),claimedAt:new Date().toISOString(),zone:q.zone||null});
    awardQuestZone(ownerId,q); recalculateCurrentProgress(ownerId); checkAchievements(); save(); renderAchievementsView(); renderQuestBoard(); renderProfileView(); renderComparison();
    alert(`🎉 Đã nhận +${q.xp} XP${q.zone?' và Zone '+q.zone.name:''}!`);
}

function deleteCustomAchievement(id){
    const role=state.sessionAuth?.role||'Guest';
    if(!['Admin','Founder'].includes(role)) return alert('⚠️ Chỉ Admin/Founder mới có quyền xóa thành tích.');
    const arr=state.customAchievements||[]; const i=arr.findIndex(x=>x.id===id); if(i<0)return;
    const removed=arr[i]; const ownerIds=new Set();
    (state.membersList||[]).forEach(m=>{const p=getProgressRecord(m.id);if(p?.unlockedAchievements?.includes(id))ownerIds.add(String(m.id));});
    const trashItem=moveTrash('achievement',removed); trashItem._achievementId=id;
    arr.splice(i,1);
    ownerIds.forEach(id2=>recalculateCurrentProgress(id2,{persist:false}));
    save(); renderAchievementsView(); renderTrash();
    alert(`🗑️ Đã chuyển thành tích “${removed.name||'không tên'}” vào Thùng rác. XP/thành tích liên quan đã được tính lại.`);
}

function addCustomAchievementAdmin(){
    const role = state.sessionAuth ? state.sessionAuth.role : 'Guest';
    if(!['Admin','Founder'].includes(role)) return alert('⚠️ Chỉ Quản trị viên (Admin) mới có quyền thêm thành tích mới!');
    
    const name = $('customAchName').value.trim();
    const icon = $('customAchIcon').value.trim() || '🎯';
    const tier = $('customAchTier').value;
    const desc = $('customAchDesc').value.trim() || 'Thành tích tùy chỉnh.';
    const rewardXP = Math.max(0, parseInt($('customAchXP')?.value)||10);
    if(!name) return alert('Nhập tên thành tích!');
    if(!state.customAchievements) state.customAchievements = [];
    state.customAchievements.push({id:uid(), tier, icon, name, desc, xp:rewardXP});
    $('customAchName').value=''; $('customAchDesc').value=''; if($('customAchXP')) $('customAchXP').value='10';
    save();
    renderAchievementsView();
    alert('Đã thêm thành tích mới thành công! 🐝🍀');
}

function addCustomQuestAdmin(){
    const role = state.sessionAuth ? state.sessionAuth.role : 'Guest';
    if(!['Admin','Founder'].includes(role)) return alert('⚠️ Chỉ Quản trị viên (Admin) mới có quyền thêm nhiệm vụ nhận XP!');

    const title = $('newQuestTitle').value.trim();
    const xp = parseInt($('newQuestXP').value) || 25;
    if(!title) return alert('Nhập tên nhiệm vụ!');
    if(!state.customQuests) state.customQuests = [];
    state.customQuests.push({id: uid(), title, xp});
    $('newQuestTitle').value = '';
    save();
    renderAchievementsView();
    alert('Đã thêm nhiệm vụ nhận XP thành công! 🐝🍀');
}

function deleteCustomQuest(id){
    const role=state.sessionAuth?.role||'Guest';
    if(!['Admin','Founder'].includes(role)) return alert('⚠️ Chỉ Admin/Founder mới có quyền xóa nhiệm vụ!');
    const arr=state.customQuests||[],i=arr.findIndex(x=>x.id===id); if(i<0)return;
    const removed=arr[i],trashItem=moveTrash('quest',removed);
    const claims=(state.questClaims||[]).filter(c=>c.questId===id);
    const owners=new Set(claims.filter(c=>c.ownerId).map(c=>String(c.ownerId)));
    trashItem._xpReversal=-claims.reduce((n,c)=>n+Math.max(0,Number(c.xp)||0),0);
    trashItem._xpReversalDetail=trashItem._xpReversal<0?`Trừ ${Math.abs(trashItem._xpReversal)} XP vì đã xóa nhiệm vụ ${removed.title||'không tên'}`:'';
    arr.splice(i,1); owners.forEach(id2=>recalculateCurrentProgress(id2,{persist:false}));
    save(); renderAchievementsView(); renderQuestBoard(); renderTrash();
    alert(`🗑️ Đã chuyển nhiệm vụ “${removed.title||'không tên'}” vào Thùng rác.`);
}

function runAchCommand(){
    const role=state.sessionAuth?.role||'Guest';
    if(!['Admin','Founder'].includes(role))return alert('⚠️ Chỉ Admin/Founder mới có quyền sử dụng lệnh này.');
    const box=$('achievementCommandBox'); const text=box?.value||'';
    if(!text.trim())return alert('⚠️ Hãy nhập ít nhất một câu lệnh.');
    try{executeAutomationCommands(text); if(box)box.value=''; renderAchievementsView(); renderQuestBoard(); renderTrash();}
    catch(e){alert('❌ '+(e?.message||e));}
}

/* HABITS */
let currentHabitMonth=ymISO();
if($('habitMonth')) $('habitMonth').value=currentHabitMonth;
function ensureHabits(ym){if(!state.habits[ym])state.habits[ym]=[];return state.habits[ym]}
if($('habitMonth')) $('habitMonth').onchange=e=>{currentHabitMonth=e.target.value;renderHabits()};
if($('prevMonth')) $('prevMonth').onclick=()=>{let [y,m]=currentHabitMonth.split('-').map(Number);m--;if(m<1){m=12;y--}currentHabitMonth=`${y}-${String(m).padStart(2,'0')}`;$('habitMonth').value=currentHabitMonth;renderHabits()};
if($('nextMonth')) $('nextMonth').onclick=()=>{let [y,m]=currentHabitMonth.split('-').map(Number);m++;if(m>12){m=1;y++}currentHabitMonth=`${y}-${String(m).padStart(2,'0')}`;$('habitMonth').value=currentHabitMonth;renderHabits()};
if($('addHabit')) $('addHabit').onclick=()=>{const n=$('habitName').value.trim();if(!n)return alert('Nhập tên thói quen nha 🐝🍀');const ownerId=accountOwnerId();
    const target=+$('habitTarget').value||20; const now=new Date().toISOString(); ensureHabits(currentHabitMonth).push({id:uid(),ownerId,name:n,target,days:{},createdAt:now,updatedAt:now}); updateAccountProgress('habit_created',0,ownerId,target); $('habitName').value=''; checkAchievements(); save({immediateCloud:true})};

if($('reviewHabit')) $('reviewHabit').onclick=()=>{
    const ym=currentHabitMonth;
    const a=ensureHabits(ym);
    const completedCount=a.filter(h=>Object.values(h.days||{}).filter(Boolean).length>0).length;
    // User rule: XP = number of habits completed in the month (e.g. 9/10 => +9 XP).
    const ownerId=accountOwnerId();
    const gained=ownerId?awardMonthlyHabitXP(ownerId,completedCount,ym,a.length):0;
    save();
    alert(gained?`🍀 Tháng ${ym}: +${gained} XP từ ${gained} thói quen hoàn thành.`:'🍀 Chưa có XP mới cho tháng này.');
    renderHabits();
};
if($('habitReminderFocus')) $('habitReminderFocus').onclick=()=>{$('habitGrid')?.scrollIntoView({behavior:'smooth',block:'start'});};
function awardDailyHabitMilestone(ownerId, monthKey, day){
    if(!ownerId || !monthKey || !day) return 0;
    const habits = ensureHabits(monthKey).filter(h=>!h.ownerId || String(h.ownerId)===String(ownerId));
    const total = habits.length;
    if(!total) return 0;
    const completed = habits.filter(h=>{const days=h.days||{};const key=String(day).padStart(2,'0');return Boolean(days[day] ?? days[key] ?? days[`${monthKey}-${key}`]);}).length;
    const pct = Math.round(completed/total*100);
    state.dailyHabitXPClaims = state.dailyHabitXPClaims || {};
    const key = `${ownerId}|${monthKey}|${day}`;
    const previous = state.dailyHabitXPClaims[key] || {pct:0,awarded:0};
    const oldPct = Math.max(0, Number(previous.pct)||0);
    // Tổng thưởng khi đạt 100% = 10 XP: 30%=3, 50%=2, 90%=4, 100%=1.
    const milestones = [{pct:30,xp:3},{pct:50,xp:2},{pct:90,xp:4},{pct:100,xp:1}];
    const gain = milestones.reduce((sum,m)=>sum + (pct>=m.pct && oldPct<m.pct ? m.xp : 0),0);
    state.dailyHabitXPClaims[key] = {pct:Math.max(oldPct,pct),awarded:Number(previous.awarded||0)+gain,updatedAt:new Date().toISOString()};
    if(!gain) return 0;
    const p=getProgressRecord(ownerId); if(!p) return 0;
    p.xp=Math.max(0,(Number(p.xp)||0)+gain);
    p.level=Math.max(1,Math.floor(p.xp/100)+1);
    const crossed=milestones.filter(m=>pct>=m.pct && oldPct<m.pct).map(m=>`${m.pct}% +${m.xp} XP`).join(', ');
    recordPrivateXPHistory(ownerId,gain,'🍀 Thói quen',`Ngày ${monthKey}-${String(day).padStart(2,'0')}: ${oldPct}% → ${pct}% (${completed}/${total} thói quen) — mốc: ${crossed}`);
    syncXPProgressUI(ownerId);
    return gain;
}

function toggleHabit(id,day){
    const h=ensureHabits(currentHabitMonth).find(x=>x.id===id);if(!h)return;
    const nextDone=!Boolean(h.days[day]);

    // Optimistic update: đổi trạng thái ngay, không chờ renderAll hoặc Supabase.
    h.days[day]=nextDone; h.updatedAt=new Date().toISOString();
    if(h.ownerId) updateAccountProgress('habit_done',0,h.ownerId,nextDone?1:-1);
    const ownerId=h.ownerId||accountOwnerId();
    if(nextDone) awardDailyHabitMilestone(ownerId,currentHabitMonth,day);
    checkAchievements();

    // Chỉ vẽ các khu vực cần cập nhật, tránh renderAll làm trang nhấp nháy/reload.
    renderHabits();
    renderComparison();
    renderHome();
    try{renderQuestBoard();}catch(e){}

    // Lưu local/cloud không chặn phản hồi của ô tick.
    persistActiveUserData();
    save({render:false,immediateCloud:true});
}
function renderHabitQuickSummary(){
    const summary=$('habitQuickSummary'),list=$('habitQuickList');
    if(!summary||!list)return;
    const ym=currentHabitMonth,days=daysInMonth(ym),ownerId=accountOwnerId(),habits=ensureHabits(ym).filter(h=>!h.ownerId||String(h.ownerId)===String(ownerId));
    if(!habits.length){
        summary.innerHTML='<div class="empty">Chưa có thói quen để tổng hợp.</div>';
        list.innerHTML='';
        const emptyReminder=$('habitReminderList');
        if(emptyReminder) emptyReminder.innerHTML='<div class="habit-reminder-empty">Thêm thói quen đầu tiên để nhận nhắc nhẹ mỗi ngày.</div>';
        if($('habitReminderSubtitle')) $('habitReminderSubtitle').textContent='Chưa có thói quen để nhắc.';
        $('habitQuickSubtitle').textContent=`Tháng ${ym} • Hãy thêm thói quen đầu tiên.`;
        $('habitQuickSync').textContent='Không có dữ liệu mới';
        return;
    }
    const today=todayISO(),isCurrentMonth=ym===today.slice(0,7),todayDay=isCurrentMonth?Number(today.slice(-2)):null;
    const rows=habits.map(h=>{
        const done=Object.values(h.days||{}).filter(Boolean).length;
        const target=Math.max(1,Number(h.target)||days);
        const pct=Math.min(100,Math.round(done/target*100));
        const lastDay=isCurrentMonth?todayDay:days;
        let streak=0;
        for(let cursor=lastDay;cursor>=1&&Boolean(h.days?.[cursor]);cursor--)streak++;
        return {h,done,target,pct,streak,todayDone:todayDay?Boolean(h.days?.[todayDay]):false};
    }).sort((a,b)=>b.pct-a.pct||b.streak-a.streak||String(a.h.name||'').localeCompare(String(b.h.name||''),'vi'));
    const doneToday=rows.filter(x=>x.todayDone).length;
    const totalDone=rows.reduce((sum,x)=>sum+x.done,0);
    const totalTarget=rows.reduce((sum,x)=>sum+x.target,0);
    const average=Math.round(rows.reduce((sum,x)=>sum+x.pct,0)/rows.length);
    const bestStreak=Math.max(...rows.map(x=>x.streak));
    const statBox=(value,label,progress=null)=>`<div class="habit-quick-stat"><strong>${esc(value)}</strong><span>${esc(label)}</span>${progress===null?'':`<div class="progress" aria-label="${esc(label)}"><i style="width:${progress}%"></i></div>`}</div>`;
    summary.innerHTML=[
        statBox(`${doneToday}/${rows.length}`,'Hôm nay hoàn thành',Math.round(doneToday/rows.length*100)),
        statBox(`${totalDone}/${totalTarget}`,'Lượt / mục tiêu tháng',Math.min(100,Math.round(totalDone/totalTarget*100))),
        statBox(`${average}%`,'Tiến độ trung bình',average),
        statBox(`${bestStreak} ngày`,'Chuỗi hiện tại tốt nhất')
    ].join('');
    $('habitQuickSubtitle').textContent=`Tháng ${ym} • ${rows.length} thói quen • xếp theo tiến độ.`;
    $('habitQuickSync').textContent='Chỉ đọc state hiện tại';
    const habitRows=rows.slice(0,6).map(x=>`<div class="habit-quick-row"><span class="habit-quick-row-marker">${x.todayDone?'✓':'🍀'}</span><div class="habit-quick-row-main"><div class="habit-quick-row-title">${esc(x.h.name||'Thói quen chưa đặt tên')}</div><div class="habit-quick-row-meta">${x.done}/${x.target} lượt mục tiêu • Chuỗi ${x.streak} ngày</div></div><div class="progress" aria-label="${esc(x.h.name||'Tiến độ')}"><i style="width:${x.pct}%"></i></div></div>`).join('');
    list.innerHTML=habitRows+(rows.length>6?`<div class="habit-quick-more">Còn ${rows.length-6} thói quen trong bảng chi tiết bên dưới.</div>`:'');
    const reminderList=$('habitReminderList'),reminderSubtitle=$('habitReminderSubtitle');
    if(reminderList&&reminderSubtitle){
        if(!isCurrentMonth){
            reminderSubtitle.textContent='Nhắc nhở chỉ áp dụng cho tháng hiện tại.';
            reminderList.innerHTML='<div class="habit-reminder-empty">Hãy chuyển về tháng hiện tại để xem nhắc nhở hôm nay.</div>';
        }else{
            const reminders=rows.filter(x=>!x.todayDone).sort((a,b)=>a.pct-b.pct||String(a.h.name||'').localeCompare(String(b.h.name||''),'vi'));
            reminderSubtitle.textContent=reminders.length?`Còn ${reminders.length} thói quen chưa ghi nhận hôm nay.`:'Tuyệt vời — bạn đã hoàn thành tất cả thói quen hôm nay.';
            reminderList.innerHTML=reminders.length?reminders.slice(0,5).map(x=>`<div class="habit-reminder-row"><span class="habit-reminder-icon">🔔</span><div><b>${esc(x.h.name||'Thói quen chưa đặt tên')}</b><small>${x.done}/${x.target} lượt tháng • Chuỗi ${x.streak} ngày</small></div><span class="tag">Chưa xong</span></div>`).join('')+(reminders.length>5?`<div class="habit-reminder-more">Còn ${reminders.length-5} nhắc nhở trong bảng chi tiết.</div>`:''):'<div class="habit-reminder-empty">Mọi thói quen hôm nay đã được ghi nhận. Giữ nhịp nhé!</div>';
        }
    }
}

function habitDayMeta(ym,day){
    const date=new Date(`${ym}-${String(day).padStart(2,'0')}T12:00:00`),weekday=Number.isNaN(date.getTime())?0:date.getDay();
    return {weekday,label:['CN','T2','T3','T4','T5','T6','T7'][weekday],iso:`${ym}-${String(day).padStart(2,'0')}`};
}
function setHabitWeekGroups(open){
    document.querySelectorAll('#habitGrid .habit-week-group').forEach(group=>{group.open=Boolean(open)});
}
function renderHabits(){
    const ym=currentHabitMonth,days=daysInMonth(ym),ownerId=accountOwnerId(),a=ensureHabits(ym).filter(h=>!h.ownerId||String(h.ownerId)===String(ownerId));
    renderHabitQuickSummary();
    const grid=$('habitGrid');
    const existingWeekGroups=grid?.querySelectorAll('.habit-week-group');
    const openWeeks=existingWeekGroups?.length?new Set(Array.from(existingWeekGroups).filter(group=>group.open).map(group=>group.dataset.weekStart)):null;
    if(grid){
      if(!a.length){
        grid.innerHTML='<div class="empty">Tháng này chưa có thói quen.</div>';
      }else{
        const weekGroups=[];
        for(let start=1;start<=days;start+=7){
          const end=Math.min(days,start+6),count=end-start+1;
          const header=Array.from({length:count},(_,offset)=>{const day=start+offset,meta=habitDayMeta(ym,day);return `<div class="habit-day-col habit-day-w${meta.weekday}" data-date="${meta.iso}"><b>${day}</b><small>${meta.label}</small></div>`}).join('');
          const rows=a.map(h=>{
            const done=Array.from({length:days},(_,i)=>Boolean(h.days?.[i+1])).filter(Boolean).length,p=Math.round(done/days*100);
            const cells=Array.from({length:count},(_,offset)=>{const day=start+offset,meta=habitDayMeta(ym,day),checked=Boolean(h.days?.[day]);return `<div class="habit-day-cell habit-day-w${meta.weekday}"><div class="check ${checked?'on':''}" aria-label="${esc(`${h.name||'Thói quen'} ngày ${day}`)}" onclick="toggleHabit('${h.id}',${day})">${checked?'✓':''}</div></div>`}).join('');
            return `<div class="habitrow habit-data-row"><div class="name"><b>${esc(h.name)}</b><br><span class="muted">Mục tiêu ${h.target} ngày • ${done}/${days}</span></div>${cells}<div class="habit-percent"><b>${p}%</b><br><button class="btn light sm" onclick="editHabit('${h.id}')">Sửa</button><button class="btn danger sm" onclick="deleteHabit('${h.id}')">Xóa</button></div></div>`;
          }).join('');
          const weekIsOpen=openWeeks?openWeeks.has(String(start)):start===1;
          weekGroups.push(`<details class="habit-week-group" data-week-start="${start}" ${weekIsOpen?'open':''}><summary><span>Tuần ${Math.ceil(start/7)} • ngày ${start}–${end}</span><span class="tag">${count} ngày • ${a.length} thói quen</span></summary><div class="habit-week-scroll"><div class="habit-week-grid" style="--habit-day-count:${count}"><div class="habitrow habit-header"><div class="name">Thói quen</div>${header}<div>%</div></div>${rows}</div></div></details>`);
        }
        grid.innerHTML=weekGroups.join('');
      }
    }
    const stats=a.map(h=>{const done=Object.values(h.days||{}).filter(Boolean).length;return {h,done,p:Math.round(done/days*100)}});
    $('habitMonthStats').innerHTML=stats.map(s=>`<div style="margin:9px 0"><b>${esc(s.h.name)}</b><span style="float:right">${s.p}%</span><div class="progress"><i style="width:${s.p}%"></i></div><small>${s.done} ngày / mục tiêu ${s.h.target} ngày</small></div>`).join('')||'Chưa có dữ liệu.';
    $('habitArchive').innerHTML=Object.keys(state.habits).sort().reverse().map(m=>`<button class="btn light sm" onclick="currentHabitMonth='${m}';$('habitMonth').value='${m}';renderHabits()">${m}</button>`).join(' ')||'Chưa có tháng lưu.';
}

function editHabit(id){const h=ensureHabits(currentHabitMonth).find(x=>x.id===id);if(!h)return;showModal('✏️ Sửa thói quen',`<div class="form"><div class="full"><label>Tên thói quen</label><input id="mhName" value="${esc(h.name)}"></div><div><label>Mục tiêu tháng</label><input id="mhTarget" type="number" value="${h.target}"></div></div><button class="btn" style="margin-top:10px" onclick="editHabitSubmit('${id}')">Lưu</button>`);}
function editHabitSubmit(id){const h=ensureHabits(currentHabitMonth).find(x=>x.id===id);if(!h)return;h.name=$('mhName').value.trim()||h.name;h.target=+$('mhTarget').value||20;h.updatedAt=new Date().toISOString();save({immediateCloud:true});closeModal()}
function deleteHabit(id){
  const arr=ensureHabits(currentHabitMonth);const i=arr.findIndex(x=>x.id===id);if(i<0)return;
  const removed=arr[i],ownerId=removed?.ownerId||accountOwnerId();
  // Chỉ thu hồi XP thực sự đến từ hệ XP nền (Kế hoạch + Thói quen + Nhiệm vụ),
  // không lấy cả XP thưởng thành tích để tránh trừ quá tay.
  const beforeBase=ownerId?Number(calculateBaseXP(ownerId)?.baseXP||0):0;
  const trashItem=moveTrash('habit',removed);
  arr.splice(i,1);
  const afterBase=ownerId?Number(calculateBaseXP(ownerId)?.baseXP||0):beforeBase;
  const reversal=Math.min(0,afterBase-beforeBase);
  if(trashItem){
    trashItem._xpReversal=reversal;
    trashItem._xpReversalDetail=reversal<0?`Trừ ${Math.abs(reversal)} XP vì đã xóa thói quen ${removed.name||'mục đã xóa'}`:'';
  }
  if(ownerId)recalculateCurrentProgress(ownerId,{persist:false});
  save();renderHabits();renderHome();renderComparison();renderTrash();
}

/* 🎨 REAL-TIME THEME — TÁCH RIÊNG HOÀN TOÀN KHỎI MỤC CẢM XÚC ĐÃ LƯU */
let activeThemeMood=null;
const realtimeThemeDefs=[
  {icon:'😊',name:'Vui',theme:'theme-vui'},
  {icon:'😌',name:'Bình yên',theme:'theme-binh-yen'},
  {icon:'😔',name:'Buồn',theme:'theme-buon'},
  {icon:'💔',name:'Đau lòng',theme:'theme-dau-long'},
  {icon:'😰',name:'Lo lắng',theme:'theme-lo-lang'},
  {icon:'😡',name:'Tức giận',theme:'theme-tuc-gian'},
  {icon:'😫',name:'Mệt mỏi',theme:'theme-met-moi'},
  {icon:'🥀',name:'Cô đơn',theme:'theme-co-don'},
  {icon:'🌤️',name:'Hy vọng',theme:'theme-hy-vong'},
  {icon:'🚀',name:'Hứng khởi',theme:'theme-hung-khoi'},
  {icon:'🎯',name:'Tập trung',theme:'theme-tap-trung'},
  {icon:'🙏',name:'Biết ơn',theme:'theme-biet-on'},
  {icon:'🥰',name:'Yêu đời',theme:'theme-yeu-doi'},
  {icon:'😭',name:'Phát khóc',theme:'theme-phat-khoc'},
  {icon:'🤩',name:'Phấn chấn',theme:'theme-phat-cuong'},
  {icon:'🧘',name:'Thư giãn',theme:'theme-thu-gian'},
  {icon:'😶‍🌫️',name:'Chán nản',theme:'theme-chan-nan'},
  {icon:'😎',name:'Tự hào',theme:'theme-tu-hao'},
  {icon:'😳',name:'Xấu hổ',theme:'theme-xau-ho'},
  {icon:'😨',name:'Bất an',theme:'theme-bat-an'},
  {icon:'😮',name:'Ngạc nhiên',theme:'theme-ngac-nhien'},
  {icon:'😤',name:'Bực bội',theme:'theme-buc-boi'},
  {icon:'🥹',name:'Chạnh lòng',theme:'theme-chanh-long'},
  {icon:'🫥',name:'Mất mát',theme:'theme-mat-mat'},
  {icon:'💪',name:'Có động lực',theme:'theme-co-dong-luc'},
  {icon:'🫶',name:'Yêu bản thân',theme:'theme-yeu-doi-ban-than'}
];
function selectThemeMood(name,className){
  const def=realtimeThemeDefs.find(m=>m.name===name);
  if(!def)return;
  activeThemeMood=name;
  activeMood=name;
  const safeClass=def.theme||className||'theme-vui';
  document.body.className=safeClass;
  document.body.dataset.role=state.sessionAuth?state.sessionAuth.role:'Guest';
  const ownerId=accountOwnerId();
  if(ownerId){ state.currentEmotion=name; persistActiveUserData(); saveStateWithoutSession(); }
  renderMoods();
  const list=getMemberComfortMessages(ownerId,name);
  const text=list[Math.floor(Math.random()*list.length)];
  ['comfort','realtimeComfortText'].forEach(id=>{const el=$(id);if(el){el.textContent=text;const box=id==='comfort'?el:el.parentElement; if(box)box.style.display='block';}});
  renderHome();
}

function bindRealtimeMoodButtons(){
  const box=$('homeRealtimeMoodButtons');
  if(!box || box.dataset.bound==='1') return;
  box.dataset.bound='1';
  box.addEventListener('click',e=>{
    const btn=e.target.closest('[data-theme-index]');
    if(!btn) return;
    const m=realtimeThemeDefs[Number(btn.dataset.themeIndex)];
    if(m) selectThemeMood(m.name,m.theme);
  });
}

/* 💗 CẢM XÚC NHẬT KÝ — TÁCH RIÊNG, KHÔNG ĐỔI TÔNG MÀU WEBSITE */
let activeMood=null;
function getMemberComfortMessages(ownerId,mood){
  // Mã 13 tạo lời nhắn dùng chung; mọi tài khoản đều nhận cùng kho lời nhắn này.
  const shared=state.customComforts?.[mood];
  if(Array.isArray(shared)&&shared.length)return shared;
  // Tương thích dữ liệu cũ: chỉ dùng lời nhắn riêng nếu không có lời nhắn chung.
  const personal=ownerId&&state.memberComforts?.[ownerId]?.[mood];
  if(Array.isArray(personal)&&personal.length)return personal;
  const fallback=defaultState.customComforts?.[mood];
  return Array.isArray(fallback)&&fallback.length?fallback:['Mình nghe bạn. Hôm nay cứ chậm lại một chút cũng được 🌷.'];
}
const savedMoodDefs=[
 ['😊','Vui'],['😌','Bình yên'],['😔','Buồn'],['💔','Đau lòng'],['😰','Lo lắng'],['😡','Tức giận'],['😫','Mệt mỏi'],['🥀','Cô đơn'],['🌤️','Hy vọng'],['🚀','Hứng khởi'],['🎯','Tập trung'],['🙏','Biết ơn'],['🥰','Yêu đời'],['😭','Phát khóc'],['🤩','Phấn chấn'],['🧘','Thư giãn'],['😶‍🌫️','Chán nản'],['😎','Tự hào'],['😳','Xấu hổ'],['😨','Bất an'],['😮','Ngạc nhiên'],['😤','Bực bội'],['🥹','Chạnh lòng'],['🫥','Mất mát'],['💪','Có động lực'],['🫶','Yêu bản thân']
];
function getAllMoods(){return savedMoodDefs;}
function selectMood(name){selectThemeMood(name,realtimeThemeDefs.find(m=>m.name===name)?.theme||'theme-vui');}
function renderMoods(){
 const c=$('moodButtons'); if(c)c.innerHTML=getAllMoods().map(m=>`<button type="button" class="mood-btn ${activeMood===m[1]?'selected':''}" onclick="selectMood('${m[1]}')"><span>${m[0]}</span> <span>${esc(m[1])}</span></button>`).join('');
 const sel=$('customComfortMood'); if(sel)sel.innerHTML=getAllMoods().map(m=>`<option value="${esc(m[1])}">${m[0]} ${esc(m[1])}</option>`).join('');
 const h=$('moodHistory'); if(h)h.innerHTML=state.moods.map(m=>`<div class="card" style="margin-bottom:10px;padding:12px"><b>${m.date}</b>: ${m.emoji} ${esc(m.name)} - <span class="muted">${esc(m.note||'Không có ghi chú')}</span></div>`).join('')||'<div class="empty">Chưa có lịch sử cảm xúc.</div>';
}
if($('saveMood'))$('saveMood').onclick=()=>{const note=$('moodNote')?.value.trim()||'';const def=getAllMoods().find(m=>m[1]===activeMood)||['😔','Buồn'];const idx=state.moods.findIndex(m=>m.date===todayISO());const entry={date:todayISO(),name:activeMood,emoji:def[0],note};if(idx>=0)state.moods[idx]=entry;else state.moods.unshift(entry);recordActivity('journal',10);save();renderMoods();alert('Đã lưu cảm xúc hôm nay! 🐝');};

/* SCHEDULE */
if($('addSchedule')){
    $('addSchedule').onclick = () => {
        const date = $('schDate').value || todayISO();
        const time = $('schTime').value;
        const title = $('schTitle').value.trim();
        const type = $('schType').value;
        if(!title) return alert('Vui lòng nhập tiêu đề lịch trình!');
        state.schedules.push({ id: uid(), date, time, title, type });
        $('schTitle').value = '';
        save();
    };
}

let scheduleSelectMode=false;
const selectedScheduleIds=new Set();
let scheduleLongPressTimer=0;
function scheduleIdFromNode(node){return String(node?.dataset?.scheduleId||'');}
function updateScheduleBulkUi(){
    const bar=$('scheduleBulkBar'),hint=$('scheduleLongPressHint'),all=$('scheduleSelectAll'),count=$('scheduleSelectedCount'),remove=$('scheduleDeleteSelected');
    if(!bar)return;
    const existing=new Set((state.schedules||[]).map(x=>String(x.id)));
    selectedScheduleIds.forEach(id=>{if(!existing.has(id))selectedScheduleIds.delete(id);});
    const selected=selectedScheduleIds.size,total=existing.size;
    bar.hidden=!scheduleSelectMode;
    if(hint)hint.hidden=scheduleSelectMode||!total;
    if(count)count.textContent=`${selected} lịch đã chọn`;
    if(remove){remove.disabled=!selected;remove.textContent=selected?`🗑️ Xóa ${selected} lịch đã chọn`:'🗑️ Xóa đã chọn';}
    if(all){all.checked=total>0&&selected===total;all.indeterminate=selected>0&&selected<total;}
}
function setScheduleSelectMode(enabled){
    scheduleSelectMode=Boolean(enabled);
    if(!scheduleSelectMode)selectedScheduleIds.clear();
    renderSchedule();
}
window.setScheduleSelectMode=setScheduleSelectMode;
function toggleScheduleSelection(id,checked){
    const key=String(id);
    if(checked)selectedScheduleIds.add(key);else selectedScheduleIds.delete(key);
    updateScheduleBulkUi();
    document.querySelectorAll('#scheduleList .schedule-item').forEach(item=>{
      const active=selectedScheduleIds.has(scheduleIdFromNode(item));
      item.classList.toggle('is-selected',active);
      const box=item.querySelector('.schedule-item-select');if(box)box.checked=active;
    });
}
function deleteSelectedSchedules(){
    const ids=new Set([...selectedScheduleIds]);
    const items=(state.schedules||[]).filter(item=>ids.has(String(item.id)));
    if(!items.length)return;
    if(!confirm(`Xóa ${items.length} lịch trình đã chọn? Các mục sẽ được chuyển vào Thùng rác.`))return;
    const owners=new Map(),trashItems=[];
    items.forEach(item=>{
      const owner=item?.ownerId||accountOwnerId()||null;
      if(owner&&!owners.has(owner))owners.set(owner,{before:Number(calculateBaseXP(owner)?.baseXP||0),items:[]});
      const trashItem=moveTrash('schedules',item);
      if(trashItem){trashItems.push({trashItem,owner});if(owner)owners.get(owner).items.push(trashItem);}
    });
    state.schedules=(state.schedules||[]).filter(item=>!ids.has(String(item.id)));
    owners.forEach((entry,owner)=>{
      const after=Number(calculateBaseXP(owner)?.baseXP||entry.before),reversal=Math.min(0,after-entry.before);
      entry.items.forEach(trashItem=>{trashItem._xpReversal=reversal;trashItem._xpReversalDetail=reversal<0?`Trừ ${Math.abs(reversal)} XP vì đã xóa schedules: ${trashItem.title||'lịch đã xóa'}`:'';});
      recalculateCurrentProgress(owner,{persist:false});
    });
    trashItems.filter(({owner})=>!owner).forEach(({trashItem})=>{trashItem._xpReversal=0;trashItem._xpReversalDetail='';});
    selectedScheduleIds.clear();
    scheduleSelectMode=false;
    save();
    renderTrash();
    renderSchedule();
}
function bindScheduleBulkControls(){
    const all=$('scheduleSelectAll'),remove=$('scheduleDeleteSelected'),exit=$('scheduleExitSelect');
    if(all)all.onchange=()=>{const checked=all.checked;(state.schedules||[]).forEach(item=>toggleScheduleSelection(item.id,checked));updateScheduleBulkUi();};
    if(remove)remove.onclick=deleteSelectedSchedules;
    if(exit)exit.onclick=()=>setScheduleSelectMode(false);
}
function renderSchedule(){
    const container = $('scheduleList');
    if(!container) return;
    const scheduleEscape=typeof window.esc==='function'?window.esc:(v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])));
    const sorted = [...(state.schedules||[])].sort((a,b) => (a.date + (a.time||'')).localeCompare(b.date + (b.time||'')));
    container.innerHTML = sorted.length ? sorted.map(s => {
        const id=String(s.id), selected=selectedScheduleIds.has(id);
        return `<div class="todo schedule-item ${selected?'is-selected':''}" data-schedule-id="${scheduleEscape(id)}" data-schedule-date="${scheduleEscape(s.date||'')}">
            <div class="schedule-item-main">
                <input class="schedule-item-select" type="checkbox" data-schedule-id="${scheduleEscape(id)}" ${selected?'checked':''} ${scheduleSelectMode?'':'hidden'} aria-label="Chọn lịch ${scheduleEscape(s.title||'')}">
                <div>
                    <b>${scheduleEscape(s.date)} ${s.time ? '• ' + scheduleEscape(s.time) : ''}</b> - <span class="tag">${scheduleEscape(s.type)}</span>
                    <div>${scheduleEscape(s.title)}</div>
                </div>
            </div>
            <div class="schedule-item-actions"><button class="btn light sm" onclick="editSchedule('${scheduleEscape(id)}')">Sửa</button><button class="btn danger sm" onclick="del('schedules', '${scheduleEscape(id)}')">Xóa</button></div>
        </div>`;
    }).join('') : '<div class="empty">Chưa có lịch trình.</div>';
    bindScheduleBulkControls();
    updateScheduleBulkUi();
    let longPressTriggered=false;
    const clearLongPress=()=>{clearTimeout(scheduleLongPressTimer);scheduleLongPressTimer=0;};
    container.onpointerdown=(event)=>{
      const item=event.target.closest('.schedule-item');
      if(!item||event.target.closest('button,input,a'))return;
      clearLongPress();
      scheduleLongPressTimer=setTimeout(()=>{
        longPressTriggered=true;setScheduleSelectMode(true);toggleScheduleSelection(scheduleIdFromNode(item),true);
        if(navigator.vibrate)navigator.vibrate(20);
      },550);
    };
    container.onpointerup=clearLongPress;container.onpointercancel=clearLongPress;container.onpointerleave=clearLongPress;
    container.onclick=(event)=>{
      const item=event.target.closest('.schedule-item');
      if(!item||event.target.closest('button,input,a'))return;
      if(longPressTriggered){longPressTriggered=false;return;}
      if(scheduleSelectMode)toggleScheduleSelection(scheduleIdFromNode(item),!selectedScheduleIds.has(scheduleIdFromNode(item)));
    };
    container.onchange=(event)=>{
      if(event.target.matches('.schedule-item-select'))toggleScheduleSelection(event.target.dataset.scheduleId,event.target.checked);
    };
}

/* MOMENTS & TIMELINE */
if($('addMoment')){
    $('addMoment').onclick = () => {
        const date = $('mDate').value || todayISO();
        const title = $('mTitle').value.trim();
        const desc = $('mDesc').value.trim();
        if(!title) return alert('Vui lòng nhập tiêu đề khoảnh khắc!');
        state.moments.unshift({ id: uid(), date, title, desc, type:'user' });
        $('mTitle').value = ''; $('mDesc').value = '';
        save();
    };
}

function parseMomentCommand(cmdStr){
    if(!cmdStr) return;
    const lines = cmdStr.split(/\r?\n/);
    lines.forEach(l => {
        const p = l.split('|').map(x => x.trim());
        if(p[0].toUpperCase() === 'MOMENT' && p[2]){
            state.moments.unshift({ id: uid(), date: p[1] || todayISO(), title: p[2], desc: p[3] || '', type:'user' });
        }
    });
    save();
}

function renderMemberTimeline(){
    const container=$('memberTimelineList');
    if(!container) return;
    const rows=Array.isArray(state.timeline)?state.timeline:[];
    container.innerHTML=rows.length ? rows.map(t=>`
        <div class="timeline-item">
            <small class="muted">🕰️ ${esc(t.time||'')}</small>
            <h4 style="margin:2px 0 4px;color:var(--red);">${esc(t.title||'Sự kiện')}</h4>
            <p style="margin:0;font-size:13px;color:var(--ink);">${esc(t.subtitle||'')}</p>
        </div>
    `).join('') : '<div class="empty">🕰️ Chưa có sự kiện trong dòng thời gian.</div>';
}

function renderMoments(){
    const container = $('momentsList');
    if(!container) return;

    // 📸 KHOẢNH KHẮC ĐÁNG NHỚ = chỉ những gì thành viên tự thêm.
    // Không lấy achievement, kết ngày hay sự kiện hệ thống.
    const memorable = (Array.isArray(state.moments)?state.moments:[])
        .filter(m => !m.type || m.type === 'user');

    container.innerHTML = memorable.length ? memorable.map(m => `
        <div class="moment-card" style="padding:15px;border:1px solid var(--line);border-radius:16px;background:var(--card);margin-bottom:12px;box-shadow:var(--shadow)">
            <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start">
                <div>
                    <small class="muted">📸 ${m.date}</small>
                    <h4 style="margin:4px 0;color:var(--red);">${esc(m.title)}</h4>
                    <p style="margin:0;font-size:13px;color:var(--ink);">${esc(m.desc||'')}</p>
                </div>
                <span class="tag">✨ Khoảnh khắc của bạn</span>
            </div>
            <button class="btn danger sm" style="margin-top:8px" onclick="del('moments','${m.id}')">Xóa</button>
        </div>
    `).join('') : '<div class="empty">📸 Chưa có khoảnh khắc đáng nhớ nào. Hãy tự lưu một khoảnh khắc thật đáng tự hào nhé! 🐝🍀</div>';
}

/* JOURNEY & PHOTO MEMORY — dùng lại state.moments, không tạo key/schema mới */
function journeyRows(){return (Array.isArray(state.moments)?state.moments:[]).filter(x=>x && x.type==='journey');}
function readJourneyImage(file){
  return new Promise((resolve,reject)=>{
    if(!file || !String(file.type||'').startsWith('image/')) return reject(new Error('Vui lòng chọn một tệp ảnh hợp lệ.'));
    if(file.size>12*1024*1024) return reject(new Error('Ảnh vượt quá 12 MB. Hãy chọn ảnh nhỏ hơn để trang không bị chậm.'));
    const reader=new FileReader();
    reader.onerror=()=>reject(new Error('Không thể đọc tệp ảnh.'));
    reader.onload=()=>{
      const img=new Image();
      img.onerror=()=>reject(new Error('Ảnh không thể được đọc trong trình duyệt.'));
      img.onload=()=>{
        const maxSide=1400,scale=Math.min(1,maxSide/Math.max(img.naturalWidth||img.width,img.naturalHeight||img.height));
        const canvas=document.createElement('canvas');
        canvas.width=Math.max(1,Math.round((img.naturalWidth||img.width)*scale));
        canvas.height=Math.max(1,Math.round((img.naturalHeight||img.height)*scale));
        const ctx=canvas.getContext('2d');
        if(!ctx)return reject(new Error('Trình duyệt không hỗ trợ xử lý ảnh.'));
        ctx.fillStyle='#ffffff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);
        canvas.toBlob(blob=>{
          if(!blob)return reject(new Error('Không thể nén ảnh.'));
          const out=new FileReader();out.onerror=()=>reject(new Error('Không thể tạo bản ảnh lưu trữ.'));out.onload=()=>resolve({data:String(out.result||''),width:canvas.width,height:canvas.height,size:blob.size,mime:'image/jpeg'});out.readAsDataURL(blob);
        },'image/jpeg',.82);
      };
      img.src=String(reader.result||'');
    };
    reader.readAsDataURL(file);
  });
}
function renderJourneyPreview(file){
  const box=$('journeyImagePreview');if(!box)return;
  if(!file){box.innerHTML='<span>🖼️ Chưa chọn ảnh</span>';return;}
  const url=URL.createObjectURL(file);box.innerHTML=`<img src="${esc(url)}" alt="Ảnh xem trước hành trình"><span>${esc(file.name)}</span>`;
}
function toggleJourneyFields(){
  const study=$('journeyType')?.value!=='daily';
  if($('journeyStudyFields'))$('journeyStudyFields').style.display=study?'grid':'none';
  if($('journeyDailyFields'))$('journeyDailyFields').style.display=study?'none':'grid';
}
function clearJourneyForm(){
  ['journeySubject','journeyTitle','journeyReason','journeyDailyTitle','journeyNote'].forEach(id=>{if($(id))$(id).value='';});
  if($('journeyDate'))$('journeyDate').value=todayISO();
  if($('journeyImage'))$('journeyImage').value='';
  renderJourneyPreview(null);toggleJourneyFields();
  if($('journeyUploadStatus'))$('journeyUploadStatus').textContent='';
}
function openJourneyDetail(id){
  const row=journeyRows().find(x=>String(x.id)===String(id));if(!row)return;
  const study=row.journeyType==='study';
  const body=`<div class="journey-modal-preview">${row.imageData?`<img src="${esc(row.imageData)}" alt="${esc(row.title||'Ảnh hành trình')}">`:''}</div><div class="history-v21-fields"><div class="history-v21-field"><div class="history-v21-label">Loại</div><div class="history-v21-value">${study?'📚 Hành trình học tập':'🌤️ Khoảnh khắc hằng ngày'}</div></div><div class="history-v21-field"><div class="history-v21-label">Ngày</div><div class="history-v21-value">${esc(row.date||'')}</div></div>${study?`<div class="history-v21-field"><div class="history-v21-label">Môn</div><div class="history-v21-value">${esc(row.subject||'Chưa ghi nhận')}</div></div><div class="history-v21-field full"><div class="history-v21-label">Tiêu đề nội dung</div><div class="history-v21-value">${esc(row.title||'')}</div></div><div class="history-v21-field full"><div class="history-v21-label">Lý do tạo ảnh</div><div class="history-v21-value">${esc(row.reason||'Chưa ghi nhận')}</div></div>`:`<div class="history-v21-field full"><div class="history-v21-label">Tiêu đề khoảnh khắc</div><div class="history-v21-value">${esc(row.title||'')}</div></div><div class="history-v21-field full"><div class="history-v21-label">Ghi chú</div><div class="history-v21-value">${esc(row.note||'Chưa ghi nhận')}</div></div>`}</div>`;
  if(typeof window.openHistoryV21Modal==='function')window.openHistoryV21Modal(`🖼️ ${study?'Hành trình học tập':'Khoảnh khắc hằng ngày'}`,body,'moments',row.id);else showModal('🖼️ Chi tiết hành trình',body);
}
function renderJourney(){
  const box=$('journeyList');if(!box)return;
  const rows=journeyRows();
  const count=$('journeyCount');if(count)count.textContent=`${rows.length} ảnh`;
  box.innerHTML=rows.length?rows.map(row=>{
    const study=row.journeyType==='study',title=row.title||'Chưa có tiêu đề',subtitle=study?`${row.subject||'Chưa ghi môn'} · ${row.reason||'Chưa ghi lý do'}`:(row.note||'Chưa có ghi chú');
    return `<article class="journey-entry" data-journey-id="${esc(row.id)}"><div class="journey-entry-image">${row.imageData?`<img loading="lazy" src="${esc(row.imageData)}" alt="${esc(title)}">`:'<span>🖼️</span>'}</div><div class="journey-entry-content"><div class="journey-entry-top"><span class="tag">${study?'📚 Hành trình học tập':'🌤️ Khoảnh khắc hằng ngày'}</span><small class="muted">${esc(row.date||'')}</small></div><h3>${esc(title)}</h3>${study?`<p class="journey-subject"><b>Môn:</b> ${esc(row.subject||'Chưa ghi nhận')}</p>`:''}<p class="journey-entry-note">${esc(subtitle)}</p><div class="actions"><button type="button" class="btn light sm" onclick="openJourneyDetail('${esc(row.id)}')">Mở chi tiết</button><button type="button" class="btn danger sm" onclick="del('moments','${esc(row.id)}')">Xóa</button></div></div></article>`;
  }).join(''):'<div class="history-v21-empty">🖼️ Chưa có ảnh hành trình. Hãy lưu một dấu mốc đầu tiên của bạn nhé.</div>';
}
function setupJourneyForm(){
  const type=$('journeyType'),file=$('journeyImage'),saveBtn=$('saveJourneyEntry');
  if(!type||!file||!saveBtn||saveBtn.dataset.bound==='1')return;
  saveBtn.dataset.bound='1';type.addEventListener('change',toggleJourneyFields);file.addEventListener('change',()=>{renderJourneyPreview(file.files?.[0]||null);if($('journeyUploadStatus'))$('journeyUploadStatus').textContent='';});
  $('clearJourneyForm')?.addEventListener('click',clearJourneyForm);
  saveBtn.addEventListener('click',async()=>{
    if(!state.sessionAuth||state.sessionAuth.role==='Guest'||!accountOwnerId())return alert('🔒 Hãy đăng nhập tài khoản để lưu ảnh hành trình.');
    const selected=file.files?.[0];if(!selected)return alert('🖼️ Hãy chọn một ảnh trước khi lưu.');
    const study=type.value!=='daily',date=$('journeyDate')?.value||todayISO(),subject=$('journeySubject')?.value.trim()||'',title=study?($('journeyTitle')?.value.trim()||''):($('journeyDailyTitle')?.value.trim()||''),reason=$('journeyReason')?.value.trim()||'',note=$('journeyNote')?.value.trim()||'';
    if(study&&!subject)return alert('📚 Hãy ghi tên môn cho ảnh học tập.');
    if(!title)return alert(study?'📝 Hãy ghi tiêu đề nội dung trong ảnh.':'📝 Hãy ghi tiêu đề khoảnh khắc hằng ngày.');
    if(!note&&!reason)return alert(study?'💬 Hãy ghi lý do tạo ảnh.':'💬 Hãy ghi chú cho khoảnh khắc hằng ngày.');
    saveBtn.disabled=true;if($('journeyUploadStatus'))$('journeyUploadStatus').textContent='Đang nén và lưu ảnh…';
    try{
      const image=await readJourneyImage(selected);
      state.moments=Array.isArray(state.moments)?state.moments:[];
      state.moments.unshift({id:uid(),type:'journey',journeyType:study?'study':'daily',date,title,subject,reason,note,desc:study?reason:note,imageData:image.data,imageMime:image.mime,imageWidth:image.width,imageHeight:image.height,imageSize:image.size,imageName:selected.name,createdAt:new Date().toISOString()});
      save();clearJourneyForm();renderJourney();if($('journeyUploadStatus'))$('journeyUploadStatus').textContent='✅ Đã lưu ảnh vào hành trình của bạn.';
    }catch(error){alert(`⚠️ ${error.message||'Không thể lưu ảnh.'}`);if($('journeyUploadStatus'))$('journeyUploadStatus').textContent='';}
    finally{saveBtn.disabled=false;}
  });
  toggleJourneyFields();
}
setupJourneyForm();

/* JOURNAL */
if($('addJournal')){
    $('addJournal').onclick = () => {
        const date = $('jDate').value || todayISO();
        const subject = $('jSubject').value.trim() || 'Chưa phân loại';
        const minutes = parseInt($('jMinutes').value) || 0;
        const score = parseFloat($('jScore').value) || 10;
        const content = $('jContent').value.trim();
        const newKnowledge = $('jNew').value.trim();
        if(!content) return alert('Vui lòng nhập nội dung nhật ký!');
        state.journals.unshift({ id: uid(), date, subject, minutes, score, content, newKnowledge });
        $('jContent').value = ''; $('jNew').value = '';
        recordActivity("journal", 10);
        save();
    };
}

function parseJournalCommand(cmdStr){
    if(!cmdStr) return;
    const lines = cmdStr.split(/\r?\n/);
    lines.forEach(l => {
        const p = l.split('|').map(x => x.trim());
        if(p[0].toUpperCase() === 'JOURNAL' && p[5]){
            state.journals.unshift({
                id: uid(),
                date: p[1] || todayISO(),
                subject: p[2] || 'Khác',
                minutes: parseInt(p[3]) || 0,
                score: parseFloat(p[4]) || 10,
                content: p[5],
                newKnowledge: p[6] || ''
            });
        }
    });
    save();
}

function renderJournals(){
    const container = $('journalList');
    if(!container) return;
    container.innerHTML = state.journals.length ? state.journals.map(j => `
        <div class="card" style="margin-bottom:12px;padding:14px">
            <div style="display:flex;justify-content:space-between">
                <b>${j.date} • ${esc(j.subject)}</b>
                <span class="tag red">Điểm: ${j.score}/10</span>
            </div>
            <p style="margin:8px 0;font-size:13px">${esc(j.content)}</p>
            ${j.newKnowledge ? `<div class="quote" style="padding:8px;font-size:12px">💡 Kiến thức mới: ${esc(j.newKnowledge)}</div>` : ''}
            <button class="btn danger sm" style="margin-top:8px" onclick="del('journals', '${j.id}')">Xóa</button>
        </div>
    `).join('') : '<div class="empty">Chưa có nhật ký học tập.</div>';
}

/* SUMMARY */
function renderSummary(){
    const ownerId=accountOwnerId();
    const officialRows=ownerId?getStudyLogRows(ownerId):[];
    const totalMins = officialRows.reduce((s,x)=>s+Math.max(0,Number(x.minutes)||0),0);
    const totalTodosDone = state.todos.filter(t => t.done).length;
    
    if($('summaryStats')){
        $('summaryStats').innerHTML = `
            <div class="stat"><b>${fmtMin(totalMins)}</b><span>Tổng thời gian học</span></div>
            <div class="stat"><b>${totalTodosDone}</b><span>Công việc đã hoàn thành</span></div>
            <div class="stat"><b>${state.streak}</b><span>Chuỗi ngày liên tiếp</span></div>
            <div class="stat"><b>${state.xp} XP</b><span>Tổng điểm tích lũy</span></div>
        `;
    }

    if($('weekChart')){
        const days7 = Array.from({length:7}, (_, i) => {
            const d = new Date(); d.setDate(d.getDate() - (6 - i));
            return toISODate(d);
        });
        const maxMin = Math.max(...days7.map(d => getOfficialStudyMinutesForDate(ownerId,d)), 60);
        
        $('weekChart').innerHTML = days7.map(d => {
            const mins = getOfficialStudyMinutesForDate(ownerId,d);
            const heightPct = Math.min(100, Math.round((mins / maxMin) * 100));
            const dayLabel = d.slice(5);
            return `
                <div class="barcol">
                    <span style="font-size:10px;color:var(--muted)">${mins > 0 ? mins + 'm' : ''}</span>
                    <div class="barfill" style="height:${Math.max(4, heightPct)}%"></div>
                    <span class="barlabel">${dayLabel}</span>
                </div>
            `;
        }).join('');
    }

    if($('subjectChart')){
        const subjects = {};
        officialRows.forEach(s => {
            const subject=String(s.subject||'Chưa phân loại').trim()||'Chưa phân loại';
            subjects[subject] = (subjects[subject] || 0) + Math.max(0,Number(s.minutes)||0);
        });
        const total = Object.values(subjects).reduce((a,b)=>a+b, 0) || 1;
        $('subjectChart').innerHTML = Object.keys(subjects).length ? Object.entries(subjects).map(([sub, m]) => `
            <div style="margin-bottom:8px">
                <div style="display:flex;justify-content:space-between;font-size:13px">
                    <b>${esc(sub)}</b> <span>${fmtMin(m)} (${Math.round(m/total*100)}%)</span>
                </div>
                <div class="progress"><i style="width:${Math.round(m/total*100)}%"></i></div>
            </div>
        `).join('') : '<div class="empty">Chưa có dữ liệu môn học.</div>';
    }

    if($('summaryAchievementList')){
        let allItems = [];
        defaultAchievementGroups.forEach(g => allItems.push(...g.items));
        if(state.customAchievements){
            state.customAchievements.forEach(ca => {
                allItems.push({ id: ca.id, name: ca.name, tier: ca.tier || '🟢 DỄ', desc: ca.desc || '', icon: ca.icon || '🎯', xp: ca.xp || 0 });
            });
        }
        $('summaryAchievementList').innerHTML = allItems.map(ach => {
            const unlocked = state.unlockedAchievements.includes(ach.id);
            return `
                <div class="achievement ${unlocked ? '' : 'locked'}">
                    <div class="achievement-icon">${ach.icon}</div>
                    <div>
                        <b>${esc(ach.name)}</b> <span class="tag sm">${ach.tier}</span>
                        <div class="kpi">${esc(ach.desc)}</div><div class="kpi" style="margin-top:4px;color:var(--red);font-weight:700">⚡ Thưởng: +${Number(ach.xp)||0} XP</div>
                    </div>
                </div>
            `;
        }).join('');
    }
}

/* TRASH */
function normalizeTrash(){ state.trash=state.trash&&typeof state.trash==='object'?state.trash:{}; if(Array.isArray(state.trash.todo)&&!Array.isArray(state.trash.todos)) state.trash.todos=state.trash.todo; if(Array.isArray(state.trash.todos)&&!state.trash.todo) state.trash.todo=state.trash.todos; const keys=['home','endday','todo','todos','study','achievements','achievement','quest','habit','mood','schedule','moments','journal','summary','data']; keys.forEach(k=>{if(!Array.isArray(state.trash[k]))state.trash[k]=[]}); return state.trash; }
function renderTrash(){
    normalizeTrash();
    const container = $('trashList');
    if(!container) return;
    let html = '';
    Object.keys(state.trash || {}).forEach(type => {
        const items = state.trash[type] || [];
        if(items.length){
            html += `<div class="trashgroup"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
                <h4 style="color:var(--red);margin-top:14px;text-transform:uppercase">${esc(type)} (${items.length})</h4>
                <button class="btn sm light" onclick="selectTrashType('${esc(type)}', true)">☑️ Chọn nhóm này</button>
            </div>`;
            items.forEach((item, idx) => {
                const key = `${type}::${idx}`;
                html += `
                    <div class="trashitem">
                        <label style="display:flex;align-items:center;gap:10px;flex:1;cursor:pointer">
                            <input type="checkbox" class="trash-check" data-trash-type="${esc(type)}" data-trash-index="${idx}" aria-label="Chọn mục">
                            <div>
                                <b>${esc(item.title || item.name || item.text || 'Mục đã xóa')}</b>
                                <div class="kpi">Xóa lúc: ${item._deletedAt ? new Date(item._deletedAt).toLocaleString('vi-VN') : '—'}</div>${Number(item._xpReversal||0)<0?`<div class="kpi" style="color:var(--red);font-weight:800">🗑️ Thu hồi ${Math.abs(Number(item._xpReversal))} XP</div>`:''}
                            </div>
                        </label>
                        <div class="actions">
                            <button class="btn sm" onclick="restoreTrash('${esc(type)}', ${idx})">↩️ Khôi phục</button>
                            <button class="btn danger sm" onclick="permanentDeleteTrash('${esc(type)}', ${idx})">💀 Xóa vĩnh viễn</button>
                        </div>
                    </div>
                `;
            });
            html += '</div>';
        }
    });
    container.innerHTML = html || '<div class="empty">🗑️ Thùng rác rỗng.</div>';
}

function getSelectedTrash(){
    return [...document.querySelectorAll('.trash-check:checked')].map(el => ({
        type: el.dataset.trashType,
        index: Number(el.dataset.trashIndex)
    }));
}

function selectAllTrash(checked=true){
    document.querySelectorAll('.trash-check').forEach(el => el.checked = checked);
}

function selectTrashType(type, checked=true){
    document.querySelectorAll('.trash-check').forEach(el => {
        if(el.dataset.trashType === type) el.checked = checked;
    });
}

function restoreTrashItem(type,item){
  if(!item)return;
  if(type.startsWith('habits_')){ const ym=type.replace('habits_',''); item.month=ym; ensureHabits(ym).push(item); return; }
  if(type==='habit'){ const ym=item.month||String(item.createdAt||'').slice(0,7)||currentHabitMonth; item.month=ym; ensureHabits(ym).push(item); return; }
  if(type==='quest'){ state.customQuests=state.customQuests||[]; if(!state.customQuests.some(x=>x.id===item.id))state.customQuests.push(item); return; }
  if(type==='achievement'){ state.customAchievements=state.customAchievements||[]; if(!state.customAchievements.some(x=>x.id===item.id))state.customAchievements.push(item); return; }
  const key=type==='todo'?'todos':type;
  if(Array.isArray(state[key])){ if(!state[key].some(x=>x.id===item.id))state[key].push(item); return; }
  if(key==='study'){
    state.adminStudyTimes=state.adminStudyTimes||{};
    const owner=String(item.ownerId||''); state.adminStudyTimes[owner]=Array.isArray(state.adminStudyTimes[owner])?state.adminStudyTimes[owner]:[];
    if(!state.adminStudyTimes[owner].some(x=>x.id===item.id))state.adminStudyTimes[owner].push(item);
  }
}
function restoreTrash(type,index){
  normalizeTrash(); if(!state.trash[type]||!state.trash[type][index])return;
  const item=state.trash[type][index],ownerId=item?.ownerId||accountOwnerId();
  state.trash[type].splice(index,1); delete item._deletedAt; delete item._xpReversal; delete item._xpReversalDetail;
  restoreTrashItem(type,item);
  if(ownerId)recalculateCurrentProgress(ownerId,{persist:false});
  save(); renderTrash(); renderAchievementsView(); renderQuestBoard(); renderProfileView(); renderComparison();
}
function restoreSelectedTrash(){
  normalizeTrash();
  const selected=getSelectedTrash();
  if(!selected.length){alert('Hãy chọn ít nhất một mục để khôi phục.');return;}
  const owners=new Set(),grouped={};
  selected.forEach(x=>(grouped[x.type]||=[]).push(x.index));
  Object.keys(grouped).forEach(type=>grouped[type].sort((a,b)=>b-a).forEach(index=>{
    const item=state.trash[type]?.[index]; if(!item)return;
    if(item.ownerId)owners.add(String(item.ownerId));
    state.trash[type].splice(index,1); delete item._deletedAt; delete item._xpReversal; delete item._xpReversalDetail;
    restoreTrashItem(type,item);
  }));
  owners.forEach(id=>recalculateCurrentProgress(id,{persist:false}));
  if(!owners.size&&accountOwnerId())recalculateCurrentProgress(accountOwnerId(),{persist:false});
  save(); renderTrash(); renderAchievementsView(); renderQuestBoard(); renderProfileView(); renderComparison();
  alert(`↩️ Đã khôi phục ${selected.length} mục và tính lại XP/thành tích.`);
}

function permanentDeleteTrash(type, index){
  if(!state.trash[type]||!state.trash[type][index])return;const item=state.trash[type][index],ownerId=item?.ownerId||accountOwnerId();const label=item.title||item.name||item.text||'mục này';
  if(confirm(`⚠️ XÓA VĨNH VIỄN\n\n“${String(label).replace(/[`]/g,'')}” sẽ bị xóa khỏi Thùng rác và không thể khôi phục.\n\nXP, cấp độ và thành tích sẽ được tính lại theo dữ liệu còn lại.`)){state.trash[type].splice(index,1);if(ownerId)recalculateCurrentProgress(ownerId,{persist:false});save();renderTrash();}
}
function permanentDeleteSelectedTrash(){
  const selected=getSelectedTrash();if(!selected.length){alert('Hãy chọn ít nhất một mục để xóa vĩnh viễn.');return;}if(!confirm(`⚠️ XÓA VĨNH VIỄN ${selected.length} MỤC?\n\nCác mục đã chọn sẽ bị xóa hoàn toàn và KHÔNG thể khôi phục.\n\nXP, cấp độ và thành tích sẽ được tính lại theo dữ liệu còn lại.`))return;
  const owners=new Set(),grouped={};selected.forEach(x=>(grouped[x.type]||=[]).push(x.index));Object.keys(grouped).forEach(type=>grouped[type].sort((a,b)=>b-a).forEach(index=>{const item=state.trash[type]?.[index];if(item?.ownerId)owners.add(String(item.ownerId));if(state.trash[type])state.trash[type].splice(index,1)}));owners.forEach(id=>recalculateCurrentProgress(id,{persist:false}));if(!owners.size&&accountOwnerId())recalculateCurrentProgress(accountOwnerId(),{persist:false});save();renderTrash();alert(`💀 Đã xóa vĩnh viễn ${selected.length} mục và cập nhật lại XP/thành tích.`);
}
function emptyTrashPermanently(){
  const total=Object.values(state.trash||{}).reduce((n,arr)=>n+(Array.isArray(arr)?arr.length:0),0);if(!total){alert('🗑️ Thùng rác đang trống.');return;}
  if(confirm(`⚠️ XÓA VĨNH VIỄN TOÀN BỘ\n\nCó ${total} mục trong Thùng rác.\nTất cả sẽ bị xóa vĩnh viễn và KHÔNG thể khôi phục.\n\nXP, cấp độ và thành tích sẽ được tính lại theo dữ liệu còn lại.\n\nBạn có chắc chắn không?`)){const owners=new Set();Object.values(state.trash||{}).forEach(arr=>(arr||[]).forEach(item=>{if(item?.ownerId)owners.add(String(item.ownerId))}));Object.keys(state.trash).forEach(k=>state.trash[k]=[]);owners.forEach(id=>recalculateCurrentProgress(id,{persist:false}));if(!owners.size&&accountOwnerId())recalculateCurrentProgress(accountOwnerId(),{persist:false});save();renderTrash();alert('🗑️ Đã xóa vĩnh viễn toàn bộ Thùng rác và tính lại XP/thành tích.');}
}

/* SHEETS & DATA COMMANDS */
function renderSheetLinks(){
    const container = $('sheetLinksContainer');
    if(!container) return;
    container.innerHTML = (state.sheetLinks || []).map((link, idx) => `
        <div style="display:flex;gap:8px;margin-bottom:8px;align-items:center">
            <input value="${esc(link.title)}" onchange="state.sheetLinks[${idx}].title=this.value" placeholder="Tiêu đề link">
            <input value="${esc(link.url)}" onchange="state.sheetLinks[${idx}].url=this.value" placeholder="https://docs.google.com/spreadsheets/...">
            ${link.url ? `<a href="${esc(link.url)}" target="_blank" class="btn sm light">Mở</a>` : ''}
            <button class="btn danger sm" onclick="removeSheetLinkRow(${idx})">Xóa</button>
        </div>
    `).join('') || '<div class="empty">Chưa có liên kết nào.</div>';
}

function addSheetLinkRow(){
    if(!state.sheetLinks) state.sheetLinks = [];
    state.sheetLinks.push({ id: uid(), title: 'Bảng tính mới', url: '' });
    renderSheetLinks();
}

function removeSheetLinkRow(idx){
    state.sheetLinks.splice(idx, 1);
    save();
    renderSheetLinks();
}

function saveSheetLinks(){
    save();
    alert('Đã lưu danh sách liên kết Google Sheets! 🐝🍀');
}

function executeAutomationCommands(cmdText){
  const stateBefore=cloneValue(state);
  const role = state.sessionAuth ? state.sessionAuth.role : 'Guest';
  if(!cmdText.trim()) throw new Error('Vui lòng nhập lệnh!');
  const lines=cmdText.split(/\r?\n/);
  let count=0, errors=[];
  lines.forEach((l,lineNo)=>{
    const raw=l.trim(); if(!raw || raw.startsWith('#')) return;
    const p=raw.split('|').map(x=>x.trim());
    let type=(p[0]||'').trim().toUpperCase().replace(/\s+/g,'_');
      const aliases={ADD_HABIT:'HABIT',CREATE_HABIT:'HABIT',ADD_COMFORT:'COMFORT',ADD_MEMBER_COMFORT:'COMFORT',MEMBER_COMFORT:'COMFORT',COMFORT_ALL:'COMFORT',COMFORT_GLOBAL:'COMFORT',ADD_MOOD:'MOOD_DEF',ADD_MOOD_DEF:'MOOD_DEF',ADD_MOTIVATION:'MOTIVATION',TASK:'TODO',PLAN:'TODO',STUDY:'STUDY_TIME'};
      type=aliases[type]||type;
    try{
      const adminCommands=['MOOD_DEF','COMFORT','COMFORT_MEMBER','MOTIVATION','SUPER_MIND','SUPER_ME','HOME_MOTIVATION','COMPLETION_MOTIVATION','STUDY_TIME'];
      if(adminCommands.includes(type) && !['Admin','Founder'].includes(role)){
        throw new Error('Lệnh này chỉ dành cho Quản trị viên.');
      }
      if(type==='ROLE' && role!=='Founder'){
        throw new Error('Lệnh ROLE chỉ dành cho Người sáng lập web.');
      }
      if(type==='MOMENT' && p[2]){
        state.moments.unshift({id:uid(),date:p[1]||todayISO(),title:p[2],desc:p[3]||''}); count++; checkAchievements();
      }else if(type==='TODO'){
        const todoDate=(p[1]||todayISO()).trim();
        const todoTitle=(p[2]||'').trim();
        if(!todoTitle) throw new Error('TODO cần có tên công việc. Cú pháp: TODO|YYYY-MM-DD|Tên công việc|cao/trung/thap|HH:MM|Ghi chú');
        const todoPriority=['cao','trung','thap','thấp'].includes((p[3]||'trung').toLowerCase()) ? ((p[3]||'trung').toLowerCase()==='thấp'?'thap':(p[3]||'trung').toLowerCase()) : 'trung';
        state.todos=Array.isArray(state.todos)?state.todos:[];
        const ownerId=accountOwnerId();
        state.todos.push({id:uid(),ownerId,date:todoDate,title:todoTitle,priority:todoPriority,time:(p[4]||'').trim(),note:(p[5]||'').trim(),done:false}); count++;
        window.__lastCommandTodoDate=todoDate;
      }else if(type==='SCHEDULE' && p[3]){
        state.schedules.push({id:uid(),date:p[1]||todayISO(),time:p[2]||'',title:p[3],type:p[4]||'Học tập'}); count++;
      }else if(type==='HABIT'){
        const ym=(p[1]||ymISO()).trim(); const name=(p[2]||'').trim(); const target=Number(p[3]||20);
        if(!/^\d{4}-\d{2}$/.test(ym)) throw new Error('HABIT cần tháng dạng YYYY-MM. Ví dụ: HABIT|2026-08|Đọc sách|20');
        if(!name) throw new Error('HABIT cần tên thói quen. Ví dụ: HABIT|2026-08|Đọc sách|20');
        if(!Number.isFinite(target)||target<=0) throw new Error('Mục tiêu thói quen phải là số ngày lớn hơn 0.');
        const ownerId=accountOwnerId();
        ensureHabits(ym).push({id:uid(),ownerId,name,target:Math.floor(target),days:{},createdAt:new Date().toISOString()});
        if(ownerId) recalculateCurrentProgress(ownerId,{persist:false});
        count++;
      }else if(type==='MOOD_DEF' && p[1] && p[2]){
        state.customMoods=state.customMoods||[]; state.customMoods.push([p[1],p[2],'mood-sad']); count++;
      }else if(type==='COMFORT'){
        const mood=(p[1]||'').trim(), text=p.slice(2).join('|').trim();
        if(!mood||!text) throw new Error('COMFORT|Tên cảm xúc|Lời an ủi');
        state.customComforts=state.customComforts||{}; state.customComforts[mood]=state.customComforts[mood]||[]; state.customComforts[mood].push(text); count++;
      }else if(type==='COMFORT_MEMBER'){
        // Tương thích lệnh cũ: chuyển nội dung sang kho chung để toàn bộ thành viên đều thấy.
        const targetKey=(p[1]||'').trim(), mood=(p[2]||'').trim(), text=p.slice(3).join('|').trim();
        if(!targetKey||!mood||!text) throw new Error('Mã 13: COMFORT|Cảm xúc|Lời nhắn');
        state.customComforts=state.customComforts||{};
        state.customComforts[mood]=state.customComforts[mood]||[];
        state.customComforts[mood].push(text);
        count++;
      }else if(type==='MOTIVATION' && p.slice(1).join('|').trim()){
        const text=p.slice(1).join('|').trim();
        const rankMap={'Hạng 1':'🥇 Hạng 1','🥇 Hạng 1':'🥇 Hạng 1','Hạng 2':'🥈 Hạng 2','🥈 Hạng 2':'🥈 Hạng 2','Hạng 3':'🥉 Hạng 3','🥉 Hạng 3':'🥉 Hạng 3','Đang tiến bộ':'🌱 Đang tiến bộ','🌱 Đang tiến bộ':'🌱 Đang tiến bộ'};
        const legacyRank=rankMap[p[1]];
        if(legacyRank && p.length>2){
          state.rankMotivations=state.rankMotivations||{}; state.rankMotivations[legacyRank]=state.rankMotivations[legacyRank]||[]; state.rankMotivations[legacyRank].push(p.slice(2).join('|').trim());
        }else{
          state.superMinds=state.superMinds||[]; state.superMes=state.superMes||[]; state.superMinds.push(text);
        }
        count++;
      }else if(type==='SUPER_MIND' && p.slice(1).join('|').trim()){
        state.superMinds=state.superMinds||[]; state.superMinds.push(p.slice(1).join('|').trim()); count++;
      }else if(type==='SUPER_ME' && p.slice(1).join('|').trim()){
        state.superMes=state.superMes||[]; state.superMes.push(p.slice(1).join('|').trim()); count++;
      }else if(type==='HOME_MOTIVATION' && p.slice(1).join('|').trim()){
        state.customMotivations=state.customMotivations||[]; state.customMotivations.push(p.slice(1).join('|').trim()); count++;
      }else if(type==='COMPLETION_MOTIVATION' && p.slice(1).join('|').trim()){
        state.completionMotivations=state.completionMotivations||[]; state.completionMotivations.push(p.slice(1).join('|').trim()); count++;
      }else if(type==='ROLE'){
        if(role!=='Founder') throw new Error('Lệnh ROLE chỉ dành cho Người sáng lập web.');
        const targetName=(p[1]||'').trim(); const targetCode=(p[2]||'').trim();
        if(!targetName || !['111','999'].includes(targetCode)) throw new Error('ROLE|Tên tài khoản|111 hoặc 999');
        const target=state.membersList.find(m=>String(m.name||'').trim().toLocaleLowerCase('vi-VN')===targetName.toLocaleLowerCase('vi-VN'));
        if(!target) throw new Error('Không tìm thấy tài khoản: '+targetName);
        if(target.role==='Founder' && role!=='Founder') throw new Error('Chỉ Người sáng lập mới có thể thay đổi tài khoản Người sáng lập.');
        if(targetCode==='111'){
          if(role!=='Founder') throw new Error('Chỉ Người sáng lập mới được cấp mã 111.');
          if(state.membersList.some(m=>m.role==='Founder' && m.id!==target.id)) throw new Error('Chỉ có một Người sáng lập web.');
          target.role='Founder'; target.code='111'; target.locked=false;
          const acc=state.memberAccounts.find(a=>a.memberId===target.id); if(acc){ target.password=acc.password; acc.role='Founder'; acc.code='111'; state.founderPassword=acc.password; }
        }else{
          if(target.role==='Founder') throw new Error('Không thể hạ cấp Người sáng lập bằng mã 999.');
          if(target.role==='Admin' && role==='Admin') throw new Error('Quản trị viên không thể thay đổi cấp của Quản trị viên khác.');
          target.role='Admin'; target.code='999'; target.locked=false;
          const acc=state.memberAccounts.find(a=>a.memberId===target.id); if(acc){ target.password=acc.password; acc.role='Admin'; acc.code='999'; }
        }
        count++;
      }else if(type==='STUDY_TIME'){
        if(!['Admin','Founder'].includes(role)) throw new Error('Lệnh này chỉ dành cho Quản trị viên hoặc Người sáng lập.');
        const targetName=(p[1]||'').trim();
        const delta=Number(p[2]);
        if(!targetName || !Number.isFinite(delta) || delta===0) throw new Error('STUDY_TIME|Tên tài khoản|Số phút (+/-)|Ngày (tùy chọn). Ví dụ: STUDY_TIME|Nguyễn A|90|2026-08-10 hoặc STUDY_TIME|Nguyễn A|-30|2026-08-10');
        if(p[3] && !/^\d{4}-\d{2}-\d{2}$/.test(p[3])) throw new Error('Ngày phải có dạng YYYY-MM-DD.');
        const target=state.membersList.find(m=>String(m.name||'').trim().toLocaleLowerCase('vi-VN')===targetName.toLocaleLowerCase('vi-VN')) || (state.memberAccounts||[]).map(a=>state.membersList.find(m=>m.id===a.memberId)).find(m=>m && String(m.name||'').trim().toLocaleLowerCase('vi-VN')===targetName.toLocaleLowerCase('vi-VN'));
        if(!target) throw new Error('Không tìm thấy tài khoản có tên: '+targetName);
        const progress=getProgressRecord(target.id); if(!progress) throw new Error('Không tìm thấy dữ liệu tiến độ của tài khoản này.');
        const updatedAt=new Date().toISOString();
        // Ngày mặc định luôn là NGÀY ĐÃ HOÀN THÀNH gần nhất (hôm qua),
        // không tự ghi dữ liệu vào ngày hiện tại khi ngày học chưa kết thúc.
        const updatedDate=p[3]||yesterdayKey();
        if(updatedDate>todayISO()) throw new Error(`STUDY_TIME không được ghi vào ngày tương lai (${todayISO()}).`);

        // STUDY_TIME là điều chỉnh cộng/trừ thời gian học chính thức.
        // +90 = cộng 90 phút; -30 = trừ 30 phút. Tổng không bao giờ xuống dưới 0.
        const beforeMinutes=Math.max(0, getOfficialStudyMinutesForOwner(target.id));
        const dayBeforeMinutes=Math.max(0, getOfficialStudyMinutesForDate(target.id, updatedDate));
        // Nhật ký gốc vẫn giữ nguyên; một ngày mới không được vượt quá 24 giờ.
        const appliedDelta=delta>0
          ? Math.min(delta, Math.max(0, 1440-dayBeforeMinutes))
          : Math.max(delta, -dayBeforeMinutes);
        if(delta>0 && appliedDelta<=0) throw new Error(`Ngày ${updatedDate} đã đạt giới hạn 24 giờ học.`);
        if(delta<0 && appliedDelta===0) throw new Error(`Ngày ${updatedDate} không còn thời gian học để trừ.`);
        const afterMinutes=Math.max(0, beforeMinutes + appliedDelta);

        progress.studyMinutes=afterMinutes;
        progress.studyUpdatedAt=updatedAt;
        progress.studyUpdatedDate=updatedDate;

        // 🔗 GHI NHẬN CHÍNH THỨC VÀO KHO DỮ LIỆU XẾP HẠNG.
        // Mỗi lệnh tạo một bản ghi có ngày, người học, delta và thời điểm cập nhật.
        // Bảng "⏱️ Thời gian học" đọc trực tiếp kho này.
        ensureUserStore();
        const targetBucket=state.userData.accounts[target.id]||blankUserData();
        targetBucket.adminStudyTimes=Array.isArray(targetBucket.adminStudyTimes)?targetBucket.adminStudyTimes:[];
        if(appliedDelta!==0){
          targetBucket.adminStudyTimes.push({
            id:uid(),
            memberId:target.id,
            memberName:target.name,
            deltaMinutes:appliedDelta,
            minutes:appliedDelta,
            date:updatedDate,
            updatedAt,
            createdAt:updatedAt
          });
        }
        state.userData.accounts[target.id]=targetBucket;
        if(String(accountOwnerId())===String(target.id)) state.adminStudyTimes=cloneValue(targetBucket.adminStudyTimes);

        // 🔗 Sau khi ghi thời gian, tính lại tiến độ + thành tích của chính tài khoản đó.
        // Không cộng XP trực tiếp: XP chỉ tăng nếu thời gian học làm mở khóa một thành tích.
        recalculateCurrentProgress(target.id);
        if(accountOwnerId()===target.id) checkAchievements();
        try{renderHome();renderStudySessions();renderFounderSubjectStats();renderAchievementsView();renderQuestBoard();renderComparison();renderPrivateXPHistoryAdmin();renderSummary();}catch(e){}
        count++;
      }else if(type==='ENDDAY' && p[1]){

        const endDate=p[1]||todayISO(),gratitude=p[2]||'',lesson=p[3]||'',tomorrow=p[4]||''; state.moments.unshift({id:uid(),date:endDate,title:`Kết ngày ${endDate} 🐝🍀`,desc:`Biết ơn: ${gratitude} | Bài học: ${lesson} | Ngày mai: ${tomorrow}`,endDay:{mood:'',gratitude,lesson,tomorrow},type:'endday'}); count++; checkAchievements();
      }else if(type==='JOURNAL' && p[5]){
        state.journals.unshift({id:uid(),date:p[1]||todayISO(),subject:p[2]||'Khác',minutes:parseInt(p[3])||0,score:parseFloat(p[4])||10,content:p[5],newKnowledge:p[6]||''}); count++;
      }else{
        errors.push(`Dòng ${lineNo+1}: không nhận diện được lệnh “${type||'(trống)'}”. Hãy mở ❔ Thêm cú pháp để xem định dạng hợp lệ.`);
      }
    }catch(err){errors.push(`Dòng ${lineNo+1}: ${err.message}`)}
  });
  if(errors.length){
    Object.keys(state).forEach(k=>delete state[k]);
    Object.assign(state,stateBefore);
    ensureUserStore();
    try{renderAll();}catch(e){}
  }else save();
  return {count:errors.length?0:count,errors};
}

function runSharedCommandFromBox(id){
  const box=$(id); if(!box) return alert('⚠️ Không tìm thấy ô nhập lệnh.');
  const text=box.value.trim();
  if(!text) return alert('⚠️ Vui lòng dán ít nhất một câu lệnh AI vào ô này.');
  try{
    const result=executeAutomationCommands(text);
    const todoDate=window.__lastCommandTodoDate||'';
    window.__lastCommandTodoDate='';
    if(todoDate && id==='todoCommandBox' && $('todoDate')) $('todoDate').value=todoDate;
    // Re-render the Todo view after a successful TODO command and keep the command date visible.
    renderAll();
    if(todoDate && id==='todoCommandBox' && typeof renderTodos==='function') renderTodos();
    if(result.count>0 && result.errors.length===0) box.value='';
    const detail=result.errors.length?'\n\nChi tiết:\n'+result.errors.join('\n'):'';
    alert(`Đã thực thi thành công ${result.count} câu lệnh! 🐝🍀${detail}`);
  }catch(e){ alert('⚠️ '+e.message); }
}


// Toggle riêng cho các khu vực thu gọn, không phải ô nhập lệnh.
document.addEventListener('click', e=>{
  const toggle=e.target.closest('.summary-achievements-toggle');
  if(!toggle) return;
  e.preventDefault(); e.stopPropagation();
  const panel=$(toggle.dataset.summaryPanel);
  if(!panel) return;
  const open=getComputedStyle(panel).display!=='none';
  panel.style.display=open?'none':'block';
  toggle.textContent=open?'🏆 Tất cả thành tích ▾':'🏆 Tất cả thành tích ▴';
});

// Toggle all command panels from their matching "🤖 Nhập lệnh tự động" buttons.
document.addEventListener('click', e=>{
  const toggle=e.target.closest('.command-toggle');
  if(!toggle) return;
  e.preventDefault();
  e.stopPropagation();
  const panel=$(toggle.dataset.commandPanel);
  if(!panel) return;
  const willOpen=panel.style.display==='none' || getComputedStyle(panel).display==='none';
  panel.style.display=willOpen?'block':'none';
  toggle.textContent=willOpen?'🤖 Đóng ô nhập lệnh':'🤖 Nhập lệnh tự động';
  if(willOpen){ const ta=panel.querySelector('textarea.command'); if(ta) setTimeout(()=>ta.focus(),30); }
});

// Existing section buttons (Todo/Habit/Schedule) open their hidden panels.
document.addEventListener('click', e=>{
  const btn=e.target.closest('#todoCommandBtn,#habitCommandBtn,#scheduleCommandBtn');
  if(!btn) return;
  e.preventDefault(); e.stopPropagation();
  const map={todoCommandBtn:'todoCommandPanel',habitCommandBtn:'habitCommandPanel',scheduleCommandBtn:'scheduleCommandPanel'};
  const panel=$(map[btn.id]);
  if(!panel) return;
  const open=getComputedStyle(panel).display!=='none';
  panel.style.display=open?'none':'block';
  btn.textContent=open?'🤖 Nhập lệnh tự động':'🤖 Đóng ô nhập lệnh';
  if(!open){ const ta=panel.querySelector('textarea.command'); if(ta) setTimeout(()=>ta.focus(),30); }
});

// Command buttons use ONE delegated click handler only.
// This prevents a single click from executing the same command twice.
document.addEventListener('click',e=>{
  const help=e.target.closest('.command-help-inline');
  if(help){
    if(typeof window.showCommandHelp==='function') window.showCommandHelp();
    else if($('commandHelp')) $('commandHelp').click();
    return;
  }
  const todoBtn=e.target.closest('#runTodoCommand');
  if(todoBtn){
    e.preventDefault();
    e.stopPropagation();
    if(state.sessionAuth?.role==='Guest') return alert('👀 Guest chỉ được xem, không thể chạy lệnh.');
    runSharedCommandFromBox('todoCommandBox');
    return;
  }
  const btn=e.target.closest('[data-command-target]');
  if(btn){
    e.preventDefault();
    e.stopPropagation();
    if(state.sessionAuth?.role==='Guest') return alert('👀 Guest chỉ được xem, không thể chạy lệnh.');
    runSharedCommandFromBox(btn.dataset.commandTarget);
  }
});

window.showCommandHelp=function(){
  const role=state.sessionAuth?.role||'Guest';
  const isAdmin=['Admin','Founder'].includes(role);
  const isFounder=role==='Founder';
  const lines=[
    ['1. TODO','TODO|YYYY-MM-DD|Tên công việc|cao/trung/thap|HH:MM|Ghi chú','Tạo một công việc trong 📋 Kế hoạch theo ngày. Lệnh sẽ dùng đúng ngày ghi trong lệnh.'],
    ['2. SCHEDULE','SCHEDULE|YYYY-MM-DD|HH:MM|Tên lịch|Loại','Tạo một lịch theo ngày và giờ.'],
    ['3. HABIT','HABIT|YYYY-MM|Tên thói quen|Mục tiêu','Tạo một thói quen cho tháng.'],
    ['4. JOURNAL','JOURNAL|YYYY-MM-DD|Môn|Phút|Điểm|Nội dung|Kiến thức mới','Tạo một bản ghi học tập/nhật ký.'],
    ['5. MOMENT','MOMENT|YYYY-MM-DD|Tiêu đề|Mô tả','Tạo một khoảnh khắc đáng nhớ.'],
    ['6. ENDDAY','ENDDAY|YYYY-MM-DD|Điều biết ơn|Bài học|Việc quan trọng ngày mai','Tạo bản ghi kết ngày.']
  ];
  if(isAdmin) lines.push(
    ['7. MOOD_DEF 🔒 ADMIN','MOOD_DEF|Emoji|Tên cảm xúc','Thêm định nghĩa cảm xúc mới.'],
    ['8. COMFORT 🔒 ADMIN','COMFORT|Tên cảm xúc|Lời an ủi','Thêm lời an ủi cho một cảm xúc.'],
      ['9. MOTIVATION 🔒 ADMIN','MOTIVATION|Lời tạo động lực','Thêm một gợi ý hoặc thử thách nhỏ dùng chung cho khu vực “Khi thấy nản, làm một việc nhỏ”.'],
    ['10. COMFORT 🔒 ADMIN/FOUNDER','COMFORT|Cảm xúc|Lời an ủi','Thêm lời an ủi chung cho toàn bộ thành viên khi họ chọn cảm xúc trong khu vực 🎨 Cảm xúc của bạn bây giờ.'],
    ['11. COMPLETION_MOTIVATION 🔒 ADMIN','COMPLETION_MOTIVATION|Lời động viên','Thêm lời động viên cho khu vực Tổng hợp hoàn thành.'],
    ['12. STUDY_TIME 🔒 ADMIN','STUDY_TIME|Tên tài khoản|Số phút (+/-)|Ngày (tùy chọn)','+90 để cộng 90 phút; -30 để trừ 30 phút. Nếu bỏ ngày, hệ thống ghi ngày hôm qua. Liên kết trực tiếp với BXH thời gian học.']
  );
  if(isFounder) lines.push(
    ['16. ROLE 🔒 FOUNDER ONLY','ROLE|Tên tài khoản|111 hoặc 999','Chỉ Người sáng lập nhìn thấy và sử dụng. 999 cấp Quản trị viên; 111 cấp Người sáng lập. Admin không được dùng lệnh này.']
  );
  lines.push(['17. NHIỆM VỤ HÔM NAY','Tự động','Mỗi ngày hệ thống tạo 3 nhiệm vụ thường và có thể xuất hiện 1 nhiệm vụ đặc biệt; không cần lệnh QUEST.']);
  const visibleText=role==='Guest'?'📖 Hướng dẫn cú pháp dành cho người xem':'📖 Hướng dẫn cú pháp — '+(isFounder?'Người sáng lập':isAdmin?'Quản trị viên':'Thành viên');
  showModal(visibleText, `<div style="display:grid;gap:12px">${lines.map(x=>`<div class="card" style="padding:12px"><b>${x[0]}</b><div style="margin:7px 0"><code>${esc(x[1])}</code></div><div class="muted">${esc(x[2])}</div></div>`).join('')}<div class="card" style="padding:12px;background:var(--pink)"><b>📌 Cách dùng</b><ol style="margin:8px 0 0 20px"><li>Mỗi lệnh đặt trên một dòng.</li><li>Các phần cách nhau bằng dấu <code>|</code>.</li><li>Có thể dán nhiều lệnh cùng lúc.</li><li>Sau khi dán, nhấn <b>▶ Chạy lệnh</b>.</li><li>🔒 Lệnh Admin chỉ hiện với Admin/Founder.</li><li>🛡️ Lệnh <code>ROLE</code> chỉ hiện với Founder.</li></ol></div></div>`);
};

if($('resetAll')){
    $('resetAll').onclick = () => {
        if(!state.sessionAuth || !['Admin','Founder'].includes(state.sessionAuth.role)) return alert('🔒 Chỉ Admin hoặc Founder mới có quyền cấp lại mã thành viên.');
        const members=(state.membersList||[]).filter(m=>m.role==='Member' && state.memberAccounts.some(a=>String(a.memberId)===String(m.id)));
        showModal('🔐 Cấp lại mã thành viên', `<p class="muted">Chỉ mã đăng nhập được thay đổi. Mật khẩu, tiến độ, lịch sử, lịch trình, thói quen và các dữ liệu khác sẽ được giữ nguyên.</p><div style="display:grid;gap:8px">${members.length?members.map(m=>`<div class="card" style="padding:10px;display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap"><span><b>${esc(m.name)}</b><br><small class="muted">${esc(m.code||'Chưa có mã')} · ${esc(m.lastActive||'Chưa đăng nhập')}</small></span><button class="btn sm light" onclick="adminResetMemberCode('${esc(String(m.id))}')">Cấp lại mã</button></div>`).join(''):'<p class="muted">Chưa có tài khoản thành viên để cấp lại mã.</p>'}</div>`);
    };
}


function comparisonPeriodDates(period){
  const now=new Date();
  const today=todayISO();
  const todayDate=new Date(today+'T12:00:00');

  // 🔗 Bảng xếp hạng lấy dữ liệu tính đến HÔM NAY, luôn liên kết trực tiếp với
  // 📋 Kế hoạch theo ngày và 🍀 Thói quen theo tháng — tick xong ở đó là cập
  // nhật ngay ở đây, không cần chờ qua ngày hôm sau.
  if(period==='day'){
    return {
      start:today,
      end:today,
      label:`📅 Hôm nay — ${todayDate.toLocaleDateString('vi-VN')}`
    };
  }

  if(period==='week'){
    const d=new Date(todayDate);
    const day=d.getDay();
    const diff=day===0?-6:1-day;
    d.setDate(d.getDate()+diff);
    const start=toISODate(d);
    return {
      start,
      end:today,
      label:`🗓️ Tuần hiện tại — ${new Date(start+'T12:00:00').toLocaleDateString('vi-VN')} → ${todayDate.toLocaleDateString('vi-VN')}`
    };
  }

  const start=now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-01';
  return {
    start,
    end:today,
    label:`📆 Tháng hiện tại — ${now.toLocaleDateString('vi-VN',{month:'long',year:'numeric'})} (đến ${todayDate.toLocaleDateString('vi-VN')})`
  };
}
function dateInRange(date,start,end){return !!date && date>=start && date<=end;}
function habitCompletedInRange(h,start,end){
  if(!h || !h.days) return 0;
  const ym=h.month || h.ym || (h.createdAt||'').slice(0,7);
  let n=0;
  Object.keys(h.days).forEach(k=>{if(!h.days[k])return; const day=String(k).padStart(2,'0'); const date=ym?ym+'-'+day:null; if(dateInRange(date,start,end)) n++;});
  return n;
}
function getRankingProgress(ownerId,account){
  const bucket=state.userData?.accounts?.[String(ownerId)]||state.userData?.accounts?.[ownerId]||{};
  const bucketXP=Number(bucket.xp);
  const accountXP=Number(account?.progress?.xp);
  const xp=Number.isFinite(bucketXP)?Math.max(0,bucketXP):(Number.isFinite(accountXP)?Math.max(0,accountXP):0);
  return {xp,level:Math.max(1,Math.floor(xp/100)+1)};
}
function compareAccountRows(){
  const rows=[];
  const roleLabelFor=(role)=>{
    if(role==='Founder') return '🛡️ Người sáng lập web';
    if(role==='Admin') return '👑 Quản trị viên';
    const custom=(state.customRoles||[]).find(r=>r.id===role || r.name===role);
    if(custom) return `${custom.icon||'🎨'} ${custom.name}`;
    return '👤 Thành viên';
  };
  (state.membersList||[]).forEach(m=>{
    const a=state.memberAccounts.find(x=>x.memberId===m.id)||null;
    const progress=getRankingProgress(m.id,a);
    rows.push({id:m.id,name:m.name,role:m.role||'Member',roleLabel:roleLabelFor(m.role||'Member'),customRoles:getCustomRolesForMember(m.id),account:a,member:m,xp:progress.xp,level:progress.level});
  });
  // Include orphan accounts safely and support custom Founder-created roles.
  (state.memberAccounts||[]).forEach(a=>{
    if(!rows.some(r=>r.id===a.memberId)){
      const role=a.role||'Member';
      const progress=getRankingProgress(a.memberId,a);
      rows.push({id:a.memberId,name:a.name,role,roleLabel:roleLabelFor(role),customRoles:getCustomRolesForMember(a.memberId),account:a,member:null,xp:progress.xp,level:progress.level});
    }
  });
  return rows;
}
function comparisonMetrics(row,period){
  const {start,end}=comparisonPeriodDates(period);
  const ownerId=row.id;
  // Tài khoản đang mở phải đọc state hiện hành; các tài khoản khác đọc bucket riêng.
  // Không fallback sang progress tổng vì BXH theo ngày/tuần/tháng phải phản ánh đúng khoảng ngày.
  const bucket=state.userData?.accounts?.[String(ownerId)]||state.userData?.accounts?.[ownerId]||blankUserData();
  const activeId=String(accountOwnerId()||'');
  const sourceTodos=activeId===String(ownerId)&&Array.isArray(state.todos)?state.todos:
    (Array.isArray(bucket.todos)?bucket.todos:[]);
  const todos=sourceTodos.filter(t=>
    (!t.ownerId||String(t.ownerId)===String(ownerId)) && dateInRange(t.date,start,end)
  );
  const doneTodos=todos.filter(t=>t.done===true).length;
  const todoPct=todos.length?Math.round(doneTodos/todos.length*100):0;
  let habitDone=0,habitPossible=0;
  const ymList=[];
  let cursor=new Date(start+'T12:00:00'); const endD=new Date(end+'T12:00:00');
  while(cursor<=endD){ymList.push(toISODate(cursor).slice(0,7));cursor.setDate(cursor.getDate()+1);}
  const uniqueYms=[...new Set(ymList)];
  const sourceHabits=activeId===String(ownerId)&&state.habits&&typeof state.habits==='object'?state.habits:
    (bucket.habits&&typeof bucket.habits==='object'?bucket.habits:{});
  uniqueYms.forEach(ym=>{
    (sourceHabits[ym]||[]).filter(h=>!h.ownerId||String(h.ownerId)===String(ownerId)).forEach(h=>{
      habitDone+=habitCompletedInRange({...h,month:ym},start,end);
      const monthStart=ym+'-01';
      const monthDays=new Date(Number(ym.slice(0,4)),Number(ym.slice(5,7)),0).getDate();
      const monthEnd=ym+'-'+String(monthDays).padStart(2,'0');
      const rs=new Date(Math.max(new Date(start+'T12:00:00').getTime(),new Date(monthStart+'T12:00:00').getTime()));
      const re=new Date(Math.min(new Date(end+'T12:00:00').getTime(),new Date(monthEnd+'T12:00:00').getTime()));
      const days=Math.max(0,Math.floor((re-rs)/86400000)+1);
      habitPossible += Math.min(Number(h.target)||0,days);
    });
  });
  const habitPct=habitPossible?Math.min(100,Math.round(habitDone/habitPossible*100)):0;
  const studySource=getStudyRowsForOwner(ownerId);
  const studyLogs=studySource.filter(x=>String(x.memberId||x.ownerId||'')===String(ownerId) && dateInRange(x.date||x.updatedAt?.slice(0,10),start,end));
  // Các lệnh STUDY_TIME mới lưu deltaMinutes (+/-). Delta âm phải được tính vào
  // bảng xếp hạng để khi Admin trừ thời gian, thứ hạng cũng thay đổi ngay.
  const studyMinutes=Math.max(0, studyLogs.reduce((sum,x)=>{
    const n = Number.isFinite(Number(x.deltaMinutes)) ? Number(x.deltaMinutes) : Number(x.minutes);
    return sum + (Number.isFinite(n) ? n : 0);
  },0));
  return {todoPct,doneTodos,totalTodos:todos.length,habitPct,habitDone,habitPossible,studyMinutes,studyLogs,start,end};
}
let comparisonPeriod='day'; window.comparisonPeriod='day';
function setupComparisonControls(){
  document.querySelectorAll('.compare-period-btn').forEach(btn=>{
    if(btn.dataset.compareBound==='1') return;
    btn.dataset.compareBound='1';
    btn.addEventListener('click',()=>{
      comparisonPeriod=btn.dataset.period||'day';
      window.comparisonPeriod=comparisonPeriod;
      renderComparison();
    });
  });
}
function renderComparison(){
  setupComparisonControls();
  const box=$('comparisonTable'); if(!box)return;
  const period=comparisonPeriod||window.rankingPeriod||'day';
  const info=comparisonPeriodDates(period);
  const label=$('comparisonPeriodLabel'); if(label) label.textContent=info.label;
  document.querySelectorAll('.compare-period-btn').forEach(b=>b.classList.toggle('active',b.dataset.period===period));

  const rows=compareAccountRows().map(r=>{
    const metric=comparisonMetrics(r,period);
    const progress=getRankingProgress(r.id,r.account);
    const xp=progress.xp;
    return {...r,metric,xp,level:progress.level};
  });

  const alpha=(a,b)=>a.name.localeCompare(b.name,'vi',{sensitivity:'base'})||String(a.id).localeCompare(String(b.id));
  const rankRows=(arr,key)=>{
    const sorted=[...arr].sort((a,b)=>(Number(b.metric[key]||0)-Number(a.metric[key]||0))||alpha(a,b));
    let prev=null,rank=0;
    sorted.forEach((r,i)=>{
      const value=Number(r.metric[key]||0);
      if(value!==prev){rank=i+1;prev=value;}
      r.__ranks=r.__ranks||{};
      r.__ranks[key]=rank;
    });
    return sorted;
  };

  const rankCell=(r,key)=>{
    const rank=Number(r.__ranks?.[key]||0)||1;
    const icon=rank===1?'🥇':rank===2?'🥈':rank===3?'🥉':'🏅';
    const self=state.sessionAuth&&state.sessionAuth.memberId===r.id?' <span class="tag yellow">Bạn</span>':'';
    return `<td>
      <b>${icon} Hạng ${rank} — ${esc(r.name)}${self}</b>
      <div class="muted">${esc(r.roleLabel||'Thành viên')}</div>
      ${renderRoleBadges(r.id)}${renderPublicAchievementBadges(r.id)}${renderPublicZoneBadges(r.id)}
      <div style="margin-top:4px">🏅 Cấp ${r.level} · ⚡ ${r.xp} XP</div>
    </td>`;
  };

  const rankLabelOf=(rank)=>rank===1?'🥇 Hạng 1':rank===2?'🥈 Hạng 2':rank===3?'🥉 Hạng 3':'🌱 Đang tiến bộ';
  const rankFallback={'🥇 Hạng 1':'🔥 Dẫn đầu — giữ phong độ!','🥈 Hạng 2':'🚀 Rất sát vị trí đầu!','🥉 Hạng 3':'💪 Top 3 — tiếp tục bứt phá!','🌱 Đang tiến bộ':'🌱 Cứ tiến từng bước, thứ hạng sẽ thay đổi.'};
  const motivation=(r,key)=>{
    // 🔒 Riêng tư: chỉ chính thành viên đó mới thấy lời động viên của mình.
    const isSelf = !!(state.sessionAuth && String(state.sessionAuth.memberId)===String(r.id));
    if(!isSelf) return '';
    const rank=Number(r.__ranks?.[key]||0)||1;
    const label=rankLabelOf(rank);
    const list=(state.rankMotivations&&state.rankMotivations[label])||[];
    if(!list.length) return rankFallback[label];
    const idx=Math.abs(String(r.id).split('').reduce((h,c)=>h*31+c.charCodeAt(0),0))%list.length;
    return `<span title="🔒 Chỉ mình bạn thấy được lời này">${esc(list[idx])}</span>`;
  };

  const workRows=rankRows(rows,'todoPct');
  const habitRows=rankRows(rows,'habitPct');
  const studyRows=rankRows(rows,'studyMinutes');

  const updatedLabel=info.end ? new Date(info.end+'T12:00:00').toLocaleDateString('vi-VN') : '';

  const workBody=workRows.map(r=>`<tr>${rankCell(r,'todoPct')}
    <td><b>${r.metric.todoPct}%</b><div class="progress"><i style="width:${r.metric.todoPct}%"></i></div>
    <small>${r.metric.doneTodos}/${r.metric.totalTodos} kế hoạch hoàn thành</small></td>
    <td><small>📌 Cập nhật đến ${updatedLabel}</small><br>${motivation(r,'todoPct')}</td></tr>`).join('');

  const habitBody=habitRows.map(r=>`<tr>${rankCell(r,'habitPct')}
    <td><b>${r.metric.habitPct}%</b><div class="progress"><i style="width:${r.metric.habitPct}%"></i></div>
    <small>${r.metric.habitDone}/${r.metric.habitPossible} lượt hoàn thành</small></td>
    <td><small>📌 Cập nhật đến ${updatedLabel}</small><br>${motivation(r,'habitPct')}</td></tr>`).join('');

  const studyBody=studyRows.map(r=>{
    const last=r.metric.studyLogs?.length?r.metric.studyLogs.map(x=>x.updatedAt||x.createdAt).filter(Boolean).sort().pop():null;
    const lastDate=r.metric.studyLogs?.length?r.metric.studyLogs.map(x=>x.date||x.updatedAt?.slice(0,10)||x.createdAt?.slice(0,10)).filter(Boolean).sort().pop():null;
    return `<tr>${rankCell(r,'studyMinutes')}
      <td><b>${fmtMin(r.metric.studyMinutes)}</b><div class="muted">STUDY_TIME chính thức</div></td>
      <td>📌 ${lastDate?new Date(lastDate+'T12:00:00').toLocaleDateString('vi-VN'):'Chưa cập nhật'}${last?`<br><small>${new Date(last).toLocaleString('vi-VN')}</small>`:''}</td>
      <td>${motivation(r,'studyMinutes')}</td></tr>`;
  }).join('');

  const section=(icon,title,heads,body)=>`
    <details class="compare-collapse" open>
      <summary><span>${icon} ${title}</span><span class="muted">Bấm để thu gọn / mở rộng</span></summary>
      <div class="tablewrap" style="margin-top:10px"><table class="table">
        <thead><tr>${heads}</tr></thead><tbody>
        ${body||`<tr><td colspan="5" class="empty">Chưa có dữ liệu.</td></tr>`}
        </tbody></table></div>
    </details>`;

  box.innerHTML=`
    <div class="card" style="margin-bottom:14px;background:linear-gradient(135deg,var(--pink),var(--green-light));">
      <div style="font-size:20px;font-weight:900">🏆 BẢNG XẾP HẠNG</div>
      <div class="muted" style="margin-top:5px">📅 ${period==='day'?'Theo ngày':period==='week'?'Theo tuần':'Theo tháng'} · ${esc(info.label||'')}</div>
      <div style="margin-top:7px">🏅 Cấp độ và ⚡ XP chỉ hiển thị để tham khảo. <b>XP không dùng để quyết định thứ hạng.</b> Ba bảng dưới đây độc lập hoàn toàn: 📋 Công việc · 🍀 Thói quen · ⏱️ Thời gian học.</div>
    </div>
    ${section('📋','Công việc / Kế hoạch theo ngày','<th>Hạng / Tài khoản</th><th>Hoàn thành</th><th>Cập nhật</th>',workBody)}
    ${section('🍀','Thói quen theo tháng','<th>Hạng / Tài khoản</th><th>Hoàn thành</th><th>Cập nhật</th>',habitBody)}
    ${section('⏱️','Thời gian học','<th>Hạng / Tài khoản</th><th>Thời gian</th><th>Cập nhật</th><th>Động viên</th>',studyBody)}
    <div class="muted" style="margin-top:10px">
      Công bằng: mỗi bảng có thứ hạng riêng. Nếu cùng chỉ số thì đồng hạng; tên A→Z chỉ dùng để sắp thứ tự hiển thị khi bằng điểm.
    </div>`;
}
function updateFounderStudyVisibility(){
  const isFounder = state.sessionAuth?.role === 'Founder';
  document.querySelectorAll('.founder-study-only').forEach(el=>{ el.style.display = isFounder ? '' : 'none'; });
  const recent=document.querySelectorAll('#studySessions'); recent.forEach(el=>{ const card=el.closest('.card'); if(card) card.style.display=''; });
}

const PERF_PAGE_SIZE=12;
const perfPageState=Object.create(null);
function perfPageKey(key){return String(key||'list').replace(/[^a-z0-9_-]/gi,'_');}
function setPerfPage(key,page){perfPageState[perfPageKey(key)]=Math.max(0,Number(page)||0);applyPerfPagination();}
window.setPerfPage=setPerfPage;
function perfPagerFor(container,key){
  const safe=perfPageKey(key),parent=container?.parentElement;
  return parent?.querySelector(`[data-perf-pager="${safe}"]`)||null;
}
function paginatePerfContainer(container,itemSelector,key,size=PERF_PAGE_SIZE,label='mục'){
  if(!container)return;
  const safe=perfPageKey(key),items=Array.from(container.querySelectorAll(itemSelector)),total=items.length,pages=Math.max(1,Math.ceil(total/size));
  if(pages<=1){items.forEach(item=>{item.hidden=false;});perfPagerFor(container,safe)?.remove();delete perfPageState[safe];return;}
  const page=Math.min(Math.max(0,Number(perfPageState[safe])||0),pages-1);perfPageState[safe]=page;
  const start=page*size;items.forEach((item,index)=>{item.hidden=index<start||index>=start+size;});
  let pager=perfPagerFor(container,safe);
  if(!pager){pager=document.createElement('div');pager.className='perf-pager';pager.dataset.perfPager=safe;container.insertAdjacentElement('afterend',pager);}
  pager.innerHTML=`<button type="button" class="btn light sm" ${page<=0?'disabled':''} onclick="setPerfPage('${safe}',${page-1})">‹ Trước</button><span class="perf-pager-label">${page+1}/${pages} · ${total} ${label}</span><button type="button" class="btn light sm" ${page>=pages-1?'disabled':''} onclick="setPerfPage('${safe}',${page+1})">Sau ›</button>`;
}
function applyPerfPagination(){
  const targets=[
    ['adminMemberListContainer',':scope > .card','members',12,'thành viên'],
    ['todoList',':scope > .todo','todos',12,'công việc'],
    ['scheduleList',':scope > .todo','schedules',12,'lịch'],
    ['summaryAchievementList',':scope > .achievement','summary-achievements',18,'thành tích'],
    ['studyAiInboxList',':scope > .study-ai-card','study-ai-inbox',10,'góp ý'],
    ['trashList',':scope > .card','trash',12,'mục lưu trữ'],
    ['journeyList',':scope > .journey-entry','journey',10,'ảnh']
  ];
  targets.forEach(([id,selector,key,size,label])=>paginatePerfContainer($(id),selector,key,size,label));
  [['#momentsList .history-v21-list','moments-history','khoảnh khắc'],['#journalList .history-v21-list','journal-history','nhật ký'],['#moodHistory .history-v21-list','mood-history','cảm xúc'],['#endDayHistory .history-v21-list','endday-history','kết ngày']].forEach(([selector,key,label])=>paginatePerfContainer(document.querySelector(selector),':scope > .history-v21-item',key,10,label));
  document.querySelectorAll('#rebuiltAchievementGroups .achievement-group > div').forEach((group,index)=>paginatePerfContainer(group,':scope > .achievement',`achievement-group-${index}`,12,'thành tích'));
}
function renderCurrentTab(){
  if(state.sessionAuth && state.sessionAuth.role!=='Guest'){ensureUserStore();const id=accountOwnerId();if(id&&state.userData.accounts[id]){/* active bucket is already loaded */}}
  checkAuthSession();
  try{const ownerId=accountOwnerId();if(ownerId)recalculateCurrentProgress(ownerId,{persist:false});}catch(e){console.warn('Không thể tái tính dữ liệu hiển thị',e);}
  checkAchievements();
  updateFounderStudyVisibility();
  try{renderPrivateXPHistoryAdmin();}catch(e){}
  try{renderProfileView();}catch(e){}
  const tab=(typeof currentNavId!=='undefined'&&currentNavId)||String(location.hash||'').replace(/^#/,'')||'home';
  switch(tab){
    case 'home':renderHome();break;
    case 'admin':renderAdminView();renderAdminMotivations();break;
    case 'profile':renderProfileView();break;
    case 'endday':renderEndDay();break;
    case 'todo':renderTodos();break;
    case 'study':renderPomoClock();renderStudySessions();renderFounderSubjectStats();break;
    case 'achievements':renderAchievementsView();renderQuestBoard();break;
    case 'habit':renderHabits();break;
    case 'mood':renderMoods();break;
    case 'schedule':renderSchedule();break;
    case 'moments':renderMoments();break;
    case 'journey':renderJourney();break;
    case 'journal':renderJournals();break;
    case 'summary':renderSummary();renderTimelineSummary();break;
    case 'compare':renderComparison();break;
    case 'data':renderSheetLinks();break;
    case 'trash':renderTrash();break;
    case 'studyAi-contribution':if(typeof renderRewards==='function')renderRewards();if(typeof renderInbox==='function')renderInbox();break;
    default:renderHome();break;
  }
  applyPerfPagination();
}
function renderAll(){renderCurrentTab();}

function hydrateStartupInputs(){
    if($('todoDate')) $('todoDate').value = todayISO();
    if($('schDate')) $('schDate').value = todayISO();
    if($('mDate')) $('mDate').value = todayISO();
    if($('journeyDate')) $('journeyDate').value = todayISO();
    if($('jDate')) $('jDate').value = todayISO();
    if($('goalDay')) $('goalDay').value = state.goals.day || 120;
    if($('goalWeek')) $('goalWeek').value = state.goals.week || 600;
    if($('goalMonth')) $('goalMonth').value = state.goals.month || 2500;
    if($('pomoFocusInput')) $('pomoFocusInput').value = state.pomo.focus || 25;
    if($('pomoShortInput')) $('pomoShortInput').value = state.pomo.short || 5;
    if($('pomoLongInput')) $('pomoLongInput').value = state.pomo.long || 15;
}
function activateStartupView(){
    const hash=(location.hash||'').replace('#','');
    if(hash && $(hash)){
      currentNavId=hash;
      menuCompact=true;
      document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));
      $(hash).classList.add('active');
    }else{
      currentNavId='home';
      menuCompact=false;
    }
}
async function finishCloudStartup(){
    const cloudLoaded = await pullStateFromServer();
    if(!cloudLoaded){
      /* Nếu cloud chưa có dòng dữ liệu, tạo nó; dữ liệu local vẫn được dùng trước. */
      const checkUrl=SUPABASE_REST+'/'+SUPABASE_TABLE+
        '?id=eq.'+encodeURIComponent(SUPABASE_STATE_ID)+'&select=id';
      try{
        const checkRes=await fetch(checkUrl,{
          method:'GET',
          headers:supabaseHeaders(),
          cache:'no-store'
        });
        const checkRows=checkRes.ok?await checkRes.json():[];
        if(Array.isArray(checkRows)&&checkRows.length===0) await createInitialSupabaseState();
      }catch(e){
        console.warn('☁️ Không kiểm tra được global_state.',e);
      }
    }
    return cloudLoaded;
}
window.onload = async () => {
    /* P0: hiển thị state local trước để không chặn first paint bởi mạng. */
    normalizeStateAccounts();
    if(state.sessionAuth && state.sessionAuth.role!=='Guest')switchUserData(state.sessionAuth);
    hydrateStartupInputs();
    activateStartupView();
    try{const ownerId=accountOwnerId();if(ownerId)recalculateCurrentProgress(ownerId,{persist:false});}catch(e){console.warn('Không thể khôi phục tiến độ local',e);}
    renderAll();
    updateMenu();

    /* Đồng bộ cloud ở nền; nếu có dữ liệu mới thì merge và vẽ lại đúng tab hiện tại. */
    let cloudLoaded=false;
    try{cloudLoaded=await finishCloudStartup();}
    catch(e){console.warn('☁️ Đồng bộ nền thất bại, tiếp tục dùng dữ liệu local.',e);}
    if(cloudLoaded){
      normalizeStateAccounts();
      if(state.sessionAuth && state.sessionAuth.role!=='Guest')switchUserData(state.sessionAuth);
      hydrateStartupInputs();
      try{const ownerId=accountOwnerId();if(ownerId)recalculateCurrentProgress(ownerId,{persist:false});}catch(e){console.warn('Không thể tái tính sau đồng bộ cloud',e);}
      renderAll();
      updateMenu();
    }
};


/* ---- extracted script block 3: <script> ---- */
function escapeHtml(v){return String(v??'').replace(/[&<>"']/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));}

function renderPrivateXPHistoryAdmin(){
  const el=document.getElementById('privateXPHistoryList');
  const panel=document.getElementById('privateXPHistoryAdmin');
  if(!panel) return;
  const allowed=!!state.sessionAuth;
  panel.style.display=allowed?'block':'none';
  if(!allowed || !el) return;
  const rows=getPrivateXPHistoryForAdmin().slice().reverse();
  el.innerHTML=rows.length ? rows.map(x=>{
    const d=new Date(x.at);
    const sign=x.delta>0?'+':'';
    return `<div class="history-row"><b>${escapeHtml(x.source)}</b> · ${sign}${x.delta} XP · ${escapeHtml(x.detail)} · ${d.toLocaleString('vi-VN')}</div>`;
  }).join('') : '<div class="muted">Chưa có lịch sử XP.</div>';
}


/* ---- extracted script block 4: <script> ---- */
/* V15: tên Role tuần tự nhiên hơn, không random lại tuần */
(function(){
  try{
    const week=typeof roleWeekKey==='function'?roleWeekKey():null;
    if(week&&typeof state!=='undefined'){
      const reward=state.weeklyRewards?.[week];
      if(reward){reward.name='Chinh Phục Tinh Tú';reward.title='PHẦN THƯỞNG TUẦN';}
      (state.customRoles||[]).filter(r=>r.weeklyRewardId===reward?.weeklyRewardId||r.systemKey===`weekly-${week}`).forEach(r=>{r.name='Chinh Phục Tinh Tú';r.icon='🌌';r.roleWeekTitle='Chinh Phục Tinh Tú';if(typeof roleSchema==='function')roleSchema(r);});
    }
  }catch(e){console.warn('Không thể cập nhật tên Role tuần v15',e)}
})();


/* ---- extracted script block 5: <script> ---- */
(function(){
  const oldBadges=window.renderRoleBadges;
  window.renderRoleBadges=function(memberId){
    const roles=getCustomRolesForMember(memberId).filter(r=>roleSchema(r).visibility==='public');
    if(!roles.length)return '';
    const key='study_empire_role_scale_'+String(memberId);
    const scale=Math.max(.55,Math.min(1.15,Number(localStorage.getItem(key)||.72)));
    return '<div class="member-role-stack" data-member-role-id="'+esc(String(memberId))+'" style="--member-role-scale:'+scale+'">'+roles.map(r=>'<span style="display:inline-flex;transform-origin:left center;margin-right:'+((scale<.9)?'-3px':'2px')+'">'+renderRoleCapsule(r,{publicMode:true})+'</span>').join('')+'</div>';
  };
  window.addMemberRoleScaleControl=function(memberId){
    const id='memberRoleScaleControl';const old=document.getElementById(id);if(old)old.remove();
    const key='study_empire_role_scale_'+String(memberId),value=Number(localStorage.getItem(key)||.72);
    const box=document.createElement('div');box.id=id;box.style.cssText='margin-top:8px;padding:8px;border:1px solid var(--line);border-radius:12px;background:rgba(255,255,255,.55)';
    box.innerHTML='<label style="font-size:12px;font-weight:800">Kích thước Role của tôi: <span id="memberRoleScaleValue">'+value.toFixed(2)+'×</span></label><input id="memberRoleScaleInput" type="range" min=".55" max="1.15" step=".05" value="'+value+'" style="width:100%"><small class="muted">Kéo sang trái để Role nhỏ hơn; thay đổi chỉ áp dụng cho cách bạn xem Role.</small>';
    const badge=document.getElementById('profileRoleBadge');if(badge)badge.parentNode.appendChild(box);
    const input=box.querySelector('#memberRoleScaleInput');input.addEventListener('input',function(){localStorage.setItem(key,this.value);box.querySelector('#memberRoleScaleValue').textContent=Number(this.value).toFixed(2)+'×';if(typeof renderProfileView==='function')renderProfileView();});
  };
  const oldProfile=window.renderProfileView;
  if(oldProfile&&!oldProfile.__roleScaleWrapped){
    const wrapped=function(){oldProfile.apply(this,arguments);const id=state.sessionAuth?.memberId;if(id)setTimeout(()=>addMemberRoleScaleControl(id),0)};wrapped.__roleScaleWrapped=true;window.renderProfileView=wrapped;
  }
})();


/* ---- extracted script block 6: <script id="stable-rebuild-role-js"> ---- */
(function(){'use strict';
window.exportWholeProjectStable=function(){try{const copy=JSON.parse(JSON.stringify(state));const local={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k)local[k]=localStorage.getItem(k)}const payload={backupType:'Study Empire whole project backup',formatVersion:'1.0',exportedAt:new Date().toISOString(),projectState:copy,localStorageData:local};const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='study-empire-whole-project-backup-'+new Date().toISOString().slice(0,10)+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}catch(e){alert('Không thể xuất dữ liệu: '+e.message)}};
window.founderEditRoleStable=function(id){if(state.sessionAuth?.role!=='Founder')return alert('🔒 Chỉ Founder mới được chỉnh sửa Role.');const r=(state.customRoles||[]).find(x=>String(x.id)===String(id));if(!r)return alert('Không tìm thấy Role.');const v=r.vision||{},d=r.design||{},b=r.behavior||{};const esc2=x=>String(x||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));const f=(l,k,val,w)=>`<label class="${w?'stable-wide':''}">${l}${w?`<textarea data-k="${k}">${esc2(val)}</textarea>`:`<input data-k="${k}" value="${esc2(val)}">`}</label>`;const m=document.createElement('div');m.id='stableRoleEditor';m.innerHTML=`<div><div style="display:flex;justify-content:space-between"><h3>✏️ Chỉnh sửa Role</h3><button class="btn light" data-close>✕</button></div><div class="stable-edit-grid">${f('Tên','name',r.name)}${f('Icon','icon',r.icon)}${f('Phong cách','style',r.style||d.style)}${f('Màu 1','color1',r.color1||d.color1)}${f('Màu 2','color2',r.color2||d.color2)}${f('Gradient','gradientCss',r.gradientCss||d.gradientCss,1)}${f('Vision','vision',v.vision,1)}${f('Nguồn gốc / câu chuyện','story',r.origin||v.story,1)}${f('Giải thích phong cách','styleExplanation',r.styleExplanation||d.styleExplanation,1)}${f('Ý nghĩa bảng màu','paletteMeaning',r.paletteMeaning||d.paletteMeaning,1)}</div><div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px"><button class="btn light" data-close>Hủy</button><button class="btn" data-save>Lưu</button></div></div>`;document.body.appendChild(m);m.querySelectorAll('[data-close]').forEach(x=>x.onclick=()=>m.remove());m.querySelector('[data-save]').onclick=()=>{const g=k=>m.querySelector(`[data-k="${k}"]`)?.value.trim()||'';if(!g('name'))return alert('Tên Role không được để trống.');r.name=g('name');r.icon=g('icon')||'🏷️';r.style=g('style');r.color1=g('color1');r.color2=g('color2');r.gradientCss=g('gradientCss');r.origin=g('story');r.design=Object.assign({},d,{style:r.style,color1:r.color1,color2:r.color2,gradientCss:r.gradientCss,styleExplanation:g('styleExplanation'),paletteMeaning:g('paletteMeaning')});r.vision=Object.assign({},v,{vision:g('vision'),story:r.origin});if(typeof roleSchema==='function')roleSchema(r);save();renderCustomRoles();renderAdminView();m.remove();alert('✅ Đã lưu Role.')};};
})();


/* ---- extracted script block 7: <script id="study-ai-upgrade-js"> ---- */
(function(){'use strict';
const key='studyEmpireAIStudioV1';const read=()=>{try{return JSON.parse(localStorage.getItem(key)||'{"flashcards":[],"exams":[],"feedback":[],"contributions":{"documents":0,"achievementPoints":0},"claimed":[] }')}catch(e){return {flashcards:[],exams:[],feedback:[],contributions:{documents:0,achievementPoints:0},claimed:[]}}};let data=read();const save=()=>{localStorage.setItem(key,JSON.stringify(data));try{if(!window.__studyEmpireCloudApplying)window.studyEmpireCloudSync?.push('ai-save')}catch(e){console.warn('Không thể xếp hàng đồng bộ AI',e)}};window.studyEmpireAIGetState=()=>JSON.parse(JSON.stringify(data));window.studyEmpireAISetState=next=>{if(!next||typeof next!=='object')return;data=Object.assign({flashcards:[],exams:[],feedback:[],contributions:{documents:0,achievementPoints:0},claimed:[]},next);save();try{/* AI view rendering disabled; stored data remains available for sync/export. */}catch(e){}};const esc=x=>String(x==null?'':x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));const $=id=>document.getElementById(id);const toast=m=>typeof showToast==='function'?showToast(m):alert(m);
const flashPrompt=`Bạn là một trợ lý giáo dục AI. Hãy chuyển đổi toàn bộ tài liệu thành danh sách Flashcard. Trả về duy nhất JSON hợp lệ, không markdown: {"flashcards":[{"id":1,"front":"Mặt trước","back":"Mặt sau chi tiết","hint":"Gợi ý nếu có"}]}. Không bịa dữ kiện; giữ thuật ngữ, công thức, ví dụ và đáp án trong tài liệu.`;const examPrompt=`Bạn là chuyên gia bóc tách đề thi. Hãy chuyển bài tập và đáp án thành JSON duy nhất: {"exam_title":"Tên bài kiểm tra","total_questions":10,"questions":[{"question_number":1,"question_text":"...","options":["A. ...","B. ...","C. ...","D. ..."],"correct_answer":"A","explanation":"Giải thích"}]}. Chỉ dùng nội dung có trong file, đánh dấu đúng đáp án rõ ràng và không kèm markdown.`;
function addNav(){const old=$('studyAiToolsNav');if(old)old.remove();}

function copy(text){navigator.clipboard?.writeText(text).then(()=>toast('✅ Đã sao chép Prompt AI.')).catch(()=>{prompt('Sao chép Prompt này:',text)})}

function confetti91(){const box=document.createElement('div');box.style='position:fixed;inset:0;pointer-events:none;z-index:100001';for(let i=0;i<18;i++){const q=document.createElement('i');q.textContent=['✦','✧','🍀','•'][i%4];q.style=`position:absolute;left:${45+Math.random()*10}%;top:42%;font-size:${12+Math.random()*12}px;color:${['#f59e0b','#22c55e','#38bdf8','#ec4899'][i%4]};animation:studyAiConfettiFall 900ms ease-out forwards;--dx:${(Math.random()-.5)*260}px`;box.appendChild(q)}document.body.appendChild(box);setTimeout(()=>box.remove(),1000)}
window.studyAiMarkCard=function(i,ok){const el=document.querySelector(`[data-card="${i}"]`);if(!el)return;el.classList.remove('correct','wrong');el.classList.add(ok?'correct':'wrong');const msgs=ok?['Xuất sắc lắm! Kiến thức này đã nằm gọn trong tay bạn! 🍀','Trí nhớ tuyệt vời! Tiếp tục giữ vững phong độ nhé!','Chuẩn không cần chỉnh!']:['Không sao cả, vấp ngã là bước đệm của thành công! Học lại nhé 💚','Thất bại là mẹ thành công, xem lại đáp án chút nào!','Suýt chút nữa là đúng rồi, cố lên bạn ơi!'];toast(msgs[Math.floor(Math.random()*msgs.length)]);if(ok){confetti91();data.contributions.achievementPoints+=2;save()}try{const a=new AudioContext(),o=a.createOscillator(),g=a.createGain();o.frequency.value=ok?880:180;g.gain.value=.04;o.connect(g);g.connect(a.destination);o.start();o.stop(a.currentTime+.12)}catch(e){}};
function importFlash(){try{const x=JSON.parse($('studyAiFlashJson').value);const items=x.flashcards||x;if(!Array.isArray(items)||!items.length)throw Error();data.flashcards.push({id:Date.now(),author:$('studyAiFlashAuthor').value||'Thành viên',sharing:$('studyAiFlashSharing').value,items,createdAt:new Date().toISOString()});save();toast('✅ Đã nhập Flashcard từ JSON AI.')}catch(e){toast('❌ JSON Flashcard chưa hợp lệ. Hãy dán từ dấu { đầu tiên đến dấu } cuối cùng.')}}
function importExam(){try{const x=JSON.parse($('studyAiExamJson').value);if(!Array.isArray(x.questions)||!x.questions.length)throw Error();data.exams.push(Object.assign({},x,{id:Date.now(),author:$('studyAiExamAuthor').value||'Thành viên',sharing:$('studyAiExamSharing').value,createdAt:new Date().toISOString()}));save();toast('✅ Đã nhập đề thi từ JSON AI.')}catch(e){toast('❌ JSON đề thi chưa hợp lệ. Hãy dán đủ cấu trúc exam_title/questions.')}}

window.studyAiGradeExam=function(){const x=window.currentStudyExam;if(!x)return;let correct=0;(x.questions||[]).forEach(q=>{const chosen=document.querySelector(`input[name="studyExam${q.question_number}"]:checked`)?.value;if(chosen===String(q.correct_answer||'').slice(0,1))correct++});const raw=correct/(x.questions.length||1)*100;const pct=Math.max(10,Math.min(100,Math.round(raw/10)*10));const messages={10:'Vạn sự khởi đầu nan! Hãy xem lại đáp án và thử lại nhé! 💚',20:'Đừng nản lòng, từng câu đúng là một bước tiến!',30:'Bạn đã nắm được một phần nền tảng rồi đó!',40:'Ôn lại câu sai, điểm sẽ tăng vọt ngay!',50:'Khá lắm! Bạn đã vượt qua mốc trung bình!',60:'Tiếp tục rèn luyện để bứt phá nhé!',70:'Kết quả rất ấn tượng!',80:'Bạn đã nắm vững hầu hết kiến thức!',90:'Tuyệt đỉnh! Chỉ thiếu một chút nữa thôi!',100:'HOÀN HẢO 100%! Thiên Tài Bách Khoa! 🏆🍀'};data.contributions.achievementPoints+=pct;save();toast(`${pct}% — ${messages[pct]}`);const out=$('studyAiExamResult');if(out)out.innerHTML=`<div class="study-ai-reward"><b>${pct}%</b><p>${messages[pct]}</p><small>Đúng ${correct}/${x.questions.length} câu.</small></div>`}
function renderRewards(){const box=$('studyAiRewards');if(!box)return;const c=data.contributions||{documents:0,achievementPoints:0};const myth=c.documents>=500&&c.achievementPoints>=700,inf=c.documents>=1000&&c.achievementPoints>=900;box.innerHTML=`<p><span class="study-ai-chip">📚 ${c.documents} tài liệu</span><span class="study-ai-chip">🏆 ${c.achievementPoints}/900 điểm thành tích</span></p><div class="study-ai-reward ${myth?'':'muted'}"><b>🌟 Bậc Thần Thoại — Bách Khoa Uy Bác</b><p>Điều kiện: 500 tài liệu + 700 điểm thành tích</p><p>🎖️ Thần Thoại Khai Sáng · hào quang vàng ánh kim, chữ mạ vàng</p>${myth?'✅ Đã đủ điều kiện':'🔒 Chưa đủ điều kiện'}</div><div class="study-ai-reward infinity ${inf?'':'muted'}"><b>♾️ Bậc Vô Cực — Hạo Nhiên Vô Cực</b><p>Điều kiện: 1000 tài liệu + 900/900 điểm thành tích</p><p>🌌 Vô Cực Tinh Anh · Galaxy Glow, Rainbow Gradient</p>${inf?'✅ Đã đủ điều kiện':'🔒 Chưa đủ điều kiện'}</div>`}
window.studyAiAddContribution=function(){data.contributions.documents++;data.contributions.achievementPoints+=1;save();renderRewards();toast('✅ Đã ghi nhận một đóng góp tài liệu và cộng XP/điểm thành tích.')};window.studyAiSubmitFeedback=function(){const text=$('studyAiFeedbackText').value.trim();if(!text)return toast('Hãy nhập nội dung góp ý.');data.feedback.push({id:Date.now(),type:$('studyAiFeedbackType').value,text,author:$('studyAiFeedbackAuthor').value||'Ẩn danh',status:'unread',createdAt:new Date().toISOString()});save();$('studyAiFeedbackText').value='';toast('📮 Đã gửi góp ý tới Hòm thư quản trị.')};
function renderInbox(){const box=$('studyAiInboxList');if(!box)return;box.innerHTML=data.feedback.length?data.feedback.slice().reverse().map(f=>`<div class="study-ai-card"><b>${esc(f.type)} · ${esc(f.author)}</b><p>${esc(f.text)}</p><small>${esc(f.createdAt)} · ${esc(f.status)}</small><button class="btn sm light" onclick="studyAiResolveFeedback(${f.id})">✅ Đánh dấu đã xử lý</button></div>`).join(''):'<p class="muted">Chưa có góp ý mới.</p>'}window.studyAiResolveFeedback=function(id){const f=data.feedback.find(x=>x.id===id);if(f)f.status='resolved';save();renderInbox()};
function buildViews(){['studyAi-flashcards','studyAi-exam','studyAi-contribution'].forEach(id=>$(id)?.remove());}
window.studyAiImportFlash=importFlash;window.studyAiImportExam=importExam;function boot(){buildViews();addNav();if(typeof state!=='undefined'&&state.sessionAuth?.role!=='Founder'){$('studyAiInbox')?.classList.add('muted')}}window.addEventListener('load',boot);setTimeout(boot,500);setTimeout(boot,1500);
})();


/* ---- extracted script block 8: <script id="achievement-900-public-js"> ---- */
(function(){'use strict';
const $=id=>document.getElementById(id), K='study_empire_a900_v1', TOTAL_CONTRIBUTION_POINTS=900, CONTRIBUTION_MILESTONES=[100,300,500,700,900];
const escA=x=>String(x==null?'':x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function ownerA(){return typeof accountOwnerId==='function'?accountOwnerId():state.sessionAuth?.memberId||'guest'}
function ensureA(){state.publicFlashcards=Array.isArray(state.publicFlashcards)?state.publicFlashcards:[];state.publicExams=Array.isArray(state.publicExams)?state.publicExams:[];state.feedbackInbox=Array.isArray(state.feedbackInbox)?state.feedbackInbox:[];state.achievementContribution=state.achievementContribution&&typeof state.achievementContribution==='object'?state.achievementContribution:{};state.achievementContribution[ownerA()]=state.achievementContribution[ownerA()]||{bonus:0,deletedCompensation:0};}
function statsA(id){ensureA();const fs=state.publicFlashcards.filter(x=>String(x.ownerId||x.authorId)===String(id)&&x.deleted!==true&&(x.visibility||'public')==='public'),es=state.publicExams.filter(x=>String(x.ownerId||x.authorId)===String(id)&&x.deleted!==true&&(x.visibility||'public')==='public'),fb=state.feedbackInbox.filter(x=>String(x.ownerId||x.authorId)===String(id)&&['approved','resolved','rewarded'].includes(x.status));const all=fs.length+es.length;const bonus=Number(state.achievementContribution[id]?.bonus||0);const deleted=Number(state.achievementContribution[id]?.deletedCompensation||0);return {flashcards:fs.length,exams:es.length,publicItems:all,feedback:fb.length,bonus,deletedCompensation:deleted,points:Math.min(900,Math.max(0,all*10+fb.length*10+bonus+deleted))}}
function saveA(){if(typeof save==='function')save();else if(typeof saveStateWithoutSession==='function')saveStateWithoutSession()}
const defsA=[
 {id:'a900-fc-1',name:'Nền Tảng Học Liệu',icon:'📚',tier:'Dễ',xp:20,desc:'Công khai 1 bộ Flashcard.',need:s=>s.publicFlashcards>=1,points:20},
 {id:'a900-exam-1',name:'Khai Mở Đề Cương',icon:'📝',tier:'Trung Bình',xp:30,desc:'Công khai 1 đề kiểm tra.',need:s=>s.exams>=1,points:30},
 {id:'a900-fc-10',name:'Tích Tiểu Thành Đại',icon:'🍀',tier:'Khó',xp:50,desc:'Công khai 10 bộ Flashcard/Đề thi.',need:s=>s.publicItems>=10,points:50},
 {id:'a900-feedback',name:'Minh Cảnh Trung Ngôn',icon:'🛠️',tier:'Thử Thách',xp:50,desc:'Gửi 5 góp ý được BQT tiếp nhận.',need:s=>s.feedback>=5,points:50},
 {id:'a900-public-25',name:'Học Liệu Lan Tỏa',icon:'🌱',tier:'Cực Khó',xp:100,desc:'Có 25 học liệu công khai.',need:s=>s.publicItems>=25,points:100},
 {id:'a900-public-50',name:'Nhiệt Huyết Sửa Sang',icon:'✍️',tier:'Ác Mộng',xp:100,desc:'Có 50 học liệu công khai hoặc góp ý được duyệt.',need:s=>s.publicItems+s.feedback>=50,points:100},
 {id:'a900-public-100',name:'Bút Vàng Báo Lỗi',icon:'📜',tier:'Kiệt Xuất',xp:150,desc:'Đóng góp 100 học liệu/góp ý chất lượng.',need:s=>s.publicItems+s.feedback>=100,points:150},
 {id:'a900-mythic',name:'Bách Khoa Uy Bác',icon:'🌟',tier:'Thần Thoại',xp:200,desc:'Mốc Thần Thoại: đạt 500 học liệu đóng góp và 700 điểm thành tích.',need:s=>s.publicItems>=500&&s.points>=700,points:200,role:'Bách Khoa Uy Bác',badge:'Thần Thoại Khai Sáng',effect:'Hào quang vàng ánh kim, chữ mạ vàng.'},
 {id:'a900-mythic-2',name:'Nối Dài Văn Mạch',icon:'💠',tier:'Thần Thoại',xp:50,desc:'Mỗi thành tích Thần Thoại là một Role tiếng Việt riêng.',need:s=>s.publicItems>=700,points:50,role:'Nối Dài Văn Mạch',badge:'Văn Mạch Khai Hoa',effect:'Viền vàng ngọc, nhịp sáng thanh tao.'},
 {id:'a900-infinite',name:'Hạo Nhiên Vô Cực',icon:'♾️',tier:'Vô Cực',xp:100,desc:'Mốc Vô Cực: đạt 1000 đóng góp và 900/900 điểm thành tích.',need:s=>s.publicItems>=1000&&s.points>=900,points:100,role:'Hạo Nhiên Vô Cực',badge:'Vô Cực Tinh Anh',effect:'Galaxy Glow và chữ Rainbow Gradient.'},
 {id:'a900-infinite-2',name:'Nước Chảy Đá Mòn',icon:'🌌',tier:'Vô Cực',xp:50,desc:'Mỗi thành tích Vô Cực là một Role tiếng Việt riêng.',need:s=>s.publicItems>=1200,points:50,role:'Nước Chảy Đá Mòn',badge:'Tinh Hà Bền Chí',effect:'Dải ngân hà lấp lánh, chuyển động chậm.'}
];
const sumA=defsA.reduce((n,x)=>n+x.points,0);defsA[4].points+=TOTAL_CONTRIBUTION_POINTS-sumA;
function groupsA(){return defsA.map(x=>({...x,cond:d=>x.need(statsA(d.ownerId||ownerA()))}));}
function makeRoleA(item){state.customRoles=Array.isArray(state.customRoles)?state.customRoles:[];let r=state.customRoles.find(x=>x.systemKey==='a900-'+item.id);if(r)return r;r={id:(typeof uid==='function'?uid():'a900-'+item.id),systemKey:'a900-'+item.id,achievementId:item.id,name:item.role,icon:item.icon,origin:`Role thưởng cho ${item.name}. Ý nghĩa: ${item.desc}`,vision:'Tôn vinh tinh thần chia sẻ tri thức Việt Nam.',story:item.effect,visibility:'public',color1:item.tier==='Vô Cực'?'#312e81':'#facc15',color2:item.tier==='Vô Cực'?'#ec4899':'#f59e0b',gradientCss:item.tier==='Vô Cực'?'linear-gradient(135deg,#312e81,#06b6d4,#ec4899)':'linear-gradient(135deg,#fde68a,#f59e0b,#fff7cc)',animation:item.tier==='Vô Cực'?'galaxy':'glow',lightPreset:item.tier==='Vô Cực'?'cosmic-float':'mythic-rune',glow:true,createdAt:new Date().toISOString()};state.customRoles.push(r);return r}
function awardA(item){const id=ownerA();if(!id||id==='guest')return;ensureA();const m=(state.membersList||[]).find(x=>String(x.id)===String(id)),a=(state.memberAccounts||[]).find(x=>String(x.memberId)===String(id));if(!m)return;const r=makeRoleA(item);m.customRoleIds=Array.isArray(m.customRoleIds)?m.customRoleIds:[];if(!m.customRoleIds.includes(r.id))m.customRoleIds.push(r.id);if(a){a.customRoleIds=Array.isArray(a.customRoleIds)?a.customRoleIds:[];if(!a.customRoleIds.includes(r.id))a.customRoleIds.push(r.id)}state.achievementBadges=Array.isArray(state.achievementBadges)?state.achievementBadges:[];if(!state.achievementBadges.some(x=>x.ownerId===id&&x.achievementId===item.id))state.achievementBadges.push({ownerId:id,achievementId:item.id,name:item.badge,icon:item.icon,visibility:'public',effect:item.effect})}
function contributionPointsA(){return statsA(ownerA()).points}
window.toggleAContent=function(type,id){ensureA();const arr=type==='flashcard'?state.publicFlashcards:state.publicExams;const x=arr.find(v=>String(v.id)===String(id));if(!x)return;x.visibility=x.visibility==='hidden'?'public':'hidden';saveA();clearAHubUI()};
window.editAContent=function(type,id){ensureA();const arr=type==='flashcard'?state.publicFlashcards:state.publicExams,x=arr.find(v=>String(v.id)===String(id));if(!x)return;const title=prompt('Tên/nội dung mới:',x.title||x.front||x.question||'');if(title===null)return;x.title=title;x.updatedAt=new Date().toISOString();saveA();clearAHubUI()};
window.deleteAContent=function(type,id){ensureA();const arr=type==='flashcard'?state.publicFlashcards:state.publicExams,x=arr.find(v=>String(v.id)===String(id));if(!x)return;if(!confirm('Xóa nội dung? Điểm thành tích đã nhận không mất; hệ thống ghi nhận một khoản bù trừ để khôi phục khi bạn tạo nội dung thay thế.'))return;x.deleted=true;x.deletedAt=new Date().toISOString();const c=state.achievementContribution[ownerA()];c.deletedCompensation=Number(c.deletedCompensation||0)+10;state.feedbackInbox.push({id:'comp-'+Date.now(),type:'system',ownerId:ownerA(),status:'approved',message:'Bù trừ thành tích sau khi xóa nội dung',createdAt:new Date().toISOString()});saveA();clearAHubUI()};
window.exportAContent=function(){ensureA();const blob=new Blob([JSON.stringify({version:'a900-v1',publicFlashcards:state.publicFlashcards,publicExams:state.publicExams,feedbackInbox:state.feedbackInbox,achievementContribution:state.achievementContribution,achievementBadges:state.achievementBadges},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='study-empire-public-content-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)};
function clearAHubUI(){const old=$('a900Hub');if(old)old.remove();}
function injectDefsA(){const old=window.getAchievementDefinitions||((typeof getAchievementDefinitions==='function')?getAchievementDefinitions:null);if(!old||old.__a900)return;window.getAchievementDefinitions=function(){const groups=old.apply(this,arguments).map(g=>({...g,items:[...(g.items||[])]}));const names=new Set(groups.flatMap(g=>g.items).map(x=>x.id));const by=['kho','thu-thach','cuc-kho','ac-mong','kiet-xuat','than-thoai','than-thoai','vo-cuc','vo-cuc'];defsA.forEach((x,i)=>{if(names.has(x.id))return;const g=groups.find(z=>z.id===by[i])||groups[groups.length-1];g.items.push({...x,cond:d=>x.need(statsA(d.ownerId||ownerA()))})});return groups};window.getAchievementDefinitions.__a900=true}
function unlockA(){ensureA();const st=statsA(ownerA());state.unlockedAchievements=Array.isArray(state.unlockedAchievements)?state.unlockedAchievements:[];defsA.forEach(x=>{if(x.need(st)){if(!state.unlockedAchievements.includes(x.id))state.unlockedAchievements.push(x.id);if(x.role)awardA(x)}});saveA()}
const oldCheck=window.checkAchievements;if(oldCheck&&!oldCheck.__a900){window.checkAchievements=function(){const r=oldCheck.apply(this,arguments);unlockA();return r};window.checkAchievements.__a900=true}
function bootA(){injectDefsA();ensureA();unlockA();if(typeof renderAchievementsView==='function')renderAchievementsView()};window.addEventListener('load',()=>setTimeout(bootA,500));setTimeout(bootA,1300);
})();


/* ---- extracted script block 9: <script id="role-requirements-v2-js"> ---- */
(function(){
  const escR=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const owner=()=>state.sessionAuth?.memberId||state.membersList?.find(m=>m.name===state.sessionAuth?.name)?.id||'';
  function playRoleSound(){try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;const c=new C();[523.25,659.25,783.99].forEach((f,i)=>{const o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(.0001,c.currentTime+i*.12);g.gain.exponentialRampToValueAtTime(.09,c.currentTime+i*.12+.02);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+i*.12+.18);o.connect(g);g.connect(c.destination);o.start(c.currentTime+i*.12);o.stop(c.currentTime+i*.12+.2)});setTimeout(()=>c.close(),800)}catch(e){}}
  window.roleReceiveSoundV2=playRoleSound;
  function ensureAdminCollapse(){document.querySelectorAll('#admin .founder-only-admin-card,#admin #adminMotivationCard').forEach((card,idx)=>{if(card.dataset.rqv2==='1')return;card.dataset.rqv2='1';const title=card.querySelector('h2,h3,h4')?.textContent?.trim()||`Mục quản trị ${idx+1}`;const key=card.id==='adminMotivationCard'?'rqv2_admin_motivation':'rqv2_admin_'+idx;const open=localStorage.getItem(key)==='open';card.classList.toggle('rqv2-admin-collapsed',!open);const bar=document.createElement('div');bar.className='rqv2-admin-collapse';bar.innerHTML=`<b>${escR(title)}</b><button type="button" class="btn sm light">${open?'− Thu gọn':'＋ Mở rộng'}</button>`;bar.querySelector('button').onclick=()=>{const next=card.classList.toggle('rqv2-admin-collapsed');localStorage.setItem(key,next?'closed':'open');bar.querySelector('button').textContent=next?'＋ Mở rộng':'− Thu gọn'};card.prepend(bar)});}
  function ensureAIQuick(){const host=document.getElementById('customRolesList');if(!host||document.getElementById('rqv2AIQuick'))return;const box=document.createElement('div');box.id='rqv2AIQuick';box.className='rqv2-ai-card';box.innerHTML=`<b>⚡ Lệnh AI tạo Role — Prompt → Mã lệnh JSON → Tự động tạo Role</b><p class="muted">Bạn chỉ cần mô tả ý tưởng. Hãy sao chép prompt gửi cho AI; sau khi AI trả về mã JSON, dán mã đó vào ô dưới để website tự tạo Role. Không cần nhập thủ công từng trường.</p><textarea id="rqv2Idea" placeholder="Ví dụ: Role dành cho người học bền bỉ, sáng màu xanh ngọc và vàng, có ánh sáng nhẹ..."></textarea><div style="display:flex;gap:7px;flex-wrap:wrap;margin-top:7px"><button type="button" class="btn sm light" onclick="copyFounderRolePromptV2()">📋 Sao chép prompt gửi AI</button><button type="button" class="btn sm light" onclick="openFounderRoleCodeV2()">📥 Dán mã JSON AI</button></div><textarea id="rqv2Json" placeholder="Dán nguyên mã JSON AI trả về vào đây" style="margin-top:8px;display:none"></textarea><button id="rqv2Import" type="button" class="btn sm" style="display:none;margin-top:7px" onclick="importFounderRoleCodeV2()">✨ Tự động tạo Role từ mã lệnh</button>`;host.prepend(box)}
  window.copyFounderRolePromptV2=function(){const idea=document.getElementById('rqv2Idea')?.value.trim()||'Ý tưởng Role do Người sáng lập mô tả';const prompt=`Bạn là AI thiết kế Role cho Study Empire. Hãy biến ý tưởng sau thành một Role hoàn chỉnh, sáng rõ, nổi bật và có chuyển động thật: ${idea}

QUY TẮC BẮT BUỘC: Chỉ trả về DUY NHẤT một JSON hợp lệ, không markdown, không giải thích bên ngoài JSON. Không được bỏ trường nào. Dùng schema chính xác:
{"name":"","icon":"","originType":"founder","origin":"Người sáng lập tạo từ ý tưởng...","color1":"#","color2":"#","textColor":"#ffffff","borderColor":"#","gradientCss":"linear-gradient(135deg,#...,#...,#...) ","style":"Minimal|Mythic|Infinite|Royal|Nature|Cyber|Space|Dark|Geometry","paletteMeaning":"","iconMeaning":"","animation":"glow|pulse|shimmer|wave|sparkle|orbit|float|bounce|bee|none","lightPreset":"none|mythic-rune|cosmic-float|rainbow-prism","speed":6,"strength":1,"direction":"clockwise|counter|vertical|horizontal","glow":true,"glowColor":"#","glowStrength":1,"cornerIcons":["✦","✨","⭐","💫"],"iconPositions":["top-left","top-right","bottom-left","bottom-right"],"iconAnimations":["sparkle","orbit","float","bounce"],"iconCount":4,"iconSize":1,"iconColor":"#","iconBackground":"rgba(15,23,42,.22)","effects":{"animation":"sparkle","style":"Mythic","speed":6,"strength":1,"direction":"clockwise","gradient":true,"glow":true,"glowColor":"#","glowStrength":1,"cornerIcons":["✦","✨","⭐","💫"],"iconPositions":["top-left","top-right","bottom-left","bottom-right"],"iconAnimations":["sparkle","orbit","float","bounce"],"iconCount":4,"iconSize":1,"iconColor":"#","iconBackground":"rgba(15,23,42,.22)"}}.

YÊU CẦU HÌNH ẢNH: cornerIcons phải có ít nhất 4 icon khác nhau; không được rút gọn còn 1 icon. Mỗi icon phải có iconPositions và iconAnimations tương ứng. Phải có gradientCss nhiều màu, animation, tốc độ, hướng, glowColor, glowStrength, iconSize, iconColor và iconBackground. Màu phải sáng, tương phản tốt, có chuyển màu rõ, không dùng toàn bộ màu tối. origin phải ghi rõ nguồn tạo. JSON phải dùng dấu ngoặc kép chuẩn và không có trailing comma.`;navigator.clipboard?.writeText(prompt).then(()=>alert('✅ Đã sao chép prompt đầy đủ. Gửi prompt cho AI, sau đó dán nguyên JSON AI trả về vào website.')).catch(()=>window.prompt('Sao chép prompt này:',prompt))};
  window.openFounderRoleCodeV2=function(){const j=document.getElementById('rqv2Json');if(j){j.style.display='block';document.getElementById('rqv2Import').style.display='inline-block';j.focus()}};
  window.importFounderRoleCodeV2=function(){if(state.sessionAuth?.role!=='Founder')return alert('🔒 Chỉ Người sáng lập web mới được tạo Role.');let raw=document.getElementById('rqv2Json')?.value.trim()||'';try{raw=raw.replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,'');let data=JSON.parse(raw);if(data.role&&typeof data.role==='object')data=data.role;if(!data.name)throw new Error('Thiếu name');const fx=data.effects&&typeof data.effects==='object'?data.effects:{};const icons=Array.isArray(data.cornerIcons)?data.cornerIcons:(Array.isArray(data.icons)?data.icons:(Array.isArray(fx.cornerIcons)?fx.cornerIcons:['✦','✨','⭐','💫']));const cornerIcons=[...new Set(icons.map(String).filter(Boolean))];while(cornerIcons.length<4)cornerIcons.push(['✦','✨','⭐','💫'][cornerIcons.length]);const positions=Array.isArray(data.iconPositions)?data.iconPositions:(Array.isArray(fx.iconPositions)?fx.iconPositions:['top-left','top-right','bottom-left','bottom-right']);const animations=Array.isArray(data.iconAnimations)?data.iconAnimations:(Array.isArray(fx.iconAnimations)?fx.iconAnimations:['sparkle','orbit','float','bounce']);const rich={...data,cornerIcons,iconPositions:positions,iconAnimations:animations,iconCount:Number(data.iconCount||fx.iconCount||cornerIcons.length)||cornerIcons.length,iconSize:Number(data.iconSize||fx.iconSize||1)||1,iconColor:data.iconColor||fx.iconColor||data.glowColor||'#facc15',iconBackground:data.iconBackground||fx.iconBackground||'rgba(15,23,42,.22)',gradientCss:data.gradientCss||data.gradient||'linear-gradient(135deg,#7c3aed,#06b6d4,#facc15)',animation:data.animation||fx.animation||'sparkle',style:data.style||fx.style||'Mythic',speed:Number(data.speed||fx.speed||6)||6,strength:Number(data.strength||fx.strength||1)||1,direction:data.direction||fx.direction||'clockwise',glow:data.glow!==false&&fx.glow!==false,glowColor:data.glowColor||fx.glowColor||data.color2||'#facc15',glowStrength:Number(data.glowStrength||fx.glowStrength||1)||1,effects:{...fx,cornerIcons,iconPositions:positions,iconAnimations:animations,iconCount:cornerIcons.length,iconSize:Number(data.iconSize||fx.iconSize||1)||1,iconColor:data.iconColor||fx.iconColor||'#facc15',iconBackground:data.iconBackground||fx.iconBackground||'rgba(15,23,42,.22)',gradient:true,animation:data.animation||fx.animation||'sparkle',style:data.style||fx.style||'Mythic',speed:Number(data.speed||fx.speed||6)||6,strength:Number(data.strength||fx.strength||1)||1,direction:data.direction||fx.direction||'clockwise',glow:true,glowColor:data.glowColor||fx.glowColor||data.color2||'#facc15',glowStrength:Number(data.glowStrength||fx.glowStrength||1)||1}};let role=(typeof roleSchema==='function'?roleSchema({...rich,id:typeof uid==='function'?uid():'role-'+Date.now(),sourceType:'founder',originType:'founder',founderGift:true,origin:rich.origin||'Do Người sáng lập tạo từ mã lệnh AI',createdAt:new Date().toISOString()}):{...rich,id:'role-'+Date.now(),sourceType:'founder',originType:'founder',founderGift:true});role={...role,...rich,effects:{...rich.effects,...(role.effects||{})},cornerIcons,iconPositions:positions,iconAnimations:animations};state.customRoles=Array.isArray(state.customRoles)?state.customRoles:[];state.customRoles.push(role);if(typeof save==='function')save();renderCustomRoles();renderAdminView?.();alert(`✅ Đã tự động tạo Role ${cornerIcons.join(' ')} ${role.name}. Có ${cornerIcons.length} icon chuyển động và đầy đủ gradient/glow.`);playRoleSound()}catch(e){alert('❌ Mã JSON chưa hợp lệ hoặc thiếu trường bắt buộc. Hãy dán nguyên JSON từ dấu { đầu tiên đến dấu } cuối cùng.')}}
  const oldAdmin=window.renderAdminView;if(typeof oldAdmin==='function'&&!oldAdmin.__rqv2){window.renderAdminView=function(...a){const r=oldAdmin.apply(this,a);setTimeout(ensureAdminCollapse,0);setTimeout(ensureAIQuick,0);return r};window.renderAdminView.__rqv2=true}
  const oldCustom=window.renderCustomRoles;if(typeof oldCustom==='function'&&!oldCustom.__rqv2){window.renderCustomRoles=function(...a){const r=oldCustom.apply(this,a);setTimeout(ensureAIQuick,0);setTimeout(wrapRoleCapsule,0);return r};window.renderCustomRoles.__rqv2=true}
  function boot(){ensureAdminCollapse();ensureAIQuick();wrapRoleCapsule();wrapRoleReceive();document.querySelectorAll('[id*="RoleScale"],[id*="roleScale"],[id*="role-scale"],.role-scale-control,.role-size-control,.role-workshop-scale,.role-workshop-size,.role-size-help').forEach(x=>x.remove())}
  setTimeout(boot,700);setTimeout(boot,1800);
})();




/* ---- extracted script block 11: <script> ---- */
/* Audit metadata only: one unique Role key per Vô Cực/Thần Thoại achievement. */
window.STUDY_EMPIRE_TIER_ROLE_RULE={tierNames:['Vô Cực','Thần Thoại'],oneAchievementOneRole:true,roleKeyPattern:'achievement-role-{achievementId}',effectsSource:'original-pinned-preview'};


/* ---- extracted script block 12: <script id="premium-preview-role-sync-v17"> ---- */
(function(){
'use strict';
if(window.__studyEmpirePreviewRoleSyncV17)return;
window.__studyEmpirePreviewRoleSyncV17=true;
const S={
 'vo-cuc':{tier:'Vô Cực',name:'Người du hành vô cực',icon:'🌌',badge:'Vô Cực Tinh Anh',color1:'#312e81',color2:'#38bdf8',gradientCss:'radial-gradient(circle at 18% 20%,rgba(129,140,248,.95),transparent 20%),radial-gradient(circle at 82% 78%,rgba(236,72,153,.75),transparent 22%),linear-gradient(135deg,#020617,#111827 38%,#312e81 70%,#0f172a)',style:'Space',animation:'none',lightPreset:'cosmic-float',speed:6.8,strength:1.8,size:1,decorColor:'#bfdbfe',decorBg:'rgba(15,23,42,.72)',icons:['✦','🪐','✨','🌟']},
 'than-thoai':{tier:'Thần Thoại',name:'Kẻ gọi ánh sáng',icon:'💠',badge:'Thần Thoại Khai Sáng',color1:'#581c87',color2:'#facc15',gradientCss:'radial-gradient(circle at 22% 22%,rgba(250,204,21,.95),transparent 13%),radial-gradient(circle at 78% 76%,rgba(220,38,38,.78),transparent 22%),linear-gradient(135deg,#09090b,#240b36 42%,#581c87 68%,#713f12)',style:'Mystery',animation:'none',lightPreset:'mythic-rune',speed:4.2,strength:2.5,size:1.08,decorColor:'#fde68a',decorBg:'rgba(24,10,40,.76)',icons:['✧','💎','👑','⚡']}
};
function tier(r){const x=String(r?.tier||'').toLowerCase(),k=String(r?.systemKey||'').toLowerCase(),a=String(r?.achievementId||'').toLowerCase();if(x.includes('vô cực')||x.includes('vo cuc')||k.includes('a900-infinite')||a.includes('a900-infinite'))return 'vo-cuc';if(x.includes('thần thoại')||x.includes('than thoai')||k.includes('a900-mythic')||a.includes('a900-mythic'))return 'than-thoai';return null;}
function canonical(r,t){const s=S[t],q={...(r||{}),tier:s.tier,name:(r?.id&&String(r.id).startsWith('preview-')?s.name:(r?.name||s.name)),icon:s.icon,badge:s.badge,previewBadge:s.badge,color1:s.color1,color2:s.color2,gradientCss:s.gradientCss};q.effects={...(r?.effects||{}),animation:s.animation,style:s.style,lightPreset:s.lightPreset,speed:s.speed,strength:s.strength,size:s.size,direction:'clockwise',gradient:true,glow:true,cornerIcons:[...s.icons],cornerCount:4,decorColor:s.decorColor,decorBg:s.decorBg};return typeof roleSchema==='function'?roleSchema(q):q;}
window.studyEmpirePreviewRoleV17=t=>canonical({id:'preview-'+t,systemKey:'preview-'+t,sourceType:'achievement',visibility:'public'},t==='vo-cuc'?'vo-cuc':'than-thoai');
const old=window.renderRoleCapsule;
if(typeof old==='function'){
 window.renderRoleCapsule=function(r,o){const t=tier(r);return old.call(this,t?canonical(r,t):r,o);};
 try{renderRoleCapsule=window.renderRoleCapsule;}catch(e){}
 const style=document.createElement('style');style.id='premiumPreviewRoleSyncV17Style';style.textContent=`
 .role-premium-sync-v17{background:var(--role-bg)!important;background-image:var(--role-bg)!important;animation:none!important;filter:none!important}
 .role-premium-sync-v17.role-premium-vo-cuc .role-corner-placed{animation:finalCosmicFloat var(--role-speed,6.8s) ease-in-out infinite!important}
 .role-premium-sync-v17.role-premium-than-thoai .role-corner-placed{animation:finalMythicFlicker var(--role-speed,4.2s) ease-in-out infinite!important}
 .role-premium-sync-v17.role-premium-than-thoai .role-capsule-content{animation:finalMythicText 4.2s ease-in-out infinite!important}
 @media(prefers-reduced-motion:reduce){.role-premium-sync-v17,.role-premium-sync-v17 .role-corner-placed,.role-premium-sync-v17 .role-capsule-content{animation:none!important}}
 `;document.head.appendChild(style);
 const wrapped=window.renderRoleCapsule;
 window.renderRoleCapsule=function(r,o){const t=tier(r),h=wrapped.call(this,r,o);if(!t||!h)return h;return h.replace('class="role-capsule ',`class="role-premium-sync-v17 role-premium-${t} role-capsule `);};
 try{renderRoleCapsule=window.renderRoleCapsule;}catch(e){}
}
})();


/* ---- extracted script block 13: <script id="study-empire-supabase-sync-v2"> ---- */
(function(){
  'use strict';
  const CFG={
    url:'https://cuompgnxcbzufaeodgvx.supabase.co',
    rest:'/rest/v1',
    table:'app_state',
    id:'global_state',
    key:'sb_publishable_7aYuYqRgExVRMDGoC-WuQg_vDv18v4L',
    version:2,
    maxRetries:4
  };
  const META='__studyEmpireSync';
  const CLIENT_KEY='studyEmpireSupabaseClientIdV2';
  const SEQ_KEY='studyEmpireSupabaseSeqV2';
  const AI_KEY='studyEmpireAIStudioV1';
  const STATE_KEY='study_momentum_ong_v9';
  const ROLE_SCALE_PREFIX='study_empire_role_scale_';
  const clone=value=>value===undefined?undefined:JSON.parse(JSON.stringify(value));
  const stable=value=>{try{return JSON.stringify(value,(k,v)=>v&&typeof v==='object'&&!Array.isArray(v)?Object.keys(v).sort().reduce((o,key)=>(o[key]=v[key],o),{}):v)}catch(e){return String(value)}};
  const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
  let clientId=localStorage.getItem(CLIENT_KEY);
  if(!clientId){clientId='client-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,10);localStorage.setItem(CLIENT_KEY,clientId)}
  let seq=Number(localStorage.getItem(SEQ_KEY)||0);
  let bootPromise=null;
  let inflight=null;
  let pending=null;
  let lastSyncedState=null;
  let lastSyncedExternal=null;
  let lastCloudEnvelope=null;

  /* Bổ sung metadata cho bản ghi cũ mà không thay đổi nội dung hay xóa dữ liệu.
     createdAt/updatedAt giúp merge theo từng bản ghi ổn định hơn sau reload. */
  function normalizeUserDataTimestamps(){
    const now=new Date().toISOString();
    let changed=false;
    const normalizeRows=(rows,fallback)=>{
      if(!Array.isArray(rows))return;
      rows.forEach(row=>{
        if(!row||typeof row!=='object')return;
        const created=row.createdAt||row.updatedAt||fallback;
        if(!row.createdAt){row.createdAt=created;changed=true;}
        if(!row.updatedAt){row.updatedAt=row.createdAt||fallback;changed=true;}
      });
    };
    normalizeRows(state.todos,now);
    Object.values(state.habits||{}).forEach(rows=>normalizeRows(rows,now));
    Object.values(state.userData?.accounts||{}).forEach(bucket=>{
      const savedAt=Number(bucket?._lastSavedAt||0);
      const fallback=savedAt>0?new Date(savedAt).toISOString():now;
      normalizeRows(bucket?.todos,fallback);
      Object.values(bucket?.habits||{}).forEach(rows=>normalizeRows(rows,fallback));
    });
    return changed;
  }

  function headers(extra){return Object.assign({apikey:CFG.key,Authorization:'Bearer '+CFG.key,'Content-Type':'application/json',Accept:'application/json'},extra||{})}
  function endpoint(){return CFG.url+CFG.rest+'/'+CFG.table}
  function stripSession(value){const copy=clone(value)||{};delete copy.sessionAuth;delete copy[META];return copy}
  function externalStores(){
    let ai=null;
    try{ai=JSON.parse(localStorage.getItem(AI_KEY)||'null')}catch(e){ai=null}
    const roleScales={};const localExtras={};
    const excluded=new Set([STATE_KEY,CLIENT_KEY,SEQ_KEY,AI_KEY]);
    try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(!k||excluded.has(k))continue;if(k.indexOf(ROLE_SCALE_PREFIX)===0)roleScales[k]=localStorage.getItem(k);else localExtras[k]=localStorage.getItem(k)}}catch(e){}
    return {aiStudio:ai,roleScales,localExtras};
  }
  function applyExternalStores(ext){
    if(!ext||typeof ext!=='object')return;
    window.__studyEmpireCloudApplying=true;
    try{
      if(ext.aiStudio&&typeof window.studyEmpireAISetState==='function')window.studyEmpireAISetState(ext.aiStudio);
      else if(ext.aiStudio)localStorage.setItem(AI_KEY,JSON.stringify(ext.aiStudio));
      Object.entries(ext.roleScales||{}).forEach(([k,v])=>localStorage.setItem(k,String(v)));
      Object.entries(ext.localExtras||{}).forEach(([k,v])=>{if(![STATE_KEY,CLIENT_KEY,SEQ_KEY,AI_KEY].includes(k))localStorage.setItem(k,String(v))});
    }catch(e){console.warn('☁️ Không thể áp dụng kho dữ liệu ngoài state',e)}
    finally{window.__studyEmpireCloudApplying=false}
  }
  function makeSnapshot(){
    normalizeUserDataTimestamps();
    const current=stripSession(state);
    const external=externalStores();
    seq+=1;localStorage.setItem(SEQ_KEY,String(seq));
    const snapshot={state:current,external,meta:{version:CFG.version,clientId,seq,savedAt:new Date().toISOString()}};
    try{window.studyEmpireAutoBackup?.captureSnapshot(snapshot,'before-cloud-write')}catch(e){}
    return snapshot;
  }
  function unwrap(payload){
    const copy=clone(payload)||{};
    const meta=copy[META]&&typeof copy[META]==='object'?copy[META]:{};
    delete copy[META];
    return {state:copy,external:meta.externalStores||null,meta};
  }
  function isEmpty(value){
    if(value===null||value===undefined||value==='')return true;
    if(typeof value==='number')return value===0;
    if(Array.isArray(value))return value.length===0;
    if(typeof value==='object')return Object.keys(value).length===0;
    return false;
  }
  function mergeAccountStores(local,remote){
    const la=local&&local.accounts&&typeof local.accounts==='object'?local.accounts:{};
    const ra=remote&&remote.accounts&&typeof remote.accounts==='object'?remote.accounts:{};
    const accounts=Object.assign({},ra);
    const listKeys=['todos','schedules','sessions','journals','moods','moments','adminStudyTimes','privateXPHistory','questClaims'];
    const stampOf=value=>{const raw=value?.updatedAt||value?.modifiedAt||value?.completedAt||value?.createdAt||'';const stamp=Date.parse(raw);return Number.isFinite(stamp)?stamp:0;};
    const keyOf=(value,index)=>String(value?.id??value?.key??value?.date??`${typeof value}:${value}:${index}`);
    const mergeList=(localValue,remoteValue,deletedIds)=>{const map=new Map();[...(Array.isArray(remoteValue)?remoteValue:[]),...(Array.isArray(localValue)?localValue:[])].forEach((value,index)=>{if(value===undefined||value===null)return;const key=keyOf(value,index),old=map.get(key);if(!old||stampOf(value)>=stampOf(old))map.set(key,clone(value));});return [...map.values()].filter(value=>!deletedIds.has(String(value?.id??value?.key??'')));};
    const mergeHabitMaps=(localValue,remoteValue,deletedIds)=>{const out={},months=new Set([...Object.keys(remoteValue||{}),...Object.keys(localValue||{})]);months.forEach(month=>{out[month]=mergeList(localValue?.[month],remoteValue?.[month],deletedIds);});return out;};
    const trashIds=bucket=>new Set(Object.values(bucket?.trash||{}).flatMap(rows=>Array.isArray(rows)?rows:[]).map(item=>String(item?.id??item?.key??'')).filter(Boolean));
    const mergeBucket=(bucket,old)=>{const localStamp=Number(bucket?._lastSavedAt||0),remoteStamp=Number(old?._lastSavedAt||0),merged=localStamp>=remoteStamp?{...old,...bucket}:{...bucket,...old},deletedIds=new Set([...trashIds(bucket),...trashIds(old)]);listKeys.forEach(key=>{merged[key]=mergeList(bucket?.[key],old?.[key],deletedIds);});merged.habits=mergeHabitMaps(bucket?.habits,old?.habits,deletedIds);if(localStamp||remoteStamp)merged._lastSavedAt=Math.max(localStamp,remoteStamp);return merged;};
    Object.entries(la).forEach(([id,bucket])=>{const old=accounts[id];accounts[id]=old?mergeBucket(bucket,old):clone(bucket);});
    const out=Object.assign({},remote||{},local&&local._initialized?{_initialized:local._initialized}:{});out.accounts=accounts;return out;
  }
  function mergeInitial(remoteState,localState,remoteExternal,localExternal){
    const remote=clone(remoteState)||{};const local=clone(localState)||{};const out=Object.assign({},remote);
    Object.keys(local).forEach(key=>{if(key==='sessionAuth')return;if(!(key in remote)||isEmpty(remote[key])&&!isEmpty(local[key]))out[key]=local[key]});
    if(local.userData||remote.userData)out.userData=mergeAccountStores(local.userData,remote.userData);
    const ext=Object.assign({},remoteExternal||{});
    if(!ext.aiStudio&&localExternal?.aiStudio)ext.aiStudio=localExternal.aiStudio;
    if(!ext.roleScales||Object.keys(ext.roleScales).length===0)ext.roleScales=localExternal?.roleScales||{};
    return {state:out,external:ext};
  }
  function mergeForWrite(remotePayload,snapshot){
    const remote=unwrap(remotePayload);const local=snapshot;
    const out=Object.assign({},remote.state||{});
    const baseline=lastSyncedState||{};
    const all=new Set([...Object.keys(remote.state||{}),...Object.keys(local.state||{})]);
    all.forEach(key=>{
      if(key==='sessionAuth')return;
      const localChanged=lastSyncedState===null||stable(local.state[key])!==stable(baseline[key]);
      if(localChanged&&key in local.state)out[key]=clone(local.state[key]);
      else if(!(key in out)&&key in local.state)out[key]=clone(local.state[key]);
    });
    if(local.state.userData||remote.state.userData){
      const localChanged=lastSyncedState===null||stable(local.state.userData)!==stable(baseline.userData);
      out.userData=localChanged?mergeAccountStores(local.state.userData,remote.state.userData):clone(remote.state.userData||local.state.userData);
    }
    const localExternal=local.external||{};const remoteExternal=remote.external||{};const baseExternal=lastSyncedExternal||{};
    const external={};
    external.aiStudio=(lastSyncedExternal===null||stable(localExternal.aiStudio)!==stable(baseExternal.aiStudio))?localExternal.aiStudio:(remoteExternal.aiStudio??localExternal.aiStudio);
    external.roleScales=(lastSyncedExternal===null||stable(localExternal.roleScales)!==stable(baseExternal.roleScales))?localExternal.roleScales:(remoteExternal.roleScales??localExternal.roleScales);
    external.localExtras=(lastSyncedExternal===null||stable(localExternal.localExtras)!==stable(baseExternal.localExtras))?localExternal.localExtras:(remoteExternal.localExtras??localExternal.localExtras);
    out[META]=Object.assign({},snapshot.meta,{externalStores:external,mergedAt:new Date().toISOString()});
    return out;
  }
  async function request(url,options,attempts=CFG.maxRetries){
    let error=null;
    for(let i=0;i<attempts;i++){
      try{
        const res=await fetch(url,options);
        if(res.ok)return res;
        const body=await res.text();
        error=new Error('HTTP '+res.status+(body?' '+body.slice(0,300):''));
        if(res.status>=400&&res.status<500&&res.status!==409&&res.status!==408&&res.status!==429)break;
      }catch(e){error=e}
      await sleep(Math.min(9000,500*Math.pow(2,i)));
    }
    throw error||new Error('Supabase request failed');
  }
  async function readEnvelope(){
    const url=endpoint()+'?id=eq.'+encodeURIComponent(CFG.id)+'&select=payload';
    const res=await request(url,{method:'GET',headers:headers(),cache:'no-store'});
    const rows=await res.json();
    return Array.isArray(rows)&&rows[0]&&rows[0].payload?rows[0].payload:null;
  }
  function applyState(next){
    const session=state.sessionAuth;
    Object.keys(state).forEach(k=>delete state[k]);
    Object.assign(state,clone(next)||{});
    state.sessionAuth=session||null;
    try{ensureUserStore()}catch(e){}
    try{saveStateWithoutSession()}catch(e){}
  }
  async function pull(){
    if(bootPromise)return bootPromise;
    bootPromise=(async()=>{
      try{
        try{window.studyEmpireAutoBackup?.captureCurrent('before-cloud-pull')}catch(e){}
        const localState=stripSession(state);const localExternal=externalStores();
        const payload=await readEnvelope();
        if(!payload){console.warn('☁️ Supabase chưa có global_state.');return false}
        const remote=unwrap(payload);lastCloudEnvelope=payload;lastSyncedState=clone(remote.state);lastSyncedExternal=clone(remote.external);
        const merged=mergeInitial(remote.state,localState,remote.external,localExternal);
        applyState(merged.state);applyExternalStores(merged.external);
        const repaired=normalizeUserDataTimestamps();
        if(repaired)saveStateWithoutSession();
        const needsPush=stable(state)!==stable(remote.state)||stable(merged.external)!==stable(remote.external);
        if(needsPush)pending=makeSnapshot();
        console.log('☁️ Supabase V2: đã tải toàn bộ state trước khi render.');
        if(needsPush)flush();
        return true;
      }catch(e){console.warn('☁️ Supabase V2: lỗi tải dữ liệu',e);return false}
    })();
    return bootPromise;
  }
  async function create(){
    try{
      const snapshot=makeSnapshot();
      const res=await request(endpoint(),{method:'POST',headers:headers({Prefer:'return=minimal'}),body:JSON.stringify({id:CFG.id,payload:Object.assign({},snapshot.state,{[META]:Object.assign({},snapshot.meta,{externalStores:snapshot.external})})})});
      lastSyncedState=clone(snapshot.state);lastSyncedExternal=clone(snapshot.external);
      console.log('☁️ Supabase V2: đã tạo global_state.');return !!res;
    }catch(e){console.warn('☁️ Supabase V2: lỗi tạo global_state',e);return false}
  }
  async function flush(){
    if(inflight)return inflight;
    if(!pending)return true;
    const snapshot=pending;pending=null;
    inflight=(async()=>{
      try{
        const url=endpoint()+'?id=eq.'+encodeURIComponent(CFG.id);
        let finalPayload=null;
        for(let attempt=0;attempt<2;attempt++){
          const remotePayload=await readEnvelope();
          const payload=mergeForWrite(remotePayload||{},snapshot);
          const res=await request(url,{method:'PATCH',headers:headers({Prefer:'return=minimal'}),body:JSON.stringify({payload})});
          if(!res.ok)throw new Error('PATCH không thành công');
          finalPayload=payload;

          // Đọc xác nhận để phát hiện race: thiết bị khác có thể đã PATCH sau
          // lần đọc đầu tiên và làm mất một phần snapshot local. Khi đó,
          // cập nhật baseline theo cloud mới nhất rồi rebase/retry một lần.
          const verifiedPayload=await readEnvelope();
          const verified=unwrap(verifiedPayload||payload);
          const rebased=mergeForWrite(verifiedPayload||payload,snapshot);
          const conflict=stable(verified.state)!==stable(rebased.state)||stable(verified.external)!==stable(rebased.external);
          if(!conflict||attempt===1){finalPayload=verifiedPayload||payload;break;}
          lastSyncedState=clone(verified.state);lastSyncedExternal=clone(verified.external);
        }
        const applied=unwrap(finalPayload||{});lastSyncedState=clone(applied.state);lastSyncedExternal=clone(applied.external);lastCloudEnvelope=finalPayload;
        try{window.studyEmpireAutoBackup?.captureSnapshot({state:applied.state,external:applied.external,meta:applied.meta},'after-cloud-write')}catch(e){}
        console.log('☁️ Supabase V2: đã lưu toàn bộ state và kho ngoài.');return true;
      }catch(e){pending=snapshot;console.warn('☁️ Supabase V2: lưu thất bại, sẽ giữ hàng đợi để thử lại',e);return false}
    })().finally(()=>{inflight=null;if(pending)setTimeout(flush,0)});
    return inflight;
  }
  function push(reason){
    pending=makeSnapshot();
    return flush();
  }
  window.studyEmpireCloudSync={pull,push,create,flush,pushExternal:()=>push('external'),status:()=>({pending:!!pending,inflight:!!inflight,lastSyncedAt:lastCloudEnvelope?.__studyEmpireSync?.mergedAt||null})};
})();

/* ---- automatic local backup before/after Supabase synchronization ---- */
(function(){
  'use strict';
  if(window.__studyEmpireAutoBackupV1)return;
  window.__studyEmpireAutoBackupV1=true;
  const DB_NAME='study_empire_auto_backup_v1',STORE='snapshots',FALLBACK_KEY='study_empire_auto_backups_v1',MAX=12;
  const clone=value=>value===undefined?undefined:JSON.parse(JSON.stringify(value));
  const stamp=()=>new Date().toISOString();
  const safeState=()=>{const current=window.studyEmpireStateAccess?.get?.()||{};const copy=clone(current);if(copy)delete copy.sessionAuth;return copy||{};};
  const fallbackRead=()=>{try{const rows=JSON.parse(localStorage.getItem(FALLBACK_KEY)||'[]');return Array.isArray(rows)?rows:[];}catch(e){return[];}};
  const fallbackWrite=rows=>{try{localStorage.setItem(FALLBACK_KEY,JSON.stringify(rows.slice(0,MAX)));}catch(e){console.warn('💾 Không thể lưu backup dự phòng trong trình duyệt',e);}};
  let dbPromise=null;
  function openDb(){
    if(dbPromise)return dbPromise;
    if(!window.indexedDB)return Promise.resolve(null);
    dbPromise=new Promise(resolve=>{try{const req=indexedDB.open(DB_NAME,1);req.onupgradeneeded=()=>{const db=req.result;if(!db.objectStoreNames.contains(STORE)){const s=db.createObjectStore(STORE,{keyPath:'id'});s.createIndex('savedAt','savedAt');}};req.onsuccess=()=>resolve(req.result);req.onerror=()=>resolve(null);}catch(e){resolve(null);}});
    return dbPromise;
  }
  async function list(){
    const db=await openDb();
    if(!db)return fallbackRead().sort((a,b)=>String(b.savedAt).localeCompare(String(a.savedAt)));
    return new Promise(resolve=>{try{const tx=db.transaction(STORE,'readonly'),req=tx.objectStore(STORE).getAll();req.onsuccess=()=>resolve((req.result||[]).sort((a,b)=>String(b.savedAt).localeCompare(String(a.savedAt))));req.onerror=()=>resolve(fallbackRead());}catch(e){resolve(fallbackRead());}});
  }
  async function prune(db){
    const rows=await list();
    if(rows.length<=MAX)return;
    const remove=rows.slice(MAX).map(x=>x.id);
    if(!db){fallbackWrite(rows.slice(0,MAX));return;}
    try{const tx=db.transaction(STORE,'readwrite'),store=tx.objectStore(STORE);remove.forEach(id=>store.delete(id));}catch(e){}
  }
  async function put(snapshot){
    const db=await openDb();
    if(!db){const rows=fallbackRead().filter(x=>x.id!==snapshot.id);rows.unshift(snapshot);fallbackWrite(rows);return snapshot;}
    try{await new Promise((resolve,reject)=>{const tx=db.transaction(STORE,'readwrite');tx.objectStore(STORE).put(snapshot);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});await prune(db);}catch(e){const rows=fallbackRead().filter(x=>x.id!==snapshot.id);rows.unshift(snapshot);fallbackWrite(rows);}
    return snapshot;
  }
  function makeSnapshot(input,reason){
    const source=input&&input.state?input.state:safeState();
    const snapshot={id:`backup-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,savedAt:stamp(),reason:reason||'automatic',state:clone(source)||{},external:clone(input?.external||null),syncMeta:clone(input?.meta||null),format:'study-empire-auto-backup-v1'};
    return snapshot;
  }
  function captureSnapshot(input,reason){const snapshot=makeSnapshot(input,reason);return put(snapshot).then(result=>{renderList();return result;}).catch(()=>snapshot);}
  function captureCurrent(reason){return captureSnapshot(null,reason);}
  function download(snapshot){
    if(!snapshot)return alert('Chưa có bản sao tự động nào để tải xuống.');
    const blob=new Blob([JSON.stringify(snapshot,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`goc-nho-cua-ong-auto-backup-${snapshot.savedAt.slice(0,19).replace(/[:T]/g,'-')}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
  }
  async function downloadLatest(){const rows=await list();download(rows[0]);}
  function applyExternal(external){
    if(!external||typeof external!=='object')return;
    Object.entries(external.localExtras||{}).forEach(([key,value])=>{if(!['study_momentum_ong_v9','studyEmpireSupabaseClientIdV2','studyEmpireSupabaseSeqV2','studyEmpireAIStudioV1'].includes(key))localStorage.setItem(key,String(value));});
  }
  function restore(snapshot){
    if(!snapshot||!snapshot.state||typeof snapshot.state!=='object')return alert('File backup không hợp lệ hoặc thiếu dữ liệu ứng dụng.');
    if(!confirm(`Khôi phục bản sao ngày ${new Date(snapshot.savedAt||Date.now()).toLocaleString('vi-VN')}? Dữ liệu hiện tại sẽ được lưu thêm một bản sao trước khi khôi phục.`))return;
    captureCurrent('before-restore');
    const current=window.studyEmpireStateAccess?.get?.()||{};const session=current.sessionAuth||null;window.studyEmpireStateAccess?.replace?.(snapshot.state);const restored=window.studyEmpireStateAccess?.get?.();if(restored)restored.sessionAuth=session;
    try{window.ensureUserStore?.();applyExternal(snapshot.external);window.saveStateWithoutSession?.();window.renderAll?.();window.studyEmpireCloudSync?.push('restore-backup');}catch(e){console.error('Khôi phục backup thất bại',e);alert('Không thể khôi phục backup. Dữ liệu hiện tại chưa được xóa khỏi bản sao tự động.');return;}
    alert('✅ Đã khôi phục bản sao tự động. Hệ thống đã xếp hàng đồng bộ lại với Supabase.');renderList();
  }
  function restorePrompt(){const input=document.createElement('input');input.type='file';input.accept='application/json,.json';input.onchange=async()=>{const file=input.files?.[0];if(!file)return;try{restore(JSON.parse(await file.text()));}catch(e){alert('File backup không đọc được.');}};input.click();}
  async function renderList(){const host=document.getElementById('autoBackupStatus');if(!host)return;const rows=await list();const latest=rows[0];host.innerHTML=latest?`✅ Bản sao gần nhất: ${new Date(latest.savedAt).toLocaleString('vi-VN')} · ${rows.length} bản đang giữ trong trình duyệt`:'Chưa có bản sao tự động. Bản đầu tiên sẽ tạo trước lần đồng bộ Supabase kế tiếp.';const listHost=document.getElementById('autoBackupList');if(listHost)listHost.innerHTML=rows.slice(0,5).map(x=>`<div class="kpi">💾 ${new Date(x.savedAt).toLocaleString('vi-VN')} · ${x.reason||'automatic'} <button class="btn light sm" onclick="window.studyEmpireAutoBackup.downloadById('${x.id}')">Tải xuống</button></div>`).join('');}
  async function downloadById(id){const row=(await list()).find(x=>x.id===id);download(row);}
  window.studyEmpireAutoBackup={captureSnapshot,captureCurrent,list,downloadLatest,downloadById,restorePrompt,restore,render:renderList};
  window.addEventListener('pagehide',()=>{try{captureCurrent('before-pagehide');}catch(e){}});
  window.addEventListener('DOMContentLoaded',()=>setTimeout(renderList,0));
  setTimeout(renderList,0);
})();


/* ---- extracted script block 14: <script id="achievement-pomodoro-correction-v1"> ---- */
(function(){
  'use strict';
  function achievementCorrectionIsPomodoroSession(x){return !!(x&&((x.source==='pomodoro')||(x.kind==='pomodoro')||(x.isPomodoro===true)));}
  function achievementCorrectionIsAchievementRole(r){return !!(r&&(r.sourceType==='achievement'||r.achievementId||String(r.systemKey||'').startsWith('achievement')));}
  function achievementCorrectionIsPremiumRole(r){
    if(!achievementCorrectionIsAchievementRole(r))return true;
    const raw=String(r?.tier||r?.difficulty||r?.name||r?.achievementId||'').toLowerCase();
    if(raw.includes('vô cực')||raw.includes('vo cuc')||raw.includes('thần thoại')||raw.includes('than thoai'))return true;
    const m=raw.match(/hard(\d+)/i),n=m?Number(m[1]):NaN;
    return Number.isFinite(n)&&n>=711&&n<=900;
  }
  function achievementCorrectionLiveUnlocked(ownerId){
    const id=String(ownerId||''); if(!id)return new Set();
    try{
      const scoped=getOwnerScopedData(id), activityDates=collectCurrentActivityDates(id), streaks=calculateStreaksFromDates(activityDates), base=calculateBaseXP(id);
      const studyMinutes=getOfficialStudyMinutesForOwner(id);
      const completedTasks=scoped.todos.filter(t=>t.done&&(!t.ownerId||String(t.ownerId)===id)).length;
      const allTasks=scoped.todos.filter(t=>!t.ownerId||String(t.ownerId)===id).length;
      const habitEntries=Object.values(scoped.habits||{}).flat().filter(h=>!h.ownerId||String(h.ownerId)===id);
      const snapshot={...state,...scoped,sessions:scoped.sessions.filter(x=>!(x&&((x.source==='pomodoro')||(x.kind==='pomodoro')||(x.isPomodoro===true)))),xp:base.baseXP,studyMinutes,adminStudyTimes:getStudyRowsForOwner(id),activityDates,activities:activityDates.length,bestStreak:streaks.best,streak:streaks.current,todos:scoped.todos,habits:scoped.habits};
      const defs=getAchievementDefinitions().flatMap(g=>g.items||[]).filter(a=>a.id!=='__xp_history__');
      let xp=base.baseXP,unlocked=[];
      for(let pass=0;pass<defs.length+2;pass++){
        const before=xp; snapshot.xp=xp;
        unlocked=defs.filter(a=>{try{return !!a.cond(snapshot)}catch(e){return false}}).map(a=>a.id);
        xp=base.baseXP+defs.filter(a=>unlocked.includes(a.id)).reduce((sum,a)=>sum+Math.max(0,Number(a.xp)||0),0);
        if(xp===before)break;
      }
      return new Set(unlocked);
    }catch(e){
      console.warn('Achievement live-state correction skipped',e);
      return new Set(Array.isArray(getProgressRecord(id)?.unlockedAchievements)?getProgressRecord(id).unlockedAchievements:[]);
    }
  }
  window.achievementCorrectionLiveUnlocked=achievementCorrectionLiveUnlocked;
  window.achievementCorrectionIsAchievementRole=achievementCorrectionIsAchievementRole;

  const oldRenderProfileAchievementBadges=window.renderProfileAchievementBadges;
  window.renderProfileAchievementBadges=function(){
    const box=document.getElementById('profileAchievementBadges'),prefsBox=document.getElementById('profileBadgePrivacy'),zoneBox=document.getElementById('profileZoneBadges'),ownerId=accountOwnerId();
    if(!ownerId){if(typeof oldRenderProfileAchievementBadges==='function')return oldRenderProfileAchievementBadges.apply(this,arguments);return;}
    const live=achievementCorrectionLiveUnlocked(ownerId),all=getAllAchievements(),unlocked=all.filter(a=>live.has(a.id));
    state.achievementBadgePrefs=state.achievementBadgePrefs||{};state.achievementBadgePrefs[ownerId]=state.achievementBadgePrefs[ownerId]||{};
    if(box)box.innerHTML=unlocked.map(a=>{const on=state.achievementBadgePrefs[ownerId][a.id]===true;return `<span class="tag" style="font-size:18px;padding:6px 9px;opacity:${on?1:.55}" title="${esc(a.name)} — ${on?'Công khai':'Riêng tư'}">${a.icon||'🏆'}${on?'':'🔒'}</span>`}).join('')||'<span class="muted">Chưa có huy hiệu thành tích.</span>';
    if(prefsBox)prefsBox.innerHTML=unlocked.length?unlocked.map(a=>{const on=state.achievementBadgePrefs[ownerId][a.id]===true;return `<label style="display:flex;align-items:center;gap:8px"><input type="checkbox" style="width:18px" ${on?'checked':''} onchange="toggleAchievementBadgePublic('${a.id}',this.checked)"> ${a.icon||'🏆'} ${esc(a.name)} — ${on?'🌍 Công khai':'🔒 Riêng tư'}</label>`}).join(''):'<span class="muted">Khi mở khóa thành tích, bạn sẽ có thể bật/tắt từng huy hiệu.</span>';
    const z=ownerZoneStore(ownerId);if(zoneBox)zoneBox.innerHTML=(z.zones||[]).filter(x=>!x.achievementId||live.has(String(x.achievementId))).map(x=>`<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap"><span class="tag" style="background:linear-gradient(135deg,${x.color1||'#c8e6c9'},${x.color2||x.color1||'#81c784'});font-size:16px" title="Zone ${esc(x.name)}">${x.icon||'✨'} ${esc(x.name)}</span><label class="muted"><input type="checkbox" style="width:18px" ${(z.publicZones||{})[x.name]===true?'checked':''} onchange="toggleZonePublic('${esc(x.name)}',this.checked)"> 🌍 Công khai</label></div>`).join('')||'<span class="muted">Chưa nhận Zone.</span>';
  };

  const oldRenderPublicAchievementBadges=window.renderPublicAchievementBadges;
  window.renderPublicAchievementBadges=function(memberId){
    const prefs=(state.achievementBadgePrefs||{})[memberId]||{},live=achievementCorrectionLiveUnlocked(memberId),all=getAllAchievements(),visible=[...live].filter(id=>prefs[id]===true);
    return '<span style="display:inline-flex;gap:4px;flex-wrap:wrap;margin-left:5px">'+visible.map(id=>{const a=all.find(x=>x.id===id);return a?`<span class="tag" title="${esc(a.name)} — bấm để xem nguồn gốc" style="font-size:15px;padding:3px 6px;cursor:pointer" onclick="openAchievementDetail('${id}')">${a.icon||'🏆'}</span>`:''}).join('')+'</span>';
  };

  const oldRenderRoleBadges=window.renderRoleBadges;
  window.renderRoleBadges=function(memberId){
    const allRoles=(getCustomRolesForMember(memberId)||[]),live=achievementCorrectionLiveUnlocked(memberId),roles=allRoles.filter(r=>achievementCorrectionIsPremiumRole(r)&&(!achievementCorrectionIsAchievementRole(r)||live.has(String(r.achievementId))));
    if(!roles.length)return '';
    const primaryId=state.rolePrimaryRoles?.[String(memberId)]||'';roles.sort((a,b)=>(String(a.id)===String(primaryId)?-1:0)-(String(b.id)===String(primaryId)?-1:0));
    const key='study_empire_role_scale_'+String(memberId),scale=Math.max(.55,Math.min(1.15,Number(localStorage.getItem(key)||.72)));
    return `<span class="member-role-stack leaderboard-role-origin-group" data-member-role-id="${esc(String(memberId))}" style="--member-role-scale:${scale}">${roles.map(r=>`<button type="button" class="leaderboard-role-origin-btn" data-role-id="${esc(String(r.id))}" aria-label="Mở nguồn gốc Role ${esc(r.name||'Role')}" title="Bấm hoặc nhấn Enter để xem nguồn gốc" onclick="window.openRoleOriginV16(this.dataset.roleId)">${typeof window.renderRoleCapsule==='function'?window.renderRoleCapsule(r,{publicMode:true}):`<span class="tag">${esc(r.icon||'🎭')} ${esc(r.name||'Role')}</span>`}</button>`).join('')}</span>`;
  };

  const oldRenderAchievementsView=window.renderAchievementsView;
  if(typeof oldRenderAchievementsView==='function'){
    window.renderAchievementsView=function(){
      const id=accountOwnerId(),old=Array.isArray(state.unlockedAchievements)?state.unlockedAchievements:null,live=achievementCorrectionLiveUnlocked(id);
      try{if(id)state.unlockedAchievements=[...live];return oldRenderAchievementsView.apply(this,arguments);}finally{if(old)state.unlockedAchievements=old;}
    };
  }

  const oldOpenAchievementDetail=window.openAchievementDetail;
  if(typeof oldOpenAchievementDetail==='function'){
    window.openAchievementDetail=function(id){
      const ownerId=accountOwnerId(),rec=ownerId?getProgressRecord(ownerId):null,old=rec&&Array.isArray(rec.unlockedAchievements)?rec.unlockedAchievements:null,live=achievementCorrectionLiveUnlocked(ownerId);
      try{if(rec)rec.unlockedAchievements=[...live];return oldOpenAchievementDetail.apply(this,arguments);}finally{if(rec&&old)rec.unlockedAchievements=old;}
    };
  }

  // V13/V14 panels were superseded by the final V16 panel; hide duplicates so stale legacy rows cannot pile up in Profile.
  const hideLegacyRolePanels=()=>{['myRoleVisibilityV13','myRoleVisibilityV14'].forEach(id=>{const el=document.getElementById(id);if(el)el.style.display='none';});};
  const oldRenderProfileView=window.renderProfileView;
  if(typeof oldRenderProfileView==='function')window.renderProfileView=function(){const result=oldRenderProfileView.apply(this,arguments);setTimeout(hideLegacyRolePanels,0);return result;};
  setTimeout(hideLegacyRolePanels,0);
})();


/* ---- extracted script block 15: <script id="study-empire-history-ui-v21"> ---- */
(function(){
  'use strict';
  if(window.__studyEmpireHistoryUIV21)return;
  window.__studyEmpireHistoryUIV21=true;
  const escV21 = typeof window.esc==='function' ? window.esc : (v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])));
  const valV21=v=>v===null||v===undefined||String(v).trim()===''?'Chưa ghi nhận':String(v);
  const datePartsV21=d=>{const m=String(d||'').match(/^(\d{4})-(\d{2})-(\d{2})$/);return m?{iso:m[0],year:m[1],month:Number(m[2]),day:Number(m[3])}:{iso:String(d||''),year:'',month:'',day:String(d||'')};};
  const dateLabelV21=d=>{const x=datePartsV21(d);return x.year?`${x.day} tháng ${x.month}, ${x.year}`:x.iso||'Chưa có ngày';};
  const dateSubV21=d=>{const x=datePartsV21(d);return x.year?`Năm ${x.year} · Tháng ${x.month} · Ngày ${x.day}`:'';};
  const escAttrV21=v=>escV21(String(v??''));
  const fieldV21=(label,value,full=true)=>`<div class="history-v21-field${full?' full':''}"><div class="history-v21-label">${label}</div><div class="history-v21-value">${escV21(valV21(value))}</div></div>`;
  const emptyV21=msg=>`<div class="history-v21-empty">${msg}</div>`;
  const shellV21=(kind,icon,date,preview,fields,actions='')=>`<article class="history-v21-item" data-history-kind="${escAttrV21(kind)}"><button type="button" class="history-v21-summary" aria-expanded="false" onclick="window.toggleHistoryV21(this)"><span class="history-v21-date"><span class="history-v21-date-icon">${icon}</span><span><span class="history-v21-date-main">${escV21(dateLabelV21(date))}</span><span class="history-v21-date-sub">${escV21(dateSubV21(date))}</span><span class="history-v21-preview">${escV21(valV21(preview))}</span></span></span><span class="history-v21-chevron">⌄</span></button><div class="history-v21-detail"><div class="history-v21-fields">${fields}</div>${actions?`<div class="history-v21-actions">${actions}</div>`:''}</div></article>`;
  window.toggleHistoryV21=function(btn){const detail=btn.parentElement?.querySelector('.history-v21-detail');if(!detail)return;const open=!detail.classList.contains('open');detail.classList.toggle('open',open);btn.setAttribute('aria-expanded',String(open));};
  window.openHistoryV21Modal=function(title,body,deleteType,deleteId){
    const action=deleteType&&deleteId?`<div class="history-v21-actions"><button class="btn danger sm" onclick="del('${escAttrV21(deleteType)}','${escAttrV21(deleteId)}');closeModal();">Xóa mục này</button></div>`:'';
    if(typeof showModal==='function')showModal(title,`${body}${action}`);else alert(title+'\n\n'+body.replace(/<[^>]*>/g,''));
  };
  function parseEndDayV21(m){
    const structured=m.endDay||m.endday||{};
    if(structured && typeof structured==='object' && Object.keys(structured).length)return {mood:structured.mood||'',gratitude:structured.gratitude||'',lesson:structured.lesson||'',tomorrow:structured.tomorrow||''};
    const text=String(m.desc||'');
    const out={mood:'',gratitude:'',lesson:'',tomorrow:''};
    const rx=/Cảm xúc:\s*([\s\S]*?)\s*\|\s*Biết ơn:\s*([\s\S]*?)\s*\|\s*Bài học:\s*([\s\S]*?)\s*\|\s*Ngày mai:\s*([\s\S]*)$/i.exec(text);
    if(rx){out.mood=rx[1];out.gratitude=rx[2];out.lesson=rx[3];out.tomorrow=rx[4];return out;}
    const legacy=/Biết ơn:\s*([\s\S]*?)\s*\|\s*Bài học:\s*([\s\S]*?)\s*\|\s*Ngày mai:\s*([\s\S]*)$/i.exec(text);
    if(legacy){out.gratitude=legacy[1];out.lesson=legacy[2];out.tomorrow=legacy[3];}else out.gratitude=text;
    return out;
  }
  window.openEndDayV21=function(id){const m=(state.moments||[]).find(x=>String(x.id)===String(id));if(!m)return;const x=parseEndDayV21(m);window.openHistoryV21Modal(`🌙 Kết ngày · ${dateLabelV21(m.date)}`,`<div class="history-v21-fields">${fieldV21('💗 Cảm xúc hôm nay',x.mood)}${fieldV21('🙏 Điều biết ơn hôm nay',x.gratitude)}${fieldV21('📖 Bài học được học hôm nay',x.lesson)}${fieldV21('✨ Ngày mai điều quan trọng nhất',x.tomorrow)}</div>`,'moments',m.id);};
  window.saveEndDaySnapshot=function(){const gratitude=$('endGratitude')?.value||'',lesson=$('endLesson')?.value||'',tomorrow=$('endTomorrow')?.value||'',moodDisplay=$('endMoodDisplay')?.value||'',date=typeof todayISO==='function'?todayISO():new Date().toISOString().slice(0,10);state.moments=Array.isArray(state.moments)?state.moments:[];state.moments.unshift({id:uid(),date,title:`Kết ngày ${date} 🐝🍀`,desc:`Cảm xúc: ${moodDisplay} | Biết ơn: ${gratitude} | Bài học: ${lesson} | Ngày mai: ${tomorrow}`,endDay:{mood:moodDisplay,gratitude,lesson,tomorrow},type:'endday'});alert('Đã lưu kết ngày thành công! Chúc bạn ngủ ngon 🌙🐝🍀');save();renderEndDay();};
  window.renderEndDay=function(){const todayMo=(state.moods||[]).find(x=>x.date===todayISO());if($('endMoodDisplay'))$('endMoodDisplay').value=todayMo?`${todayMo.emoji} ${todayMo.name}${todayMo.note?`\n${todayMo.note}`:''}`:'Chưa ghi nhận cảm xúc hôm nay (Hãy bấm ở mục Cảm xúc).';const rows=(state.moments||[]).filter(m=>String(m.title||'').includes('Kết ngày'));const el=$('endDayHistory');if(!el)return;el.innerHTML=rows.length?`<div class="history-v21-list">${rows.map(m=>{const x=parseEndDayV21(m),preview=x.gratitude||x.lesson||x.tomorrow||x.mood;return shellV21('endday','🌙',m.date,preview,`${fieldV21('💗 Cảm xúc hôm nay',x.mood)}${fieldV21('🙏 Điều biết ơn hôm nay',x.gratitude)}${fieldV21('📖 Bài học được học hôm nay',x.lesson)}${fieldV21('✨ Ngày mai điều quan trọng nhất',x.tomorrow)}`,`<button class="btn light sm" onclick="window.openEndDayV21('${escAttrV21(m.id)}')">Mở khung chi tiết</button><button class="btn danger sm" onclick="del('moments','${escAttrV21(m.id)}')">Xóa</button>`);}).join('')}</div>`:emptyV21('📚 Chưa có kết ngày nào được lưu.');};
  window.openMoodV21=function(date){const m=(state.moods||[]).find(x=>x.date===date);if(!m)return;window.openHistoryV21Modal(`💗 Cảm xúc · ${dateLabelV21(m.date)}`,`<div class="history-v21-fields">${fieldV21('Cảm xúc',`${m.emoji||''} ${m.name||''}`)}${fieldV21('Ghi chú cảm xúc',m.note||'')}</div>`);};
  window.renderMoods=function(){const c=$('moodButtons');if(c)c.innerHTML=getAllMoods().map(m=>`<button type="button" class="mood-btn ${activeMood===m[1]?'selected':''}" onclick="selectMood('${escAttrV21(m[1])}')"><span>${m[0]}</span> <span>${escV21(m[1])}</span></button>`).join('');const sel=$('customComfortMood');if(sel)sel.innerHTML=getAllMoods().map(m=>`<option value="${escAttrV21(m[1])}">${m[0]} ${escV21(m[1])}</option>`).join('');const h=$('moodHistory');if(!h)return;const rows=state.moods||[];h.innerHTML=rows.length?`<div class="history-v21-list">${rows.map(m=>shellV21('mood','💗',m.date,`${m.emoji||''} ${m.name||'Chưa chọn cảm xúc'}${m.note?' · '+m.note:''}`,`${fieldV21('Cảm xúc',`${m.emoji||''} ${m.name||''}`)}${fieldV21('Ghi chú cảm xúc',m.note||'')}`,`<button class="btn light sm" onclick="window.openMoodV21('${escAttrV21(m.date)}')">Mở khung chi tiết</button>`)).join('')}</div>`:emptyV21('💗 Chưa có lịch sử cảm xúc.');};
  window.openJournalV21=function(id){const j=(state.journals||[]).find(x=>String(x.id)===String(id));if(!j)return;window.openHistoryV21Modal(`📖 Nhật ký · ${dateLabelV21(j.date)}`,`<div class="history-v21-fields">${fieldV21('Môn/chủ đề',j.subject)}${fieldV21('Thời gian học',`${Number(j.minutes)||0} phút`,false)}${fieldV21('Điểm tự đánh giá',`${Number(j.score)||0}/10`,false)}${fieldV21('Nội dung nhật ký',j.content)}${fieldV21('Kiến thức mới',j.newKnowledge||'')}</div>`,'journals',j.id);};
  window.renderJournals=function(){const c=$('journalList');if(!c)return;const rows=state.journals||[];c.innerHTML=rows.length?`<div class="history-v21-list">${rows.map(j=>shellV21('journal','📖',j.date,`${j.subject||'Chưa phân loại'} · ${j.content||''}`,`${fieldV21('Môn/chủ đề',j.subject)}${fieldV21('Thời gian học',`${Number(j.minutes)||0} phút`,false)}${fieldV21('Điểm tự đánh giá',`${Number(j.score)||0}/10`,false)}${fieldV21('Nội dung nhật ký',j.content)}${fieldV21('Kiến thức mới',j.newKnowledge||'')}`,`<button class="btn light sm" onclick="window.openJournalV21('${escAttrV21(j.id)}')">Mở khung chi tiết</button><button class="btn danger sm" onclick="del('journals','${escAttrV21(j.id)}')">Xóa</button>`)).join('')}</div>`:emptyV21('📖 Chưa có nhật ký học tập.');};
  window.openMomentV21=function(id){const m=(state.moments||[]).find(x=>String(x.id)===String(id));if(!m)return;window.openHistoryV21Modal(`📸 Khoảnh khắc · ${dateLabelV21(m.date)}`,`<div class="history-v21-fields">${fieldV21('Tiêu đề',m.title)}${fieldV21('Nội dung khoảnh khắc',m.desc||'')}</div>`,'moments',m.id);};
  window.renderMoments=function(){const c=$('momentsList');if(!c)return;const rows=(state.moments||[]).filter(m=>!m.type||m.type==='user');c.innerHTML=rows.length?`<div class="history-v21-list">${rows.map(m=>shellV21('moment','📸',m.date,m.title,`${fieldV21('Tiêu đề',m.title)}${fieldV21('Nội dung khoảnh khắc',m.desc||'')}`,`<button class="btn light sm" onclick="window.openMomentV21('${escAttrV21(m.id)}')">Mở khung chi tiết</button><button class="btn danger sm" onclick="del('moments','${escAttrV21(m.id)}')">Xóa</button>`)).join('')}</div>`:emptyV21('📸 Chưa có khoảnh khắc đáng nhớ nào.');};
  window.openTodoV21=function(id){const t=(state.todos||[]).find(x=>String(x.id)===String(id));if(!t)return;window.openHistoryV21Modal(`📋 Kế hoạch · ${dateLabelV21(t.date)}`,`<div class="history-v21-fields">${fieldV21('Công việc',t.title)}${fieldV21('Mức ưu tiên',t.priority||'thấp',false)}${fieldV21('Thời gian',t.time||'Chưa đặt',false)}${fieldV21('Trạng thái',t.done?'Đã hoàn thành':'Chưa hoàn thành',false)}${fieldV21('Ghi chú',t.note||'')}</div>`,'todos',t.id);};
  window.renderTodos=function(){const date=$('todoDate')?.value||todayISO(),q=($('todoSearch')?.value||'').toLowerCase(),a=(state.todos||[]).filter(x=>x.date===date&&(x.title+' '+(x.note||'')).toLowerCase().includes(q)),el=$('todoList');if(!el)return;el.innerHTML=a.length?a.map(x=>`<div class="todo ${x.done?'done':''}"><div class="title"><button type="button" class="history-v21-summary" style="padding:0;display:block" onclick="window.openTodoV21('${escAttrV21(x.id)}')"><b>${escV21(x.title)}</b><div class="kpi">${x.time?escV21(x.time)+' • ':''}${escV21(x.note||'Nhấn để xem chi tiết')}</div></button></div><span class="tag ${x.priority==='cao'?'red':x.priority==='trung'?'yellow':''}">${x.priority==='cao'?'Cao':x.priority==='trung'?'Trung bình':'Thấp'}</span><input type="checkbox" ${x.done?'checked':''} onchange="toggleTodoDone('${escAttrV21(x.id)}', this.checked)" style="width:20px;height:20px;cursor:pointer"><button class="btn light sm" onclick="editTodo('${escAttrV21(x.id)}')">Sửa</button><button class="btn danger sm" onclick="del('todos','${escAttrV21(x.id)}')">Xóa</button></div>`).join(''):`<div class="empty">Chưa có việc cho ngày ${escV21(date)}.</div>`;};
  if($('todoSearch'))$('todoSearch').oninput=window.renderTodos;
  const groupTodoHistoryV21=(rows,renderer)=>{
    if(!rows.length)return '<div class="empty">Chưa có kế hoạch cũ.</div>';
    const years={};
    rows.forEach(row=>{
      const match=String(row.date||'').match(/^(\d{4})-(\d{2})-(\d{2})$/);
      const year=match?match[1]:'Không rõ',month=match?match[2]:'00',day=match?match[3]:String(row.date||'Không rõ');
      years[year]??={};years[year][month]??={};years[year][month][day]??=[];years[year][month][day].push(row);
    });
    const countDays=days=>Object.values(days).reduce((sum,list)=>sum+list.length,0);
    return Object.keys(years).sort((a,b)=>b.localeCompare(a)).map((year,yi)=>{
      const months=years[year],yearCount=Object.values(months).reduce((sum,days)=>sum+countDays(days),0);
      const monthHtml=Object.keys(months).sort((a,b)=>Number(b)-Number(a)).map((month,mi)=>{
        const days=months[month],monthLabel=month==='00'?'Chưa xác định':`Tháng ${Number(month)}`;
        const dayHtml=Object.keys(days).sort((a,b)=>b.localeCompare(a)).map((day,di)=>`<details class="history-time-day" ${yi===0&&mi===0&&di===0?'open':''}><summary>📌 ${month==='00'?'Ngày chưa xác định':`Ngày ${Number(day)}`} <span class="tag">${days[day].length}</span></summary><div class="history-v21-list history-time-day-body">${days[day].map(renderer).join('')}</div></details>`).join('');
        return `<details class="history-time-month" ${yi===0&&mi===0?'open':''}><summary>📅 ${monthLabel} <span class="tag">${countDays(days)} mục</span></summary><div class="history-time-month-body">${dayHtml}</div></details>`;
      }).join('');
      return `<details class="history-time-year" ${yi===0?'open':''}><summary>🗓️ Năm ${escV21(year)} <span class="tag">${yearCount} mục</span></summary><div class="history-time-year-body">${monthHtml}</div></details>`;
    }).join('');
  };
  window.renderTodos=function(){const date=$('todoDate')?.value||todayISO(),q=($('todoSearch')?.value||'').toLowerCase(),ownerId=accountOwnerId(),rows=(state.todos||[]).filter(x=>(!x.ownerId||String(x.ownerId)===String(ownerId))&&(x.title+' '+(x.note||'')).toLowerCase().includes(q)),todayRows=rows.filter(x=>x.date===date),oldRows=rows.filter(x=>x.date!==date),el=$('todoList');if(!el)return;const item=x=>`<div class="todo ${x.done?'done':''}"><div class="title"><button type="button" class="history-v21-summary" style="padding:0;display:block" onclick="window.openTodoV21('${escAttrV21(x.id)}')"><b>${escV21(x.title)}</b><div class="kpi">${x.time?escV21(x.time)+' • ':''}${escV21(x.note||'Nhấn để xem chi tiết')}</div></button></div><span class="tag ${x.priority==='cao'?'red':x.priority==='trung'?'yellow':''}">${x.priority==='cao'?'Cao':x.priority==='trung'?'Trung bình':'Thấp'}</span><input type="checkbox" ${x.done?'checked':''} onchange="toggleTodoDone('${escAttrV21(x.id)}', this.checked)" style="width:20px;height:20px;cursor:pointer"><button class="btn light sm" onclick="editTodo('${escAttrV21(x.id)}')">Sửa</button><button class="btn danger sm" onclick="del('todos','${escAttrV21(x.id)}')">Xóa</button></div>`;el.innerHTML=`<section class="todo-today-focus"><div class="history-time-section-title">📝 Việc hôm nay · ${escV21(date)}</div>${todayRows.length?todayRows.map(item).join(''):'<div class="empty">Hôm nay chưa có kế hoạch. Bạn có thể thêm việc mới ở biểu mẫu phía trên.</div>'}</section><section class="todo-history-section"><div class="history-time-section-title">🗂️ Kế hoạch đã lưu</div>${groupTodoHistoryV21(oldRows,item)}</section>`;};
  const oldSaveMood=window.__studyEmpireSaveMoodV21Bound;
  if(!oldSaveMood && $('saveMood')){window.__studyEmpireSaveMoodV21Bound=true;$('saveMood').onclick=()=>{const note=$('moodNote')?.value.trim()||'';const def=getAllMoods().find(m=>m[1]===activeMood)||['😔','Buồn'];const idx=state.moods.findIndex(m=>m.date===todayISO());const entry={date:todayISO(),name:activeMood,emoji:def[0],note};if(idx>=0)state.moods[idx]=entry;else state.moods.unshift(entry);recordActivity('journal',10);save();renderMoods();alert('Đã lưu cảm xúc hôm nay! 🐝');};}
  try{window.renderEndDay();window.renderMoods();window.renderJournals();window.renderMoments();window.renderTodos();}catch(e){console.warn('History UI V21',e);}
})();


/* ---- extracted script block 16: <script id="study-empire-pomodoro-auto-save-v22"> ---- */
(function(){
  'use strict';
  if(window.__studyEmpirePomodoroAutoSaveV22)return;
  window.__studyEmpirePomodoroAutoSaveV22=true;
  let pomoSessionSavedV22=false;
  const escV22=typeof window.esc==='function'?window.esc:(v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])));
  const dateLabelV22=d=>{const m=String(d||'').match(/^(\d{4})-(\d{2})-(\d{2})$/);return m?`${m[3]} tháng ${Number(m[2])}, ${m[1]}`:String(d||'Chưa có ngày');};
  const fmtV22=typeof window.fmtMin==='function'?window.fmtMin:(m=>`${Math.max(0,Number(m)||0)} phút`);
  function getPomoRowsV22(){
    const ownerId=typeof accountOwnerId==='function'?accountOwnerId():null;
    const scoped=ownerId&&state.userData?.accounts?.[ownerId]?.sessions;
    const rows=Array.isArray(scoped)?scoped:(Array.isArray(state.sessions)?state.sessions:[]);
    return rows.filter(x=>x&&(x.source==='pomodoro'||x.kind==='pomodoro'||x.isPomodoro===true)&&x.date);
  }
  function savePomoSessionV22(reason){
    const sec=Math.max(0,Math.floor(Number(studyElapsed)||0));
    if(sec<=10||pomoSessionSavedV22)return false;
    state.sessions=Array.isArray(state.sessions)?state.sessions:[];
    state.sessions.push({id:uid(),date:todayISO(),subject:$('studySubject')?.value||'Chưa chọn môn',minutes:Math.max(1,Math.round(sec/60)),seconds:sec,source:'pomodoro',kind:'pomodoro',isPomodoro:true,completedBy:reason||'manual',createdAt:new Date().toISOString()});
    pomoSessionSavedV22=true;
    return true;
  }
  window.renderPomoHistoryV22=function(){
    const el=$('pomoHistory');if(!el)return;
    const rows=getPomoRowsV22().slice().sort((a,b)=>String(b.date).localeCompare(String(a.date))||String(b.createdAt||'').localeCompare(String(a.createdAt||'')));
    if(!rows.length){el.innerHTML='<div class="pomo-history-v22"><div class="muted">📊 Chưa có phiên Pomodoro đã lưu.</div></div>';return;}
    const by={};rows.forEach(r=>(by[r.date]||(by[r.date]=[])).push(r));
    const days=Object.keys(by).sort((a,b)=>b.localeCompare(a)).slice(0,14);
    el.innerHTML=`<div class="pomo-history-v22"><h4>📊 Lịch sử Pomodoro</h4><div class="muted" style="margin-bottom:8px">Tự lưu khi hoàn tất; nếu tạm dừng, bấm “Lưu phiên tạm dừng” để ghi lại.</div><div class="pomo-history-v22-list">${days.map((date,i)=>{const day=by[date],total=day.reduce((n,r)=>n+(Number(r.minutes)||Math.round((Number(r.seconds)||0)/60)),0);return `<details ${i===0?'open':''}><summary><span>📅 ${escV22(dateLabelV22(date))}</span><span class="pomo-day-total">⏱️ ${escV22(fmtV22(total))} · ${day.length} phiên</span></summary><div class="pomo-day-rows">${day.map(r=>`<div class="pomo-row"><span>${escV22(r.subject||'Chưa chọn môn')} · ${escV22(r.completedBy==='completed'?'Tự lưu hoàn tất':'Lưu thủ công')}</span><b>${escV22(fmtV22(Number(r.minutes)||Math.round((Number(r.seconds)||0)/60)))}</b></div>`).join('')}</div></details>`;}).join('')}</div></div>`;
  };
  function updateV22(){if(typeof updateStudyStateText==='function')updateStudyStateText();if(pomoPlanCompleted&&$('studyState'))$('studyState').textContent=`Đã hoàn thành ${pomoCompletedSessions}/${pomoTargetSessions} phiên Pomodoro. Thời gian đã tự động lưu theo ngày.`;if(studyStartAt&&studyPaused&&!pomoPlanCompleted&&$('studyState'))$('studyState').textContent='Đang tạm dừng. Nhấn “Lưu phiên tạm dừng” nếu muốn ghi lại thời gian hiện tại.';const stopBtn=$('studyStop');if(stopBtn){const canSave=!!(studyStartAt&&studyPaused&&!pomoPlanCompleted);stopBtn.disabled=!canSave;stopBtn.style.opacity=canSave?'1':'.55';stopBtn.title=canSave?'Lưu thời gian của phiên đang tạm dừng':'Chỉ cần lưu thủ công sau khi nhấn Tạm dừng';}if(typeof renderPomoClock==='function')renderPomoClock();window.renderPomoHistoryV22();}
  window.startStudy=function(){
    if(pomoPlanCompleted){updateV22();return;}
    if(!studyStartAt){studyStartAt=Date.now();studyElapsed=0;studyPaused=false;pomoSessionSavedV22=false;pomoTargetSessions=getPomoSessionTarget();pomoCompletedSessions=0;pomoCount=0;}
    else if(studyPaused){studyStartAt=Date.now()-studyElapsed*1000;studyPaused=false;}
    if(!pomoRunning){
      pomoRunning=true;
      pomoTimer=setInterval(()=>{
        pomoSec--;studyElapsed++;
        if(pomoSec>=1&&pomoSec<=9)playBeep(750,0.15,'square',0.8);
        if(pomoSec<=0){
          clearInterval(pomoTimer);pomoRunning=false;playAlarmMelody();
          if(pomoMode==='focus'){
            pomoCount++;pomoCompletedSessions++;
            const target=Math.max(1,pomoTargetSessions||getPomoSessionTarget());
            if(pomoCompletedSessions>=target){
              pomoPlanCompleted=true;studyPaused=true;pomoSec=0;
              const saved=savePomoSessionV22('completed');
              if(saved)save();
              updateV22();return;
            }
            const longBreakEvery=Math.max(1,Number(state.pomo.rounds)||4);
            if(pomoCount%longBreakEvery===0)setPomoMode('long');else setPomoMode('short');
            if(studyStartAt&&!pomoPlanCompleted)window.startStudy();
          }else{setPomoMode('focus');if(studyStartAt&&!pomoPlanCompleted)window.startStudy();}
        }
        renderPomoClock();
      },1000);
    }
    updateV22();
  };
  window.pauseStudy=function(){if(studyStartAt&&!studyPaused){studyPaused=true;pomoRunning=false;clearInterval(pomoTimer);updateV22();}};
  window.stopStudy=function(){
    if(!studyStartAt)return;
    pomoRunning=false;clearInterval(pomoTimer);
    const saved=savePomoSessionV22('manual');
    studyStartAt=null;studyElapsed=0;studyPaused=false;pomoCount=0;pomoCompletedSessions=0;pomoTargetSessions=getPomoSessionTarget();pomoPlanCompleted=false;pomoSessionSavedV22=false;
    setPomoMode('focus',true);renderPomoClock();if(saved)save();else window.renderPomoHistoryV22();updateStudyStateText();
  };
  if($('studyStart'))$('studyStart').onclick=window.startStudy;
  if($('studyPause'))$('studyPause').onclick=window.pauseStudy;
  if($('studyStop'))$('studyStop').onclick=window.stopStudy;
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{window.renderPomoHistoryV22();updateV22();},{once:true});else {window.renderPomoHistoryV22();updateV22();}
})();


/* ---- extracted script block 17: <script id="study-empire-mood-endday-sync-v25"> ---- */
(function(){
  'use strict';
  function moodForToday(){
    const date=typeof todayISO==='function'?todayISO():new Date().toISOString().slice(0,10);
    return (Array.isArray(state.moods)?state.moods:[]).find(x=>x.date===date)||null;
  }
  function moodText(m){
    if(!m)return 'Chưa ghi nhận cảm xúc hôm nay (Hãy bấm ở mục Cảm xúc).';
    return `${m.emoji||''} ${m.name||''}${m.note?`\n${m.note}`:''}`.trim();
  }
  function selectedMoodText(){
    if(!window.activeMood && typeof activeMood==='undefined')return null;
    const name=typeof activeMood!=='undefined'?activeMood:window.activeMood;
    if(!name)return null;
    const defs=typeof getAllMoods==='function'?getAllMoods():[];
    const def=defs.find(x=>x[1]===name)||['😔',name];
    return `${def[0]} ${name}`;
  }
  function syncEndDayMood(preferSelected){
    const el=document.getElementById('endMoodDisplay');
    if(!el)return;
    const saved=moodForToday();
    const value=preferSelected?selectedMoodText():null;
    el.value=value||moodText(saved);
    el.title='Đồng bộ từ mục Cảm xúc; ghi chú sẽ xuất hiện sau khi lưu cảm xúc.';
  }
  window.studyEmpireSyncEndDayMoodV25=syncEndDayMood;

  const oldSelectMood=window.selectMood;
  if(typeof oldSelectMood==='function'&&!window.__studyEmpireMoodSelectV25){
    window.__studyEmpireMoodSelectV25=true;
    window.selectMood=function(name){
      const result=oldSelectMood.apply(this,arguments);
      if(typeof activeMood!=='undefined')activeMood=name;
      if(typeof activeThemeMood!=='undefined')activeThemeMood=name;
      syncEndDayMood(true);
      return result;
    };
  }

  const moodSave=document.getElementById('saveMood');
  if(moodSave&&!moodSave.dataset.moodEnddayV25){
    moodSave.dataset.moodEnddayV25='1';
    moodSave.addEventListener('click',()=>setTimeout(()=>{
      syncEndDayMood(false);
      if(typeof renderEndDay==='function')renderEndDay();
    },0));
  }

  const oldEndDay=window.saveEndDaySnapshot;
  if(typeof oldEndDay==='function'&&!window.__studyEmpireEndDayMoodV25){
    window.__studyEmpireEndDayMoodV25=true;
    window.saveEndDaySnapshot=function(){
      syncEndDayMood(true);
      const result=oldEndDay.apply(this,arguments);
      syncEndDayMood(false);
      return result;
    };
  }

  const oldRenderEndDay=window.renderEndDay;
  if(typeof oldRenderEndDay==='function'&&!window.__studyEmpireRenderEndDayMoodV25){
    window.__studyEmpireRenderEndDayMoodV25=true;
    window.renderEndDay=function(){
      const result=oldRenderEndDay.apply(this,arguments);
      syncEndDayMood(false);
      return result;
    };
  }
  setTimeout(()=>syncEndDayMood(false),0);
})();


/* ---- extracted script block 18: <script> ---- */
/* =========================================================
   🐝 FINAL PATCH V3 — DATA INTEGRITY / XP LEDGER / QUESTS / TRASH / RANKING
   - 3 nhiệm vụ thường mỗi ngày
   - 1 nhiệm vụ đặc biệt mỗi tuần, độ khó Ác Mộng
   - Special Quest hoàn thành -> XP + Role + Zone đặc biệt
   - XP history được dựng từ dữ liệu thật + giao dịch thu hồi
   - Kế hoạch luôn có dòng +1 XP
   - Thùng rác lưu theo tài khoản và khôi phục thật
   - 900 thành tích / 11 tầng khó tăng dần
   - 4 tầng cuối có gradient động
========================================================= */
(function(){
  const PATCH_VERSION='V3-2026-08-11';

  function patchToday(){ return typeof todayISO==='function'?todayISO():new Date().toISOString().slice(0,10); }
  function patchYesterday(){ return typeof yesterdayKey==='function'?yesterdayKey():(()=>{const d=new Date();d.setDate(d.getDate()-1);return d.toISOString().slice(0,10)})(); }
  function patchWeekKey(dateStr){
    const d=new Date((dateStr||patchToday())+'T12:00:00');
    const day=d.getDay(); const diff=day===0?-6:1-day; d.setDate(d.getDate()+diff);
    return d.toISOString().slice(0,10);
  }
  function patchDatesBetween(start,end){
    const out=[]; const d=new Date(start+'T12:00:00'); const e=new Date(end+'T12:00:00');
    while(d<=e){out.push(d.toISOString().slice(0,10));d.setDate(d.getDate()+1);} return out;
  }
  function patchOwnerId(){ return typeof accountOwnerId==='function'?accountOwnerId():null; }

  /* ---------- ACHIEVEMENTS: 300 real difficulty tiers ---------- */
  const tierMeta=[
    {id:'de',title:'🌱 1. DỄ',label:'Dễ',leaf:'🌱',bg:'#e8f5e9',accent:'#2e7d32'},
    {id:'trung-binh',title:'🍃 2. TRUNG BÌNH',label:'Trung Bình',leaf:'🍃',bg:'#e0f2f1',accent:'#00796b'},
    {id:'kho',title:'🌿 3. KHÓ',label:'Khó',leaf:'🌿',bg:'#e3f2fd',accent:'#1565c0'},
    {id:'thu-thach',title:'🍀 4. THỬ THÁCH',label:'Thử Thách',leaf:'🍀',bg:'#fff8e1',accent:'#b77900'},
    {id:'cuc-kho',title:'🍂 5. CỰC KHÓ',label:'Cực Khó',leaf:'🍂',bg:'#fff3e0',accent:'#e65100'},
    {id:'ac-mong',title:'🍁 6. ÁC MỘNG',label:'Ác Mộng',leaf:'🍁',bg:'#ffebee',accent:'#c62828'},
    {id:'kiet-xuat',title:'🌳 7. KIỆT XUẤT',label:'Kiệt Xuất',leaf:'🌳',bg:'#f3e5f5',accent:'#7b1fa2'},
    {id:'huyen-thoai',title:'🌌 8. HUYỀN THOẠI',label:'Huyền Thoại',leaf:'🌌',bg:'linear-gradient(135deg,#312e81,#2563eb,#06b6d4,#7c3aed)',accent:'#312e81'},
    {id:'truyen-thuyet',title:'👑 9. TRUYỀN THUYẾT',label:'Truyền Thuyết',leaf:'👑',bg:'linear-gradient(135deg,#7f1d1d,#dc2626,#f59e0b,#fde047,#a855f7,#2563eb)',accent:'#7f1d1d'},
    {id:'vo-cuc',title:'🌟 10. VÔ CỰC',label:'Vô Cực',leaf:'🌟',bg:'radial-gradient(circle at 18% 20%,rgba(129,140,248,.95),transparent 20%),radial-gradient(circle at 82% 78%,rgba(236,72,153,.75),transparent 22%),radial-gradient(circle at 50% 45%,rgba(56,189,248,.32),transparent 38%),linear-gradient(135deg,#020617,#111827 38%,#312e81 70%,#0f172a)',accent:'#0f172a'},
    {id:'than-thoai',title:'💠 11. THẦN THOẠI',label:'Thần Thoại',leaf:'💠',bg:'radial-gradient(circle at 22% 22%,rgba(250,204,21,.95),transparent 13%),radial-gradient(circle at 78% 76%,rgba(220,38,38,.78),transparent 22%),radial-gradient(circle at 50% 50%,rgba(168,85,247,.32),transparent 38%),linear-gradient(135deg,#09090b,#240b36 42%,#581c87 68%,#713f12)',accent:'#000000'}
  ];
  const tierCounts=[40,50,60,70,80,90,100,110,110,100,90];
  const icons=['🌱','🍃','🌿','🍀','🌳','🌲','🌵','🌻','🌺','🌸','🪻','🌼','📚','📖','📝','✏️','🧠','💡','🔬','🧪','⏱️','⌛','⏳','🎯','🎓','🏫','🧩','🛡️','⚔️','🔥','⚡','🌋','🌪️','🌊','❄️','☀️','🌙','⭐','🌟','✨','💫','🌌','🪐','🚀','🛰️','💎','👑','🏆','🥇','🥈','🥉','🎖️','🏅','🎗️','🗝️','🔓','🧭','🗺️','🏁','🚩','🎲','🎮','🎼','🎨','🛠️','🔧','🧱','🏗️','🧘','🦉','🦅','🐝','🦊','🐺','🦁','🐉','🦄','🐲','🪄','🔮','💠','🧿','🕯️','🌠','☄️','🌈','🍎','🍋','🍊','🍇','🍓','🥝','🥑','🍒','🥭','🪽','🗿','🧬','🧮','📐','📈','🪜','🏔️','🕊️','🦋'];

  function countDoneTasks(d){ return (d.todos||[]).filter(t=>t.done).length; }
  function totalTasks(d){ return (d.todos||[]).length; }
  function habitDoneCount(d){ return Object.values(d.habits||{}).flat().reduce((n,h)=>n+Object.values(h.days||{}).filter(Boolean).length,0); }
  function sessionCount(d){ return (d.sessions||[]).filter(x=>!(x&&((x.source==='pomodoro')||(x.kind==='pomodoro')||(x.isPomodoro===true)))).length; }
  function journalCount(d){ return (d.journals||[]).length; }
  function moodCount(d){ return (d.moods||[]).length; }
  function studyDayCount(d){
    const rows=Array.isArray(d.adminStudyTimes)?d.adminStudyTimes:Object.values(d.adminStudyTimes||{}).flat();
    return new Set(rows.filter(x=>x&&x.date).map(x=>x.date)).size;
  }
  function maxDailyStudy(d){
    const rows=Array.isArray(d.adminStudyTimes)?d.adminStudyTimes:Object.values(d.adminStudyTimes||{}).flat();
    const totals={}; rows.forEach(r=>{if(!r?.date)return;totals[r.date]=(totals[r.date]||0)+Number(r.deltaMinutes??r.minutes??0);});
    return Math.min(720, Math.max(0,...Object.values(totals).map(Number)));
  }
  function perfectPlanDays(d){
    const by={}; (d.todos||[]).filter(t=>t.date).forEach(t=>(by[t.date]||(by[t.date]=[])).push(t));
    return Object.values(by).filter(a=>a.length&&a.every(t=>t.done)).length;
  }
  function compareNum(v,op,n){return op==='>='?v>=n:op==='>'?v>n:op==='='?v===n:op==='<='?v<=n:v<n;}
  function achievementMetric(d,key){
    if(key==='tasks')return countDoneTasks(d); if(key==='study')return Number(d.studyMinutes)||0;
    if(key==='habits')return habitDoneCount(d); if(key==='streak')return Number(d.bestStreak)||0;
    if(key==='days')return (d.activityDates||[]).length; if(key==='sessions')return sessionCount(d);
    if(key==='journals')return journalCount(d); if(key==='moods')return moodCount(d); if(key==='xp')return Number(d.xp)||0;
    if(key==='studyDays')return studyDayCount(d); if(key==='dailyStudy')return maxDailyStudy(d);
    if(key==='perfectDays')return perfectPlanDays(d);
    return 0;
  }
  const recipes=[
    ['Kế hoạch','Hoàn thành {n} kế hoạch','tasks',3],
    ['Học tập','Học chính thức tổng {n} phút','study',60],
    ['Thói quen','Hoàn thành {n} lượt thói quen','habits',5],
    ['Kỷ luật','Duy trì chuỗi {n} ngày','streak',2],
    ['Hoạt động','Có hoạt động trong {n} ngày khác nhau','days',3],
    ['Phiên học','Hoàn thành {n} phiên học','sessions',3],
    ['Nhật ký','Ghi {n} nhật ký','journals',3],
    ['Cảm xúc','Ghi nhận {n} ngày cảm xúc','moods',3],
    ['Ngày học','Có hoạt động học trong {n} ngày','studyDays',2],
    ['Kỷ lục một ngày','Học {n} phút trong MỘT NGÀY','dailyStudy',60],
    ['XP tích lũy','Đạt {n} XP','xp',50],
    ['Kế hoạch hoàn hảo','Có {n} ngày hoàn thành 100% Kế hoạch','perfectDays',1]
  ];
  const multipliers=[1,2,4,8,16,32,64,128,256,512,1024];
  function buildHard100(){
    const groups=[]; let num=1;
    tierMeta.forEach((meta,ti)=>{
      const group={...meta,items:[]}; const count=tierCounts[ti];
      for(let j=0;j<count;j++,num++){
        let recipe=recipes[(num-1)%recipes.length];
        // 720 phút là giới hạn tuyệt đối cho thành tích học trong một ngày.
        // Các mốc cao hơn được thay bằng nhiệm vụ khác.
        if(recipe[2]==='dailyStudy' && (ti>=7 || (ti===6 && j>=5))){
          const alternatives=[
            ['Thói quen bền bỉ','Hoàn thành {n} lượt thói quen','habits',25],
            ['Phiên học chuyên sâu','Hoàn thành {n} phiên học','sessions',20],
            ['Nhật ký trưởng thành','Ghi {n} nhật ký','journals',20],
            ['Kỷ luật cảm xúc','Ghi nhận {n} ngày cảm xúc','moods',20],
            ['Kế hoạch chủ động','Hoàn thành {n} kế hoạch','tasks',30]
          ];
          recipe=alternatives[(j+ti)%alternatives.length];
        }
        const base=recipe[3];
        let threshold=Math.max(1,Math.round(base*multipliers[ti]*(1+j/(count*0.8))));
        if(recipe[2]==='dailyStudy'){
          // Giá trị dùng xét thành tích không vượt 12 giờ/ngày.
          const dailyCaps=[60,120,240,360,480,600,660,720,720,720,720];
          threshold=Math.min(720, dailyCaps[ti]+j*15);
        }
        if(recipe[2]==='study'){
          if(ti===6) threshold=5000+j*1000;
          if(ti===7) threshold=10000+j*2500;
          if(ti===8) threshold=20000+j*5000;
          if(ti===9) threshold=40000+j*8000;
          if(ti===10) threshold=80000+j*15000;
        }
        if(recipe[2]==='tasks' && ti>=6) threshold=Math.round([250,750,2000,4000,8000][ti-6]+j*[100,250,500,800,1200][ti-6]);
        if(recipe[2]==='streak' && ti>=6) threshold=[90,180,365,730,1460][ti-6]+j*[15,30,60,90,150][ti-6];
        if(recipe[2]==='days' && ti>=6) threshold=[120,250,500,900,1500][ti-6]+j*[20,40,80,120,180][ti-6];
        if(recipe[2]==='xp' && ti>=6) threshold=[10000,50000,150000,400000,1000000][ti-6]+j*[2500,10000,25000,60000,120000][ti-6];
        if(recipe[2]==='perfectDays' && ti>=6) threshold=[30,100,250,500,900][ti-6]+j*[10,25,50,90,150][ti-6];
        const name=`${recipe[0]} — ${meta.label} ${String(num).padStart(3,'0')}`;
        const desc=recipe[1].replace('{n}',threshold);
        const key=recipe[2];
        const difficultyFloors={tasks:[8,20,50,120,250,500,1000,2500,6000,15000,30000],study:[180,480,1200,3000,7000,15000,30000,60000,120000,250000,500000],habits:[15,40,100,250,600,1200,2500,5000,10000,20000,40000],streak:[5,14,30,60,120,240,365,730,1460,2920,5840],days:[7,21,60,150,300,600,1000,2000,4000,8000,15000],sessions:[8,20,50,120,300,600,1200,2500,6000,12000,25000],journals:[10,25,60,150,300,600,1200,2500,6000,12000,25000],moods:[10,25,60,150,300,600,1200,2500,6000,12000,25000],studyDays:[5,14,40,100,220,450,800,1500,3000,6000,12000],dailyStudy:[120,240,360,480,600,720,720,720,720,720,720],xp:[150,500,2000,7500,20000,50000,100000,250000,750000,2000000,5000000],perfectDays:[5,15,40,100,250,600,1200,2500,6000,12000,25000]};
        if(difficultyFloors[key]?.[ti])threshold=Math.max(threshold,difficultyFloors[key][ti]);
        const cond=d=>compareNum(achievementMetric(d,key),'>=',threshold);
        group.items.push({id:`hard${String(num).padStart(3,'0')}`,xp:[3,6,10,16,25,40,65,100,180,300,500][ti],name,tier:meta.title,desc,icon:icons[(num-1)%icons.length],metric:key,threshold, difficulty:meta.id, cond});
      }
      groups.push(group);
    });
    return groups;
  }
  defaultAchievementGroups=buildHard100();
  achievementGroupCollapsed=Object.fromEntries(tierMeta.map(x=>[x.id,false]));

  /* ---------- visual treatment ---------- */
  if(!document.getElementById('v3AchievementStyles')){
    const st=document.createElement('style'); st.id='v3AchievementStyles'; st.textContent=`
      .achievement-group[data-tier="de"]{background:#e8f5e9!important}.achievement-group[data-tier="trung-binh"]{background:#e0f2f1!important}.achievement-group[data-tier="kho"]{background:#e3f2fd!important}.achievement-group[data-tier="thu-thach"]{background:#fff8e1!important}.achievement-group[data-tier="cuc-kho"]{background:#fff3e0!important}.achievement-group[data-tier="ac-mong"]{background:#ffebee!important}.achievement-group[data-tier="kiet-xuat"]{background:#f3e5f5!important}
      .achievement-group[data-tier="huyen-thoai"],.achievement-group[data-tier="truyen-thuyet"],.achievement-group[data-tier="vo-cuc"],.achievement-group[data-tier="than-thoai"]{background-size:300% 300%!important;animation:v3Gradient 7s ease infinite!important}.achievement-group[data-tier="huyen-thoai"]{background-image:linear-gradient(135deg,#312e81,#2563eb,#06b6d4,#7c3aed)!important}.achievement-group[data-tier="truyen-thuyet"]{background-image:linear-gradient(135deg,#7f1d1d,#dc2626,#f59e0b,#fde047,#a855f7,#2563eb)!important;animation-duration:4s!important}.achievement-group[data-tier="vo-cuc"]{background-image:linear-gradient(135deg,#0f172a,#1e3a8a,#7c3aed,#db2777,#f59e0b)!important;animation-duration:3.2s!important}.achievement-group[data-tier="than-thoai"]{background-image:linear-gradient(135deg,#000000,#4c0519,#7c2d12,#a16207,#facc15,#ffffff)!important;animation-duration:2.5s!important}
      @keyframes v3Gradient{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
      .v3-ach-icon{width:52px;height:52px;min-width:52px;border-radius:14px;display:grid;place-items:center;font-size:27px;background:var(--tier-bg,#fff);box-shadow:0 4px 14px rgba(0,0,0,.12);border:2px solid rgba(255,255,255,.8)}
      .v3-ach-card{transition:transform .15s ease,box-shadow .15s ease}.v3-ach-card:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(0,0,0,.12)}
      .v3-special{background:linear-gradient(135deg,#7c3aed,#ec4899,#f59e0b,#06b6d4);background-size:300% 300%;animation:v3Gradient 3s ease infinite;color:#fff;border-radius:16px;padding:14px}
    `; document.head.appendChild(st);
  }
  function tierBg(id){const x=tierMeta.find(t=>t.id===id);return x?.bg||'#fff';}

  renderAchievementsView=function(){
    const container=document.getElementById('rebuiltAchievementGroups')||document.getElementById('achievementList'); if(!container)return;
    const groups=defaultAchievementGroups.map(g=>({...g,items:[...(g.items||[])]}));
    const legendary=groups.find(g=>g.id==='huyen-thoai');
    if(legendary)legendary.items.push({id:'__xp_history__',name:'Chi tiết tiến độ & lịch sử XP',tier:'🌌 HUYỀN THOẠI',desc:'Mở sổ XP của tài khoản: Kế hoạch, Thói quen, Nhiệm vụ, Thành tích và các khoản thu hồi.',icon:'🧩',xp:0});
    container.innerHTML=groups.map(g=>{
      const collapsed=!!achievementGroupCollapsed[g.id];
      return `<div class="achievement-group card" data-tier="${g.id}" style="padding:0;overflow:hidden;border:2px solid ${g.accent};background:${g.bg}">
        <button type="button" class="btn" style="width:100%;text-align:left;border:0;border-radius:0;display:flex;justify-content:space-between;align-items:center;background:${g.bg};color:${g.accent};font-weight:900" onclick="toggleAchievementGroup('${g.id}')"><span style="display:flex;align-items:center;gap:8px"><span style="font-size:24px">${g.leaf}</span>${g.title}</span><span>${collapsed?'＋':'−'}</span></button>
        <div style="display:${collapsed?'none':'grid'};gap:10px;padding:12px">${g.items.map(a=>{
          const special=a.id==='__xp_history__',unlocked=!special&&(state.unlockedAchievements||[]).includes(a.id);
          return `<div class="achievement ${unlocked?'v3-ach-unlocked':'locked'} v3-ach-card" onclick="openAchievementDetail('${a.id}')" style="width:100%;cursor:pointer;border:1px solid ${g.accent};background:${g.bg};border-radius:16px;padding:14px;display:flex;gap:12px;align-items:center">
            <div class="v3-ach-icon" style="--tier-bg:${tierBg(g.id)}">${a.icon||g.leaf}</div><div style="flex:1"><div><b>${esc(a.name)}</b> <span class="tag sm">${esc(a.tier||g.label)}</span></div><div class="kpi">${esc(a.desc||'')}</div><div style="margin-top:5px;font-weight:800;color:var(--red)">${special?'✨ Nhấn để mở lịch sử XP':(unlocked?'🏆 Đã mở khóa':'🔒 Chưa mở khóa')+(a.xp?` · ⚡ +${a.xp} XP`: '')}</div></div>
          </div>`;
        }).join('')}</div>
      </div>`;
    }).join('');
    const summary=document.getElementById('summaryAchievementList');
    if(summary){summary.innerHTML=groups.flatMap(g=>g.items.filter(a=>a.id!=='__xp_history__')).map(a=>{const u=(state.unlockedAchievements||[]).includes(a.id);return `<button class="achievement ${u?'':'locked'}" onclick="openAchievementDetail('${a.id}')" style="width:100%;text-align:left;margin-bottom:8px;border:1px solid var(--line);background:var(--card);border-radius:14px;padding:11px;display:flex;gap:10px;align-items:center"><span style="font-size:24px">${a.icon}</span><span><b>${esc(a.name)}</b><small class="muted"> · ${esc(a.tier)}</small><br><small>${u?'🏆 Đã mở khóa':'🔒 Chưa mở khóa'} · ⚡ +${a.xp} XP</small></span></button>`}).join('');}
  };

  /* ---------- XP ledger: derive current data, then append reversals ---------- */
  getCurrentXPHistoryDerived=function(ownerId){
    if(!ownerId)return [];
    const rows=[];
    (state.todos||[]).filter(t=>t.done&&(!t.ownerId||String(t.ownerId)===String(ownerId))).forEach(t=>rows.push({delta:1,source:'📋 Kế hoạch',detail:`Cộng 1 XP vì hoàn thành kế hoạch ${t.title||'Không tên'}`,at:t.completedAt||t.updatedAt||t.date||patchToday()}));
    try{calculateHabitMilestoneXP(ownerId).ledger.forEach(x=>rows.push({delta:Number(x.gain)||0,source:'🍀 Thói quen',detail:`Cộng ${Number(x.gain)||0} XP vì đạt ${x.pct}% thói quen ngày ${x.month}-${String(x.day).padStart(2,'0')} (mốc ${x.milestone}%)`,at:`${x.month}-${String(x.day).padStart(2,'0')}`}));}catch(e){}
    const quests=new Map((state.customQuests||[]).map(q=>[q.id,q]));
    (state.questClaims||[]).filter(c=>String(c.ownerId)===String(ownerId)&&quests.has(c.questId)).forEach(c=>{const q=quests.get(c.questId);rows.push({delta:Number(c.xp)||0,source:'🎯 Nhiệm vụ',detail:`Cộng ${Number(c.xp)||0} XP vì hoàn thành nhiệm vụ ${q.title||'Không tên'}`,at:c.claimedAt||patchToday()});});
    const progress=getProgressRecord(ownerId); const unlocked=new Set(progress?.unlockedAchievements||[]);
    getAchievementDefinitions().flatMap(g=>g.items||[]).filter(a=>unlocked.has(a.id)).forEach(a=>rows.push({delta:Number(a.xp)||0,source:'🏆 Thành tích',detail:`Cộng ${Number(a.xp)||0} XP vì mở khóa ${a.name}`,at:(state.moments||[]).find(m=>m.type==='achievement'&&String(m.title||'').includes(a.name))?.date||patchToday()}));
    Object.values(state.trash||{}).flat().filter(x=>String(x.ownerId)===String(ownerId)&&Number(x._xpReversal||0)<0).forEach(x=>rows.push({delta:Number(x._xpReversal),source:'🗑️ Thu hồi XP',detail:x._xpReversalDetail||`Trừ ${Math.abs(Number(x._xpReversal))} XP vì đã xóa ${x.title||x.name||x.text||'mục đã xóa'}`,at:x._deletedAt||patchToday()}));
    return rows.filter(x=>Number(x.delta)!==0).sort((a,b)=>new Date(a.at)-new Date(b.at));
  };

  /* ---------- TRASH: one owner-safe source of truth ---------- */
  function syncTrashBucket(){
    normalizeTrash();
    ensureUserStore();
    const activeId=String(patchOwnerId()||'');
    if(!activeId)return;
    // Chỉ ghi Thùng rác vào bucket của đúng tài khoản đang mở; không dùng bucket của tài khoản khác.
    const bucket=state.userData.accounts[activeId]||blankUserData();
    const ownTrash={};
    Object.keys(state.trash||{}).forEach(type=>{
      ownTrash[type]=(state.trash[type]||[]).filter(item=>{
        const owner=String(item?.ownerId||'');
        return !owner || owner===activeId;
      }).map(cloneValue);
    });
    bucket.trash=ownTrash;
    state.userData.accounts[activeId]=bucket;
  }
  moveTrash=function(type,item){
    normalizeTrash();
    const id=String(item?.ownerId||patchOwnerId()||'');
    const copy={...cloneValue(item),ownerId:id,_trashType:type,_deletedAt:new Date().toISOString()};
    if(!Array.isArray(state.trash[type]))state.trash[type]=[];
    state.trash[type].push(copy);
    syncTrashBucket();
    return state.trash[type][state.trash[type].length-1];
  };
  renderTrash=function(){
    normalizeTrash();
    const box=document.getElementById('trashList'); if(!box)return;
    const owner=String(patchOwnerId()||'');
    let html='';
    Object.entries(state.trash).forEach(([type,items])=>{
      const visible=(items||[]).filter(x=>{
        const itemOwner=String(x?.ownerId||'');
        return !owner || !itemOwner || itemOwner===owner;
      });
      if(!visible.length)return;
      html+=`<div class="trashgroup"><h4 style="color:var(--red);text-transform:uppercase">🗑️ ${esc(type)} (${visible.length})</h4>`;
      visible.forEach(item=>{const idx=items.indexOf(item); html+=`<div class="trashitem"><label style="display:flex;align-items:center;gap:10px;flex:1"><input type="checkbox" class="trash-check" data-trash-type="${esc(type)}" data-trash-index="${idx}"><div><b>${esc(item.title||item.name||item.text||'Mục đã xóa')}</b><div class="kpi">Xóa lúc: ${item._deletedAt?new Date(item._deletedAt).toLocaleString('vi-VN'):'—'}</div>${Number(item._xpReversal||0)<0?`<div class="kpi" style="color:var(--red);font-weight:900">🗑️ Thu hồi ${Math.abs(Number(item._xpReversal))} XP</div>`:''}</div></label><div class="actions"><button class="btn sm" onclick="restoreTrash('${esc(type)}',${idx})">↩️ Khôi phục</button><button class="btn danger sm" onclick="permanentDeleteTrash('${esc(type)}',${idx})">💀 Xóa vĩnh viễn</button></div></div>`}); html+='</div>';});
    box.innerHTML=html||'<div class="empty">🗑️ Thùng rác đang trống. Khi bạn xóa dữ liệu, mục đó sẽ xuất hiện ở đây để khôi phục hoặc xóa vĩnh viễn.</div>';
  };
  restoreTrashItem=function(type,item){
    if(!item)return;
    if(type.startsWith('habits_')){const ym=type.replace('habits_','');item.month=ym;ensureHabits(ym).push(item);return;}
    if(type==='habit'){const ym=item.month||String(item.createdAt||'').slice(0,7)||currentHabitMonth;item.month=ym;ensureHabits(ym).push(item);return;}
    if(type==='quest'){state.customQuests=state.customQuests||[];if(!state.customQuests.some(x=>x.id===item.id))state.customQuests.push(item);return;}
    if(type==='achievement'){state.customAchievements=state.customAchievements||[];if(!state.customAchievements.some(x=>x.id===item.id))state.customAchievements.push(item);return;}
    const key=type==='todo'?'todos':type; if(Array.isArray(state[key])){if(!state[key].some(x=>x.id===item.id))state[key].push(item);return;}
    if(type==='study'){
      const ownerId=String(item.ownerId||item.memberId||patchOwnerId()||'');
      ensureUserStore();
      const bucket=state.userData.accounts[ownerId]||blankUserData();
      bucket.adminStudyTimes=Array.isArray(bucket.adminStudyTimes)?bucket.adminStudyTimes:[];
      if(!bucket.adminStudyTimes.some(x=>x.id===item.id)) bucket.adminStudyTimes.push({...item,ownerId,memberId:item.memberId||ownerId});
      state.userData.accounts[ownerId]=bucket;
      if(String(accountOwnerId())===ownerId) state.adminStudyTimes=cloneValue(bucket.adminStudyTimes);
    }
  };
  restoreTrash=function(type,index){
    normalizeTrash();
    const arr=state.trash[type];
    const item=arr?.[index];
    if(!item)return;
    const active=String(patchOwnerId()||'');
    const owner=String(item.ownerId||active);
    if(active && item.ownerId && owner!==active)return;
    arr.splice(index,1);
    delete item._deletedAt; delete item._xpReversal; delete item._xpReversalDetail;
    restoreTrashItem(type,item);
    if(owner)recalculateCurrentProgress(owner,{persist:false});
    syncTrashBucket(); save(); renderTrash(); renderAchievementsView(); renderQuestBoard(); renderProfileView(); renderComparison();
  };
  permanentDeleteTrash=function(type,index){
    normalizeTrash();
    const arr=state.trash[type]; const item=arr?.[index];
    if(!item)return;
    const active=String(patchOwnerId()||'');
    const owner=String(item.ownerId||active);
    if(active && item.ownerId && owner!==active)return alert('⛔ Mục này thuộc tài khoản khác.');
    const label=item.title||item.name||item.text||'mục này';
    if(!confirm(`⚠️ XÓA VĨNH VIỄN\\n\\n“${String(label).replace(/[`]/g,'')}” sẽ bị xóa khỏi Thùng rác và không thể khôi phục.`))return;
    arr.splice(index,1);
    if(owner)recalculateCurrentProgress(owner,{persist:false});
    syncTrashBucket(); save(); renderTrash(); renderProfileView(); renderComparison();
  };

  /* ---------- DAILY + WEEKLY QUESTS ---------- */
  function ensureSpecialRole(){
    state.customRoles=Array.isArray(state.customRoles)?state.customRoles:[];
    let role=state.customRoles.find(r=>r.systemKey==='weekly-nightmare');
    if(!role){role={id:uid(),name:'Kẻ Chinh Phục Ác Mộng',icon:'🌌',color1:'#7c3aed',color2:'#f59e0b',gradient:true,systemKey:'weekly-nightmare',createdAt:new Date().toISOString()};state.customRoles.push(role);}
    return role;
  }
  function assignSpecialRole(ownerId){
    const role=ensureSpecialRole(); const m=state.membersList.find(x=>x.id===ownerId),a=state.memberAccounts.find(x=>x.memberId===ownerId);
    [m,a].forEach(x=>{if(!x)return;x.customRoleIds=Array.isArray(x.customRoleIds)?x.customRoleIds:[];if(!x.customRoleIds.includes(role.id))x.customRoleIds.push(role.id);}); return role;
  }
  function weeklyHabit80Days(ownerId,start,end){
    return patchDatesBetween(start,end).filter(date=>Number(dailyHabitPercent(ownerId,date)||0)>=80).length;
  }
  function weeklyPerfectPlanDays(ownerId,start,end){
    return patchDatesBetween(start,end).filter(date=>{const ts=(state.todos||[]).filter(t=>(!t.ownerId||String(t.ownerId)===String(ownerId))&&t.date===date);return ts.length>0&&ts.every(t=>t.done);}).length;
  }
  function weeklyStudy(ownerId,start,end){
    return patchDatesBetween(start,end).reduce((sum,date)=>sum+studyMinutesForDate(ownerId,date),0);
  }
  function specialQuestDone(q,ownerId){
    const start=q.weekStart,end=q.weekEnd; return weeklyStudy(ownerId,start,end)>=600 && weeklyPerfectPlanDays(ownerId,start,end)>=5 && weeklyHabit80Days(ownerId,start,end)>=5;
  }
  ensureDailyQuests=function(){
    const date=patchToday(),week=patchWeekKey(date),weekEnd=(()=>{const d=new Date(week+'T12:00:00');d.setDate(d.getDate()+6);return d.toISOString().slice(0,10)})();
    state.customQuests=Array.isArray(state.customQuests)?state.customQuests:[];
    const normal=[
      {title:'⏱️ Học chính thức ít nhất 30 phút hôm nay',xp:5,kind:'study',zone:{name:'Tập Trung',icon:'🎯',color1:'#81d4fa',color2:'#4fc3f7'}},
      {title:'🍀 Hoàn thành ít nhất 50% Thói quen hôm nay',xp:5,kind:'habit',zone:{name:'Kỷ Luật Xanh',icon:'🍀',color1:'#a5d6a7',color2:'#66bb6a'}},
      {title:'📋 Hoàn thành 100% Kế hoạch hôm nay',xp:7,kind:'todo',zone:{name:'Hoàn Thành',icon:'🏁',color1:'#ffe082',color2:'#ffca28'}}
    ];
    normal.forEach((q,i)=>{const id=`daily-${date}-${i+1}`;if(!state.customQuests.some(x=>x.id===id))state.customQuests.push({...q,id,date,auto:true,special:false});});
    const sid=`weekly-special-${week}`; if(!state.customQuests.some(x=>x.id===sid))state.customQuests.push({id:sid,date,weekStart:week,weekEnd,special:true,auto:true,kind:'weekly-nightmare',title:'🌌 THỬ THÁCH ÁC MỘNG — 10 giờ học + 5 ngày Kế hoạch 100% + 5 ngày Thói quen ≥80%',xp:75,zone:{name:'Tinh Tú Chinh Phục',icon:'🌌',color1:'#7c3aed',color2:'#f59e0b'},roleReward:'weekly-nightmare'});
    state.dailyQuestDate=date; state.dailyQuestSeed=week;
  };
  dailyQuestProgress=function(q,ownerId){
    const date=q.date||patchToday();
    if(q.kind==='study')return studyMinutesForDate(ownerId,date)>=30;
    if(q.kind==='habit')return Number(dailyHabitPercent(ownerId,date)||0)>=50;
    if(q.kind==='todo'){const ts=(state.todos||[]).filter(t=>(!t.ownerId||String(t.ownerId)===String(ownerId))&&t.date===date);return ts.length>0&&ts.every(t=>t.done);}
    if(q.kind==='weekly-nightmare')return specialQuestDone(q,ownerId);
    return false;
  };
  claimCustomQuest=function(id){
    const q=(state.customQuests||[]).find(x=>x.id===id),ownerId=patchOwnerId();if(!q||!ownerId)return;
    state.questClaims=Array.isArray(state.questClaims)?state.questClaims:[];
    if(state.questClaims.some(c=>String(c.ownerId)===String(ownerId)&&String(c.questId)===String(id)))return alert('⚠️ Nhiệm vụ này đã nhận rồi.');
    if(q.auto && !dailyQuestProgress(q,ownerId))return alert('🔒 Chưa đủ điều kiện. Hãy hoàn thành đúng yêu cầu trước.');
    const xp=Math.max(0,Number(q.xp)||0);state.questClaims.push({id:uid(),questId:q.id,ownerId,xp,claimedAt:new Date().toISOString(),zone:q.zone||null});
    recordPrivateXPHistory(ownerId,xp,'🎯 Nhiệm vụ',`Cộng ${xp} XP vì hoàn thành nhiệm vụ ${q.title}`);
    if(q.special&&q.roleReward){const role=assignSpecialRole(ownerId);awardQuestZone(ownerId,q);recordPrivateXPHistory(ownerId,0,'🎖️ Role','Nhận role '+role.name);}
    recalculateCurrentProgress(ownerId);save();renderAchievementsView();renderQuestBoard();renderProfileView();renderComparison();
    alert(`🎉 Đã nhận +${xp} XP${q.special?' và phần thưởng đặc biệt 🌌 Role + Zone!':' và Zone!'}`);
  };
  renderQuestBoard=function(){
    const box=document.getElementById('questBoard');if(!box)return;ensureDailyQuests();const owner=patchOwnerId(),date=patchToday(),week=patchWeekKey(date);const qs=(state.customQuests||[]).filter(q=>(!q.auto) || q.date===date || (q.special&&q.weekStart===week));
    box.innerHTML=qs.map(q=>{const claimed=!!owner&&(state.questClaims||[]).some(c=>String(c.ownerId)===String(owner)&&String(c.questId)===String(q.id));const done=owner?dailyQuestProgress(q,owner):false;const ready=!q.auto||done;const special=q.special;return `<div class="${special?'v3-special':'todo'}" style="margin-bottom:10px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;${special&&q.rewardBackground?`background:${q.rewardBackground};color:#fff;`:''}"><div style="flex:1"><b>${special?'🌌 NHIỆM VỤ ĐẶC BIỆT TUẦN':'🎯 NHIỆM VỤ HÔM NAY'} · ${esc(q.title)}</b><div class="kpi" style="${special?'color:#fff':''}">⚡ +${q.xp} XP · ${q.zone?.icon||'✨'} ${esc(q.zone?.name||'Zone')} ${special?'· 🎖️ Role đặc biệt':''}</div>${special?`<div style="font-size:12px;opacity:.9">Tuần ${q.weekStart} → ${q.weekEnd} · Điều kiện: 600 phút học + 5 ngày Kế hoạch 100% + 5 ngày Thói quen ≥80%</div>`:''}${done?'<div style="font-weight:900">✅ Đã đủ điều kiện</div>':''}</div>${owner?`<button class="btn sm" ${claimed||!ready?'disabled':''} onclick="claimCustomQuest('${q.id}')">${claimed?'✅ Đã nhận':ready?'⚡ Nhận XP + phần thưởng':'🔒 Chưa đủ điều kiện'}</button>`:''}</div>`}).join('')||'<div class="empty">Chưa có nhiệm vụ hôm nay.</div>';
  };

  /* ---------- RANKING: read the correct per-account data ---------- */
  comparisonMetrics=function(row,period){
    const {start,end}=comparisonPeriodDates(period);
    const ownerId=String(row.id);
    const bucket=state.userData?.accounts?.[ownerId]||state.userData?.accounts?.[String(ownerId)]||{};
    const activeId=String(accountOwnerId()||'');
    const todosSource=activeId===ownerId&&Array.isArray(state.todos)?state.todos:(Array.isArray(bucket.todos)?bucket.todos:[]);
    const todos=todosSource.filter(t=>
      (!t.ownerId||String(t.ownerId)===ownerId) && dateInRange(t.date,start,end)
    );
    const doneTodos=todos.filter(t=>t.done===true).length;
    const todoPct=todos.length?Math.round(doneTodos/todos.length*100):0;
    const habitsSource=activeId===ownerId&&state.habits&&typeof state.habits==='object'?state.habits:(bucket.habits||{});
    let habitDone=0,habitPossible=0;
    const cursor=new Date(start+'T12:00:00');
    const endDate=new Date(end+'T12:00:00');
    while(cursor<=endDate){
      const ym=toISODate(cursor).slice(0,7);
      const day=Number(toISODate(cursor).slice(8,10));
      (habitsSource[ym]||[]).filter(h=>!h.ownerId||String(h.ownerId)===ownerId).forEach(h=>{
        habitPossible++;
        if(!!(h.days||{})[day])habitDone++;
      });
      cursor.setDate(cursor.getDate()+1);
    }
    const habitPct=habitPossible?Math.round(habitDone/habitPossible*100):0;
    const studyLogs=getStudyRowsForOwner(ownerId).filter(x=>dateInRange(x.date||x.updatedAt?.slice(0,10),start,end));
    const studyMinutes=Math.max(0,studyLogs.reduce((s,x)=>s+(Number.isFinite(Number(x.deltaMinutes))?Number(x.deltaMinutes):Number(x.minutes)||0),0));
    return {todoPct,doneTodos,totalTodos:todos.length,habitPct,habitDone,habitPossible,studyMinutes,studyLogs,start,end};
  };

  /* Achievement badge colors are driven by difficulty, never by the current emotion theme. */
  function achievementBadgePalette(a){
    const d=achievementDifficulty(a);
    if(d==='easy') return {bg:'#dff7e7',border:'#43a047',text:'#166534',accent:'#238b45',label:'Dễ'};
    if(d==='medium') return {bg:'#d8f0ff',border:'#1976d2',text:'#0c4a6e',accent:'#1877b5',label:'Trung Bình'};
    if(d==='hard') return {bg:'#fff0b8',border:'#d97706',text:'#7c2d12',accent:'#a66b00',label:'Khó'};
    return {bg:'#f3e8ff',border:'#7c3aed',text:'#4c1d95',accent:'#6d28d9',label:'Cực Khó / Cao Cấp'};
  }
  function achievementBadgeStyle(a){const p=achievementBadgePalette(a);return `background:${p.bg};border:1px solid ${p.border};color:${p.text};box-shadow:0 3px 10px ${p.border}33;`;}
  function achievementRoleDescription(role,ach){
    if(!role) return '<div class="muted" style="margin-top:8px">Thành tích này không có phần thưởng Role riêng.</div>';
    const e=role.effects||{};
    const icons=Array.isArray(e.cornerIcons)?e.cornerIcons.slice(0,4).join(' '):'';
    const colors=[role.color1,role.color2].filter(Boolean).join(' → ');
    return `<div class="achievement-role-detail" style="margin-top:14px;text-align:left;padding:14px;border-radius:16px;background:linear-gradient(135deg,#fff,#f8fafc);border:2px solid ${role.tier==='Vô Cực'?'#818cf8':'#f59e0b'};box-shadow:0 10px 28px rgba(15,23,42,.12)">
      <div style="font-size:12px;font-weight:900;letter-spacing:.04em;color:#64748b">🎭 ROLE PHẦN THƯỞNG RIÊNG</div>
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:9px 0">${typeof renderRoleCapsule==='function'?renderRoleCapsule(role):`<span class="tag">${esc(role.icon||'🎭')} ${esc(role.name||'Role')}</span>`}</div>
      <div><b>${esc(role.name||'Role chưa đặt tên')}</b> <span class="tag sm">${esc(role.tier||'Thành tích')}</span></div>
      <p style="margin:7px 0"><b>Ý nghĩa:</b> Role này chỉ thuộc về thành tích “${esc(ach.name)}”, không dùng chung với thành tích khác.</p>
      <p style="margin:7px 0"><b>Nguồn gốc:</b> ${esc(role.origin||`Phần thưởng riêng từ thành tích ${ach.name}.`)}</p>
      <p style="margin:7px 0"><b>Phong cách:</b> ${esc(e.style||role.style||'Minimal')} · <b>Chuyển động:</b> ${esc(e.animation||role.animation||'none')} · <b>Ánh sáng:</b> ${esc(e.lightPreset||'none')}</p>
      <p style="margin:7px 0"><b>Màu Role:</b> ${esc(colors||'Theo mẫu Role của bậc')} ${icons?`· <b>Icon trang trí:</b> ${esc(icons)}`:''}</p>
      <p style="margin:7px 0;color:#475569"><b>Hiển thị:</b> Thành viên có thể ẩn/hiện Role này trong Profile; việc ẩn không xóa phần thưởng.</p>
    </div>`;
  }

  /* ---------- ACHIEVEMENT REWARD CONTRACT V4 ----------
     Trạng thái Thành tích luôn được tính lại từ dữ liệu hiện tại.
     Mỗi mục có metadata đầy đủ và phần thưởng được trao theo một bundle nguyên vẹn. */
  function achievementDifficulty(a){
    const t=String(a?.difficulty||a?.tier||'').toLowerCase();
    if(/than|huyen|truyen|vo-cuc|kiet/.test(t)) return 'legendary';
    if(/rat-kho|cuc-kho|ac-mong|thach/.test(t)) return 'hard';
    if(/kho/.test(t)) return 'medium';
    return 'easy';
  }
  function achievementRoleFor(a){
    if(!a || !/^hard\d+$/.test(String(a.id||''))) return null;
    const n=Number(String(a.id).replace('hard',''));
    const voNames=[
      'Người Gìn Giữ Ánh Sao','Kẻ Bền Lòng Giữa Ngân Hà','Người Gom Nhặt Tinh Tú','Bước Chân Không Mỏi',
      'Người Vượt Qua Màn Đêm','Kẻ Giữ Lửa Vũ Trụ','Người Dệt Đường Sao','Bậc Thầy Của Những Ngày Dài',
      'Người Đứng Vững Giữa Gió Ngàn','Kẻ Chạm Tới Chân Trời','Người Gieo Hạt Trên Trăng','Người Soi Đường Qua Vực Thẳm',
      'Bậc Giữ Nhịp Thiên Hà','Người Thuần Phục Dòng Thời Gian','Kẻ Không Lạc Giữa Muôn Sao','Người Đem Bình Minh Trở Lại',
      'Người Bền Gan Vững Chí','Bậc Dẫn Lối Qua Tinh Vân','Kẻ Vươn Mình Qua Giới Hạn','Người Gọi Tên Những Vì Sao',
      'Người Giữ Mạch Sáng','Bậc Thang Lên Thiên Đỉnh','Kẻ Đi Qua Vô Tận','Người Dựng Cầu Giữa Các Vì Sao',
      'Người Không Khuất Phục','Bậc Tĩnh Tâm Giữa Vũ Trụ','Kẻ Đi Tìm Miền Ánh Sáng','Người Chắp Nối Ngân Hà',
      'Bậc Thức Tỉnh Tinh Tú','Người Nắm Giữ Cực Quang','Kẻ Vượt Ngoài Biên Giới','Người Gìn Giữ Cõi Vô Cùng',
      'Bậc Khai Mở Thiên Hà','Người Viết Tiếp Chuyện Ngân Hà','Kẻ Đứng Trên Đỉnh Vô Cực','Người Làm Chủ Bầu Trời'
    ];
    const thanNames=[
      'Người Được Thần Linh Soi Lối','Bậc Giữ Lửa Thiêng','Kẻ Gọi Gió Dẫn Đường','Người Mang Ánh Sáng Cổ Xưa',
      'Bậc Tâm Sáng Như Ngọc','Người Gìn Giữ Lời Thề','Kẻ Vững Chí Qua Phong Ba','Người Đắc Đạo Từ Kiên Tâm',
      'Bậc Sáng Danh Muôn Thuở','Người Gieo Đức Gặt Lành','Kẻ Một Lòng Một Dạ','Bậc Hiền Tài Xuất Chúng',
      'Người Có Công Mài Sắt','Kẻ Chạm Tới Chân Thiện Mỹ','Bậc Dựng Nên Kỳ Tích','Người Thuận Thiên Hành Đạo',
      'Bậc Khai Tâm Minh Trí','Người Lưu Danh Hậu Thế','Kẻ Vượt Qua Cửa Ải','Bậc Thần Thoại Bất Khuất','Người Rạng Danh Núi Sông'
    ];
    let names,idx,tier,colors,icons,presets;
    if(n>=244&&n<=279){names=voNames;idx=n-244;tier='Vô Cực';colors=['#020617','#312e81'];icons=['🌌','🪐','☄️','🛰️','🌟','💫'];presets=['cosmic-float','nebula-breathe','portal-drift'];}
    else if(n>=280&&n<=300){names=thanNames;idx=n-280;tier='Thần Thoại';colors=['#240b36','#713f12'];icons=['💠','🏛️','⚜️','🔮','🕯️','🐉'];presets=['mythic-rune','divine-aura','constellation-crown'];}
    else return null;
    const name=names[idx]||`${tier} — Người Bền Chí ${idx+1}`;
    return {systemKey:`achievement-${a.id}`,achievementId:a.id,tier,sourceType:'achievement',name,icon:icons[idx%icons.length],color1:colors[0],color2:colors[1],gradientCss:tier==='Vô Cực'?'radial-gradient(circle at 18% 20%,rgba(129,140,248,.95),transparent 20%),radial-gradient(circle at 82% 78%,rgba(236,72,153,.75),transparent 22%),linear-gradient(135deg,#020617,#111827 38%,#312e81 70%,#0f172a)':'radial-gradient(circle at 22% 22%,rgba(250,204,21,.95),transparent 13%),radial-gradient(circle at 78% 76%,rgba(220,38,38,.78),transparent 22%),linear-gradient(135deg,#09090b,#240b36 42%,#581c87 68%,#713f12)',origin:`Phần thưởng riêng của thành tích “${a.name}” trong nhóm ${tier}.`,effects:{animation:tier==='Vô Cực'?'star-orbit':'sparkle',style:tier==='Vô Cực'?'Space':'Mystery',speed:tier==='Vô Cực'?7.2:4.2,strength:tier==='Vô Cực'?.85:1.1,count:4,size:.72,direction:'clockwise',gradient:true,glow:true,lightPreset:presets[idx%presets.length],cornerIcons:icons.slice(0,4),cornerCount:4,decorColor:tier==='Vô Cực'?'#bfdbfe':'#fde68a',decorBg:'rgba(15,23,42,.58)'}};
  }
  /* Every generated achievement in the 900-item system receives an explicit Role record.
     The two premium tiers retain their original pinned visual presets and Vietnamese names. */
  function achievementRoleFor(a){
    if(!a || !/^hard\d+$/.test(String(a.id||''))) return null;
    const n=Number(String(a.id).replace('hard',''));
    const rawTier=String(a.tier||'').toLowerCase();
    const tier=rawTier.includes('vô cực')||rawTier.includes('vo cuc')?'Vô Cực':rawTier.includes('thần thoại')||rawTier.includes('than thoai')?'Thần Thoại':rawTier.includes('huyền thoại')||rawTier.includes('huyen thoai')?'Huyền Thoại':rawTier.includes('truyền thuyết')||rawTier.includes('truyen thuyet')?'Truyền Thuyết':rawTier.includes('kiệt xuất')||rawTier.includes('kiet xuat')?'Kiệt Xuất':rawTier.includes('ác mộng')||rawTier.includes('ac mong')?'Ác Mộng':rawTier.includes('cực khó')||rawTier.includes('cuc kho')?'Cực Khó':rawTier.includes('thử thách')||rawTier.includes('thu thach')?'Thử Thách':rawTier.includes('khó')||rawTier.includes('kho')?'Khó':rawTier.includes('trung')?'Trung Bình':'Dễ';
    const palettes={
      'Dễ':['#dff7e7','#86efac'],'Trung Bình':['#d8f0ff','#93c5fd'],'Khó':['#ede9fe','#c4b5fd'],
      'Thử Thách':['#fff0b8','#fde68a'],'Cực Khó':['#ffd9b0','#fdba74'],'Ác Mộng':['#ffc2c8','#fda4af'],
      'Kiệt Xuất':['#f0c7e6','#f0abdc'],'Huyền Thoại':['#4c1d95','#06b6d4'],'Truyền Thuyết':['#7f1d1d','#fde047'],
      'Vô Cực':['#020617','#ec4899'],'Thần Thoại':['#240b36','#facc15']
    };
    const [color1,color2]=palettes[tier]||['#e2e8f0','#94a3b8'];
    const premium=n>=801;
    const names=premium?['Người Gìn Giữ Ánh Sao','Kẻ Bền Lòng Giữa Ngân Hà','Người Gom Nhặt Tinh Tú','Bậc Khai Tâm Minh Trí','Người Lưu Danh Hậu Thế','Kẻ Vượt Qua Cửa Ải','Người Dựng Nên Kỳ Tích','Bậc Thuận Thiên Hành Đạo']:['Người Gieo Hạt Tri Thức','Kẻ Bền Chí Học Hành','Người Mài Sắt Nên Kim','Bậc Tích Tiểu Thành Đại','Người Có Công Mài Sắt','Kẻ Một Lòng Một Dạ','Người Góp Gió Thành Bão','Bậc Dựng Nên Kỳ Tích'];
    const icons=premium?['💠','🌌','🪐','✨']:['🌱','📚','🧭','🏅'];
    const animation=tier==='Vô Cực'?'star-orbit':tier==='Thần Thoại'?'sparkle':tier==='Huyền Thoại'?'nebula-breathe':'glow';
    const lightPreset=tier==='Vô Cực'?'cosmic-float':tier==='Thần Thoại'?'mythic-rune':'divine-aura';
    return {systemKey:`achievement-role-${a.id}`,achievementId:a.id,tier,sourceType:'achievement',name:`${names[(n-1)%names.length]} · ${String(a.name||'Thành tích').replace(/ — .*/, '')} ${String(a.id).replace('hard','')}`,icon:icons[n%icons.length],color1,color2,gradientCss:`linear-gradient(135deg,${color1},${color2})`,origin:`Role độc lập được trao riêng cho thành tích “${a.name}”, không dùng chung với bất kỳ thành tích nào khác.`,description:`Role này tôn vinh việc hoàn thành thành tích ${a.name}.`,effects:{animation,style:tier==='Vô Cực'?'Space':tier==='Thần Thoại'?'Mystery':'Minimal',speed:tier==='Vô Cực'?7.2:tier==='Thần Thoại'?4.2:5.5,strength:tier==='Vô Cực'?.85:1.1,count:4,size:.72,direction:'clockwise',gradient:true,glow:true,lightPreset,cornerIcons:icons,cornerCount:4,decorColor:tier==='Vô Cực'?'#bfdbfe':tier==='Thần Thoại'?'#fde68a':color2,decorBg:'rgba(15,23,42,.58)'}};
  }
  /* One-to-one reward invariant: every Vô Cực/Thần Thoại achievement owns its own Role.
     Never reuse a Role object/systemKey across these two groups. */
  function enforceMythicInfiniteRoleIdentity(a, role){
    if(!role || (role.tier!=='Vô Cực' && role.tier!=='Thần Thoại')) return role;
    role.systemKey=`achievement-role-${a.id}`;
    role.achievementId=a.id;
    role.sourceType='achievement';
    role.origin=`Phần thưởng Role riêng cho thành tích “${a.name}” trong nhóm ${role.tier}.`;
    role.badgeId=`badge-${a.id}`;
    role.badgeName=`Huy hiệu ${a.name}`;
    roleSchema(role);
    return role;
  }
  function decorateAchievement(a){
    const role=enforceMythicInfiniteRoleIdentity(a, achievementRoleFor(a));
    const difficulty=achievementDifficulty(a);
    const badgeName=`Huy hiệu ${a.name}`;
    return {...a, difficulty:a.difficulty||difficulty, badge:{id:`badge-${a.id}`,name:badgeName,icon:a.icon||'🏆',source:a.name}, roleReward:(role||a.roleReward||null), rewardSource:`Thành tích ${a.name}`, reward:{xp:Number(a.xp)||0,badge:{id:`badge-${a.id}`,name:badgeName,icon:a.icon||'🏆',source:a.name},role:(role||a.roleReward||null)}};
  }
  function achievementValue(a, ownerId){
    const p=getProgressRecord(ownerId)||{};
    const metric=a?.metric;
    if(metric==='study') return Number(p.studyMinutes)||0;
    if(metric==='streak') return Number(p.bestStreak)||0;
    if(metric==='xp') return Number(p.xp)||0;
    if(metric==='days') return Number(p.activities||0);
    if(metric==='tasks') return Number(p.tasksDone)||0;
    if(metric==='perfectDays') return Number(p.perfectDays)||0;
    if(metric==='dailyStudy') return Number(p.studyMinutes)||0;
    const id=String(a?.id||'');
    if(id==='a1') return (p.tasksDone||0)>0?1:0;
    if(id==='a2') return (p.activityDates||[]).length;
    if(id==='a3'||id==='e1'||id==='e2'||id==='e3'||id==='e4'||id==='l4') return Number(p.xp)||0;
    if(id==='b1'||id==='b2'||id==='b3'||id==='b6'||id==='l2') return Number(p.studyMinutes)||0;
    if(id==='c1'||id==='c2'||id==='c3'||id==='c4'||id==='l5') return Number(p.bestStreak)||0;
    if(id==='b4'||id==='b5'||id==='l1') return Number((p.activityDates||[]).length);
    return null;
  }
  function achievementProgressText(a, ownerId){
    const value=achievementValue(a,ownerId), threshold=Number(a?.threshold);
    if(value===null || !Number.isFinite(threshold)) return 'Điều kiện được kiểm tra trực tiếp theo dữ liệu hiện tại.';
    const pct=Math.max(0,Math.min(100,Math.round(value/threshold*100)));
    return `${value.toLocaleString('vi-VN')} / ${threshold.toLocaleString('vi-VN')} (${pct}%)`;
  }
  function ensureAchievementRewardState(){
    state.achievementRewards=state.achievementRewards&&typeof state.achievementRewards==='object'?state.achievementRewards:{};
    return state.achievementRewards;
  }
  function grantAchievementRole(ownerId, ach){
    const rr=ach?.roleReward; if(!rr)return null;
    state.customRoles=Array.isArray(state.customRoles)?state.customRoles:[];
    let role=state.customRoles.find(r=>r.systemKey===rr.systemKey);
    if(!role){role={id:uid(),...rr,createdAt:new Date().toISOString()};state.customRoles.push(role);}
    const m=(state.membersList||[]).find(x=>String(x.id)===String(ownerId));
    const a=(state.memberAccounts||[]).find(x=>String(x.memberId)===String(ownerId));
    [m,a].forEach(x=>{if(!x)return;x.customRoleIds=Array.isArray(x.customRoleIds)?x.customRoleIds:[];if(!x.customRoleIds.includes(role.id))x.customRoleIds.push(role.id);});
    return role;
  }
  function syncAchievementRewardBundle(ownerId, ach){
    if(!ach||!ownerId)return null;
    const rewards=ensureAchievementRewardState(); const owner=String(ownerId);
    rewards[owner]=rewards[owner]&&typeof rewards[owner]==='object'?rewards[owner]:{};
    let rec=rewards[owner][ach.id];
    const role=grantAchievementRole(owner,ach);
    rec={id:ach.id,xp:Number(ach.xp)||0,badgeId:ach.badge?.id||`badge-${ach.id}`,badgeName:ach.badge?.name||`Huy hiệu ${ach.name}`,badgeSource:ach.badge?.source||ach.name,roleId:role?.id||rec?.roleId||null,roleName:role?.name||rec?.roleName||null,awardedAt:rec?.awardedAt||new Date().toISOString()};
    rewards[owner][ach.id]=rec; return rec;
  }
  function ensureAchievementMetadata(){
    const all=[];
    defaultAchievementGroups.forEach(g=>(g.items||[]).forEach(a=>{const d=decorateAchievement(a);Object.assign(a,d);all.push(a);}));
    (state.customAchievements||[]).forEach(a=>{Object.assign(a,decorateAchievement(a));});
    return all;
  }
  ensureAchievementMetadata();

  const originalRecalculateCurrentProgress=recalculateCurrentProgress;
  recalculateCurrentProgress=function(ownerId,opts={}){
    ensureAchievementMetadata();
    const result=originalRecalculateCurrentProgress(ownerId,opts);
    if(result && ownerId){
      const defs=getAchievementDefinitions().flatMap(g=>g.items||[]).map(decorateAchievement);
      const active=new Set(result.newUnlocked||[]);
      defs.filter(a=>active.has(a.id)).forEach(a=>syncAchievementRewardBundle(ownerId,a));
    }
    return result;
  };

  function ensureAchievementPopupStyles(){
    if(document.getElementById('achievementRewardPopupStyles'))return;
    const st=document.createElement('style');st.id='achievementRewardPopupStyles';st.textContent=`
      .achievement-reward-modal{z-index:80}.achievement-reward-box{position:relative;overflow:hidden;text-align:center;border:2px solid #ffd166;background:linear-gradient(145deg,#fffdf2,#fff,#fff0f3);box-shadow:0 20px 70px rgba(255,77,109,.28);animation:achievementPop .45s cubic-bezier(.2,.8,.2,1)}
      .achievement-reward-box:before{content:'✦  ✧  ✦  ✧  ✦';position:absolute;inset:8px 0 auto;color:#ffd166;font-size:24px;letter-spacing:14px;opacity:.75;animation:achievementSparkle 1.8s ease-in-out infinite}
      .achievement-reward-icon{font-size:70px;line-height:1;margin:24px auto 10px;filter:drop-shadow(0 8px 12px rgba(255,77,109,.25));animation:achievementFloat 2s ease-in-out infinite}
      .achievement-reward-line{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin:10px 0}.achievement-reward-pill{display:inline-flex;align-items:center;gap:6px;padding:8px 12px;border-radius:999px;background:#fff;border:1px solid #ffd166;font-weight:800}.achievement-badge-source{font-size:12px;color:#6c757d;margin-top:5px}
      @keyframes achievementPop{from{opacity:0;transform:translateY(18px) scale(.82)}to{opacity:1;transform:translateY(0) scale(1)}}@keyframes achievementSparkle{0%,100%{opacity:.35;transform:scale(.9)}50%{opacity:1;transform:scale(1.08)}}@keyframes achievementFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
    `;document.head.appendChild(st);
  }
  function showAchievementRewardPopup(items){
    if(!items?.length)return; ensureAchievementPopupStyles();
    const ownerId=accountOwnerId(); const rewards=items.map(a=>{const ach=decorateAchievement(a);const rec=syncAchievementRewardBundle(ownerId,ach);return {...ach,award:rec};});
    const body=`<div class="achievement-reward-box" style="padding:25px 22px"><div class="achievement-reward-icon">🎁</div><h2 style="margin:0;color:var(--red)">CHÚC MỪNG!</h2><p class="muted" style="margin:6px 0 18px">Bạn vừa đạt Thành tích theo điều kiện hiện tại.</p>${rewards.map(a=>`<div style="padding:14px 0;border-top:1px solid #ffe3a3"><div style="font-size:22px;font-weight:900;color:var(--red)">🏆 ${esc(a.name)}</div><div class="achievement-reward-line"><span class="achievement-reward-pill">⭐ +${Number(a.xp)||0} XP</span><span class="achievement-reward-pill">🏅 ${esc(a.badge?.name||`Huy hiệu ${a.name}`)}</span>${a.award?.roleName?`<span class="achievement-reward-pill">🎖️ ${esc(a.award.roleName)}</span>`:''}</div><div class="achievement-badge-source">Badge thuộc nguồn: Thành tích ${esc(a.name)}</div></div>`).join('')}<button class="btn" style="margin-top:15px" onclick="closeModal()">Tuyệt vời</button></div>`;
    const modal=document.getElementById('modal'); if(!modal)return;
    modal.classList.add('achievement-reward-modal'); showModal('🎁 Nhận phần thưởng Thành tích',body);
  }
  const originalCheckAchievements=checkAchievements;
  checkAchievements=function(){
    ensureAchievementMetadata(); const ownerId=accountOwnerId(); if(!ownerId)return [];
    const result=originalRecalculateCurrentProgress(ownerId,{persist:false})||{};
    const oldSet=new Set(result.oldUnlocked||[]), newly=(result.newUnlocked||[]).filter(id=>!oldSet.has(id));
    const defs=getAchievementDefinitions().flatMap(g=>g.items||[]).map(decorateAchievement), items=defs.filter(a=>newly.includes(a.id));
    if(items.length){
      state.moments=Array.isArray(state.moments)?state.moments:[];
      items.forEach(ach=>{const rec=syncAchievementRewardBundle(ownerId,ach);state.moments.unshift({id:uid(),date:todayISO(),title:`🏆 Mở khóa: ${ach.name}`,desc:`${ach.desc||''} — +${Number(ach.xp)||0} XP — Badge: ${ach.badge.name}${rec?.roleName?` — Role: ${rec.roleName}`:''}`,type:'achievement',achievementId:ach.id});});
      saveDerivedProgressOnly(); setTimeout(()=>showAchievementRewardPopup(items),0);
    }
    saveDerivedProgressOnly(); return items;
  };

  const originalRenderAchievementsView=renderAchievementsView;
  renderAchievementsView=function(){
    ensureAchievementMetadata();
    const ownerId=accountOwnerId();
    originalRenderAchievementsView();
    const container=document.getElementById('rebuiltAchievementGroups')||document.getElementById('achievementList');
    if(!container)return;
    container.querySelectorAll('.achievement').forEach(card=>{
      const onclick=card.getAttribute('onclick')||''; const m=onclick.match(/openAchievementDetail\('([^']+)'\)/); if(!m)return;
      const ach=getAchievementDefinitions().flatMap(g=>g.items||[]).map(decorateAchievement).find(a=>a.id===m[1]); if(!ach || card.querySelector('.achievement-role-inline'))return;
      const p=achievementBadgePalette(ach);
      card.style.background=`linear-gradient(135deg,${p.bg},#ffffff)`;
      const body=card.querySelector('div[style*="flex:1"]')||card.querySelector('.kpi')?.parentElement; if(!body)return;
      const cardRole=ach.roleReward||achievementRoleFor(ach);
      const roleMarkup=cardRole ? (typeof window.buildRoleCapsuleHTML==='function' ? window.buildRoleCapsuleHTML(cardRole) : (typeof renderRoleCapsule==='function' ? renderRoleCapsule(cardRole,{publicMode:true}) : '')) : '';
      const roleLine=cardRole?` · 🎭 Role: ${esc(cardRole.name)}`:'';
      body.insertAdjacentHTML('beforeend',`<div class="achievement-role-inline" style="margin-top:7px"><span class="tag sm" style="${achievementBadgeStyle(ach)}">🏅 ${esc(ach.badge.name)} · ${esc(p.label)}</span>${roleMarkup?`<div class="achievement-inline-role-capsule">${roleMarkup}</div>`:''}<span class="kpi" style="display:block;margin-top:4px;color:${p.accent}">📈 ${esc(achievementProgressText(ach,ownerId))}${roleLine}</span></div>`);
    });
  };

  const originalOpenAchievementDetail=openAchievementDetail;
  openAchievementDetail=function(id){
    ensureAchievementMetadata(); const ownerId=accountOwnerId(); const ach=getAchievementDefinitions().flatMap(g=>g.items||[]).map(decorateAchievement).find(a=>a.id===id);
    if(!ach)return originalOpenAchievementDetail(id);
    const unlocked=(getProgressRecord(ownerId)?.unlockedAchievements||[]).includes(id), reward=ach.reward||{};
    const palette=achievementBadgePalette(ach);
    const badge=`<span class="achievement-reward-pill" style="${achievementBadgeStyle(ach)}">🏅 ${esc(reward.badge?.name||`Huy hiệu ${ach.name}`)} · ${esc(palette.label)}</span>`;
    const roleBase=ach.roleReward||achievementRoleFor(ach); const roleHtml=typeof window.studyEmpireAchievementRoleDescriptionV18==='function'?window.studyEmpireAchievementRoleDescriptionV18(roleBase,ach):achievementRoleDescription(roleBase,ach);
    showModal(`${ach.icon||'🏆'} ${esc(ach.name)}`,`<div class="quote">${esc(ach.desc||'')}</div><p><b>ID:</b> ${esc(ach.id)}<br><b>Độ khó:</b> ${esc(String(ach.difficulty||ach.tier))}<br><b>Điều kiện hiện tại:</b> ${esc(achievementProgressText(ach,ownerId))}</p><div class="achievement-reward-line"><span class="achievement-reward-pill">⭐ +${Number(ach.xp)||0} XP</span>${badge}</div><p class="achievement-badge-source"><b>Nguồn huy hiệu:</b> Thành tích ${esc(ach.name)}. ${unlocked?'✅ Đã nhận đủ phần thưởng.':'🔒 Chưa nhận phần thưởng.'}</p>${roleHtml}`);
  };

  /* ---------- ROLE WORKSHOP + WEEKLY REWARD V5 ---------- */
  function roleSchema(role){
    role=role||{};
    role.visibility=role.visibility==='hidden'?'hidden':'public';
    role.sourceType=role.sourceType||((role.systemKey||'').startsWith('weekly-')?'weekly_reward':((role.achievementId||'').trim()?'achievement':'custom'));
    role.effects=role.effects||{};
    role.effects.animation=role.effects.animation||role.animStyle||'none';
    role.effects.style=role.effects.style||'Minimal'; role.effects.speed=Number(role.effects.speed)||6; role.effects.strength=Number(role.effects.strength)||1; role.effects.count=Math.max(0,Number(role.effects.count)||8); role.effects.size=Number(role.effects.size)||1; role.effects.direction=role.effects.direction||'clockwise';
    role.effects.glow=role.effects.glow!==false; role.effects.gradient=role.effects.gradient!==false;
    role.gradient=role.effects.gradient;
    role.gradientCss=role.gradientCss||'';
    return role;
  }
  function normalizeAllRoles(){ state.customRoles=Array.isArray(state.customRoles)?state.customRoles:[]; state.customRoles.forEach(roleSchema); return state.customRoles; }
  normalizeAllRoles();
  const ROLE_ANIMATIONS=[['none','None / Đứng yên'],['glow','Glow'],['pulse','Pulse'],['sparkle','Sparkle'],['orbit','Orbit'],['shimmer','Shimmer'],['wave','Wave'],['bounce','Bounce'],['particle','Particle'],['bee-fly','Bee Fly'],['heart-float','Heart Float'],['triangle-orbit','Triangle Orbit'],['star-orbit','Star Orbit'],['energy-wave','Energy Wave']];
  const ROLE_STYLES=['Minimal','Cyber','Space','Nature','Energy','Dark','Light','Geometry','Cute Neutral','Mystery'];
  const ROLE_EFFECT_ICONS=['💗','🐝','⭐','✦','▲','△','●','✧','◌','◇'];
  function roleHash(text){let h=0;for(let i=0;i<String(text).length;i++)h=(h*31+String(text).charCodeAt(i))>>>0;return h;}
  function roleWeekKey(){ return typeof patchWeekKey==='function'?patchWeekKey(typeof patchToday==='function'?patchToday():todayISO()):todayISO().slice(0,7); }
  function weeklyRewardForWeek(week){
    state.weeklyRewards=state.weeklyRewards&&typeof state.weeklyRewards==='object'?state.weeklyRewards:{};
    const key=String(week||roleWeekKey()); if(state.weeklyRewards[key])return state.weeklyRewards[key];
    const h=roleHash(key), names=['Người Giữ Nhịp Bình Minh','Người Dẫn Đường Tập Trung','Người Gieo Hạt Kỷ Luật','Nhà Thám Hiểm Tri Thức','Người Thắp Sáng Tuần Học','Người Bền Bỉ Dịu Dàng'];
    const styles=['Nature','Cyber','Space','Energy','Cute Neutral','Mystery'], anims=['shimmer','energy-wave','bee-fly','orbit','sparkle','wave'];
    const c=[['#0f766e','#5eead4'],['#2563eb','#a78bfa'],['#16a34a','#facc15'],['#312e81','#06b6d4'],['#ec4899','#f9a8d4'],['#111827','#7c3aed']][h%6];
    const reward={id:`weekly-reward-${key}`,weeklyRewardId:`weekly-reward-${key}`,week:key,name:names[h%names.length],icon:['🌅','🎯','🌱','🧭','💡','🌌'][h%6],style:styles[h%6],animation:anims[h%6],color1:c[0],color2:c[1],gradientCss:`linear-gradient(135deg,${c[0]},${c[1]})`,title:'PHẦN THƯỞNG TUẦN',missionTitle:'NHIỆM VỤ ĐẶC BIỆT THEO TUẦN'};
    state.weeklyRewards[key]=reward; return reward;
  }
  function ensureWeeklyRoleForWeek(week){
    const reward=weeklyRewardForWeek(week); state.customRoles=Array.isArray(state.customRoles)?state.customRoles:[];
    let role=state.customRoles.find(r=>r.weeklyRewardId===reward.weeklyRewardId);
    if(!role){role=roleSchema({id:uid(),systemKey:`weekly-${week}`,name:reward.name,icon:reward.icon,color1:reward.color1,color2:reward.color2,gradientCss:reward.gradientCss,sourceType:'weekly_reward',weeklyRewardId:reward.weeklyRewardId,origin:`Phần thưởng từ ${reward.title}: ${reward.missionTitle} (${week})`,effects:{animation:reward.animation,style:reward.style,speed:6,strength:1,count:9,size:1,direction:'clockwise',glow:true,gradient:true},createdAt:new Date().toISOString()});state.customRoles.push(role);}
    return role;
  }
  /* V19: Role phần thưởng tuần là Role hệ thống, nhận trực tiếp từ nhiệm vụ; không đưa vào Xưởng Founder. */
  function isWeeklySystemRole(role){
    return !!role && (role.sourceType==='weekly_reward' || !!role.weeklyRewardId || String(role.systemKey||'').startsWith('weekly-'));
  }
  function weeklySystemRoleStore(){
    state.systemWeeklyRoles=state.systemWeeklyRoles&&typeof state.systemWeeklyRoles==='object'?state.systemWeeklyRoles:{};
    return state.systemWeeklyRoles;
  }
  function rememberWeeklySystemRole(role){
    if(!role)return role;
    role.sourceType='weekly_reward'; role.systemManaged=true; role.founderWorkshopVisible=false;
    weeklySystemRoleStore()[String(role.weeklyRewardId||role.systemKey||role.id)]=role;
    return role;
  }
  function getWeeklySystemRoleById(roleId){
    const store=weeklySystemRoleStore();
    const fromStore=Object.values(store).find(r=>String(r.id)===String(roleId)||String(r.systemKey)===String(roleId)||String(r.weeklyRewardId)===String(roleId));
    if(fromStore)return fromStore;
    return (state.customRoles||[]).find(r=>String(r.id)===String(roleId)||String(r.systemKey)===String(roleId)||String(r.weeklyRewardId)===String(roleId))||null;
  }
  const originalGetCustomRolesForMemberV19=window.getCustomRolesForMember;
  window.getCustomRolesForMember=function(memberId){
    const base=typeof originalGetCustomRolesForMemberV19==='function'?originalGetCustomRolesForMemberV19(memberId):[];
    const m=(state.membersList||[]).find(x=>String(x.id)===String(memberId));
    const a=(state.memberAccounts||[]).find(x=>String(x.memberId)===String(memberId));
    const ids=[...(Array.isArray(m?.customRoleIds)?m.customRoleIds:[]),...(Array.isArray(a?.customRoleIds)?a.customRoleIds:[])];
    const weekly=Object.values(weeklySystemRoleStore()).filter(r=>ids.some(id=>String(id)===String(r.id)));
    return [...new Map([...base,...weekly].map(r=>[String(r.id),r])).values()];
  };
  const originalEnsureWeeklyRoleForWeekV19=ensureWeeklyRoleForWeek;
  ensureWeeklyRoleForWeek=function(week){
    const reward=weeklyRewardForWeek(week);
    const key=String(reward.weeklyRewardId||`weekly-${week}`);
    const stored=weeklySystemRoleStore()[key];
    if(stored)return stored;
    const legacy=(state.customRoles||[]).find(r=>r.weeklyRewardId===reward.weeklyRewardId||r.systemKey===`weekly-${week}`);
    const role=rememberWeeklySystemRole(legacy||originalEnsureWeeklyRoleForWeekV19(week));
    if(Array.isArray(state.customRoles))state.customRoles=state.customRoles.filter(r=>!isWeeklySystemRole(r));
    return role;
  };
  const originalAssignSpecialRoleV19=assignSpecialRole;
  assignSpecialRole=function(ownerId){
    const role=rememberWeeklySystemRole(ensureWeeklyRoleForWeek(roleWeekKey()));
    const m=(state.membersList||[]).find(x=>String(x.id)===String(ownerId));
    const a=(state.memberAccounts||[]).find(x=>String(x.memberId)===String(ownerId));
    [m,a].forEach(x=>{if(!x)return;x.customRoleIds=Array.isArray(x.customRoleIds)?x.customRoleIds:[];if(!x.customRoleIds.includes(role.id))x.customRoleIds.push(role.id);});
    return role;
  };
  const originalRenderCustomRolesV19=window.renderCustomRoles;
  window.renderCustomRoles=function(){
    if(typeof originalRenderCustomRolesV19==='function')return originalRenderCustomRolesV19.apply(this,arguments);
  };
  const originalFounderAssignRoleV19=window.founderAssignRole;
  window.founderAssignRole=function(roleId){
    const role=getWeeklySystemRoleById(roleId);
    if(isWeeklySystemRole(role))return alert('🎁 Role nhiệm vụ tuần được cấp tự động khi nhận đủ điều kiện; không cần gán từ Xưởng Founder.');
    return typeof originalFounderAssignRoleV19==='function'?originalFounderAssignRoleV19.apply(this,arguments):undefined;
  };
  const originalFounderDeleteRoleV19=window.founderDeleteRole;
  window.founderDeleteRole=function(roleId){
    const role=getWeeklySystemRoleById(roleId);
    if(isWeeklySystemRole(role))return alert('🔒 Role nhiệm vụ tuần là Role hệ thống và không thể xóa trong Xưởng Founder.');
    return typeof originalFounderDeleteRoleV19==='function'?originalFounderDeleteRoleV19.apply(this,arguments):undefined;
  };
  const originalFounderToggleRoleVisibilityV19=window.founderToggleRoleVisibility;
  window.founderToggleRoleVisibility=function(roleId){
    const role=getWeeklySystemRoleById(roleId);
    if(isWeeklySystemRole(role))return alert('🔒 Role nhiệm vụ tuần được quản lý bởi điều kiện nhiệm vụ, không chỉnh trong Xưởng Founder.');
    return typeof originalFounderToggleRoleVisibilityV19==='function'?originalFounderToggleRoleVisibilityV19.apply(this,arguments):undefined;
  };
  const originalEnsureSpecialRole=typeof ensureSpecialRole==='function'?ensureSpecialRole:null;
  ensureSpecialRole=function(){return ensureWeeklyRoleForWeek(roleWeekKey())};
  const originalAssignSpecialRole=typeof assignSpecialRole==='function'?assignSpecialRole:null;
  assignSpecialRole=function(ownerId){
    const role=ensureWeeklyRoleForWeek(roleWeekKey()); const m=(state.membersList||[]).find(x=>String(x.id)===String(ownerId)),a=(state.memberAccounts||[]).find(x=>String(x.memberId)===String(ownerId));
    [m,a].forEach(x=>{if(!x)return;x.customRoleIds=Array.isArray(x.customRoleIds)?x.customRoleIds:[];if(!x.customRoleIds.includes(role.id))x.customRoleIds.push(role.id);}); return role;
  };
  const originalEnsureDailyQuests=ensureDailyQuests;
  ensureDailyQuests=function(){
    originalEnsureDailyQuests(); const week=roleWeekKey(),reward=weeklyRewardForWeek(week),role=ensureWeeklyRoleForWeek(week),sid=`weekly-special-${week}`; const q=(state.customQuests||[]).find(x=>x.id===sid);
    if(q){q.title=`${reward.missionTitle} — 10 giờ học + 5 ngày Kế hoạch 100% + 5 ngày Thói quen ≥80%`;q.weeklyRewardId=reward.weeklyRewardId;q.roleReward=role.systemKey;q.rewardTitle=reward.title;q.rewardName=reward.name;q.rewardBackground=reward.gradientCss;}
  };
  function roleCss(role){
    roleSchema(role); const e=role.effects, grad=role.gradientCss||(e.gradient?`linear-gradient(135deg,${role.color1||'#d8f3dc'},${role.color2||'#bde0fe'})`:role.color1||'#d8f3dc');
    const dur=Math.max(.8,Math.min(30,e.speed||6)), strength=Math.max(0,Math.min(3,e.strength||1));
    return `--role-bg:${grad};--role-speed:${dur}s;--role-strength:${strength};--role-size:${Math.max(.5,Math.min(2,e.size||1))};`;
  }
  function renderRoleCapsule(role,opts={}){
    roleSchema(role); const e=role.effects, anim=e.animation||'none', count=Math.min(32,Math.max(0,e.count||0)); const publicMode=opts.publicMode===true;
    if(publicMode&&role.visibility==='hidden')return '';
    const icons=(e.icons&&Array.isArray(e.icons)?e.icons:ROLE_EFFECT_ICONS); let fx='';
    if(anim!=='none'){for(let i=0;i<count;i++){const icon=icons[i%icons.length];fx+=`<span class="role-fx role-fx-${anim}" style="--i:${i};--n:${count}">${icon}</span>`;}}
    const source=role.sourceType==='achievement'?`🏆 Thành tích ${role.achievementId||''}`:role.sourceType==='weekly_reward'?`🎁 Phần thưởng tuần ${role.weeklyRewardId||''}`:'🎨 Role custom';
    return `<span class="role-capsule role-anim-${anim} role-style-${String(e.style||'Minimal').replace(/[^a-z0-9]/gi,'-')}" style="${roleCss(role)}" title="${esc(source)}"><span class="role-fx-layer">${fx}</span><span class="role-capsule-content">${esc(role.icon||'🏷️')} ${esc(role.name||'Role')}</span></span>`;
  }
  function ensureRoleWorkshopStyles(){
    if(document.getElementById('roleWorkshopStyles'))return; const st=document.createElement('style');st.id='roleWorkshopStyles';st.textContent=`
      .role-capsule{position:relative;display:inline-flex;align-items:center;justify-content:center;min-width:132px;min-height:40px;padding:8px 18px;border-radius:999px;background:var(--role-bg);color:#fff;border:2px solid rgba(255,255,255,.9);font-weight:900;letter-spacing:.1px;box-shadow:0 0 calc(12px*var(--role-strength)) rgba(255,255,255,.45);overflow:visible;transform:scale(var(--role-size));isolation:isolate}.role-capsule-content{position:relative;z-index:3;text-shadow:0 1px 3px rgba(0,0,0,.55);white-space:nowrap}.role-fx-layer{position:absolute;inset:-24px;pointer-events:none;z-index:1}.role-fx{position:absolute;left:calc(50% + ((var(--i) - var(--n)/2) * 15px));top:calc(50% + ((var(--i)%3 - 1) * 12px));font-size:calc(12px * var(--role-size));animation-duration:var(--role-speed);animation-delay:calc(var(--i) * -0.23s);animation-iteration-count:infinite;animation-timing-function:ease-in-out}.role-anim-none .role-fx{display:none}.role-anim-glow{animation:rwGlow var(--role-speed) ease-in-out infinite}.role-anim-pulse{animation:rwPulse var(--role-speed) ease-in-out infinite}.role-anim-shimmer,.role-anim-wave{background-size:240% 100%;animation:rwShimmer var(--role-speed) linear infinite}.role-fx-sparkle,.role-fx-particle,.role-fx-energy-wave{animation-name:rwSparkle}.role-fx-orbit,.role-fx-triangle-orbit,.role-fx-star-orbit{animation-name:rwOrbit}.role-fx-bee-fly{animation-name:rwBee}.role-fx-heart-float{animation-name:rwFloat}.role-fx-bounce{animation-name:rwBounce}.role-fx-wave{animation-name:rwWave}.role-style-Cyber{border-color:#67e8f9;box-shadow:0 0 14px #22d3ee}.role-style-Space{box-shadow:0 0 18px #a78bfa}.role-style-Dark{border-color:#facc15}.role-style-Geometry .role-fx{font-family:monospace}.role-workshop-preview{min-height:100px;display:grid;place-items:center;background:linear-gradient(135deg,#f8fafc,#eef2ff);border:1px dashed var(--line);border-radius:16px;padding:25px}.role-workshop-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.role-role-row{display:flex;align-items:center;gap:10px;justify-content:space-between;flex-wrap:wrap;padding:12px;border:1px solid var(--line);border-radius:16px;background:#fff}.role-source{font-size:11px;color:var(--muted);margin-top:4px}@keyframes rwGlow{0%,100%{filter:brightness(1);box-shadow:0 0 5px rgba(255,255,255,.2)}50%{filter:brightness(calc(1 + .25 * var(--role-strength)));box-shadow:0 0 calc(25px * var(--role-strength)) rgba(255,255,255,.85)}}@keyframes rwPulse{0%,100%{transform:scale(var(--role-size))}50%{transform:scale(calc(var(--role-size)*1.08))}}@keyframes rwShimmer{to{background-position:240% center}}@keyframes rwSparkle{0%,100%{opacity:.25;transform:scale(.7) rotate(0)}50%{opacity:1;transform:scale(1.3) rotate(180deg)}}@keyframes rwOrbit{0%{transform:rotate(0) translateX(45px) rotate(0)}100%{transform:rotate(360deg) translateX(45px) rotate(-360deg)}}@keyframes rwBee{0%,100%{transform:translate(-22px,8px) rotate(-8deg)}50%{transform:translate(25px,-18px) rotate(12deg)}}@keyframes rwFloat{0%,100%{transform:translateY(18px);opacity:.3}50%{transform:translateY(-24px);opacity:1}}@keyframes rwBounce{0%,100%{transform:translateY(15px)}50%{transform:translateY(-18px)}}@keyframes rwWave{0%,100%{transform:translateX(-15px)}50%{transform:translateX(18px)}}
      @media(max-width:760px){.role-workshop-grid{grid-template-columns:1fr}.role-capsule{min-width:110px;padding:7px 12px;font-size:13px}}
    `;document.head.appendChild(st);
  }
  function roleFormOptions(arr){return arr.map(x=>`<option value="${esc(x[0])}">${esc(x[1])}</option>`).join('');}
  function workshopReadRole(){return roleSchema({name:$('rwName')?.value.trim()||'Xem trước Role',icon:$('rwIcon')?.value.trim()||'🏷️',color1:$('rwColor1')?.value||'#7c3aed',color2:$('rwColor2')?.value||'#06b6d4',gradientCss:$('rwGradient')?.value.trim()||`linear-gradient(135deg,${$('rwColor1')?.value||'#7c3aed'},${$('rwColor2')?.value||'#06b6d4'})`,effects:{animation:$('rwAnimation')?.value||'none',style:$('rwStyle')?.value||'Minimal',speed:Number($('rwSpeed')?.value)||6,strength:Number($('rwStrength')?.value)||1,count:Number($('rwCount')?.value)||8,size:Number($('rwSize')?.value)||1,direction:$('rwDirection')?.value||'clockwise',gradient:$('rwUseGradient')?.checked!==false,glow:$('rwGlow')?.checked!==false}});}
  function refreshRoleWorkshopPreview(){ensureRoleWorkshopStyles();const box=$('roleWorkshopPreview');if(box)box.innerHTML=renderRoleCapsule(workshopReadRole());}
  founderCreateRole=function(){
    if(state.sessionAuth?.role!=='Founder')return alert('🔒 Chỉ Người sáng lập web mới được tạo Role.'); ensureRoleWorkshopStyles();
    showModal('🎨 Xưởng tạo Role',`<div class="role-workshop-grid"><div><label>Tên Role</label><input id="rwName" value="Người dẫn đường"></div><div><label>Icon</label><input id="rwIcon" value="🌟" maxlength="6"></div><div><label>Màu nền HEX/RGB/HSL</label><input id="rwColor1" type="color" value="#7c3aed"><input id="rwColor1Text" value="#7c3aed" style="margin-top:5px"></div><div><label>Màu thứ hai / màu viền</label><input id="rwColor2" type="color" value="#06b6d4"><input id="rwColor2Text" value="#06b6d4" style="margin-top:5px"></div><div class="full"><label>Gradient tự chọn (CSS linear/radial/conic-gradient)</label><input id="rwGradient" value="linear-gradient(135deg,#7c3aed,#06b6d4)"></div><div><label>Phong cách</label><select id="rwStyle">${ROLE_STYLES.map(x=>`<option>${x}</option>`).join('')}</select></div><div><label>Animation tự chạy</label><select id="rwAnimation">${roleFormOptions(ROLE_ANIMATIONS)}</select></div><div><label>Tốc độ (giây)</label><input id="rwSpeed" type="range" min=".8" max="20" step=".2" value="6"></div><div><label>Độ mạnh</label><input id="rwStrength" type="range" min="0" max="3" step=".1" value="1"></div><div><label>Số lượng hiệu ứng</label><input id="rwCount" type="range" min="0" max="24" step="1" value="8"></div><div><label>Kích thước</label><input id="rwSize" type="range" min=".5" max="2" step=".1" value="1"></div><div><label>Hướng chuyển động</label><select id="rwDirection"><option value="clockwise">Theo chiều kim đồng hồ</option><option value="counter">Ngược chiều kim đồng hồ</option><option value="vertical">Lên xuống</option><option value="horizontal">Trái phải</option></select></div><div><label><input id="rwUseGradient" type="checkbox" checked style="width:18px"> Dùng gradient</label><label><input id="rwGlow" type="checkbox" checked style="width:18px"> Dùng glow</label></div><div class="full role-workshop-preview" id="roleWorkshopPreview"></div><div class="full"><label>Nguồn / mô tả Role</label><textarea id="rwOrigin" placeholder="Mô tả lý do tạo Role"></textarea></div></div><button class="btn" style="margin-top:12px" onclick="confirmFounderCreateRoleV5()">💾 Tạo Role</button>`);
    ['rwName','rwIcon','rwColor1','rwColor2','rwColor1Text','rwColor2Text','rwGradient','rwStyle','rwAnimation','rwSpeed','rwStrength','rwCount','rwSize','rwDirection','rwUseGradient','rwGlow'].forEach(id=>{const el=$(id);if(el)el.addEventListener('input',()=>{if(id==='rwColor1Text'&&/^#/.test(el.value))$('rwColor1').value=el.value;if(id==='rwColor2Text'&&/^#/.test(el.value))$('rwColor2').value=el.value;refreshRoleWorkshopPreview();});}); refreshRoleWorkshopPreview();
  };
  confirmFounderCreateRoleV5=function(){
    if(state.sessionAuth?.role!=='Founder')return; const r=workshopReadRole(); if(!r.name.trim())return alert('⚠️ Tên Role không được để trống.'); if((state.customRoles||[]).some(x=>String(x.name).toLocaleLowerCase('vi-VN')===r.name.toLocaleLowerCase('vi-VN')))return alert('🚨 Role này đã tồn tại.'); r.id=uid();r.sourceType='custom';r.origin=$('rwOrigin')?.value.trim()||'';r.createdAt=new Date().toISOString();roleSchema(r);state.customRoles.push(r);save();closeModal();renderCustomRoles();renderAdminView();alert(`✅ Đã tạo Role ${r.icon} ${r.name}.`);
  };
  founderToggleRoleVisibility=function(id){const r=(state.customRoles||[]).find(x=>x.id===id);if(!r)return;r.visibility=r.visibility==='hidden'?'public':'hidden';roleSchema(r);save();renderCustomRoles();renderAdminView();renderProfileView();renderComparison();};
  renderCustomRoles=function(){ensureRoleWorkshopStyles();normalizeAllRoles();const box=$('customRolesList');if(!box)return;box.innerHTML=state.customRoles.length?state.customRoles.map(r=>`<div class="role-role-row"><div><span class="stable-role-click" onclick="showRoleOrigin('${r.id}')">${renderRoleCapsule(r)}</span><div class="role-source">Nguồn: ${esc(r.sourceType)}${r.achievementId?` · achievementId: ${esc(r.achievementId)}`:''}${r.weeklyRewardId?` · weeklyRewardId: ${esc(r.weeklyRewardId)}`:''} · ${r.visibility==='hidden'?'🔒 Ẩn':'🌍 Công khai'}</div></div><div class="actions"><button class="btn sm light" onclick="founderAssignRole('${r.id}')">👤 Gán cho tài khoản</button><button class="btn sm light" onclick="founderToggleRoleVisibility('${r.id}')">${r.visibility==='hidden'?'👁️ Hiện Role':'🙈 Ẩn Role'}</button><button class="btn sm light stable-edit-role" onclick="founderEditRoleStable('${r.id}')">✏️ Chỉnh sửa Role</button><button class="btn sm danger" onclick="founderDeleteRole('${r.id}')">Xóa Role</button></div></div>`).join(''):'<p class="muted">Chưa có Role. Founder có thể tạo Role mới bằng nút phía trên.</p>';};
  renderRoleBadges=function(memberId){ensureRoleWorkshopStyles();return getCustomRolesForMember(memberId).filter(r=>roleSchema(r).visibility==='public').map(r=>renderRoleCapsule(r,{publicMode:true})).join('');};
  const originalRenderProfileViewV5=renderProfileView; renderProfileView=function(){originalRenderProfileViewV5();const id=state.sessionAuth?.memberId,box=$('profileRoleBadge');if(!id||!box)return;const hidden=getCustomRolesForMember(id).filter(r=>r.visibility==='hidden');if(hidden.length)box.insertAdjacentHTML('beforeend',`<div style="margin-top:8px"><small class="muted">Role của tôi (đang ẩn):</small><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:6px">${hidden.map(r=>renderRoleCapsule(r)).join('')}</div></div>`);};
  ensureRoleWorkshopStyles(); ensureDailyQuests();
  ensureWeeklyRoleForWeek(roleWeekKey());
  /* Role provenance normalization: achievement / weekly_reward / custom */
  const previousGrantAchievementRoleV5=grantAchievementRole;
  grantAchievementRole=function(ownerId,ach){
    const rr=ach?.roleReward;
    if(!rr)return null;
    const role=previousGrantAchievementRoleV5(ownerId,ach);
    if(role){role.sourceType='achievement';role.achievementId=ach.id;role.origin=role.origin||`Phần thưởng từ Thành tích ${ach.name}`;roleSchema(role);saveDerivedProgressOnly();}
    return role;
  };
  normalizeAllRoles();
  /* Border orbit refinement: icons hug the capsule border instead of a large frame. */
  function ensureRoleBorderOrbitStyles(){
    if(document.getElementById('roleBorderOrbitStyles'))return;
    const st=document.createElement('style');st.id='roleBorderOrbitStyles';st.textContent=`
      .role-capsule{overflow:visible!important}
      .role-fx-layer{position:absolute;inset:-11px -14px!important;border-radius:999px!important;overflow:visible!important;pointer-events:none!important;background:none!important;border:0!important}
      .role-fx{left:0!important;top:0!important;width:100%;height:100%;display:grid;place-items:center;offset-path:ellipse(50% 50% at 50% 50%);offset-distance:calc(var(--i) * 1turn / var(--n));offset-rotate:0deg;transform-origin:center;}
      .role-fx-orbit,.role-fx-triangle-orbit,.role-fx-star-orbit{animation-name:rwBorderOrbit!important}
      .role-fx-sparkle,.role-fx-particle,.role-fx-energy-wave{animation-name:rwBorderSparkle!important}
      @keyframes rwBorderOrbit{0%{offset-distance:calc(var(--i) * 1turn / var(--n));opacity:.5}50%{offset-distance:calc((var(--i) * 1turn / var(--n)) + .5turn);opacity:1}100%{offset-distance:calc((var(--i) * 1turn / var(--n)) + 1turn);opacity:.5}}
      @keyframes rwBorderSparkle{0%,100%{offset-distance:calc(var(--i) * 1turn / var(--n));opacity:.25;transform:scale(.7)}50%{offset-distance:calc((var(--i) * 1turn / var(--n)) + .08turn);opacity:1;transform:scale(1.25)}}
    `;document.head.appendChild(st);
  }
  const previousRenderRoleCapsuleBorder=renderRoleCapsule;
  renderRoleCapsule=function(role,opts={}){ensureRoleBorderOrbitStyles();return previousRenderRoleCapsuleBorder(role,opts);};
  ensureRoleBorderOrbitStyles();
  /* Corner ornaments: four small icons hug the capsule corners like a decorative frame. */
  var ROLE_ANIMATION_VI={none:'Đứng yên',glow:'Phát sáng',pulse:'Nhịp sáng',sparkle:'Lấp lánh',orbit:'Quỹ đạo',shimmer:'Lướt sáng',wave:'Gợn sóng',bounce:'Nảy nhẹ','particle':'Hạt sáng','bee-fly':'Ong bay','heart-float':'Tim bay','triangle-orbit':'Tam giác quỹ đạo','star-orbit':'Sao quỹ đạo','energy-wave':'Sóng năng lượng'};
  var ROLE_STYLE_VI={Minimal:'Tối giản',Cyber:'Công nghệ',Space:'Vũ trụ',Nature:'Thiên nhiên',Energy:'Năng lượng',Dark:'Tối',Light:'Sáng',Geometry:'Hình học','Cute Neutral':'Dễ thương trung tính',Mystery:'Bí ẩn'};
  var ROLE_SOURCE_VI={custom:'Tự tạo',achievement:'Thành tích',weekly_reward:'Phần thưởng tuần'};
  function roleCornerIcons(role){const e=role.effects||{};if(Array.isArray(e.cornerIcons)&&e.cornerIcons.length)return e.cornerIcons;return [role.icon||'✦','✦','✧','•'];}
  function renderRoleCapsule(role,opts={}){
    ensureRoleBorderOrbitStyles();roleSchema(role);if(opts.publicMode===true&&role.visibility==='hidden')return '';
    const e=role.effects||{},anim=e.animation||'none',icons=roleCornerIcons(role),n=Math.min(4,Math.max(1,Number(e.cornerCount)||4));
    const corners=['top-left','top-right','bottom-left','bottom-right'].slice(0,n).map((pos,i)=>`<span class="role-corner role-corner-${pos} role-corner-anim-${anim}" style="--corner-delay:${i*.3}s">${esc(icons[i%icons.length])}</span>`).join('');
    const source=ROLE_SOURCE_VI[role.sourceType]||'Role';
    return `<span class="role-capsule role-anim-${anim} role-style-${String(e.style||'Minimal').replace(/[^a-z0-9]/gi,'-')} role-corners" style="${roleCss(role)}" title="Nguồn: ${esc(source)}${role.achievementId?' · Thành tích: '+esc(role.achievementId):''}${role.weeklyRewardId?' · Tuần: '+esc(role.weeklyRewardId):''}"><span class="role-fx-layer role-corner-layer">${corners}</span><span class="role-capsule-content">${esc(role.icon||'🏷️')} ${esc(role.name||'Role')}</span></span>`;
  }
  function ensureRoleCornerStyles(){
    if(document.getElementById('roleCornerStyles'))return;const st=document.createElement('style');st.id='roleCornerStyles';st.textContent=`
      .role-corners{margin:8px 10px}.role-corner-layer{inset:-9px -10px!important;border-radius:999px!important}.role-corner{position:absolute!important;width:22px;height:22px;display:grid;place-items:center;font-size:calc(15px * var(--role-size));line-height:1;z-index:4;text-shadow:0 1px 3px rgba(0,0,0,.25);filter:drop-shadow(0 2px 2px rgba(0,0,0,.18));animation-duration:var(--role-speed);animation-delay:var(--corner-delay);animation-iteration-count:infinite;animation-timing-function:ease-in-out}.role-corner-top-left{left:-5px;top:-8px}.role-corner-top-right{right:-5px;top:-8px}.role-corner-bottom-left{left:-5px;bottom:-8px}.role-corner-bottom-right{right:-5px;bottom:-8px}.role-corner-anim-none{animation:none}.role-corner-anim-glow,.role-corner-anim-pulse{animation-name:rcGlow}.role-corner-anim-sparkle,.role-corner-anim-shimmer{animation-name:rcSparkle}.role-corner-anim-orbit,.role-corner-anim-triangle-orbit,.role-corner-anim-star-orbit{animation-name:rcOrbit}.role-corner-anim-bee-fly{animation-name:rcBee}.role-corner-anim-heart-float{animation-name:rcFloat}.role-corner-anim-bounce{animation-name:rcBounce}.role-corner-anim-wave,.role-corner-anim-energy-wave{animation-name:rcWave}@keyframes rcGlow{0%,100%{opacity:.65;transform:scale(.9)}50%{opacity:1;transform:scale(1.18);filter:drop-shadow(0 0 6px rgba(255,255,255,.9))}}@keyframes rcSparkle{0%,100%{opacity:.35;transform:rotate(0) scale(.75)}50%{opacity:1;transform:rotate(20deg) scale(1.2)}}@keyframes rcOrbit{0%,100%{transform:translate(0,0) rotate(0)}50%{transform:translate(5px,-4px) rotate(180deg)}}@keyframes rcBee{0%,100%{transform:translate(0,0)}50%{transform:translate(8px,-5px)}}@keyframes rcFloat{0%,100%{transform:translateY(3px);opacity:.5}50%{transform:translateY(-6px);opacity:1}}@keyframes rcBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}@keyframes rcWave{0%,100%{transform:translateX(-3px)}50%{transform:translateX(3px)}}
    `;document.head.appendChild(st);
  }
  ensureRoleCornerStyles();
  function roleFormOptions(arr){return arr.map(x=>`<option value="${esc(x[0])}">${esc(ROLE_ANIMATION_VI[x[0]]||x[1])}</option>`).join('');}
  if(typeof ROLE_ANIMATIONS!=='undefined')ROLE_ANIMATIONS.forEach(x=>{x[1]=ROLE_ANIMATION_VI[x[0]]||x[1]});
  if(typeof ROLE_STYLES!=='undefined')ROLE_STYLES.forEach((x,i)=>ROLE_STYLES[i]=ROLE_STYLE_VI[x]||x);
  /* Corner ornaments: four small icons hug the capsule corners like a decorative frame. */
  var ROLE_ANIMATION_VI={none:'Đứng yên',glow:'Phát sáng',pulse:'Nhịp sáng',sparkle:'Lấp lánh',orbit:'Quỹ đạo',shimmer:'Lướt sáng',wave:'Gợn sóng',bounce:'Nảy nhẹ','particle':'Hạt sáng','bee-fly':'Ong bay','heart-float':'Tim bay','triangle-orbit':'Tam giác quỹ đạo','star-orbit':'Sao quỹ đạo','energy-wave':'Sóng năng lượng'};
  var ROLE_STYLE_VI={Minimal:'Tối giản',Cyber:'Công nghệ',Space:'Vũ trụ',Nature:'Thiên nhiên',Energy:'Năng lượng',Dark:'Tối',Light:'Sáng',Geometry:'Hình học','Cute Neutral':'Dễ thương trung tính',Mystery:'Bí ẩn'};
  var ROLE_SOURCE_VI={custom:'Tự tạo',achievement:'Thành tích',weekly_reward:'Phần thưởng tuần'};
  function roleCornerIcons(role){const e=role.effects||{};if(Array.isArray(e.cornerIcons)&&e.cornerIcons.length)return e.cornerIcons;return [role.icon||'✦','✦','✧','•'];}
  function renderRoleCapsule(role,opts={}){
    ensureRoleBorderOrbitStyles();roleSchema(role);if(opts.publicMode===true&&role.visibility==='hidden')return '';
    const e=role.effects||{},anim=e.animation||'none',icons=roleCornerIcons(role),n=Math.min(4,Math.max(1,Number(e.cornerCount)||4));
    const corners=['top-left','top-right','bottom-left','bottom-right'].slice(0,n).map((pos,i)=>`<span class="role-corner role-corner-${pos} role-corner-anim-${anim}" style="--corner-delay:${i*.3}s">${esc(icons[i%icons.length])}</span>`).join('');
    const source=ROLE_SOURCE_VI[role.sourceType]||'Role';
    return `<span class="role-capsule role-anim-${anim} role-style-${String(e.style||'Minimal').replace(/[^a-z0-9]/gi,'-')} role-corners" style="${roleCss(role)}" title="Nguồn: ${esc(source)}${role.achievementId?' · Thành tích: '+esc(role.achievementId):''}${role.weeklyRewardId?' · Tuần: '+esc(role.weeklyRewardId):''}"><span class="role-fx-layer role-corner-layer">${corners}</span><span class="role-capsule-content">${esc(role.icon||'🏷️')} ${esc(role.name||'Role')}</span></span>`;
  }
  function ensureRoleCornerStyles(){
    if(document.getElementById('roleCornerStyles'))return;const st=document.createElement('style');st.id='roleCornerStyles';st.textContent=`
      .role-corners{margin:8px 10px}.role-corner-layer{inset:-9px -10px!important;border-radius:999px!important}.role-corner{position:absolute!important;width:22px;height:22px;display:grid;place-items:center;font-size:calc(15px * var(--role-size));line-height:1;z-index:4;text-shadow:0 1px 3px rgba(0,0,0,.25);filter:drop-shadow(0 2px 2px rgba(0,0,0,.18));animation-duration:var(--role-speed);animation-delay:var(--corner-delay);animation-iteration-count:infinite;animation-timing-function:ease-in-out}.role-corner-top-left{left:-5px;top:-8px}.role-corner-top-right{right:-5px;top:-8px}.role-corner-bottom-left{left:-5px;bottom:-8px}.role-corner-bottom-right{right:-5px;bottom:-8px}.role-corner-anim-none{animation:none}.role-corner-anim-glow,.role-corner-anim-pulse{animation-name:rcGlow}.role-corner-anim-sparkle,.role-corner-anim-shimmer{animation-name:rcSparkle}.role-corner-anim-orbit,.role-corner-anim-triangle-orbit,.role-corner-anim-star-orbit{animation-name:rcOrbit}.role-corner-anim-bee-fly{animation-name:rcBee}.role-corner-anim-heart-float{animation-name:rcFloat}.role-corner-anim-bounce{animation-name:rcBounce}.role-corner-anim-wave,.role-corner-anim-energy-wave{animation-name:rcWave}@keyframes rcGlow{0%,100%{opacity:.65;transform:scale(.9)}50%{opacity:1;transform:scale(1.18);filter:drop-shadow(0 0 6px rgba(255,255,255,.9))}}@keyframes rcSparkle{0%,100%{opacity:.35;transform:rotate(0) scale(.75)}50%{opacity:1;transform:rotate(20deg) scale(1.2)}}@keyframes rcOrbit{0%,100%{transform:translate(0,0) rotate(0)}50%{transform:translate(5px,-4px) rotate(180deg)}}@keyframes rcBee{0%,100%{transform:translate(0,0)}50%{transform:translate(8px,-5px)}}@keyframes rcFloat{0%,100%{transform:translateY(3px);opacity:.5}50%{transform:translateY(-6px);opacity:1}}@keyframes rcBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}@keyframes rcWave{0%,100%{transform:translateX(-3px)}50%{transform:translateX(3px)}}
    `;document.head.appendChild(st);
  }
  ensureRoleCornerStyles();
  function roleFormOptions(arr){return arr.map(x=>`<option value="${esc(x[0])}">${esc(ROLE_ANIMATION_VI[x[0]]||x[1])}</option>`).join('');}
  if(typeof ROLE_ANIMATIONS!=='undefined')ROLE_ANIMATIONS.forEach(x=>{x[1]=ROLE_ANIMATION_VI[x[0]]||x[1]});
  if(typeof ROLE_STYLES!=='undefined')ROLE_STYLES.forEach((x,i)=>ROLE_STYLES[i]=ROLE_STYLE_VI[x]||x);
  /* Nền cao cấp: Vô Cực và Thần Thoại */
  function installPremiumTierBackgrounds(){
    if(document.getElementById('premiumTierBackgrounds'))return;
    const st=document.createElement('style');st.id='premiumTierBackgrounds';st.textContent=`
      .achievement-group[data-tier="vo-cuc"]{position:relative;overflow:hidden;background-image:radial-gradient(circle at 15% 18%,rgba(165,180,252,.95) 0 1px,transparent 2px),radial-gradient(circle at 74% 22%,rgba(255,255,255,.9) 0 1px,transparent 2px),radial-gradient(circle at 36% 76%,rgba(125,211,252,.8) 0 1px,transparent 2px),radial-gradient(circle at 88% 68%,rgba(244,114,182,.85) 0 2px,transparent 3px),radial-gradient(ellipse at 50% 50%,rgba(99,102,241,.32),transparent 42%),linear-gradient(135deg,#020617,#111827 35%,#312e81 68%,#0f172a)!important;background-size:180px 140px,220px 160px,260px 180px,200px 170px,100% 100%,100% 100%!important;animation:voCucKhongGian 12s ease-in-out infinite!important;box-shadow:inset 0 0 55px rgba(15,23,42,.8),0 0 28px rgba(99,102,241,.38)}
      .achievement-group[data-tier="vo-cuc"]::before{content:"";position:absolute;inset:12%;border:1px solid rgba(191,219,254,.32);border-radius:50%;transform:rotate(-14deg) scaleX(1.8);box-shadow:0 0 18px rgba(125,211,252,.28);animation:voCucQuyDao 9s linear infinite;pointer-events:none}
      .achievement-group[data-tier="vo-cuc"]::after{content:"✦  ·  ✧  ·  ✦";position:absolute;right:20px;top:14px;color:rgba(224,231,255,.8);letter-spacing:8px;font-size:13px;animation:voCucSao 4s ease-in-out infinite;pointer-events:none}
      .achievement-group[data-tier="than-thoai"]{position:relative;overflow:hidden;background-image:radial-gradient(circle at 22% 20%,rgba(254,240,138,.95) 0 2px,transparent 4px),radial-gradient(circle at 80% 28%,rgba(251,146,60,.85) 0 1px,transparent 3px),radial-gradient(circle at 68% 78%,rgba(216,180,254,.7) 0 2px,transparent 4px),radial-gradient(ellipse at 50% 52%,rgba(126,34,206,.34),transparent 40%),conic-gradient(from 210deg at 50% 50%,#09090b,#3b0764,#7f1d1d,#a16207,#3b0764,#09090b)!important;background-size:170px 150px,240px 180px,210px 170px,100% 100%,100% 100%!important;animation:thanThoaiHuyenBi 8s ease-in-out infinite!important;box-shadow:inset 0 0 60px rgba(0,0,0,.82),0 0 32px rgba(234,179,8,.38)}
      .achievement-group[data-tier="than-thoai"]::before{content:"";position:absolute;inset:8px;border:2px solid transparent;border-radius:20px;background:linear-gradient(#09090b,#09090b) padding-box,conic-gradient(from 0deg,#facc15,#fef3c7,#a855f7,#dc2626,#facc15) border-box;opacity:.75;animation:thanThoaiVien 8s linear infinite;pointer-events:none}
      .achievement-group[data-tier="than-thoai"]::after{content:"✧   ◈   ✧";position:absolute;left:22px;bottom:15px;color:#fde68a;letter-spacing:9px;text-shadow:0 0 12px #facc15;animation:thanThoaiAnhsang 3s ease-in-out infinite;pointer-events:none}
      .achievement-group[data-tier="vo-cuc"]>* ,.achievement-group[data-tier="than-thoai"]>*{position:relative;z-index:1}
      @keyframes voCucKhongGian{0%,100%{background-position:0 0,0 0,0 0,0 0,0 0,0 0}50%{background-position:30px -15px,-25px 20px,18px 10px,12px -18px,0 0,0 0}}
      @keyframes voCucQuyDao{to{transform:rotate(346deg) scaleX(1.8)}}
      @keyframes voCucSao{0%,100%{opacity:.45;transform:translateY(0)}50%{opacity:1;transform:translateY(-5px)}}
      @keyframes thanThoaiHuyenBi{0%,100%{background-position:0 0,0 0,0 0,0 0,0 0}50%{background-position:-18px 12px,20px -14px,12px 18px,0 0,90deg}}
      @keyframes thanThoaiVien{to{transform:rotate(360deg)}}
      @keyframes thanThoaiAnhsang{0%,100%{opacity:.4;transform:scale(.9)}50%{opacity:1;transform:scale(1.12)}}
      @media(max-width:900px){.achievement-group[data-tier="vo-cuc"]::before{inset:18%;}.achievement-group[data-tier="than-thoai"]::before{inset:6px}}
      @media(max-width:600px){.achievement-group[data-tier="vo-cuc"],.achievement-group[data-tier="than-thoai"]{background-size:140px 110px,170px 120px,180px 130px,100% 100%,100% 100%!important;animation-duration:18s!important}.achievement-group[data-tier="vo-cuc"]::before,.achievement-group[data-tier="than-thoai"]::before{animation:none;opacity:.45}.achievement-group[data-tier="vo-cuc"]::after,.achievement-group[data-tier="than-thoai"]::after{font-size:10px;letter-spacing:4px}}
      @media(prefers-reduced-motion:reduce){.achievement-group[data-tier="vo-cuc"],.achievement-group[data-tier="than-thoai"],.achievement-group[data-tier="vo-cuc"]::before,.achievement-group[data-tier="vo-cuc"]::after,.achievement-group[data-tier="than-thoai"]::before,.achievement-group[data-tier="than-thoai"]::after{animation:none!important}}
    `;document.head.appendChild(st);
  }
  installPremiumTierBackgrounds();
  function vietHoaThongTinHeThong(){
    const map={'Study Time':'Thời gian học','Weekly Reward':'Phần thưởng tuần','XP History':'Lịch sử XP','Achievement':'Thành tích','Badge':'Huy hiệu','Role Visibility':'Trạng thái hiển thị Role','Preview':'Xem trước','Public':'Công khai','Hidden':'Đang ẩn','Custom':'Tự tạo','None':'Đứng yên','Minimal':'Tối giản','Cyber':'Công nghệ','Space':'Vũ trụ','Nature':'Thiên nhiên','Energy':'Năng lượng','Dark':'Tối','Light':'Sáng','Geometry':'Hình học','Mystery':'Bí ẩn'};
    const walk=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);const nodes=[];while(walk.nextNode())nodes.push(walk.currentNode);nodes.forEach(n=>{let v=n.nodeValue;Object.keys(map).forEach(k=>{v=v.replace(new RegExp('\\b'+k+'\\b','g'),map[k])});n.nodeValue=v});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',vietHoaThongTinHeThong);else vietHoaThongTinHeThong();
  /* Trang trí Role v9: icon gần capsule, chọn nhiều icon và màu riêng */
  const ROLE_DECOR_ICON_SET=['✦','✧','✨','⭐','🌟','💖','🌸','🌿','🍀','🐝','🦋','🌙','☀️','💎','👑','🔮','⚡','🔺','●','◈'];
  function roleDecorColorValue(role){return role?.effects?.decorColor||'#facc15'}
  function roleDecorIconsValue(role){const a=role?.effects?.cornerIcons;return Array.isArray(a)&&a.length?a:['✦','✧','✨','⭐']}
  function renderRoleCapsuleV9(role,opts={}){
    ensureRoleBorderOrbitStyles();ensureRoleCornerStyles();roleSchema(role);if(opts.publicMode===true&&role.visibility==='hidden')return '';
    const e=role.effects||{},anim=e.animation||'none',icons=roleDecorIconsValue(role),positions=['top-left','top-right','bottom-left','bottom-right'];
    const corners=positions.map((pos,i)=>`<span class="role-corner role-corner-${pos} role-corner-anim-${anim}" style="--corner-delay:${i*.22}s;--role-decor-color:${esc(roleDecorColorValue(role))};--role-decor-bg:${esc(e.decorBg||'rgba(15,23,42,.22)')}">${esc(icons[i%icons.length])}</span>`).join('');
    const source=ROLE_SOURCE_VI[role.sourceType]||'Role';
    const css=roleCss(role)+`;--role-decor-color:${esc(roleDecorColorValue(role))};--role-decor-shadow:${esc(roleDecorColorValue(role))}`;
    return `<span class="role-capsule role-anim-${anim} role-style-${String(e.style||'Minimal').replace(/[^a-z0-9]/gi,'-')} role-corners" style="${css}" title="Nguồn: ${esc(source)}${role.achievementId?' · Thành tích: '+esc(role.achievementId):''}${role.weeklyRewardId?' · Tuần: '+esc(role.weeklyRewardId):''}"><span class="role-fx-layer role-corner-layer">${corners}</span><span class="role-capsule-content">${esc(role.icon||'🏷️')} ${esc(role.name||'Role')}</span></span>`;
  }
  renderRoleCapsule=renderRoleCapsuleV9;
  function ensureRoleDecorV9Styles(){
    if(document.getElementById('roleDecorV9Styles'))return;const st=document.createElement('style');st.id='roleDecorV9Styles';st.textContent=`
      .role-corners{margin:4px 6px!important;isolation:isolate}.role-corner-layer{inset:-3px -4px!important;border-radius:999px!important;overflow:visible!important}.role-corner{position:absolute!important;width:20px;height:20px;display:grid;place-items:center;font-size:calc(14px * var(--role-size));line-height:1;z-index:5;color:var(--role-decor-color,#facc15);background:var(--role-decor-bg,rgba(15,23,42,.22));border:1px solid var(--role-decor-color,#facc15);border-radius:50%;box-sizing:border-box;text-shadow:-1px -1px 0 rgba(15,23,42,.85),1px -1px 0 rgba(15,23,42,.85),-1px 1px 0 rgba(15,23,42,.85),1px 1px 0 rgba(15,23,42,.85),0 0 7px var(--role-decor-shadow,#facc15);filter:drop-shadow(0 1px 2px rgba(0,0,0,.5));animation-duration:var(--role-speed,6s);animation-delay:var(--corner-delay);animation-iteration-count:infinite;animation-timing-function:ease-in-out}.role-corner-top-left{left:-2px;top:-3px}.role-corner-top-right{right:-2px;top:-3px}.role-corner-bottom-left{left:-2px;bottom:-3px}.role-corner-bottom-right{right:-2px;bottom:-3px}.role-corner-anim-none{animation:none}.role-corner-anim-glow,.role-corner-anim-pulse{animation-name:rcV9Glow}.role-corner-anim-sparkle,.role-corner-anim-shimmer{animation-name:rcV9Sparkle}.role-corner-anim-orbit,.role-corner-anim-triangle-orbit,.role-corner-anim-star-orbit{animation-name:rcV9Orbit}.role-corner-anim-bee-fly{animation-name:rcV9Bee}.role-corner-anim-heart-float{animation-name:rcV9Float}.role-corner-anim-bounce{animation-name:rcV9Bounce}.role-corner-anim-wave,.role-corner-anim-energy-wave{animation-name:rcV9Wave}@keyframes rcV9Glow{0%,100%{opacity:.8;transform:scale(.92)}50%{opacity:1;transform:scale(1.12);box-shadow:0 0 0 2px var(--role-decor-bg),0 0 12px var(--role-decor-color)}}@keyframes rcV9Sparkle{0%,100%{opacity:.7;transform:rotate(0) scale(.88)}50%{opacity:1;transform:rotate(18deg) scale(1.15)}}@keyframes rcV9Orbit{0%,100%{transform:translate(0,0) rotate(0)}50%{transform:translate(2px,-2px) rotate(180deg)}}@keyframes rcV9Bee{0%,100%{transform:translate(0,0)}50%{transform:translate(4px,-3px)}}@keyframes rcV9Float{0%,100%{transform:translateY(2px)}50%{transform:translateY(-4px)}}@keyframes rcV9Bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}@keyframes rcV9Wave{0%,100%{transform:translateX(-2px)}50%{transform:translateX(2px)}}
      .role-decor-picker{display:flex;flex-wrap:wrap;gap:6px;padding:8px;border:1px solid var(--line);border-radius:12px;background:#f8fafc}.role-decor-picker label{display:inline-flex!important;align-items:center;gap:3px;padding:4px 6px;border:1px solid #cbd5e1;border-radius:8px;background:#fff;color:#0f172a;cursor:pointer;font-size:17px}.role-decor-picker input{accent-color:#7c3aed!important;width:16px!important;height:16px!important}
      @media(max-width:600px){.role-corner{width:17px;height:17px;font-size:calc(12px * var(--role-size))}.role-corner-layer{inset:-2px -3px!important}}
    `;document.head.appendChild(st);
  }
  ensureRoleDecorV9Styles();
  function workshopReadRoleV9(){
    const icons=[...document.querySelectorAll('#rwDecorIcons input:checked')].map(x=>x.value);return roleSchema({name:$('rwName')?.value.trim()||'Xem trước Role',icon:$('rwIcon')?.value.trim()||'🏷️',color1:$('rwColor1')?.value||'#7c3aed',color2:$('rwColor2')?.value||'#06b6d4',gradientCss:$('rwGradient')?.value.trim()||`linear-gradient(135deg,${$('rwColor1')?.value||'#7c3aed'},${$('rwColor2')?.value||'#06b6d4'})`,effects:{animation:$('rwAnimation')?.value||'none',style:$('rwStyle')?.value||'Minimal',speed:Number($('rwSpeed')?.value)||6,strength:Number($('rwStrength')?.value)||1,count:Number($('rwCount')?.value)||8,size:Number($('rwSize')?.value)||1,direction:$('rwDirection')?.value||'clockwise',gradient:$('rwUseGradient')?.checked!==false,glow:$('rwGlow')?.checked!==false,decorColor:$('rwDecorColor')?.value||'#facc15',decorBg:$('rwDecorBg')?.value||'rgba(15,23,42,.22)',cornerIcons:icons.length?icons:['✦','✧','✨','⭐'],cornerCount:4}});
  }
  workshopReadRole=workshopReadRoleV9;
  refreshRoleWorkshopPreview=function(){ensureRoleWorkshopStyles();ensureRoleDecorV9Styles();const box=$('roleWorkshopPreview');if(box)box.innerHTML=renderRoleCapsuleV9(workshopReadRoleV9());};
  const previousFounderCreateRoleV9=founderCreateRole;
  founderCreateRole=function(){
    if(state.sessionAuth?.role!=='Founder')return alert('🔒 Chỉ Người sáng lập web mới được tạo Role.');ensureRoleWorkshopStyles();ensureRoleDecorV9Styles();
    const iconOptions=ROLE_DECOR_ICON_SET.map((x,i)=>`<label><input type="checkbox" value="${esc(x)}" ${i<4?'checked':''}>${esc(x)}</label>`).join('');
    showModal('🎨 Xưởng tạo Role',`<div class="role-workshop-grid"><div><label>Tên Role</label><input id="rwName" value="Người dẫn đường"></div><div><label>Icon chính</label><input id="rwIcon" value="🌟" maxlength="6"></div><div><label>Màu nền HEX/RGB/HSL</label><input id="rwColor1" type="color" value="#7c3aed"></div><div><label>Màu thứ hai / màu viền</label><input id="rwColor2" type="color" value="#06b6d4"></div><div><label>Màu icon trang trí</label><input id="rwDecorColor" type="color" value="#facc15"></div><div><label>Màu nền icon trang trí</label><input id="rwDecorBg" type="text" value="rgba(15,23,42,.22)" placeholder="HEX, RGB hoặc RGBA"></div><div class="full"><label>Gradient tự chọn</label><input id="rwGradient" value="linear-gradient(135deg,#7c3aed,#06b6d4)"></div><div class="full"><label>Chọn nhiều icon trang trí quanh Role</label><div id="rwDecorIcons" class="role-decor-picker">${iconOptions}</div><small class="muted">Có thể chọn nhiều icon; các icon sẽ được phân bố sát bốn góc capsule.</small></div><div><label>Phong cách</label><select id="rwStyle">${ROLE_STYLES.map(x=>`<option>${x}</option>`).join('')}</select></div><div><label>Animation tự chạy</label><select id="rwAnimation">${roleFormOptions(ROLE_ANIMATIONS)}</select></div><div><label>Tốc độ (giây)</label><input id="rwSpeed" type="range" min=".8" max="20" step=".2" value="6"></div><div><label>Độ mạnh</label><input id="rwStrength" type="range" min="0" max="3" step=".1" value="1"></div><div><label>Hướng chuyển động</label><select id="rwDirection"><option value="clockwise">Theo chiều kim đồng hồ</option><option value="counter">Ngược chiều kim đồng hồ</option><option value="vertical">Lên xuống</option><option value="horizontal">Trái phải</option></select></div><div><label><input id="rwUseGradient" type="checkbox" checked style="width:18px"> Dùng gradient</label><label><input id="rwGlow" type="checkbox" checked style="width:18px"> Dùng glow</label></div><div class="full role-workshop-preview" id="roleWorkshopPreview"></div><div class="full"><label>Nguồn / mô tả Role</label><textarea id="rwOrigin" placeholder="Mô tả lý do tạo Role"></textarea></div></div><button class="btn" style="margin-top:12px" onclick="confirmFounderCreateRoleV5()">💾 Tạo Role</button>`);
    ['rwName','rwIcon','rwColor1','rwColor2','rwGradient','rwDecorColor','rwDecorBg','rwStyle','rwAnimation','rwSpeed','rwStrength','rwDirection','rwUseGradient','rwGlow'].forEach(id=>{const el=$(id);if(el)el.addEventListener('input',refreshRoleWorkshopPreview);});document.querySelectorAll('#rwDecorIcons input').forEach(el=>el.addEventListener('change',refreshRoleWorkshopPreview));refreshRoleWorkshopPreview();
  };
  /* Xem trước Role trong nền Vô Cực và Thần Thoại */
  function ensureTierRolePreviewStyles(){
    if(document.getElementById('tierRolePreviewStyles'))return;const st=document.createElement('style');st.id='tierRolePreviewStyles';st.textContent=`
      .tier-role-preview{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;margin:2px 12px 4px;padding:10px 12px;border:1px solid rgba(255,255,255,.36);border-radius:16px;background:rgba(2,6,23,.28);backdrop-filter:blur(5px);color:#fff;text-align:center}.tier-role-preview-label{font-size:12px;font-weight:900;letter-spacing:.2px;text-shadow:0 1px 4px rgba(0,0,0,.75)}.tier-role-preview .role-capsule{font-size:14px;min-height:34px;padding:6px 16px}.tier-role-preview .role-corner{width:18px;height:18px;font-size:12px}.tier-role-preview .role-corner-layer{inset:-2px -3px!important}@media(max-width:600px){.tier-role-preview{margin:2px 8px 4px;padding:8px;gap:6px}.tier-role-preview-label{font-size:11px}.tier-role-preview .role-capsule{font-size:12px;min-height:30px;padding:5px 13px}}
      .tier-preview-vo-cuc{background-size:240% 240%!important;animation:voCucFlow 5s ease-in-out infinite;box-shadow:inset 0 0 26px rgba(96,165,250,.35),0 0 20px rgba(59,130,246,.25)}.tier-preview-vo-cuc .role-capsule{animation:voCucPulse 3.8s ease-in-out infinite}.tier-preview-than-thoai{background-size:300% 300%!important;animation:thanThoaiMorph 3.2s linear infinite;box-shadow:inset 0 0 32px rgba(250,204,21,.38),0 0 28px rgba(168,85,247,.4)}.tier-preview-than-thoai .role-capsule{animation:thanThoaiPulse 2.6s ease-in-out infinite}.tier-preview-than-thoai .role-corner{animation-duration:2.6s!important}@keyframes voCucFlow{0%,100%{background-position:0% 50%;filter:hue-rotate(0deg)}50%{background-position:100% 50%;filter:hue-rotate(28deg)}}@keyframes voCucPulse{0%,100%{transform:scale(1);filter:brightness(1)}50%{transform:scale(1.045);filter:brightness(1.25)}}@keyframes thanThoaiMorph{0%{background-position:0% 50%;filter:saturate(1) hue-rotate(0deg)}25%{background-position:100% 0%;filter:saturate(1.8) hue-rotate(20deg)}50%{background-position:100% 100%;filter:saturate(2.2) hue-rotate(55deg)}75%{background-position:0% 100%;filter:saturate(1.8) hue-rotate(20deg)}100%{background-position:0% 50%;filter:saturate(1) hue-rotate(0deg)}}@keyframes thanThoaiPulse{0%,100%{transform:scale(1) rotate(0deg);filter:brightness(1)}35%{transform:scale(1.08) rotate(-1deg);filter:brightness(1.35)}70%{transform:scale(1.02) rotate(1deg);filter:brightness(1.15)}}
      @media(prefers-reduced-motion:reduce){.tier-preview-vo-cuc,.tier-preview-vo-cuc .role-capsule,.tier-preview-than-thoai,.tier-preview-than-thoai .role-capsule{animation:none!important}}
    `;document.head.appendChild(st);
  }
  function currentPreviewOwnerId(){return state.sessionAuth?.memberId||state.membersList?.find(m=>m.name===state.sessionAuth?.name)?.id||state.memberAccounts?.find(a=>a.name===state.sessionAuth?.name)?.memberId||null;}
  function tierPreviewRole(tier){
    return typeof window.studyEmpirePreviewRoleV17==='function' ? window.studyEmpirePreviewRoleV17(tier) : roleSchema({id:tier==='vo-cuc'?'preview-vo-cuc':'preview-than-thoai',name:tier==='vo-cuc'?'Người du hành vô cực':'Kẻ gọi ánh sáng',icon:tier==='vo-cuc'?'🌌':'💠',visibility:'public'});
  }
  function renderTierRolePreviews(){
    ensureTierRolePreviewStyles();ensureRoleDecorV9Styles();['vo-cuc','than-thoai'].forEach(tier=>{const group=document.querySelector('.achievement-group[data-tier="'+tier+'"]');if(!group)return;group.querySelectorAll('.tier-role-preview').forEach(x=>x.remove());const host=group.querySelector(':scope > div');if(!host)return;const box=document.createElement('div');box.className='tier-role-preview tier-preview-'+tier;box.dataset.tier=tier;const groupBg=getComputedStyle(group).backgroundImage||getComputedStyle(group).backgroundColor;box.style.background=groupBg;const previewRole=tierPreviewRole(tier);if(groupBg&&groupBg!=='none')previewRole.gradientCss=groupBg;const hasReal=!!(currentPreviewOwnerId()&&getCustomRolesForMember(currentPreviewOwnerId()).length);box.innerHTML='<span class="tier-role-preview-label">'+(hasReal?'Xem trước Role của bạn':'Xem trước Role mẫu')+'</span>'+renderRoleCapsule(previewRole);host.parentNode.insertBefore(box,host);});
  }
  const previousRenderAchievementsForTierRole=renderAchievementsView;renderAchievementsView=function(){previousRenderAchievementsForTierRole();setTimeout(renderTierRolePreviews,0);};
  setTimeout(renderTierRolePreviews,0);
  /* 🔐 Sửa đồng bộ đổi mật khẩu: không để bản ghi cũ ghi đè mật khẩu mới */
  function getSignedInMemberRecord(){
    const auth=state.sessionAuth;if(!auth)return null;
    return state.membersList?.find(m=>String(m.id)===String(auth.memberId))||state.membersList?.find(m=>m.role===auth.role&&m.name===auth.name)||null;
  }
  function getCurrentAccount(){
    if(!state.sessionAuth)return null;const auth=state.sessionAuth;const member=getSignedInMemberRecord();
    if(auth.role==='Member')return state.memberAccounts?.find(a=>String(a.memberId)===String(auth.memberId)||a.code===auth.code)||null;
    if(member)return member;
    if(auth.role==='Founder')return {password:state.founderPassword};
    if(auth.role==='Admin')return {password:state.adminPassword};
    return null;
  }
  function changeProfilePassword(){
    const auth=state.sessionAuth;if(!auth||auth.role==='Guest')return alert('👤 Tài khoản khách không có mật khẩu để thay đổi.');
    const current=$('currentPasswordInput')?.value||'',next=$('newPasswordInput')?.value||'',confirmNext=$('confirmPasswordInput')?.value||'';
    const member=getSignedInMemberRecord();const memberId=auth.memberId||member?.id;
    const account=auth.role==='Member'?(state.memberAccounts||[]).find(a=>String(a.memberId)===String(memberId)||a.code===auth.code):null;
    const known=[member?.password,account?.password,auth.role==='Founder'?state.founderPassword:null,auth.role==='Admin'?state.adminPassword:null].filter(v=>v!==null&&v!==undefined&&v!=='');
    if(!known.length)return alert('❌ Tài khoản chưa có mật khẩu hiện tại. Hãy đăng xuất và đăng nhập lại để khởi tạo mật khẩu.');
    if(!known.includes(current))return alert('❌ Mật khẩu hiện tại không đúng. Hãy nhập mật khẩu đang dùng để đăng nhập.');
    if(next.length<4)return alert('⚠️ Mật khẩu mới cần ít nhất 4 ký tự.');
    if(next!==confirmNext)return alert('⚠️ Hai lần nhập mật khẩu mới không khớp.');
    if(member)member.password=next;if(account)account.password=next;
    if(auth.role==='Founder')state.founderPassword=next;if(auth.role==='Admin')state.adminPassword=next;
    state.passwordChangedAt=new Date().toISOString();saveStateWithoutSession();try{pushStateToServer();}catch(e){}
    $('currentPasswordInput').value='';$('newPasswordInput').value='';$('confirmPasswordInput').value='';
    alert('✅ Đã đổi mật khẩu thành công. Từ lần đăng nhập sau, hãy dùng mật khẩu mới.');
  }
  /* 🎨 Xưởng tạo Role v11: hướng dẫn rõ, icon 1–4 vị trí tùy chọn, nền nổi bật */
  const ROLE_DECOR_POSITIONS_V11=[['top-left','Trên trái'],['top-center','Trên giữa'],['top-right','Trên phải'],['middle-left','Giữa trái'],['middle','Giữa'],['middle-right','Giữa phải'],['bottom-left','Dưới trái'],['bottom-center','Dưới giữa'],['bottom-right','Dưới phải']];
  function roleCss(role){
    roleSchema(role);const e=role.effects||{};const grad=role.gradientCss||(e.gradient!==false?`linear-gradient(135deg,${role.color1||'#0f766e'},${role.color2||'#7c3aed'})`:role.color1||'#0f766e');const dur=Math.max(.8,Math.min(30,e.speed||6)),strength=Math.max(0,Math.min(3,e.strength||1));return `--role-bg:${grad};--role-speed:${dur}s;--role-strength:${strength};--role-size:${Math.max(.5,Math.min(2,e.size||1))};--role-text:${e.textColor||role.textColor||'#ffffff'};--role-border:${e.borderColor||role.borderColor||'rgba(255,255,255,.72)'};`;
  }
  function roleDecorStyleV11(role,pos){const e=role.effects||{},map={'top-left':['4','0'],'top-center':['50','0'],'top-right':['96','0'],'middle-left':['0','50'],'middle':['50','50'],'middle-right':['100','50'],'bottom-left':['4','100'],'bottom-center':['50','100'],'bottom-right':['96','100']},xy=map[pos]||map['top-left'];const border=e.decorBorder===false?'none':`1px solid ${e.decorColor||'#facc15'}`,bg=e.decorFill===false?'transparent':(e.decorBg||'rgba(15,23,42,.78)');return `left:${xy[0]}%;top:${xy[1]}%;--role-decor-color:${esc(e.decorColor||'#facc15')};--role-decor-shadow:${esc(e.decorColor||'#facc15')};--role-decor-border:${border};--role-decor-bg:${esc(bg)}`;}
  function renderRoleCapsuleV11(role,opts={}){
    roleSchema(role);const e=role.effects||{},anim=e.animation||'none';if(opts.publicMode===true&&role.visibility==='hidden')return '';const icons=Array.isArray(e.cornerIcons)&&e.cornerIcons.length?e.cornerIcons:['✦'];const positions=Array.isArray(e.decorPositions)&&e.decorPositions.length?e.decorPositions:['top-left','top-right','bottom-left','bottom-right'];const corners=icons.slice(0,4).map((icon,i)=>`<span class="role-corner role-corner-placed role-corner-anim-${anim}" style="${roleDecorStyleV11(role,positions[i]||positions[positions.length-1]||'top-left')};--corner-delay:${i*.22}s">${esc(icon)}</span>`).join('');const source=role.sourceType==='achievement'?`🏆 Thành tích ${role.achievementId||''}`:role.sourceType==='weekly_reward'?`🎁 Phần thưởng tuần ${role.weeklyRewardId||''}`:'🎨 Role tự tạo';return `<span class="role-capsule role-corners-v11 role-anim-${anim} role-light-${String(e.lightPreset||'none').replace(/[^a-z0-9-]/gi,'-')} role-style-${String(e.style||'Minimal').replace(/[^a-z0-9]/gi,'-')}" style="${roleCss(role)}" title="${esc(source)}"><span class="role-fx-layer role-corner-layer">${corners}</span><span class="role-capsule-content">${esc(role.icon||'🏷️')} ${esc(role.name||'Role')}</span></span>`;
  }
  renderRoleCapsule=renderRoleCapsuleV11;renderRoleCapsuleV9=renderRoleCapsuleV11;
  function workshopReadRoleV11(){const icons=[...document.querySelectorAll('#rwDecorIcons input:checked')].map(x=>x.value).slice(0,4);const count=Math.max(1,Math.min(4,Number($('rwDecorCount')?.value)||icons.length||1));const chosen=(icons.length?icons:['✦']).slice(0,count);const positions=chosen.map((_,i)=>$('rwPos'+(i+1))?.value||['top-left','top-right','bottom-left','bottom-right'][i]);const c1=$('rwColor1')?.value||'#0f766e',c2=$('rwColor2')?.value||'#7c3aed';return roleSchema({name:$('rwName')?.value.trim()||'Xem trước Role',icon:$('rwIcon')?.value.trim()||'🏷️',color1:c1,color2:c2,textColor:$('rwTextColor')?.value||'#ffffff',borderColor:$('rwBorderColor')?.value||'#fef3c7',gradientCss:$('rwGradient')?.value.trim()||`linear-gradient(135deg,${c1},${c2})`,visibility:'public',effects:{animation:$('rwAnimation')?.value||'none',style:$('rwStyle')?.value||'Minimal',speed:Number($('rwSpeed')?.value)||6,strength:Number($('rwStrength')?.value)||1,size:Number($('rwSize')?.value)||1,direction:$('rwDirection')?.value||'clockwise',gradient:$('rwUseGradient')?.checked!==false,glow:$('rwGlow')?.checked!==false,decorColor:$('rwDecorColor')?.value||'#facc15',decorBg:$('rwDecorBg')?.value||'rgba(15,23,42,.78)',decorBorder:$('rwDecorBorder')?.checked!==false,decorFill:$('rwDecorFill')?.checked!==false,cornerIcons:chosen,decorPositions:positions,cornerCount:count}});}
  workshopReadRole=workshopReadRoleV11;
  function ensureRoleWorkshopV11Styles(){if(document.getElementById('roleWorkshopV11Styles'))return;const st=document.createElement('style');st.id='roleWorkshopV11Styles';st.textContent=`.role-capsule.role-corners-v11{background:var(--role-bg)!important;color:var(--role-text,#fff)!important;border:2px solid var(--role-border)!important;box-shadow:0 0 calc(18px * var(--role-strength)) rgba(124,58,237,.5),inset 0 0 12px rgba(255,255,255,.12)!important;overflow:visible!important}.role-capsule.role-corners-v11 .role-capsule-content{text-shadow:0 1px 3px rgba(0,0,0,.72)}.role-corner-placed{position:absolute!important;transform:translate(-50%,-50%);width:20px;height:20px;display:grid;place-items:center;border:var(--role-decor-border);background:var(--role-decor-bg);border-radius:50%;color:var(--role-decor-color);font-size:13px;line-height:1;z-index:6;text-shadow:-1px -1px 0 rgba(15,23,42,.9),1px -1px 0 rgba(15,23,42,.9),-1px 1px 0 rgba(15,23,42,.9),1px 1px 0 rgba(15,23,42,.9),0 0 8px var(--role-decor-shadow);filter:drop-shadow(0 1px 2px rgba(0,0,0,.62));animation-duration:var(--role-speed,6s);animation-delay:var(--corner-delay);animation-iteration-count:infinite;animation-timing-function:ease-in-out}.role-corner-anim-none{animation:none}.role-corner-anim-glow,.role-corner-anim-pulse{animation-name:roleV11Glow}.role-corner-anim-sparkle,.role-corner-anim-shimmer{animation-name:roleV11Sparkle}.role-corner-anim-orbit,.role-corner-anim-triangle-orbit,.role-corner-anim-star-orbit{animation-name:roleV11Orbit}.role-corner-anim-bee-fly,.role-corner-anim-heart-float,.role-corner-anim-bounce{animation-name:roleV11Float}@keyframes roleV11Glow{0%,100%{opacity:.82;scale:.92}50%{opacity:1;scale:1.14;box-shadow:0 0 12px var(--role-decor-color)}}@keyframes roleV11Sparkle{0%,100%{rotate:0deg;scale:.86}50%{rotate:16deg;scale:1.16}}@keyframes roleV11Orbit{0%,100%{translate:0 0;rotate:0deg}50%{translate:2px -2px;rotate:180deg}}@keyframes roleV11Float{0%,100%{translate:0 2px}50%{translate:2px -3px}}.role-workshop-hint{display:block;margin-top:3px;color:#475569;font-size:11px;line-height:1.35}.role-workshop-section{grid-column:1/-1;padding:9px 10px;border-radius:14px;background:linear-gradient(135deg,#eff6ff,#faf5ff);border:1px solid #c4b5fd}.role-position-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;margin-top:6px}.role-position-grid label{display:flex!important;align-items:center;gap:5px;font-size:12px}.role-position-grid select{width:auto!important;min-width:125px}.role-workshop-preview{background:linear-gradient(135deg,#0f172a,#164e63 48%,#4c1d95)!important;border:1px solid #67e8f9!important;box-shadow:inset 0 0 22px rgba(56,189,248,.18)}@media(max-width:600px){.role-position-grid{grid-template-columns:1fr}.role-corner-placed{width:17px;height:17px;font-size:11px}}`;document.head.appendChild(st);}
  refreshRoleWorkshopPreview=function(){ensureRoleWorkshopStyles();ensureRoleDecorV9Styles();ensureRoleWorkshopV11Styles();const box=$('roleWorkshopPreview');if(box)box.innerHTML=renderRoleCapsuleV11(workshopReadRoleV11());};
  founderCreateRole=function(){if(state.sessionAuth?.role!=='Founder')return alert('🔒 Chỉ Người sáng lập web mới được tạo Role.');ensureRoleWorkshopStyles();ensureRoleDecorV9Styles();ensureRoleWorkshopV11Styles();const iconOptions=ROLE_DECOR_ICON_SET.map((x,i)=>`<label><input type="checkbox" value="${esc(x)}" ${i<4?'checked':''}>${esc(x)}</label>`).join('');const posOptions=ROLE_DECOR_POSITIONS_V11.map(x=>`<option value="${x[0]}">${x[1]}</option>`).join('');showModal('🎨 Xưởng tạo Role',`<div class="role-workshop-grid"><div class="role-workshop-section"><b>📘 Cách dùng</b><span class="role-workshop-hint">Tạo một viên Role có tên, icon chính, nền, chữ, viền và hiệu ứng. Mọi thay đổi sẽ hiện ngay trong khung xem trước bên dưới.</span></div><div><label>Tên Role</label><input id="rwName" value="Người dẫn đường"><span class="role-workshop-hint">Tên hiển thị trên capsule.</span></div><div><label>Icon chính</label><input id="rwIcon" value="🌟" maxlength="6"><span class="role-workshop-hint">Biểu tượng lớn nằm cạnh tên.</span></div><div><label>Màu nền thứ nhất</label><input id="rwColor1" type="color" value="#0f766e"><span class="role-workshop-hint">Màu chủ đạo; không dùng nền trắng.</span></div><div><label>Màu nền thứ hai / viền</label><input id="rwColor2" type="color" value="#7c3aed"><span class="role-workshop-hint">Màu phối để tạo nền nổi bật.</span></div><div><label>Màu chữ</label><input id="rwTextColor" type="color" value="#ffffff"><span class="role-workshop-hint">Nên chọn màu có tương phản cao.</span></div><div><label>Màu viền Role</label><input id="rwBorderColor" type="color" value="#fef3c7"><span class="role-workshop-hint">Viền ngoài của capsule; có thể chọn màu khác trắng.</span></div><div class="full"><label>Gradient tự chọn</label><input id="rwGradient" value="linear-gradient(135deg,#0f766e,#7c3aed)"><span class="role-workshop-hint">Nhập gradient CSS tùy ý, ví dụ linear-gradient(135deg,#0f766e,#7c3aed).</span></div><div><label>Màu icon trang trí</label><input id="rwDecorColor" type="color" value="#facc15"><span class="role-workshop-hint">Màu của các icon ở quanh viền.</span></div><div><label>Màu nền icon</label><input id="rwDecorBg" type="text" value="rgba(15,23,42,.78)" placeholder="HEX, RGB hoặc RGBA"><span class="role-workshop-hint">Nền tối giúp icon sáng nổi bật.</span></div><div class="role-workshop-section"><b>🧩 Icon trang trí quanh Role</b><span class="role-workshop-hint">Chọn tối đa 4 icon. Số icon thực tế được quyết định bên dưới.</span><div id="rwDecorIcons" class="role-decor-picker">${iconOptions}</div></div><div><label>Số icon muốn dùng</label><select id="rwDecorCount"><option value="1">1 icon</option><option value="2">2 icon</option><option value="3">3 icon</option><option value="4" selected>4 icon</option></select><span class="role-workshop-hint">Có thể dùng 1, 2, 3 hoặc 4 icon.</span></div><div><label>Animation tự chạy</label><select id="rwAnimation">${roleFormOptions(ROLE_ANIMATIONS)}</select><span class="role-workshop-hint">Hiệu ứng tự chạy, không cần bấm.</span></div><div class="full"><label>Vị trí từng icon</label><div class="role-position-grid">${[1,2,3,4].map(i=>`<label>Icon ${i}<select id="rwPos${i}">${posOptions}</select></label>`).join('')}</div><span class="role-workshop-hint">Có thể đặt trên trái, trên giữa, trên phải, giữa trái, giữa, giữa phải, dưới trái, dưới giữa hoặc dưới phải.</span></div><div><label>Phong cách</label><select id="rwStyle">${ROLE_STYLES.map(x=>`<option>${x}</option>`).join('')}</select><span class="role-workshop-hint">Chọn cảm giác tổng thể cho Role.</span></div><div><label>Tốc độ animation</label><input id="rwSpeed" type="range" min=".8" max="20" step=".2" value="6"><span class="role-workshop-hint">Số giây càng nhỏ thì chuyển động càng nhanh.</span></div><div><label>Độ mạnh hiệu ứng</label><input id="rwStrength" type="range" min="0" max="3" step=".1" value="1"><span class="role-workshop-hint">Điều chỉnh độ sáng, glow và độ nổi.</span></div><div><label>Hướng chuyển động</label><select id="rwDirection"><option value="clockwise">Theo chiều kim đồng hồ</option><option value="counter">Ngược chiều kim đồng hồ</option><option value="vertical">Lên xuống</option><option value="horizontal">Trái phải</option></select></div><div><label><input id="rwUseGradient" type="checkbox" checked style="width:18px"> Dùng gradient</label><label><input id="rwGlow" type="checkbox" checked style="width:18px"> Dùng glow</label><label><input id="rwDecorBorder" type="checkbox" checked style="width:18px"> Có viền icon</label><label><input id="rwDecorFill" type="checkbox" checked style="width:18px"> Có nền icon</label></div><div class="full role-workshop-preview" id="roleWorkshopPreview"></div><div class="full"><label>Mô tả / nguồn Role</label><textarea id="rwOrigin" placeholder="Mô tả lý do tạo Role, ví dụ: Role do Founder trao vì đã hoàn thành..."></textarea><span class="role-workshop-hint">Mô tả giúp mọi người hiểu Role này đến từ đâu.</span></div></div><button class="btn" style="margin-top:12px" onclick="confirmFounderCreateRoleV5()">💾 Tạo Role</button>`);const ids=['rwName','rwIcon','rwColor1','rwColor2','rwTextColor','rwBorderColor','rwGradient','rwDecorColor','rwDecorBg','rwDecorCount','rwStyle','rwAnimation','rwSpeed','rwStrength','rwDirection','rwUseGradient','rwGlow','rwDecorBorder','rwDecorFill','rwPos1','rwPos2','rwPos3','rwPos4'];ids.forEach(id=>{const el=$(id);if(el)el.addEventListener('input',refreshRoleWorkshopPreview);if(el)el.addEventListener('change',refreshRoleWorkshopPreview)});document.querySelectorAll('#rwDecorIcons input').forEach(el=>el.addEventListener('change',refreshRoleWorkshopPreview));refreshRoleWorkshopPreview();};
  /* 🌌 Nền Vô Cực / Thần Thoại v12 và xem trước Role tuần */
  function ensureThemeEffectsV12(){if(document.getElementById('themeEffectsV12'))return;const st=document.createElement('style');st.id='themeEffectsV12';st.textContent=`
  .achievement-group[data-tier="vo-cuc"],.achievement-group[data-tier="than-thoai"]{position:relative;overflow:hidden;border-radius:18px;isolation:isolate}
  .achievement-group[data-tier="vo-cuc"]{background:radial-gradient(circle at 15% 25%,rgba(129,140,248,.28),transparent 20%),radial-gradient(circle at 82% 70%,rgba(236,72,153,.22),transparent 24%),linear-gradient(135deg,#020617 0%,#172554 48%,#701a75 100%)!important;color:#f8fafc;border-color:#818cf8!important}
  .achievement-group[data-tier="vo-cuc"]::before{content:"✦  ·  ✧   ·   ✦     ·  ✧  ·  ✦   ·   ✧   ·  ✦";position:absolute;inset:8px;color:rgba(191,219,254,.78);font-size:12px;letter-spacing:18px;line-height:52px;white-space:normal;pointer-events:none;z-index:0;animation:infinityStarsV12 9s linear infinite;text-shadow:0 0 8px #bae6fd}
  .achievement-group[data-tier="vo-cuc"]::after{content:"";position:absolute;left:-20%;top:28%;width:46%;height:2px;background:linear-gradient(90deg,transparent,#fff,rgba(255,255,255,.18),transparent);box-shadow:0 0 12px 3px rgba(255,255,255,.72);transform:rotate(-8deg);pointer-events:none;z-index:1;animation:infinityStreakV12 6s ease-in-out infinite}
  .achievement-group[data-tier="than-thoai"]{background:radial-gradient(circle at 70% 12%,rgba(250,204,21,.22),transparent 18%),radial-gradient(circle at 20% 78%,rgba(168,85,247,.26),transparent 25%),linear-gradient(135deg,#09090b 0%,#3b0764 46%,#713f12 100%)!important;color:#fff7ed;border-color:#f0abfc!important}
  .achievement-group[data-tier="than-thoai"]::before{content:"✧        ·       ✦        ·       ✧       ·       ✦";position:absolute;inset:10px;color:rgba(253,230,138,.74);font-size:13px;letter-spacing:14px;line-height:62px;pointer-events:none;z-index:0;animation:mythicDustV12 11s ease-in-out infinite;text-shadow:0 0 9px #facc15}
  .achievement-group[data-tier="than-thoai"]::after{content:"";position:absolute;left:-25%;top:34%;width:42%;height:2px;background:linear-gradient(90deg,transparent,#fde68a,transparent);box-shadow:0 0 14px 3px rgba(250,204,21,.68);transform:rotate(-8deg);pointer-events:none;z-index:1;animation:mythicStreakV12 8s ease-in-out infinite}
  .achievement-group[data-tier="vo-cuc"]>*,.achievement-group[data-tier="than-thoai"]>*{position:relative;z-index:2}
  .achievement-group[data-tier="vo-cuc"] .tier-role-preview,.achievement-group[data-tier="than-thoai"] .tier-role-preview{background:rgba(2,6,23,.54);border-color:rgba(255,255,255,.38);backdrop-filter:blur(7px)}
  .achievement-card[data-tier="vo-cuc"] .achievement-badge,.achievement-group[data-tier="vo-cuc"] .badge,.achievement-group[data-tier="vo-cuc"] .achievement-badge-icon{background:linear-gradient(135deg,#0f766e,#166534,#84cc16)!important;border-color:#bbf7d0!important;color:#f0fdf4!important}
  .weekly-role-preview-v12{position:relative;overflow:hidden;margin:10px 0;padding:16px 18px;border-radius:18px;color:#fff;isolation:isolate;background:var(--weekly-bg);border:1px solid rgba(255,255,255,.42);box-shadow:0 12px 28px rgba(30,41,59,.16),inset 0 0 28px rgba(255,255,255,.12)}
  .weekly-role-preview-v12::before{content:"✦   ·   ✧   ·   ✦   ·   ✧   ·   ✦";position:absolute;inset:5px;color:rgba(255,255,255,.62);font-size:12px;letter-spacing:16px;line-height:34px;pointer-events:none;animation:weeklyShimmerV12 7s linear infinite}.weekly-role-preview-v12::after{content:"";position:absolute;left:-30%;top:22%;width:35%;height:2px;background:linear-gradient(90deg,transparent,#fff,transparent);box-shadow:0 0 14px 3px rgba(255,255,255,.7);animation:weeklySweepV12 6s ease-in-out infinite;pointer-events:none}.weekly-role-preview-v12>*{position:relative;z-index:2}.weekly-role-preview-v12 .role-capsule{font-size:14px;min-height:34px;padding:6px 18px}.weekly-role-preview-title{font-weight:950;letter-spacing:.2px;margin-bottom:9px}.weekly-role-preview-sub{font-size:12px;opacity:.92;margin-top:8px}
  @keyframes infinityStarsV12{0%,100%{transform:translate3d(0,0,0);opacity:.65}50%{transform:translate3d(18px,-7px,0);opacity:1}}@keyframes infinityStreakV12{0%{left:-28%;opacity:0}20%,70%{opacity:1}100%{left:112%;opacity:0}}@keyframes mythicDustV12{0%,100%{transform:translateY(0);opacity:.62}50%{transform:translateY(-10px);opacity:1}}@keyframes mythicStreakV12{0%{left:-28%;opacity:0}25%,65%{opacity:1}100%{left:112%;opacity:0}}@keyframes weeklyShimmerV12{0%,100%{transform:translateX(0);opacity:.55}50%{transform:translateX(15px);opacity:1}}@keyframes weeklySweepV12{0%{left:-30%;opacity:0}22%,72%{opacity:1}100%{left:115%;opacity:0}}
  @media(max-width:600px){.achievement-group[data-tier="vo-cuc"]::before,.achievement-group[data-tier="than-thoai"]::before{font-size:10px;letter-spacing:8px;line-height:42px}.weekly-role-preview-v12{padding:12px 10px}.weekly-role-preview-v12 .role-capsule{font-size:12px;min-height:30px;padding:5px 13px}}
  @media(prefers-reduced-motion:reduce){.achievement-group[data-tier="vo-cuc"]::before,.achievement-group[data-tier="vo-cuc"]::after,.achievement-group[data-tier="than-thoai"]::before,.achievement-group[data-tier="than-thoai"]::after,.weekly-role-preview-v12::before,.weekly-role-preview-v12::after{animation:none}}
  `;document.head.appendChild(st)}
  function weeklyRolePreviewV12(){ensureThemeEffectsV12();const host=$('questBoard');if(!host)return;host.querySelectorAll('.weekly-role-preview-v12').forEach(x=>x.remove());const week=roleWeekKey(),reward=weeklyRewardForWeek(week),role=ensureWeeklyRoleForWeek(week);const bg=reward.gradientCss||role.gradientCss||'linear-gradient(135deg,#7c3aed,#ec4899)';const preview=roleSchema({...role,effects:{...(role.effects||{}),cornerIcons:(role.effects?.cornerIcons||['🌌','✦']).slice(0,2),decorPositions:(role.effects?.decorPositions||['top-left','top-right']).slice(0,2),decorColor:role.effects?.decorColor||'#fef08a',decorBg:role.effects?.decorBg||'rgba(15,23,42,.64)'}});const box=document.createElement('div');box.className='weekly-role-preview-v12';box.style.setProperty('--weekly-bg',bg);box.innerHTML=`<div class="weekly-role-preview-title">🌌 XEM TRƯỚC ROLE PHẦN THƯỞNG TUẦN</div><div>${renderRoleCapsule(preview)}</div><div class="weekly-role-preview-sub">Nền Role dùng đúng nền chuyển màu của phần thưởng tuần: ${esc(reward.title||reward.name||'Phần thưởng tuần')}</div>`;host.insertBefore(box,host.firstChild)}
  const renderQuestBoardV12=renderQuestBoard;renderQuestBoard=function(){renderQuestBoardV12();setTimeout(weeklyRolePreviewV12,0)};
  const renderAchievementsViewV12=renderAchievementsView;renderAchievementsView=function(){ensureThemeEffectsV12();renderAchievementsViewV12();setTimeout(renderTierRolePreviews,0)};
  setTimeout(()=>{ensureThemeEffectsV12();weeklyRolePreviewV12()},0);
  /* 🧩 Icon trang trí trong suốt + quản lý Role cá nhân không giới hạn */
  function ensureRoleVisibilityV13(){if(document.getElementById('roleVisibilityV13'))return;const st=document.createElement('style');st.id='roleVisibilityV13';st.textContent=`
  .role-corner-placed{background:transparent!important;border:0!important;border-color:transparent!important;box-shadow:none!important;border-radius:0!important;width:22px;height:22px;padding:0!important;filter:drop-shadow(0 1px 2px rgba(15,23,42,.9))!important}
  .role-corner-placed::before{content:"";position:absolute;inset:-2px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.28),transparent 67%);z-index:-1;opacity:.3}
  .role-profile-manage-v13{margin-top:10px;padding:10px;border:1px solid #bae6fd;border-radius:14px;background:linear-gradient(135deg,#f0fdfa,#eff6ff);color:#0f172a}.role-profile-manage-v13-title{font-weight:900;color:#0f766e;margin-bottom:7px}.role-profile-role-row-v13{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;padding:7px 0;border-top:1px solid rgba(148,163,184,.3)}.role-profile-role-row-v13 .role-capsule{font-size:12px;min-height:28px;padding:4px 12px}.role-profile-visibility-btn-v13{border:1px solid #94a3b8;border-radius:8px;background:#fff;color:#0f172a;padding:5px 8px;cursor:pointer;font-size:11px;font-weight:800}.role-profile-visibility-btn-v13:hover{background:#ecfeff;border-color:#0891b2}@media(max-width:600px){.role-corner-placed{width:19px;height:19px}.role-profile-role-row-v13{align-items:flex-start}}
  `;document.head.appendChild(st)}
  function toggleMyRoleVisibilityV13(roleId){const id=state.sessionAuth?.memberId;if(!id)return;const role=(state.customRoles||[]).find(r=>String(r.id)===String(roleId)&&String(r.ownerId)===String(id));if(!role)return;role.visibility=role.visibility==='hidden'?'public':'hidden';saveState();renderProfileView();renderCustomRoles?.();}
  function renderMyRoleVisibilityV13(){const id=state.sessionAuth?.memberId,box=$('profileRoleBadge');if(!id||!box)return;const roles=getCustomRolesForMember(id)||[];let host=document.getElementById('myRoleVisibilityV13');if(host)host.remove();host=document.createElement('div');host.id='myRoleVisibilityV13';host.className='role-profile-manage-v13';host.innerHTML=`<div class="role-profile-manage-v13-title">🎨 Role của tôi (${roles.length})</div><div class="role-workshop-hint">Bạn có thể giữ không giới hạn Role. Ẩn/hiện từng Role độc lập; ẩn Role không xóa Role.</div>${roles.length?roles.map(r=>`<div class="role-profile-role-row-v13"><span>${renderRoleCapsule(r)}</span><button class="role-profile-visibility-btn-v13" onclick="toggleMyRoleVisibilityV13('${String(r.id).replace(/'/g,"\\'")}')">${r.visibility==='hidden'?'👁️ Hiện Role':'🙈 Ẩn Role'}</button></div>`).join(''):'<div class="muted">Chưa có Role nào.</div>'}`;box.appendChild(host)}
  ensureRoleVisibilityV13();
  const renderProfileViewV13=renderProfileView;renderProfileView=function(){renderProfileViewV13();setTimeout(renderMyRoleVisibilityV13,0)};
  setTimeout(()=>{ensureRoleVisibilityV13();renderMyRoleVisibilityV13()},0);
  /* 🔧 Sửa nút Ẩn/Hiện Role v14: dùng save() và không phụ thuộc ownerId */
  function toggleMyRoleVisibilityV14(roleId){const memberId=state.sessionAuth?.memberId||state.membersList?.find(m=>m.name===state.sessionAuth?.name)?.id;if(!memberId)return alert('Không xác định được tài khoản hiện tại.');const assigned=getCustomRolesForMember(memberId)||[];const role=assigned.find(r=>String(r.id)===String(roleId));if(!role)return alert('Không tìm thấy Role được gán cho tài khoản này.');role.visibility=role.visibility==='hidden'?'public':'hidden';roleSchema(role);if(typeof save==='function')save();else if(typeof saveState==='function')saveState();if(typeof renderProfileView==='function')renderProfileView();if(typeof renderCustomRoles==='function')renderCustomRoles();if(typeof renderAdminView==='function')renderAdminView();}
  window.toggleMyRoleVisibilityV13=toggleMyRoleVisibilityV14;
  function renderMyRoleVisibilityV14(){const id=state.sessionAuth?.memberId||state.membersList?.find(m=>m.name===state.sessionAuth?.name)?.id,box=$('profileRoleBadge');if(!id||!box)return;const roles=getCustomRolesForMember(id)||[];let host=document.getElementById('myRoleVisibilityV13');if(host)host.remove();host=document.createElement('div');host.id='myRoleVisibilityV13';host.className='role-profile-manage-v13';host.innerHTML=`<div class="role-profile-manage-v13-title">🎨 Role của tôi (${roles.length})</div><div class="role-workshop-hint">Bạn có thể giữ không giới hạn Role. Ẩn/hiện từng Role độc lập; ẩn Role không xóa Role.</div>${roles.length?roles.map(r=>`<div class="role-profile-role-row-v13"><span>${renderRoleCapsule(r)}</span><button type="button" class="role-profile-visibility-btn-v13" onclick="window.toggleMyRoleVisibilityV13('${String(r.id).replace(/'/g,"\\'")}')">${r.visibility==='hidden'?'👁️ Hiện Role':'🙈 Ẩn Role'}</button></div>`).join(''):'<div class="muted">Chưa có Role nào.</div>'}`;box.appendChild(host)}
  const renderProfileViewV14=renderProfileView;renderProfileView=function(){renderProfileViewV14();setTimeout(renderMyRoleVisibilityV14,0)};
  setTimeout(()=>{try{renderMyRoleVisibilityV14()}catch(e){console.error('Role visibility v14',e)}},0);
  /* V16 FINAL: chỉ Vô Cực/Thần Thoại có Role + Zone thành tích; khôi phục renderer, preview và Profile. */
  const v16LegacyAchievementRoleFor=achievementRoleFor;
  const v16PremiumTierNames=new Set(['Vô Cực','Thần Thoại']);
  function v16AchievementNumber(a){const m=String(a?.id||a||'').match(/hard(\\d+)/i);return m?Number(m[1]):NaN;}
  function v16PremiumTier(a){
    const raw=String(a?.tier||a?.difficulty||a?.name||'').toLowerCase();
    if(raw.includes('vô cực')||raw.includes('vo cuc'))return 'Vô Cực';
    if(raw.includes('thần thoại')||raw.includes('than thoai'))return 'Thần Thoại';
    const n=v16AchievementNumber(a);
    if(Number.isFinite(n)&&n>=711&&n<=810)return 'Vô Cực';
    if(Number.isFinite(n)&&n>=811&&n<=900)return 'Thần Thoại';
    return null;
  }
  function v16IsPremiumAchievement(a){return v16PremiumTier(a)!==null;}
  function v16RoleBelongsToPremium(role){
    if(!role)return false;
    if(role.sourceType!=='achievement'&&!role.achievementId&&!String(role.systemKey||'').startsWith('achievement'))return true;
    return v16IsPremiumAchievement({id:role.achievementId,tier:role.tier,name:role.name});
  }
  function v16AchievementRoleFor(a){
    const tier=v16PremiumTier(a); if(!tier)return null;
    const n=v16AchievementNumber(a), legacy=v16LegacyAchievementRoleFor(a);
    const colors=tier==='Vô Cực'?['#020617','#312e81']:['#240b36','#713f12'];
    const icons=tier==='Vô Cực'?['🌌','🪐','☄️','🛰️','🌟','💫']:['💠','🏛️','⚜️','🔮','🕯️','🐉'];
    const presets=tier==='Vô Cực'?['cosmic-float','nebula-breathe','portal-drift']:['mythic-rune','divine-aura','constellation-crown'];
    const role=legacy&&legacy.tier===tier?{...legacy}:{name:`${tier} · ${String(a?.name||'Thành tích').replace(/ — .*/, '')}`,icon:icons[(Number.isFinite(n)?n:0)%icons.length],color1:colors[0],color2:colors[1],gradientCss:tier==='Vô Cực'?'radial-gradient(circle at 18% 20%,rgba(129,140,248,.95),transparent 20%),radial-gradient(circle at 82% 78%,rgba(236,72,153,.75),transparent 22%),linear-gradient(135deg,#020617,#111827 38%,#312e81 70%,#0f172a)':'radial-gradient(circle at 22% 22%,rgba(250,204,21,.95),transparent 13%),radial-gradient(circle at 78% 76%,rgba(220,38,38,.78),transparent 22%),linear-gradient(135deg,#09090b,#240b36 42%,#581c87 68%,#713f12)',effects:{}};
    role.systemKey=`achievement-role-${a.id}`;role.achievementId=a.id;role.tier=tier;role.sourceType='achievement';role.name=role.name||`${tier} · ${a.name}`;role.icon=role.icon||icons[(Number.isFinite(n)?n:0)%icons.length];role.color1=role.color1||colors[0];role.color2=role.color2||colors[1];role.gradientCss=role.gradientCss||`linear-gradient(135deg,${role.color1},${role.color2})`;role.origin=`Phần thưởng Role riêng cho thành tích “${a.name}” trong nhóm ${tier}.`;role.effects={...(role.effects||{}),animation:tier==='Vô Cực'?'star-orbit':'sparkle',style:tier==='Vô Cực'?'Space':'Mystery',speed:tier==='Vô Cực'?7.2:4.2,strength:tier==='Vô Cực'?.85:1.1,count:4,size:.72,direction:'clockwise',gradient:true,glow:true,lightPreset:presets[(Number.isFinite(n)?n:0)%presets.length],cornerIcons:(role.effects?.cornerIcons?.length?role.effects.cornerIcons:icons).slice(0,4),cornerCount:4,decorColor:tier==='Vô Cực'?'#bfdbfe':'#fde68a',decorBg:'rgba(15,23,42,.58)'};
    return roleSchema(role);
  }
  const v16LegacyAchievementRoleDescription=achievementRoleDescription;
  achievementRoleDescription=function(role,ach){
    const base=v16LegacyAchievementRoleDescription(role,ach);if(!role||!v16IsPremiumAchievement(ach))return base;
    const zone=ach.zoneReward||{name:`Zone · ${role.name||ach.name}`,icon:role.icon||'🌌',origin:`Zone riêng của thành tích “${ach.name}”.`};
    const zoneHtml='<p style="margin:7px 0"><b>Zone riêng:</b> '+esc(zone.icon||'🌌')+' '+esc(zone.name||('Zone · '+ach.name))+' · '+esc(zone.origin||'Zone độc lập của thành tích này.')+'</p></div>';
    return base.replace(/<\/div>\s*$/,zoneHtml);
  };
  achievementRoleFor=v16AchievementRoleFor;
  const v16LegacyDecorateAchievement=decorateAchievement;
  decorateAchievement=function(a){
    const out=v16LegacyDecorateAchievement(a),premium=v16IsPremiumAchievement(a);
    if(!premium){out.roleReward=null;out.zoneReward=null;out.reward={...(out.reward||{}),role:null,zone:null};}
    else{out.roleReward=v16AchievementRoleFor(a);out.zoneReward={id:`achievement-zone-${a.id}`,achievementId:a.id,tier:v16PremiumTier(a),name:`Zone · ${out.roleReward.name}`,icon:out.roleReward.icon||'🌌',color1:out.roleReward.color1,color2:out.roleReward.color2,origin:`Zone riêng của thành tích “${a.name}”.`};out.reward={...(out.reward||{}),role:out.roleReward,zone:out.zoneReward};}
    return out;
  };
  const v16LegacyGrantAchievementRole=grantAchievementRole;
  grantAchievementRole=function(ownerId,ach){return v16IsPremiumAchievement(ach)?v16LegacyGrantAchievementRole(ownerId,ach):null;};
  function v16AwardAchievementZone(ownerId,ach){
    if(!v16IsPremiumAchievement(ach)||typeof ownerZoneStore!=='function')return null;
    const z=ownerZoneStore(ownerId),zone=ach.zoneReward||{id:`achievement-zone-${ach.id}`,achievementId:ach.id,tier:v16PremiumTier(ach),name:`Zone · ${ach.name}`,icon:ach.icon||'🌌',color1:'#020617',color2:'#facc15',origin:`Zone riêng của thành tích “${ach.name}”.`};
    z.zones=Array.isArray(z.zones)?z.zones:[];z.publicZones=z.publicZones&&typeof z.publicZones==='object'?z.publicZones:{};
    let existing=z.zones.find(x=>String(x.achievementId||'')===String(ach.id)||String(x.id||'')===String(zone.id));
    if(!existing){existing={...zone};z.zones.push(existing);}if(z.publicZones[existing.name]===undefined)z.publicZones[existing.name]=false;return existing;
  }
  const v16LegacySyncAchievementRewardBundle=syncAchievementRewardBundle;
  syncAchievementRewardBundle=function(ownerId,ach){
    const rec=v16LegacySyncAchievementRewardBundle(ownerId,ach),premium=v16IsPremiumAchievement(ach);
    if(!premium){if(rec){rec.roleId=null;rec.roleName=null;rec.zoneId=null;}}
    else if(rec){const z=v16AwardAchievementZone(ownerId,ach);rec.zoneId=z?.id||null;rec.zoneName=z?.name||null;}
    return rec;
  };
  function v16CleanLegacyAchievementRewards(){
    let changed=false;state.customRoles=Array.isArray(state.customRoles)?state.customRoles:[];
    const badIds=new Set(state.customRoles.filter(r=>(r.sourceType==='achievement'||r.achievementId||String(r.systemKey||'').startsWith('achievement'))&&!v16RoleBelongsToPremium(r)).map(r=>String(r.id)));
    if(badIds.size){state.customRoles=state.customRoles.filter(r=>!badIds.has(String(r.id)));changed=true;}
    [...(state.membersList||[]),...(state.memberAccounts||[])].forEach(x=>{if(!x||!Array.isArray(x.customRoleIds))return;const next=x.customRoleIds.filter(id=>!badIds.has(String(id)));if(next.length!==x.customRoleIds.length){x.customRoleIds=next;changed=true;}});
    Object.values(state.achievementRewards||{}).forEach(owner=>Object.entries(owner||{}).forEach(([id,rec])=>{const a={id};if(!v16IsPremiumAchievement(a)&&rec&&(rec.roleId||rec.roleName||rec.zoneId)){rec.roleId=null;rec.roleName=null;rec.zoneId=null;rec.zoneName=null;changed=true;}}));
    Object.values(state.memberZones||{}).forEach(z=>{if(!z||!Array.isArray(z.zones))return;const next=z.zones.filter(zone=>!zone.achievementId||v16IsPremiumAchievement(zone));if(next.length!==z.zones.length){z.zones=next;changed=true;}});
    return changed;
  }
  ensureAchievementMetadata();
  const v16Defs=()=>getAchievementDefinitions().flatMap(g=>g.items||[]).map(decorateAchievement);
  (state.membersList||[]).forEach(m=>{const unlocked=new Set(getProgressRecord(m.id)?.unlockedAchievements||[]);v16Defs().filter(a=>v16IsPremiumAchievement(a)&&unlocked.has(a.id)).forEach(a=>syncAchievementRewardBundle(m.id,a));});
  if(v16CleanLegacyAchievementRewards())try{save();}catch(e){console.warn('Không thể lưu chính sách Role thành tích V16',e)}

  /* Renderer cuối: capsule cao 1.18em, icon góc độc lập và animation luôn chạy. */
  function renderRoleCapsuleV16(role,opts={}){
    roleSchema(role);if(opts.publicMode===true&&role.visibility==='hidden')return '';
    const e=role.effects||{},anim=String(e.animation||'none').toLowerCase(),icons=Array.isArray(e.cornerIcons)&&e.cornerIcons.length?e.cornerIcons:[role.icon||'✦'],count=Math.max(1,Math.min(4,Number(e.cornerCount)||icons.length||1)),positions=Array.isArray(e.decorPositions)&&e.decorPositions.length?e.decorPositions:['top-left','top-right','bottom-left','bottom-right'];
    const corners=icons.slice(0,count).map((icon,i)=>`<span class="role-corner role-corner-placed role-corner-anim-${anim}" style="${typeof roleDecorStyleV11==='function'?roleDecorStyleV11(role,positions[i]||positions[positions.length-1]||'top-left'):''};--corner-delay:${i*.22}s">${esc(icon)}</span>`).join('');
    const source=role.sourceType==='achievement'?`🏆 Thành tích ${role.achievementId||''}`:role.sourceType==='weekly_reward'?`🎁 Phần thưởng tuần ${role.weeklyRewardId||''}`:'🎨 Role tự tạo';
    return `<span class="role-capsule role-corners-v16 role-anim-${anim} role-light-${String(e.lightPreset||'none').replace(/[^a-z0-9-]/gi,'-')} role-style-${String(e.style||'Minimal').replace(/[^a-z0-9]/gi,'-')}" style="${roleCss(role)}" title="${esc(source)}"><span class="role-fx-layer role-corner-layer">${corners}</span><span class="role-capsule-content">${esc(role.icon||'🏷️')} ${esc(role.name||'Role')}</span></span>`;
  }
  renderRoleCapsule=renderRoleCapsuleV16;renderRoleCapsuleV11=renderRoleCapsuleV16;renderRoleCapsuleV9=renderRoleCapsuleV16;
  const v16Style=document.createElement('style');v16Style.id='roleVisibilityEffectsV16';v16Style.textContent=`
    .role-corners-v16{display:inline-flex!important;align-items:center!important;justify-content:center!important;box-sizing:border-box!important;height:1.18em!important;min-height:1.18em!important;padding:0 .975em!important;border:0!important;border-width:0!important;border-style:none!important;line-height:1!important;vertical-align:middle!important;overflow:visible!important;isolation:isolate!important;animation-play-state:running!important}
    .role-corners-v16 .role-capsule-content{display:inline-flex!important;align-items:center!important;line-height:1!important;font-size:1.06em!important;font-weight:900!important;white-space:nowrap!important;z-index:7!important}
    .role-corners-v16 .role-corner-placed{animation-duration:var(--role-speed,6s)!important;animation-delay:var(--corner-delay,0s)!important;animation-iteration-count:infinite!important;animation-timing-function:ease-in-out!important;animation-play-state:running!important;will-change:opacity,filter,translate,rotate,scale!important;transform:translate(-50%,-50%)!important}
    .role-corners-v16 .role-corner-anim-none{animation:none!important;animation-play-state:paused!important}
    .role-corners-v16.role-anim-orbit .role-corner-placed{animation:roleV16Orbit var(--role-speed,6s) linear infinite!important;animation-play-state:running!important}
    .role-corners-v16.role-anim-star-orbit .role-corner-placed{animation:roleV16StarOrbit var(--role-speed,6s) linear infinite!important;animation-play-state:running!important}
    .role-corners-v16.role-anim-sparkle .role-corner-placed{animation:roleV16Sparkle var(--role-speed,6s) ease-in-out infinite!important;animation-play-state:running!important}
    .role-corners-v16.role-anim-shimmer .role-corner-placed,.role-corners-v16.role-anim-particle .role-corner-placed,.role-corners-v16.role-anim-energy-wave .role-corner-placed{animation:roleV16Sparkle var(--role-speed,6s) ease-in-out infinite!important;animation-play-state:running!important}
    .role-corners-v16.role-anim-none.role-light-cosmic-float .role-corner-placed{animation:roleV16CosmicFloat var(--role-speed,6.8s) ease-in-out infinite!important;animation-play-state:running!important}
    .role-corners-v16.role-anim-none.role-light-mythic-rune .role-corner-placed{animation:roleV16MythicRune var(--role-speed,3.8s) ease-in-out infinite!important;animation-play-state:running!important}
    .role-corners-v16.role-anim-glow .role-corner-placed,.role-corners-v16.role-anim-pulse .role-corner-placed{animation:roleV16MythicRune var(--role-speed,4.6s) ease-in-out infinite!important;animation-play-state:running!important}
    @keyframes roleV16StarOrbit{0%{translate:0 2px;rotate:0deg;scale:.84;opacity:.62}25%{translate:2px -2px;rotate:90deg;scale:1;opacity:1}50%{translate:0 -4px;rotate:180deg;scale:.9;opacity:.82}75%{translate:-2px -2px;rotate:270deg;scale:1.08;opacity:1}100%{translate:0 2px;rotate:360deg;scale:.84;opacity:.62}}
    @keyframes roleV16Sparkle{0%,100%{translate:0 1px;rotate:0deg;scale:.72;opacity:.28;filter:drop-shadow(0 0 2px currentColor)}35%{translate:1px -2px;rotate:18deg;scale:1.18;opacity:1;filter:drop-shadow(0 0 9px currentColor)}70%{translate:-1px 0;rotate:-12deg;scale:.94;opacity:.66}}
    @keyframes roleV16MythicRune{0%,100%{translate:0 1px;rotate:-8deg;scale:.88;opacity:.68}35%{translate:1px -1px;rotate:0deg;scale:1.1;opacity:1}70%{translate:-1px 1px;rotate:8deg;scale:.96;opacity:.78}}
    @keyframes roleV16CosmicFloat{0%,100%{translate:0 4px;rotate:-3deg;scale:.94;opacity:.68}50%{translate:5px -7px;rotate:4deg;scale:1.04;opacity:1}}
    @keyframes roleV16Orbit{0%{translate:0 2px;rotate:0deg;scale:.9;opacity:.62}25%{translate:5px -2px;rotate:90deg;scale:1;opacity:.95}50%{translate:0 -4px;rotate:180deg;scale:.9;opacity:.72}75%{translate:-5px -2px;rotate:270deg;scale:1.05;opacity:1}100%{translate:0 2px;rotate:360deg;scale:.9;opacity:.62}}
    .leaderboard-role-origin-group{display:inline-flex!important;gap:5px!important;flex-wrap:wrap!important;margin-left:5px!important;vertical-align:middle!important}.leaderboard-role-origin-btn{appearance:none!important;border:0!important;background:transparent!important;padding:0!important;margin:0!important;cursor:pointer!important;border-radius:12px!important;line-height:1!important}.leaderboard-role-origin-btn:focus-visible{outline:3px solid #0ea5e9!important;outline-offset:3px!important}.leaderboard-role-origin-btn:hover .role-capsule{filter:brightness(1.08)!important}
    .role-profile-manage-v16{margin-top:12px!important;padding:12px!important;border:1px solid #bae6fd!important;border-radius:14px!important;background:linear-gradient(135deg,#f0fdfa,#eff6ff)!important;color:#0f172a!important}.role-profile-manage-v16-title{font-weight:950!important;color:#0f766e!important;margin-bottom:5px!important}.role-profile-role-row-v16{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:8px!important;flex-wrap:wrap!important;padding:8px 0!important;border-top:1px solid rgba(148,163,184,.3)!important}.role-profile-role-actions-v16{display:flex!important;gap:6px!important;flex-wrap:wrap!important}.role-profile-primary-btn-v16,.role-profile-visibility-btn-v16{border:1px solid #94a3b8!important;border-radius:8px!important;background:#fff!important;color:#0f172a!important;padding:5px 8px!important;cursor:pointer!important;font-size:11px!important;font-weight:850!important}.role-profile-primary-btn-v16.is-primary{background:#fef3c7!important;border-color:#f59e0b!important;color:#92400e!important}.role-profile-primary-btn-v16:hover,.role-profile-visibility-btn-v16:hover{background:#ecfeff!important;border-color:#0891b2!important}
    #adminMemberListContainer.founder-account-admin-frame-v16{display:block!important;margin-top:16px!important;padding:16px!important;border:1px solid #e6cf78!important;border-radius:18px!important;background:linear-gradient(135deg,#fffbe8 0%,#f5fbff 55%,#eef8ff 100%)!important;box-shadow:0 8px 22px rgba(15,23,42,.12)!important}
    #adminMemberListContainer.founder-account-admin-frame-v16>h3{margin:0 0 12px!important;color:#8a5a00!important;font-weight:950!important}#adminMemberListContainer.founder-account-admin-frame-v16>.card{border-color:#ead58a!important;background:rgba(255,255,255,.72)!important;box-shadow:0 3px 10px rgba(15,23,42,.08)!important}
    .tier-preview-vo-cuc,.tier-preview-than-thoai{animation:none!important;filter:none!important;background-position:initial!important}
    .tier-preview-vo-cuc .role-capsule,.tier-preview-than-thoai .role-capsule{animation:none!important;filter:none!important;animation-play-state:paused!important}
    .tier-preview-vo-cuc .role-corners-v16.role-anim-star-orbit .role-corner-placed,.tier-preview-vo-cuc .role-corners-v16.role-anim-none .role-corner-placed{animation:finalCosmicFloat var(--role-speed,6.8s) ease-in-out infinite!important;animation-play-state:running!important}
    .tier-preview-than-thoai .role-corners-v16.role-anim-sparkle .role-corner-placed,.tier-preview-than-thoai .role-corners-v16.role-anim-none .role-corner-placed{animation:finalMythicFlicker var(--role-speed,4.2s) ease-in-out infinite!important;animation-play-state:running!important}
    .tier-preview-than-thoai .role-capsule-content{animation:finalMythicText 4.2s ease-in-out infinite!important;animation-play-state:running!important}
    @keyframes finalCosmicFloat{0%,100%{translate:0 3px;rotate:-2deg;scale:.96;opacity:.72}50%{translate:4px -5px;rotate:2deg;scale:1.02;opacity:1}}
    @keyframes finalMythicFlicker{0%,100%{translate:0 1px;rotate:-3deg;scale:.94;opacity:.72;filter:drop-shadow(0 0 3px #fde68a)}35%{translate:1px -1px;rotate:2deg;scale:1.04;opacity:1;filter:drop-shadow(0 0 8px #facc15)}70%{translate:-1px 0;rotate:-1deg;scale:.98;opacity:.84;filter:drop-shadow(0 0 6px #c084fc)}}
    @keyframes finalMythicText{0%,100%{opacity:.88;text-shadow:0 1px 3px rgba(0,0,0,.72),0 0 5px rgba(250,204,21,.28)}50%{opacity:1;text-shadow:0 1px 3px rgba(0,0,0,.72),0 0 10px rgba(250,204,21,.62),0 0 14px rgba(192,132,252,.38)}}
    @media(prefers-reduced-motion:reduce){.role-corners-v16,.role-corners-v16 .role-corner-placed,.tier-preview-vo-cuc .role-corner-placed,.tier-preview-than-thoai .role-corner-placed,.tier-preview-than-thoai .role-capsule-content{animation:none!important;animation-play-state:paused!important}}
  `;document.head.appendChild(v16Style);
  const v16PreviewFixCss=`html body .tier-preview-vo-cuc,html body .tier-preview-than-thoai{animation:none!important;filter:none!important;background-position:initial!important}html body .tier-preview-vo-cuc .role-capsule,html body .tier-preview-than-thoai .role-capsule{animation:none!important;animation-play-state:paused!important;filter:none!important}html body .tier-preview-vo-cuc .role-corners-v16 .role-corner-placed{animation:finalCosmicFloat var(--role-speed,6.8s) ease-in-out infinite!important;animation-play-state:running!important}html body .tier-preview-than-thoai .role-corners-v16 .role-corner-placed{animation:finalMythicFlicker var(--role-speed,4.2s) ease-in-out infinite!important;animation-play-state:running!important}html body .tier-preview-than-thoai .role-capsule-content{animation:finalMythicText 4.2s ease-in-out infinite!important;animation-play-state:running!important}`;
  function v16ApplyPreviewFix(){let s=document.getElementById('roleVisibilityPreviewFixV16');if(s)s.remove();s=document.createElement('style');s.id='roleVisibilityPreviewFixV16';s.textContent=v16PreviewFixCss;document.head.appendChild(s);}
  v16ApplyPreviewFix();
  const v16OldOpenAchievementDetail=window.openAchievementDetail;
  if(typeof v16OldOpenAchievementDetail==='function'&&!v16OldOpenAchievementDetail.__v16PreviewFix){window.openAchievementDetail=function(...args){const result=v16OldOpenAchievementDetail.apply(this,args);setTimeout(v16ApplyPreviewFix,0);return result;};window.openAchievementDetail.__v16PreviewFix=true;}

  const v16OldRenderRoleBadges=renderRoleBadges;
  renderRoleBadges=function(memberId){
    const roles=(getCustomRolesForMember(memberId)||[]).filter(r=>v16RoleBelongsToPremium(r)&&roleSchema(r).visibility==='public');if(!roles.length)return '';
    const primaryId=state.rolePrimaryRoles?.[String(memberId)]||'';roles.sort((a,b)=>(String(a.id)===String(primaryId)?-1:0)-(String(b.id)===String(primaryId)?-1:0));
    const key='study_empire_role_scale_'+String(memberId),scale=Math.max(.55,Math.min(1.15,Number(localStorage.getItem(key)||.72)));
    return `<span class="member-role-stack leaderboard-role-origin-group" data-member-role-id="${esc(String(memberId))}" style="--member-role-scale:${scale}">${roles.map(r=>`<button type="button" class="leaderboard-role-origin-btn" data-role-id="${esc(String(r.id))}" aria-label="Mở nguồn gốc Role ${esc(r.name||'Role')}" title="Bấm hoặc nhấn Enter để xem nguồn gốc" onclick="window.openRoleOriginV16(this.dataset.roleId)">${typeof window.renderRoleCapsule==='function'?window.renderRoleCapsule(r,{publicMode:true}):`<span class="tag">${esc(r.icon||'🎭')} ${esc(r.name||'Role')}</span>`}</button>`).join('')}</span>`;
  };
  window.openRoleOriginV16=function(roleId){if(typeof showRoleOrigin==='function')showRoleOrigin(roleId);};

  function v16CurrentMemberId(){return state.sessionAuth?.memberId||state.membersList?.find(m=>m.name===state.sessionAuth?.name)?.id||null;}
  function v16ProfileRoles(id){const live=window.achievementCorrectionLiveUnlocked?window.achievementCorrectionLiveUnlocked(id):new Set();return (getCustomRolesForMember(id)||[]).filter(r=>v16RoleBelongsToPremium(r)&&(!window.achievementCorrectionIsAchievementRole||!window.achievementCorrectionIsAchievementRole(r)||live.has(String(r.achievementId))));}
  function v16SetPrimaryRole(roleId){const id=v16CurrentMemberId(),role=v16ProfileRoles(id).find(r=>String(r.id)===String(roleId));if(!id||!role)return;state.rolePrimaryRoles=state.rolePrimaryRoles&&typeof state.rolePrimaryRoles==='object'?state.rolePrimaryRoles:{};state.rolePrimaryRoles[String(id)]=role.id;roleSchema(role);save();renderProfileView();}
  function v16ToggleRoleVisibility(roleId){const id=v16CurrentMemberId(),role=v16ProfileRoles(id).find(r=>String(r.id)===String(roleId));if(!id||!role)return;role.visibility=role.visibility==='hidden'?'public':'hidden';roleSchema(role);save();renderProfileView();renderComparison();}
  window.setPrimaryRoleV16=v16SetPrimaryRole;window.toggleRoleVisibilityV16=v16ToggleRoleVisibility;
  function renderMyRoleVisibilityV16(){
    const id=v16CurrentMemberId(),box=$('profileRoleBadge');if(!id||!box)return;let roles=v16ProfileRoles(id),host=document.getElementById('myRoleVisibilityV16');if(host)host.remove();state.rolePrimaryRoles=state.rolePrimaryRoles&&typeof state.rolePrimaryRoles==='object'?state.rolePrimaryRoles:{};let primaryId=state.rolePrimaryRoles[String(id)]||roles[0]?.id||'';if(primaryId&&!roles.some(r=>String(r.id)===String(primaryId)))primaryId=roles[0]?.id||'';if(primaryId)state.rolePrimaryRoles[String(id)]=primaryId;
    host=document.createElement('div');host.id='myRoleVisibilityV16';host.className='role-profile-manage-v16';host.innerHTML=`<div class="role-profile-manage-v16-title">🎭 Role phần thưởng của tôi</div><div class="role-workshop-hint">Bạn có thể giữ nhiều Role cùng lúc. Chọn một Role chính; nút Ẩn/Hiện chỉ thay đổi hiển thị, không xóa phần thưởng.</div>${roles.length?roles.map(r=>{const main=String(r.id)===String(primaryId);return `<div class="role-profile-role-row-v16"><div style="min-width:0">${renderRoleCapsule(r)}<div class="role-workshop-hint">${main?'⭐ Role chính · ':''}${r.tier?esc(r.tier):esc(r.sourceType==='achievement'?'Role thành tích':'Role cá nhân')} · ${r.visibility==='hidden'?'Đang ẩn':'Đang hiện'}</div></div><div class="role-profile-role-actions-v16"><button type="button" class="role-profile-primary-btn-v16 ${main?'is-primary':''}" data-role-id="${esc(String(r.id))}" onclick="window.setPrimaryRoleV16(this.dataset.roleId)">${main?'⭐ Role chính':'Chọn Role chính'}</button><button type="button" class="role-profile-visibility-btn-v16" data-role-id="${esc(String(r.id))}" onclick="window.toggleRoleVisibilityV16(this.dataset.roleId)">${r.visibility==='hidden'?'👁️ Hiện Role':'🙈 Ẩn Role'}</button></div></div>`}).join(''):'<div class="muted" style="margin-top:8px">Chưa có Role phần thưởng nào. Khi đạt Vô Cực hoặc Thần Thoại, Role riêng sẽ xuất hiện tại đây.</div>'}`;box.appendChild(host);
  }
  const v16OldRenderProfileView=renderProfileView;renderProfileView=function(){v16OldRenderProfileView.apply(this,arguments);setTimeout(renderMyRoleVisibilityV16,0);};
  setTimeout(()=>{try{renderMyRoleVisibilityV16()}catch(e){console.warn('Role Profile V16',e)}},0);

  const v16OldRenderAdminView=renderAdminView;renderAdminView=function(){const result=v16OldRenderAdminView.apply(this,arguments),frame=$('adminMemberListContainer');if(frame){const founder=state.sessionAuth?.role==='Founder',manager=['Admin','Founder'].includes(state.sessionAuth?.role);frame.classList.toggle('founder-account-admin-frame-v16',founder);frame.style.display=manager?'block':'';}return result;};
  const v16OldRenderComparison=renderComparison;renderComparison=function(){const result=v16OldRenderComparison.apply(this,arguments);return result;};

  /* Keep render helpers callable after every mutation. */
  window.__ONG_PATCH_VERSION=PATCH_VERSION;
  setTimeout(()=>{try{ensureDailyQuests();checkAchievements();renderAchievementsView();renderQuestBoard();renderTrash();renderProfileView();renderComparison();}catch(e){console.error('V3 patch init',e);}},0);
})();


/* ---- extracted script block 19: <script> ---- */
/* V18: Preview là nguồn giao diện; tên Role vẫn lấy riêng theo từng Thành tích. */
(function(){
  'use strict';
  if(window.__studyEmpireAchievementPreviewSyncV18)return;
  window.__studyEmpireAchievementPreviewSyncV18=true;
  const premiumTierKey=function(roleOrAchievement){
    const x=String(roleOrAchievement?.tier||roleOrAchievement?.difficulty||roleOrAchievement?.name||'').toLowerCase();
    if(x.includes('vô cực')||x.includes('vo cuc'))return 'vo-cuc';
    if(x.includes('thần thoại')||x.includes('than thoai'))return 'than-thoai';
    const id=String(roleOrAchievement?.achievementId||roleOrAchievement?.id||'');
    const m=id.match(/hard(\d+)/i); if(m){const n=Number(m[1]);if(n>=711&&n<=810)return 'vo-cuc';if(n>=811&&n<=900)return 'than-thoai';}
    return null;
  };
  const previewFor=function(t){
    return typeof window.studyEmpirePreviewRoleV17==='function'
      ? window.studyEmpirePreviewRoleV17(t)
      : null;
  };
  const achievementNameSource=function(role,ach){
    try{
      const fresh=ach&&typeof achievementRoleFor==='function'?achievementRoleFor(ach):null;
      return role?.name||fresh?.name||ach?.name||'Role thành tích';
    }catch(e){return role?.name||ach?.name||'Role thành tích';}
  };
  window.studyEmpireAchievementRoleDisplayV18=function(role,ach){
    const t=premiumTierKey(ach||role),preview=previewFor(t);
    if(!t||!preview)return role;
    const display={...(role||{})};
    /* Chỉ thay lớp hiển thị, tuyệt đối không ghi ngược vào state.customRoles. */
    display.name=achievementNameSource(role,ach);
    display.icon=preview.icon;
    display.color1=preview.color1;
    display.color2=preview.color2;
    display.gradientCss=preview.gradientCss;
    display.textColor=preview.textColor;
    display.borderColor=preview.borderColor;
    display.badge=preview.badge;
    display.previewBadge=preview.previewBadge;
    display.tier=role?.tier||preview.tier;
    display.effects={...(preview.effects||{})};
    display.sourceType=role?.sourceType||'achievement';
    display.achievementId=role?.achievementId||ach?.id;
    display.systemKey=role?.systemKey||`achievement-role-${ach?.id||''}`;
    display.visibility=role?.visibility||'public';
    display.origin=role?.origin||`Phần thưởng Role riêng cho thành tích “${ach?.name||''}”.`;
    return typeof roleSchema==='function'?roleSchema(display):display;
  };
  const escapeHtml=function(value){const d=document.createElement('div');d.textContent=String(value??'');return d.innerHTML;};
  const previewRoleMarkup=function(t,role,ach){
    const host=document.querySelector(`.tier-preview-${t}`),clone=host?.cloneNode(true);
    if(!clone)return '';
    clone.classList.add('achievement-role-detail','premium-achievement-role-v18',`premium-achievement-${t}`);
    clone.dataset.premiumTier=t;
    const label=clone.querySelector('.tier-role-preview-label');
    if(label)label.textContent=`🎭 ROLE PHẦN THƯỞNG RIÊNG · PREVIEW ${t==='vo-cuc'?'VÔ CỰC':'THẦN THOẠI'}`;
    const capsule=clone.querySelector('.role-capsule'),content=clone.querySelector('.role-capsule-content');
    const roleName=role?.name||ach?.name||'Role thành tích',roleIcon=role?.icon||'🎭';
    if(content)content.textContent=`${roleIcon} ${roleName}`;
    if(capsule)capsule.setAttribute('title',`${roleIcon} ${roleName}`);
    const e=role?.effects||{},colors=[role?.color1,role?.color2].filter(Boolean).join(' → '),icons=Array.isArray(e.cornerIcons)?e.cornerIcons.join(' '):'';
    const meta=document.createElement('div');
    meta.className='premium-achievement-role-meta-v18';
    meta.innerHTML=`<div><b>${escapeHtml(roleName)}</b> <span class="tag sm">${escapeHtml(role?.tier||'Thành tích')}</span></div><p><b>Ý nghĩa:</b> Role này chỉ thuộc về thành tích “${escapeHtml(ach?.name||'')}”, không dùng chung với thành tích khác.</p><p><b>Nguồn gốc:</b> ${escapeHtml(role?.origin||`Phần thưởng riêng từ thành tích ${ach?.name||''}.`)}</p><p><b>Phong cách:</b> ${escapeHtml(e.style||role?.style||'Minimal')} · <b>Chuyển động:</b> ${escapeHtml(e.animation||role?.animation||'none')} · <b>Ánh sáng:</b> ${escapeHtml(e.lightPreset||'none')}</p><p><b>Màu Role theo preview:</b> ${escapeHtml(colors||'Theo mẫu Role của bậc')}${icons?` · <b>Icon preview:</b> ${escapeHtml(icons)}`:''}</p><p class="muted"><b>Hiển thị:</b> Thành viên có thể ẩn/hiện Role này trong Profile; việc ẩn không xóa phần thưởng.</p>`;
    clone.appendChild(meta);
    return clone.outerHTML;
  };
  window.studyEmpireAchievementRoleDescriptionV18=function(role,ach){
    const t=premiumTierKey(ach||role);
    return t?previewRoleMarkup(t,role,ach):'';
  };
  const style=document.createElement('style');
  style.id='premiumAchievementPreviewSyncV18Style';
  style.textContent=`
    .premium-achievement-role-v18{position:relative!important;overflow:hidden!important;isolation:isolate!important;color:#f8fafc!important;border-radius:18px!important;padding:16px 18px!important;box-shadow:0 12px 28px rgba(30,41,59,.16),inset 0 0 28px rgba(255,255,255,.12)!important}
    .premium-achievement-role-v18::before{content:var(--premium-achievement-particles);position:absolute;inset:5px;color:rgba(255,255,255,.62);font-size:12px;letter-spacing:16px;line-height:34px;pointer-events:none;z-index:0;animation:premiumAchievementParticlesV18 7s linear infinite;text-shadow:0 0 8px currentColor}
    .premium-achievement-role-v18::after{content:"";position:absolute;left:-30%;top:22%;width:35%;height:2px;background:linear-gradient(90deg,transparent,#fff,transparent);box-shadow:0 0 14px 3px rgba(255,255,255,.7);pointer-events:none;z-index:0;animation:premiumAchievementSweepV18 6s ease-in-out infinite}
    .premium-achievement-role-v18>*{position:relative;z-index:2}
    .premium-achievement-role-label-v18{font-size:12px;font-weight:900;letter-spacing:.04em;color:rgba(255,255,255,.82);margin-bottom:9px}
    .premium-achievement-role-v18 .role-capsule{background:var(--role-bg)!important;background-image:var(--role-bg)!important;color:var(--role-text,#fff)!important;border-color:var(--role-border,rgba(255,255,255,.72))!important;box-shadow:0 0 calc(18px * var(--role-strength,1)) rgba(255,255,255,.3),inset 0 0 12px rgba(255,255,255,.12)!important}
    .premium-achievement-role-v18.premium-achievement-vo-cuc{--premium-achievement-bg:radial-gradient(circle at 15% 25%,rgba(129,140,248,.28),transparent 20%),radial-gradient(circle at 82% 70%,rgba(236,72,153,.22),transparent 24%),linear-gradient(135deg,#020617 0%,#172554 48%,#701a75 100%);--premium-achievement-particles:"✦  ·  ✧   ·   ✦     ·  ✧  ·  ✦   ·   ✧   ·  ✦";border-color:#818cf8!important}
    .premium-achievement-role-v18.premium-achievement-than-thoai{--premium-achievement-bg:radial-gradient(circle at 70% 12%,rgba(250,204,21,.22),transparent 18%),radial-gradient(circle at 20% 78%,rgba(168,85,247,.26),transparent 25%),linear-gradient(135deg,#09090b 0%,#3b0764 46%,#713f12 100%);--premium-achievement-particles:"✧        ·       ✦        ·       ✧       ·       ✦";border-color:#f0abfc!important}
    .premium-achievement-role-v18.premium-achievement-vo-cuc::before{color:rgba(191,219,254,.78);text-shadow:0 0 8px #bae6fd;animation-name:premiumAchievementInfinityParticlesV18}
    .premium-achievement-role-v18.premium-achievement-than-thoai::before{color:rgba(253,230,138,.74);text-shadow:0 0 9px #facc15;animation-name:premiumAchievementMythicParticlesV18}
    .premium-achievement-role-v18.premium-achievement-than-thoai .role-capsule-content{animation:premiumAchievementMythicTextV18 4.2s ease-in-out infinite}
    @keyframes premiumAchievementParticlesV18{0%,100%{opacity:.55}50%{opacity:1}}
    @keyframes premiumAchievementInfinityParticlesV18{0%,100%{transform:translate3d(0,0,0);opacity:.65}50%{transform:translate3d(18px,-7px,0);opacity:1}}
    @keyframes premiumAchievementMythicParticlesV18{0%,100%{transform:translateY(0);opacity:.62}50%{transform:translateY(-10px);opacity:1}}
    @keyframes premiumAchievementSweepV18{0%{left:-30%;opacity:0}22%,72%{opacity:1}100%{left:115%;opacity:0}}
    @keyframes premiumAchievementMythicTextV18{0%,100%{opacity:.88;text-shadow:0 1px 3px rgba(0,0,0,.72),0 0 5px rgba(250,204,21,.28)}50%{opacity:1;text-shadow:0 1px 3px rgba(0,0,0,.72),0 0 10px rgba(250,204,21,.62),0 0 14px rgba(192,132,252,.38)}}
    @media(prefers-reduced-motion:reduce){.premium-achievement-role-v18::before,.premium-achievement-role-v18::after,.premium-achievement-role-v18 .role-capsule-content{animation:none!important}}
    @media(max-width:600px){.premium-achievement-role-v18{padding:12px 10px!important}.premium-achievement-role-v18::before{font-size:10px;letter-spacing:8px;line-height:42px}}
  `;
  document.head.appendChild(style);
  /* V18 final runtime hook: V16 có thể ghi đè window.openAchievementDetail, nên nối lại tại lớp cuối. */
  const v18OldOpenAchievementDetail=window.openAchievementDetail;
  if(typeof v18OldOpenAchievementDetail==='function'&&!v18OldOpenAchievementDetail.__v18AchievementPreviewSync){
    const v18OpenAchievementDetail=function(id){
      const result=v18OldOpenAchievementDetail.apply(this,arguments);
      setTimeout(()=>{
        try{
          const groups=window.getAchievementDefinitions?.()||[],ach=groups.flatMap(g=>Array.isArray(g.items)?g.items:[]).find(a=>a.id===id),body=document.getElementById('modalBody');
          if(!ach||!body||body.querySelector('.achievement-role-detail'))return;
          const roleBase=ach.roleReward||ach.reward?.role;
          const roleHtml=window.studyEmpireAchievementRoleDescriptionV18?.(roleBase,ach);
          if(roleHtml)body.insertAdjacentHTML('beforeend',roleHtml);
        }catch(e){console.warn('V18 achievement preview sync skipped',e);}
      },0);
      return result;
    };
    v18OpenAchievementDetail.__v18AchievementPreviewSync=true;
    window.openAchievementDetail=v18OpenAchievementDetail;
  }
})();


/* ---- extracted script block 20: <script id="achievement-pomodoro-correction-final-v1"> ---- */
(function(){
  'use strict';
  if(window.__achievementPomodoroCorrectionFinalV1)return;
  window.__achievementPomodoroCorrectionFinalV1=true;
  const liveFor=id=>window.achievementCorrectionLiveUnlocked?window.achievementCorrectionLiveUnlocked(id):new Set();
  const isAchRole=r=>!!(r&&(r.sourceType==='achievement'||r.achievementId||String(r.systemKey||'').startsWith('achievement')));
  const isPremiumRole=r=>{
    if(!isAchRole(r))return true;
    const raw=String(r?.tier||r?.difficulty||r?.name||r?.achievementId||'').toLowerCase();
    if(raw.includes('vô cực')||raw.includes('vo cuc')||raw.includes('thần thoại')||raw.includes('than thoai'))return true;
    const m=raw.match(/hard(\d+)/i),n=m?Number(m[1]):NaN;
    return Number.isFinite(n)&&n>=711&&n<=900;
  };
  const liveRoles=memberId=>(getCustomRolesForMember(memberId)||[]).filter(r=>isPremiumRole(r)&&(!isAchRole(r)||liveFor(memberId).has(String(r.achievementId))));

  const oldRenderProfileAchievementBadges=window.renderProfileAchievementBadges;
  window.renderProfileAchievementBadges=function(){
    const ownerId=accountOwnerId();
    if(!ownerId){return typeof oldRenderProfileAchievementBadges==='function'?oldRenderProfileAchievementBadges.apply(this,arguments):undefined;}
    const box=document.getElementById('profileAchievementBadges'),prefsBox=document.getElementById('profileBadgePrivacy'),zoneBox=document.getElementById('profileZoneBadges'),live=liveFor(ownerId),all=getAllAchievements(),unlocked=all.filter(a=>live.has(a.id));
    state.achievementBadgePrefs=state.achievementBadgePrefs||{};state.achievementBadgePrefs[ownerId]=state.achievementBadgePrefs[ownerId]||{};
    if(box)box.innerHTML=unlocked.map(a=>{const on=state.achievementBadgePrefs[ownerId][a.id]===true;return `<span class="tag" style="font-size:18px;padding:6px 9px;opacity:${on?1:.55}" title="${esc(a.name)} — ${on?'Công khai':'Riêng tư'}">${a.icon||'🏆'}${on?'':'🔒'}</span>`}).join('')||'<span class="muted">Chưa có huy hiệu thành tích.</span>';
    if(prefsBox)prefsBox.innerHTML=unlocked.length?unlocked.map(a=>{const on=state.achievementBadgePrefs[ownerId][a.id]===true;return `<label style="display:flex;align-items:center;gap:8px"><input type="checkbox" style="width:18px" ${on?'checked':''} onchange="toggleAchievementBadgePublic('${a.id}',this.checked)"> ${a.icon||'🏆'} ${esc(a.name)} — ${on?'🌍 Công khai':'🔒 Riêng tư'}</label>`}).join(''):'<span class="muted">Khi mở khóa thành tích, bạn sẽ có thể bật/tắt từng huy hiệu.</span>';
    const z=ownerZoneStore(ownerId);if(zoneBox)zoneBox.innerHTML=(z.zones||[]).filter(x=>!x.achievementId||live.has(String(x.achievementId))).map(x=>`<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap"><span class="tag" style="background:linear-gradient(135deg,${x.color1||'#c8e6c9'},${x.color2||x.color1||'#81c784'});font-size:16px" title="Zone ${esc(x.name)}">${x.icon||'✨'} ${esc(x.name)}</span><label class="muted"><input type="checkbox" style="width:18px" ${(z.publicZones||{})[x.name]===true?'checked':''} onchange="toggleZonePublic('${esc(x.name)}',this.checked)"> 🌍 Công khai</label></div>`).join('')||'<span class="muted">Chưa nhận Zone.</span>';
  };

  const oldRenderPublicAchievementBadges=window.renderPublicAchievementBadges;
  window.renderPublicAchievementBadges=function(memberId){
    const prefs=(state.achievementBadgePrefs||{})[memberId]||{},live=liveFor(memberId),all=getAllAchievements();
    return '<span style="display:inline-flex;gap:4px;flex-wrap:wrap;margin-left:5px">'+[...live].filter(id=>prefs[id]===true).map(id=>{const a=all.find(x=>x.id===id);return a?`<span class="tag" title="${esc(a.name)} — bấm để xem nguồn gốc" style="font-size:15px;padding:3px 6px;cursor:pointer" onclick="openAchievementDetail('${id}')">${a.icon||'🏆'}</span>`:''}).join('')+'</span>';
  };

  const oldRenderRoleBadges=window.renderRoleBadges;
  window.renderRoleBadges=function(memberId){
    const roles=liveRoles(memberId);if(!roles.length)return '';
    const primaryId=state.rolePrimaryRoles?.[String(memberId)]||'';roles.sort((a,b)=>(String(a.id)===String(primaryId)?-1:0)-(String(b.id)===String(primaryId)?-1:0));
    const key='study_empire_role_scale_'+String(memberId),scale=Math.max(.55,Math.min(1.15,Number(localStorage.getItem(key)||.72)));
    return `<span class="member-role-stack leaderboard-role-origin-group" data-member-role-id="${esc(String(memberId))}" style="--member-role-scale:${scale}">${roles.map(r=>`<button type="button" class="leaderboard-role-origin-btn" data-role-id="${esc(String(r.id))}" aria-label="Mở nguồn gốc Role ${esc(r.name||'Role')}" title="Bấm hoặc nhấn Enter để xem nguồn gốc" onclick="window.openRoleOriginV16(this.dataset.roleId)">${typeof window.renderRoleCapsule==='function'?window.renderRoleCapsule(r,{publicMode:true}):`<span class="tag">${esc(r.icon||'🎭')} ${esc(r.name||'Role')}</span>`}</button>`).join('')}</span>`;
  };

  const oldRenderAchievementsView=window.renderAchievementsView;
  if(typeof oldRenderAchievementsView==='function')window.renderAchievementsView=function(){
    const id=accountOwnerId(),old=Array.isArray(state.unlockedAchievements)?state.unlockedAchievements:null;
    try{if(id)state.unlockedAchievements=[...liveFor(id)];return oldRenderAchievementsView.apply(this,arguments);}finally{if(old)state.unlockedAchievements=old;}
  };

  const oldOpenAchievementDetail=window.openAchievementDetail;
  if(typeof oldOpenAchievementDetail==='function')window.openAchievementDetail=function(id){
    const ownerId=accountOwnerId(),rec=ownerId?getProgressRecord(ownerId):null,old=rec&&Array.isArray(rec.unlockedAchievements)?rec.unlockedAchievements:null;
    try{if(rec)rec.unlockedAchievements=[...liveFor(ownerId)];return oldOpenAchievementDetail.apply(this,arguments);}finally{if(rec&&old)rec.unlockedAchievements=old;}
  };

  const oldRenderProfileView=window.renderProfileView;
  if(typeof oldRenderProfileView==='function')window.renderProfileView=function(){
    const result=oldRenderProfileView.apply(this,arguments);
    setTimeout(()=>{['myRoleVisibilityV13','myRoleVisibilityV14'].forEach(id=>{const el=document.getElementById(id);if(el)el.style.display='none';});},0);
    return result;
  };
})();


/* ---- extracted script block 21: <script id="role-effects-display-fix-v3"> ---- */
(function(){
  'use strict';
  if(window.__studyEmpireRoleEffectsDisplayFixV3)return;
  window.__studyEmpireRoleEffectsDisplayFixV3=true;

  function premiumTier(role){
    const x=String(role?.tier||role?.difficulty||role?.name||'').toLowerCase();
    if(x.includes('vô cực')||x.includes('vo cuc'))return 'vo-cuc';
    if(x.includes('thần thoại')||x.includes('than thoai'))return 'than-thoai';
    const id=String(role?.achievementId||role?.id||role?.systemKey||'');
    const m=id.match(/hard(\d+)/i);
    if(m){const n=Number(m[1]);if(n>=711&&n<=810)return 'vo-cuc';if(n>=811&&n<=900)return 'than-thoai';}
    return null;
  }

  function displayRole(role){
    const t=premiumTier(role);
    if(t&&typeof window.studyEmpireAchievementRoleDisplayV18==='function'){
      try{return window.studyEmpireAchievementRoleDisplayV18(role,null)||role;}catch(e){}
    }
    return role;
  }

  function addPremiumClasses(html, role){
    const t=premiumTier(role);
    if(!t||!html||html.includes('role-premium-sync-v17'))return html;
    return html.replace('class="role-capsule ',`class="role-premium-sync-v17 role-premium-${t} role-capsule `);
  }

  const oldCapsule=window.renderRoleCapsule;
  if(typeof oldCapsule==='function'&&!oldCapsule.__studyEmpireDisplayWrapped){
    const wrapped=function(role,opts){
      const shown=displayRole(role);
      const html=oldCapsule.call(this,shown,opts);
      return addPremiumClasses(html,shown);
    };
    wrapped.__studyEmpireDisplayWrapped=true;
    window.renderRoleCapsule=wrapped;
    try{renderRoleCapsule=wrapped;}catch(e){}
  }

  function achievementById(id){
    try{
      const defs=typeof getAchievementDefinitions==='function'?getAchievementDefinitions():[];
      return defs.flatMap(g=>g.items||[]).find(a=>String(a.id)===String(id))||null;
    }catch(e){return null;}
  }

  function roleForAchievement(ach){
    try{
      if(!ach)return null;
      return ach.roleReward || (typeof achievementRoleFor==='function'?achievementRoleFor(ach):null);
    }catch(e){return null;}
  }

  function enhanceAchievementCards(){
    const container=document.getElementById('rebuiltAchievementGroups')||document.getElementById('achievementList');
    if(!container)return;
    container.querySelectorAll('.achievement').forEach(card=>{
      if(card.querySelector('.achievement-inline-role-capsule'))return;
      const onclick=card.getAttribute('onclick')||'';
      const match=onclick.match(/openAchievementDetail\(['"]([^'"]+)['"]\)/);
      const ach=match?achievementById(match[1]):null;
      const role=roleForAchievement(ach);
      if(!role||typeof window.renderRoleCapsule!=='function')return;
      const shown=displayRole(role);
      const html=addPremiumClasses(window.renderRoleCapsule(shown,{publicMode:true}),shown);
      if(!html)return;
      const holder=document.createElement('div');
      holder.className='achievement-inline-role-capsule';
      holder.innerHTML=html;
      const inline=card.querySelector('.achievement-role-inline');
      const line=inline?.querySelector('.kpi');
      if(line)line.insertAdjacentElement('afterend',holder);
      else card.appendChild(holder);
    });
  }

  const oldAchievements=window.renderAchievementsView;
  if(typeof oldAchievements==='function'&&!oldAchievements.__studyEmpireDisplayWrapped){
    const wrappedAchievements=function(){
      const result=oldAchievements.apply(this,arguments);
      enhanceAchievementCards();
      setTimeout(enhanceAchievementCards,0);
      return result;
    };
    wrappedAchievements.__studyEmpireDisplayWrapped=true;
    window.renderAchievementsView=wrappedAchievements;
    try{renderAchievementsView=wrappedAchievements;}catch(e){}
  }

  const st=document.createElement('style');
  st.id='role-effects-display-fix-v3-style';
  st.textContent=`
    .achievement-inline-role-capsule{display:flex;align-items:center;flex-wrap:wrap;gap:6px;margin-top:6px;min-height:42px}
    .achievement-inline-role-capsule .role-capsule{font-size:12px;min-height:34px;padding:6px 13px}
    .achievement-inline-role-capsule .role-fx-layer{inset:-18px}
    @media(prefers-reduced-motion:reduce){.achievement-inline-role-capsule .role-capsule,.achievement-inline-role-capsule .role-capsule *{animation:none!important}}
  `;
  document.head.appendChild(st);
  window.studyEmpireRefreshRoleEffectsDisplay=enhanceAchievementCards;
  /* P1: chỉ enhance khi renderAchievementsView được gọi lúc mở tab Thành tích. */
})();


/* ---- extracted script block 22: <script id="study-empire-role-effects-concrete-v4"> ---- */
(function(){
  'use strict';
  if(window.__studyEmpireRoleEffectsConcreteV4)return;
  window.__studyEmpireRoleEffectsConcreteV4=true;

  function esc4(v){
    return String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  function tier4(role){
    const raw=String(role?.tier||role?.difficulty||role?.name||'').toLowerCase();
    if(raw.includes('vô cực')||raw.includes('vo cuc'))return 'vo-cuc';
    if(raw.includes('thần thoại')||raw.includes('than thoai'))return 'than-thoai';
    const id=String(role?.achievementId||role?.id||role?.systemKey||'');
    const m=id.match(/hard(\d+)/i);
    if(m){const n=Number(m[1]);if(n>=711&&n<=810)return 'vo-cuc';if(n>=811&&n<=900)return 'than-thoai';}
    return '';
  }
  function safeRoleName(role){return String(role?.name||role?.title||'Role');}
  function roleGradient4(role,t){
    if(t==='vo-cuc')return 'linear-gradient(130deg,#0ea5e9 0%,#4f46e5 34%,#ec4899 70%,#0ea5e9 100%)';
    if(t==='than-thoai')return 'linear-gradient(130deg,#f59e0b 0%,#f97316 30%,#7c3aed 70%,#f59e0b 100%)';
    return role?.gradientCss||role?.background||`linear-gradient(135deg,${role?.color1||'#2563eb'},${role?.color2||'#a78bfa'})`;
  }
  function roleIcons4(role,t){
    const supplied=role?.effects?.cornerIcons||role?.cornerIcons||role?.decorations;
    if(Array.isArray(supplied)&&supplied.length)return supplied.slice(0,4).map(String);
    return t==='than-thoai'?['✦','✧','✨','⭐']:t==='vo-cuc'?['✦','✧','🌌','⭐']:['✦','✧','✨','⭐'];
  }
  function roleHtml4(role, extraClass){
    if(!role)return '';
    const t=tier4(role), icons=roleIcons4(role,t), name=esc4(safeRoleName(role));
    const gradient=esc4(roleGradient4(role,t));
    const icon=esc4(role.icon||role.badgeIcon||'🎭');
    const roleId=role.id?esc4(role.id):'';
    const clickable=roleId && typeof window.showRoleOrigin==='function' ? ` role="button" tabindex="0" data-role-id="${roleId}" onclick="window.showRoleOrigin(this.dataset.roleId)"` : '';
    return `<span class="se-shared-role-capsule ${t?'se-shared-role-'+t:''} ${extraClass||''}" style="--se-role-gradient:${gradient}"${clickable} aria-label="${name}"><span class="se-shared-role-backdrop" aria-hidden="true"></span><span class="se-shared-role-orbit se-shared-role-orbit-a" aria-hidden="true">${esc4(icons[0]||'✦')}</span><span class="se-shared-role-orbit se-shared-role-orbit-b" aria-hidden="true">${esc4(icons[1]||'✧')}</span><span class="se-shared-role-orbit se-shared-role-orbit-c" aria-hidden="true">${esc4(icons[2]||'✨')}</span><span class="se-shared-role-content"><span class="se-shared-role-icon">${icon}</span><span class="se-shared-role-name">${name}</span><span class="se-shared-role-tier">${t==='vo-cuc'?'VÔ CỰC':t==='than-thoai'?'THẦN THOẠI':'ROLE'}</span></span></span>`;
  }
  function achievementDefs4(){
    try{
      const groups=typeof getAchievementDefinitions==='function'?getAchievementDefinitions():[];
      return groups.flatMap(g=>g.items||[]);
    }catch(e){return [];}
  }
  function achievementById4(id){
    const a=achievementDefs4().find(x=>String(x.id)===String(id));
    return a||null;
  }
  function roleForAchievement4(a){
    if(!a)return null;
    if(a.roleReward)return a.roleReward;
    const id=String(a.id||'');
    const m=id.match(/hard(\d+)/i);
    if(!m)return null;
    const n=Number(m[1]);
    if(n<711)return null;
    const t=n<=810?'Vô Cực':'Thần Thoại';
    return {id:`achievement-role-${id}`,achievementId:id,tier:t,name:a.name||`Role ${id}`,icon:t==='Vô Cực'?'🌌':'🏛️',systemKey:`achievement-role-${id}`,color1:t==='Vô Cực'?'#0ea5e9':'#f59e0b',color2:t==='Vô Cực'?'#ec4899':'#7c3aed'};
  }
  function enhanceAchievement4(){
    const root=document.getElementById('rebuiltAchievementGroups')||document.getElementById('achievementList');
    if(!root)return;
    root.querySelectorAll('.achievement-group[data-tier="vo-cuc"],.achievement-group[data-tier="than-thoai"]').forEach(g=>g.classList.add('se-battleground-active'));
    root.querySelectorAll('.achievement').forEach(card=>{
      if(card.querySelector('.se-shared-role-capsule') || card.querySelector('.achievement-inline-role-capsule .role-capsule'))return;
      const raw=card.getAttribute('onclick')||'';
      const m=raw.match(/openAchievementDetail\(['"]([^'"]+)['"]\)/);
      const a=m?achievementById4(m[1]):null;
      const r=roleForAchievement4(a);
      if(!r)return;
      const inline=card.querySelector('.achievement-role-inline');
      const host=document.createElement('div');
      host.className='se-shared-role-host';
      host.innerHTML=roleHtml4(r,'se-shared-role-achievement');
      if(inline)inline.appendChild(host); else card.appendChild(host);
    });
  }
  function memberById4(id){
    try{return (state.membersList||[]).find(m=>String(m.id)===String(id))||null;}catch(e){return null;}
  }
  function rolesForMember4(id){
    try{
      if(typeof getCustomRolesForMember==='function')return getCustomRolesForMember(id)||[];
      const m=memberById4(id); const ids=m?.customRoleIds||[];
      return (state.customRoles||[]).filter(r=>ids.includes(r.id));
    }catch(e){return [];}
  }
  function enhanceAdmin4(){
    const root=document.getElementById('adminMemberListContainer');
    if(!root)return;
    root.querySelectorAll('.card').forEach(card=>{
      if(card.querySelector('.se-shared-role-admin-host'))return;
      const button=card.querySelector('[onclick*="adminViewMember("]');
      const raw=button?.getAttribute('onclick')||'';
      const m=raw.match(/adminViewMember\(['"]([^'"]+)['"]\)/);
      if(!m)return;
      const roles=rolesForMember4(m[1]);
      if(!roles.length)return;
      const host=document.createElement('div');
      host.className='se-shared-role-admin-host';
      host.innerHTML=roles.map(r=>roleHtml4(r,'se-shared-role-admin')).join('');
      const kpi=card.querySelector('.kpi');
      if(kpi)kpi.parentElement.insertBefore(host,kpi); else card.querySelector(':scope > div')?.appendChild(host);
    });
  }
  function refresh4(){
    try{enhanceAchievement4();enhanceAdmin4();}catch(e){console.warn('Role effects concrete V4',e);}
  }
  function wrap4(name){
    const fn=window[name];
    if(typeof fn!=='function'||fn.__studyEmpireRoleEffectsConcreteV4)return;
    const wrapped=function(){const out=fn.apply(this,arguments);setTimeout(refresh4,0);return out;};
    wrapped.__studyEmpireRoleEffectsConcreteV4=true;
    window[name]=wrapped;
    try{globalThis[name]=wrapped;}catch(e){}
  }
  ['renderAchievementsView','renderAdminView'].forEach(wrap4);
  const st=document.createElement('style');
  st.id='study-empire-role-effects-concrete-v4-style';
  st.textContent=`
    .se-shared-role-host,.se-shared-role-admin-host{display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin-top:8px}
    .se-shared-role-capsule{position:relative;display:inline-flex;align-items:center;min-height:42px;min-width:170px;padding:7px 16px 7px 11px;border-radius:16px;overflow:hidden;color:#fff;background:var(--se-role-gradient);background-size:300% 300%;border:1px solid rgba(255,255,255,.72);box-shadow:0 8px 22px rgba(31,41,55,.22),inset 0 0 0 1px rgba(255,255,255,.18);isolation:isolate;vertical-align:middle;animation:seSharedRoleBackdropV4 5s ease-in-out infinite;cursor:pointer}
    .se-shared-role-capsule:not([role="button"]){cursor:default}
    .se-shared-role-backdrop{position:absolute;inset:-40%;z-index:-1;opacity:.42;background:radial-gradient(circle at 20% 20%,rgba(255,255,255,.82),transparent 27%),radial-gradient(circle at 80% 70%,rgba(255,255,255,.5),transparent 24%);animation:seSharedRoleLightV4 3.2s ease-in-out infinite;pointer-events:none}
    .se-shared-role-content{position:relative;z-index:2;display:inline-flex;align-items:center;gap:7px;text-shadow:0 1px 3px rgba(0,0,0,.38)}
    .se-shared-role-icon{font-size:21px;filter:drop-shadow(0 2px 3px rgba(0,0,0,.3));animation:seSharedRoleIconV4 2.8s ease-in-out infinite}
    .se-shared-role-name{font-weight:900;letter-spacing:.1px}.se-shared-role-tier{font-size:9px;font-weight:900;letter-spacing:1px;opacity:.86;border:1px solid rgba(255,255,255,.42);border-radius:999px;padding:3px 6px;background:rgba(15,23,42,.18)}
    .se-shared-role-orbit{position:absolute;z-index:3;font-size:12px;filter:drop-shadow(0 1px 2px rgba(0,0,0,.28));pointer-events:none}.se-shared-role-orbit-a{top:2px;left:8px;animation:seSharedOrbitA4 3.6s ease-in-out infinite}.se-shared-role-orbit-b{right:9px;top:3px;animation:seSharedOrbitB4 4.2s ease-in-out infinite}.se-shared-role-orbit-c{right:22px;bottom:1px;animation:seSharedOrbitC4 3s ease-in-out infinite}
    .se-shared-role-vo-cuc{box-shadow:0 0 0 1px rgba(56,189,248,.42),0 8px 26px rgba(99,102,241,.34),0 0 30px rgba(236,72,153,.18)}
    .se-shared-role-than-thoai{box-shadow:0 0 0 1px rgba(251,191,36,.5),0 8px 26px rgba(124,58,237,.3),0 0 30px rgba(245,158,11,.24)}
    .se-battleground-active{position:relative;overflow:hidden;background-image:linear-gradient(135deg,rgba(2,6,23,.84),rgba(49,46,129,.78) 55%,rgba(14,116,144,.72))!important;background-size:220% 220%!important;animation:seSharedBattlegroundV4 7s ease-in-out infinite!important}
    .achievement-group[data-tier="than-thoai"].se-battleground-active{background-image:linear-gradient(135deg,rgba(9,9,11,.86),rgba(88,28,135,.8) 54%,rgba(161,98,7,.76))!important}
    @keyframes seSharedRoleBackdropV4{0%,100%{background-position:0% 50%;filter:saturate(1) brightness(1)}50%{background-position:100% 50%;filter:saturate(1.28) brightness(1.1)}}
    @keyframes seSharedRoleLightV4{0%,100%{transform:rotate(-10deg) scale(.9);opacity:.28}50%{transform:rotate(12deg) scale(1.12);opacity:.72}}
    @keyframes seSharedRoleIconV4{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-5px) rotate(5deg)}}
    @keyframes seSharedOrbitA4{0%,100%{transform:translate(0,0) rotate(0)}50%{transform:translate(4px,3px) rotate(18deg)}}
    @keyframes seSharedOrbitB4{0%,100%{transform:translate(0,0) rotate(0)}50%{transform:translate(-4px,4px) rotate(-20deg)}}
    @keyframes seSharedOrbitC4{0%,100%{transform:translate(0,0) scale(.92)}50%{transform:translate(-3px,-4px) scale(1.12)}}
    @keyframes seSharedBattlegroundV4{0%,100%{background-position:0% 50%;filter:brightness(1)}50%{background-position:100% 50%;filter:brightness(1.12)}}
    @media(prefers-reduced-motion:reduce){.se-shared-role-capsule,.se-shared-role-capsule *,.se-battleground-active{animation:none!important}}
  `;
  document.head.appendChild(st);
  window.studyEmpireRefreshRoleEffectsConcreteV4=refresh4;
  /* P1: refresh4 chỉ chạy sau khi Thành tích hoặc Quản trị được render. */
})();


/* ---- extracted script block 23: <script id="study-empire-role-effects-direct-v20"> ---- */
(function(){
  'use strict';
  if(window.__studyEmpireRoleEffectsDirectV20)return;
  window.__studyEmpireRoleEffectsDirectV20=true;

  function esc20(value){
    return String(value==null?'':value).replace(/[&<>"']/g,function(c){return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]});
  }
  function tier20(role, hint){
    const raw=String(hint||role?.tier||role?.difficulty||role?.name||'').toLowerCase();
    if(raw.includes('vô cực')||raw.includes('vo cuc'))return 'vo-cuc';
    if(raw.includes('thần thoại')||raw.includes('than thoai'))return 'than-thoai';
    const id=String(role?.achievementId||role?.id||role?.systemKey||'');
    const m=id.match(/hard(\d+)/i);
    if(m){const n=Number(m[1]);if(n>=711&&n<=810)return 'vo-cuc';if(n>=811&&n<=900)return 'than-thoai';}
    return '';
  }
  function displayRole20(role, hint){
    const t=tier20(role,hint);
    if(t && typeof window.studyEmpireAchievementRoleDisplayV18==='function'){
      try{return window.studyEmpireAchievementRoleDisplayV18(role,null)||role}catch(e){}
    }
    if(t && typeof window.studyEmpirePreviewRoleV17==='function'){
      try{
        const preview=window.studyEmpirePreviewRoleV17(t);
        return Object.assign({},preview||{},role||{}, {tier:(role&&role.tier)||preview?.tier, name:(role&&role.name)||preview?.name, icon:preview?.icon||role?.icon, effects:Object.assign({},preview?.effects||{},role?.effects||{})});
      }catch(e){}
    }
    return Object.assign({},role||{});
  }
  function roleCss20(role){
    const e=role.effects||{};
    const gradient=role.gradientCss||role.background||`linear-gradient(135deg,${role.color1||'#d8f3dc'},${role.color2||'#bde0fe'})`;
    const speed=Math.max(.8,Math.min(30,Number(e.speed)||6));
    const strength=Math.max(0,Math.min(3,Number(e.strength)||1));
    const size=Math.max(.5,Math.min(2,Number(e.size)||1));
    return `--role-bg:${esc20(gradient)};--role-speed:${speed}s;--role-strength:${strength};--role-size:${size};background-image:var(--role-bg);`;
  }
  function roleIcons20(role){
    const e=role.effects||{};
    if(Array.isArray(e.cornerIcons)&&e.cornerIcons.length)return e.cornerIcons.slice(0,4);
    if(Array.isArray(role.cornerIcons)&&role.cornerIcons.length)return role.cornerIcons.slice(0,4);
    return [role.icon||'✦','✦','✧','•'];
  }
  function roleOriginClick20(role){
    const id=role&&role.id!=null?esc20(role.id):'';
    return id ? ` role="button" tabindex="0" data-role-id="${id}" onclick="window.openRoleOriginV16&&window.openRoleOriginV16(this.dataset.roleId)"` : '';
  }
  function buildRoleCapsuleHTML(role,tierHint){
    if(!role)return '';
    const shown=displayRole20(role,tierHint),tier=tier20(shown,tierHint),e=shown.effects||{},anim=String(e.animation||'none').toLowerCase(),light=String(e.lightPreset||'none').replace(/[^a-z0-9-]/gi,'-'),style=String(e.style||'Minimal').replace(/[^a-z0-9]/gi,'-'),premium=tier?' role-capsule-premium role-premium-'+tier:'';
    const icons=roleIcons20(shown),positions=[['top:0%;left:0%'],['top:0%;left:100%'],['top:100%;left:0%'],['top:100%;left:100%']];
    const corners=icons.map((icon,i)=>`<span class="role-corner role-corner-placed role-corner-anim-${esc20(anim)}" style="${positions[i]};--corner-delay:${i*.22}s">${esc20(icon)}</span>`).join('');
    const source=shown.sourceType==='achievement'?`🏆 Thành tích ${shown.achievementId||''}`:shown.sourceType==='weekly_reward'?`🎁 Phần thưởng tuần ${shown.weeklyRewardId||''}`:'🎨 Role';
    return `<span class="role-capsule role-corners-v16 role-anim-${esc20(anim)} role-light-${esc20(light)} role-style-${esc20(style)}${premium} role-effects-direct-v20" style="${roleCss20(shown)}" title="${esc20(source)}"${roleOriginClick20(role)}><span class="role-fx-layer role-corner-layer">${corners}</span><span class="role-capsule-content">${esc20(shown.icon||'🏷️')} ${esc20(shown.name||'Role')}</span></span>`;
  }
  window.buildRoleCapsuleHTML=buildRoleCapsuleHTML;

  function rolesForMember20(memberId){
    try{
      const getter=typeof window.getCustomRolesForMember==='function'?window.getCustomRolesForMember:null;
      const roles=getter?getter(memberId):[];
      return (roles||[]).filter(r=>r&&r.visibility!=='hidden');
    }catch(e){return []}
  }
  window.renderRoleBadges=function(memberId){
    const roles=rolesForMember20(memberId);
    if(!roles.length)return '';
    const primary=state.rolePrimaryRoles?.[String(memberId)]||'';
    roles.sort((a,b)=>(String(a.id)===String(primary)?-1:0)-(String(b.id)===String(primary)?-1:0));
    const scale=Math.max(.55,Math.min(1.15,Number(localStorage.getItem('study_empire_role_scale_'+String(memberId))||.72)));
    return `<span class="member-role-stack leaderboard-role-origin-group" data-member-role-id="${esc20(memberId)}" style="--member-role-scale:${scale}">${roles.map(r=>`<button type="button" class="leaderboard-role-origin-btn" data-role-id="${esc20(r.id||'')}" aria-label="Mở nguồn gốc Role ${esc20(r.name||'Role')}" title="Bấm hoặc nhấn Enter để xem nguồn gốc" onclick="window.openRoleOriginV16&&window.openRoleOriginV16(this.dataset.roleId)">${buildRoleCapsuleHTML(r)}</button>`).join('')}</span>`;
  };
  try{globalThis.renderRoleBadges=window.renderRoleBadges}catch(e){}

  function achievementById20(id){
    try{return typeof getAchievementDefinitions==='function'?getAchievementDefinitions().flatMap(g=>g.items||[]).find(a=>String(a.id)===String(id))||null:null}catch(e){return null}
  }
  function normalizeAchievementRole20(){
    const root=document.getElementById('rebuiltAchievementGroups')||document.getElementById('achievementList');
    if(!root)return;
    root.querySelectorAll('.achievement').forEach(card=>{
      const inline=card.querySelector('.achievement-role-inline');
      if(!inline || inline.querySelector('.achievement-inline-role-capsule .role-capsule'))return;
      const raw=card.getAttribute('onclick')||'',m=raw.match(/openAchievementDetail\(['"]([^'"]+)['"]\)/),ach=m?achievementById20(m[1]):null;
      if(!ach)return;
      const role=ach.roleReward || (typeof achievementRoleFor==='function'?achievementRoleFor(ach):null);
      const html=buildRoleCapsuleHTML(role);
      if(!html)return;
      inline.querySelectorAll('.se-shared-role-host,.se-shared-role-admin-host,.achievement-inline-role-capsule').forEach(x=>{if(!x.querySelector('.role-capsule'))x.remove()});
      const host=document.createElement('div');host.className='achievement-inline-role-capsule';host.innerHTML=html;
      const kpi=inline.querySelector('.kpi');
      if(kpi)inline.insertBefore(host,kpi); else inline.appendChild(host);
    });
  }
  window.studyEmpireRefreshRoleEffectsDirectV20=normalizeAchievementRole20;
  const oldAch=window.renderAchievementsView;
  if(typeof oldAch==='function'&&!oldAch.__studyEmpireRoleEffectsDirectV20){
    const wrapped=function(){const out=oldAch.apply(this,arguments);normalizeAchievementRole20();setTimeout(normalizeAchievementRole20,0);return out};
    wrapped.__studyEmpireRoleEffectsDirectV20=true;
    window.renderAchievementsView=wrapped;
    try{globalThis.renderAchievementsView=wrapped}catch(e){}
  }
  /* P1: normalizeAchievementRole20 chỉ chạy sau khi mở Thành tích. */
})();


/* ---- extracted script block 24: <script id="study-empire-summary-chart-v23"> ---- */
(function(){
  'use strict';
  if(window.__studyEmpireSummaryChartV23)return;
  window.__studyEmpireSummaryChartV23=true;
  const esc23 = typeof window.esc==='function' ? window.esc : (v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])));
  const iso23=d=>{const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),day=String(d.getDate()).padStart(2,'0');return `${y}-${m}-${day}`;};
  const mins23=(owner,date)=>Math.max(0,Number(typeof getOfficialStudyMinutesForDate==='function'?getOfficialStudyMinutesForDate(owner,date):0)||0);
  const fmt23=n=>typeof fmtMin==='function'?fmtMin(n):`${Math.floor(n/60)} giờ ${n%60} phút`;
  const monthName23=['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'];
  function currentMonth23(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;}
  function monthBuckets23(monthKey){
    const m=/^(\d{4})-(\d{2})$/.exec(String(monthKey||''))||/^([0-9]{4})-([0-9]{1,2})$/.exec(String(monthKey||''));
    const y=Number(m?.[1])||new Date().getFullYear(), mo=Math.max(1,Math.min(12,Number(m?.[2])||new Date().getMonth()+1));
    const first=new Date(y,mo-1,1,12), last=new Date(y,mo,0,12);
    const mondayOffset=(first.getDay()+6)%7;
    const start=new Date(y,mo-1,1-mondayOffset,12), out=[];
    for(let cursor=new Date(start);cursor<=last;cursor.setDate(cursor.getDate()+7)){
      const from=new Date(cursor), to=new Date(cursor);to.setDate(to.getDate()+6);
      const clippedFrom=new Date(Math.max(from.getTime(),first.getTime())), clippedTo=new Date(Math.min(to.getTime(),last.getTime()));
      let total=0;for(const d=new Date(clippedFrom);d<=clippedTo;d.setDate(d.getDate()+1))total+=mins23(accountOwnerId(),iso23(d));
      out.push({from:iso23(clippedFrom),to:iso23(clippedTo),total});
    }
    return {year:y,month:mo,buckets:out};
  }
  function labels23(from,to){const a=String(from).slice(8),b=String(to).slice(8);return a===b?a:`${a}–${b}`;}
  function ensureMonthPanel23(){
    const week=document.getElementById('weekChart');
    if(!week||document.getElementById('monthChartV23'))return;
    const sourceGrid=week.closest('.grid');
    if(!sourceGrid||!sourceGrid.parentElement)return;
    const row=document.createElement('div');row.className='grid g2 study-v23-month-row';row.style.marginTop='18px';
    row.innerHTML=`<div class="card"><div class="study-v23-toolbar"><div><h3 style="margin:0">📆 Thời gian học theo tháng</h3><div class="study-v23-meta">Chỉ tính thời gian học chính thức đã ghi nhận.</div></div><label>Chọn tháng<input id="studyMonthV23" type="month" value="${currentMonth23()}"></label></div><div id="monthChartV23" class="bar study-v23-bar"></div><div id="monthSummaryV23" class="study-v23-summary"></div></div><div class="card"><h3 style="margin-top:0">📌 Cách đọc thống kê</h3><div class="study-v23-meta" style="font-size:13px;line-height:1.7"><p style="margin-top:0">Biểu đồ tuần hiển thị 7 ngày gần nhất. Biểu đồ tháng chia theo các tuần từ thứ Hai đến Chủ nhật, có cắt theo đúng ngày đầu và cuối tháng.</p><p style="margin-bottom:0">Pomodoro không được cộng vào biểu đồ này; chỉ dữ liệu học chính thức của tài khoản đang đăng nhập được tính.</p></div></div>`;
    sourceGrid.parentElement.insertBefore(row,sourceGrid.nextSibling);
    const input=document.getElementById('studyMonthV23');if(input&&!input.dataset.bound){input.dataset.bound='1';input.addEventListener('change',renderV23);}
  }
  function renderWeekV23(){
    const el=document.getElementById('weekChart');if(!el)return;
    el.classList.add('study-v23-bar');
    const owner=typeof accountOwnerId==='function'?accountOwnerId():null,days=[];
    for(let i=6;i>=0;i--){const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()-i);days.push(d);}
    const values=days.map(d=>mins23(owner,iso23(d))),max=Math.max(...values,60),names=['CN','T2','T3','T4','T5','T6','T7'];
    el.innerHTML=days.map((d,i)=>{const v=values[i],pct=Math.min(100,Math.round(v/max*100));return `<div class="barcol" title="${iso23(d)} · ${fmt23(v)}"><span class="barvalue">${v?esc23(fmt23(v)):''}</span><div class="barfill" style="height:${Math.max(4,pct)}%"></div><span class="barlabel">${names[d.getDay()]}<br><small>${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')}</small></span></div>`;}).join('');
  }
  function renderMonthV23(){
    const el=document.getElementById('monthChartV23');if(!el)return;
    const key=document.getElementById('studyMonthV23')?.value||currentMonth23(),info=monthBuckets23(key),vals=info.buckets.map(x=>x.total),max=Math.max(...vals,60),total=vals.reduce((a,b)=>a+b,0),peak=info.buckets.reduce((a,b)=>b.total>a.total?b:a,{total:0});
    el.innerHTML=info.buckets.length?info.buckets.map((b,i)=>{const pct=Math.min(100,Math.round(b.total/max*100));return `<div class="barcol" title="${b.from} → ${b.to} · ${fmt23(b.total)}"><span class="barvalue">${b.total?esc23(fmt23(b.total)):''}</span><div class="barfill" style="height:${Math.max(4,pct)}%"></div><span class="barlabel">T${i+1}<br><small>${labels23(b.from,b.to)}</small></span></div>`;}).join(''):'<div class="study-v23-empty">Chưa có dữ liệu học chính thức trong tháng này.</div>';
    const summary=document.getElementById('monthSummaryV23');if(summary)summary.innerHTML=`<div><b>${esc23(fmt23(total))}</b>Tổng tháng</div><div><b>${info.buckets.length}</b>tuần có thể theo dõi</div><div><b>${peak.total?esc23(fmt23(peak.total)):'0 phút'}</b>Tuần cao nhất</div>`;
    const meta=document.querySelector('#monthChartV23')?.parentElement?.querySelector('.study-v23-meta');if(meta)meta.textContent=`${monthName23[info.month-1]} ${info.year} · ${fmt23(total)} học chính thức`;
  }
  function renderV23(){ensureMonthPanel23();renderWeekV23();renderMonthV23();}
  const originalSummary=window.renderSummary;
  if(typeof originalSummary==='function')window.renderSummary=function(){const r=originalSummary.apply(this,arguments);renderV23();return r;};
  const boot=()=>{try{renderV23();}catch(e){console.warn('Summary chart V23',e);}};
  /* P1: biểu đồ chỉ được tạo qua wrapper renderSummary khi mở tab Tổng kết. */
})();



/* ---- CRUD + temporal history UI V24 ---- */
(function(){
  'use strict';
  if(window.__studyEmpireCrudTemporalV24)return;
  window.__studyEmpireCrudTemporalV24=true;
  const esc24=typeof window.esc==='function'?window.esc:(v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])));
  const attr24=v=>esc24(String(v??''));
  const date24=v=>{const m=String(v||'').match(/^(\d{4})-(\d{2})-(\d{2})$/);return m?{iso:m[0],year:m[1],month:Number(m[2]),day:Number(m[3])}:{iso:String(v||''),year:'Không rõ',month:0,day:String(v||'')};};
  const dateLabel24=v=>{const d=date24(v);return d.year==='Không rõ'?d.iso||'Chưa có ngày':`${d.day} tháng ${d.month}, ${d.year}`;};
  const field24=(label,value,full=true)=>`<div class="history-v21-field${full?' full':''}"><div class="history-v21-label">${label}</div><div class="history-v21-value">${esc24(value===null||value===undefined||String(value).trim()===''?'Chưa ghi nhận':value)}</div></div>`;
  const modal24=(title,body)=>{if(typeof showModal==='function')showModal(title,body);};
  const groupTemporal24=(rows,itemRenderer,empty='Chưa có dữ liệu.')=>{
    if(!rows.length)return `<div class="history-v21-empty">${empty}</div>`;
    const years={};
    rows.forEach(row=>{const d=date24(row.date);const y=d.year,m=d.month?String(d.month).padStart(2,'0'):'00',day=d.day;years[y]??={};years[y][m]??={};years[y][m][day]??=[];years[y][m][day].push(row);});
    const yearKeys=Object.keys(years).sort((a,b)=>b.localeCompare(a));
    return yearKeys.map((year,yi)=>{
      const months=years[year],monthKeys=Object.keys(months).sort((a,b)=>Number(b)-Number(a));
      return `<details class="history-time-year" ${yi===0?'open':''}><summary>🗓️ Năm ${esc24(year)} <span class="tag">${monthKeys.reduce((n,month)=>n+Object.values(months[month]).reduce((a,rows)=>a+rows.length,0),0)} mục</span></summary><div class="history-time-year-body">${monthKeys.map((month,mi)=>{const days=months[month],dayKeys=Object.keys(days).sort((a,b)=>String(b).localeCompare(String(a)));const monthLabel=month==='00'?'Chưa xác định':`Tháng ${Number(month)}`;return `<details class="history-time-month" ${yi===0&&mi===0?'open':''}><summary>📅 ${monthLabel} <span class="tag">${Object.values(days).reduce((n,v)=>n+v.length,0)} mục</span></summary><div class="history-time-month-body">${dayKeys.map((day,di)=>`<details class="history-time-day" ${yi===0&&mi===0&&di===0?'open':''}><summary>📌 ${month==='00'?'Ngày chưa xác định':`Ngày ${Number(day)}`} <span class="tag">${days[day].length}</span></summary><div class="history-v21-list history-time-day-body">${days[day].map(itemRenderer).join('')}</div></details>`).join('')}</div></details>`;}).join('')}</div></details>`;
    }).join('');
  };
  const shell24=(kind,icon,row,preview,fields,actions)=>`<article class="history-v21-item" data-history-kind="${attr24(kind)}"><button type="button" class="history-v21-summary" aria-expanded="false" onclick="window.toggleHistoryV21(this)"><span class="history-v21-date"><span class="history-v21-date-icon">${icon}</span><span><span class="history-v21-date-main">${esc24(dateLabel24(row.date))}</span><span class="history-v21-date-sub">${esc24(row.date||'')}</span><span class="history-v21-preview">${esc24(preview||'')}</span></span></span><span class="history-v21-chevron">⌄</span></button><div class="history-v21-detail"><div class="history-v21-fields">${fields}</div><div class="history-v21-actions">${actions||''}</div></div></article>`;

  window.editSchedule=function(id){
    const x=(state.schedules||[]).find(a=>String(a.id)===String(id));if(!x)return;
    modal24('✏️ Sửa lịch trình',`<div class="form"><div><label>Ngày</label><input id="scheduleEditDate" type="date" value="${attr24(x.date||todayISO())}"></div><div><label>Giờ</label><input id="scheduleEditTime" type="time" value="${attr24(x.time||'')}"></div><div><label>Loại</label><input id="scheduleEditType" value="${attr24(x.type||'')}"></div><div class="full"><label>Tiêu đề lịch trình</label><input id="scheduleEditTitle" value="${attr24(x.title||'')}" required></div></div><button class="btn" style="margin-top:10px" onclick="window.editScheduleSubmit('${attr24(id)}')">Lưu</button>`);
  };
  window.editScheduleSubmit=function(id){const x=(state.schedules||[]).find(a=>String(a.id)===String(id));if(!x)return;const title=$('scheduleEditTitle')?.value.trim();if(!title)return alert('Tiêu đề lịch trình không được để trống.');x.date=$('scheduleEditDate')?.value||x.date||todayISO();x.time=$('scheduleEditTime')?.value||'';x.type=$('scheduleEditType')?.value.trim()||x.type||'Khác';x.title=title;save();closeModal();renderSchedule();};

  window.editMomentV24=function(id){const x=(state.moments||[]).find(a=>String(a.id)===String(id));if(!x)return;modal24('✏️ Sửa khoảnh khắc',`<div class="form"><div><label>Ngày</label><input id="momentEditDate" type="date" value="${attr24(x.date||todayISO())}"></div><div class="full"><label>Tiêu đề</label><input id="momentEditTitle" value="${attr24(x.title||'')}" required></div><div class="full"><label>Nội dung khoảnh khắc</label><textarea id="momentEditDesc">${esc24(x.desc||'')}</textarea></div></div><button class="btn" style="margin-top:10px" onclick="window.editMomentV24Submit('${attr24(id)}')">Lưu</button>`);};
  window.editMomentV24Submit=function(id){const x=(state.moments||[]).find(a=>String(a.id)===String(id));if(!x)return;const title=$('momentEditTitle')?.value.trim();if(!title)return alert('Tiêu đề khoảnh khắc không được để trống.');x.date=$('momentEditDate')?.value||x.date||todayISO();x.title=title;x.desc=$('momentEditDesc')?.value||'';save();closeModal();renderMoments();renderEndDay();};

  window.editJournalV24=function(id){const x=(state.journals||[]).find(a=>String(a.id)===String(id));if(!x)return;modal24('✏️ Sửa nhật ký',`<div class="form"><div><label>Ngày</label><input id="journalEditDate" type="date" value="${attr24(x.date||todayISO())}"></div><div><label>Môn/chủ đề</label><input id="journalEditSubject" value="${attr24(x.subject||'')}"></div><div><label>Thời gian học (phút)</label><input id="journalEditMinutes" type="number" min="0" value="${Number(x.minutes)||0}"></div><div><label>Điểm tự đánh giá</label><input id="journalEditScore" type="number" min="0" max="10" step="0.1" value="${Number(x.score)||0}"></div><div class="full"><label>Nội dung nhật ký</label><textarea id="journalEditContent">${esc24(x.content||'')}</textarea></div><div class="full"><label>Kiến thức mới</label><textarea id="journalEditNew">${esc24(x.newKnowledge||'')}</textarea></div></div><button class="btn" style="margin-top:10px" onclick="window.editJournalV24Submit('${attr24(id)}')">Lưu</button>`);};
  window.editJournalV24Submit=function(id){const x=(state.journals||[]).find(a=>String(a.id)===String(id));if(!x)return;const content=$('journalEditContent')?.value.trim();if(!content)return alert('Nội dung nhật ký không được để trống.');x.date=$('journalEditDate')?.value||x.date||todayISO();x.subject=$('journalEditSubject')?.value.trim()||'Chưa phân loại';x.minutes=Math.max(0,parseInt($('journalEditMinutes')?.value)||0);x.score=Math.min(10,Math.max(0,parseFloat($('journalEditScore')?.value)||0));x.content=content;x.newKnowledge=$('journalEditNew')?.value||'';save();closeModal();renderJournals();};

  window.editMoodV24=function(date){const x=(state.moods||[]).find(a=>String(a.date)===String(date));if(!x)return;modal24('✏️ Sửa cảm xúc',`<div class="form"><div><label>Ngày</label><input id="moodEditDate" type="date" value="${attr24(x.date||todayISO())}" disabled></div><div class="full"><label>Cảm xúc</label><select id="moodEditName">${getAllMoods().map(m=>`<option value="${attr24(m[1])}" ${m[1]===x.name?'selected':''}>${m[0]} ${esc24(m[1])}</option>`).join('')}</select></div><div class="full"><label>Ghi chú cảm xúc</label><textarea id="moodEditNote">${esc24(x.note||'')}</textarea></div></div><button class="btn" style="margin-top:10px" onclick="window.editMoodV24Submit('${attr24(date)}')">Lưu</button>`);};
  window.editMoodV24Submit=function(date){const x=(state.moods||[]).find(a=>String(a.date)===String(date));if(!x)return;const name=$('moodEditName')?.value||x.name,def=getAllMoods().find(m=>m[1]===name)||['😔','Buồn'];x.name=name;x.emoji=def[0];x.note=$('moodEditNote')?.value||'';save();closeModal();renderMoods();};

  const parseEnd24=m=>{if(m.endDay&&typeof m.endDay==='object')return {...m.endDay};const text=String(m.desc||''),out={mood:'',gratitude:'',lesson:'',tomorrow:''},rx=/Cảm xúc:\s*([\s\S]*?)\s*\|\s*Biết ơn:\s*([\s\S]*?)\s*\|\s*Bài học:\s*([\s\S]*?)\s*\|\s*Ngày mai:\s*([\s\S]*)$/i.exec(text);if(rx){out.mood=rx[1];out.gratitude=rx[2];out.lesson=rx[3];out.tomorrow=rx[4];}else out.gratitude=text;return out;};
  window.editEndDayV24=function(id){const x=(state.moments||[]).find(a=>String(a.id)===String(id));if(!x)return;const d=parseEnd24(x);modal24('✏️ Sửa kế hoạch kết ngày',`<div class="form"><div><label>Ngày</label><input id="endEditDate" type="date" value="${attr24(x.date||todayISO())}"></div><div class="full"><label>Cảm xúc</label><input id="endEditMood" value="${attr24(d.mood||'')}"></div><div class="full"><label>Điều biết ơn</label><textarea id="endEditGratitude">${esc24(d.gratitude||'')}</textarea></div><div class="full"><label>Bài học</label><textarea id="endEditLesson">${esc24(d.lesson||'')}</textarea></div><div class="full"><label>Ngày mai điều quan trọng nhất</label><textarea id="endEditTomorrow">${esc24(d.tomorrow||'')}</textarea></div></div><button class="btn" style="margin-top:10px" onclick="window.editEndDayV24Submit('${attr24(id)}')">Lưu</button>`);};
  window.editEndDayV24Submit=function(id){const x=(state.moments||[]).find(a=>String(a.id)===String(id));if(!x)return;const mood=$('endEditMood')?.value||'',gratitude=$('endEditGratitude')?.value||'',lesson=$('endEditLesson')?.value||'',tomorrow=$('endEditTomorrow')?.value||'';x.date=$('endEditDate')?.value||x.date||todayISO();x.endDay={mood,gratitude,lesson,tomorrow};x.desc=`Cảm xúc: ${mood} | Biết ơn: ${gratitude} | Bài học: ${lesson} | Ngày mai: ${tomorrow}`;x.title=`Kết ngày ${x.date} 🐝🍀`;save();closeModal();renderEndDay();};

  window.editJourneyV24=function(id){const x=journeyRows().find(a=>String(a.id)===String(id));if(!x)return;const study=x.journeyType==='study';modal24('✏️ Sửa ảnh hành trình',`<div class="form"><div><label>Ngày</label><input id="journeyEditDate" type="date" value="${attr24(x.date||todayISO())}"></div><div class="full"><label>Ảnh mới (không chọn sẽ giữ ảnh hiện tại)</label><input id="journeyEditImage" type="file" accept="image/*"></div>${study?`<div><label>Môn</label><input id="journeyEditSubject" value="${attr24(x.subject||'')}"></div><div class="full"><label>Tiêu đề nội dung</label><input id="journeyEditTitle" value="${attr24(x.title||'')}"></div><div class="full"><label>Lý do tạo ảnh</label><textarea id="journeyEditReason">${esc24(x.reason||'')}</textarea></div>`:`<div class="full"><label>Tiêu đề khoảnh khắc</label><input id="journeyEditTitle" value="${attr24(x.title||'')}"></div><div class="full"><label>Ghi chú khoảnh khắc</label><textarea id="journeyEditNote">${esc24(x.note||'')}</textarea></div>`}</div><button class="btn" style="margin-top:10px" onclick="window.editJourneyV24Submit('${attr24(id)}','${study?'study':'daily'}')">Lưu</button>`);};
  window.editJourneyV24Submit=async function(id,kind){const x=journeyRows().find(a=>String(a.id)===String(id));if(!x)return;const title=$('journeyEditTitle')?.value.trim();if(!title)return alert('Tiêu đề ảnh hành trình không được để trống.');if(kind==='study'&&!$('journeyEditSubject')?.value.trim())return alert('Môn học không được để trống.');if(kind==='study'&&!$('journeyEditReason')?.value.trim())return alert('Lý do tạo ảnh không được để trống.');if(kind==='daily'&&!$('journeyEditNote')?.value.trim())return alert('Ghi chú khoảnh khắc không được để trống.');const button=document.querySelector('#modal .btn:not(.light):not(.danger)');if(button)button.disabled=true;try{x.date=$('journeyEditDate')?.value||x.date||todayISO();x.title=title;if(kind==='study'){x.subject=$('journeyEditSubject').value.trim();x.reason=$('journeyEditReason').value.trim();x.desc=x.reason;}else{x.note=$('journeyEditNote').value.trim();x.desc=x.note;}const file=$('journeyEditImage')?.files?.[0];if(file){const image=await readJourneyImage(file);x.imageData=image.data;x.imageMime=image.mime;x.imageWidth=image.width;x.imageHeight=image.height;x.imageSize=image.size;x.imageName=file.name;}save();closeModal();renderJourney();}catch(e){alert(`⚠️ ${e.message||'Không thể sửa ảnh.'}`);}finally{if(button)button.disabled=false;}};

  window.editCustomAchievement=function(id){const role=state.sessionAuth?.role||'Guest';if(!['Admin','Founder'].includes(role))return alert('⚠️ Chỉ Admin/Founder mới có quyền sửa thành tích.');const x=(state.customAchievements||[]).find(a=>String(a.id)===String(id));if(!x)return;modal24('✏️ Sửa thành tích',`<div class="form"><div><label>Tên thành tích</label><input id="customAchEditName" value="${attr24(x.name||'')}"></div><div><label>Biểu tượng</label><input id="customAchEditIcon" value="${attr24(x.icon||'🎯')}"></div><div><label>Nhóm</label><select id="customAchEditTier"><option value="kho">Kho thành tích</option><option value="huyen-thoai">Huyền thoại</option><option value="dac-biet">Đặc biệt</option></select></div><div><label>XP</label><input id="customAchEditXP" type="number" min="0" value="${Number(x.xp)||0}"></div><div class="full"><label>Mô tả</label><textarea id="customAchEditDesc">${esc24(x.desc||'')}</textarea></div></div><button class="btn" style="margin-top:10px" onclick="window.editCustomAchievementSubmit('${attr24(id)}')">Lưu</button>`);setTimeout(()=>{const s=$('customAchEditTier');if(s)s.value=x.tier||'kho';},0);};
  window.editCustomAchievementSubmit=function(id){const x=(state.customAchievements||[]).find(a=>String(a.id)===String(id));if(!x)return;const name=$('customAchEditName')?.value.trim();if(!name)return alert('Tên thành tích không được để trống.');x.name=name;x.icon=$('customAchEditIcon')?.value.trim()||'🎯';x.tier=$('customAchEditTier')?.value||x.tier||'kho';x.xp=Math.max(0,parseInt($('customAchEditXP')?.value)||0);x.desc=$('customAchEditDesc')?.value.trim()||'Thành tích tùy chỉnh.';save();closeModal();renderAchievementsView();};

  function renderScheduleGrouped24(){const c=$('scheduleList');if(!c)return;const items=[...c.querySelectorAll(':scope > .schedule-item')];if(!items.length)return;const by={};items.forEach(item=>{const d=date24(item.dataset.scheduleDate);const key=d.iso||'Không rõ';(by[key]||(by[key]=[])).push(item);});const keys=Object.keys(by).sort((a,b)=>b.localeCompare(a));c.innerHTML=keys.map((key,i)=>{const d=date24(key),itemsHtml=`<div class="schedule-group-items"></div>`;return `<details class="schedule-time-group" ${i===0?'open':''}><summary>📅 ${esc24(dateLabel24(key))} <span class="tag">${by[key].length} lịch</span></summary>${itemsHtml}</details>`;}).join('');const groups=[...c.querySelectorAll('.schedule-time-group')];groups.forEach((group,i)=>{const key=keys[i],host=group.querySelector('.schedule-group-items');by[key].forEach(item=>host.appendChild(item));});}
  const oldSchedule=window.renderSchedule;if(typeof oldSchedule==='function'){const wrappedSchedule=function(){const r=oldSchedule.apply(this,arguments);renderScheduleGrouped24();return r;};window.renderSchedule=wrappedSchedule;try{renderSchedule=wrappedSchedule;}catch(e){}}

  function renderMoments24(){const c=$('momentsList');if(!c)return;const rows=(state.moments||[]).filter(m=>!m.type||m.type==='user');c.innerHTML=groupTemporal24(rows,m=>shell24('moment','📸',m,m.title,`${field24('Tiêu đề',m.title)}${field24('Nội dung khoảnh khắc',m.desc||'')}`,`<button class="btn light sm" onclick="window.editMomentV24('${attr24(m.id)}')">✏️ Sửa</button><button class="btn danger sm" onclick="del('moments','${attr24(m.id)}')">Xóa</button>`),'📸 Chưa có khoảnh khắc đáng nhớ nào.');}
  function renderJournals24(){const c=$('journalList');if(!c)return;const rows=state.journals||[];c.innerHTML=groupTemporal24(rows,j=>shell24('journal','📖',j,`${j.subject||'Chưa phân loại'} · ${j.content||''}`,`${field24('Môn/chủ đề',j.subject)}${field24('Thời gian học',`${Number(j.minutes)||0} phút`,false)}${field24('Điểm tự đánh giá',`${Number(j.score)||0}/10`,false)}${field24('Nội dung nhật ký',j.content)}${field24('Kiến thức mới',j.newKnowledge||'')}`,`<button class="btn light sm" onclick="window.editJournalV24('${attr24(j.id)}')">✏️ Sửa</button><button class="btn danger sm" onclick="del('journals','${attr24(j.id)}')">Xóa</button>`),'📖 Chưa có nhật ký học tập.');}
  function renderMoods24(){const c=$('moodButtons');if(c)c.innerHTML=getAllMoods().map(m=>`<button type="button" class="mood-btn ${activeMood===m[1]?'selected':''}" onclick="selectMood('${attr24(m[1])}')"><span>${m[0]}</span> <span>${esc24(m[1])}</span></button>`).join('');const sel=$('customComfortMood');if(sel)sel.innerHTML=getAllMoods().map(m=>`<option value="${attr24(m[1])}">${m[0]} ${esc24(m[1])}</option>`).join('');const c2=$('moodHistory');if(!c2)return;const rows=state.moods||[];c2.innerHTML=groupTemporal24(rows,m=>shell24('mood','💗',m,`${m.emoji||''} ${m.name||'Chưa chọn cảm xúc'}${m.note?' · '+m.note:''}`,`${field24('Cảm xúc',`${m.emoji||''} ${m.name||''}`)}${field24('Ghi chú cảm xúc',m.note||'')}`,`<button class="btn light sm" onclick="window.editMoodV24('${attr24(m.date)}')">✏️ Sửa</button><button class="btn danger sm" onclick="delMoodV24('${attr24(m.date)}')">Xóa</button>`),'💗 Chưa có lịch sử cảm xúc.');}
  window.delMoodV24=function(date){const arr=state.moods||[],i=arr.findIndex(x=>String(x.date)===String(date));if(i<0)return;if(!confirm('Xóa bản ghi cảm xúc này? Bản ghi sẽ được chuyển vào Thùng rác.'))return;const removed=arr[i];moveTrash('moods',removed);arr.splice(i,1);save();renderMoods24();};
  function renderEndDay24(){const c=$('endDayHistory');if(!c)return;const rows=(state.moments||[]).filter(m=>String(m.title||'').includes('Kết ngày'));c.innerHTML=groupTemporal24(rows,m=>{const x=parseEnd24(m);return shell24('endday','🌙',m,x.gratitude||x.lesson||x.tomorrow||x.mood,`${field24('💗 Cảm xúc hôm nay',x.mood)}${field24('🙏 Điều biết ơn hôm nay',x.gratitude)}${field24('📖 Bài học được học hôm nay',x.lesson)}${field24('✨ Ngày mai điều quan trọng nhất',x.tomorrow)}`,`<button class="btn light sm" onclick="window.editEndDayV24('${attr24(m.id)}')">✏️ Sửa</button><button class="btn danger sm" onclick="del('moments','${attr24(m.id)}')">Xóa</button>`);},'🌙 Chưa có kết ngày nào được lưu.');}

  function renderJourney24(){const c=$('journeyList');if(!c)return;const rows=journeyRows();const count=$('journeyCount');if(count)count.textContent=`${rows.length} ảnh`;c.innerHTML=groupTemporal24(rows,m=>{const study=m.journeyType==='study',title=m.title||'Chưa có tiêu đề',subtitle=study?`${m.subject||'Chưa ghi môn'} · ${m.reason||'Chưa ghi lý do'}`:(m.note||'Chưa có ghi chú');return `<article class="journey-entry" data-journey-id="${attr24(m.id)}"><div class="journey-entry-image">${m.imageData?`<img loading="lazy" src="${attr24(m.imageData)}" alt="${attr24(title)}">`:'<span>🖼️</span>'}</div><div class="journey-entry-content"><div class="journey-entry-top"><span class="tag">${study?'📚 Hành trình học tập':'🌤️ Khoảnh khắc hằng ngày'}</span><small class="muted">${esc24(m.date||'')}</small></div><h3>${esc24(title)}</h3>${study?`<p class="journey-subject"><b>Môn:</b> ${esc24(m.subject||'Chưa ghi nhận')}</p>`:''}<p class="journey-entry-note">${esc24(subtitle)}</p><div class="actions"><button type="button" class="btn light sm" onclick="window.openJourneyDetail('${attr24(m.id)}')">Mở chi tiết</button><button type="button" class="btn light sm" onclick="window.editJourneyV24('${attr24(m.id)}')">✏️ Sửa</button><button type="button" class="btn danger sm" onclick="del('moments','${attr24(m.id)}')">Xóa</button></div></div></article>`},'🖼️ Chưa có ảnh hành trình. Hãy lưu một dấu mốc đầu tiên của bạn nhé.');}

  window.renderMoments=renderMoments24;window.renderJournals=renderJournals24;window.renderMoods=renderMoods24;window.renderEndDay=renderEndDay24;window.renderJourney=renderJourney24;
  try{renderMoments=renderMoments24;renderJournals=renderJournals24;renderMoods=renderMoods24;renderEndDay=renderEndDay24;renderJourney=renderJourney24;}catch(e){}
  const boot24=()=>{try{renderMoments24();renderJournals24();renderMoods24();renderEndDay24();renderJourney24();if(typeof renderSchedule==='function')renderSchedule();}catch(e){console.warn('CRUD temporal V24',e);}};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot24,0));else setTimeout(boot24,0);
})();
