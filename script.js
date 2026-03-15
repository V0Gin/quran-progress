/* ========== Supabase Configuration ========== */
const SUPABASE_URL = 'https://vclixwcpybgvyvjjtcsl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjbGl4d2NweWJndnl2amp0Y3NsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxNjUxNjUsImV4cCI6MjA4ODc0MTE2NX0.Nzm5pRP88vR-KaacvwTK9JCmL9zhITieQh7pvQDKzVU';

// Safe init — if CDN hasn't loaded, retry; don't crash the page
let db;
try {
  db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} catch (e) {
  console.error('Supabase init failed, will retry on DOMContentLoaded:', e);
}

/* ========== Quran Structure Dataset ========== */
const QURAN_SURAHS = [
  {number:1,name:'الفاتحة',ayahCount:7},{number:2,name:'البقرة',ayahCount:286},{number:3,name:'آل عمران',ayahCount:200},
  {number:4,name:'النساء',ayahCount:176},{number:5,name:'المائدة',ayahCount:120},{number:6,name:'الأنعام',ayahCount:165},
  {number:7,name:'الأعراف',ayahCount:206},{number:8,name:'الأنفال',ayahCount:75},{number:9,name:'التوبة',ayahCount:129},
  {number:10,name:'يونس',ayahCount:109},{number:11,name:'هود',ayahCount:123},{number:12,name:'يوسف',ayahCount:111},
  {number:13,name:'الرعد',ayahCount:43},{number:14,name:'إبراهيم',ayahCount:52},{number:15,name:'الحجر',ayahCount:99},
  {number:16,name:'النحل',ayahCount:128},{number:17,name:'الإسراء',ayahCount:111},{number:18,name:'الكهف',ayahCount:110},
  {number:19,name:'مريم',ayahCount:98},{number:20,name:'طه',ayahCount:135},{number:21,name:'الأنبياء',ayahCount:112},
  {number:22,name:'الحج',ayahCount:78},{number:23,name:'المؤمنون',ayahCount:118},{number:24,name:'النور',ayahCount:64},
  {number:25,name:'الفرقان',ayahCount:77},{number:26,name:'الشعراء',ayahCount:227},{number:27,name:'النمل',ayahCount:93},
  {number:28,name:'القصص',ayahCount:88},{number:29,name:'العنكبوت',ayahCount:69},{number:30,name:'الروم',ayahCount:60},
  {number:31,name:'لقمان',ayahCount:34},{number:32,name:'السجدة',ayahCount:30},{number:33,name:'الأحزاب',ayahCount:73},
  {number:34,name:'سبأ',ayahCount:54},{number:35,name:'فاطر',ayahCount:45},{number:36,name:'يس',ayahCount:83},
  {number:37,name:'الصافات',ayahCount:182},{number:38,name:'ص',ayahCount:88},{number:39,name:'الزمر',ayahCount:75},
  {number:40,name:'غافر',ayahCount:85},{number:41,name:'فصلت',ayahCount:54},{number:42,name:'الشورى',ayahCount:53},
  {number:43,name:'الزخرف',ayahCount:89},{number:44,name:'الدخان',ayahCount:59},{number:45,name:'الجاثية',ayahCount:37},
  {number:46,name:'الأحقاف',ayahCount:35},{number:47,name:'محمد',ayahCount:38},{number:48,name:'الفتح',ayahCount:29},
  {number:49,name:'الحجرات',ayahCount:18},{number:50,name:'ق',ayahCount:45},{number:51,name:'الذاريات',ayahCount:60},
  {number:52,name:'الطور',ayahCount:49},{number:53,name:'النجم',ayahCount:62},{number:54,name:'القمر',ayahCount:55},
  {number:55,name:'الرحمن',ayahCount:78},{number:56,name:'الواقعة',ayahCount:96},{number:57,name:'الحديد',ayahCount:29},
  {number:58,name:'المجادلة',ayahCount:22},{number:59,name:'الحشر',ayahCount:24},{number:60,name:'الممتحنة',ayahCount:13},
  {number:61,name:'الصف',ayahCount:14},{number:62,name:'الجمعة',ayahCount:11},{number:63,name:'المنافقون',ayahCount:11},
  {number:64,name:'التغابن',ayahCount:18},{number:65,name:'الطلاق',ayahCount:12},{number:66,name:'التحريم',ayahCount:12},
  {number:67,name:'الملك',ayahCount:30},{number:68,name:'القلم',ayahCount:52},{number:69,name:'الحاقة',ayahCount:52},
  {number:70,name:'المعارج',ayahCount:44},{number:71,name:'نوح',ayahCount:28},{number:72,name:'الجن',ayahCount:28},
  {number:73,name:'المزمل',ayahCount:20},{number:74,name:'المدثر',ayahCount:56},{number:75,name:'القيامة',ayahCount:40},
  {number:76,name:'الإنسان',ayahCount:31},{number:77,name:'المرسلات',ayahCount:50},{number:78,name:'النبأ',ayahCount:40},
  {number:79,name:'النازعات',ayahCount:46},{number:80,name:'عبس',ayahCount:42},{number:81,name:'التكوير',ayahCount:29},
  {number:82,name:'الانفطار',ayahCount:19},{number:83,name:'المطففين',ayahCount:36},{number:84,name:'الانشقاق',ayahCount:25},
  {number:85,name:'البروج',ayahCount:22},{number:86,name:'الطارق',ayahCount:17},{number:87,name:'الأعلى',ayahCount:19},
  {number:88,name:'الغاشية',ayahCount:26},{number:89,name:'الفجر',ayahCount:30},{number:90,name:'البلد',ayahCount:20},
  {number:91,name:'الشمس',ayahCount:15},{number:92,name:'الليل',ayahCount:21},{number:93,name:'الضحى',ayahCount:11},
  {number:94,name:'الشرح',ayahCount:8},{number:95,name:'التين',ayahCount:8},{number:96,name:'العلق',ayahCount:19},
  {number:97,name:'القدر',ayahCount:5},{number:98,name:'البينة',ayahCount:8},{number:99,name:'الزلزلة',ayahCount:8},
  {number:100,name:'العاديات',ayahCount:11},{number:101,name:'القارعة',ayahCount:11},{number:102,name:'التكاثر',ayahCount:8},
  {number:103,name:'العصر',ayahCount:3},{number:104,name:'الهمزة',ayahCount:9},{number:105,name:'الفيل',ayahCount:5},
  {number:106,name:'قريش',ayahCount:4},{number:107,name:'الماعون',ayahCount:7},{number:108,name:'الكوثر',ayahCount:3},
  {number:109,name:'الكافرون',ayahCount:6},{number:110,name:'النصر',ayahCount:3},{number:111,name:'المسد',ayahCount:5},
  {number:112,name:'الإخلاص',ayahCount:4},{number:113,name:'الفلق',ayahCount:5},{number:114,name:'الناس',ayahCount:6}
];

// Prefix-sum: SURAH_START_INDEX[i] = global index of first ayah in surah (i+1)
const SURAH_START_INDEX = [];
const TOTAL_AYAHS = 6236;
(function buildIndex() {
  let idx = 1;
  for (let i = 0; i < QURAN_SURAHS.length; i++) {
    SURAH_START_INDEX[i] = idx;
    idx += QURAN_SURAHS[i].ayahCount;
  }
})();

