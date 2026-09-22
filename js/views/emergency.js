/**
 * Kunji (कुंजी) — Emergency Mode View (#/emergency)
 * Radically stripped-down, high-legibility essentials view for stressful moments (e.g. hospital visits).
 * Answers three critical questions: Who to call? Where are the papers? What is the insurance policy #?
 */

const KunjiEmergencyView = (() => {
  function render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    container.className = 'main-content narrow-layout';

    const activeSpace = KunjiState.getActiveSpace();
    const contacts = KunjiState.getEmergencyContacts();
    const emergencyEntries = KunjiState.getEmergencyEssentials();

    // Separate insurance items vs other document locations
    const insuranceItems = emergencyEntries.filter(e => e.category.toLowerCase() === 'insurance');
    const physicalDocItems = emergencyEntries.filter(e => e.category.toLowerCase() !== 'insurance');

    container.innerHTML = `
      <div class="emergency-view">
        <!-- Top Navigation -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
          <a href="#/home" class="btn btn-outline btn-sm">
            ${KunjiIcons.render('arrowLeft', { size: 14 })}
            <span>Exit Emergency Mode</span>
          </a>
          <button class="btn btn-outline btn-sm no-print" id="btn-print-emergency">
            ${KunjiIcons.render('printer', { size: 14 })}
            <span>Print Emergency Sheet</span>
          </button>
        </div>

        <!-- Calm Emergency Header (Spec §5.2: calm deep terracotta-red, not alarm-red) -->
        <div class="emergency-header-banner">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              ${KunjiIcons.render('heart', { size: 20, color: '#FFFFFF' })}
              <span style="font-size: var(--text-xs); font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;">
                Emergency Essentials • ${activeSpace.name}
              </span>
            </div>
            <h1>When It Actually Matters</h1>
            <p>High-contrast, uncluttered view for rapid access during hospital visits or emergencies.</p>
          </div>
        </div>

        <!-- 1. Who to Call (In Order of Priority) -->
        <section class="emergency-card-section" aria-labelledby="emergency-contacts-title">
          <h2 class="emergency-section-title" id="emergency-contacts-title">
            ${KunjiIcons.render('phone', { size: 20, color: 'var(--color-emergency-accent)' })}
            <span>1. Who to Call (In Order)</span>
          </h2>

          <div class="contact-card-grid">
            ${contacts.map(c => `
              <div class="contact-card">
                <div class="contact-info">
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <span class="badge ${c.isPrimary ? 'badge-emergency' : 'badge-gold'}" style="font-size: 10px;">
                      Priority ${c.priority}
                    </span>
                    <span style="font-size: var(--text-xs); color: var(--color-text-secondary);">${c.relation}</span>
                  </div>
                  <h4 style="margin-top: 4px;">${c.name}</h4>
                  <div class="contact-phone">${c.phone}</div>
                  <p style="margin-top: 2px;">${c.location}</p>
                </div>

                <button class="btn btn-primary btn-sm btn-simulate-call" data-name="${c.name}" data-phone="${c.phone}" title="Call ${c.name}">
                  ${KunjiIcons.render('phone', { size: 14 })}
                  <span>Call</span>
                </button>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- 2. Health Insurance & Cashless Hospitalization (Surfaced First) -->
        <section class="emergency-card-section" aria-labelledby="emergency-insurance-title">
          <h2 class="emergency-section-title" id="emergency-insurance-title">
            ${KunjiIcons.render('shield', { size: 20, color: 'var(--color-emergency-accent)' })}
            <span>2. Health Insurance & Cashless Policies</span>
          </h2>

          ${insuranceItems.map(item => `
            <div class="insurance-highlight-card">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                <h3 style="font-size: 1.2rem; color: var(--color-text-primary); margin: 0;">${item.title}</h3>
                <span class="badge badge-filled" style="font-size: 11px;">Active Cashless</span>
              </div>

              <p style="font-size: var(--text-sm); color: var(--color-text-primary); margin-bottom: 12px;">
                <strong>Institution:</strong> ${item.institution}
              </p>

              <div class="insurance-grid">
                <div>
                  <div class="insurance-field-label">Policy / TPA ID</div>
                  <div class="insurance-field-value" style="color: var(--color-primary);">${item.identifier}</div>
                </div>
                <div>
                  <div class="insurance-field-label">Sum Coverage</div>
                  <div class="insurance-field-value">${item.valueOrCoverage}</div>
                </div>
                <div>
                  <div class="insurance-field-label">Primary Holder</div>
                  <div class="insurance-field-value">${item.holder}</div>
                </div>
              </div>

              <!-- Physical Card Location -->
              <div style="margin-top: 14px; padding-top: 10px; border-top: 1px solid rgba(78, 107, 88, 0.25); display: flex; align-items: flex-start; gap: 8px;">
                ${KunjiIcons.render('mapPin', { size: 16, color: 'var(--color-secondary)' })}
                <span style="font-size: var(--text-xs); color: var(--color-text-primary);">
                  <strong>Physical Card Location:</strong> ${item.location}
                </span>
              </div>

              ${item.notes ? `
                <div style="margin-top: 6px; font-size: var(--text-xs); color: var(--color-text-secondary);">
                  <strong>TPA Instructions:</strong> ${item.notes}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </section>

        <!-- 3. Physical Document Locations -->
        <section class="emergency-card-section" aria-labelledby="emergency-docs-title">
          <h2 class="emergency-section-title" id="emergency-docs-title">
            ${KunjiIcons.render('mapPin', { size: 20, color: 'var(--color-emergency-accent)' })}
            <span>3. Critical Physical Document Locations</span>
          </h2>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${physicalDocItems.map(item => `
              <div class="doc-location-box">
                <div class="doc-location-icon">
                  ${KunjiIcons.render('mapPin', { size: 20 })}
                </div>
                <div class="doc-location-text">
                  <h4>${item.title} (${item.category})</h4>
                  <p><strong>Location:</strong> ${item.location}</p>
                  ${item.notes ? `<p style="font-size: var(--text-xs); color: var(--color-text-secondary); margin-top: 3px;">Note: ${item.notes}</p>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Emergency Footer Note -->
        <div style="text-align: center; padding: 20px; color: var(--color-text-secondary); font-size: var(--text-xs);">
          Verified by Ravi & Ananya Deshpande • Emergency Mode strips all extraneous charts for pure clarity.
        </div>
      </div>
    `;

    // Simulated Call buttons
    container.querySelectorAll('.btn-simulate-call').forEach(btn => {
      btn.addEventListener('click', () => {
        const name = btn.dataset.name;
        const phone = btn.dataset.phone;
        KunjiToast.emergency(`Simulating call to ${name} (${phone})...`);
      });
    });

    // Print Emergency Sheet
    document.getElementById('btn-print-emergency')?.addEventListener('click', () => {
      window.print();
    });
  }

  return {
    render
  };
})();
