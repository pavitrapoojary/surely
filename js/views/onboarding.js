/**
 * Kunji (कुंजी) — Onboarding View (#/onboarding)
 * 2-Step interactive flow to create a Family Space and simulate inviting a parent/child.
 */

const KunjiOnboardingView = (() => {
  let step = 1;
  let spaceName = "Deshpande Family";
  let creatorRole = "adult-child";
  let partnerName = "Ravi Deshpande";
  let partnerRelation = "Father";

  function render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    container.className = 'main-content narrow-layout';

    if (step === 1) {
      container.innerHTML = `
        <div class="form-card">
          <div class="form-header-bar">
            <div>
              <span class="badge badge-gold" style="margin-bottom: 6px;">Step 1 of 2</span>
              <h2>Create Your Family Space</h2>
              <p class="secondary-text" style="margin: 0; font-size: var(--text-sm);">
                A private, shared ledger for you and your family.
              </p>
            </div>
            <div class="brand-icon" style="width: 44px; height: 44px; border-radius: 12px;">
              ${KunjiIcons.render('home', { size: 24, color: '#FFFFFF' })}
            </div>
          </div>

          <form id="onboarding-step-1-form">
            <div class="form-group">
              <label class="form-label" for="input-space-name">What should we call this Family Space?</label>
              <input type="text" id="input-space-name" class="form-input" value="${spaceName}" placeholder="e.g. Deshpande Family" required>
              <div class="form-hint">Both you and your family member will see this name.</div>
            </div>

            <div class="form-group">
              <label class="form-label">Who are you setting this up with?</label>
              <div class="author-picker">
                <div class="author-option ${creatorRole === 'adult-child' ? 'selected' : ''}" data-role="adult-child">
                  <span class="avatar avatar-sm avatar-ananya">AD</span>
                  <div>
                    <strong style="display: block; font-size: var(--text-sm);">I'm the Adult Child</strong>
                    <span style="font-size: var(--text-xs); color: var(--color-text-secondary);">Setting this up with my parent</span>
                  </div>
                </div>

                <div class="author-option ${creatorRole === 'parent' ? 'selected' : ''}" data-role="parent">
                  <span class="avatar avatar-sm avatar-ravi">RD</span>
                  <div>
                    <strong style="display: block; font-size: var(--text-sm);">I'm the Parent</strong>
                    <span style="font-size: var(--text-xs); color: var(--color-text-secondary);">Setting this up with my child</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="input-partner-name">Family Member's Name</label>
              <input type="text" id="input-partner-name" class="form-input" value="${partnerName}" placeholder="e.g. Ravi Deshpande" required>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 30px;">
              <a href="#/" class="btn btn-outline btn-sm">Cancel</a>
              <button type="submit" class="btn btn-primary" id="btn-next-step">
                Continue to Invite
                ${KunjiIcons.render('arrowRight', { size: 16 })}
              </button>
            </div>
          </form>
        </div>
      `;

      // Role selection handlers
      document.querySelectorAll('.author-option').forEach(opt => {
        opt.addEventListener('click', () => {
          document.querySelectorAll('.author-option').forEach(o => o.classList.remove('selected'));
          opt.classList.add('selected');
          creatorRole = opt.dataset.role;
          if (creatorRole === 'adult-child') {
            partnerName = "Ravi Deshpande";
            partnerRelation = "Father";
          } else {
            partnerName = "Ananya Deshpande";
            partnerRelation = "Daughter";
          }
          const partnerInput = document.getElementById('input-partner-name');
          if (partnerInput) partnerInput.value = partnerName;
        });
      });

      document.getElementById('onboarding-step-1-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        spaceName = document.getElementById('input-space-name').value || "Deshpande Family";
        partnerName = document.getElementById('input-partner-name').value || "Ravi Deshpande";
        step = 2;
        render();
      });

    } else {
      // Step 2: Invite Simulation
      container.innerHTML = `
        <div class="form-card">
          <div class="form-header-bar">
            <div>
              <span class="badge badge-gold" style="margin-bottom: 6px;">Step 2 of 2</span>
              <h2>Invite ${partnerName}</h2>
              <p class="secondary-text" style="margin: 0; font-size: var(--text-sm);">
                Kunji is built for two. Send a friendly invite link to start noting things down together.
              </p>
            </div>
            <div class="brand-icon" style="width: 44px; height: 44px; border-radius: 12px; background: var(--color-secondary);">
              ${KunjiIcons.render('users', { size: 24, color: '#FFFFFF' })}
            </div>
          </div>

          <!-- Dual persona visual -->
          <div style="background: var(--color-surface-warm); border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 18px; margin-bottom: 24px;">
            <div style="display: flex; align-items: center; justify-content: space-around; text-align: center;">
              <div>
                <span class="avatar avatar-lg ${creatorRole === 'adult-child' ? 'avatar-ananya' : 'avatar-ravi'}">
                  ${creatorRole === 'adult-child' ? 'AD' : 'RD'}
                </span>
                <strong style="display: block; font-size: var(--text-sm); margin-top: 6px;">
                  ${creatorRole === 'adult-child' ? 'Ananya (You)' : 'Ravi (You)'}
                </strong>
                <span class="badge badge-filled" style="font-size: 10px; margin-top: 2px;">Creator</span>
              </div>

              <div style="color: var(--color-primary); display: flex; flex-direction: column; align-items: center;">
                <span style="font-size: var(--text-xs); font-weight: 700; color: var(--color-text-secondary); margin-bottom: 4px;">Shared Key</span>
                ${KunjiIcons.render('key', { size: 24, color: 'var(--color-primary)' })}
              </div>

              <div>
                <span class="avatar avatar-lg ${creatorRole === 'adult-child' ? 'avatar-ravi' : 'avatar-ananya'}">
                  ${creatorRole === 'adult-child' ? 'RD' : 'AD'}
                </span>
                <strong style="display: block; font-size: var(--text-sm); margin-top: 6px;">${partnerName}</strong>
                <span class="badge badge-empty" style="font-size: 10px; margin-top: 2px;">Invited</span>
              </div>
            </div>
          </div>

          <!-- Simulated Invite Link Box -->
          <div class="form-group">
            <label class="form-label">Simulated WhatsApp / SMS Invite Message</label>
            <div style="background: #FFFFFF; border: 1.5px solid var(--color-border); border-radius: var(--radius-sm); padding: 14px; font-size: var(--text-sm); line-height: 1.5; color: var(--color-text-primary);">
              "Hi ${partnerName.split(' ')[0]}, let's note down our family insurance & bank details on Kunji so we both have it handy: <strong>https://kunji.family/join/deshpande-space</strong>"
            </div>
          </div>

          <div style="display: flex; gap: 12px; margin-bottom: 24px;">
            <button type="button" class="btn btn-outline" id="btn-copy-invite" style="flex: 1;">
              ${KunjiIcons.render('share', { size: 16 })}
              Copy Invite Message
            </button>
            <button type="button" class="btn btn-secondary" id="btn-simulate-accept" style="flex: 1;">
              ${KunjiIcons.render('checkCircle', { size: 16 })}
              Simulate Instant Accept
            </button>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--color-border-light); padding-top: 20px;">
            <button type="button" class="btn btn-outline btn-sm" id="btn-back-step-1">Back</button>
            <button type="button" class="btn btn-primary" id="btn-finish-onboarding">
              Open ${spaceName}
              ${KunjiIcons.render('arrowRight', { size: 16 })}
            </button>
          </div>
        </div>
      `;

      document.getElementById('btn-back-step-1')?.addEventListener('click', () => {
        step = 1;
        render();
      });

      document.getElementById('btn-copy-invite')?.addEventListener('click', () => {
        KunjiToast.info("Simulated invite link copied to clipboard!");
      });

      document.getElementById('btn-simulate-accept')?.addEventListener('click', () => {
        KunjiToast.success(`${partnerName} accepted the invite! Both members connected.`);
      });

      document.getElementById('btn-finish-onboarding')?.addEventListener('click', () => {
        KunjiState.setActiveSpace('fs1');
        KunjiState.setActiveUser(creatorRole === 'adult-child' ? 'u2' : 'u1');
        KunjiToast.success(`Welcome to ${spaceName}! Start by adding your first record.`);
        step = 1; // Reset for next time
        KunjiRouter.navigate('/home');
      });
    }
  }

  return {
    render
  };
})();
