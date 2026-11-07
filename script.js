/**
 * 認識校園樹朋友 - 國小二年級自然探索互動網站
 * 包含：樹木地圖探索、樹朋友詳細介紹、互動遊戲區（葉子連連看、小偵探隨堂測驗）、
 *       Web Audio API 童趣音效合成、Web Speech API 語音朗讀、圖片放大檢視器與彩帶特效
 */

// ==========================================
// 1. 五位樹朋友核心資料庫
// ==========================================
const TREES_DATA = [
  {
    id: "banyan",
    order: 1,
    shortName: "榕樹",
    displayName: "榕樹",
    emoji: "🧓",
    campusSpot: "📍 操場大樹區",
    nickname: "長鬍子的老爺爺",
    featuresText: "氣根（吸水長大變支柱根）、白色乳汁（保護自己）、隱頭果",
    featuresList: [
      "🧶 氣根：長鬍子會吸水，長大碰到地就變成「支柱根」撐住樹幹！",
      "🥛 白色乳汁：葉子或樹枝受傷時會流出白色乳汁「保護自己」！",
      "🟢 隱頭果：花藏在圓圓的小果實裡面，是小鳥最愛的點心！"
    ],
    leafText: "厚厚光澤卵圓葉（摸起來厚實、表面亮晶晶）",
    matchLeafTitle: "厚厚光澤卵圓葉",
    matchLeafDesc: "摸起來厚實、表面亮晶晶",
    matchFeatureTitle: "氣根變支柱根、白色乳汁",
    matchFeatureDesc: "氣根吸水長大、乳汁保護自己",
    image: "樹的圖檔/banyan_leaf_closeup.png",
    matchFeatureClue: "氣根變支柱根、白色乳汁保護自己、厚厚光澤卵圓葉",
    story: "嗨！我是校園裡的「榕樹」，大家都叫我「長鬍子的老爺爺」！我垂下來的鬍子叫做「氣根」，可以吸收空氣中的水分；長進土裡後還會變成強壯的「支柱根」喔！我的葉子是厚厚有光澤的卵圓葉，受傷時還會流出白色乳汁保護自己呢！",
    detectiveMission: "下次到操場旁找榕樹時，數一數祂有幾根垂下來的「氣根鬍子」？千萬別拉扯祂的鬍子喔！",
    funFact: "榕樹的小果實叫「隱頭果」，裡面藏著小小花朵，只有小小的榕果小蜂鑽得進去幫祂傳粉喔！"
  },
  {
    id: "bodhi",
    order: 2,
    shortName: "菩提樹",
    displayName: "菩提樹",
    emoji: "💚",
    campusSpot: "📍 愛心步道區",
    nickname: "帶小尾巴的愛心樹",
    featuresText: "滴水尖（雨水溜滑梯）、葉脈書籤、繽紛變裝",
    featuresList: [
      "💧 滴水尖：愛心形狀的葉子前端有長長的「小尾巴」，讓雨水像溜滑梯一樣快快滴落！",
      "🔖 葉脈書籤：葉脈像細緻的網子一樣清楚，可以做成漂亮的葉脈書籤！",
      "🎨 繽紛變裝：新長出來的嫩葉是粉紅或淡紅色的，長大才變成翠綠色喔！"
    ],
    leafText: "愛心形狀葉片＋長長的「滴水尖」小尾巴",
    matchLeafTitle: "愛心葉片＋長長「滴水尖」",
    matchLeafDesc: "前端有像小尾巴的雨水溜滑梯",
    matchFeatureTitle: "滴水尖、葉脈書籤、繽紛變裝",
    matchFeatureDesc: "雨水順著小尾巴滴落、可做書籤",
    image: "樹的圖檔/bodhi_leaf_closeup.png",
    matchFeatureClue: "愛心葉片有長長的「滴水尖」（雨水溜滑梯）、可做葉脈書籤",
    story: "哈囉！我是溫柔的「菩提樹」，外號是「帶小尾巴的愛心樹」！仔細看我的葉子，長得像一顆大愛心，前面還拖著一條細細長長的「滴水尖」，下雨時雨水會順著小尾巴溜滑梯滴下去，葉子才不會發霉喔！",
    detectiveMission: "撿一片掉在地上的菩提樹落葉，摸摸看前端長長的「滴水尖」小尾巴有多長吧！",
    funFact: "春天時，菩提樹會先落葉再長出粉嫩紅色的嫩葉，整棵樹就像換了一件彩色新衣服，這就是「繽紛變裝」！"
  },
  {
    id: "casuarina",
    order: 3,
    shortName: "木麻黃",
    displayName: "木麻黃",
    emoji: "🛡️",
    campusSpot: "📍 圍牆防風林",
    nickname: "隱形葉子的防風衛兵",
    featuresText: "綠色小枝防風、海邊防風林",
    featuresList: [
      "🌿 綠色小枝防風：看起來像松針的綠色細條其實是「綠色小枝」，真正的葉子退化成小小鱗片藏在節上！",
      "🌊 海邊防風林：不怕強風、不怕鹽分與乾旱，是守護海邊與校園的「防風衛兵」！",
      "🌰 小毬果：會結出像小木頭鳳梨一樣刺刺圓圓的果實喔！"
    ],
    leafText: "細細一節一節的「綠色小枝」（真葉退化成微小齒狀鱗片）",
    matchLeafTitle: "一節一節的「綠色小枝」",
    matchLeafDesc: "真葉退化成微小齒狀鱗片",
    matchFeatureTitle: "綠色小枝防風、海邊防風林",
    matchFeatureDesc: "不怕強風與海沙的防風衛兵",
    image: "樹的圖檔/casuarina_leaf_closeup.png",
    matchFeatureClue: "一節一節的「綠色小枝防風」，是海邊防風林的衛兵",
    story: "立正敬禮！我是勇敢的「木麻黃」，外號是「隱形葉子的防風衛兵」！你看到一絲一絲綠綠的，其實是我的「綠色小枝」喔！我把真正的葉子縮小藏起來，這樣大風吹過來才不會受傷，還能幫大家擋住大風沙！",
    detectiveMission: "撿一根地上的木麻黃綠色小枝，輕輕拉開一節，用放大鏡找找看節上面小小一圈像皇冠齒狀的「隱形真葉」！",
    funFact: "台灣海邊種了好多木麻黃，因為祂能擋住強烈的海風和飛沙，保護農田和學校！"
  },
  {
    id: "soapberry",
    order: 4,
    shortName: "無患子",
    displayName: "無患子",
    emoji: "🫧",
    campusSpot: "📍 生態泡泡園",
    nickname: "天然洗手泡泡樹",
    featuresText: "果皮含皂素（加水搓泡泡）、黑色硬果核",
    featuresList: [
      "🫧 果皮含皂素：金黃色果皮裡有天然「皂素」，加一點水搓一搓就會冒出綿密泡泡，可以洗手！",
      "⚫ 黑色硬果核：剝開果皮後，裡面有一顆圓滾滾、烏黑堅硬的種子，以前的小朋友都拿來打彈珠！"
    ],
    leafText: "羽狀複葉（許多小葉像羽毛一樣排成兩排，秋天會變金黃色）",
    matchLeafTitle: "羽毛般的「羽狀複葉」",
    matchLeafDesc: "小葉排成兩排、秋冬轉金黃色",
    matchFeatureTitle: "果皮含皂素、黑色硬果核",
    matchFeatureDesc: "果皮加水搓揉會冒出洗手泡泡",
    image: "樹的圖檔/soapberry_leaf_closeup.png",
    matchFeatureClue: "果皮含皂素（加水搓泡泡）、裡面有黑色硬果核",
    story: "泡泡來囉！我是神奇的「無患子」，外號是「天然洗手泡泡樹」！以前還沒有肥皂的時候，阿公阿嬤都是撿我的果實，用含有「皂素」的果皮加水搓出泡泡來洗手、洗衣服喔！果實裡面還有一顆黑亮堅硬的果核呢！",
    detectiveMission: "觀察無患子的葉子，看看是不是好多片小葉子像羽毛一樣排在一起？到了秋冬葉子還會變成漂亮的金黃色喔！",
    funFact: "無患子黑色的硬果核又圓又硬，古時候的人會把果核串起來做成念珠，或是給小朋友當天然彈珠玩！"
  },
  {
    id: "almond",
    order: 5,
    shortName: "小葉欖仁",
    displayName: "小葉欖仁",
    emoji: "☂️",
    campusSpot: "📍 林蔭綠傘道",
    nickname: "層層疊疊的大綠傘",
    featuresText: "分層輪生枝條、四季變幻",
    featuresList: [
      "☂️ 分層輪生枝條：樹枝一層一層平平地往外伸展，遠遠看就像一把把撐開的大綠傘！",
      "🍂 四季變幻：春天冒出翠綠新芽、夏天像涼爽綠傘、秋冬葉子轉黃掉落，四季都有不同美感！"
    ],
    leafText: "提琴形倒卵葉（前端寬圓、下方窄，小巧可愛像小提琴）",
    matchLeafTitle: "提琴形倒卵葉",
    matchLeafDesc: "前端寬圓、下方窄，像小提琴",
    matchFeatureTitle: "分層輪生枝條、四季變幻",
    matchFeatureDesc: "樹枝層層平展，像一把大綠傘",
    image: "樹的圖檔/madagascar_almond_leaf_closeup.png",
    matchFeatureClue: "分層輪生枝條像大綠傘、四季變幻、提琴形倒卵葉",
    story: "歡迎光臨！我是優雅的「小葉欖仁」，外號是「層層疊疊的大綠傘」！抬頭看看我的樹枝，是一層一層平平地展開，叫做「分層輪生枝條」，就像一頂頂大綠傘幫大家遮太陽！我的葉子前面圓寬、後面窄，是可愛的「提琴形倒卵葉」喔！",
    detectiveMission: "站在小葉欖仁樹下往上看，數數看這棵樹總共有幾層「大綠傘」枝條吧！",
    funFact: "小葉欖仁的葉子小小一片，擠在細枝末端，陽光從葉縫灑下來時，地上會有超漂亮的星星光影喔！"
  }
];

