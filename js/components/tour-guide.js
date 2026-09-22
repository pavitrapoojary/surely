/**
 * Kunji (कुंजी) — Interactive Scenario Walkthrough Guide
 * Enables reviewers and evaluators to quickly step through Scenario A ("Twenty Ordinary Minutes"),
 * Scenario B ("Emergency Mode"), and Scenario C ("Meera's Multi-Space").
 */

const KunjiTourGuide = (() => {
  let isMinimized = false;

  function render() {
    const container = document.getElementById('tour-guide-container');
    if (!container) return;

    const currentRoute = KunjiRouter.getCurrentRoute();
    const isEmergency = currentRoute.path === 'emergency';
    const isSpaces = currentRoute.path === 'spaces';
    const isOnboarding = currentRoute.path === 'onboarding';
    const isHome = currentRoute.path === 'home';

    if (isMinimized) {
      container.innerHTML = `
        <div class="tour-bar" style="padding: 6px 14px;">
          <button class="btn btn-outline btn-sm" id="btn-maximize-tour" style="font-size: 11px; padding: 4px 8px;">
            ${KunjiIcons.render('sparkles', { size: 13, color: 'var(--color-primary)' })}
            <strong>Demo Scenario Guide</strong>
          </button>
        </div>
      `;
      document.getElementById('btn-maximize-tour')?.addEventListener('click', () => {
        isMinimized = false;
        render();
      });
      return;
    }

    container.innerHTML = `
      <div class="tour-bar" role="region" aria-label="Demo Scenario Guide">
        <div class="tour-label">
          ${KunjiIcons.render('sparkles', { size: 14, color: 'var(--color-primary)' })}
          <span>Demo Scenarios:</span>
        </div>

        <div class="tour-steps">
          <!-- Scenario A Button -->
          <button class="tour-btn ${isHome || isOnboarding ? 'active' : ''}" id="tour-btn-scenario-a" title="Scenario A: Ananya & Ravi 20-min joint record session">
            <strong>Scenario A:</strong> 20 Ordinary Minutes
          </button>

          <!-- Scenario B Button -->
          <button class="tour-btn ${isEmergency ? 'active' : ''}" id="tour-btn-scenario-b" title="Scenario B: Hospital emergency view">
            <strong>Scenario B:</strong> Emergency Mode
          </button>

          <!-- Scenario C Button -->
          <button class="tour-btn ${isSpaces ? 'active' : ''}" id="tour-btn-scenario-c" title="Scenario C: Meera's multi-family space view">
            <strong>Scenario C:</strong> Multi-Family
          </button>
        </div>

        <button class="btn btn-outline btn-sm" id="btn-minimize-tour" style="border: none; padding: 4px; font-size: 11px;" title="Minimize Guide">
          ✕
        </button>
      </div>
    `;

    document.getElementById('btn-minimize-tour')?.addEventListener('click', () => {
      isMinimized = true;
      render();
    });

    document.getElementById('tour-btn-scenario-a')?.addEventListener('click', () => {
      KunjiState.setActiveSpace('fs1');
      KunjiState.setActiveUser('u2'); // Ananya
      KunjiToast.info("Scenario A loaded: Ananya & Ravi building the Deshpande Family space.");
      KunjiRouter.navigate('/home');
    });

    document.getElementById('tour-btn-scenario-b')?.addEventListener('click', () => {
      KunjiState.setActiveSpace('fs1');
      KunjiState.setActiveUser('u2'); // Ananya looking up father's insurance at hospital
      KunjiToast.emergency("Scenario B loaded: Emergency Mode with rapid access to policy & documents.");
      KunjiRouter.navigate('/emergency');
    });

    document.getElementById('tour-btn-scenario-c')?.addEventListener('click', () => {
      KunjiState.setActiveUser('u3'); // Meera
      KunjiToast.info("Scenario C loaded: Meera managing parents' and in-laws' spaces.");
      KunjiRouter.navigate('/spaces');
    });
  }

  return {
    render
  };
})();
