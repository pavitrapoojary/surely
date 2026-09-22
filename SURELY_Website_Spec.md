# SURELY — Website & Clickable Prototype Build Spec

**For:** building a single, self-contained showcase website that (a) tells the SURELY
innovation story and (b) lets a visitor click through a working mock-up of the product
itself — no real backend, no real auth, all data mocked/in-memory.

**Audience for this file:** a coding agent (Antigravity) building the site. Everything
below is implementation-ready: content, copy, data, flows, and visual direction.

---

## 1. What this site is (and isn't)

- It is a **narrative + interactive demo** site for a B-school innovation assignment
  project called SURELY — a shared family "financial memory" checklist app.
- It is **not** a real product. No real accounts, no real data storage beyond
  in-browser state (resets on refresh is fine; persisting in `localStorage` is a nice-to-have).
- Two things happen on this site:
  1. A **story/marketing scroll** — problem, insight, market size, solution, validation.
  2. A **clickable prototype** — an actual walk-through of the SURELY app's core screens,
     pre-populated with a sample family so a visitor can click around without signing up.

Single page app, one HTML entry point is fine. Smooth-scroll narrative up top, prototype
demo either embedded inline (a "phone frame" or "browser frame" mock) or behind a
"Try the prototype" button that opens a full-screen app-like view.

---

## 2. Design system — "warm, human, not AI-generic"

Explicitly avoid: purple/blue gradients, glassmorphism, neon accents, generic SaaS-dashboard
look, robot/circuit imagery, cold greys. This is a warm, domestic, trustworthy feeling —
think a well-designed Indian home-finance product, not a fintech dashboard.

### Colour palette

| Token | Hex | Use |
|---|---|---|
| `--cream` | `#FBF6EE` | Page background |
| `--cream-warm` | `#F3E9D8` | Section alt background |
| `--terracotta` | `#C66B4F` | Primary accent, CTAs, active states |
| `--terracotta-dark` | `#A85338` | Hover/pressed states |
| `--sage` | `#8A9A7E` | Secondary accent, success/complete states |
| `--sage-dark` | `#5F6E54` | Secondary text on sage |
| `--brown-ink` | `#3B2E28` | Primary text |
| `--brown-soft` | `#6B5C52` | Secondary/muted text |
| `--gold-muted` | `#C9A15A` | Highlights, "in progress" states, dividers |
| `--white` | `#FFFFFF` | Cards on cream background |
| `--border-soft` | `#E4D9C6` | Card borders, dividers |
| `--error-soft` | `#B25C4A` | Reuse terracotta-dark tones for errors, never harsh red |

Dark mode (optional, nice-to-have): deep warm brown `#241C18` background, cream text
`#F3E9D8`, same terracotta/sage accents slightly brightened.

### Typography

- **Headings:** a warm humanist serif — e.g. `"Fraunces", "Lora", Georgia, serif`
  (Google Fonts: Fraunces works well, has a soft/editorial character).
- **Body/UI:** a clean humanist sans — e.g. `"Inter", "Source Sans 3", system-ui, sans-serif`.
- Headings use `--brown-ink`, generous line-height (1.15–1.25), no all-caps except small
  eyebrow labels.
- Avoid heavy font-weight 800/900 everywhere — use 600–700 for headings, 400–500 for body.

### Shape & texture

- Rounded corners, but modest — `8–14px`, not full-pill everything.
- Soft drop shadows only, e.g. `0 4px 20px rgba(59,46,40,0.08)` — never hard black shadows.
- Subtle paper/grain texture on hero sections is a nice touch (very low-opacity noise
  texture or a faint linen SVG pattern) — optional, keep tasteful.
- Icons: rounded-line style (Lucide icon set fits well), not filled glyphs, not emoji.
- No stock "AI" iconography (no circuit boards, no glowing brains, no robot mascots).

### Imagery

- Use the illustration prompts from **Appendix A of the assignment doc** (cover hero,
  storyboard 1 — "The Problem" 4 panels, storyboard 2 — "The SURELY Solution" 5 panels,
  closing image). Reference them as image assets with these filenames so they're easy
  to drop in once generated:
  - `img/hero-cover.jpg`
  - `img/storyboard-1-panel-1.jpg` … `img/storyboard-1-panel-4.jpg`
  - `img/storyboard-2-panel-1.jpg` … `img/storyboard-2-panel-5.jpg`
  - `img/closing-hands.jpg`
- Until real images are generated, use solid-colour placeholder blocks in the matching
  palette (cream/terracotta/sage) with a small centred label like "Storyboard 1 · Panel 2"
  so layout can be finalised ahead of image delivery.

---

## 3. Site map