function getGlobalIndex(surahNum, ayahNum) {
  return SURAH_START_INDEX[surahNum - 1] + (ayahNum - 1);
}

function getSurahAyahFromIndex(globalIndex) {
  for (let i = QURAN_SURAHS.length - 1; i >= 0; i--) {
    if (globalIndex >= SURAH_START_INDEX[i]) {
      return { surah: i + 1, ayah: globalIndex - SURAH_START_INDEX[i] + 1, name: QURAN_SURAHS[i].name };
    }
  }
  return { surah: 1, ayah: 1, name: 'الفاتحة' };
}

/* ========== Quran Verse Text Loading ========== */
let quranVerses = null; // flat array indexed by globalIndex-1
let quranLoadingPromise = null;

async function loadQuranText() {
  if (quranVerses) return;
  if (quranLoadingPromise) { await quranLoadingPromise; return; }
  quranLoadingPromise = (async () => {
    try {
      const res = await fetch('https://api.alquran.cloud/v1/quran/quran-uthmani');
      const json = await res.json();
      if (json.code === 200 && json.data && json.data.surahs) {
        quranVerses = [];
        json.data.surahs.forEach(s => {
          s.ayahs.forEach(a => {
            quranVerses.push({ surah: s.number, ayah: a.numberInSurah, text: a.text, page: a.page });
          });
        });
        console.log('Quran text loaded:', quranVerses.length, 'verses');
      }
    } catch (e) {
      console.error('Failed to load Quran text:', e);
    }
  })();
  await quranLoadingPromise;
}

function getVerseText(surahNum, ayahNum) {
  if (!quranVerses) return null;
  const idx = getGlobalIndex(surahNum, ayahNum) - 1;
  if (idx >= 0 && idx < quranVerses.length) return quranVerses[idx].text;
  return null;
}

/* ========== Current User Filter ========== */
let currentUser = localStorage.getItem('quran_user') || 'الكل';

/* ========== User Hifz Progress Cache ========== */
let userMaxEndIndex = 0;

/* ========== Supabase CRUD Helpers ========== */

// Insert a new session row into Supabase
async function insertSession(row) {
  if (!db) { showToast('⚠️ لم يتم الاتصال بقاعدة البيانات'); return false; }
  const { error } = await db.from('sessions').insert([row]);
  if (error) {
    console.error('Insert error:', error);
    showToast('⚠️ حدث خطأ أثناء الحفظ');
    return false;
  }
  return true;
}

// Load sessions from Supabase filtered by type and optionally by user
async function loadSessions(type) {
  if (!db) { return []; }
  let query = db.from('sessions').select('*').eq('type', type);
  if (currentUser !== 'الكل') {
    query = query.eq('user_name', currentUser);
  }
  query = query.order('date', { ascending: false });

  const { data, error } = await query;
  if (error) {
    console.error('Load error:', error);
    return [];
  }
  return data || [];
}

// Delete a session by ID
async function deleteSession(id) {
  if (!db) { showToast('⚠️ لم يتم الاتصال بقاعدة البيانات'); return false; }
  const { error } = await db.from('sessions').delete().eq('id', id);
  if (error) {
    console.error('Delete error:', error);
    showToast('⚠️ حدث خطأ أثناء الحذف');
    return false;
  }
  return true;
}

/* ========== User Selector ========== */
function initUserSelector() {
  const sel = document.getElementById('userSelect');
  sel.value = currentUser;
}

function changeUser() {
  currentUser = document.getElementById('userSelect').value;
  localStorage.setItem('quran_user', currentUser);
  // Refresh the currently active section
  const activeTab = document.querySelector('.nav-tab.active');
  if (activeTab) showSection(activeTab.dataset.section);
}

// Get the user_name for inserts (must pick a specific user, not 'الكل')
function getInsertUser() {
  if (currentUser !== 'الكل') return currentUser;
  // Default to عبدالله if 'الكل' is selected
  showToast('⚠️ يرجى اختيار المستخدم أولاً');
  return null;
}

