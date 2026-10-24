# A Birthday Website, Made With Love

A handcrafted, romantic birthday website: a welcome hero, a photo gallery of your
memories, a birthday letter, flip-cards with reasons you love her, a secret gift
surprise, floating petals and hearts, and a music player — all in one page.

It is a **static website**: plain HTML, CSS and JavaScript. No build step, no
server, no database. You can open it directly in a browser, and it can be
published for free on GitHub Pages so she can open it on her phone.

---

## 1. What's inside

```
ILOVEYOUMORE/
├── index.html          ← the page structure (you rarely edit this)
├── style.css           ← all colours, fonts and animations
├── script.js           ← all behaviour (gallery, cards, surprise, music)
├── data.js             ← ★ THE ONLY FILE YOU NEED TO EDIT (your personal content)
├── README.md           ← this guide
├── tools/
│   └── make_placeholders.py  (optional: regenerates the placeholder images)
└── assets/
    ├── images/         ← put YOUR photos here
    │   ├── lily.svg          (decorative pink lily, used around the page)
    │   ├── favicon.svg       (the little heart icon in the browser tab)
    │   ├── photo-1..6.svg    (placeholders — replace these with your photos)
    │   ├── doodle-1..8.jpg   (her own drawings, used as background watermarks)
    │   └── lily-painting.jpg (her pink-lily painting, used as background art)
    └── audio/          ← put YOUR song here
        └── PUT-YOUR-SONG-HERE.txt
```

**Everything personal lives in `data.js`.** Her name, your photos, your letter,
the reasons, the surprise, the song — all of it. The file is heavily commented,
and each section matches one part of the website.

---

## 2. Preview the website on your own computer

You do not need to install anything.

1. Double-click `index.html` — it opens in your browser.
   (Or right-click → Open with → Chrome/Firefox/Edge.)

That's it. When you edit `data.js`, save the file and press **F5** (refresh) in
the browser to see your changes.

> Note: some browsers block the music file when opened this way. If the song
> doesn't play while previewing locally, don't worry — it works normally once
> the site is published (step 5), or preview through a tiny local server:
> open a terminal in this folder and run `python3 -m http.server 8000`,
> then visit `http://localhost:8000`.

---

## 3. Personalize everything (edit `data.js`)

Open `data.js` in any plain-text editor (Notepad on Windows, TextEdit on Mac —
switch TextEdit to *Format → Make Plain Text*, or use the free VS Code).

Golden rules:

- Only change the text **between the quote marks** `" "`.
- Keep every comma and quote mark exactly where they are.
- Never type a `"` inside your text (use a `'` or just reword).
- Save, then refresh the browser.

### 3.1 Her name
```js
name: "Sara",
```
This appears huge on the welcome screen, in the letter greeting and in the
surprise message. The page title in the browser tab updates too.

### 3.2 The welcome introduction
```js
intro: "Today is all about you ...",
beginButtonText: "Begin Our Journey",
welcomeKicker: "Made With Love",
```

### 3.3 Your photographs

**A. The hero photo (optional, shown under her name on the welcome screen)**
```js
heroPhoto: {
  src: "assets/images/us-favourite.jpg",   // leave "" to keep it hidden
  caption: "Us, on our favourite evening", // optional, shown below the photo
  alt: "The two of us smiling at the camera"
},
```

**B. The memories gallery**
```js
photos: [
  { src: "assets/images/us-1.jpg", caption: "The day we met",   alt: "The two of us on our first walk" },
  { src: "assets/images/us-2.jpg", caption: "Our first coffee", alt: "Us sharing coffee at the corner cafe" }
],
```
Step by step:
1. Copy your photos into the `assets/images/` folder.
2. Write the file names in `src:` — always prefixed with `assets/images/`.
3. Write a short pretty `caption:` (it appears under the polaroid).
4. Write a plain `alt:` describing the photo for screen readers.
5. Add or remove whole `{ ... }` lines — any number works.
6. Delete the placeholder files `photo-1.svg` … `photo-6.svg` when you no longer
   need them.

How photos are shown:
- Gallery thumbnails are cropped to a neat 4:5 polaroid frame (never stretched).
- Tap any photo — the full, uncropped picture opens in the lightbox.
- The hero photo is shown whole (never cropped) inside its frame.
- All image paths are relative, so everything keeps working on GitHub Pages.

