// Centralized tag and topic/project configuration for Evergreen Gaming Blog
// This ensures consistency across all pages

const BLOG_CONFIG = {
  // Tag definitions with emojis
  TAG_LABELS: {
    gaming: "\uD83C\uDFAE gaming",
    tools: "\uD83E\uDDF0 tools",
    art: "\uD83C\uDFA8 art",
    meta: "\uD83E\uDDE0 meta",
    web: "\uD83C\uDF10 web",
    ui: "\uD83E\uDDE9 ui",
    workflow: "\u2699\uFE0F workflow",
    graphics: "\uD83D\uDDA5\uFE0F graphics",
    finance: "\uD83D\uDCC8 finance",
    devlog: "\uD83D\uDCDD devlog",
    product: "\uD83E\uDDED product",
    timeline: "\uD83D\uDCC8 timeline",
    "tech-art": "\uD83C\uDFA8 tech-art",
    portfolio: "\uD83D\uDCC2 portfolio",
    communication: "\uD83D\uDDE8\uFE0F communication",
    frustration: "\uD83D\uDE24 frustration"
  },

  // Unified labels for topics AND projects (both appear in Topics dropdown)
  TOPIC_PROJECT_LABELS: {
    // Topics
    "meta": "\uD83E\uDDE0 Meta",
    "experiments": "\uD83D\uDEE0\uFE0F Experiments",
    "gaming": "\uD83C\uDFAE Gaming",
    "welcome": "\uD83D\uDC4B Welcome",
    "tools": "\uD83E\uDDF0 Tools",
    // Projects
    "asset-viewer": "\uD83D\uDCC1 Asset Viewer",
    "stocktool": "\uD83D\uDCC8 StockTool",
    "modeleditor": "\uD83D\uDDA5\uFE0F ModelEditor",
    "promptomat": "\uD83E\uDDF0 Promptomat",
    "ai-experiment": "\uD83E\uDDEA AI-Experiment",
    "flyinggame": "\u2708\uFE0F FlyingGame"
  },

  // Post metadata - central source of truth for all posts
  POSTS: {
    "flyinggame-stabilization-and-first-true-dogfight-loop": {
      topic: "gaming",
      project: "flyinggame",
      tags: ["gaming", "devlog", "workflow", "meta"]
    },
    "flyinggame-12h-sprint-report": {
      topic: "gaming",
      project: "flyinggame",
      tags: ["gaming", "devlog", "workflow", "meta"]
    },
    "flyinggame-multiplayer-combat-breakthrough": {
      topic: "gaming",
      project: "flyinggame",
      tags: ["gaming", "devlog", "workflow", "meta"]
    },
    "flyinggame-contract-driven-execution": {
      topic: "gaming",
      project: "flyinggame",
      tags: ["gaming", "workflow", "devlog", "meta"]
    },
    "codex-session-workflow": {
      topic: "meta",
      project: "ai-experiment",
      tags: ["meta", "workflow", "tools", "web"]
    },
    "ai-to-the-rescue": {
      topic: "meta",
      project: "ai-experiment",
      tags: ["meta", "communication", "workflow", "frustration"]
    },
    "portfolio-journey": {
      topic: "meta",
      project: "ai-experiment",
      tags: ["meta", "web", "tools", "product", "timeline", "tech-art", "portfolio"]
    },
    "modeleditor-webgl-experiment": {
      topic: "experiments",
      project: "modeleditor",
      tags: ["graphics", "web", "tools"]
    },
    "blogging-with-ai": {
      topic: "meta",
      project: "ai-experiment",
      tags: ["meta", "workflow"]
    },
    "stocktool-experiment": {
      topic: "experiments",
      project: "stocktool",
      tags: ["finance", "ui", "tools"]
    },
    "stocktool-part2": {
      topic: "experiments",
      project: "stocktool",
      tags: ["finance", "ui", "tools", "workflow"]
    },
    "assetviewer-part1": {
      topic: "gaming",
      project: "asset-viewer",
      tags: ["tools", "graphics", "workflow", "gaming"]
    },
    "assetviewer-part2": {
      topic: "gaming",
      project: "asset-viewer",
      tags: ["tools", "graphics", "workflow", "gaming"]
    },
    "promptomat-creation": {
      topic: "welcome",
      project: "promptomat",
      tags: ["meta", "workflow", "tools"]
    },
    "promptomat-evolution": {
      topic: "meta",
      project: "promptomat",
      tags: ["meta", "workflow", "tools", "product"]
    },
    "promptomat-growth-engine": {
      topic: "meta",
      project: "promptomat",
      tags: ["meta", "workflow", "tools", "ui", "product"]
    },
    "promptomat-sharper-creative-pipeline": {
      topic: "meta",
      project: "promptomat",
      tags: ["meta", "workflow", "tools", "ui", "product", "art"]
    },
    "founder-loop-progress-story": {
      topic: "meta",
      project: "promptomat",
      tags: ["meta", "workflow", "tools", "ui", "product", "timeline", "finance", "gaming"]
    },
    "mojibake-encoding-nightmare": {
      topic: "meta",
      project: "ai-experiment",
      tags: ["meta", "workflow", "tools", "web"]
    }
  },

  PRIVATE_ACCESS: {
    mode: "invite-only",
    entryParam: "portkey",
    storageKey: "portkey-access-v1",
    inviteHashes: [
      {
        id: "portfolio-apply",
        label: "Portfolio application access",
        hash: "86527147a9e01e291c404e449dd2a22a07aec71bed7b542881cbf79904149757"
      },
      {
        id: "founder-loop",
        label: "Founder loop preview access",
        hash: "837919e9d83c572df6a25e393d9b8197ff355530614ad2e9b2b0fec772eb1a70"
      }
    ],
    publicPostSlugs: [],
    teaserVideo: {
      label: "FlyingGame teaser",
      url: "https://www.youtube.com/watch?v=wPsrf4RKovg"
    }
  },

  normalizeInvite(invite) {
    return String(invite || "").trim();
  },

  async sha256Hex(value) {
    const normalized = this.normalizeInvite(value);
    if (!normalized || !window.crypto || !window.crypto.subtle || !window.TextEncoder) return "";
    const bytes = new window.TextEncoder().encode(normalized);
    const digest = await window.crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest))
      .map((part) => part.toString(16).padStart(2, "0"))
      .join("");
  },

  getPrivateConfig() {
    return this.PRIVATE_ACCESS || {};
  },

  isPrivateMode() {
    return this.getPrivateConfig().mode === "invite-only";
  },

  getStoredInvite() {
    const cfg = this.getPrivateConfig();
    if (!cfg.storageKey || typeof window === "undefined" || !window.localStorage) return null;
    try {
      const raw = window.localStorage.getItem(cfg.storageKey);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  },

  setStoredInvite(entry) {
    const cfg = this.getPrivateConfig();
    if (!cfg.storageKey || typeof window === "undefined" || !window.localStorage) return;
    try {
      window.localStorage.setItem(cfg.storageKey, JSON.stringify(entry));
    } catch (error) {
      // Ignore storage failures and fall back to locked mode.
    }
  },

  clearStoredInvite() {
    const cfg = this.getPrivateConfig();
    if (!cfg.storageKey || typeof window === "undefined" || !window.localStorage) return;
    try {
      window.localStorage.removeItem(cfg.storageKey);
    } catch (error) {
      // Ignore storage failures.
    }
  },

  async resolveInvite(invite) {
    const normalized = this.normalizeInvite(invite);
    if (!normalized) return null;
    const hash = await this.sha256Hex(normalized);
    if (!hash) return null;
    const cfg = this.getPrivateConfig();
    const matches = Array.isArray(cfg.inviteHashes) ? cfg.inviteHashes : [];
    const match = matches.find((entry) => entry.hash === hash);
    if (!match) return null;
    return {
      id: match.id,
      label: match.label || match.id,
      grantedAt: new Date().toISOString()
    };
  },

  async unlockInvite(invite) {
    const resolved = await this.resolveInvite(invite);
    if (!resolved) return null;
    this.setStoredInvite(resolved);
    return resolved;
  },

  getActiveInvite() {
    return this.getStoredInvite();
  },

  clearInvite() {
    this.clearStoredInvite();
  },

  async consumeInviteFromUrl() {
    if (typeof window === "undefined" || !window.location) return this.getActiveInvite();
    const cfg = this.getPrivateConfig();
    const entryParam = cfg.entryParam || "invite";
    const params = new URLSearchParams(window.location.search || "");
    const invite = this.normalizeInvite(params.get(entryParam));
    if (!invite) return this.getActiveInvite();
    const resolved = await this.unlockInvite(invite);
    if (resolved) {
      params.delete(entryParam);
      const query = params.toString();
      const nextUrl = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash || ""}`;
      if (window.history && typeof window.history.replaceState === "function") {
        window.history.replaceState({}, document.title, nextUrl);
      }
    }
    return this.getActiveInvite();
  },

  isPublicPost(slug) {
    const cfg = this.getPrivateConfig();
    const publicPosts = Array.isArray(cfg.publicPostSlugs) ? cfg.publicPostSlugs : [];
    return publicPosts.includes(slug);
  },

  /**
   * Render tags as text with emojis
   * @param {string[]} tags - Array of tag keys
   * @returns {string} Formatted tag string
   */
  renderTagsText(tags) {
    return tags.map(tag => this.TAG_LABELS[tag] || tag).join(" | ");
  },

  /**
   * Render tags as clickable elements (for index page)
   * @param {HTMLElement} container - Container element
   * @param {string[]} tags - Array of tag keys
   * @param {Function} onTagClick - Callback when tag is clicked
   */
  renderTagsClickable(container, tags, onTagClick) {
    container.innerHTML = "";
    tags.forEach((tag, idx) => {
      if (idx > 0) {
        container.appendChild(document.createTextNode(" | "));
      }
      
      const tagLabel = this.TAG_LABELS[tag] || tag;
      const tagLink = document.createElement("span");
      tagLink.className = "tag-link";
      tagLink.textContent = tagLabel;
      tagLink.style.cursor = "pointer";
      tagLink.title = `Filter by ${tagLabel}`;
      
      tagLink.addEventListener("click", (e) => {
        e.preventDefault();
        onTagClick(tag);
      });
      
      container.appendChild(tagLink);
    });
  },

  /**
   * Get post metadata by slug
   * @param {string} slug - Post slug (filename without .html)
   * @returns {Object|null} Post metadata or null
   */
  getPostMeta(slug) {
    return this.POSTS[slug] || null;
  }
};

// Make available globally
if (typeof window !== 'undefined') {
  window.BLOG_CONFIG = BLOG_CONFIG;
}