// ==========================================
// 2. 小偵探隨堂測驗題庫 (每次抽 3 題，涵蓋 5 位樹朋友)
// ==========================================
const QUIZ_POOL = [
  {
    id: "q1",
    treeId: "banyan",
    image: "樹的圖檔/banyan_leaf_closeup.png",
    question: "哪一位樹朋友外號叫「長鬍子的老爺爺」，有會變成支柱根的「氣根」和白色乳汁？",
    options: ["🧓 榕樹", "💚 菩提樹", "🫧 無患子"],
    answerIndex: 0,
    explanation: "答對了！榕樹垂下來的「氣根」像長鬍子，長大碰到地會變成支柱根，受傷還有白色乳汁保護自己喔！"
  },
  {
    id: "q2",
    treeId: "bodhi",
    image: "樹的圖檔/bodhi_leaf_closeup.png",
    question: "這片愛心形狀的葉子，前端有一條長長的「滴水尖」讓雨水溜滑梯，請問是哪位樹朋友？",
    options: ["🛡️ 木麻黃", "💚 菩提樹", "☂️ 小葉欖仁"],
    answerIndex: 1,
    explanation: "太棒了！菩提樹是「帶小尾巴的愛心樹」，葉子前端的「滴水尖」能幫雨水快快溜滑梯滴下去！"
  },
  {
    id: "q3",
    treeId: "soapberry",
    image: "樹的圖檔/soapberry_leaf_closeup.png",
    question: "哪一位樹朋友是「天然洗手泡泡樹」，果皮含有皂素，加水搓一搓就會冒泡泡？",
    options: ["☂️ 小葉欖仁", "🧓 榕樹", "🫧 無患子"],
    answerIndex: 2,
    explanation: "完全正確！無患子的果皮含有天然「皂素」，加水搓揉就能起泡洗手，裡面還有黑色的硬果核！"
  },
  {
    id: "q4",
    treeId: "casuarina",
    image: "樹的圖檔/casuarina_leaf_closeup.png",
    question: "外號「隱形葉子的防風衛兵」，用一節一節的「綠色小枝」在海邊和校園擋風的是誰？",
    options: ["🛡️ 木麻黃", "🫧 無患子", "💚 菩提樹"],
    answerIndex: 0,
    explanation: "好厲害！木麻黃的綠色細條是「綠色小枝」，真正的葉子退化成小小鱗片，是超強的海邊防風衛兵！"
  },
  {
    id: "q5",
    treeId: "almond",
    image: "樹的圖檔/madagascar_almond_leaf_closeup.png",
    question: "枝條「分層輪生」像一把層層疊疊的大綠傘，而且葉子是「提琴形倒卵葉」的是哪位樹朋友？",
    options: ["🧓 榕樹", "☂️ 小葉欖仁", "🛡️ 木麻黃"],
    answerIndex: 1,
    explanation: "答對囉！小葉欖仁有分層輪生的枝條，就像層層疊疊的大綠傘，葉子還是可愛的提琴形倒卵葉喔！"
  }
];

