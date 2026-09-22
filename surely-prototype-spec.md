# Surely — Prototype Build Spec
**"know where everything is"**
*The key to what your family already owns.*

> Companion build spec to the individual assignment report. Same philosophy as the earlier Peerly prototypes: **front-end-only, plain HTML/CSS/vanilla JavaScript, no framework, no build step, no backend.** Open `index.html` directly or serve the folder — nothing to install. This document specifies personas, scenarios, IA, and a visual design system distinct from typical "AI product" aesthetics.

---

## 1. What This Prototype Needs to Prove

Surely is a shared, jointly-owned record that a parent and an adult child build together — not a vault, not a financial dashboard. The prototype's entire job is to make a reviewer *feel* two things within 2 minutes of clicking through it:

1. **This is calm, not clinical.** Most "family finance" tools look like banking dashboards — spreadsheet energy, cold blues, alarm-red warnings. Surely should feel more like a beautifully kept family journal than a fintech app. That emotional register *is* the differentiator described in the report's Innovation Story.
2. **It's built for two people, not one.** Every screen should visibly acknowledge both the parent and the adult child — e.g., show both names/avatars, show who added or last touched an entry, and never let it read like a single-user "my file" app.

---

## 2. Personas (for prototype content, mock data, and scenario walkthroughs)

Reuse these two named characters consistently across all mock data, sample content, and the scenario walkthroughs in §5 — they should feel like the same two people throughout the whole demo, not generic placeholder users.

### Persona 1 — Ravi Deshpande (the parent)
- 58, recently retired schoolteacher, lives in a tier-2 city.
- Financially organized in his head, not on paper — knows roughly what he owns but has never written it all down in one place.
- Comfortable with WhatsApp and UPI; not comfortable with anything that feels like "banking software."
- Motivation: doesn't want to burden his daughter, but privately worried she'd struggle to find everything if something happened to him.

