/* =============================================================================
 *  PERSONALIZATION FILE — THIS IS THE ONLY FILE YOU NEED TO EDIT
 * =============================================================================
 *
 *  Everything personal on the website (her name, your photos, your letter,
 *  the reasons, the surprise message, the song) is stored here.
 *
 *  HOW TO EDIT:
 *   1. Open this file in any plain text editor (Notepad, TextEdit, VS Code).
 *   2. Change the text between the "quote marks" only.
 *   3. Save the file and refresh the website in your browser.
 *
 *  RULES TO REMEMBER:
 *   - Keep every line inside a pair of  " "  quotes.
 *   - Keep the commas between items.
 *   - Do NOT type a "quote mark" inside your text (it breaks the file).
 *   - Lines starting with  //  are notes for you and are ignored.
 * ========================================================================== */

const SITE_DATA = {

  /* ---------------------------------------------------------------------------
   * SECTION A — WELCOME (top of the page)
   * ------------------------------------------------------------------------- */
  name: "Drishtiii",            // Her real name or nickname appears here.
  welcomeKicker: "Made With Love, for my ❤️",
  intro:
    "If I could, I'd gather every little thing I love about you and wrap it into a gift. " +
    "Since I can't quite do that, I made you this instead — a little place filled with our memories, " +
    "words I've been keeping in my heart, and a reminder of just how special you are to me.",
  beginButtonText: "Every little thing here was made with love. With my love, for my Love",

  /* HERO PHOTO (optional)
   * A favourite picture shown in a polaroid frame under her name.
   * Leave src as "" and it stays hidden — the hero is text-only until then.
   * TO USE: copy a photo into assets/images/ and set src to its file name.
   */
  heroPhoto: {
    src: "",                     // e.g. "assets/images/us-favourite.jpg"
    caption: "",                 // e.g. "Us, on our favourite evening"  (optional)
    alt: ""                      // e.g. "The two of us smiling at the camera" (for screen readers)
  },

  /* ---------------------------------------------------------------------------
   * SECTION B — OUR MEMORIES (photo gallery)
   *
   * TO USE YOUR OWN PHOTOS:
   *   1. Copy your picture files into the  assets/images/  folder.
   *   2. Change  src:  to point to your file, e.g. src: "assets/images/us-1.jpg"
   *   3. Write a short pretty  caption:  (shows under the polaroid).
   *   4. Write a plain  alt:  describing the photo (for screen readers).
   *   5. You can add or remove lines — any number of photos works.
   * ------------------------------------------------------------------------- */
  photos: [
    { src: "assets/images/WhatsApp Image 2026-10-24 at 4.12.24 PM (2).jpeg", caption: "The Day It all started", alt: "Screenshot of the chat where you told me you like me a lot" },
    { src: "assets/images/WhatsApp Image 2026-10-24 at 4.12.24 PM.jpeg", caption: "The Day I fell for you and didn't wanna get up again.", alt: "Instagram collage of her in a red and gold traditional outfit, with a lit-up building at night" },
    { src: "assets/images/WhatsApp Image 2026-10-24 at 4.12.22 PM (1).jpeg", caption: "The first ever picture you sent me, and I asked myself, 'For real she likes me?'", alt: "Close-up night selfie of her wearing glasses and big silver earrings" },
    { src: "assets/images/WhatsApp Image 2026-10-24 at 4.12.23 PM (1).jpeg", caption: "I.WILL.MARRY.HER.", alt: "Her standing in a blue printed sari in front of a purple shutter" },
    { src: "assets/images/WhatsApp Image 2026-10-24 at 4.12.24 PM (1).jpeg", caption: "1st Birthday with me being a part of your life.", alt: "Her posing behind two chocolate bear-shaped birthday cakes" },
    { src: "assets/images/WhatsApp Image 2026-10-24 at 4.12.22 PM (2).jpeg", caption: "Soon Us", alt: "A colourful drawing of us standing together under fireworks" }
  ],

  /* ---------------------------------------------------------------------------
   * HER DOODLES — soft background accents
   *
   * Her own drawings float behind each section as faded watermarks.
   * Nothing to do — they are already placed. To change them:
   *   - section:  "welcome" "memories" "letter" "reasons" "surprise" "footer"
   *   - position: "tl" top-left · "tr" top-right · "bl" bottom-left · "br" bottom-right
   *   - blend:    "screen" for drawings on black backgrounds · "multiply" for light ones
   *   - enabled:  false hides that one (or delete the whole line)
   * ------------------------------------------------------------------------- */
  backgroundDoodles: [
    { src: "assets/images/doodle-5.jpg", section: "welcome",  position: "br", blend: "multiply", enabled: true, alt: "Her drawing of pink roses in a basket with a red bow" },
    { src: "assets/images/doodle-1.jpg", section: "welcome",  position: "bl", blend: "multiply", enabled: true, alt: "Her drawing of pink tulips with a butterfly" },
    { src: "assets/images/doodle-8.jpg", section: "memories", position: "tr", blend: "screen",   enabled: true, alt: "Her drawing of three tulips with little hearts" },
    { src: "assets/images/lily-painting.jpg", section: "memories", position: "bl", blend: "multiply", enabled: true, alt: "Pink lily painting" },
    { src: "assets/images/doodle-7.jpg", section: "letter",   position: "br", blend: "screen",   enabled: true, alt: "Her drawing of a big white and yellow daisy" },
    { src: "assets/images/doodle-4.jpg", section: "letter",   position: "tl", blend: "multiply", enabled: true, alt: "Her drawing of two people hugging" },
    { src: "assets/images/doodle-6.jpg", section: "reasons",  position: "tr", blend: "screen",   enabled: true, alt: "Her drawing of a flowering bush in a striped basket" },
    { src: "assets/images/lily-painting.jpg", section: "reasons", position: "br", blend: "multiply", enabled: true, alt: "Pink lily painting" },
    { src: "assets/images/doodle-2.jpg", section: "surprise", position: "tl", blend: "screen",   enabled: true, alt: "Her drawing of tulips in a heart-shaped vase" },
    { src: "assets/images/doodle-3.jpg", section: "footer",   position: "br", blend: "screen",   enabled: true, alt: "Her doodle of the two of us drawn on an arm" }
  ],

  /* ---------------------------------------------------------------------------
   * DECOR — custom corner images (the lilies)
   *
   * Swap any of these for your own picture (copied into assets/images/),
   * or set "" to hide that decoration. Photos get a soft edge-fade.
   * ------------------------------------------------------------------------- */
  decor: {
    heroLeft:   "assets/images/lily.svg",   // hero, bottom-left corner
    heroRight:  "assets/images/lily.svg",   // hero, top-right corner
    footerLily: "assets/images/lily.svg",   // small lily above the footer text
    cardLilies: "assets/images/lily.svg"    // the two lilies inside the gift card
  },

  /* ---------------------------------------------------------------------------
   * SECTION C — MY BIRTHDAY LETTER
   *
   * Your words are printed exactly as you type them, in order.
   * Each entry in  paragraphs:  becomes one paragraph of the letter.
   * ------------------------------------------------------------------------- */
  letter: {
    greeting: "My Dearest Cutest Little Baby!!!",
    paragraphs: [
      "Sometimes, I wonder how one person can mean so much to another. How you can become such a big part of someone's life that even the smallest things begin to remind them of you. And then I think of you, and somehow, it all makes sense. " +
      "After two small years that I have no idea when they passed, if there's one thing I've learnt, it's that falling in love with you wasn't a one-time thing. I keep falling for you, over and over again, in a thousand little ways I could never have predicted.",

      "One day I was just sitting on the roof at 3 am idk, I saw an actual shooting star for the first time and I wished for you... In that moment I thought, There is just one difference between you and shooting star. When I see a shooting star I wish for you and when I see you my only wish comes true. ",
"(Literally crying btw writing all this, I am so happyyyyy!! I love you more.) ",
      "" +
      "Happy 21 and I pray that I can see all your years till I can't"
    ],
    signoff: "With all of myself,",
    signature: "Rishi."
  },

  /* ---------------------------------------------------------------------------
   * SECTION D — REASONS I LOVE YOU
   *
   * Each reason becomes a card she can tap to reveal.
   * icon can be: "heart", "flower", "star", "sparkle"
   * ------------------------------------------------------------------------- */
  reasons: [
    { icon: "heart",   text: "Wii Wiii, Wii wii Wiiiiii" },
    { icon: "flower",  text: "Everytime I see you it makes me feel like I have made it in life." },
    { icon: "star",    text: "For keeping me motivated even when I had already given up." },
    { icon: "sparkle", text: "Believing in me " },
    { icon: "heart",   text: "I don't need a reason to love you." },
    { icon: "flower",  text: "Making me feel at home." },
    { icon: "star",    text: "Rehne do!!" },
    { icon: "sparkle", text: "Wishiiiiii" },
    { icon: "heart",   text: "Cause you call me Babyyyy(OMG!!!!)" }
  ],

  /* ---------------------------------------------------------------------------
   * SECTION E — SECRET SURPRISE (the gift box at the end)
   * ------------------------------------------------------------------------- */
  surprise: {
    hint: "Tap the gift",
    title: "Happy Birthday, my favourite girl!",
    message:
      "If I could give you one gift that would last forever, it would be the ability to see yourself through my eyes, even for a moment. You'd see the most beautiful soul, the person who makes my days brighter, who makes me feel loved in ways I never knew I needed, and the girl I somehow keep falling for more deeply with every passing day. " +
      "If life gave me a thousand chances to choose someone to love, I'd find my way to you in every single one.",
    wish:
      "And if I get to wish for anything today, it's that I get to keep loving you through all your birthdays, all your little victories, all your changing dreams, and all the ordinary days in between. You are, and I hope you always know this, one of the most beautiful things that has ever happened to me. I love you, endlessly. ❤️"
  },

  /* ---------------------------------------------------------------------------
   * MUSIC
   *
   * 1. Put your song file in the  assets/audio/  folder, for example:
   *      assets/audio/song.mp3
   * 2. Change the  src  below to match your file name.
   * The player never starts by itself — she presses play.
   * If the file is missing, the button shows a friendly message instead.
   * ------------------------------------------------------------------------- */
  audio: {
    src: "assets/audio/song.mp3",
    title: "Teri Akhiya ch Jadu"
  }
};
