/**
 * Kunji (कुंजी) — Add Entry View (#/add, #/add/:category)
 * Guided under-60-second entry flow for pairs to quickly capture institution,
 * physical document location, and privacy visibility.
 */

const KunjiAddEntryView = (() => {
  function render(params = {}) {
    const container = document.getElementById('view-container');
    if (!container) return;

    container.className = 'main-content narrow-layout';

    const categories = KunjiState.getCategories();
    const activeUser = KunjiState.getActiveUser();
    const users = KunjiState.getUsers();

    // Default category from URL if present
    let initialCategory = "Bank Accounts";
    if (params.category) {
      const decoded = decodeURIComponent(params.category);
      const match = categories.find(c => c.toLowerCase() === decoded.toLowerCase());
      if (match) initialCategory = match;
    }

    let selectedAuthorId = activeUser.id;

    container.innerHTML = `
      <div class="form-card">
        <div class="form-header-bar">
          <div>
            <span class="badge badge-gold" style="margin-bottom: 6px;">Quick Entry (Under 60s)</span>
            <h2>Note Down What Exists</h2>
            <p class="secondary-text" style="margin: 0; font-size: var(--text-sm);">
              Keep it simple — rough amounts and physical document locations matter most.
            </p>
          </div>
          <div class="category-icon-wrap" style="width: 44px; height: 44px; border-radius: 10px;" id="selected-cat-icon">
            ${KunjiIcons.render(KunjiIcons.getCategoryIconName(initialCategory), { size: 24, color: 'var(--color-primary)' })}
          </div>
        </div>

        <form id="add-entry-form">
          <!-- 1. Category Selector -->
          <div class="form-group">
            <label class="form-label" for="entry-category">Category</label>
            <select id="entry-category" class="form-select" required>
              ${categories.map(cat => `
                <option value="${cat}" ${cat === initialCategory ? 'selected' : ''}>${cat}</option>
              `).join('')}
            </select>
          </div>

          <!-- 2. Who is adding this? (Dual-User Attribution) -->
          <div class="form-group">
            <label class="form-label">Who is noting this down right now?</label>
            <div class="author-picker">
              <div class="author-option ${selectedAuthorId === 'u1' ? 'selected' : ''}" data-user="u1">
                <span class="avatar avatar-sm avatar-ravi">RD</span>
                <div>
                  <strong style="font-size: var(--text-sm); display: block;">Ravi Deshpande</strong>
                  <span style="font-size: var(--text-xs); color: var(--color-text-secondary);">Father (Parent)</span>
                </div>
              </div>

              <div class="author-option ${selectedAuthorId === 'u2' ? 'selected' : ''}" data-user="u2">
                <span class="avatar avatar-sm avatar-ananya">AD</span>
                <div>
                  <strong style="font-size: var(--text-sm); display: block;">Ananya Deshpande</strong>
                  <span style="font-size: var(--text-xs); color: var(--color-text-secondary);">Daughter (Coordinator)</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 3. Title & Institution -->
          <div class="form-group">
            <label class="form-label" for="entry-title">Item Title / Name</label>
            <input type="text" id="entry-title" class="form-input" placeholder="e.g. LIC Jeevan Anand Policy, SBI Savings Account" required>
          </div>

          <div class="grid-2">
            <div class="form-group">
              <label class="form-label" for="entry-institution">Institution / Bank / Company</label>
              <input type="text" id="entry-institution" class="form-input" placeholder="e.g. Life Insurance Corp, SBI, EPFO">
            </div>

            <div class="form-group">
              <label class="form-label" for="entry-identifier">Policy # / Account # / Identifier <span class="optional-tag">(Optional)</span></label>
              <input type="text" id="entry-identifier" class="form-input" placeholder="e.g. Policy # 948210, A/C ...4829">
            </div>
          </div>

          <div class="grid-2">
            <div class="form-group">
              <label class="form-label" for="entry-holder">Primary Holder</label>
              <input type="text" id="entry-holder" class="form-input" value="Ravi Deshpande">
            </div>

            <div class="form-group">
              <label class="form-label" for="entry-value">Rough Value / Coverage <span class="optional-tag">(Optional)</span></label>
              <input type="text" id="entry-value" class="form-input" placeholder="e.g. ₹15 Lakhs coverage, or approx balance">
            </div>
          </div>

          <!-- 4. Physical Location (Core Differentiator) -->
          <div class="form-group">
            <label class="form-label" for="entry-location">
              Where are the physical papers / passbook / cards kept?
            </label>
            <input type="text" id="entry-location" class="form-input" placeholder="e.g. Steel almirah in bedroom, top drawer, blue folder" required>
            <div class="location-helper-callout">
              ${KunjiIcons.render('mapPin', { size: 16, color: 'var(--color-primary)' })}
              <span><strong>Why this matters:</strong> In an emergency or when papers are needed, your family won't have to search through cupboards in panic.</span>
            </div>
          </div>

          <!-- 5. Emergency Essential Toggle -->
          <div class="form-group">
            <div class="toggle-container">
              <div>
                <strong style="font-size: var(--text-sm); display: block; color: var(--color-emergency-accent);">
                  Surface in Emergency Mode
                </strong>
                <span style="font-size: var(--text-xs); color: var(--color-text-secondary);">
                  Show on the 1-tap emergency screen (recommended for health insurance & medical cards).
                </span>
              </div>
              <input type="checkbox" id="entry-emergency" style="width: 20px; height: 20px; accent-color: var(--color-emergency-accent);">
            </div>
          </div>

          <!-- 6. Visibility Masking Toggle (Spec §4) -->
          <div class="form-group">
            <div class="toggle-container">
              <div>
                <strong style="font-size: var(--text-sm); display: block; color: var(--color-text-primary);">
                  Mask amount for general view
                </strong>
                <span style="font-size: var(--text-xs); color: var(--color-text-secondary);">
                  Hide exact monetary figures unless explicitly tapped. Good if you want visibility of existence without feeling prying.
                </span>
              </div>
              <input type="checkbox" id="entry-masked" style="width: 20px; height: 20px; accent-color: var(--color-primary);">
            </div>
          </div>

          <!-- 7. Notes -->
          <div class="form-group">
            <label class="form-label" for="entry-notes">Helpful Family Notes <span class="optional-tag">(Optional)</span></label>
            <textarea id="entry-notes" class="form-textarea" placeholder="e.g. Premium auto-debited annually in March; Nominee is Ananya registered."></textarea>
          </div>

          <!-- Action Buttons -->
          <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--color-border-light); padding-top: 24px; margin-top: 20px;">
            <a href="#/home" class="btn btn-outline">Cancel</a>
            <button type="submit" class="btn btn-primary btn-lg" id="btn-save-entry">
              ${KunjiIcons.render('checkCircle', { size: 18 })}
              <span>Save to Family Ledger</span>
            </button>
          </div>
        </form>
      </div>
    `;

    // Dynamic category icon update
    const categorySelect = document.getElementById('entry-category');
    categorySelect?.addEventListener('change', (e) => {
      const iconName = KunjiIcons.getCategoryIconName(e.target.value);
      const iconWrap = document.getElementById('selected-cat-icon');
      if (iconWrap) {
        iconWrap.innerHTML = KunjiIcons.render(iconName, { size: 24, color: 'var(--color-primary)' });
      }
    });

    // Author toggle handlers
    container.querySelectorAll('.author-option').forEach(opt => {
      opt.addEventListener('click', () => {
        container.querySelectorAll('.author-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        selectedAuthorId = opt.dataset.user;
      });
    });

    // Form submission with simulated smooth save
    document.getElementById('add-entry-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const saveBtn = document.getElementById('btn-save-entry');
      if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.innerHTML = `<span>Saving to Ledger...</span>`;
      }

      const newEntryData = {
        category: document.getElementById('entry-category').value,
        title: document.getElementById('entry-title').value,
        institution: document.getElementById('entry-institution').value,
        identifier: document.getElementById('entry-identifier').value,
        holder: document.getElementById('entry-holder').value,
        valueOrCoverage: document.getElementById('entry-value').value,
        location: document.getElementById('entry-location').value,
        isEmergencyEssential: document.getElementById('entry-emergency').checked,
        masked: document.getElementById('entry-masked').checked,
        notes: document.getElementById('entry-notes').value,
        addedBy: selectedAuthorId
      };

      setTimeout(() => {
        const added = KunjiState.addEntry(newEntryData);
        const author = KunjiState.getUser(selectedAuthorId);
        KunjiToast.success(`Added "${added.title}" by ${author.name.split(' ')[0]}!`);
        KunjiRouter.navigate('/home');
      }, 300);
    });
  }

  return {
    render
  };
})();