Tips: resize photos before uploading (1600 px wide is plenty) so the site loads
fast on mobile. Keep file names simple: `us-1.jpg`, no spaces. Use `.jpg`,
`.png` or `.webp`.

### 3.4 Your birthday letter
```js
letter: {
  greeting: "My Dearest Sara,",
  paragraphs: [
    "First paragraph ...",
    "Second paragraph ..."
  ],
  signoff: "All my love,",
  signature: "Rishi"
}
```
- Each `"..."` in `paragraphs` becomes its own paragraph, in order.
- Your wording is printed **exactly** as you type it, including line breaks
  inside one paragraph.
- Add as many paragraphs as you like — just keep them separated by commas.

### 3.5 The reasons you love her
```js
reasons: [
  { icon: "heart",   text: "The way you laugh ..." },
  { icon: "flower",  text: "How kind you are ..." }
],
```
- `icon` can be `"heart"`, `"flower"`, `"star"` or `"sparkle"`.
- She taps a card to flip it and read the reason — or taps **Reveal all**.

### 3.6 The secret surprise
```js
surprise: {
  hint: "Tap the gift",
  title: "Happy Birthday, Sara!",
  message: "The hidden message ...",
  wish: "My wish for you ..."
}
```
When she taps the gift, the lid opens, hearts and petals burst out, and the
card with `message` and `wish` appears.

### 3.7 The song
1. Put your file in `assets/audio/`, e.g. `assets/audio/song.mp3`.
2. Make sure `data.js` says:
```js
audio: {
  src: "assets/audio/song.mp3",
  title: "Our Song"
}
```
The music **never** starts by itself — she presses the floating play button,
which stays available while scrolling. If the file is missing, the button shows
a friendly message instead of breaking.

### 3.8 Her drawings (background doodles)

Eight of her own drawings plus her pink-lily painting already float softly
behind each section as watermarks (`doodle-1.jpg` … `doodle-8.jpg` and
`lily-painting.jpg` in `assets/images/`, copied and resized from the
`Her Drawings/` folder). You don't need to do anything —
they are placed. To change them, edit `backgroundDoodles` in `data.js`:

```js
{ src: "assets/images/doodle-5.jpg", section: "welcome", position: "br",
  blend: "multiply", enabled: true, alt: "Her drawing of pink roses" },
```
- `section:` where it appears — `"welcome"`, `"memories"`, `"letter"`,
  `"reasons"`, `"surprise"` or `"footer"`.
- `position:` which corner — `"tl"` top-left, `"tr"` top-right,
  `"bl"` bottom-left, `"br"` bottom-right.
- `blend:` `"screen"` for drawings made on a **black** background ·
  `"multiply"` for drawings on a **light** background.
- `enabled:` set `false` to hide one (or delete the whole line).
- To add another drawing of hers: copy the file into `assets/images/`,
  resize it small first (1000 px wide is plenty), then add a line like the
  ones above.

### 3.9 Custom corner images (the lilies)

The little lily in the hero corners, above the footer, and inside the gift
card can all be swapped for your own pictures — or hidden — in `data.js`:

```js
decor: {
  heroLeft:   "assets/images/lily.svg",   // hero, bottom-left corner
  heroRight:  "assets/images/lily.svg",   // hero, top-right corner
  footerLily: "assets/images/lily.svg",   // small lily above the footer text
  cardLilies: "assets/images/lily.svg"    // the two lilies inside the gift card
}
```
1. Copy your picture into `assets/images/` (e.g. `assets/images/my-photo.jpg`).
2. Change that line's path to your file, e.g. `"assets/images/my-photo.jpg"`.
3. Set `""` to hide that decoration completely.
Normal photos (jpg/png/webp) automatically get a soft edge-fade so they blend
into the corner; the picture is never cropped or stretched.

---

## 4. Publish it — step by step (GitHub Pages)

### ⚠️ Read this first: a public website is PUBLIC

- Anyone who has the link can open the site. Anyone who *guesses* or stumbles on
  the link can open it too. **A hidden or hard-to-guess URL is not privacy.**
- A GitHub **repository** can expose your uploaded files (your photos, your
  letter, your song) to anyone who can see the repository. Setting the
  repository to **Private** keeps the *files* private, but GitHub Pages
  publishing from a private repo requires a paid GitHub plan on some accounts.
- This project contains **no analytics, no tracking, no cookies, no external
  services** and collects no personal data. That also means *you* get no visitor
  statistics.
- Anyone can save her photos from a public site. Only upload photos you are
  comfortable with being publicly viewable. If you are not, keep the site
  private (skip this step and just send her the file, or host it privately).