/* ========== Theme Management (still uses LocalStorage) ========== */
function initTheme() {
  const saved = localStorage.getItem('quran_theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  document.getElementById('themeToggle').value = saved;
}

function changeTheme() {
  const selected = document.getElementById('themeToggle').value;
  document.documentElement.setAttribute('data-theme', selected);
  localStorage.setItem('quran_theme', selected);
}

/* ========== Section Navigation ========== */
function showSection(id) {
  // Hide all, show target
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById('section-' + id).classList.add('active');

  // Update tab highlighting
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.querySelector('.nav-tab[data-section="' + id + '"]').classList.add('active');

  // Refresh relevant data (async)
  if (id === 'home') updateDashboard();
  if (id === 'tasmee') renderTasmeeTable();
  if (id === 'revision') renderRevisionTable();
  if (id === 'exams') renderExamTable();
  if (id === 'test') { /* test tab is static, no data to load */ }
  if (id === 'stats') updateStats();
}

/* ========== Toast ========== */
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

/* ========== Grade Badge (color-coded) ========== */
function gradeBadge(grade, max) {
  const pct = (grade / max) * 100;
  let cls = 'grade-high';
  if (pct < 50) cls = 'grade-low';
  else if (pct < 75) cls = 'grade-mid';
  return '<span class="grade-badge ' + cls + '">' + grade + '/' + max + '</span>';
}

/* ========== Average Calculation ========== */
function calcAvg(records, field) {
  if (!records.length) return '0';
  const sum = records.reduce((a, r) => a + parseFloat(r[field] || 0), 0);
  return (sum / records.length).toFixed(1);
}

/* ====================================================
   التسميع اليومي  (Daily Tasmee)
==================================================== */
async function addTasmee() {
  const userName = getInsertUser();
  if (!userName) return;

  const day = document.getElementById('tasmee-day').value;
  const date = document.getElementById('tasmee-date').value;
  const revisionGrade = parseFloat(document.getElementById('tasmee-revision-grade').value) || 0;
  const newGrade = parseFloat(document.getElementById('tasmee-new-grade').value) || 0;
  const notes = document.getElementById('tasmee-notes').value.trim();

  // Revision range
  const revStartSurah = parseInt(document.getElementById('tasmee-rev-start-surah').value) || null;
  const revStartAyah = parseInt(document.getElementById('tasmee-rev-start-ayah').value) || null;
  const revEndSurah = parseInt(document.getElementById('tasmee-rev-end-surah').value) || null;
  const revEndAyah = parseInt(document.getElementById('tasmee-rev-end-ayah').value) || null;

  // New memorization range
  const newStartSurah = parseInt(document.getElementById('tasmee-new-start-surah').value) || null;
  const newStartAyah = parseInt(document.getElementById('tasmee-new-start-ayah').value) || null;
  const newEndSurah = parseInt(document.getElementById('tasmee-new-end-surah').value) || null;
  const newEndAyah = parseInt(document.getElementById('tasmee-new-end-ayah').value) || null;

  if (!date || revisionGrade < 0 || revisionGrade > 10
    || newGrade < 0 || newGrade > 10) {
    showToast('\u26a0\ufe0f \u064a\u0631\u062c\u0649 \u0645\u0644\u0621 \u0627\u0644\u062d\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u0628\u0634\u0643\u0644 \u0635\u062d\u064a\u062d');
    return;
  }

  // Format range strings
  function formatRange(ss, sa, es, ea) {
    if (!ss || !sa) return null;
    const startName = QURAN_SURAHS[ss - 1].name;
    if (!es || !ea) return startName + ' ' + sa;
    const endName = QURAN_SURAHS[es - 1].name;
    if (ss === es) return startName + ' ' + sa + ' \u2192 ' + ea;
    return startName + ' ' + sa + ' \u2192 ' + endName + ' ' + ea;
  }

  const revisionText = formatRange(revStartSurah, revStartAyah, revEndSurah, revEndAyah);
  const newMemText = formatRange(newStartSurah, newStartAyah, newEndSurah, newEndAyah);

  // Calculate final grade: (revision * 25%) + (new * 75%), rounded to 2 decimals
  const finalGrade = Math.round(((revisionGrade * 0.25) + (newGrade * 0.75)) * 100) / 100;

  // Compute global indices from NEW memorization range (for hifz progress)
  let startIndex = null, endIndex = null;
  if (newStartSurah && newStartAyah) startIndex = getGlobalIndex(newStartSurah, newStartAyah);
  if (newEndSurah && newEndAyah) endIndex = getGlobalIndex(newEndSurah, newEndAyah);

  const row = {
    user_name: userName,
    type: 'tasmee',
    day: day,
    date: date,
    revision: revisionText,
    new_mem: newMemText,
    revision_grade: Number(revisionGrade),
    new_grade: Number(newGrade),
    grade: Number(finalGrade),
    notes: notes || null
  };
  if (newStartSurah) row.start_surah = newStartSurah;
  if (newStartAyah) row.start_ayah = newStartAyah;
  if (newEndSurah) row.end_surah = newEndSurah;
  if (newEndAyah) row.end_ayah = newEndAyah;
  if (startIndex) row.start_index = startIndex;
  if (endIndex) row.end_index = endIndex;

  const ok = await insertSession(row);

  if (!ok) return;

  // Reset form fields
  document.getElementById('tasmee-date').value = new Date().toISOString().split('T')[0];
  document.getElementById('tasmee-revision-grade').value = '';
  document.getElementById('tasmee-new-grade').value = '';
  document.getElementById('tasmee-notes').value = '';
  ['rev', 'new'].forEach(prefix => {
    document.getElementById('tasmee-' + prefix + '-start-ayah').value = '';
    document.getElementById('tasmee-' + prefix + '-end-ayah').value = '';
    document.getElementById('tasmee-' + prefix + '-same-surah').checked = false;
    document.getElementById('tasmee-' + prefix + '-end-surah').disabled = false;
  });

  await renderTasmeeTable();
  showToast('\u062a\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062a\u0633\u0645\u064a\u0639 \u0628\u0646\u062c\u0627\u062d \u2705');
}

async function deleteTasmee(id) {
  if (await deleteSession(id)) {
    await renderTasmeeTable();
    showToast('\u062a\u0645 \u062d\u0630\u0641 \u0627\u0644\u0633\u062c\u0644 \ud83d\uddd1\ufe0f');
  }
}

async function renderTasmeeTable() {
  const data = await loadSessions('tasmee');
  const container = document.getElementById('tasmee-table-container');

  if (!data.length) {
    container.innerHTML = '<div class="empty-state"><div class="empty-icon">\ud83d\udced</div><p>\u0644\u0627 \u062a\u0648\u062c\u062f \u0633\u062c\u0644\u0627\u062a \u0628\u0639\u062f</p></div>';
    return;
  }

  let html = '<table><thead><tr>';
  html += '<th>\u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645</th><th>\u0627\u0644\u064a\u0648\u0645</th><th>\u0627\u0644\u062a\u0627\u0631\u064a\u062e</th><th>\u0627\u0644\u0645\u0631\u0627\u062c\u0639\u0629</th><th>\u0627\u0644\u062d\u0641\u0638 \u0627\u0644\u062c\u062f\u064a\u062f</th><th>\u062f\u0631\u062c\u0629 \u0627\u0644\u0645\u0631\u0627\u062c\u0639\u0629</th><th>\u062f\u0631\u062c\u0629 \u0627\u0644\u062c\u062f\u064a\u062f</th><th>\u0627\u0644\u062f\u0631\u062c\u0629 \u0627\u0644\u0646\u0647\u0627\u0626\u064a\u0629</th><th>\u0645\u0644\u0627\u062d\u0638\u0627\u062a</th><th>\u062d\u0630\u0641</th>';
  html += '</tr></thead><tbody>';
  data.forEach(r => {
    html += '<tr>';
    html += '<td>' + (r.user_name || '-') + '</td>';
    html += '<td>' + (r.day || '-') + '</td>';
    html += '<td>' + (r.date || '-') + '</td>';
    html += '<td>' + (r.revision || '-') + '</td>';
    html += '<td>' + (r.new_mem || '-') + '</td>';
    html += '<td>' + gradeBadge(r.revision_grade != null ? r.revision_grade : r.grade, 10) + '</td>';
    html += '<td>' + gradeBadge(r.new_grade != null ? r.new_grade : r.grade, 10) + '</td>';
    html += '<td>' + gradeBadge(r.grade, 10) + '</td>';
    html += '<td>' + (r.notes || '-') + '</td>';
    html += '<td><button class="btn btn-danger" onclick="deleteTasmee(' + r.id + ')">' + '\ud83d\uddd1\ufe0f</button></td>';
    html += '</tr>';
  });
  html += '</tbody></table>';
  container.innerHTML = html;
}

/* ====================================================
   المراجعة الأسبوعية  (Weekly Revision)
==================================================== */
async function addRevision() {
  const userName = getInsertUser();
  if (!userName) return;

  const day = document.getElementById('revision-day').value;
  const date = document.getElementById('revision-date').value;
  const grade = parseFloat(document.getElementById('revision-grade').value);
  const notes = document.getElementById('revision-notes').value.trim();

  const startSurah = parseInt(document.getElementById('revision-start-surah').value) || null;
  const startAyah = parseInt(document.getElementById('revision-start-ayah').value) || null;
  const endSurah = parseInt(document.getElementById('revision-end-surah').value) || null;
  const endAyah = parseInt(document.getElementById('revision-end-ayah').value) || null;

  if (!date || isNaN(grade) || grade < 0 || grade > 10) {
    showToast('\u26a0\ufe0f \u064a\u0631\u062c\u0649 \u0645\u0644\u0621 \u0627\u0644\u062d\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u0628\u0634\u0643\u0644 \u0635\u062d\u064a\u062d');
    return;
  }

  // Format range string
  function formatRange(ss, sa, es, ea) {
    if (!ss || !sa) return null;
    const startName = QURAN_SURAHS[ss - 1].name;
    if (!es || !ea) return startName + ' ' + sa;
    const endName = QURAN_SURAHS[es - 1].name;
    if (ss === es) return startName + ' ' + sa + ' \u2192 ' + ea;
    return startName + ' ' + sa + ' \u2192 ' + endName + ' ' + ea;
  }

  const revisionText = formatRange(startSurah, startAyah, endSurah, endAyah);

  // Compute global indices
  let startIndex = null, endIndex = null;
  if (startSurah && startAyah) startIndex = getGlobalIndex(startSurah, startAyah);
  if (endSurah && endAyah) endIndex = getGlobalIndex(endSurah, endAyah);

  const row = {
    user_name: userName,
    type: 'revision',
    day: day,
    date: date,
    revision: revisionText,
    grade: grade,
    notes: notes || null
  };
  if (startSurah) row.start_surah = startSurah;
  if (startAyah) row.start_ayah = startAyah;
  if (endSurah) row.end_surah = endSurah;
  if (endAyah) row.end_ayah = endAyah;
  if (startIndex) row.start_index = startIndex;
  if (endIndex) row.end_index = endIndex;

  const ok = await insertSession(row);

  if (!ok) return;

  document.getElementById('revision-date').value = new Date().toISOString().split('T')[0];
  document.getElementById('revision-start-ayah').value = '';
  document.getElementById('revision-end-ayah').value = '';
  document.getElementById('revision-grade').value = '';
  document.getElementById('revision-notes').value = '';
  document.getElementById('revision-same-surah').checked = false;
  document.getElementById('revision-end-surah').disabled = false;

  await renderRevisionTable();
  showToast('\u062a\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0631\u0627\u062c\u0639\u0629 \u0628\u0646\u062c\u0627\u062d \u2705');
}

async function deleteRevision(id) {
  if (await deleteSession(id)) {
    await renderRevisionTable();
    showToast('\u062a\u0645 \u062d\u0630\u0641 \u0627\u0644\u0633\u062c\u0644 \ud83d\uddd1\ufe0f');
  }
}

async function renderRevisionTable() {
  const data = await loadSessions('revision');
  const container = document.getElementById('revision-table-container');

  if (!data.length) {
    container.innerHTML = '<div class="empty-state"><div class="empty-icon">\ud83d\udced</div><p>\u0644\u0627 \u062a\u0648\u062c\u062f \u0633\u062c\u0644\u0627\u062a \u0628\u0639\u062f</p></div>';
    return;
  }

  let html = '<table><thead><tr>';
  html += '<th>\u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645</th><th>\u0627\u0644\u064a\u0648\u0645</th><th>\u0627\u0644\u062a\u0627\u0631\u064a\u062e</th><th>\u0627\u0644\u0645\u0631\u0627\u062c\u0639\u0629</th><th>\u0627\u0644\u062f\u0631\u062c\u0629</th><th>\u0645\u0644\u0627\u062d\u0638\u0627\u062a</th><th>\u062d\u0630\u0641</th>';
  html += '</tr></thead><tbody>';
  data.forEach(r => {
    html += '<tr>';
    html += '<td>' + (r.user_name || '-') + '</td>';
    html += '<td>' + (r.day || '-') + '</td>';
    html += '<td>' + (r.date || '-') + '</td>';
    html += '<td>' + (r.revision || '-') + '</td>';
    html += '<td>' + gradeBadge(r.grade, 10) + '</td>';
    html += '<td>' + (r.notes || '-') + '</td>';
    html += '<td><button class="btn btn-danger" onclick="deleteRevision(' + r.id + ')">' + '\ud83d\uddd1\ufe0f</button></td>';
    html += '</tr>';
  });
  html += '</tbody></table>';
  container.innerHTML = html;
}

/* ====================================================
   الاختبارات  (Exams)
==================================================== */
async function addExam() {
  const userName = getInsertUser();
  if (!userName) return;

  const juz = parseInt(document.getElementById('exam-juz').value);
  const date = document.getElementById('exam-date').value;
  const grade = parseFloat(document.getElementById('exam-grade').value);
  const notes = document.getElementById('exam-notes').value.trim();

  if (!date || !juz || isNaN(grade) || grade < 0 || grade > 20) {
    showToast('⚠️ يرجى ملء الحقول المطلوبة بشكل صحيح');
    return;
  }

  const ok = await insertSession({
    user_name: userName,
    type: 'exam',
    day: null,
    date: date,
    juz: juz,
    grade: grade,
    notes: notes || null
  });

  if (!ok) return;

  document.getElementById('exam-juz').value = '';
  document.getElementById('exam-date').value = new Date().toISOString().split('T')[0];
  document.getElementById('exam-grade').value = '';
  document.getElementById('exam-notes').value = '';

  await renderExamTable();
  showToast('تم إضافة الاختبار بنجاح ✅');
}

async function deleteExam(id) {
  if (await deleteSession(id)) {
    await renderExamTable();
    showToast('تم حذف السجل 🗑️');
  }
}

async function renderExamTable() {
  const data = await loadSessions('exam');
  const container = document.getElementById('exam-table-container');

  if (!data.length) {
    container.innerHTML = '<div class="empty-state"><div class="empty-icon">📭</div><p>لا توجد سجلات بعد</p></div>';
    return;
  }

  let html = '<table><thead><tr>';
  html += '<th>المستخدم</th><th>رقم الجزء</th><th>التاريخ</th><th>الدرجة</th><th>ملاحظات</th><th>حذف</th>';
  html += '</tr></thead><tbody>';
  data.forEach(r => {
    html += '<tr>';
    html += '<td>' + (r.user_name || '-') + '</td>';
    html += '<td>الجزء ' + (r.juz || '-') + '</td>';
    html += '<td>' + (r.date || '-') + '</td>';
    html += '<td>' + gradeBadge(r.grade, 20) + '</td>';
    html += '<td>' + (r.notes || '-') + '</td>';
    html += '<td><button class="btn btn-danger" onclick="deleteExam(' + r.id + ')">🗑️</button></td>';
    html += '</tr>';
  });
  html += '</tbody></table>';
  container.innerHTML = html;
}

/* ====================================================
   Dashboard & Statistics
==================================================== */
// Load exams for a specific user (always per-user, even if 'الكل' is selected)
async function loadUserExams(userName) {
  if (!db || !userName || userName === 'الكل') return [];
  const { data, error } = await db.from('sessions').select('*')
    .eq('type', 'exam')
    .eq('user_name', userName)
    .order('date', { ascending: false });
  if (error) { console.error('Load user exams error:', error); return []; }
  return data || [];
}

// Count unique juz from exam records
function getCompletedJuz(exams) {
  const juzSet = new Set();
  exams.forEach(r => { if (r.juz) juzSet.add(r.juz); });
  return juzSet;
}

// Render the 30-juz grid map
function renderJuzGrid(completedJuz) {
  const container = document.getElementById('juz-grid-container');
  let html = '';
  for (let i = 1; i <= 30; i++) {
    const done = completedJuz.has(i);
    html += '<div class="juz-box' + (done ? ' completed' : '') + '">';
    html += (done ? '✅ ' : '') + 'جزء ' + i;
    html += '</div>';
  }
  container.innerHTML = html;
}

async function updateDashboard() {
  const tasmee = await loadSessions('tasmee');
  const revision = await loadSessions('revision');
  const exams = await loadSessions('exam');

  document.getElementById('dash-tasmee-avg').textContent = calcAvg(tasmee, 'grade');
  document.getElementById('dash-revision-avg').textContent = calcAvg(revision, 'grade');
  document.getElementById('dash-exam-avg').textContent = calcAvg(exams, 'grade');
  document.getElementById('dash-tasmee-count').textContent = tasmee.length;
  document.getElementById('dash-exam-count').textContent = exams.length;

  // Juz progress — hide for الكل
  const dashJuzCard = document.getElementById('dash-juz-card');
  const dashHifzCard = document.getElementById('dash-hifz-card');
  if (currentUser === 'الكل') {
    dashJuzCard.style.display = 'none';
    dashHifzCard.style.display = 'none';
  } else {
    dashJuzCard.style.display = '';
    const userExams = await loadUserExams(currentUser);
    const completedJuz = getCompletedJuz(userExams);
    const juzCount = completedJuz.size;
    document.getElementById('dash-juz-progress').textContent = juzCount + ' / 30';
    document.getElementById('dash-juz-bar').style.width = ((juzCount / 30) * 100).toFixed(1) + '%';

    // Hifz progress
    dashHifzCard.style.display = '';
    await updateHifzProgress('dash', currentUser);
  }
}

// Load tasmee sessions for a specific user (bypasses currentUser filter)
async function loadTasmeeForUser(userName) {
  if (!db) return [];
  const { data, error } = await db.from('sessions').select('*')
    .eq('type', 'tasmee')
    .eq('user_name', userName)
    .order('date', { ascending: true });
  if (error) { console.error('Load tasmee error:', error); return []; }
  return data || [];
}

// Chart.js instance holder
let tasmeeChartInstance = null;

async function renderTasmeeChart() {
  const ctx = document.getElementById('tasmeeChart').getContext('2d');

  // Destroy previous chart
  if (tasmeeChartInstance) { tasmeeChartInstance.destroy(); }

  const datasets = [];

  if (currentUser === 'الكل') {
    // Load both users
    const abdullahData = await loadTasmeeForUser('عبدالله');
    const aseelData = await loadTasmeeForUser('أصيل');

    if (abdullahData.length) {
      datasets.push({
        label: 'عبدالله',
        data: abdullahData.map(r => ({ x: r.date, y: r.grade })),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.1)',
        borderWidth: 2.5,
        tension: 0.3,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6
      });
    }
    if (aseelData.length) {
      datasets.push({
        label: 'أصيل',
        data: aseelData.map(r => ({ x: r.date, y: r.grade })),
        borderColor: 'rgba(0, 184, 148, 1)',
        backgroundColor: 'rgba(0, 184, 148, 0.1)',
        borderWidth: 2.5,
        tension: 0.3,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6
      });
    }
  } else {
    // Single user
    const userData = await loadTasmeeForUser(currentUser);
    if (userData.length) {
      datasets.push({
        label: currentUser,
        data: userData.map(r => ({ x: r.date, y: r.grade })),
        borderColor: 'rgba(108, 92, 231, 1)',
        backgroundColor: 'rgba(108, 92, 231, 0.1)',
        borderWidth: 2.5,
        tension: 0.3,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6
      });
    }
  }

  tasmeeChartInstance = new Chart(ctx, {
    type: 'line',
    data: { datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: datasets.length > 1,
          labels: {
            font: { family: 'Tajawal', size: 13, weight: '600' },
            usePointStyle: true,
            pointStyle: 'circle'
          }
        },
        tooltip: {
          titleFont: { family: 'Tajawal' },
          bodyFont: { family: 'Tajawal' },
          callbacks: {
            label: function (ctx) {
              return (ctx.dataset.label || '') + ': ' + ctx.parsed.y + ' / 10';
            }
          }
        }
      },
      scales: {
        x: {
          type: 'category',
          ticks: {
            font: { family: 'Tajawal', size: 11 },
            maxRotation: 45,
            maxTicksLimit: 15
          },
          grid: { display: false }
        },
        y: {
          min: 0,
          max: 10,
          ticks: {
            font: { family: 'Tajawal', size: 11 },
            stepSize: 1
          },
          grid: { color: 'rgba(128,128,128,0.15)' }
        }
      }
    }
  });
}

