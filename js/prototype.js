/**
 * SURELY — Interactive Prototype Controller
 * Implements Screens 1 to 5 from SURELY_Website_Spec.md §5
 */

(function() {
  const containerId = 'prototype-viewport';

  function getViewport() {
    return document.getElementById(containerId);
  }

  function showToast(message, type = 'default') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'toast-success' : ''}`;
    toast.innerHTML = `
      <span>${type === 'success' ? Icons.check() : Icons.sparkles()}</span>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 200ms ease';
      setTimeout(() => toast.remove(), 200);
    }, 2800);
  }

  // --------------------------------------------------------------------------
  // Screen 1: Family Space Home (Completeness Checklist)
  // --------------------------------------------------------------------------
  function renderChecklist(state) {
    const viewport = getViewport();
    if (!viewport) return;

    const stats = SurelyState.getStats();
    const completeness = SurelyState.getCompleteness();
    const currentUser = state.family.members.find(m => m.id === state.currentUser) || state.family.members[0];

    viewport.innerHTML = `
      <div class="app-screen-checklist">
        <!-- Family Space Header -->
        <div class="family-space-header">
          <div class="family-space-info">
            <span class="space-eyebrow">Shared Family Ledger</span>
            <h2 class="space-name">${state.family.name}</h2>
          </div>
          <div class="family-member-avatars" title="Members in space">
            ${state.family.members.map(m => `
              <div class="member-avatar-chip ${m.role.includes('child') ? 'child' : ''}" title="${m.name} (${m.role})">
                ${m.avatarInitials}
              </div>
            `).join('')}
            <button class="add-member-mini-btn" id="proto-invite-btn" title="Invite a family member">
              ${Icons.plus()}
            </button>
          </div>
        </div>

        <!-- Completeness Progress Summary -->
        <div class="completeness-card">
          <div class="completeness-top-row">
            <span class="completeness-title">Completeness Checklist</span>
            <span class="completeness-fraction">${stats.completed} of ${stats.total} covered (${stats.percent}%)</span>
          </div>
          <div class="completeness-progress-track">
            <div class="completeness-progress-fill" style="width: ${stats.percent}%;"></div>
          </div>
        </div>

        <!-- Category Cards Grid (8 Categories) -->
        <div class="categories-grid">
          ${state.categories.map(cat => {
            const isComplete = completeness[cat.id] === 'complete';
            const entries = SurelyState.getEntriesByCategory(cat.id);
            return `
              <div class="category-card ${isComplete ? 'is-complete' : 'is-empty'}" data-cat="${cat.id}">
                <div class="category-card-header">
                  <div class="category-icon-box">
                    ${Icons.get(cat.icon)}
                  </div>
                  <div class="category-status-indicator">
                    ${isComplete 
                      ? `<div class="complete-checkmark">${Icons.check()}</div>` 
                      : `<span class="add-affordance-btn">${Icons.plus()} Add</span>`
                    }
                  </div>
                </div>
                <div class="category-card-body">
                  <span class="category-label">${cat.label}</span>
                  <span class="category-entry-count">
                    ${isComplete ? `${entries.length} ${entries.length === 1 ? 'entry' : 'entries'}` : 'Not listed yet'}
                  </span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Floating Emergency Mode Launcher -->
      <div class="phone-emergency-dock">
        <button class="emergency-launch-btn" id="proto-emergency-btn">
          <div class="emergency-launch-left">
            <span class="emergency-alert-icon">${Icons.alert()}</span>
            <span>Emergency Mode</span>
          </div>
          <span class="emergency-launch-sub">Contacts & Essentials →</span>
        </button>
      </div>
    `;

    // Attach Event Listeners
    viewport.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('click', () => {
        const catId = card.getAttribute('data-cat');
        const isComplete = completeness[catId] === 'complete';
        if (isComplete) {
          SurelyState.setScreen('category', { category: catId });
        } else {
          SurelyState.setScreen('add', { category: catId });
        }
      });
    });

    const emergencyBtn = viewport.querySelector('#proto-emergency-btn');
    if (emergencyBtn) {
      emergencyBtn.addEventListener('click', () => {
        SurelyState.setScreen('emergency');
      });
    }

    const inviteBtn = viewport.querySelector('#proto-invite-btn');
    if (inviteBtn) {
      inviteBtn.addEventListener('click', openInviteModal);
    }
  }

  // --------------------------------------------------------------------------
  // Screen 2: Category Detail View
  // --------------------------------------------------------------------------
  function renderCategoryDetail(state) {
    const viewport = getViewport();
    if (!viewport) return;

    const catId = state.selectedCategory || 'bank';
    const category = state.categories.find(c => c.id === catId) || state.categories[0];
    const entries = SurelyState.getEntriesByCategory(catId);

    viewport.innerHTML = `
      <div class="app-screen-detail">
        <div class="screen-subnav-header">
          <button class="screen-back-btn" id="proto-back-checklist">
            ${Icons['arrow-left']()} Back to checklist
          </button>
          <span class="badge badge-sage">${entries.length} ${entries.length === 1 ? 'Record' : 'Records'}</span>
        </div>

        <div class="detail-category-header">
          <div class="detail-cat-icon">
            ${Icons.get(category.icon)}
          </div>
          <div>
            <h3 class="detail-cat-title">${category.label}</h3>
            <p class="detail-cat-desc">${category.description}</p>
          </div>
        </div>

        <div class="entries-list">
          ${entries.length === 0 ? `
            <div style="text-align:center; padding: 2rem 1rem; color: var(--brown-muted);">
              <p>No entries in this category yet.</p>
              <button class="btn btn-primary btn-sm" id="proto-add-first-btn" style="margin-top: 0.5rem;">
                ${Icons.plus()} Add First Entry
              </button>
            </div>
          ` : entries.map(entry => `
            <div class="entry-card" data-entry-id="${entry.id}">
              <div class="entry-card-top">
                <div>
                  <h4 class="entry-title">${entry.title}</h4>
                  <p class="entry-holder">Holder: <strong>${entry.holder}</strong></p>
                </div>
                <button class="btn btn-outline btn-sm delete-entry-btn" data-id="${entry.id}" title="Remove entry" style="padding: 0.2rem 0.4rem; border:none; color: var(--brown-muted);">
                  ${Icons.close()}
                </button>
              </div>

              <div class="entry-location-row">
                ${Icons['map-pin']()}
                <span>${entry.location}</span>
              </div>

              ${entry.notes ? `
                <div class="entry-notes">${entry.notes}</div>
              ` : ''}

              <div class="entry-value-row">
                <div class="value-mask-chip" data-id="${entry.id}" title="Click to reveal or mask value">
                  ${entry.masked ? Icons.lock() : Icons.eye()}
                  <span class="value-text ${entry.masked ? 'value-dots' : ''}">
                    ${entry.masked ? '•••••••••' : entry.actualValue || entry.value}
                  </span>
                </div>
                <span class="entry-attribution">Added by ${entry.addedBy}</span>
              </div>
            </div>
          `).join('')}
        </div>

        <button class="btn btn-primary" id="proto-add-more-btn" style="width: 100%; margin-top: 0.5rem;">
          ${Icons.plus()} Add another ${category.label.toLowerCase()} entry
        </button>
      </div>
    `;

    // Event Listeners
    viewport.querySelector('#proto-back-checklist').addEventListener('click', () => {
      SurelyState.setScreen('checklist');
    });

    viewport.querySelectorAll('.value-mask-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.stopPropagation();
        const entryId = chip.getAttribute('data-id');
        SurelyState.toggleMasking(entryId);
        const entry = state.entries.find(en => en.id === entryId);
        showToast(entry.masked ? 'Value masked for privacy 🔒' : 'Value revealed 👁️');
      });
    });

    viewport.querySelectorAll('.delete-entry-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const entryId = btn.getAttribute('data-id');
        SurelyState.deleteEntry(entryId);
        showToast('Entry removed', 'default');
      });
    });

    const addMoreBtn = viewport.querySelector('#proto-add-more-btn');
    if (addMoreBtn) {
      addMoreBtn.addEventListener('click', () => {
        SurelyState.setScreen('add', { category: catId });
      });
    }

    const addFirstBtn = viewport.querySelector('#proto-add-first-btn');
    if (addFirstBtn) {
      addFirstBtn.addEventListener('click', () => {
        SurelyState.setScreen('add', { category: catId });
      });
    }
  }

  // --------------------------------------------------------------------------
  // Screen 3: Guided Entry Creation (<60 seconds)
  // --------------------------------------------------------------------------
  function renderAddEntry(state) {
    const viewport = getViewport();
    if (!viewport) return;

    const defaultCat = state.selectedCategory || 'bank';
    const currentUserObj = state.family.members.find(m => m.id === state.currentUser) || state.family.members[0];

    viewport.innerHTML = `
      <div class="app-screen-add">
        <div class="screen-subnav-header">
          <button class="screen-back-btn" id="proto-back-prev">
            ${Icons['arrow-left']()} Back
          </button>
          <span class="badge badge-terracotta">Under 60s Guided Entry</span>
        </div>

        <form class="add-entry-form" id="proto-entry-form">
          <div class="form-group">
            <label class="form-label" for="entry-category">Category</label>
            <select class="form-select" id="entry-category" required>
              ${state.categories.map(c => `
                <option value="${c.id}" ${c.id === defaultCat ? 'selected' : ''}>${c.label}</option>
              `).join('')}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="entry-title">What is this? (Title)</label>
            <input class="form-input" id="entry-title" type="text" placeholder="e.g. SBI Fixed Deposit, Max Life Policy" required value="${getSuggestedTitle(defaultCat)}">
          </div>

          <div class="form-group">
            <label class="form-label" for="entry-holder">Account Holder / Institution</label>
            <input class="form-input" id="entry-holder" type="text" placeholder="e.g. Suresh Rao / SBI FC Road" value="${currentUserObj.name}">
          </div>

          <div class="form-group">
            <label class="form-label" for="entry-value">Approximate Value / Coverage (Optional)</label>
            <input class="form-input" id="entry-value" type="text" placeholder="e.g. ₹2,50,000 or ₹10 Lakhs cover" value="₹3,50,000">
          </div>

          <div class="mask-toggle-group">
            <div class="mask-toggle-left">
              <span style="color: var(--terracotta);">${Icons.lock()}</span>
              <div>
                <span class="mask-toggle-text">Mask this value</span>
                <p class="form-hint" style="margin: 0;">Hides exact balance behind dots</p>
              </div>
            </div>
            <label class="switch-label">
              <input type="checkbox" id="entry-masked" checked>
              <span class="switch-slider"></span>
            </label>
          </div>

          <div class="form-group">
            <label class="form-label" for="entry-location">Where is the physical / digital document?</label>
            <input class="form-input" id="entry-location" type="text" placeholder="e.g. Wooden desk bottom drawer / Netbanking" value="Study desk folder #2 / Net-banking registered" required>
          </div>

          <div class="form-group">
            <label class="form-label" for="entry-notes">Helpful notes for family (Optional)</label>
            <textarea class="form-textarea" id="entry-notes" placeholder="e.g. Maturity date Dec 2028. Nominee registered as Ananya.">Matured in 2027. Nominee updated.</textarea>
          </div>

          <button type="submit" class="btn btn-primary btn-lg" style="width: 100%; margin-top: 0.5rem;" id="proto-save-entry-btn">
            ${Icons.check()} Save Entry & Update Checklist
          </button>
        </form>
      </div>
    `;

    viewport.querySelector('#proto-back-prev').addEventListener('click', () => {
      SurelyState.setScreen('checklist');
    });

    const form = viewport.querySelector('#proto-entry-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const category = viewport.querySelector('#entry-category').value;
      const title = viewport.querySelector('#entry-title').value;
      const holder = viewport.querySelector('#entry-holder').value;
      const value = viewport.querySelector('#entry-value').value;
      const masked = viewport.querySelector('#entry-masked').checked;
      const location = viewport.querySelector('#entry-location').value;
      const notes = viewport.querySelector('#entry-notes').value;

      const newEntry = SurelyState.addEntry({
        category,
        title,
        holder,
        value,
        masked,
        location,
        notes
      });

      showToast(`✓ Added "${title}" — Checklist updated!`, 'success');

      // Animate back to checklist view
      setTimeout(() => {
        SurelyState.setScreen('checklist');
      }, 350);
    });
  }

  function getSuggestedTitle(catId) {
    switch (catId) {
      case 'digital': return 'Google & DigiLocker Primary Email';
      case 'investments': return 'Zerodha Demat Account & MF Portfolio';
      case 'other': return 'Registered Family Will & POA Papers';
      case 'bank': return 'ICICI Fixed Deposit Receipt';
      case 'insurance': return 'Star Health Family Mediclaim';
      default: return 'Important Family Record';
    }
  }

  // --------------------------------------------------------------------------
  // Screen 4: Emergency Mode (Calmest, Starkest Screen)
  // --------------------------------------------------------------------------
  function renderEmergency(state) {
    const viewport = getViewport();
    if (!viewport) return;

    const essentials = SurelyState.getEmergencyItems();

    viewport.innerHTML = `
      <div class="app-screen-emergency">
        <!-- Emergency Top Bar -->
        <div class="emergency-top-bar">
          <div class="emergency-screen-title">
            <span style="color: var(--terracotta);">${Icons.alert()}</span>
            <span>Emergency Mode</span>
          </div>
          <button class="emergency-exit-btn" id="proto-exit-emergency">
            Exit Mode
          </button>
        </div>

        <!-- Section 1: Who To Call -->
        <div>
          <h4 class="emergency-section-title">Who to call</h4>
          <div class="emergency-contacts-list">
            ${state.emergencyContacts.map(contact => `
              <div class="emergency-contact-card">
                <div class="contact-info-block">
                  <div class="contact-avatar">${contact.avatar}</div>
                  <div>
                    <span class="contact-name">${contact.name}</span>
                    <span class="contact-role" style="display:block;">${contact.relation}</span>
                  </div>
                </div>
                <button class="call-tap-btn" data-phone="${contact.phone}" data-name="${contact.name}">
                  ${Icons.phone()} Call
                </button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Section 2: Where Essentials Are -->
        <div>
          <h4 class="emergency-section-title">Where the essentials are</h4>
          <div class="emergency-essentials-list">
            ${essentials.map(item => `
              <div class="emergency-essential-card">
                <span class="essential-title">${item.title}</span>
                <div class="essential-location">
                  ${Icons['map-pin']()}
                  <span>${item.location}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Calm Stark Footer -->
        <div class="emergency-calm-footer">
          "Everything else can wait."
        </div>
      </div>
    `;

    viewport.querySelector('#proto-exit-emergency').addEventListener('click', () => {
      SurelyState.setScreen('checklist');
    });

    viewport.querySelectorAll('.call-tap-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const name = btn.getAttribute('data-name');
        const phone = btn.getAttribute('data-phone');
        showToast(`📞 Dialing ${name} (${phone}) [Mock Action]`, 'success');
      });
    });
  }

  // --------------------------------------------------------------------------
  // Invite Family Member Modal
  // --------------------------------------------------------------------------
  function openInviteModal() {
    let modal = document.getElementById('proto-invite-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'proto-invite-modal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-content">
        <button class="modal-close-btn" id="modal-close">${Icons.close()}</button>
        <div style="margin-bottom: 1.25rem;">
          <span class="eyebrow-pill">Family Space Onboarding</span>
          <h3 style="font-size: 1.35rem; color: var(--brown-ink); margin-top: 0.5rem;">Invite a Family Member</h3>
          <p style="font-size: var(--text-xs); color: var(--brown-soft); margin-top: 0.25rem;">
            Add a parent, spouse, or adult child to collaborate on this shared memory ledger.
          </p>
        </div>

        <form id="invite-member-form" style="display: flex; flex-direction: column; gap: 0.85rem;">
          <div class="form-group">
            <label class="form-label" for="invite-name">Full Name</label>
            <input class="form-input" id="invite-name" type="text" placeholder="e.g. Meera Deshpande" required>
          </div>

          <div class="form-group">
            <label class="form-label" for="invite-relation">Relationship</label>
            <select class="form-select" id="invite-relation">
              <option value="Parent">Parent</option>
              <option value="Adult child">Adult child</option>
              <option value="Spouse">Spouse</option>
              <option value="Sibling">Sibling</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="invite-phone">Phone / WhatsApp (Optional)</label>
            <input class="form-input" id="invite-phone" type="tel" placeholder="+91-98XXX-XXXXX">
          </div>

          <button type="submit" class="btn btn-primary" style="margin-top: 0.5rem;">
            ${Icons.check()} Send Space Invite
          </button>
        </form>
      </div>
    `;

    modal.classList.add('open');

    modal.querySelector('#modal-close').addEventListener('click', () => {
      modal.classList.remove('open');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });

    modal.querySelector('#invite-member-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = modal.querySelector('#invite-name').value;
      const relation = modal.querySelector('#invite-relation').value;
      const phone = modal.querySelector('#invite-phone').value;

      SurelyState.inviteMember({ name, relation, phone });
      modal.classList.remove('open');
      showToast(`✓ Invited ${name} to ${SurelyState.getState().family.name}!`, 'success');
    });
  }

  // --------------------------------------------------------------------------
  // Main Renderer Router
  // --------------------------------------------------------------------------
  function renderScreen(state) {
    switch (state.currentScreen) {
      case 'checklist':
        renderChecklist(state);
        break;
      case 'category':
        renderCategoryDetail(state);
        break;
      case 'add':
        renderAddEntry(state);
        break;
      case 'emergency':
        renderEmergency(state);
        break;
      default:
        renderChecklist(state);
    }

    // Update Persona switcher buttons
    const sureshBtn = document.getElementById('persona-suresh-btn');
    const ananyaBtn = document.getElementById('persona-ananya-btn');
    if (sureshBtn && ananyaBtn) {
      if (state.currentUser === 'u1') {
        sureshBtn.classList.add('active');
        ananyaBtn.classList.remove('active');
      } else {
        ananyaBtn.classList.add('active');
        sureshBtn.classList.remove('active');
      }
    }
  }

  function initPrototype() {
    SurelyState.subscribe((state, eventType) => {
      renderScreen(state);
    });

    // Persona buttons in phone header
    const sureshBtn = document.getElementById('persona-suresh-btn');
    const ananyaBtn = document.getElementById('persona-ananya-btn');
    const resetBtn = document.getElementById('phone-reset-btn');

    if (sureshBtn) {
      sureshBtn.addEventListener('click', () => {
        SurelyState.setCurrentUser('u1');
        showToast("Switched to Suresh Rao's View (Parent)");
      });
    }

    if (ananyaBtn) {
      ananyaBtn.addEventListener('click', () => {
        SurelyState.setCurrentUser('u2');
        showToast("Switched to Ananya Rao's View (Adult child)");
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        SurelyState.resetToSeed();
        showToast("Prototype reset to seed data (5/8 covered)");
      });
    }

    // Initial render
    renderScreen(SurelyState.getState());
  }

  window.PrototypeController = {
    init: initPrototype,
    render: renderScreen,
    showToast
  };
})();
