/**
 * Kunji (कुंजी) — Entry Detail View (#/entry/:id)
 * Detailed view of a single family asset/record, showing physical document location,
 * dual-user audit trail, masking toggles, and edit capabilities.
 */

const KunjiEntryDetailView = (() => {
  function render(params = {}) {
    const container = document.getElementById('view-container');
    if (!container) return;

    const entryId = params.id;
    const entry = KunjiState.getEntryById(entryId);

    if (!entry) {
      container.className = 'main-content narrow-layout';
      container.innerHTML = `
        <div class="card" style="text-align: center; padding: 48px 20px;">
          <h2>Entry Not Found</h2>
          <p class="secondary-text">This record may have been removed or moved to another space.</p>
          <a href="#/home" class="btn btn-primary" style="margin-top: 16px;">Back to Family Ledger</a>
        </div>
      `;
      return;
    }

    container.className = 'main-content narrow-layout';

    const creator = KunjiState.getUser(entry.addedBy);
    const updater = KunjiState.getUser(entry.updatedBy);
    const iconName = KunjiIcons.getCategoryIconName(entry.category);

    container.innerHTML = `
      <div style="margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between;">
        <a href="#/home" class="btn btn-outline btn-sm">
          ${KunjiIcons.render('arrowLeft', { size: 14 })}
          <span>Back to Ledger</span>
        </a>

        <div style="display: flex; gap: 8px;">
          <button class="btn btn-outline btn-sm" id="btn-edit-entry">
            ${KunjiIcons.render('edit', { size: 14 })}
            <span>Edit</span>
          </button>
          <button class="btn btn-outline btn-sm" id="btn-delete-entry" style="color: var(--color-emergency-accent); border-color: var(--color-emergency-border);">
            ${KunjiIcons.render('trash', { size: 14, color: 'var(--color-emergency-accent)' })}
            <span>Delete</span>
          </button>
        </div>
      </div>

      <div class="detail-card">
        <!-- Header Info -->
        <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 20px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span class="category-tag">
                ${KunjiIcons.render(iconName, { size: 14, color: 'var(--color-primary)' })}
                ${entry.category}
              </span>
              ${entry.isEmergencyEssential ? `<span class="badge badge-emergency">${KunjiIcons.render('heart', { size: 12 })} Emergency Essential</span>` : ''}
            </div>
            <h1 style="font-size: 1.8rem; margin-bottom: 4px;">${entry.title}</h1>
            <p class="secondary-text" style="font-size: var(--text-sm); margin: 0;">
              ${entry.institution || 'Family Asset'} ${entry.identifier ? `• ${entry.identifier}` : ''}
            </p>
          </div>

          <div class="avatar-group">
            <span class="avatar avatar-md ${creator.avatarClass}" title="Added by ${creator.name}">${creator.initials}</span>
          </div>
        </div>

        <!-- Physical Document Location Box (Hero Feature) -->
        <div class="detail-location-feature">
          <div style="color: var(--color-accent-gold); margin-top: 3px;">
            ${KunjiIcons.render('mapPin', { size: 22, color: 'var(--color-accent-gold)' })}
          </div>
          <div style="flex: 1;">
            <strong style="font-size: var(--text-sm); text-transform: uppercase; letter-spacing: 0.04em; color: var(--color-text-secondary); display: block; margin-bottom: 4px;">
              Where physical documents are kept:
            </strong>
            <p style="font-size: 1.15rem; font-weight: 700; color: var(--color-text-primary); margin: 0; line-height: 1.4;">
              ${entry.location}
            </p>
          </div>
        </div>

        <!-- Key Information Grid -->
        <div class="grid-2" style="margin-bottom: 24px;">
          <div style="background: var(--color-surface-warm); padding: 14px 18px; border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
            <span style="font-size: var(--text-xs); color: var(--color-text-secondary); font-weight: 700; text-transform: uppercase;">Holder / Owner</span>
            <div style="font-size: var(--text-base); font-weight: 700; margin-top: 4px;">${entry.holder || 'Family'}</div>
          </div>

          <div style="background: var(--color-surface-warm); padding: 14px 18px; border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
            <span style="font-size: var(--text-xs); color: var(--color-text-secondary); font-weight: 700; text-transform: uppercase;">Nominee / Beneficiary</span>
            <div style="font-size: var(--text-base); font-weight: 700; margin-top: 4px;">${entry.nominee || 'Ananya Deshpande'}</div>
          </div>
        </div>

        <!-- Value / Coverage with Masking toggle -->
        <div style="background: var(--color-surface-warm); padding: 16px 20px; border-radius: var(--radius-sm); border: 1px solid var(--color-border); margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between;">
          <div>
            <span style="font-size: var(--text-xs); color: var(--color-text-secondary); font-weight: 700; text-transform: uppercase;">Approx Value / Coverage</span>
            <div id="detail-value-display" style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary); margin-top: 4px;">
              ${entry.masked ? '•••••••• (Masked for privacy)' : (entry.valueOrCoverage || 'Not specified')}
            </div>
          </div>

          ${entry.masked ? `
            <button class="btn btn-outline btn-sm" id="btn-unmask-toggle">
              ${KunjiIcons.render('eye', { size: 14 })}
              <span>Reveal Amount</span>
            </button>
          ` : ''}
        </div>

        <!-- Notes -->
        ${entry.notes ? `
          <div style="margin-bottom: 24px;">
            <h4 style="font-size: var(--text-sm); font-weight: 700; text-transform: uppercase; color: var(--color-text-secondary); margin-bottom: 8px;">
              Family Notes & Instructions
            </h4>
            <div style="background: #FFFFFF; border: 1.5px solid var(--color-border); border-radius: var(--radius-sm); padding: 14px 18px; font-size: var(--text-sm); line-height: 1.6;">
              ${entry.notes}
            </div>
          </div>
        ` : ''}

        <!-- Provenance / Dual-User Audit Trail (Spec §4) -->
        <div class="audit-trail">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="avatar avatar-sm ${creator.avatarClass}">${creator.initials}</span>
            <span>Created by <strong>${creator.name}</strong> on ${entry.createdAt}</span>
          </div>
          <span style="color: var(--color-text-secondary);">Last touched: ${entry.updatedAt}</span>
        </div>
      </div>
    `;

    // Unmask toggle
    document.getElementById('btn-unmask-toggle')?.addEventListener('click', () => {
      const valDisplay = document.getElementById('detail-value-display');
      if (valDisplay) {
        valDisplay.innerText = entry.valueOrCoverage || 'Not specified';
        KunjiToast.info("Amount revealed for this session.");
      }
    });

    // Delete handler
    document.getElementById('btn-delete-entry')?.addEventListener('click', () => {
      if (confirm(`Remove "${entry.title}" from the family ledger?`)) {
        KunjiState.deleteEntry(entry.id);
        KunjiToast.info(`"${entry.title}" removed.`);
        KunjiRouter.navigate('/home');
      }
    });

    // Edit handler (quick prompt / update)
    document.getElementById('btn-edit-entry')?.addEventListener('click', () => {
      const newLoc = prompt("Update physical document location:", entry.location);
      if (newLoc !== null && newLoc.trim() !== "") {
        KunjiState.updateEntry(entry.id, { location: newLoc.trim() });
        KunjiToast.success("Location updated!");
        render(params);
      }
    });
  }

  return {
    render
  };
})();