// Performance helpers
function calcBest(records) {
  if (!records.length) return '-';
  return Math.max(...records.map(r => parseFloat(r.grade) || 0)).toFixed(1);
}

function calcWorst(records) {
  if (!records.length) return '-';
  return Math.min(...records.map(r => parseFloat(r.grade) || 0)).toFixed(1);
}

function calcMonthAvg(records) {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth(); // 0-based
  const monthRecords = records.filter(r => {
    const d = new Date(r.date);
    return d.getFullYear() === y && d.getMonth() === m;
  });
  if (!monthRecords.length) return '-';
  const sum = monthRecords.reduce((a, r) => a + (parseFloat(r.grade) || 0), 0);
  return (sum / monthRecords.length).toFixed(1);
}

function calcStreak(records) {
  if (!records.length) return 0;
  // Get unique dates sorted descending
  const dates = [...new Set(records.map(r => r.date))].sort().reverse();
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let expected = new Date(today);

  for (const dateStr of dates) {
    const d = new Date(dateStr);
    d.setHours(0, 0, 0, 0);
    // Allow today or yesterday as start
    if (streak === 0) {
      const diff = Math.floor((today - d) / 86400000);
      if (diff > 1) break; // gap too large, no streak
      streak = 1;
      expected = new Date(d);
      expected.setDate(expected.getDate() - 1);
    } else {
      if (d.getTime() === expected.getTime()) {
        streak++;
        expected.setDate(expected.getDate() - 1);
      } else if (d.getTime() < expected.getTime()) {
        break; // gap found
      }
      // skip duplicates (same date)
    }
  }
  return streak;
}