If you accept that, publishing takes about 10 minutes:

### Step 1 — Create a GitHub account & repository
1. Go to <https://github.com> and sign up (free).
2. Click the **+** icon (top right) → **New repository**.
3. Repository name: e.g. `birthday` (or `ILOVEYOUMORE`).
4. Choose **Public** (required for free GitHub Pages) — you were warned above.
5. Tick **Add a README file** → **Create repository**.

### Step 2 — Upload your files
1. In your new repository, click **Add file → Upload files**.
2. Drag **all** the files and folders from your `ILOVEYOUMORE` folder into the
   page (keep the structure: `index.html`, `style.css`, `script.js`, `data.js`,
   `assets/…`).
3. Click **Commit changes**.

### Step 3 — Turn on GitHub Pages
1. Open your repository on GitHub → **Settings** (top tab) → **Pages** (left
   sidebar).
2. Under *Build and deployment*: Source = **Deploy from a branch**.
3. Branch = **main**, folder = **/ (root)** → **Save**.
4. Wait 1–2 minutes and refresh the page.

### Step 4 — Get your link
Your site will be live at:

```
https://YOUR-USERNAME.github.io/birthday/
```

(The exact address is shown at the top of the Settings → Pages screen after it
finishes deploying.) Open it on your phone to test.

### Step 5 — Update it later
Edited `data.js` or added new photos? Just upload the changed files again
(GitHub → your repo → *Add file → Upload files*, or drag-and-drop over the old
ones) and commit. The site updates in about a minute.

---

## 5. Content checklist — status

Your content is already filled in. Only optional polish and the publish
decision remain:

- [x] **Her name / nickname** — `data.js` → `name`
- [x] **Welcome introduction** — `data.js` → `intro`
- [x] **Your photographs** — in `assets/images/`, listed in `data.js` → `photos`
- [x] **Photo captions + alt text** — `data.js` → `photos[]`
- [x] **Your birthday letter** — `data.js` → `letter.paragraphs`
- [x] **Letter greeting + signature** — `data.js` → `letter.greeting`, `letter.signature`
- [x] **The reasons you love her** — `data.js` → `reasons` (all 9 written)
- [x] **The hidden surprise message + final wish** — `data.js` → `surprise`
- [x] **Your song file** — `assets/audio/song.mp3`, `data.js` → `audio`
- [ ] **Optional hero photo** — `data.js` → `heroPhoto` (stays hidden until you set one)
- [ ] **Decision on privacy** — read the warning in section 4 before publishing

---

## 6. Quality checks already performed

The site was tested in a real browser (Firefox, desktop 1280×800 and mobile
390×844, plus a reduced-motion pass). **All automated checks pass**, covering:

- every section renders from `data.js`; all images load; no JavaScript errors;
  no console errors; no unexpected failed network requests
- no horizontal scrolling on desktop or mobile (390 px), nav fits small screens
- Begin button scrolls to the gallery; nav appears after the hero; arrows scroll
  the gallery both ways
- lightbox opens, changes photos, closes with Escape; images keep their aspect
  ratio (no stretching)
- reason cards flip correctly and fill their boxes; Reveal-all toggles all cards
- gift opens, card reveals, heart/petal burst spawns
- music: no autoplay, play actually starts audio (tested with a real audio
  file), pause works, and a missing song shows a friendly message
- touch targets ≥ 44 px; keyboard focus styles present
- her 8 doodles and the pink-lily painting render as soft background
  watermarks (missing files fail quietly)
- `prefers-reduced-motion` disables floating decorations and animations

**Not yet tested:** on real iPhones/Android devices and in Chrome/Safari —
please do a final check on her actual phone after publishing.

## 7. Troubleshooting

| Problem | Fix |
|---|---|
| Text shows `[Her Name]` etc. | You haven't edited `data.js` yet (or saved it). |
| A photo doesn't appear | Check `src:` spelling in `data.js` and the file really being in `assets/images/`. File names are case-sensitive on GitHub. |
| Song won't play | File must be inside `assets/audio/` and `audio.src` must match exactly. MP3 is the safest format. |
| Page looks broken after editing | You probably deleted a comma or quote mark in `data.js`. Undo (Ctrl+Z) and redo carefully. |
| Changes don't show online | GitHub Pages caches briefly — wait 1–2 minutes and hard-refresh (Ctrl+Shift+R). |
