# 專案工作筆記：認識校園樹朋友（國小二年級線上互動式校園樹木教學網站）

## 📌 專案資訊
- **專案路徑**：`D:\認識樹朋友`
- **GitHub 儲存庫**：`https://github.com/grethel1988-ai/campus-tree-friends`
- **GitHub Pages 網址**：`https://grethel1988-ai.github.io/campus-tree-friends/`

---

## ✅ 本次完成事項 (2026-11-01)
1. **網站架構與童趣視覺設計**：
   - 建立 [index.html](file:///d:/認識樹朋友/index.html)、[style.css](file:///d:/認識樹朋友/style.css)、[script.js](file:///d:/認識樹朋友/script.js)。
   - 採用森林綠與活潑黃童趣配色、大字體與圓角立體卡片設計，支援電腦與平板觸控操作。
   - 實作 Web Audio API 即時音效合成（點擊、翻牌、放大、答對、答錯、頒獎號角）與 Web Speech API 中文語音朗讀功能。
2. **三大核心分頁實作**：
   - **樹木地圖探索 (Home)**：校園樹木探索地圖 + 5 位樹朋友 3D 翻轉卡片入口 + 探索集星進度條。
   - **樹朋友詳細介紹 (Tree Detail Section)**：完整建立榕樹、菩提樹、木麻黃、無患子、小葉欖仁 5 張介紹卡片（含圖片放大檢視器 Lightbox、語音導覽、3D 翻面小偵探任務）。
   - **互動遊戲區 (Interactive Games)**：
     - 遊戲一【葉子連連看】：支援「葉子特寫連連看」與「特徵描述連連看」雙模式，同時支援點擊配對與拖曳拉線。
     - 遊戲二【小偵探隨堂測驗】：3 題單選題隨機抽題，全對噴發彩帶動畫並頒發「校園樹偵探成功勳章」。
3. **版面優化與文字修正**：
   - 重新排版「遊戲一：葉子連連看」，修正左右雙欄對稱寬度、拉開中央 `200px` 專屬連線通道並等高對齊 5 列卡片。
   - 將全站「榕樹公公」統一修正為「榕樹」。
4. **GitHub 部署**：
   - 建立公開儲存庫 `grethel1988-ai/campus-tree-friends` 並啟用 GitHub Pages 線上部署。

---

## 🪤 踩坑與經驗紀錄
- **CSS Grid 與 `position: absolute` 子元素衝突**：
  - 在「葉子連連看」棋盤中，若父容器設為 `grid-template-columns: 1fr 120px 1fr`，而中間的 `<svg>` 設為 `position: absolute`，SVG 會脫離 Grid 流向，導致右側欄位被排進第 2 欄（`120px` 窄欄）。
  - **解法**：改用 `grid-template-columns: minmax(0, 1fr) minmax(0, 1fr)` 搭配 `column-gap: 200px`，並明確指定左右欄 `grid-column: 1` 與 `grid-column: 2`。

---

## 🚀 下次開工 / 下一步建議
1. 可視課堂教學回饋，擴充更多校園樹種或增加「小偵探隨堂測驗」題庫數量。
2. 若課堂上使用平板教學，可加入離線 PWA 圖示或滿版全螢幕切換按鈕。