async function updateStats() {
  const tasmee = await loadSessions('tasmee');
  const revision = await loadSessions('revision');
  const exams = await loadSessions('exam');

  document.getElementById('stats-tasmee-avg').textContent = calcAvg(tasmee, 'grade');
  document.getElementById('stats-revision-avg').textContent = calcAvg(revision, 'grade');
  document.getElementById('stats-exam-avg').textContent = calcAvg(exams, 'grade');
  document.getElementById('stats-tasmee-count').textContent = tasmee.length;
  document.getElementById('stats-exam-count').textContent = exams.length;
  document.getElementById('stats-revision-count').textContent = revision.length;

  // Performance cards — hide for الكل
  const perfTitle = document.getElementById('perf-title');
  const perfCards = document.getElementById('perf-cards');
  if (currentUser === 'الكل') {
    perfTitle.style.display = 'none';
    perfCards.style.display = 'none';
  } else {
    perfTitle.style.display = '';
    perfCards.style.display = '';
    const userTasmee = await loadTasmeeForUser(currentUser);
    document.getElementById('stats-best-grade').textContent = calcBest(userTasmee);
    document.getElementById('stats-worst-grade').textContent = calcWorst(userTasmee);
    document.getElementById('stats-month-avg').textContent = calcMonthAvg(userTasmee);
    document.getElementById('stats-streak').textContent = calcStreak(userTasmee);
  }

  // Juz progress — hide for الكل
  const statsJuzCard = document.getElementById('stats-juz-card');
  const juzGridWrap = document.getElementById('juz-grid-wrapper');
  const statsHifzCard = document.getElementById('stats-hifz-card');
  if (currentUser === 'الكل') {
    statsJuzCard.style.display = 'none';
    juzGridWrap.style.display = 'none';
    statsHifzCard.style.display = 'none';
  } else {
    statsJuzCard.style.display = '';
    juzGridWrap.style.display = '';
    statsHifzCard.style.display = '';
    const userExams = await loadUserExams(currentUser);
    const completedJuz = getCompletedJuz(userExams);
    const juzCount = completedJuz.size;
    document.getElementById('stats-juz-progress').textContent = juzCount + ' / 30';
    document.getElementById('stats-juz-bar').style.width = ((juzCount / 30) * 100).toFixed(1) + '%';
    renderJuzGrid(completedJuz);

    // Hifz progress
    await updateHifzProgress('stats', currentUser);
  }

  // Render tasmee progress chart
  await renderTasmeeChart();
}