1. **Hero** — title, one-line hook, CTA to "See the problem" (scrolls down) and
   "Try the prototype" (opens app demo).
2. **The Problem** (Empathise + Define) — narrative + storyboard 1 panels + pull-quotes
   from interviews.
3. **The Opportunity** (Size) — TAM/SAM/SOM visual, anchor stats.
4. **Exploring Ideas** (Ideate) — segment cards + evaluation matrix + why the winning
   idea won.
5. **The Prototype** (interactive) — embedded clickable demo (see Section 5) + storyboard 2.
6. **What We Learned** (Validate) — findings with stat call-outs, confirmed/challenged/
   surprised/changed structure.
7. **The Story** (Innovation Story) — short narrative close + closing image.
8. **Footer** — course/assignment credit line, not a real company footer.

Keep total narrative reading time short — this is a demo site, not a full marketing site.
Prioritise the prototype (Section 5) as the centrepiece.

---

## 4. Content & data points by section

### 4.1 Hero

- Eyebrow label: `A FAMILY FINANCIAL & DOCUMENT MEMORY PLATFORM`
- Title: **SURELY**
- Subtitle: *"Know where everything is."*
- One-liner: "The key to what your family already owns."
- Two CTAs: **Try the prototype** (primary, terracotta) / **Read the story** (secondary, outline)
- Background: `hero-cover.jpg` illustration, cream overlay gradient at the bottom so
  text stays readable.

### 4.2 The Problem

