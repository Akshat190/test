# DESIGN.md — Kapadia High School

Direction for the public website. This is the **soul**: identity, palette, type, mood.
`antislop` is applied on top as a filter, not as this file's source.

---

## Identity

An independent, co-educational English-medium school in Kalol, Gujarat, founded 1956, with
five campuses (Chhatral, Chandkheda, IFFCO Township, Kadi, Shela) running GSEB and CBSE
boards.

The person we are convincing is a **parent** deciding whether to send their child here, often
from a phone, often in a hurry, often comparing against two other schools. Parents in Gujarat
read institutional credibility first: the school's age, its board affiliation, its disclosure
documents, whether the principal's name is attached to it.

So the identity is **institutional heritage, held to a high standard**, not friendly-startup
energy. Restraint reads as trustworthiness. A school that decorates hard reads as insecure.

**Not:** a brochure. **Not:** a SaaS landing page.

## Personality

| Trait | Level | Note |
|---|---|---|
| Formal | High | Third-person institutional voice. No exclamation marks, no emoji, no slang. |
| Warm | Medium | The warmth comes from specificity, real names, real campus detail, not from adjectives. |
| Proud | Medium | Confident by naming real facts (board affiliation, affiliation number, year). Never by boasting. |
| Trustworthy | High | Documents visible. Numbers either sourced or absent. |

## Mood

Steady, well-kept, unhurried. The visual reference is a well-printed prospectus or the front
of a decades-old school building: weight, spacing, and legibility doing the work.

---

## Palette

Two core colours plus one accent. Neutrals are not counted (R-29).

| Role | Hex | Reason |
|---|---|---|
| **Core 1 — Navy** | `#003264` | The established school colour. Carries authority and permanence. Used for the header, primary surfaces, and primary text on light backgrounds. |
| **Core 2 — Deep navy** | `#002244` | A darker step of the same hue for gradient depth and the footer, so the brand reads as one family rather than two colours. |
| **Accent — Gold** | `#D4AF37` | The established crest colour. **Scarce by rule.** It marks the single most important action on a screen and nothing else. |
| Accent light | `#E8C547` | Gradient partner and hover state for the accent. Never a third accent. |
| Ink | `#1a1a2e` | Body headings on light surfaces. Near-black with a blue cast so it sits with the navy. |
| Muted ink | `#6B7280` | Secondary text. **Must clear 4.5:1 on white** or be darkened (see contrast rules). |

**Forbidden:** purple, cyan-to-blue, neon, pastel blocks, radial glows, colour gradients
across full pages. Gold on navy is the only gradient family, and it is used to separate
hierarchy levels (header from page, CTA from its background), never as decoration.

## Typography

| Role | Face | Reason |
|---|---|---|
| Display / headings | **Cormorant Garamond** (serif) | A serif with an editorial, institutional register. It signals "established school" far better than any sans, and gives the page a distinct voice that a default sans cannot. |
| Body / UI | **Outfit** (geometric sans) | Highly legible at small sizes on phones, which is the primary reading surface. Its rounded terminals keep it from feeling cold next to the serif. |

**Rule:** the serif is for display only. Body copy, buttons, form fields and nav are always
Outfit. Never monospace, never uppercase-with-wide-tracking as a decorative device.

Type scale is fluid (`clamp()`) so headings hold up from 360px to 1440px without fixed
pixel jumps (R-03, and WCAG 1.4.4 text resizing).

## Radius

A deliberate three-step scale, not a single value everywhere (R-11):

| Level | Value | Used for |
|---|---|---|
| Small | `4px` | Chips, doc cards, thumbnails |
| Medium | `12px` | Content cards, facility tiles, info cards |
| Large | `16px` | Large panels: hero blocks, CTA panel, campus hero |
| Pill | `999px` | **Buttons only.** Reserved for the primary action so its shape signals importance. |

Inputs use `8px`, matching the contact form's existing system. Cards are never pills.

## Shadow

Elevation only, and only where an element genuinely sits above the page (R-12):