/* ====================================================
   Hifz Progress Helper
==================================================== */
async function updateHifzProgress(prefix, userName) {
  if (!db || !userName || userName === 'الكل') return;
  const { data, error } = await db.from('sessions').select('end_index')
    .eq('type', 'tasmee')
    .eq('user_name', userName)
    .not('end_index', 'is', null)
    .order('end_index', { ascending: false })
    .limit(1);
  if (error || !data || !data.length) {
    document.getElementById(prefix + '-hifz-pct').textContent = '0%';
    document.getElementById(prefix + '-hifz-location').textContent = 'لم يتم تسجيل حفظ بعد';
    document.getElementById(prefix + '-hifz-bar').style.width = '0%';
    document.getElementById(prefix + '-hifz-text').textContent = 'الفاتحة آية 1 → الناس آية 6';
    userMaxEndIndex = 0;
    return;
  }
  const maxIdx = data[0].end_index;
  userMaxEndIndex = maxIdx;
  const pct = ((maxIdx / TOTAL_AYAHS) * 100).toFixed(1);
  const loc = getSurahAyahFromIndex(maxIdx);
  document.getElementById(prefix + '-hifz-pct').textContent = pct + '%';
  document.getElementById(prefix + '-hifz-location').textContent = 'وصلت إلى: سورة ' + loc.name + ' آية ' + loc.ayah;
  document.getElementById(prefix + '-hifz-bar').style.width = pct + '%';
  document.getElementById(prefix + '-hifz-text').textContent = 'الفاتحة آية 1 → ' + loc.name + ' آية ' + loc.ayah;
}

/* ====================================================
   Surah Dropdown Population
==================================================== */
function populateSurahDropdown(selectId, defaultVal) {
  const sel = document.getElementById(selectId);
  if (!sel || sel.options.length > 1) return; // already populated
  sel.innerHTML = '';
  QURAN_SURAHS.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.number;
    opt.textContent = s.number + ' - ' + s.name;
    sel.appendChild(opt);
  });
  if (defaultVal) sel.value = defaultVal;
}

function updateTasmeeRangeAyah(section, type) {
  const surahNum = parseInt(document.getElementById('tasmee-' + section + '-' + type + '-surah').value);
  const ayahInput = document.getElementById('tasmee-' + section + '-' + type + '-ayah');
  if (surahNum && QURAN_SURAHS[surahNum - 1]) {
    ayahInput.max = QURAN_SURAHS[surahNum - 1].ayahCount;
    ayahInput.placeholder = '1 - ' + QURAN_SURAHS[surahNum - 1].ayahCount;
  }
  // If same-surah is checked, sync the end surah
  if (type === 'start') {
    const cb = document.getElementById('tasmee-' + section + '-same-surah');
    if (cb && cb.checked) handleTasmeeSameSurah(section);
  }
}

function handleTasmeeSameSurah(section) {
  const checked = document.getElementById('tasmee-' + section + '-same-surah').checked;
  const endSurahSel = document.getElementById('tasmee-' + section + '-end-surah');
  if (checked) {
    endSurahSel.value = document.getElementById('tasmee-' + section + '-start-surah').value;
    endSurahSel.disabled = true;
    updateTasmeeRangeAyah(section, 'end');
  } else {
    endSurahSel.disabled = false;
  }
}

function updateRevisionAyah(type) {
  const surahNum = parseInt(document.getElementById('revision-' + type + '-surah').value);
  const ayahInput = document.getElementById('revision-' + type + '-ayah');
  if (surahNum && QURAN_SURAHS[surahNum - 1]) {
    ayahInput.max = QURAN_SURAHS[surahNum - 1].ayahCount;
    ayahInput.placeholder = '1 - ' + QURAN_SURAHS[surahNum - 1].ayahCount;
  }
  if (type === 'start') {
    const cb = document.getElementById('revision-same-surah');
    if (cb && cb.checked) handleRevisionSameSurah();
  }
}

function handleRevisionSameSurah() {
  const checked = document.getElementById('revision-same-surah').checked;
  const endSurahSel = document.getElementById('revision-end-surah');
  if (checked) {
    endSurahSel.value = document.getElementById('revision-start-surah').value;
    endSurahSel.disabled = true;
    updateRevisionAyah('end');
  } else {
    endSurahSel.disabled = false;
  }
}

function updateTestAyahMax(type) {
  const surahNum = parseInt(document.getElementById('test-' + type + '-surah').value);
  const ayahInput = document.getElementById('test-' + type + '-ayah');
  if (surahNum && QURAN_SURAHS[surahNum - 1]) {
    ayahInput.max = QURAN_SURAHS[surahNum - 1].ayahCount;
    ayahInput.placeholder = '1 - ' + QURAN_SURAHS[surahNum - 1].ayahCount;
    if (type === 'end') {
      ayahInput.value = QURAN_SURAHS[surahNum - 1].ayahCount;
    }
  }
}

function handleSameSurahCheck() {
  const checked = document.getElementById('test-same-surah').checked;
  const endSurahSel = document.getElementById('test-end-surah');
  if (checked) {
    endSurahSel.value = document.getElementById('test-start-surah').value;
    endSurahSel.disabled = true;
    updateTestAyahMax('end');
  } else {
    endSurahSel.disabled = false;
  }
}

/* ====================================================
   اختبر نفسك — Test System (4 Methods + Random)
==================================================== */
let currentTestMethod = null;
let currentTestStartIdx = null;
let currentTestEndIdx = null;
let currentQuestionIdx = null;

function toggleTestRangeMode() {
  const mode = document.querySelector('input[name="test-range-mode"]:checked').value;
  const customRange = document.getElementById('test-custom-range');
  const inputs = customRange.querySelectorAll('select, input');
  if (mode === 'hifz') {
    customRange.style.opacity = '0.4';
    customRange.style.pointerEvents = 'none';
    inputs.forEach(el => el.disabled = true);
  } else {
    customRange.style.opacity = '1';
    customRange.style.pointerEvents = '';
    inputs.forEach(el => el.disabled = false);
  }
}