### Persona 2 — Ananya Deshpande (the adult child)
- 32, works in a different city from her father, product manager by profession (small wink — she'd actually appreciate a well-designed app).
- The de facto family coordinator — already manages her father's medical appointments remotely.
- Has had one real scare: a hospitalization scramble to find his health insurance policy number.
- Motivation: wants visibility without feeling like she's prying into her father's finances.

### Secondary/supporting persona — Meera Iyer (a friend of Ananya's, used for a second scenario to show the product generalizes)
- 35, NRI based abroad, manages both her own parents' and her in-laws' records — the "sandwich generation" segment from the report's Ideate section.
- Used to demonstrate the multi-family-space and remote-access angle in one alternate scenario (§5.3).

---

## 3. Scenarios to Build as Clickable Walkthroughs

Build these as the primary demo paths — not just static screens, but sequences a reviewer can click through start to finish.

### 3.1 Scenario A — "Twenty Ordinary Minutes" (primary, most polished path)
Ravi and Ananya are visiting on a weekend. Ananya suggests they "just quickly note down what all exists" — not a serious sit-down, a casual 20-minute activity.
1. Ananya creates a Family Space, invites Ravi (simulated invite, instant accept for demo).
2. They add 4–5 entries together across categories (bank account, an LIC policy, the family property papers, a bank locker) using the guided under-60-second entry flow.
3. The completeness checklist updates live as they go, visibly filling in.
4. Ends on the checklist view looking satisfyingly more complete than it started — this "before/after" moment is the emotional payoff of the whole demo.

### 3.2 Scenario B — "When It Actually Matters" (the emergency mode)
A few weeks later (narratively), Ravi is hospitalized. Ananya, at the hospital at night, opens Surely.
1. She opens the app and taps into **Emergency Mode** directly from the home screen (a clearly visible, calm — not alarming — entry point).
2. Emergency Mode shows only the essentials: who to call, where physical documents are, and the health insurance policy details — stripped of everything else, large and legible.
3. This scenario should visually contrast with Scenario A: same app, same data, radically simpler view — proving the "one question answered well" design principle from the report.

### 3.3 Scenario B (alternate) — Meera's multi-family view
A shorter, secondary walkthrough: Meera switches between two Family Spaces (her parents', her in-laws') from a simple space-switcher, showing the product handles the sandwich-generation segment without a redesign. This can be a lighter, 2–3 screen path — it exists to demonstrate range, not to be the main event.

---

## 4. Information Architecture

```
Landing (#/)                         — the pitch, told as a short story (see §6)
Onboarding (#/onboarding)
 ├─ Create or Join a Family Space
 ├─ Invite family members (simulated — name + relationship, no real email/SMS)
 └─ Space created → redirect to Home
Home / Checklist (#/home)
 ├─ Category completeness view (Bank Accounts, Insurance, Property, PF/EPF,
 │    Locker & Valuables, Digital Accounts, Other) — each shows filled/empty state
 ├─ "Who added this" attribution on every entry (small avatar + name)
 ├─ Prominent, calm "Emergency Mode" entry point (not hidden in a menu)
 └─ "+ Add" → guided entry flow
Add Entry (#/add/:category)
 ├─ Short guided form: institution/holder, rough value or coverage, location, notes
 └─ Visibility toggle: "Show full details to everyone in this space" vs "Mask amount"
Entry Detail (#/entry/:id)
 └─ View/edit a single entry, see who last updated it and when
Emergency Mode (#/emergency)
 ├─ Contact list (who to call, in order)
 ├─ Physical document locations
 └─ Health insurance / medical essentials surfaced first
Family Space Switcher (#/spaces) — only relevant for the Meera scenario
Settings / My Space (#/settings)
 └─ Members list, invite more, space name/photo
```

Use the same hand-rolled hash router pattern as the earlier Peerly prototypes (`hashchange` listener, a `views/` folder with one render function per screen, one shared in-memory `appState` object). No `localStorage` required, though — since this will likely be demoed live rather than left running — you may optionally use `localStorage` here if you want state to survive a refresh during a presentation; that's a reasonable judgment call for this specific deliverable.

---

## 5. Visual Design System — Deliberately Not "Usual AI Colors"

The brief here is explicit: avoid the default AI-generated-app palette (purple/blue gradients, glassmorphism, neon accents on dark mode). Surely should look like it belongs on a warm wooden desk next to an old family photo album, not on a SaaS pricing page.

### 5.1 Direction: "Warm Ledger"
Think: the inside cover of an old family diary, sunlight through a window onto wood, a well-worn leather folder. Warm, tactile, unhurried. Light theme only.

### 5.2 Color palette

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#FBF6EF` | App background — warm parchment/cream, not white |
| `--color-surface` | `#FFFFFF` | Cards |
| `--color-surface-warm` | `#F3E9D8` | Section backgrounds, subtle warmth |
| `--color-primary` | `#8C4A2F` | Terracotta/burnt-sienna — primary buttons, active states, the "Surely" wordmark. Warm and grounded, not corporate |
| `--color-primary-hover` | `#733A24` | Hover/active |
| `--color-secondary` | `#4E6B58` | Deep sage green — trust, completeness, "filled" checklist states |
| `--color-accent-gold` | `#C79A3D` | Small accents — the key icon, "Emergency Mode" entry point border, highlights. Used sparingly, like gold leaf, not as a dominant color |
| `--color-text-primary` | `#2E241C` | Warm near-black (not pure black) for headings/body |
| `--color-text-secondary` | `#7A6A58` | Meta text, timestamps, attribution ("added by Ananya") |
| `--color-border` | `#E6D9C2` | Card borders, dividers — warm, not cool grey |
| `--color-filled` | `#4E6B58` (bg tint `#E7EFE9`) | Completed checklist categories |
| `--color-empty` | `#B8A98C` (bg tint `#F3EDE1`) | Empty/unfilled checklist categories — muted, not alarming red |
| `--color-emergency-accent` | `#A8452F` | Used only inside Emergency Mode — a slightly deeper, calmer red-terracotta, never bright alarm-red. Emergency Mode should feel *calm and clear*, not urgent/panicked |

Explicitly avoid: purple, indigo, electric blue, neon green, pure white backgrounds, glassmorphism/blur effects, dark mode. If you catch the build defaulting to a purple gradient hero section, that's the "usual AI colors" failure mode to correct.

### 5.3 Typography
- **Headings:** A warm serif with some character — "Lora," "Source Serif 4," or "Cormorant" — evokes the "family diary" feeling. Avoid anything geometric/techy (no "Poppins," no "Space Grotesk").
- **Body/UI:** A humanist sans for legibility — "Karla," "Work Sans," or "Nunito Sans" — friendly but not childish.
- Slightly larger base font size than a typical dense SaaS app (16–17px body) — this product is partly for a 58-year-old user; err toward comfortable, unhurried reading.

### 5.4 Shape, texture, and motion
- Border radius: soft but not bubbly — 10–12px on cards, 8px on buttons. Avoid the very rounded "friendly startup" look; this should feel more like stationery than an app icon.
- Optional subtle paper-grain or linen texture on the background (a very light CSS noise/texture overlay) reinforces the "diary" feeling without hurting legibility — nice-to-have, skip if it complicates the build.
- Micro-interactions should feel unhurried: checklist items fill in with a gentle fade/checkmark draw, not a snappy bounce. Emergency Mode transition should be immediate and calm — no loading spinners there, since that's the one place speed matters more than polish.
- Icons: line-style, warm-toned (not default black/grey) — a simple key icon as the app's mark, a locker/umbrella/house/bank icon set for categories, all in `--color-secondary` or `--color-primary` rather than neutral grey.

---

## 6. Landing Page — Told as a Short Story
Mirror the "simple story" approach used for the earlier marketplace prototype's landing page, but the story here is emotional rather than transactional (fits the subject matter).

1. **Hero:** headline in the warm serif — *"If something happened tomorrow, would your family know where to start?"* — subhead: *"Surely is the one place your family keeps track of what exists — together, before it's urgent."* CTA: "Start Your Family Space."
2. **The story strip (3 short beats, mirrors the report's storyboard):** *"It's scattered, not lost"* → *"Twenty ordinary minutes, done together"* → *"When it matters, everyone already knows where to look."* Each beat can reuse the tone (not necessarily the literal images) of the storyboard prompts drafted for the assignment report.
3. **How it works** (3–4 step visual, same pattern as the earlier prototypes' "how it works" sections).
4. Footer: a quiet, honest line — *"Surely doesn't manage your money. It just makes sure your family always knows where to find it."*

---

## 7. Mock Data

```js
const familySpace = {
  id: "fs1",
  name: "Deshpande Family",
  members: [
    { id: "u1", name: "Ravi Deshpande", role: "parent" },
    { id: "u2", name: "Ananya Deshpande", role: "adult-child" },
  ],
};

const categories = [
  "Bank Accounts", "Insurance", "Property", "PF / EPF",
  "Locker & Valuables", "Digital Accounts", "Other",
];

const entries = [
  {
    id: "e1", category: "Insurance", title: "LIC Jeevan Anand Policy",
    holder: "Ravi Deshpande", location: "Steel almirah, top drawer, blue folder",
    masked: false, addedBy: "u1", updatedAt: "2026-08-02",
  },
  {
    id: "e2", category: "Bank Accounts", title: "SBI Savings Account",
    holder: "Ravi Deshpande", location: "Passbook at home; net-banking active",
    masked: true, addedBy: "u2", updatedAt: "2026-08-02",
  },
  // ...seed 8-10 entries across categories, some added by u1, some by u2,
  // so the "who added this" attribution genuinely varies in the demo
];

const emergencyContacts = [
  { name: "Ananya Deshpande", relation: "Daughter", phone: "+91-XXXXXXXXXX" },
  { name: "Dr. Kulkarni", relation: "Family Physician", phone: "+91-XXXXXXXXXX" },
];
```

---

## 8. Build Instructions for Antigravity

> Build a fully responsive, front-end-only web app prototype called **Surely** based on the spec above. Use plain HTML, CSS, and vanilla JavaScript only — no React, no build tools, no npm install. Use a hand-rolled hash-based router to switch between the views in §4, all driven by one in-memory `appState` object seeded from the mock data in §7. Implement the two primary scenario walkthroughs in §3 (the guided "add entries together" flow building up the completeness checklist, and the calm, stripped-down Emergency Mode) as fully clickable sequences — these two are the centerpiece of the demo and should get the most polish. Build the landing page per §6, told as a short emotional story rather than a feature list. Apply the "Warm Ledger" visual design system in §5 precisely — warm parchment background, terracotta/sage/gold palette, serif headings, humanist sans body — and explicitly avoid purple/blue gradients, glassmorphism, or dark mode, which would undercut the intended tone. Every entry and screen should visibly show both family members (avatars/names, "added by" attribution) rather than reading as a single-user app. Simulate all actions (invites, saves) with short artificial delays; no real backend, no real notifications, no real data storage beyond the in-memory session (or `localStorage` if you want state to survive a page refresh during a live demo).