Pull-quote carousel or stacked cards using real interview lines (attribute by first
name + role only, not full identity, matching the report's anonymisation level):

> "I'm not 100% sure I've listed everything. There could be an FD I opened decades ago
> that I've forgotten about." — **Suresh, 61, father**

> "After Papa's stroke, we found three passbooks, one closed account, and a policy we
> didn't even know existed." — **Arjun, 33, adult child**

> "I want my son to know without it feeling like I'm handing over control before I'm
> ready to." — **Lata, 58, mother**

Problem statement block (short form of the Define section):
- **Who:** Adult children (28–45) coordinating for ageing parents (55+), and the parents
  themselves.
- **What:** No one has a current, complete picture of what exists, where, or under what
  conditions.
- **When:** Invisible day-to-day, acutely painful during a medical emergency or after a
  death.
- **Why it matters:** ₹78,213 crore sits unclaimed in RBI's Depositor Education and
  Awareness Fund, up 26% in a year.

Storyboard 1 strip: 4 panels in a horizontal scroll or 2×2 grid, each with its caption
from the assignment appendix (S1-P1 … S1-P4).

### 4.3 The Opportunity

Three stat cards (big number + label), pulling from Section 3 of the report:
- `289M` — Indian households (2024)
- `153M` — people aged 60+ in India (2023)
- `₹78,213 Cr` — unclaimed bank deposits, +26% YoY

TAM → SAM → SOM funnel visual (simple nested/stacked bar or funnel shape, not a 3D chart):

| Tier | Value |
|---|---|
| TAM | ~100–110M households |
| SAM | ~17–18M households |
| SOM (Year 3 target) | ~150,000–200,000 households (~1% of SAM) |
| SOM (Year 1 pilot) | ~5,000–10,000 households |

Small note under the funnel: *"Illustrative estimate for a B-school assignment — see
full methodology in the report."*

### 4.4 Exploring Ideas

**Segment cards** (8 total, horizontally scrollable row of cards), from Section 4:
1. Remote urban nuclear family
2. Joint family, single record-keeper
3. Recently widowed parent
4. Self-employed parent, informal assets
5. Financially literate but digitally hesitant parent
6. Parent in early cognitive decline
7. NRI adult child
8. "Sandwich generation" adult child

**Evaluation matrix** — render as an actual small table or horizontal bar-chart per idea,
scored 1–5 across Feasibility / Cost / User Impact / Ease of Adoption / Scalability /
Risk / Time to Build:

| Idea | Feasibility | Cost | User Impact | Ease of Adoption | Scalability | Risk | Time to Build |
|---|---|---|---|---|---|---|---|
| A. Shared family locker app | 4 | 4 | 5 | 4 | 5 | 3 | 4 |
| B. Human concierge service | 2 | 2 | 4 | 5 | 1 | 2 | 3 |
| C. Bank/insurer-embedded feature | 2 | 5 | 2 | 3 | 2 | 2 | 2 |
| D. WhatsApp-bot reminders | 5 | 5 | 2 | 5 | 3 | 4 | 5 |
| F. Insurer-led portal | 3 | 4 | 2 | 3 | 3 | 1 | 3 |

Mark **Idea A** as the winner with a terracotta badge/highlight. Short callout box:
"Why not a will-writing app?" summarising the Idea E rejection reasoning (asks for more
emotional readiness than families have on day one).

### 4.5 The Prototype — see Section 5 for full interactive spec

### 4.6 What We Learned (Validation)

Stat strip:
- `13` people validated with
- `11 of 13` confirmed the problem personally
- `4.1 / 5` average severity rating
- `5.2` institutions/policies per family on average

Four-column or accordion layout: **Confirmed / Challenged / Surprised / Changed** —
content pulled directly from the report's Findings section (Section 6 of the assignment).
Use short bullet form, not full paragraphs, for the website (the doc has the full prose).

### 4.7 The Story (Innovation Story close)

Short 5-beat narrative (Problem → Insight → Scale → Alternatives → Solution →
Transformation), rendered as a simple vertical timeline or a single flowing paragraph
block, ending on the closing image (`closing-hands.jpg`) and the line:

> "It didn't need a crisis. It needed twenty ordinary minutes."

---

## 5. The Clickable Prototype — full interaction spec

This is the centrepiece. Build it as a **mock app shell** (looks like a mobile app,
can run in a centred "phone frame" ~390px wide on desktop, full-width on mobile).
All data is pre-seeded mock data held in JS state — no backend calls.

### 5.1 Seed data (use this exact mock family so copy/screens line up)

```json
{
  "family": {
    "name": "The Rao Family Space",
    "members": [
      { "id": "u1", "name": "Suresh Rao", "role": "Parent", "avatarInitials": "SR" },
      { "id": "u2", "name": "Ananya Rao", "role": "Adult child", "avatarInitials": "AR" }
    ]
  },
  "categories": [
    { "id": "bank", "label": "Bank Accounts", "icon": "landmark" },
    { "id": "insurance", "label": "Insurance", "icon": "umbrella" },
    { "id": "pf", "label": "PF / EPF", "icon": "briefcase" },
    { "id": "property", "label": "Property Papers", "icon": "home" },
    { "id": "locker", "label": "Locker / Gold", "icon": "key" },
    { "id": "digital", "label": "Digital Accounts", "icon": "smartphone" },
    { "id": "investments", "label": "Investments", "icon": "trending-up" },
    { "id": "other", "label": "Other", "icon": "file-text" }
  ],
  "entries": [
    {
      "id": "e1", "category": "bank", "title": "HDFC Savings Account",
      "holder": "Suresh Rao", "location": "HDFC Bank, FC Road Branch, Pune",
      "value": "Masked", "masked": true,
      "notes": "Primary account, statements come by email.",
      "addedBy": "Suresh Rao"
    },
    {
      "id": "e2", "category": "insurance", "title": "LIC Jeevan Anand Policy",
      "holder": "Suresh Rao", "location": "LIC Branch, Pune; physical copy in study drawer",
      "value": "₹5,00,000 cover", "masked": false,
      "notes": "Premium due every March. Agent: Mr. Kulkarni.",
      "addedBy": "Suresh Rao"
    },
    {
      "id": "e3", "category": "pf", "title": "EPF — Previous Employer",
      "holder": "Suresh Rao", "location": "EPFO online portal",
      "value": "Masked", "masked": true,
      "notes": "From job held 2001–2014. UAN saved separately.",
      "addedBy": "Ananya Rao"
    },
    {
      "id": "e4", "category": "property", "title": "Family Home Title Deed",
      "holder": "Suresh Rao", "location": "Bank locker, HDFC FC Road Branch",
      "value": "N/A", "masked": false,
      "notes": "Original deed + latest property tax receipt.",
      "addedBy": "Suresh Rao"
    },
    {
      "id": "e5", "category": "locker", "title": "Bank Locker — Gold & Documents",
      "holder": "Suresh Rao", "location": "HDFC Bank, FC Road Branch, Locker #214",
      "value": "Masked", "masked": true,
      "notes": "Both Suresh and Ananya are authorised signatories.",
      "addedBy": "Suresh Rao"
    }
  ],
  "completeness": {
    "bank": "complete", "insurance": "complete", "pf": "complete",
    "property": "complete", "locker": "complete",
    "digital": "empty", "investments": "empty", "other": "empty"
  }
}
```

Leave `digital`, `investments`, `other` empty on purpose — this is what makes the
completeness checklist screen feel real (5 of 8 categories done) and gives the visitor
something to "add" during the demo.

### 5.2 Screens / flows (in click order)

**Screen 0 — Prototype entry**
A "Try the prototype" card/button on the marketing page opens the app shell. Show a
one-line framing above it: *"This is a working click-through — try adding an entry,
opening emergency mode, or masking a value."*

**Screen 1 — Family Space Home (Completeness Checklist)**
- Header: family space name + two member avatars (Suresh, Ananya).
- Grid of 8 category cards (icon + label), each showing a state: **Complete** (sage
  checkmark), **Empty** (dashed border, terracotta "+ Add" affordance).
- Progress summary at top: "5 of 8 categories covered" with a simple progress bar
  (sage fill).
- Tapping a **complete** category → Screen 2 (category detail / entry list).
- Tapping an **empty** category → Screen 3 (guided entry creation), pre-filtered to
  that category.
- A visible "🚨 Emergency Mode" button/tab, always reachable → Screen 4.

**Screen 2 — Category Detail (e.g., "Insurance")**
- List of entries in that category as cards: title, holder, location snippet, a
  masked/unmasked value chip.
- Each entry card has a small lock/eye icon toggle to demonstrate masking
  (client-side only — toggling reveals/hides the `value` field with a blur or `•••` state).
- "+ Add another entry" button at the bottom → Screen 3.
- Back button → Screen 1.

**Screen 3 — Guided Entry Creation**
A short multi-field form (all in one screen, not multi-step, to keep the "under 60
seconds" promise from the report):
- Category (pre-filled if arrived from a category card, else a picker)
- Title / what it is (text)
- Institution or holder (text)
- Approximate value or coverage (text, optional, with a "Mask this value" toggle)
- Physical/digital location (text)
- Notes (textarea, optional)
- Primary CTA: **Save entry** — on save, animate back to Screen 1/2 with the new
  category card flipping from "Empty" to "Complete" (this is the key "aha" interaction
  of the whole demo — make it satisfying, e.g. a brief sage checkmark animation).

**Screen 4 — Emergency Mode**
Deliberately the calmest, starkest screen in the app — different visual treatment
(darker warm background, large type, minimal chrome) since it's designed for a stressed
moment:
- "Who to call" — the two family members with tap-to-call style buttons (mock, no real
  dialing needed — a tooltip "Would call +91-XXXXX" is fine).
- "Where the essentials are" — a short list pulled only from entries marked as
  emergency-relevant (locker, insurance, property) with just title + location, no
  values, no clutter.
- A calm one-line footer: *"Everything else can wait."*
- Exit button back to Screen 1.

**Screen 5 (optional, nice-to-have) — Invite / Family Space Setup**
Reachable from a settings icon on Screen 1 — a simple mock "Invite a family member"
form (name + relationship + email, no real sending) illustrating the onboarding flow
described in Section 5 of the report. Not essential if time-constrained; Screens 1–4
are the core demo.

### 5.3 Interaction principles for the demo

- Every action should have a **visible, immediate result** — this is a demo, so lean
  into snappy micro-animations (200–300ms ease) rather than realism/loading states.
- Keep forms short. No validation errors needed for a demo — assume happy path.
  test id
- Masking toggle should be the one "wow, that's a smart detail" moment — make the
  masked value genuinely convincing (`•••••••••` with a small lock icon, not just
  greyed text).
- Emergency Mode should feel like a **visibly different app** for a second (colour
  shift, larger type) — the contrast is the point: everyday mode is checklist-y and
  calm, emergency mode is stripped down and immediate.
- Persist added entries in-memory for the session so a visitor's "+ Add" during the
  demo actually shows up if they navigate back — `localStorage` persistence across
  reloads is a nice-to-have, not required.

---

## 6. Technical notes

- **Stack:** plain HTML/CSS/JS is sufficient, or React if Antigravity defaults to it —
  either way, single-page, no backend, no real auth, no external API calls beyond
  Google Fonts.
- **Responsive:** mobile-first for the prototype app-shell section (it's meant to look
  like a phone screen anyway); the marketing sections above/below should reflow cleanly
  from ~360px to desktop widths.
- **Accessibility:** real semantic headings, sufficient colour contrast (terracotta on
  cream passes AA for large text; use `--brown-ink` for body text, not terracotta, to
  keep body copy contrast safe), alt text on all illustration placeholders describing
  the panel.
- **Performance:** illustrations are the only heavy asset — compress/lazy-load below-the-fold
  images.
- **No dark patterns, no fake urgency, no fake testimonials beyond the labelled synthetic
  interview quotes** — this is an academic prototype and should read as honest about that
  (a small footer note: *"Built as a course prototype — all product data shown is
  illustrative."*).

---

## 7. Nice-to-haves (only if time allows)

- Toggle between "Suresh's view" and "Ananya's view" of the same family space, to make
  the two-sided user story (parent vs adult child) tangible.
- A subtle scroll-triggered fade-in for storyboard panels as the visitor scrolls through
  Section 4.2 and 4.5.
- A tiny animated version of the TAM→SAM→SOM funnel (bars growing in on scroll).
