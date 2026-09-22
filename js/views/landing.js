/**
 * Kunji (कुंजी) — Landing Page View (#/)
 * Storytelling pitch presenting the emotional differentiator: calm, joint family record
 * built before it's urgent.
 */

const KunjiLandingView = (() => {
  function render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    container.className = 'main-content wide-layout';
    container.innerHTML = `
      <!-- Hero Section -->
      <section class="landing-hero" aria-labelledby="landing-headline">
        <div class="landing-pretitle">
          ${KunjiIcons.render('key', { size: 14, color: 'var(--color-primary)' })}
          <span>कुंजी — The Shared Family Ledger</span>
        </div>
        
        <h1 id="landing-headline" class="landing-headline">
          If something happened tomorrow, would your family know where to start?
        </h1>
        
        <p class="landing-subhead">
          Kunji is the one calm place your family keeps track of what exists — together, before it's urgent. Not a banking dashboard, not a vault — just a shared record for two generations.
        </p>

        <div class="landing-hero-actions">
          <a href="#/onboarding" class="btn btn-primary btn-lg" id="btn-hero-start">
            Start Your Family Space
            ${KunjiIcons.render('arrowRight', { size: 16 })}
          </a>
          <a href="#/home" class="btn btn-outline btn-lg" id="btn-hero-explore">
            ${KunjiIcons.render('users', { size: 18, color: 'var(--color-text-secondary)' })}
            Explore Ravi & Ananya's Space
          </a>
          <a href="#/emergency" class="btn btn-emergency btn-lg" id="btn-hero-emergency">
            ${KunjiIcons.render('heart', { size: 18 })}
            See Emergency Mode
          </a>
        </div>
      </section>

      <!-- Persona Context Box -->
      <section class="persona-preview-box" aria-label="Demo Personas">
        <div class="persona-duo">
          <div class="avatar-group">
            <span class="avatar avatar-lg avatar-ravi" title="Ravi Deshpande">RD</span>
            <span class="avatar avatar-lg avatar-ananya" title="Ananya Deshpande">AD</span>
          </div>
          <div>
            <h4 style="font-size: 1.1rem; margin-bottom: 2px;">Built for Ravi & Ananya Deshpande</h4>
            <p style="font-size: var(--text-xs); color: var(--color-text-secondary); margin: 0;">
              Ravi (58, retired teacher in Solapur) & Ananya (32, product manager in Bengaluru). Two people, one jointly owned record.
            </p>
          </div>
        </div>
        <div style="flex-shrink: 0;">
          <span class="badge badge-gold">
            ${KunjiIcons.render('checkCircle', { size: 13, color: '#8C6212' })}
            Joint Ownership
          </span>
        </div>
      </section>

      <!-- The Story Strip (3 Beats - Spec §6) -->
      <section class="story-strip-section" aria-label="The Innovation Story">
        <div class="section-tag">The Story Behind Kunji</div>
        
        <div class="story-strip-grid">
          <!-- Beat 1 -->
          <article class="story-beat-card">
            <div class="story-beat-number">01</div>
            <h3 class="story-beat-title">"It's scattered, not lost."</h3>
            <p class="story-beat-text">
              Bank passbooks in study drawers, insurance policies in blue plastic folders, locker keys hidden in Godrej almirahs. Everyone knows bits and pieces, but nobody has the full picture written down.
            </p>
          </article>

          <!-- Beat 2 -->
          <article class="story-beat-card" style="border-color: var(--color-primary);">
            <div class="story-beat-number" style="color: var(--color-primary);">02</div>
            <h3 class="story-beat-title">"Twenty ordinary minutes, done together."</h3>
            <p class="story-beat-text">
              Not a solemn sit-down or financial audit. Just a warm cup of chai on a Sunday visit, asking <em>"Baba, what all accounts exist?"</em> and noting down institutions and physical locations in under 60 seconds each.
            </p>
          </article>

          <!-- Beat 3 -->
          <article class="story-beat-card">
            <div class="story-beat-number">03</div>
            <h3 class="story-beat-title">"When it matters, everyone knows where to look."</h3>
            <p class="story-beat-text">
              No frantic searching during a hospital scramble at night. Emergency Mode strips away the clutter and shows policy numbers, document drawer locations, and family doctor contacts immediately.
            </p>
          </article>
        </div>
      </section>

      <!-- How It Works (4 Simple Steps) -->
      <section class="how-it-works-section" aria-label="How Kunji Works">
        <div style="text-align: center; max-width: 600px; margin: 0 auto;">
          <h2 style="font-size: 1.8rem; margin-bottom: 6px;">How Kunji Works</h2>
          <p style="font-size: var(--text-sm); color: var(--color-text-secondary); margin: 0;">
            Zero financial jargon. No bank logins required. Just clarity for your family.
          </p>
        </div>

        <div class="how-it-works-grid">
          <div class="how-step">
            <div class="how-step-icon">
              ${KunjiIcons.render('home', { size: 22 })}
            </div>
            <h4 class="how-step-title">1. Create a Space</h4>
            <p class="how-step-desc">Name your Family Space and choose your role as parent or adult child.</p>
          </div>

          <div class="how-step">
            <div class="how-step-icon">
              ${KunjiIcons.render('users', { size: 22 })}
            </div>
            <h4 class="how-step-title">2. Invite Your Parent</h4>
            <p class="how-step-desc">Share a private link. Both of you get equal visibility and attribution.</p>
          </div>

          <div class="how-step">
            <div class="how-step-icon">
              ${KunjiIcons.render('fileText', { size: 22 })}
            </div>
            <h4 class="how-step-title">3. Note Down Assets</h4>
            <p class="how-step-desc">Add bank accounts, LIC policies, and locker locations in 60 seconds.</p>
          </div>

          <div class="how-step">
            <div class="how-step-icon" style="color: var(--color-emergency-accent);">
              ${KunjiIcons.render('heart', { size: 22 })}
            </div>
            <h4 class="how-step-title">4. Emergency Ready</h4>
            <p class="how-step-desc">One tap gives essential policy numbers and physical document locations.</p>
          </div>
        </div>
      </section>

      <!-- Quiet, Honest Footer (Spec §6) -->
      <footer class="landing-footer">
        <blockquote class="landing-footer-quote">
          "Kunji doesn't manage your money. It just makes sure your family always knows where to find it."
        </blockquote>
        <p class="landing-footer-sub">
          कुंजी — Designed for families across generations. Built with plain HTML, CSS, and Vanilla JavaScript.
        </p>
        <div style="margin-top: 20px;">
          <a href="#/home" class="btn btn-primary btn-sm">Enter Demo Space</a>
        </div>
      </footer>
    `;
  }

  return {
    render
  };
})();