// ==========================================
// 3. 全域狀態管理
// ==========================================
let soundEnabled = true;
let audioCtx = null;
const visitedTrees = new Set();

// 連連看狀態
let matchMode = "image"; // 'image' | 'feature'
let selectedLeftId = null;
let selectedRightId = null;
let matchedPairs = new Set();
let isDraggingLine = false;
let dragStartSide = null; // 'left' | 'right'
let dragStartTreeId = null;
let dragTempLine = null;

// 測驗狀態
let currentQuizQuestions = [];
let currentQuizIndex = 0;
let quizAnsweredCount = 0;
let currentLightboxTree = null;

// ==========================================
// 4. Web Audio API 童趣音效與語音朗讀
// ==========================================
function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSound(type) {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  if (type === "pop") {
    // 輕快點擊啵啵聲
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  } else if (type === "flip") {
    // 卡片翻面音效
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(640, now + 0.14);
    gain.gain.setValueAtTime(0.16, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  } else if (type === "zoom") {
    // 放大鏡叮咚聲
    [659.25, 880].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);
      gain.gain.setValueAtTime(0.14, now + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.15);
    });
  } else if (type === "success") {
    // 答對或連線成功音效 (Do-Mi-Sol-Do)
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + idx * 0.075);
      gain.gain.setValueAtTime(0.18, now + idx * 0.075);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.075 + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.075);
      osc.stop(now + idx * 0.075 + 0.22);
    });
  } else if (type === "wrong") {
    // 答錯溫和提示音
    const notes = [330, 261.63];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);
      gain.gain.setValueAtTime(0.16, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.18);
    });
  } else if (type === "fanfare") {
    // 獲得成功勳章勝利樂音
    const melody = [
      { f: 523.25, t: 0, d: 0.14 },
      { f: 659.25, t: 0.12, d: 0.14 },
      { f: 783.99, t: 0.24, d: 0.14 },
      { f: 1046.5, t: 0.38, d: 0.35 },
      { f: 783.99, t: 0.58, d: 0.14 },
      { f: 1046.5, t: 0.74, d: 0.45 }
    ];
    melody.forEach((n) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(n.f, now + n.t);
      gain.gain.setValueAtTime(0.22, now + n.t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + n.t);
      osc.stop(now + n.t + n.d);
    });
  }
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  const btn = document.getElementById("soundToggleBtn");
  const icon = document.getElementById("soundIcon");
  const label = document.getElementById("soundLabel");

  if (soundEnabled) {
    btn.classList.remove("muted");
    icon.textContent = "🔊";
    label.textContent = "音效開啟";
    playSound("pop");
  } else {
    btn.classList.add("muted");
    icon.textContent = "🔇";
    label.textContent = "音效靜音";
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }
}

