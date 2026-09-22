/**
 * Kunji (कुंजी) — Settings / Space Management View (#/settings)
 * Displays family members, simulated invite options, export/print ledger, and demo reset.
 */

const KunjiSettingsView = (() => {
  function render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    container.className = 'main-content narrow-layout';

    const activeSpace = KunjiState.getActiveSpace();
    const users = KunjiState.getUsers();

    container.innerHTML = `
      <div style="margin-bottom: 20px;">
        <a href="#/home" class="btn btn-outline btn-sm">
          ${KunjiIcons.render('arrowLeft', { size: 14 })}
          <span>Back to Ledger</span>
        </a>
      </div>

      <div class="card" style="margin-bottom: 24px;">
        <div class="card-header">
          <div>
            <h2 class="card-title">
              ${KunjiIcons.render('settings', { size: 20, color: 'var(--color-primary)' })}
              <span>Space Details & Members</span>
            </h2>
            <p class="card-subtitle">Manage members and shared ledger preferences for ${activeSpace.name}</p>
          </div>
          <span class="badge badge-gold">Active Space</span>
        </div>

        <!-- Space Metadata -->
        <div class="form-group">
          <label class="form-label">Space Name</label>
          <input type="text" class="form-input" value="${activeSpace.name}" readonly style="background: var(--color-surface-warm);">
        </div>

        <!-- Members in Space (Spec §2 & §4) -->
        <div style="margin-top: 24px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <h3 style="font-size: 1.05rem;">Family Members in this Space</h3>
            <button class="btn btn-outline btn-sm" id="btn-invite-member">
              ${KunjiIcons.render('plus', { size: 13 })}
              <span>Invite Member</span>
            </button>
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            <!-- Ravi -->
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: var(--color-surface-warm); border: 1px solid var(--color-border); border-radius: var(--radius-sm);">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span class="avatar avatar-ravi">RD</span>
                <div>
                  <strong style="display: block; font-size: var(--text-sm);">${users.u1.name}</strong>
                  <span style="font-size: var(--text-xs); color: var(--color-text-secondary);">${users.u1.roleLabel} • Solapur</span>
                </div>
              </div>
              <span class="badge badge-filled">Co-Owner</span>
            </div>

            <!-- Ananya -->
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: var(--color-surface-warm); border: 1px solid var(--color-border); border-radius: var(--radius-sm);">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span class="avatar avatar-ananya">AD</span>
                <div>
                  <strong style="display: block; font-size: var(--text-sm);">${users.u2.name}</strong>
                  <span style="font-size: var(--text-xs); color: var(--color-text-secondary);">${users.u2.roleLabel} • Bengaluru</span>
                </div>
              </div>
              <span class="badge badge-filled">Co-Owner</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Export & Print Actions -->
      <div class="card" style="margin-bottom: 24px;">
        <div class="card-header">
          <div>
            <h3 class="card-title">
              ${KunjiIcons.render('printer', { size: 18, color: 'var(--color-primary)' })}
              <span>Printable Family Summary</span>
            </h3>
            <p class="card-subtitle">Generate a tangible, paper ledger sheet for physical filing</p>
          </div>
        </div>

        <p style="font-size: var(--text-sm); color: var(--color-text-secondary); margin-bottom: 16px;">
          Many parents (including Ravi) appreciate having a physical paper printout in the study drawer. You can print the full ledger or emergency sheet cleanly anytime.
        </p>

        <button class="btn btn-outline" id="btn-print-full-ledger">
          ${KunjiIcons.render('printer', { size: 16 })}
          <span>Print Complete Family Ledger</span>
        </button>
      </div>

      <!-- Demo Control & Reset -->
      <div class="card" style="border-color: var(--color-border);">
        <div class="card-header">
          <div>
            <h3 class="card-title" style="color: var(--color-text-primary);">
              ${KunjiIcons.render('sparkles', { size: 18, color: 'var(--color-accent-gold)' })}
              <span>Demo State Controls</span>
            </h3>
            <p class="card-subtitle">Reset prototype data to original demo seeds</p>
          </div>
        </div>

        <p style="font-size: var(--text-sm); color: var(--color-text-secondary); margin-bottom: 16px;">
          If you tested adding, editing, or deleting entries and want to restore the pristine Deshpande & Meera scenarios, click reset below.
        </p>

        <button class="btn btn-outline btn-sm" id="btn-reset-demo" style="color: var(--color-primary); border-color: var(--color-primary);">
          Reset to Default Mock Data
        </button>
      </div>
    `;

    // Invite simulation
    document.getElementById('btn-invite-member')?.addEventListener('click', () => {
      const emailOrPhone = prompt("Enter family member's phone number or name:");
      if (emailOrPhone) {
        KunjiToast.success(`Simulated invite link sent to ${emailOrPhone}!`);
      }
    });

    // Print
    document.getElementById('btn-print-full-ledger')?.addEventListener('click', () => {
      window.print();
    });

    // Reset demo
    document.getElementById('btn-reset-demo')?.addEventListener('click', () => {
      if (confirm("Reset all entries and spaces back to original demo state?")) {
        KunjiState.reset();
        KunjiToast.info("Demo state restored to original seeds.");
        KunjiRouter.navigate('/home');
      }
    });
  }

  return {
    render
  };
})();
