/**
 * Kunji (कुंजी) — Family Space Switcher View (#/spaces)
 * Scenario C: Demonstrates multi-family record management for Meera Iyer (sandwich generation).
 */

const KunjiSpacesView = (() => {
  function render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    container.className = 'main-content';

    const state = KunjiState.getState();
    const activeSpace = KunjiState.getActiveSpace();
    const activeUser = KunjiState.getActiveUser();

    container.innerHTML = `
      <div style="max-width: 820px; margin: 0 auto;">
        <!-- Header -->
        <div style="margin-bottom: 24px; display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; flex-wrap: wrap;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <h1>Your Family Spaces</h1>
              <span class="badge badge-gold" style="font-size: 11px;">Multi-Family Support</span>
            </div>
            <p class="secondary-text" style="font-size: var(--text-sm); margin: 0;">
              Switch between your family ledgers or create a new space for parents/in-laws.
            </p>
          </div>

          <button class="btn btn-primary" id="btn-create-new-space">
            ${KunjiIcons.render('plus', { size: 16 })}
            <span>Create New Space</span>
          </button>
        </div>

        <!-- Scenario Explainer Box (Spec §3.3) -->
        <div style="background: var(--color-surface-warm); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 18px 22px; margin-bottom: 24px; display: flex; align-items: flex-start; gap: 14px;">
          <span class="avatar avatar-md avatar-meera" style="margin-top: 2px;">MI</span>
          <div>
            <h4 style="font-size: 1rem; margin-bottom: 3px;">Scenario: Meera Iyer (Sandwich Generation)</h4>
            <p style="font-size: var(--text-xs); color: var(--color-text-secondary); margin: 0; line-height: 1.5;">
              Meera (35, NRI based in Singapore) manages records for both her elderly parents in Bengaluru and her in-laws in Delhi. Kunji handles multiple family spaces cleanly with isolated permissions and zero clutter.
            </p>
          </div>
        </div>

        <!-- Spaces Grid -->
        <div class="spaces-grid">
          ${state.spaces.map(space => {
            const isActive = space.id === activeSpace.id;
            const spaceEntries = KunjiState.getEntries(space.id);
            const spaceMetrics = KunjiState.getCompletenessMetrics(space.id);

            return `
              <div class="space-card ${isActive ? 'active-space' : ''}" data-space-id="${space.id}">
                <div>
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                    <div class="brand-icon" style="width: 36px; height: 36px; background: ${isActive ? 'var(--color-primary)' : 'var(--color-surface-warm)'}; color: ${isActive ? '#FFFFFF' : 'var(--color-primary)'};">
                      ${KunjiIcons.render('home', { size: 18 })}
                    </div>
                    ${isActive ? `<span class="badge badge-filled">Current Active Space</span>` : `<span class="badge badge-empty">Click to Switch</span>`}
                  </div>

                  <h3 style="font-size: 1.25rem; margin-bottom: 4px;">${space.name}</h3>
                  <p style="font-size: var(--text-xs); color: var(--color-text-secondary); margin-bottom: 16px;">
                    ${space.description}
                  </p>

                  <!-- Completeness Gauge in Space Card -->
                  <div style="margin-bottom: 16px;">
                    <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
                      <span style="color: var(--color-text-secondary);">Completeness</span>
                      <strong style="color: var(--color-secondary);">${spaceMetrics.percentage}%</strong>
                    </div>
                    <div class="progress-track" style="height: 6px;">
                      <div class="progress-fill" style="width: ${spaceMetrics.percentage}%;"></div>
                    </div>
                  </div>
                </div>

                <div style="border-top: 1px solid var(--color-border-light); padding-top: 14px; display: flex; align-items: center; justify-content: space-between; font-size: var(--text-xs); color: var(--color-text-secondary);">
                  <span>${spaceEntries.length} ${spaceEntries.length === 1 ? 'record' : 'records'} logged</span>
                  <span style="color: var(--color-primary); font-weight: 600; display: flex; align-items: center; gap: 4px;">
                    ${isActive ? 'Viewing' : 'Open Space'}
                    ${KunjiIcons.render('arrowRight', { size: 12 })}
                  </span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    // Space selection
    container.querySelectorAll('.space-card').forEach(card => {
      card.addEventListener('click', () => {
        const spaceId = card.dataset.spaceId;
        KunjiState.setActiveSpace(spaceId);
        const newSpace = KunjiState.getActiveSpace();
        KunjiToast.success(`Switched to "${newSpace.name}"`);
        KunjiRouter.navigate('/home');
      });
    });

    // Create space modal / prompt
    document.getElementById('btn-create-new-space')?.addEventListener('click', () => {
      const name = prompt("Enter a name for the new Family Space (e.g. 'Iyer Family'):");
      if (name && name.trim()) {
        const created = KunjiState.addSpace(name.trim(), "Joint family record");
        KunjiToast.success(`Created "${created.name}"!`);
        render();
      }
    });
  }

  return {
    render
  };
})();
