// Helper script for individual blog post pages
// Automatically renders tags and metadata from centralized configuration

(function() {
  'use strict';

  function renderLockedPostGate(slug) {
    const root = document.querySelector('.post-content');
    if (!root) return;
    root.innerHTML = [
      '<a class="back-link" href="../index.html">&larr; Back to home</a>',
      '<section class="private-post-gate">',
      '<div class="private-gate-eyebrow">Private Project Journal</div>',
      '<h2>Invite required</h2>',
      '<p>We value privacy and are sharing this post only with selected people while the projects are still evolving.</p>',
      '<p>If you received an invite link, open it once and the site will unlock on this browser. You can also paste a PortKey below.</p>',
      '<form class="private-gate-form" id="private-post-gate-form">',
      '<input id="private-post-key" type="password" autocomplete="one-time-code" placeholder="Paste invite key" aria-label="Invite key" />',
      '<button class="read-more" type="submit">Unlock private posts</button>',
      '</form>',
      '<div class="private-gate-actions">',
      '<span class="access-chip">Locked: ', slug, '</span>',
      '</div>',
      '<div class="private-gate-status" id="private-post-gate-status"></div>',
      '</section>',
      '<a class="back-link" href="../index.html">&larr; Back to home</a>'
    ].join('');

    const form = document.getElementById('private-post-gate-form');
    const input = document.getElementById('private-post-key');
    const status = document.getElementById('private-post-gate-status');
    if (!form || !input || !status) return;

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      status.className = 'private-gate-status';
      status.textContent = 'Checking invite key...';
      const unlocked = await BLOG_CONFIG.unlockInvite(input.value);
      if (!unlocked) {
        status.classList.add('is-error');
        status.textContent = 'That key did not match. Check the invite link or ask for a fresh one.';
        return;
      }
      status.classList.add('is-success');
      status.textContent = 'Access granted. Reloading the private post...';
      window.location.reload();
    });
  }

  // Wait for DOM and BLOG_CONFIG to be ready
  async function initPostPage() {
    if (typeof BLOG_CONFIG === 'undefined') {
      console.error('BLOG_CONFIG not loaded. Make sure tags-config.js is included before post-helper.js');
      return;
    }

    // Get post slug from current page
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    const slug = filename.replace('.html', '');

    await BLOG_CONFIG.consumeInviteFromUrl();
    if (BLOG_CONFIG.isPrivateMode && BLOG_CONFIG.isPrivateMode() && !BLOG_CONFIG.isPublicPost(slug)) {
      const activeInvite = BLOG_CONFIG.getActiveInvite ? BLOG_CONFIG.getActiveInvite() : null;
      if (!activeInvite) {
        renderLockedPostGate(slug);
        return;
      }
    }

    // Get post metadata
    const postMeta = BLOG_CONFIG.getPostMeta(slug);
    if (!postMeta) {
      console.warn(`No metadata found for post: ${slug}`);
      return;
    }

    // Find and update tag display elements
    const tagContainers = document.querySelectorAll('[data-post-tags]');
    tagContainers.forEach(container => {
      const tagsText = BLOG_CONFIG.renderTagsText(postMeta.tags);
      container.innerHTML = tagsText;
    });

    // Find and update topic display elements
    const topicContainers = document.querySelectorAll('[data-post-topic]');
    topicContainers.forEach(container => {
      const topicLabel = BLOG_CONFIG.TOPIC_PROJECT_LABELS[postMeta.topic] || postMeta.topic;
      container.innerHTML = `<strong>${topicLabel}</strong>`;
    });

    // Find and update project display elements
    const projectContainers = document.querySelectorAll('[data-post-project]');
    projectContainers.forEach(container => {
      const projectLabel = BLOG_CONFIG.TOPIC_PROJECT_LABELS[postMeta.project] || postMeta.project;
      container.innerHTML = `<span class="post-tag">${projectLabel}</span>`;
    });
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPostPage);
  } else {
    initPostPage();
  }
})();
