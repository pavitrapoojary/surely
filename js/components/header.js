/**
 * Kunji (कुंजी) — Global Navigation Header
 * Displays the warm ledger brand mark, active family space, dual-user identity,
 * user switcher (Ravi vs Ananya), and the calm Emergency Mode entry point.
 */

const KunjiHeader = (() => {
  function render() {
    const container = document.getElementById('header-container');
    if (!container) return;

    const currentRoute = KunjiRouter.getCurrentRoute();
    const isLanding = currentRoute.path === '' || currentRoute.path === '/';
    const isEmergency = currentRoute.path === 'emergency';

    const activeSpace = KunjiState.getActiveSpace();
    const activeUser = KunjiState.getActiveUser();
    const users = KunjiState.getUsers();

    if (isLanding) {
      container.innerHTML = `
        <header class="site-header">
          <div class="header-inner">
            <a href="#/" class="brand-group">
              <div class="brand-icon">
                ${KunjiIcons.render('key', { size: 20, color: '#FFFFFF' })}
              </div>
              <div class="brand-text">
                <span class="brand-name">Kunji <span style="font-weight: 400; font-size: 0.95rem; opacity: 0.85;">(कुंजी)</span></span>
                <span class="brand-tagline">The key to what your family already owns</span>
              </div>
            </a>
            <div class="header-actions">
              <a href="#/home" class="btn btn-primary btn-sm">
                Open Family Space
                ${KunjiIcons.render('arrowRight', { size: 14 })}
              </a>
            </div>
          </div>
        </header>
      `;
      return;
    }

    // Standard In-App Header
    container.innerHTML = `
      <header class="site-header">
        <div class="header-inner">
          <div style="display: flex; align-items: center; gap: 16px;">
            <a href="#/home" class="brand-group" title="Kunji Home">
              <div class="brand-icon">
                ${KunjiIcons.render('key', { size: 20, color: '#FFFFFF' })}
              </div>
              <div class="brand-text">
                <span class="brand-name">Kunji <span style="font-weight: 400; font-size: 0.95rem; opacity: 0.85;">(कुंजी)</span></span>
                <span class="brand-tagline">Shared Family Record</span>
              </div>
            </a>

            <!-- Space Switcher Pill -->
            <a href="#/spaces" class="btn btn-outline btn-sm space-pill" style="display: inline-flex; align-items: center; gap: 6px; font-weight: 600;" title="Switch Family Space">
              ${KunjiIcons.render('home', { size: 14, color: 'var(--color-primary)' })}
              <span>${activeSpace.name}</span>
              <span style="font-size: 10px; color: var(--color-text-secondary); background: var(--color-surface-warm); padding: 2px 6px; border-radius: 4px;">Switch</span>
            </a>
          </div>

          <div class="header-actions">
            <!-- Active Person / Dual-User Persona Selector -->
            <div class="dual-user-chip" style="cursor: pointer;" id="user-persona-toggle" title="Switch between Ravi and Ananya to test paired logging">
              <div class="avatar-group">
                <span class="avatar avatar-sm ${users.u1.avatarClass}" title="${users.u1.name} (Parent)">${users.u1.initials}</span>
                <span class="avatar avatar-sm ${users.u2.avatarClass}" title="${users.u2.name} (Adult Child)">${users.u2.initials}</span>
              </div>
              <div style="display: flex; flex-direction: column; text-align: left; line-height: 1.1;">
                <span style="font-size: 10px; color: var(--color-text-secondary); text-transform: uppercase;">Acting As</span>
                <strong style="color: var(--color-text-primary); font-size: 12px;">${activeUser.name.split(' ')[0]} (${activeUser.role === 'parent' ? 'Parent' : 'Child'})</strong>
              </div>
              ${KunjiIcons.render('user', { size: 12, color: 'var(--color-text-secondary)' })}
            </div>

            <!-- Emergency Mode Button -->
            <a href="#/emergency" class="btn ${isEmergency ? 'btn-secondary' : 'btn-emergency'} btn-sm" id="btn-header-emergency" title="Open Emergency Mode">
              ${KunjiIcons.render('heart', { size: 15 })}
              <span>${isEmergency ? 'Emergency View' : 'Emergency Mode'}</span>
            </a>

            <!-- Settings -->
            <a href="#/settings" class="btn btn-outline btn-icon-only" title="Settings & Space Details">
              ${KunjiIcons.render('settings', { size: 16 })}
            </a>
          </div>
        </div>
      </header>
    `;

    // Persona switcher event
    const personaToggle = document.getElementById('user-persona-toggle');
    if (personaToggle) {
      personaToggle.addEventListener('click', () => {
        const nextUser = activeUser.id === 'u1' ? 'u2' : 'u1';
        KunjiState.setActiveUser(nextUser);
        const newUserObj = KunjiState.getActiveUser();
        KunjiToast.info(`Now viewing as ${newUserObj.name} (${newUserObj.roleLabel})`);
        render();
        KunjiRouter.handleRouting(); // Re-render current view with new attribution
      });
    }
  }

  return {
    render
  };
})();