| Level | Use |
|---|---|
| Flat | Most content. No shadow. Sits on the page. |
| Soft | `0 4px 20px rgba(0,50,100,0.08)` — cards that lift on hover. |
| Lift | `0 12px 40px rgba(0,50,100,0.15)` — hover states and sticky header. |

The page does not float. Gold glow is forbidden entirely except as a focus ring.

## Spacing

An 8px base scale: `8, 16, 24, 32, 48, 64, 80`. Sections use the larger steps; internal
spacing uses the smaller ones. **Section padding varies deliberately** (see RHYTHM) rather
than repeating one value everywhere.

## Identity motif

The **rule and underline**: a short gold bar under section titles. It is repeated on every
section, it is drawn from the crest's colours, and it does the job of breaking a long page
into navigable parts. It is the one gesture that makes this site recognisably this school.

Second motif: **generous left-aligned section headers** with the rule beneath, rather than
centred everything. It reads as editorial and avoids the centred-everything template look.

---

## Dials

| Dial | Value | Reason |
|---|---|---|
| **ENERGY** | **2 / Balanced** | Welcoming but authoritative. A school must invite; it must not shout. ENERGY 3 would read as a startup. ENERGY 1 would read as a government notice. |
| **RHYTHM** | **2** | Institutional pages benefit from consistency, but not from one template repeated. Content-heavy sections (campus detail, gallery) use asymmetric two-column splits while narrower sections stay centred. Alternating section backgrounds are the primary rhythm device. |
| **MOTION** | **1 / Hover and focus only** | Motion is trust-signal negative for an institution. A drifting, pulsing or parallax page reads as a template, not a school. Transitions are short (150–300ms), ease-out, and confined to hover/focus. **No scroll-reveal, no parallax, no infinite loops, no auto-animating elements.** Respect `prefers-reduced-motion`. |

**Design Read:** *Reading this as: a multi-page institutional school website for parents
evaluating admissions, in an editorial serif-and-sans heritage style, dial ENERGY 2 /
RHYTHM 2 / MOTION 1.*

## Voice and copy

- Institutional, third person. "The school offers", not "we're excited to".
- **Never fabricate.** No invented testimonials, no unsourced percentages, no fake alumni.
  If a real number is not available, the section does not claim one (R-17, R-18, R-36).
- CTA labels name the actual action: "Admission Open", "Contact Us", "View Documents".
  Never "Learn More", "Explore", "Discover", "Get Started" (R-15).
- No emoji in UI text. No em dashes (R-02); use commas, colons or parentheses.
- British-Indian English spelling, as used in Gujarat schooling ("recognised", "organised").

## Accessibility contract

Non-negotiable, because the audience includes parents reading on cheap phones outdoors and
staff using the admin on older hardware:

- All text clears **WCAG AA**: 4.5:1 normal, 3:1 large (18px+). Text over photos always sits
  on a scrim, and the worst-case spot is the one checked.
- Every interactive element has a visible `:focus-visible` ring at 3:1 against its
  neighbours. `outline: none` is never used without a replacement.
- Tap targets minimum **44px**.
- Layout is fluid: no horizontal overflow from 320px to 1920px, and content survives 200% zoom.
- Every data view has honest empty, loading and error states that name the cause and the
  next action (R-27).

## Motion contract

Hover transitions 150–300ms ease-out. Focus transitions 100ms. Nothing else moves on its
own. `@media (prefers-reduced-motion: reduce)` disables transitions entirely.

## Component rules

- **Cards** are for items of genuinely equal weight (a gallery of albums, a grid of campuses).
  A single important thing gets a full-width treatment, not a card (R-14).
- **Badges** (`campus-badge`, board tags) mark a real fact: the board. Nothing else earns a badge.
- **Icons** are Font Awesome glyphs chosen for relevance to the content, and they always sit
  next to a text label. No sparkle, star, magic, lightning or robot glyphs (R-04).
- **No dead controls.** If an element has no destination and no behaviour, it does not render.
  A tile that cannot be clicked is a label, not a link (R-26).
- **Every navigation item resolves** to a real page. Nothing points to `#` (R-24).