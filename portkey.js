(function () {
  'use strict';

  function byId(id) {
    return document.getElementById(id);
  }

  async function initPortKeyGate() {
    if (typeof BLOG_CONFIG === 'undefined' || !BLOG_CONFIG.isPrivateMode || !BLOG_CONFIG.isPrivateMode()) return;

    const gate = byId('private-gate');
    if (!gate) return;

    const form = byId('private-gate-form');
    const input = byId('private-gate-key');
    const clearBtn = byId('private-gate-clear');
    const topLockBtn = byId('private-top-lock');
    const status = byId('private-gate-status');
    const setStatus = (text, tone) => {
      if (!status) return;
      status.className = 'private-gate-status';
      if (tone) status.classList.add(tone);
      status.textContent = text || '';
    };

    const applyState = (message, tone) => {
      const activeInvite = BLOG_CONFIG.getActiveInvite ? BLOG_CONFIG.getActiveInvite() : null;
      const unlocked = !!activeInvite;
      gate.hidden = unlocked;
      document.body.classList.toggle('site-private-locked', !unlocked);
      document.body.classList.toggle('site-private-unlocked', unlocked);
      if (form) form.hidden = false;
      if (clearBtn) clearBtn.hidden = true;
      if (topLockBtn) topLockBtn.hidden = !unlocked;

      if (unlocked) {
        setStatus('', '');
      } else {
        setStatus(message || 'We value privacy and are sharing this archive only with selected people for now.', tone || '');
      }
    };

    await BLOG_CONFIG.consumeInviteFromUrl();
    applyState();

    if (form && input) {
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        setStatus('Checking PortKey invite...', '');
        const unlocked = await BLOG_CONFIG.unlockInvite(input.value);
        if (!unlocked) {
          setStatus('That PortKey did not match. Check the invite link or request a fresh application key.', 'is-error');
          return;
        }
        applyState('PortKey accepted. Private posts are now unlocked here.', 'is-success');
        input.value = '';
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        BLOG_CONFIG.clearInvite();
        if (input) input.value = '';
        applyState('This browser is locked again. Use a PortKey invite to reopen the private archive.', '');
      });
    }

    if (topLockBtn) {
      topLockBtn.addEventListener('click', () => {
        BLOG_CONFIG.clearInvite();
        if (input) input.value = '';
        applyState('This browser is locked again. Use a PortKey invite to reopen the private archive.', '');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortKeyGate);
  } else {
    initPortKeyGate();
  }
})();