async function runTest(method) {
  const rangeMode = document.querySelector('input[name="test-range-mode"]:checked').value;

  let startIdx, endIdx;

  if (rangeMode === 'hifz') {
    if (currentUser === '\u0627\u0644\u0643\u0644') {
      showToast('\u26a0\ufe0f \u064a\u0631\u062c\u0649 \u0627\u062e\u062a\u064a\u0627\u0631 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645 \u0623\u0648\u0644\u0627\u064b');
      return;
    }
    await updateHifzProgress('dash', currentUser);
    if (userMaxEndIndex <= 0) {
      showToast('\u26a0\ufe0f \u0644\u0645 \u064a\u062a\u0645 \u062a\u0633\u062c\u064a\u0644 \u062d\u0641\u0638 \u0628\u0639\u062f');
      return;
    }
    startIdx = 1;
    endIdx = userMaxEndIndex;
  } else {
    const startSurah = parseInt(document.getElementById('test-start-surah').value);
    const startAyah = parseInt(document.getElementById('test-start-ayah').value) || 1;
    const endSurah = parseInt(document.getElementById('test-end-surah').value);
    const endAyahInput = parseInt(document.getElementById('test-end-ayah').value);
    const endAyah = endAyahInput || QURAN_SURAHS[endSurah - 1].ayahCount;

    startIdx = getGlobalIndex(startSurah, startAyah);
    endIdx = getGlobalIndex(endSurah, endAyah);

    if (endIdx < startIdx) {
      showToast('\u26a0\ufe0f \u0646\u0637\u0627\u0642 \u063a\u064a\u0631 \u0635\u062d\u064a\u062d: \u0627\u0644\u0646\u0647\u0627\u064a\u0629 \u0642\u0628\u0644 \u0627\u0644\u0628\u062f\u0627\u064a\u0629');
      return;
    }
  }

  runTestWithRange(method, startIdx, endIdx);
}

async function runTestWithRange(method, startIdx, endIdx) {
  // If random, pick one of the 4 methods
  if (method === 'random') {
    const methods = ['continue', 'previous', 'skip2', 'identify'];
    method = methods[Math.floor(Math.random() * methods.length)];
  }

  currentTestMethod = method;
  currentTestStartIdx = startIdx;
  currentTestEndIdx = endIdx;

  // Validate range for each method
  if (method === 'continue' && endIdx - startIdx < 5) {
    showToast('\u26a0\ufe0f \u0627\u0644\u0646\u0637\u0627\u0642 \u0635\u063a\u064a\u0631 \u062c\u062f\u0627\u064b \u0644\u0647\u0630\u0627 \u0627\u0644\u0627\u062e\u062a\u0628\u0627\u0631');
    return;
  }
  if (method === 'previous' && endIdx - startIdx < 1) {
    showToast('\u26a0\ufe0f \u0627\u0644\u0646\u0637\u0627\u0642 \u0635\u063a\u064a\u0631 \u062c\u062f\u0627\u064b \u0644\u0647\u0630\u0627 \u0627\u0644\u0627\u062e\u062a\u0628\u0627\u0631');
    return;
  }
  if (method === 'skip2' && endIdx - startIdx < 2) {
    showToast('\u26a0\ufe0f \u0627\u0644\u0646\u0637\u0627\u0642 \u0635\u063a\u064a\u0631 \u062c\u062f\u0627\u064b \u0644\u0647\u0630\u0627 \u0627\u0644\u0627\u062e\u062a\u0628\u0627\u0631');
    return;
  }

  await generateQuestion();
}

async function generateQuestion() {
  if (!quranVerses) {
    showToast('\u23f3 \u062c\u0627\u0631\u064a \u062a\u062d\u0645\u064a\u0644 \u0646\u0635\u0648\u0635 \u0627\u0644\u0642\u0631\u0622\u0646...');
    await loadQuranText();
    if (!quranVerses) {
      showToast('\u26a0\ufe0f \u0641\u0634\u0644 \u062a\u062d\u0645\u064a\u0644 \u0646\u0635\u0648\u0635 \u0627\u0644\u0642\u0631\u0622\u0646');
      return;
    }
  }

  // Reset identify UI
  document.getElementById('identify-options').style.display = 'none';
  document.getElementById('identify-options').innerHTML = '';
  document.getElementById('identify-result').style.display = 'none';
  document.getElementById('identify-result').innerHTML = '';

  let randomIdx;
  if (currentTestMethod === 'continue') {
    // [startIdx, endIdx - 5]
    const range = currentTestEndIdx - 5 - currentTestStartIdx + 1;
    randomIdx = Math.floor(Math.random() * Math.max(1, range)) + currentTestStartIdx;
  } else if (currentTestMethod === 'previous') {
    // [startIdx + 1, endIdx]
    randomIdx = Math.floor(Math.random() * (currentTestEndIdx - currentTestStartIdx)) + currentTestStartIdx + 1;
  } else if (currentTestMethod === 'skip2') {
    // [startIdx, endIdx - 2]
    randomIdx = Math.floor(Math.random() * (currentTestEndIdx - currentTestStartIdx - 1)) + currentTestStartIdx;
  } else if (currentTestMethod === 'identify') {
    // Any ayah in range
    randomIdx = Math.floor(Math.random() * (currentTestEndIdx - currentTestStartIdx + 1)) + currentTestStartIdx;
  }

  currentQuestionIdx = randomIdx;
  const info = getSurahAyahFromIndex(randomIdx);
  const text = getVerseText(info.surah, info.ayah);

  // Display toggles
  const showSurah = document.getElementById('test-show-surah').checked;
  const showAyahNum = document.getElementById('test-show-ayah-num').checked;

  // Question label
  const questionLabel = document.getElementById('verse-question-label');
  if (currentTestMethod === 'continue') {
    questionLabel.textContent = '\u0627\u0628\u062f\u0623 \u0645\u0646 \u0642\u0648\u0644\u0647 \u062a\u0639\u0627\u0644\u0649:';
  } else if (currentTestMethod === 'previous') {
    questionLabel.textContent = '\u0645\u0627 \u0627\u0644\u0622\u064a\u0629 \u0627\u0644\u062a\u064a \u0642\u0628\u0644 \u0642\u0648\u0644\u0647 \u062a\u0639\u0627\u0644\u0649:';
  } else if (currentTestMethod === 'skip2') {
    questionLabel.textContent = '\u0645\u0627 \u0627\u0644\u0622\u064a\u0629 \u0628\u0639\u062f \u0622\u064a\u062a\u064a\u0646 \u0645\u0646 \u0642\u0648\u0644\u0647 \u062a\u0639\u0627\u0644\u0649:';
  } else if (currentTestMethod === 'identify') {
    questionLabel.textContent = '\u0645\u0646 \u0623\u064a \u0633\u0648\u0631\u0629 \u0647\u0630\u0647 \u0627\u0644\u0622\u064a\u0629\u061f';
  }

  // Verse text
  document.getElementById('verse-text').textContent = '\ufd3f ' + (text || '...') + ' \ufd3e';

  // Reference — hide surah name for identify method
  let refParts = [];
  if (currentTestMethod !== 'identify') {
    if (showSurah) refParts.push('\u0633\u0648\u0631\u0629 ' + info.name);
    if (showAyahNum) refParts.push('\u0622\u064a\u0629 ' + info.ayah);
  } else {
    if (showAyahNum) refParts.push('\u0622\u064a\u0629 ' + info.ayah);
  }
  document.getElementById('verse-reference').textContent = refParts.join(' \u2022 ');

  // For identify method, show multiple choice options
  if (currentTestMethod === 'identify') {
    document.getElementById('btn-show-answer').style.display = 'none';
    showIdentifyOptions(info.surah, info.name);
  } else {
    // Hide answer section and show answer button
    document.getElementById('answer-section').style.display = 'none';
    document.getElementById('btn-show-answer').style.display = '';
  }

  // Show result area
  const resultDiv = document.getElementById('verse-result');
  resultDiv.classList.remove('show');
  void resultDiv.offsetWidth;
  resultDiv.classList.add('show');
}

