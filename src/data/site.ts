/**
 * ============================================================
 *  SITE CONFIG — everything personal lives here.
 *
 *  Replace every value wrapped in [BRACKETS] with your own.
 *  The rest of the site reads from these files, so you only
 *  ever need to edit this file (and the sibling data files)
 *  to personalise everything.
 * ============================================================
 */

export const siteConfig = {
  /**
   * HER NAME — shown in the hero, letter and finale.
   */
  girlfriendName: "Enele Twala",

  /**
   * YOUR NAME — the closing signature throughout the story.
   */
  yourName: "Teboho Mohale",

  /**
   * HER BIRTHDAY. Format: "YYYY-MM-DD".
   */
  birthday: "2026-11-14",

  hero: {
    /**
     * HERO IMAGE — use your favourite photograph of her.
     * Drop it in: public/images/hero/    (or update the path)
     */
    image: "/images/hero/hero.jpg",

    /**
     * The big serif statement in the hero.
     */
    statement: "Two months in and every day still feels like a gift.",
  },

  soundscape: {
    /**
     * AUDIO FILE — used by the custom player (visualizer + controls).
     * Drop your mp3 in:  public/audio/our-song.mp3   (or update this path)
     */
    src: "/audio/our-song.mp3",
    /**
     * YOUTUBE / YOUTUBE MUSIC EMBED — when this is set, the section shows
     * the embedded YouTube player instead of the custom mp3 player.
     *   "I'm Not Gonna Lie" (feat. Njilour)
     *   https://music.youtube.com/watch?v=T8pHl2o_g1k
     */
    embedUrl: "https://music.youtube.com/watch?v=T8pHl2o_g1k",
    title: "I'm Not Gonna Lie",
    artist: "feat. Njilour",
    /**
     * Album artwork for the custom player. Place at: public/images/song/
     */
    artwork: "/images/song/song-artwork.jpg",
    /**
     * Small note shown underneath the player.
     */
    note: "This one's ours — turn it up.",
  },

  /**
   * The opening lines — spaced out on the black intro screen.
   */
  intro: {
    lines: [
      "Hey, Enele.",
      "Two months of you.",
      "This is how I celebrate you.",
    ],
    enterLabel: "Enter Our Story",
  },

  /**
   * "Before anything else..." — large editorial paragraphs.
   */
  introduction: {
    eyebrow: "Before anything else...",
    paragraphs: [
      "Two months sounds short, but it already feels like you've been part of me forever.",
      "I wanted to make something that holds all the things I love about you — the way you laugh, the way you look when you're not paying attention, the way you make the ordinary days feel worth remembering.",
    ],
  },

  /**
   * The personal introduction for the story timeline.
   */
  storyIntro: {
    eyebrow: "Where we began",
    title: "A story that's still being written.",
  },

  memories: {
    eyebrow: "Scrapbook",
    title: "Moments I Never Want to Forget",
  },

  favourites: {
    eyebrow: "Portrait Gallery",
    title: "My Favourite View",
    subtitle: "I could look at you forever.",
  },

  reasons: {
    eyebrow: "Why",
    title: "Reasons I Love You",
    hint: "Tap a card to reveal what's written on it.",
  },

  polaroids: {
    eyebrow: "The Polaroid Wall",
    title: "Proof That We Already Have Too Many Memories",
  },

  song: {
    eyebrow: "While you read",
    title: "Our Song",
  },

  videos: {
    eyebrow: "Caught on film",
    title: "Moving Memories",
  },

  letter: {
    eyebrow: "Read slowly",
    title: "A Letter To You",
    greeting: "Dear Enele,",
    paragraphs: [
      "I don't think I've told you enough what these last two months have meant to me.",
      "You walked into my life and suddenly the ordinary things — morning texts, late-night calls, the silence between two people who don't need to fill it — all started to feel extraordinary.",
      "I know we're still writing the beginning, but I already know I want every chapter to have you in it.",
      "Happy Birthday, my love. I hope this year gives you everything you've been wishing for — and I hope I get to be there for as many of your birthdays as you'll let me.",
      "Here's to the first of many.",
    ],
    closing: "I love you.",
    signature: "— Teboho",
  },

  future: {
    eyebrow: "Looking ahead",
    title: "Still To Come...",
  },

  final: {
    thankYou: "Thank you for being you.",
    chapter: "Here's to another chapter.",
    words: ["More laughs.", "More adventures.", "More memories.", "More us."],
    birthday: "Happy Birthday, my love ❤",
    image: "/images/final/final.jpg",
    credit: "Made with love by Teboho",
    replay: "Replay Our Story ↻",
  },

  /**
   * THE SECRET — hidden away behind the small heart.
   * Click the tiny heart 5 times… you'll find it.
   */
  easterEgg: {
    clicks: 5,
    reveal: "Okay... you found the secret ❤",
    message: "[SECRET MESSAGE — maybe write how you really feel, unfiltered, for her eyes only]",
  },

  /**
   * OPTIONAL PASSWORD GATE.
   *
   * NOTE: This is a soft gate only. There is no real backend, so the
   * password is checked entirely in the visitor's browser. It will
   * politely deter the casually curious, but it is NOT real security —
   * anyone who opens the browser devtools can read the value below.
   * For real protection, put this behind a server (e.g. Vercel Edge
   * middleware or a small API route) before opening it up publicly.
   */
  passwordGate: {
    enabled: false,
    password: "change-me",
    title: "This little world is just for you.",
    placeholder: "Enter the password",
    unlockLabel: "Unlock ❤",
    error: "That's not quite it. Try again.",
  },

  /**
   * SEO / share metadata — shown when the link is pasted into
   * WhatsApp, iMessage, Facebook, Twitter, etc.
   */
  metadata: {
    title: "Enele Twala — Happy Birthday ❤",
    description: "A little digital story made with love.",
    /**
     * Portrait preview image used by messaging apps.
     * Place your own at public/images/og.jpg (1200 x 630 recommended).
     */
    image: "/images/og.jpg",
    /**
     * Your production domain — used to build absolute share links.
     * Leave blank to fall back to the current origin.
     */
    siteUrl: "",
  },
} ;

export type SiteConfig = typeof siteConfig;