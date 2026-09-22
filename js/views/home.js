/**
 * Kunji (कुंजी) — Home / Completeness Checklist View (#/home)
 * Central ledger displaying category completeness, dual-user attribution,
 * calm Emergency Mode access, and quick entry additions.
 */

const KunjiHomeView = (() => {
  let selectedCategoryFilter = 'ALL';
  let selectedAuthorFilter = 'ALL';

  function render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    container.className = 'main-content';

    const activeSpace = KunjiState.getActiveSpace();
    const activeUser = KunjiState.getActiveUser();
    const metrics = KunjiState.getCompletenessMetrics();
    const allEntries = KunjiState.getEntries();
    const users = KunjiState.getUsers();

    // Filter logic
    let displayedCategories = metrics.categories;
    if (selectedCategoryFilter !== 'ALL') {
      displayedCategories = metrics.categories.filter(c => c.category.toLowerCase() === selectedCategoryFilter.toLowerCase());
    }

    container.innerHTML = `
      <!-- Home Header -->
      <div class="home-header">
        <div class="home-title-group">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
            <h1>${activeSpace.name}</h1>
            <span class="badge badge-gold" style="font-size: 11px;">Joint Ledger</span>
          </div>
          <p class="secondary-text" style="margin: 0; display: flex; align-items: center; gap: 8px; font-size: var(--text-sm);">
            <span>Shared between</span>
            <span class="avatar avatar-sm avatar-ravi" title="Ravi Deshpande">RD</span>
            <strong>Ravi</strong>
            <span>&</span>
            <span class="avatar avatar-sm avatar-ananya" title="Ananya Deshpande">AD</span>
            <strong>Ananya</strong>
          </p>
        </div>

        <div style="display: flex; gap: 10px; align-items: center;">
          <a href="#/add" class="btn btn-primary" id="btn-add-entry-main">
            ${KunjiIcons.render('plus', { size: 16 })}
            <span>Add Entry</span>
          </a>
        </div>
      </div>

      <!-- Prominent, Calm Emergency Mode Callout Banner (Spec §4 & §5.2) -->
      <div class="emergency-banner-card" role="region" aria-label="Emergency Access">
        <div class="emergency-banner-left">
          <div class="emergency-banner-icon">
            ${KunjiIcons.render('heart', { size: 20 })}
          </div>
          <div class="emergency-banner-text">
            <h3>Emergency Mode</h3>
            <p>At hospital or sudden emergency? One-tap access to health policies, physical paper locations & doctor contacts.</p>
          </div>
        </div>
        <a href="#/emergency" class="btn btn-emergency btn-sm" id="btn-home-emergency-banner">
          Open Emergency View
          ${KunjiIcons.render('arrowRight', { size: 14 })}
        </a>
      </div>

      <!-- Completeness Progress Card -->
      <div class="progress-card">
        <div class="progress-header">
          <div class="progress-title">
            ${KunjiIcons.render('key', { size: 18, color: 'var(--color-primary)' })}
            <span>Family Checklist Completeness</span>
          </div>
          <div class="progress-percentage">${metrics.percentage}%</div>
        </div>

        <div class="progress-track" role="progressbar" aria-valuenow="${metrics.percentage}" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-fill" style="width: ${metrics.percentage}%;"></div>
        </div>

        <div class="progress-subtext">
          <span><strong>${metrics.filledCount} of ${metrics.totalCategories}</strong> essential categories documented</span>
          <span>${metrics.totalEntriesCount} total items recorded together</span>
        </div>
      </div>

      <!-- Filter Controls & Persona Filter -->
      <div class="filter-bar">
        <div class="filter-pills" role="tablist" aria-label="Category Filters">
          <button class="filter-pill ${selectedCategoryFilter === 'ALL' ? 'active' : ''}" data-cat="ALL">
            All Categories (${metrics.totalCategories})
          </button>
          ${metrics.categories.map(cat => `
            <button class="filter-pill ${selectedCategoryFilter === cat.category ? 'active' : ''}" data-cat="${cat.category}">
              ${cat.category}
              ${cat.isFilled ? `<span style="display:inline-block; width:6px; height:6px; background:var(--color-secondary); border-radius:50%; margin-left:4px;"></span>` : ''}
            </button>
          `).join('')}
        </div>

        <!-- Filter by Author Attribution -->
        <div style="display: flex; align-items: center; gap: 6px; font-size: var(--text-xs); color: var(--color-text-secondary);">
          <span>Filter by:</span>
          <select id="select-author-filter" class="form-select" style="padding: 4px 8px; font-size: var(--text-xs); width: auto;">
            <option value="ALL" ${selectedAuthorFilter === 'ALL' ? 'selected' : ''}>All Authors</option>
            <option value="u1" ${selectedAuthorFilter === 'u1' ? 'selected' : ''}>Added by Ravi</option>
            <option value="u2" ${selectedAuthorFilter === 'u2' ? 'selected' : ''}>Added by Ananya</option>
          </select>
        </div>
      </div>

      <!-- Checklist Categories List -->
      <div class="checklist-grid">
        ${displayedCategories.map(categoryItem => {
          let categoryEntries = categoryItem.entries;
          if (selectedAuthorFilter !== 'ALL') {
            categoryEntries = categoryEntries.filter(e => e.addedBy === selectedAuthorFilter);
          }

          const iconName = KunjiIcons.getCategoryIconName(categoryItem.category);
          const isCategoryFilled = categoryItem.isFilled;

          return `
            <section class="category-block" aria-labelledby="cat-title-${categoryItem.category.replace(/\s+/g, '-')}">
              <!-- Category Header -->
              <div class="category-block-header">
                <div class="category-block-title" id="cat-title-${categoryItem.category.replace(/\s+/g, '-')}">
                  <div class="category-icon-wrap">
                    ${KunjiIcons.render(iconName, { size: 18, color: 'var(--color-primary)' })}
                  </div>
                  <span>${categoryItem.category}</span>
                </div>

                <div style="display: flex; align-items: center; gap: 10px;">
                  ${isCategoryFilled 
                    ? `<span class="badge badge-filled">
                        ${KunjiIcons.render('checkCircle', { size: 12, color: 'var(--color-secondary)' })}
                        ${categoryEntries.length} ${categoryEntries.length === 1 ? 'Entry' : 'Entries'}
                       </span>`
                    : `<span class="badge badge-empty">
                        Not added yet
                       </span>`
                  }
                  <a href="#/add/${encodeURIComponent(categoryItem.category)}" class="btn btn-outline btn-sm" title="Add item to ${categoryItem.category}">
                    ${KunjiIcons.render('plus', { size: 13 })}
                    <span>Add</span>
                  </a>
                </div>
              </div>

              <!-- Entries or Empty State -->
              ${categoryEntries.length > 0 ? `
                <div class="entry-list">
                  ${categoryEntries.map(entry => {
                    const author = KunjiState.getUser(entry.addedBy);
                    return `
                      <a href="#/entry/${entry.id}" class="entry-row" title="Click to view details of ${entry.title}">
                        <div class="entry-info-primary">
                          <div class="entry-title">
                            <span>${entry.title}</span>
                            ${entry.isEmergencyEssential ? `<span class="badge badge-emergency" style="font-size: 10px; padding: 2px 6px;">Emergency Essential</span>` : ''}
                            ${entry.masked ? `<span class="badge badge-empty" style="font-size: 10px; padding: 2px 6px;" title="Amount hidden for privacy">${KunjiIcons.render('eyeOff', { size: 10 })} Masked</span>` : ''}
                          </div>
                          
                          <div class="entry-location-snippet">
                            ${KunjiIcons.render('mapPin', { size: 13 })}
                            <span><strong>Location:</strong> ${entry.location}</span>
                          </div>
                        </div>

                        <div class="entry-meta-right">
                          <!-- Dual-User Attribution Chip -->
                          <div class="user-badge" title="Added by ${author.name} on ${entry.createdAt}">
                            <span class="avatar avatar-sm ${author.avatarClass}">${author.initials}</span>
                            <span>${author.name.split(' ')[0]}</span>
                          </div>
                          ${KunjiIcons.render('arrowRight', { size: 14, color: 'var(--color-text-secondary)' })}
                        </div>
                      </a>
                    `;
                  }).join('')}
                </div>
              ` : `
                <div class="empty-category-cta">
                  <span class="empty-category-text">
                    ${selectedAuthorFilter !== 'ALL' ? 'No entries by this author in this category.' : 'No entries yet. Takes under 60 seconds to note down.'}
                  </span>
                  <a href="#/add/${encodeURIComponent(categoryItem.category)}" class="btn btn-primary btn-sm">
                    ${KunjiIcons.render('plus', { size: 13 })}
                    <span>Note Down Now</span>
                  </a>
                </div>
              `}
            </section>
          `;
        }).join('')}
      </div>

      <!-- Quick Session Footer Banner -->
      <div style="margin-top: 36px; padding: 20px; background: var(--color-surface-warm); border: 1px solid var(--color-border); border-radius: var(--radius-md); text-align: center;">
        <p style="font-size: var(--text-sm); color: var(--color-text-primary); margin-bottom: 6px;">
          <strong>"Twenty Ordinary Minutes"</strong> — Ananya and Ravi can sit with a cup of tea and add 4–5 items in a single sitting.
        </p>
        <span style="font-size: var(--text-xs); color: var(--color-text-secondary);">
          Everything auto-syncs to this shared ledger with verified attribution.
        </span>
      </div>
    `;

    // Category filter click events
    container.querySelectorAll('.filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedCategoryFilter = btn.dataset.cat;
        render();
      });
    });

    // Author filter change event
    const authorSelect = document.getElementById('select-author-filter');
    if (authorSelect) {
      authorSelect.addEventListener('change', (e) => {
        selectedAuthorFilter = e.target.value;
        render();
      });
    }
  }

  return {
    render
  };
})();