function showIdentifyOptions(correctSurah, correctName) {
  const optionsDiv = document.getElementById('identify-options');
  const resultDiv = document.getElementById('identify-result');

  // Build 4 options: 1 correct + 3 random surahs
  const options = [{ surah: correctSurah, name: correctName }];
  const usedSurahs = new Set([correctSurah]);

  while (options.length < 4) {
    const randSurah = Math.floor(Math.random() * 114) + 1;
    if (!usedSurahs.has(randSurah)) {
      usedSurahs.add(randSurah);
      options.push({ surah: randSurah, name: QURAN_SURAHS[randSurah - 1].name });
    }
  }

  // Shuffle
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  let html = '<div class="identify-grid">';
  options.forEach(opt => {
    html += '<button class="identify-btn" onclick="checkIdentifyAnswer(' + opt.surah + ',' + correctSurah + ',this)">';
    html += '\u0633\u0648\u0631\u0629 ' + opt.name;
    html += '</button>';
  });
  html += '</div>';

  optionsDiv.innerHTML = html;
  optionsDiv.style.display = '';
  resultDiv.style.display = 'none';
  document.getElementById('answer-section').style.display = 'none';
}

function checkIdentifyAnswer(selectedSurah, correctSurah, btnEl) {
  const optionsDiv = document.getElementById('identify-options');
  const resultDiv = document.getElementById('identify-result');

  // Disable all buttons
  optionsDiv.querySelectorAll('.identify-btn').forEach(btn => {
    btn.disabled = true;
    btn.style.opacity = '0.6';
  });

  if (selectedSurah === correctSurah) {
    btnEl.style.background = '#27ae60';
    btnEl.style.color = '#fff';
    btnEl.style.opacity = '1';
    resultDiv.textContent = '\u2705 \u0625\u062c\u0627\u0628\u0629 \u0635\u062d\u064a\u062d\u0629!';
    resultDiv.style.color = '#27ae60';
  } else {
    btnEl.style.background = '#e74c3c';
    btnEl.style.color = '#fff';
    btnEl.style.opacity = '1';
    // Highlight correct answer
    optionsDiv.querySelectorAll('.identify-btn').forEach(btn => {
      if (btn.textContent.includes(QURAN_SURAHS[correctSurah - 1].name)) {
        btn.style.background = '#27ae60';
        btn.style.color = '#fff';
        btn.style.opacity = '1';
      }
    });
    resultDiv.textContent = '\u274c \u0625\u062c\u0627\u0628\u0629 \u062e\u0627\u0637\u0626\u0629 \u2014 \u0627\u0644\u0625\u062c\u0627\u0628\u0629 \u0627\u0644\u0635\u062d\u064a\u062d\u0629: \u0633\u0648\u0631\u0629 ' + QURAN_SURAHS[correctSurah - 1].name;
    resultDiv.style.color = '#e74c3c';
  }
  resultDiv.style.display = '';
}

function showAnswer() {
  if (currentQuestionIdx == null) return;

  if (currentTestMethod === 'continue') {
    // Show 5 consecutive ayahs
    document.getElementById('answer-label').textContent = '\u0627\u0644\u0622\u064a\u0627\u062a \u0627\u0644\u062a\u0627\u0644\u064a\u0629:';
    let html = '';
    for (let i = 1; i <= 5; i++) {
      const idx = currentQuestionIdx + i;
      if (idx > 6236) break; // don't go past end of Quran
      const info = getSurahAyahFromIndex(idx);
      const text = getVerseText(info.surah, info.ayah);
      html += '<div style="margin-bottom:12px">';
      html += '<div class="verse-text" style="font-size:inherit">\ufd3f ' + (text || '...') + ' \ufd3e</div>';
      html += '<div class="verse-reference">\u0633\u0648\u0631\u0629 ' + info.name + ' \u2022 \u0622\u064a\u0629 ' + info.ayah + '</div>';
      html += '</div>';
    }
    document.getElementById('answer-text').innerHTML = html;
    document.getElementById('answer-reference').textContent = '';
  } else if (currentTestMethod === 'previous') {
    const answerIdx = currentQuestionIdx - 1;
    const info = getSurahAyahFromIndex(answerIdx);
    const text = getVerseText(info.surah, info.ayah);
    document.getElementById('answer-label').textContent = '\u0627\u0644\u0622\u064a\u0629 \u0627\u0644\u0633\u0627\u0628\u0642\u0629:';
    document.getElementById('answer-text').textContent = '\ufd3f ' + (text || '...') + ' \ufd3e';
    document.getElementById('answer-reference').textContent = '\u0633\u0648\u0631\u0629 ' + info.name + ' \u0622\u064a\u0629 ' + info.ayah;
  } else if (currentTestMethod === 'skip2') {
    const answerIdx = currentQuestionIdx + 2;
    const info = getSurahAyahFromIndex(answerIdx);
    const text = getVerseText(info.surah, info.ayah);
    document.getElementById('answer-label').textContent = '\u0627\u0644\u0622\u064a\u0629 \u0628\u0639\u062f \u0622\u064a\u062a\u064a\u0646:';
    document.getElementById('answer-text').textContent = '\ufd3f ' + (text || '...') + ' \ufd3e';
    document.getElementById('answer-reference').textContent = '\u0633\u0648\u0631\u0629 ' + info.name + ' \u0622\u064a\u0629 ' + info.ayah;
  } else {
    return; // identify uses multiple choice, not showAnswer
  }

  document.getElementById('answer-section').style.display = '';
  document.getElementById('btn-show-answer').style.display = 'none';
}

function nextQuestion() {
  if (!currentTestMethod) return;
  generateQuestion();
}


document.addEventListener('DOMContentLoaded', () => {
  // Retry Supabase init if it failed earlier (CDN wasn't ready)
  if (!db && window.supabase) {
    try {
      db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } catch (e) {
      console.error('Supabase retry failed:', e);
    }
  }

  initTheme();
  initUserSelector();
  updateDashboard();

  // Load Quran verse text in background
  loadQuranText();

  // Populate surah dropdowns
  populateSurahDropdown('tasmee-rev-start-surah', 1);
  populateSurahDropdown('tasmee-rev-end-surah', 1);
  populateSurahDropdown('tasmee-new-start-surah', 1);
  populateSurahDropdown('tasmee-new-end-surah', 1);
  populateSurahDropdown('revision-start-surah', 1);
  populateSurahDropdown('revision-end-surah', 1);
  populateSurahDropdown('test-start-surah', 1);
  populateSurahDropdown('test-end-surah', 114);

  // Set default end ayah for test
  const endSurahVal = parseInt(document.getElementById('test-end-surah').value);
  if (endSurahVal && QURAN_SURAHS[endSurahVal - 1]) {
    document.getElementById('test-end-ayah').value = QURAN_SURAHS[endSurahVal - 1].ayahCount;
  }

  // Pre-fill today's date in all date inputs
  const today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(input => {
    input.value = today;
  });

  // Auto-select today's day name in Arabic (only day selectors, not user selector)
  const dayNames = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const todayName = dayNames[new Date().getDay()];
  document.querySelectorAll('select[id$="-day"]').forEach(sel => {
    for (let opt of sel.options) {
      if (opt.value === todayName) { sel.value = todayName; break; }
    }
  });
});
