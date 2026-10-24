/* =============================================================================
 *  PERSONALIZED BIRTHDAY WEBSITE — MAIN SCRIPT
 * -----------------------------------------------------------------------------
 *  Runs in small, independent blocks:
 *    1. helpers & shared state
 *    2. fill the page from data.js
 *    3. memories gallery + lightbox
 *    4. reasons cards
 *    5. secret surprise + heart/petal burst
 *    6. music player
 *    7. floating decorations
 *    8. navigation, scroll progress, reveal animations
 * ========================================================================== */

(function () {
  "use strict";

  /* ========================= 1. HELPERS & STATE ========================== */

  const data = typeof SITE_DATA !== "undefined" && SITE_DATA ? SITE_DATA : {};
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let reduceMotion = motionQuery.matches;
  const $ = (selector, root) => (root || document).querySelector(selector);

  const smoothBehavior = () => (reduceMotion ? "auto" : "smooth");

  if (typeof motionQuery.addEventListener === "function") {
    motionQuery.addEventListener("change", (event) => {
      reduceMotion = event.matches;
    });
  }

  function setText(element, text, fallback) {
    if (!element) return;
    element.textContent = text || fallback || "";
  }

  /* ==================== 2. FILL THE PAGE FROM data.js ==================== */

  function fillWelcome() {
    const name = data.name || "[Her Name]";
    setText($("#hero-kicker"), data.welcomeKicker, "Happy Birthday");
    setText($("#hero-name"), name);
    setText($("#hero-intro"), data.intro);
    setText($("#begin-label"), data.beginButtonText, "Begin Our Journey");

    if (name && name.indexOf("[") === -1) {
      document.title = "Happy Birthday, " + name;
    }

    // Optional hero photo: only appears once a real file path is set.
    const heroPhoto = data.heroPhoto || {};
    const heroFigure = $("#hero-photo");
    const heroImg = $("#hero-photo-img");
    const src = heroPhoto.src || "";
    if (heroFigure && heroImg && src && src.indexOf("[") === -1) {
      heroImg.addEventListener("error", () => {
        heroFigure.hidden = true; // fail quietly if the file is missing
      });
      heroImg.src = src;
      heroImg.alt = heroPhoto.alt || "A favourite photo of us";
      setText($("#hero-photo-caption"), heroPhoto.caption, "");
      heroFigure.hidden = false;
    }
  }

  function fillLetter() {
    const letter = data.letter || {};
    setText($("#letter-greeting"), letter.greeting, "My Dearest,");

    const body = $("#letter-body");
    if (body) {
      body.textContent = "";
      const paragraphs = Array.isArray(letter.paragraphs) ? letter.paragraphs : [];
      paragraphs.forEach((text) => {
        const p = document.createElement("p");
        p.textContent = text;
        body.appendChild(p);
      });
      if (!paragraphs.length) {
        const p = document.createElement("p");
        p.textContent = "[Your letter goes here — see data.js]";
        body.appendChild(p);
      }
    }

    setText($("#letter-signoff"), letter.signoff, "All my love,");
    setText($("#letter-signature"), letter.signature, "[Your Name]");
  }

  function fillSurpriseText() {
    const surprise = data.surprise || {};
    setText($("#surprise-hint"), surprise.hint, "Tap the gift");
    setText($("#surprise-message-title"), surprise.title, "Happy Birthday!");
    setText($("#surprise-message"), surprise.message);
    setText($("#surprise-wish"), surprise.wish);
  }

  /* ==================== 3. MEMORIES GALLERY + LIGHTBOX =================== */

  const photos = Array.isArray(data.photos) ? data.photos : [];
  let lightboxIndex = 0;
  let lastFocused = null;

  function buildGallery() {
    const track = $("#gallery-track");
    if (!track) return;

    photos.forEach((photo, index) => {
      const src = photo && photo.src;
      const caption = (photo && photo.caption) || "";
      const alt = (photo && photo.alt) || caption || ("Memory photo " + (index + 1));

      const card = document.createElement("div");
      card.className = "polaroid";
      card.style.setProperty("--tilt", (index % 2 ? 1.4 : -1.4) + "deg");
      card.style.setProperty("--i", String(index));

      const button = document.createElement("button");
      button.type = "button";
      button.className = "polaroid__btn";
      button.setAttribute("aria-label", "Enlarge photo: " + caption);

      const img = document.createElement("img");
      img.className = "polaroid__img";
      img.src = src || "";
      img.alt = alt;
      img.loading = index < 2 ? "eager" : "lazy";
      img.decoding = "async";
      img.addEventListener("error", () => {
        img.alt = "Photo could not be loaded";
        card.classList.add("polaroid--missing");
      });

      const figcaption = document.createElement("p");
      figcaption.className = "polaroid__caption";
      figcaption.textContent = caption;

      button.appendChild(img);
      button.appendChild(figcaption);
      button.addEventListener("click", () => openLightbox(index, button));
      card.appendChild(button);
      track.appendChild(card);
    });

    if (!photos.length) {
      const note = document.createElement("p");
      note.className = "gallery__hint";
      note.textContent = "Add your photos in data.js to fill this gallery.";
      track.appendChild(note);
    }
  }

  function trackStep(direction) {
    const track = $("#gallery-track");
    if (!track) return;
    const card = track.querySelector(".polaroid");
    const step = card ? card.getBoundingClientRect().width + 24 : 280;
    track.scrollBy({ left: direction * step, behavior: smoothBehavior() });
  }

  function showLightboxItem(index) {
    if (!photos.length) return;
    lightboxIndex = (index + photos.length) % photos.length;
    const photo = photos[lightboxIndex] || {};
    const img = $("#lightbox-img");
    const caption = $("#lightbox-caption");
    if (img) {
      img.src = photo.src || "";
      img.alt = photo.alt || photo.caption || ("Memory photo " + (lightboxIndex + 1));
    }
    setText(caption, photo.caption, "");
  }

  function openLightbox(index, trigger) {
    const box = $("#lightbox");
    if (!box) return;
    lastFocused = trigger || document.activeElement;
    showLightboxItem(index);
    box.hidden = false;
    document.body.style.overflow = "hidden";
    const closeBtn = $("#lightbox-close");
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    const box = $("#lightbox");
    if (!box || box.hidden) return;
    box.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  function setupLightbox() {
    const box = $("#lightbox");
    if (!box) return;

    $("#lightbox-close").addEventListener("click", closeLightbox);
    $("#lightbox-prev").addEventListener("click", () => showLightboxItem(lightboxIndex - 1));
    $("#lightbox-next").addEventListener("click", () => showLightboxItem(lightboxIndex + 1));

    box.addEventListener("click", (event) => {
      if (event.target === box) closeLightbox();
    });

    document.addEventListener("keydown", (event) => {
      if (box.hidden) return;
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showLightboxItem(lightboxIndex - 1);
      if (event.key === "ArrowRight") showLightboxItem(lightboxIndex + 1);

      if (event.key === "Tab") {
        const focusable = Array.from(
          box.querySelectorAll("button:not([hidden])")
        ).filter((el) => el.offsetParent !== null);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
  }

  /* ======================== 4. REASONS CARDS ============================= */

  const ICONS = {
    heart:
      '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 27C6 20.5 3.5 15.5 6.4 11.6 8.9 8.3 13.8 9 16 12.7 18.2 9 23.1 8.3 25.6 11.6c2.9 3.9.4 8.9-9.6 15.4z" fill="currentColor"/></svg>',
    flower:
      '<svg viewBox="0 0 32 32" aria-hidden="true"><g fill="currentColor"><path d="M16 17 C 12.6 12.6, 12 6.6, 16 2 C 20 6.6, 19.4 12.6, 16 17 Z"/><path d="M16 17 C 12.6 12.6, 12 6.6, 16 2 C 20 6.6, 19.4 12.6, 16 17 Z" transform="rotate(72 16 16)"/><path d="M16 17 C 12.6 12.6, 12 6.6, 16 2 C 20 6.6, 19.4 12.6, 16 17 Z" transform="rotate(144 16 16)"/><path d="M16 17 C 12.6 12.6, 12 6.6, 16 2 C 20 6.6, 19.4 12.6, 16 17 Z" transform="rotate(216 16 16)"/><path d="M16 17 C 12.6 12.6, 12 6.6, 16 2 C 20 6.6, 19.4 12.6, 16 17 Z" transform="rotate(288 16 16)"/></g><circle cx="16" cy="16" r="2.8" fill="#f4c07a"/></svg>',
    star:
      '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3.5l3.6 7.5 8.3 1.1-6.1 5.7 1.6 8.2L16 22.1l-7.4 3.9 1.6-8.2-6.1-5.7 8.3-1.1z" fill="currentColor"/></svg>',
    sparkle:
      '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 2c1.2 7.3 5.5 11.6 12.8 12.8C21.5 16 17.2 20.3 16 27.6 14.8 20.3 10.5 16 3.2 14.8 10.5 13.6 14.8 9.3 16 2z" fill="currentColor"/></svg>'
  };

  const reasons = Array.isArray(data.reasons) ? data.reasons : [];
  let revealedCount = 0;

  function flipCard(card, flip) {
    card.classList.toggle("is-flipped", flip);
    card.setAttribute("aria-pressed", String(flip));
    const number = card.getAttribute("data-number");
    card.setAttribute(
      "aria-label",
      flip
        ? "Reason " + number + ", revealed. Activate to hide it again."
        : "Reason " + number + ", hidden. Activate to reveal it."
    );
  }

  function buildReasons() {
    const grid = $("#reasons-grid");
    if (!grid) return;

    reasons.forEach((reason, index) => {
      const text = (reason && reason.text) || "[Your reason here]";
      const iconKey = (reason && reason.icon) || "heart";

      const card = document.createElement("button");
      card.type = "button";
      card.className = "reason-card";
      card.style.setProperty("--i", String(index));
      card.setAttribute("aria-pressed", "false");
      card.setAttribute("data-number", String(index + 1));
      card.setAttribute("aria-label", "Reason " + (index + 1) + ", hidden. Activate to reveal it.");

      const inner = document.createElement("span");
      inner.className = "reason-card__inner";

      const front = document.createElement("span");
      front.className = "reason-card__face reason-card__face--front";
      front.innerHTML =
        '<span class="reason-card__icon">' + (ICONS[iconKey] || ICONS.heart) + "</span>" +
        '<span class="reason-card__label"></span>' +
        '<span class="reason-card__cta">tap to reveal</span>';
      front.querySelector(".reason-card__label").textContent = "Reason #" + (index + 1);

      const back = document.createElement("span");
      back.className = "reason-card__face reason-card__face--back";

      const backDeco = document.createElement("span");
      backDeco.className = "reason-card__back-deco";
      backDeco.innerHTML = ICONS[iconKey] || ICONS.heart;

      const backText = document.createElement("span");
      backText.className = "reason-card__text";
      backText.textContent = text;

      back.appendChild(backDeco);
      back.appendChild(backText);
      inner.appendChild(front);
      inner.appendChild(back);
      card.appendChild(inner);

      card.addEventListener("click", () => {
        const nowFlipped = !card.classList.contains("is-flipped");
        flipCard(card, nowFlipped);
        revealedCount += nowFlipped ? 1 : -1;
        updateRevealAllButton();
      });

      grid.appendChild(card);
    });

    if (!reasons.length) {
      const note = document.createElement("p");
      note.className = "section__subtitle";
      note.textContent = "Add your reasons in data.js and they will appear here.";
      grid.appendChild(note);
    }
  }

  function updateRevealAllButton() {
    const btn = $("#reveal-all-btn");
    if (!btn) return;
    const allShown = reasons.length > 0 && revealedCount >= reasons.length;
    btn.textContent = allShown ? "Hide all reasons" : "Reveal all reasons";
    btn.setAttribute("aria-pressed", String(allShown));
  }

  function setupRevealAll() {
    const btn = $("#reveal-all-btn");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const cards = Array.from(document.querySelectorAll(".reason-card"));
      const shouldOpen = revealedCount < cards.length;
      cards.forEach((card) => flipCard(card, shouldOpen));
      revealedCount = shouldOpen ? cards.length : 0;
      updateRevealAllButton();
    });
  }

  /* ================ 5. SECRET SURPRISE + HEART / PETAL BURST ============= */

  function burstFrom(element) {
    const field = $("#burst-field");
    if (!field || !element) return;

    const rect = element.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    const glyphs = ["♥", "✦", "♡"];
    const count = reduceMotion ? 10 : 34;

    for (let i = 0; i < count; i++) {
      const piece = document.createElement("span");
      const usePetal = i % 3 === 0;
      piece.className = "burst" + (usePetal ? " burst--petal" : "");

      if (!usePetal) {
        piece.textContent = glyphs[i % glyphs.length];
        const colors = ["#ef6f9a", "#f4c07a", "#c98ee0", "#e8557f"];
        piece.style.color = colors[i % colors.length];
        piece.style.fontSize = 14 + Math.round(Math.random() * 14) + "px";
        piece.style.textShadow = "0 0 10px rgba(244, 192, 122, 0.75)";
      }

      const angle = Math.random() * Math.PI * 2;
      const distance = 120 + Math.random() * 220;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance - 70;

      piece.style.left = originX + "px";
      piece.style.top = originY + "px";
      piece.style.setProperty("--tx", Math.round(tx) + "px");
      piece.style.setProperty("--ty", Math.round(ty) + "px");
      piece.style.setProperty("--rot", Math.round(Math.random() * 720 - 360) + "deg");
      piece.style.animationDuration = (1.1 + Math.random() * 0.8).toFixed(2) + "s";

      piece.addEventListener("animationend", () => piece.remove());
      field.appendChild(piece);
    }
  }

  function setupSurprise() {
    const gift = $("#gift-btn");
    const card = $("#surprise-card");
    if (!gift || !card) return;

    gift.addEventListener("click", () => {
      burstFrom(gift);

      if (!gift.classList.contains("is-open")) {
        gift.classList.add("is-open");
        gift.setAttribute("aria-expanded", "true");

        window.setTimeout(
          () => {
            card.hidden = false;
            card.scrollIntoView({
              behavior: smoothBehavior(),
              block: "center"
            });
          },
          reduceMotion ? 0 : 480
        );
      }
    });
  }

  /* ========================= 6. MUSIC PLAYER ============================= */

  const MISSING_SONG_MESSAGE =
    "The song file was not found. Save your audio as assets/audio/song.mp3 (or update audio.src in data.js).";

  let toastTimer = null;

  function showMusicToast(message) {
    const toast = $("#music-toast");
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    if (toastTimer) window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.hidden = true;
    }, 5000);
  }

  function setupMusic() {
    const audio = $("#bg-music");
    const toggle = $("#music-toggle");
    const title = $("#music-title");
    if (!audio || !toggle) return;

    const audioData = data.audio || {};
    setText(title, audioData.title, "Our Song");

    if (audioData.src) {
      audio.src = audioData.src;
    }

    let toastShownForCurrentSource = false;

    audio.addEventListener("error", () => {
      if (toastShownForCurrentSource) return;
      toastShownForCurrentSource = true;
      showMusicToast(MISSING_SONG_MESSAGE);
      setPlayingUI(false);
    });

    audio.addEventListener("play", () => setPlayingUI(true));
    audio.addEventListener("pause", () => setPlayingUI(false));

    function setPlayingUI(isPlaying) {
      toggle.classList.toggle("is-playing", isPlaying);
      toggle.setAttribute("aria-pressed", String(isPlaying));
      toggle.setAttribute(
        "aria-label",
        isPlaying ? "Pause background music" : "Play background music"
      );
      toggle.setAttribute("title", isPlaying ? "Pause music" : "Play music");
    }

    toggle.addEventListener("click", () => {
      if (!audioData.src) {
        showMusicToast(MISSING_SONG_MESSAGE);
        return;
      }

      if (audio.paused) {
        const playAttempt = audio.play();
        if (playAttempt && typeof playAttempt.catch === "function") {
          playAttempt.catch(() => {
            showMusicToast(MISSING_SONG_MESSAGE);
            setPlayingUI(false);
          });
        }
      } else {
        audio.pause();
      }
    });
  }

  /* =================== 7. FLOATING DECORATIONS (JS) ====================== */

  function setupFloatingDecor() {
    const field = $("#floating-field");
    if (!field || reduceMotion) return;

    const smallScreen = window.innerWidth < 640;
    const count = smallScreen ? 12 : 20;
    const kinds = ["petal", "petal", "petal", "heart", "sparkle"];

    for (let i = 0; i < count; i++) {
      const piece = document.createElement("span");
      const kind = kinds[i % kinds.length];
      piece.className = "floaty floaty--" + kind;

      const drift = Math.round(Math.random() * 160 - 80);
      const spin = Math.round(Math.random() * 620 - 310);
      const duration = (14 + Math.random() * 14).toFixed(1);
      const delay = (-Math.random() * 24).toFixed(1);
      const scale = (0.75 + Math.random() * 0.7).toFixed(2);

      piece.style.left = (Math.random() * 100).toFixed(2) + "%";
      piece.style.setProperty("--drift", drift + "px");
      piece.style.setProperty("--spin", spin + "deg");
      piece.style.animationDuration = duration + "s";
      piece.style.animationDelay = delay + "s";

      if (kind === "petal") {
        const size = Math.round(11 + Math.random() * 10);
        piece.style.width = size + "px";
        piece.style.height = size + "px";
      } else {
        piece.style.fontSize = (12 + Math.random() * 9).toFixed(0) + "px";
      }

      field.appendChild(piece);
    }
  }

  /* ========== 8. NAVIGATION, SCROLL PROGRESS, REVEAL ANIMATIONS ========== */

  function setupNavigation() {
    const nav = $("#site-nav");
    const progress = $("#scroll-progress");
    const sections = Array.from(document.querySelectorAll("main section[id]"));
    const links = Array.from(document.querySelectorAll(".site-nav a"));
    const beginBtn = $("#begin-btn");

    let ticking = false;

    function update() {
      ticking = false;
      const scrollY = window.scrollY || window.pageYOffset;
      const viewHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight - viewHeight;

      if (nav) {
        nav.classList.toggle("is-visible", scrollY > viewHeight * 0.55);
      }

      if (progress) {
        const percent = fullHeight > 0 ? Math.min(100, (scrollY / fullHeight) * 100) : 0;
        progress.style.width = percent.toFixed(2) + "%";
      }

      let currentId = "";
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= viewHeight * 0.4) {
          currentId = section.id;
        }
      });
      links.forEach((link) => {
        const isActive = link.getAttribute("href") === "#" + currentId;
        link.classList.toggle("is-active", isActive);
        if (isActive) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(update);
        }
      },
      { passive: true }
    );

    window.addEventListener("resize", update);
    update();

    if (beginBtn) {
      beginBtn.addEventListener("click", () => {
        const target = document.getElementById("memories");
        if (!target) return;
        target.scrollIntoView({ behavior: smoothBehavior(), block: "start" });
      });
    }

    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: smoothBehavior(), block: "start" });
        history.replaceState(null, "", link.getAttribute("href"));
      });
    });
  }

  function setupRevealOnScroll() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || reduceMotion) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach((item) => observer.observe(item));
  }

  function setupGalleryControls() {
    const prev = $("#gallery-prev");
    const next = $("#gallery-next");
    const track = $("#gallery-track");

    if (prev) prev.addEventListener("click", () => trackStep(-1));
    if (next) next.addEventListener("click", () => trackStep(1));

    if (track) {
      track.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          trackStep(-1);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          trackStep(1);
        }
      });
    }
  }

  /* ==================== 3b. HER DOODLES (BACKGROUND WATERMARKS) ========= */

  function buildBackgroundDoodles() {
    const doodles = Array.isArray(data.backgroundDoodles) ? data.backgroundDoodles : [];
    const targets = {
      welcome: $("#welcome"),
      memories: $("#memories"),
      letter: $("#letter"),
      reasons: $("#reasons"),
      surprise: $("#surprise"),
      footer: $(".site-footer")
    };
    const blends = { screen: "screen", multiply: "multiply" };
    const positions = { tl: 1, tr: 1, bl: 1, br: 1 };

    doodles.forEach((doodle) => {
      if (!doodle || doodle.enabled === false) return;
      const parent = targets[doodle.section];
      const src = doodle.src || "";
      if (!parent || !src) return;

      const img = document.createElement("img");
      const pos = positions[doodle.position] ? doodle.position : "br";
      img.className = "section__doodle section__doodle--" + pos;
      if (blends[doodle.blend]) img.dataset.blend = doodle.blend;
      img.src = src;
      img.alt = "";
      img.setAttribute("aria-hidden", "true");
      img.loading = "lazy";
      img.decoding = "async";
      img.addEventListener("error", () => img.remove());
      parent.appendChild(img);
    });
  }

  /* ==================== 3c. DECORATIVE IMAGES (data.decor) =============== */

  function applyDecor() {
    const decor = data.decor || {};
    const photoExt = /\.(jpe?g|png|webp)$/i;

    function setDecor(src, applyTo) {
      const els = typeof applyTo === "string" ? Array.from(document.querySelectorAll(applyTo)) : [applyTo];
      els.forEach((el) => {
        if (!el) return;
        if (src === "") {
          el.hidden = true;
          return;
        }
        if (!src) return; // no config — keep the default lily.svg already in the HTML
        el.addEventListener("error", () => {
          el.hidden = true; // fail quietly if the file is missing
        });
        if (photoExt.test(src)) el.classList.add("decor-photo");
        el.src = src;
      });
    }

    setDecor(decor.heroLeft, "#hero-lily-left");
    setDecor(decor.heroRight, "#hero-lily-right");
    setDecor(decor.footerLily, "#footer-lily");
    setDecor(decor.cardLilies, "#surprise-card-lilies img");
  }

  /* ============================== START ================================== */

  function init() {
    fillWelcome();
    fillLetter();
    fillSurpriseText();
    buildGallery();
    setupGalleryControls();
    setupLightbox();
    buildReasons();
    setupRevealAll();
    setupSurprise();
    setupMusic();
    setupFloatingDecor();
    setupNavigation();
    setupRevealOnScroll();
    buildBackgroundDoodles();
    applyDecor();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