function speakText(text) {
  playSound("pop");
  if (!soundEnabled) return;
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "zh-TW";
  utter.rate = 0.95; // 適合國小二年級小朋友聆聽的溫和語速
  utter.pitch = 1.08;
  window.speechSynthesis.speak(utter);
}

// ==========================================
// 5. 分頁導覽與認識星星進度更新
// ==========================================
function switchPage(pageKey, focusTreeId = null) {
  playSound("pop");
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  document.querySelectorAll(".nav-tab").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.target === pageKey);
  });

  document.querySelectorAll(".page-section").forEach((sec) => {
    sec.classList.remove("active");
  });

  const targetSec = document.getElementById(`page-${pageKey}`);
  if (targetSec) {
    targetSec.classList.add("active");
  }

  if (pageKey === "details") {
    if (focusTreeId) {
      markTreeVisited(focusTreeId);
      filterDetailCards(focusTreeId, false);
      setTimeout(() => {
        const el = document.getElementById(`detail-card-${focusTreeId}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 80);
    } else {
      filterDetailCards("all", false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  } else if (pageKey === "games") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(redrawMatchLines, 60);
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function markTreeVisited(treeId) {
  visitedTrees.add(treeId);
  // 更新頂部星星列
  document.querySelectorAll(".star-slot").forEach((star) => {
    if (visitedTrees.has(star.dataset.treeStar)) {
      star.classList.add("collected");
    }
  });
  const counterEl = document.getElementById("progressCounterText");
  if (counterEl) {
    counterEl.textContent = `已認識 ${visitedTrees.size} / 5 位樹朋友`;
  }
  // 更新首頁卡片上的已探索標籤
  const badge = document.getElementById(`home-visited-${treeId}`);
  if (badge) {
    badge.textContent = "⭐ 已認識！";
    badge.classList.add("done");
  }
}

// ==========================================
// 6. 分頁 1：渲染校園樹木探索地圖與 5 張翻轉卡片
// ==========================================
function renderHomeMapAndCards() {
  const mapStage = document.getElementById("campusMapStage");
  const cardsGrid = document.getElementById("homeCardsGrid");

  mapStage.innerHTML = TREES_DATA.map((tree) => `
    <button class="map-pin-btn" onclick="switchPage('details', '${tree.id}')" aria-label="探索${tree.displayName}">
      <span class="pin-location-tag">${tree.campusSpot}</span>
      <img class="pin-avatar" src="${tree.image}" alt="${tree.displayName}葉子特寫" />
      <span class="pin-name">${tree.emoji} ${tree.shortName}</span>
      <span class="pin-nick">「${tree.nickname}」</span>
    </button>
  `).join("");

  cardsGrid.innerHTML = TREES_DATA.map((tree) => `
    <div class="flip-card" id="home-flip-${tree.id}">
      <div class="flip-card-inner">
        <!-- 正面 -->
        <div class="flip-card-front">
          <div class="card-top-bar">
            <span class="tree-number-badge">樹朋友 #${tree.order}</span>
            <span class="visited-badge" id="home-visited-${tree.id}">🌱 點我去認識</span>
          </div>

          <div class="home-card-thumb-wrap" onclick="openLightbox('${tree.id}', event)" title="點擊放大檢視葉子">
            <img class="home-card-thumb" src="${tree.image}" alt="${tree.displayName}葉子特寫圖" />
            <span class="zoom-pill">🔍 點擊放大看葉子</span>
          </div>

          <h3 class="home-card-title">${tree.emoji} ${tree.displayName}</h3>
          <div class="home-card-nickname">✨ 外號：${tree.nickname}</div>

          <div class="card-action-row">
            <button class="btn-flip" onclick="toggleHomeCardFlip('${tree.id}', event)">
              🔄 翻面看特徵
            </button>
            <button class="btn-explore" onclick="switchPage('details', '${tree.id}')">
              📖 詳細介紹 ➡️
            </button>
          </div>
        </div>

        <!-- 背面 -->
        <div class="flip-card-back">
          <div class="card-top-bar">
            <span class="tree-number-badge">${tree.emoji} ${tree.displayName}的小秘密</span>
            <button class="btn-speak" style="padding: 4px 12px; font-size: 0.9rem;" onclick="speakText('${tree.displayName}，外號是${tree.nickname}。特徵有：${tree.featuresText}。葉子是：${tree.leafText}')">
              🔊 聽介紹
            </button>
          </div>

          <div class="back-secret-box">
            <div class="back-secret-title">🔎 小偵探快速筆記：</div>
            <ul class="back-secret-list">
              <li><strong>🏷️ 外號：</strong>${tree.nickname}</li>
              <li><strong>🌟 特徵：</strong>${tree.featuresText}</li>
              <li><strong>🍃 葉子：</strong>${tree.leafText}</li>
            </ul>
          </div>

          <div class="card-action-row">
            <button class="btn-flip" onclick="toggleHomeCardFlip('${tree.id}', event)">
              ↩️ 翻回正面
            </button>
            <button class="btn-explore" onclick="switchPage('details', '${tree.id}')">
              📖 去圖鑑看大圖 ➡️
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

function toggleHomeCardFlip(treeId, event) {
  if (event) event.stopPropagation();
  playSound("flip");
  markTreeVisited(treeId);
  const card = document.getElementById(`home-flip-${treeId}`);
  if (card) {
    card.classList.toggle("flipped");
  }
}

// ==========================================
// 7. 分頁 2：渲染 5 個樹朋友詳細介紹卡片
// ==========================================
function renderDetailCards() {
  const listEl = document.getElementById("detailCardsList");
  listEl.innerHTML = TREES_DATA.map((tree) => `
    <article class="detail-card-wrapper" id="detail-card-${tree.id}" data-tree-id="${tree.id}">
      <div class="detail-card-inner">
        <!-- 詳細卡正面 -->
        <div class="detail-card-front">
          <div class="detail-grid">
            <!-- 左側：圖片展示區 -->
            <div>
              <div class="detail-image-box" onclick="openLightbox('${tree.id}', event)">
                <img src="${tree.image}" alt="${tree.displayName} - ${tree.leafText}" />
                <button type="button" class="detail-zoom-btn">
                  🔍 點擊放大檢視「${tree.shortName}」葉子特寫
                </button>
              </div>
            </div>

            <!-- 右側：文字介紹區 -->
            <div class="detail-info">
              <div class="detail-header-row">
                <div class="detail-name-group">
                  <span class="tree-number-badge">第 ${tree.order} 號樹朋友</span>
                  <h3 class="detail-name">${tree.emoji} ${tree.displayName}</h3>
                  <span class="detail-nickname">外號：「${tree.nickname}」</span>
                </div>
              </div>

              <div class="detail-feature-cards">
                <div class="feature-item">
                  <div class="feature-label">🌟 重要特徵</div>
                  <div class="feature-text">${tree.featuresText}</div>
                </div>
                <div class="feature-item leaf-highlight">
                  <div class="feature-label">🍃 葉子觀察重點</div>
                  <div class="feature-text">${tree.leafText}</div>
                </div>
              </div>

              <ul class="back-secret-list">
                ${tree.featuresList.map((f) => `<li>${f}</li>`).join("")}
              </ul>

              <p class="detail-story-p">
                💬 <strong>${tree.displayName}說：</strong>「${tree.story}」
              </p>

              <div class="detail-actions">
                <button class="btn-speak" onclick="markTreeVisited('${tree.id}'); speakText('${tree.story}')">
                  🔊 唸故事給我聽
                </button>
                <button class="btn-detail-zoom" onclick="openLightbox('${tree.id}', event)">
                  🔍 放大看葉子照片
                </button>
                <button class="btn-detail-flip" onclick="toggleDetailCardFlip('${tree.id}')">
                  🔄 翻面看小偵探任務
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 詳細卡背面：小偵探觀察任務與趣味知識 -->
        <div class="detail-card-back">
          <div class="detail-back-content">
            <div class="detail-back-header">
              <h3>🕵️ ${tree.emoji} ${tree.displayName}（${tree.nickname}）小偵探秘密檔案</h3>
              <button class="btn-speak" onclick="speakText('${tree.detectiveMission}。你知道嗎？${tree.funFact}')">
                🔊 唸秘密檔案
              </button>
            </div>

            <div class="detail-back-grid">
              <div class="mission-box">
                <h4>🧭 校園觀察小任務</h4>
                <p>${tree.detectiveMission}</p>
              </div>
              <div class="mission-box">
                <h4>💡 樹博士趣味小百科</h4>
                <p>${tree.funFact}</p>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
              <span style="font-weight: 900; color: var(--green-dark); font-size: 1.1rem;">
                ✅ 太棒了！你已經認識「${tree.displayName}」囉！
              </span>
              <button class="btn-detail-flip" onclick="toggleDetailCardFlip('${tree.id}')">
                ↩️ 翻回正面看葉子與特徵
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  `).join("");
}

function toggleDetailCardFlip(treeId) {
  playSound("flip");
  markTreeVisited(treeId);
  const wrapper = document.getElementById(`detail-card-${treeId}`);
  if (wrapper) {
    wrapper.classList.toggle("flipped");
  }
}

function filterDetailCards(filterKey, playClick = true) {
  if (playClick) playSound("pop");
  if (filterKey !== "all") {
    markTreeVisited(filterKey);
  }

  document.querySelectorAll(".filter-pill").forEach((pill) => {
    pill.classList.toggle("active", pill.dataset.filter === filterKey);
  });

  document.querySelectorAll(".detail-card-wrapper").forEach((card) => {
    card.classList.remove("flipped");
    if (filterKey === "all" || card.dataset.treeId === filterKey) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// ==========================================
// 8. 圖片放大檢視器 (Lightbox Modal)
// ==========================================
function openLightbox(treeId, event) {
  if (event) event.stopPropagation();
  const tree = TREES_DATA.find((t) => t.id === treeId);
  if (!tree) return;

  playSound("zoom");
  markTreeVisited(treeId);
  currentLightboxTree = tree;

  const modal = document.getElementById("lightboxModal");
  const title = document.getElementById("lightboxTitle");
  const img = document.getElementById("lightboxImage");
  const caption = document.getElementById("lightboxCaption");

  title.textContent = `🔍 ${tree.emoji} ${tree.displayName}（${tree.nickname}）葉子放大檢視`;
  img.src = tree.image;
  img.alt = `${tree.displayName}葉子特寫`;
  img.classList.remove("zoomed");
  caption.textContent = `🍃 葉子與特徵：${tree.leafText}｜${tree.featuresText}`;

  modal.classList.add("open");
}

function toggleLightboxZoom() {
  playSound("pop");
  const img = document.getElementById("lightboxImage");
  if (img) {
    img.classList.toggle("zoomed");
  }
}

function speakLightboxDescription() {
  if (!currentLightboxTree) return;
  speakText(
    `${currentLightboxTree.displayName}，外號是${currentLightboxTree.nickname}。請仔細看圖片，祂的葉子與特徵是：${currentLightboxTree.leafText}，還有${currentLightboxTree.featuresText}。`
  );
}

function closeLightbox() {
  playSound("pop");
  const modal = document.getElementById("lightboxModal");
  if (modal) modal.classList.remove("open");
}

function handleLightboxBackdrop(e) {
  if (e.target.id === "lightboxModal") {
    closeLightbox();
  }
}

// ==========================================
// 9. 分頁 3：互動遊戲區切換与【遊戲一：葉子連連看】
// ==========================================
function switchGameTab(gameKey) {
  playSound("pop");
  document.getElementById("tabBtnMatch").classList.toggle("active", gameKey === "match");
  document.getElementById("tabBtnQuiz").classList.toggle("active", gameKey === "quiz");

  document.getElementById("game-panel-match").classList.toggle("active", gameKey === "match");
  document.getElementById("game-panel-quiz").classList.toggle("active", gameKey === "quiz");

  if (gameKey === "match") {
    setTimeout(redrawMatchLines, 50);
  }
}

function setMatchMode(mode) {
  matchMode = mode;
  document.getElementById("matchModeImgBtn").classList.toggle("active", mode === "image");
  document.getElementById("matchModeTextBtn").classList.toggle("active", mode === "feature");
  initMatchingGame();
}

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function initMatchingGame() {
  playSound("pop");
  selectedLeftId = null;
  selectedRightId = null;
  matchedPairs.clear();

  const banner = document.getElementById("matchCompleteBanner");
  if (banner) banner.classList.remove("show");

  const leftItems = shuffleArray(TREES_DATA);
  const rightItems = shuffleArray(TREES_DATA);

  const leftCol = document.getElementById("matchLeftColumn");
  const rightCol = document.getElementById("matchRightColumn");

  leftCol.innerHTML = leftItems.map((tree) => {
    if (matchMode === "image") {
      return `
        <div class="match-card match-card-left" id="match-left-${tree.id}" data-side="left" data-tree-id="${tree.id}"
             onclick="handleMatchCardClick('left', '${tree.id}')"
             onpointerdown="handleMatchPointerDown(event, 'left', '${tree.id}')">
          <div class="match-leaf-thumb-wrap">
            <img class="match-leaf-thumb" src="${tree.image}" alt="神秘葉子特寫" />
            <button type="button" class="mini-zoom-btn" onclick="openLightbox('${tree.id}', event)" title="放大看葉子">🔍</button>
          </div>
          <div class="match-card-content match-left-text">
            <div class="match-card-title">${tree.matchLeafTitle}</div>
            <div class="match-leaf-tag">${tree.matchLeafDesc}</div>
          </div>
          <div class="connect-dot dot-right-edge" id="dot-left-${tree.id}"></div>
        </div>
      `;
    } else {
      return `
        <div class="match-card match-card-left" id="match-left-${tree.id}" data-side="left" data-tree-id="${tree.id}"
             onclick="handleMatchCardClick('left', '${tree.id}')"
             onpointerdown="handleMatchPointerDown(event, 'left', '${tree.id}')">
          <div class="match-tree-badge-icon clue-icon">✨</div>
          <div class="match-card-content match-left-text">
            <div class="match-card-title">${tree.matchFeatureTitle}</div>
            <div class="match-leaf-tag">${tree.matchFeatureDesc}</div>
          </div>
          <div class="connect-dot dot-right-edge" id="dot-left-${tree.id}"></div>
        </div>
      `;
    }
  }).join("");

  rightCol.innerHTML = rightItems.map((tree) => `
    <div class="match-card match-card-right" id="match-right-${tree.id}" data-side="right" data-tree-id="${tree.id}"
         onclick="handleMatchCardClick('right', '${tree.id}')"
         onpointerdown="handleMatchPointerDown(event, 'right', '${tree.id}')">
      <div class="connect-dot dot-left-edge" id="dot-right-${tree.id}"></div>
      <div class="match-card-content match-right-text">
        <div class="match-card-title">${tree.displayName}</div>
        <div class="match-nickname-tag">外號：「${tree.nickname}」</div>
      </div>
      <div class="match-tree-badge-icon">${tree.emoji}</div>
    </div>
  `).join("");

  redrawMatchLines();
}

function handleMatchCardClick(side, treeId) {
  if (matchedPairs.has(treeId)) return;
  playSound("pop");

  if (side === "left") {
    selectedLeftId = selectedLeftId === treeId ? null : treeId;
  } else {
    selectedRightId = selectedRightId === treeId ? null : treeId;
  }

  updateMatchSelectionUI();

  if (selectedLeftId && selectedRightId) {
    checkMatchAttempt(selectedLeftId, selectedRightId);
  }
}

function updateMatchSelectionUI() {
  document.querySelectorAll("#matchLeftColumn .match-card").forEach((el) => {
    el.classList.toggle("selected", el.dataset.treeId === selectedLeftId);
  });
  document.querySelectorAll("#matchRightColumn .match-card").forEach((el) => {
    el.classList.toggle("selected", el.dataset.treeId === selectedRightId);
  });
}

function checkMatchAttempt(leftId, rightId) {
  const leftCard = document.getElementById(`match-left-${leftId}`);
  const rightCard = document.getElementById(`match-right-${rightId}`);

  if (leftId === rightId) {
    // 配對成功！
    playSound("success");
    matchedPairs.add(leftId);
    selectedLeftId = null;
    selectedRightId = null;
    updateMatchSelectionUI();

    if (leftCard) leftCard.classList.add("matched");
    if (rightCard) rightCard.classList.add("matched");

    redrawMatchLines();

    if (matchedPairs.size === TREES_DATA.length) {
      setTimeout(() => {
        playSound("fanfare");
        launchConfetti();
        const banner = document.getElementById("matchCompleteBanner");
        if (banner) {
          banner.classList.add("show");
          banner.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 300);
    }
  } else {
    // 配對錯誤：搖晃卡片提示再試一次
    playSound("wrong");
    if (leftCard) leftCard.classList.add("wrong-shake");
    if (rightCard) rightCard.classList.add("wrong-shake");

    setTimeout(() => {
      if (leftCard) leftCard.classList.remove("wrong-shake");
      if (rightCard) rightCard.classList.remove("wrong-shake");
      selectedLeftId = null;
      selectedRightId = null;
      updateMatchSelectionUI();
    }, 460);
  }
}

// 支援平板與電腦按住拖曳連線 (Pointer Dragging)
function handleMatchPointerDown(e, side, treeId) {
  if (e.target.closest(".mini-zoom-btn")) return;
  if (matchedPairs.has(treeId)) return;

  isDraggingLine = true;
  dragStartSide = side;
  dragStartTreeId = treeId;

  const svg = document.getElementById("matchSvgLayer");
  const startPos = getDotCenterPos(side, treeId);
  if (!startPos || !svg) return;

  dragTempLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
  dragTempLine.setAttribute("x1", startPos.x);
  dragTempLine.setAttribute("y1", startPos.y);
  dragTempLine.setAttribute("x2", startPos.x);
  dragTempLine.setAttribute("y2", startPos.y);
  dragTempLine.setAttribute("stroke", "#ff7043");
  dragTempLine.setAttribute("stroke-width", "6");
  dragTempLine.setAttribute("stroke-dasharray", "10,6");
  dragTempLine.setAttribute("stroke-linecap", "round");
  svg.appendChild(dragTempLine);
}

window.addEventListener("pointermove", (e) => {
  if (!isDraggingLine || !dragTempLine) return;
  const board = document.getElementById("matchBoardContainer");
  if (!board) return;
  const rect = board.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  dragTempLine.setAttribute("x2", x);
  dragTempLine.setAttribute("y2", y);
});

window.addEventListener("pointerup", (e) => {
  if (!isDraggingLine) return;
  isDraggingLine = false;

  if (dragTempLine) {
    dragTempLine.remove();
    dragTempLine = null;
  }

  const targetEl = document.elementFromPoint(e.clientX, e.clientY);
  const dropCard = targetEl ? targetEl.closest(".match-card") : null;

  if (dropCard) {
    const dropSide = dropCard.dataset.side;
    const dropTreeId = dropCard.dataset.treeId;
    if (dropSide && dropSide !== dragStartSide && !matchedPairs.has(dropTreeId)) {
      if (dragStartSide === "left") {
        checkMatchAttempt(dragStartTreeId, dropTreeId);
      } else {
        checkMatchAttempt(dropTreeId, dragStartTreeId);
      }
    }
  }

  dragStartSide = null;
  dragStartTreeId = null;
});

function getDotCenterPos(side, treeId) {
  const board = document.getElementById("matchBoardContainer");
  const dot = document.getElementById(`dot-${side}-${treeId}`);
  if (!board || !dot) return null;

  const boardRect = board.getBoundingClientRect();
  const dotRect = dot.getBoundingClientRect();
  return {
    x: dotRect.left - boardRect.left + dotRect.width / 2,
    y: dotRect.top - boardRect.top + dotRect.height / 2
  };
}

function redrawMatchLines() {
  const svg = document.getElementById("matchSvgLayer");
  if (!svg) return;
  svg.innerHTML = "";

  const colors = ["#2e7d32", "#f57f17", "#0288d1", "#8e24aa", "#d84315"];
  let colorIdx = 0;

  matchedPairs.forEach((treeId) => {
    const p1 = getDotCenterPos("left", treeId);
    const p2 = getDotCenterPos("right", treeId);
    if (!p1 || !p2) return;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const midX = (p1.x + p2.x) / 2;
    const d = `M ${p1.x} ${p1.y} C ${midX} ${p1.y}, ${midX} ${p2.y}, ${p2.x} ${p2.y}`;
    path.setAttribute("d", d);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", colors[colorIdx % colors.length]);
    path.setAttribute("stroke-width", "7");
    path.setAttribute("stroke-linecap", "round");
    svg.appendChild(path);
    colorIdx++;
  });
}

window.addEventListener("resize", () => {
  redrawMatchLines();
});

// ==========================================
// 10. 分頁 3：【遊戲二：小偵探隨堂測驗】
// ==========================================
function initQuizGame() {
  playSound("pop");
  // 從 5 題題庫隨機挑選 3 題單選題
  currentQuizQuestions = shuffleArray(QUIZ_POOL).slice(0, 3);
  currentQuizIndex = 0;
  quizAnsweredCount = 0;

  document.getElementById("quizActiveArea").style.display = "block";
  document.getElementById("quizMedalCard").classList.remove("show");

  renderQuizStep();
}

function renderQuizStep() {
  const pillsContainer = document.getElementById("quizStepPills");
  pillsContainer.innerHTML = currentQuizQuestions.map((_, idx) => {
    let cls = "q-step-dot";
    if (idx < currentQuizIndex) cls += " correct";
    else if (idx === currentQuizIndex) cls += " current";
    return `<span class="${cls}">第 ${idx + 1} 題</span>`;
  }).join("");

  const q = currentQuizQuestions[currentQuizIndex];
  const cardEl = document.getElementById("quizQuestionCard");

  cardEl.innerHTML = `
    <div class="quiz-q-layout">
      <div>
        <img class="quiz-q-image" src="${q.image}" alt="題目葉子提示圖" onclick="openLightbox('${q.treeId}', event)" title="點擊放大觀察葉子" />
        <div style="text-align: center; margin-top: 8px;">
          <button type="button" class="mode-btn" style="font-size: 0.9rem; padding: 4px 12px;" onclick="openLightbox('${q.treeId}', event)">
            🔍 放大看線索圖
          </button>
        </div>
      </div>

      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 10px; flex-wrap: wrap;">
          <span class="tree-number-badge">🕵️ 第 ${currentQuizIndex + 1} / 3 題</span>
          <button type="button" class="btn-speak" style="padding: 6px 16px; font-size: 0.98rem;" onclick="speakText('${q.question}')">
            🔊 唸題目給我聽
          </button>
        </div>

        <h3 class="quiz-q-text">${q.question}</h3>

        <div class="quiz-options-grid" id="quizOptionsGrid">
          ${q.options.map((opt, idx) => `
            <button type="button" class="quiz-option-btn" id="quiz-opt-${idx}" onclick="handleQuizAnswer(${idx})">
              <span style="background: var(--yellow-bright); color: var(--green-dark); width: 38px; height: 38px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;">
                ${idx + 1}
              </span>
              <span>${opt}</span>
            </button>
          `).join("")}
        </div>

        <div id="quizFeedbackBox" class="quiz-feedback-box"></div>
      </div>
    </div>
  `;
}

function handleQuizAnswer(selectedIndex) {
  const q = currentQuizQuestions[currentQuizIndex];
  const feedbackBox = document.getElementById("quizFeedbackBox");
  const selectedBtn = document.getElementById(`quiz-opt-${selectedIndex}`);

  if (selectedIndex === q.answerIndex) {
    // 答對了！
    playSound("success");
    selectedBtn.classList.add("correct");

    // 鎖定所有選項按鈕
    document.querySelectorAll(".quiz-option-btn").forEach((btn) => {
      btn.disabled = true;
    });

    const isLastQuestion = currentQuizIndex === currentQuizQuestions.length - 1;
    feedbackBox.className = "quiz-feedback-box show good";
    feedbackBox.innerHTML = `
      <div style="flex: 1;">🎉 ${q.explanation}</div>
      <button type="button" class="btn-explore" style="flex: 0 0 auto; padding: 12px 24px;" onclick="nextQuizQuestion()">
        ${isLastQuestion ? "🏅 領取成功勳章！" : "下一題 ➡️"}
      </button>
    `;
  } else {
    // 答錯了：溫柔鼓勵小朋友再選一次
    playSound("wrong");
    selectedBtn.classList.add("wrong");
    selectedBtn.disabled = true;

    feedbackBox.className = "quiz-feedback-box show try-again";
    feedbackBox.innerHTML = `
      <div>💡 哎呀，還差一點點！可以點左邊的照片「🔍 放大看線索圖」，再選另一個答案試試看喔！</div>
    `;
  }
}

function nextQuizQuestion() {
  if (currentQuizIndex < currentQuizQuestions.length - 1) {
    currentQuizIndex++;
    renderQuizStep();
  } else {
    // 3 題全部完成，頒發成功勳章！
    playSound("fanfare");
    launchConfetti();

    const pillsContainer = document.getElementById("quizStepPills");
    pillsContainer.innerHTML = currentQuizQuestions.map((_, idx) => `
      <span class="q-step-dot correct">第 ${idx + 1} 題 ✅</span>
    `).join("");

    document.getElementById("quizActiveArea").style.display = "none";
    const medalCard = document.getElementById("quizMedalCard");
    medalCard.classList.add("show");
  }
}

// ==========================================
// 11. 慶祝彩帶動畫 (Canvas Confetti)
// ==========================================
function launchConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ["#ffca28", "#43a047", "#ff7043", "#29b6f6", "#ab47bc", "#ffee58"];
  const pieces = Array.from({ length: 90 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    w: 10 + Math.random() * 10,
    h: 8 + Math.random() * 8,
    color: colors[Math.floor(Math.random() * colors.length)],
    vy: 3 + Math.random() * 4.5,
    vx: (Math.random() - 0.5) * 3,
    angle: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.15
  }));

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.angle += p.spin;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    frame++;
    if (frame < 160) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  requestAnimationFrame(animate);
}

// ==========================================
// 12. 網站初始化
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  renderHomeMapAndCards();
  renderDetailCards();
  initMatchingGame();
  initQuizGame();
});
