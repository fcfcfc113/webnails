---
name: Petal & Polish
description: A neighborhood nail salon's Riso-printed flyer, with tear-off tabs that book real chairs.
colors:
  ink: "#2b3e91"
  ink-deep: "#151f55"
  pink: "#ff48b0"
  pink-soft: "#ffc2e3"
  aqua: "#5ec8e5"
  sun: "#ffe14d"
  violet: "#5a2e84"
  paper: "#f5f6f8"
  paper-2: "#eceef3"
  white: "#ffffff"
  error-ink: "#b0124f"
typography:
  display:
    fontFamily: "'Bricolage Grotesque', 'Onest', system-ui, sans-serif"
    fontSize: "clamp(3.4rem, 9.6vw, 8.6rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.035em"
    fontVariation: "'opsz' 96"
  headline:
    fontFamily: "'Bricolage Grotesque', 'Onest', system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 6.5vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  price:
    fontFamily: "'Bricolage Grotesque', 'Onest', system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.6vw, 3rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.04em"
    fontFeature: "'tnum', 'lnum'"
  title:
    fontFamily: "'Bricolage Grotesque', 'Onest', system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  body:
    fontFamily: "'Onest', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "'Onest', system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.1em"
rounded:
  tag: "6px"
  chip: "10px"
  field: "12px"
  control: "14px"
  card: "22px"
  ticket: "26px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4vw, 56px)"
  max: "1320px"
  section: "clamp(72px, 11vw, 140px)"
  field-gap: "22px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    typography: "{typography.title}"
    rounded: "{rounded.pill}"
    padding: "0.85em 1.4em"
  button-pink:
    backgroundColor: "{colors.pink}"
    textColor: "{colors.ink-deep}"
    rounded: "{rounded.pill}"
    padding: "0.85em 1.4em"
  input-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "0.8em 1em"
  input-field-focus:
    backgroundColor: "{colors.white}"
  slot-chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.chip}"
    padding: "0.55em 1em"
  slot-chip-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  tip-card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.card}"
    padding: "28px 18px 18px"
  sample-marker:
    backgroundColor: "transparent"
    typography: "{typography.label}"
    rounded: "{rounded.tag}"
    padding: "4px 8px 3px"
---

# Design System: Petal & Polish

## Overview

**Creative North Star: "The Riso Flyer on the Salon Door"**

The whole site is one community flyer run through a risograph: cool white stock with fine paper grain, fluorescent pink owning big fields, medium-blue as the text ink, aqua and sunflower as the third and fourth drums. Everything is flat ink. Depth, tone, and emphasis come from what a printer can actually do: overprint (pink multiplied over blue turns violet), a second plate printed slightly off-register, and halftone dot screens. Nothing is shaded, blurred, or photographed.

Sections are full-bleed ink fields (paper, aqua, pink, paper, ink) stacked like a folded flyer, separated by dashed perforations. Type carries volume: headlines and prices are set huge and tight in Bricolage Grotesque, while Onest body copy stays small and plain. Each section keeps one charged empty field (a dot disc, a tilted card row, a single giant price) rather than filling every gap.

The booking interaction is part of the printed object: tear-off tabs on the hero strip are real open slots, and the booking form is a punched ticket with a stub. Placeholder facts are never presented as real; they wear a dashed "Sample" marker.

**Key Characteristics:**
- Flat Riso inks on cool grained paper; no gradients-as-shading, no photos.
- Overprint by real `multiply` blending, violet where pink crosses blue.
- Depth only through offset flat ink plates beneath an object.
- Tone through halftone dot screens, never smooth blends.
- Display type and prices shout; body text stays quiet.
- Dashed perforations as the section and tab divider.

## Colors

Four Riso inks on cool paper, plus the violet their overprint produces.

### Primary
- **Medium Blue Ink** (ink): all body text, the primary button fill, the ticket stub, the footer field, tip keylines, selected states.
- **Fluorescent Pink** (pink): owns the largest fields (price menu section, hero dot disc), the off-register second plate under buttons and cards, the misregistered type overprint, and the secondary button.

### Secondary
- **Pool Aqua** (aqua): the tip-gallery section field and a third ink inside tip designs.
- **Sunflower** (sun): stamp badge pad, highlighter swipes behind phone numbers and small callouts, and the outer focus ring.

### Tertiary
- **Overprint Violet** (violet): the color pink-over-blue produces. Used directly only for the "more times" tab hover; otherwise it should arise from `multiply`, not be painted.
- **Petal Pink Tint** (pink-soft): hover wash on tear-off tabs and slot chips; light dot screen in tip designs.

### Neutral
- **Cool Riso Stock** (paper): page background, field fills, tip-card stock.
- **Shadow Stock** (paper-2): torn-tab stub, scrollbar track, inline code chips.
- **Deep Ink** (ink-deep): text on pink fields (menu, pink button), and the inner focus outline.
- **Bright White** (white): ticket body, tear-off strip, text on blue fields.
- **Error Ink** (error-ink): form error messages and invalid-field borders only.

### Named Rules
**The Overprint Rule.** Where pink sits over blue, blend with `mix-blend-mode: multiply` so the crossing reads violet. Never paint a fake overlap.

**The Text-on-Pink Rule.** Text on a pink field is Deep Ink, never Medium Blue Ink or white.

## Typography

**Display Font:** Bricolage Grotesque (opsz 12..96, wght 400..800), falling back to Onest, system-ui
**Body Font:** Onest (400, 500, 600), falling back to system-ui

**Character:** A chunky, slightly quirky optical-size grotesque at weight 800 with tight negative tracking, paired with a clean, friendly geometric sans for everything that has to be read.

### Hierarchy
- **Display** (800, clamp(3.4rem, 9.6vw, 8.6rem), 0.9): hero headline only, and the footer sign at up to 13rem; carries the misregistered pink overprint.
- **Headline** (800, clamp(2.6rem, 6.5vw, 5.5rem), 0.92): one per section, short and punchy, two lines max.
- **Price** (800, clamp(2rem, 3.6vw, 3rem), 1, -0.04em, tabular lining figures): the loudest element on every menu row; the dollar sign is a raised superscript at 0.45em.
- **Title** (800, clamp(1.6rem, 2.6vw, 2.2rem)): menu group heads, street address, phone number, ticket time.
- **Body** (400, 1.0625rem, 1.55): running copy; ledes cap at 46ch.
- **Label** (600, 0.8rem, 0.1em tracking, uppercase): tab day names, ticket number, sample markers, "today" chip.

### Named Rules
**The Volume Rule.** Type size carries importance. A price is set larger than the service name it belongs to.

**The Off-Register Rule.** Display type may carry a pink duplicate offset (0.02em, 0.015em) multiplied over it. Use it on the hero headline and the footer sign, not on every heading.

## Layout

Single column of full-bleed ink fields, each holding a centered wrap of `min(100% - 2 * gutter, 1320px)`. Section padding is generous and fluid (around clamp(72px, 11vw, 140px)). The hero uses a 12-column grid with absolutely positioned print elements (dot disc, solid disc, tip fan, stamp) layered over and behind the headline. The tip gallery is a horizontal scroll-snap rail that bleeds to the viewport edge. The menu is two columns of dotted-rule rows; the visit block is a three-column area grid.

Breakpoints: 900px collapses hero and visit grids, 820px stacks menu and ticket to one column, 640px is the phone layout (the fixed mobile book bar appears; hero print elements shrink and move below the headline), 560px hides header nav.

## Elevation & Depth

Flat. There are no blurred shadows in the system. Depth comes only from a second flat ink plate printed slightly off-register beneath an object: pink under the blue button (2px, 2px), blue under the pink button, blue under each tilted tip card (6px, 7px), pink under the booking ticket (8px, 9px, with the ticket's punched notches cut through it too). On hover the object lifts and its plate falls further away; on press they close up.

### Shadow Vocabulary
- **Button plate** (second ink at `translate(2px, 2px)`, to `translate(3px, 4px)` on hover): every button.
- **Card plate** (ink at `rotate(var(--tilt)) translate(6px, 7px)`): tip cards.
- **Ticket plate** (pink at `translate(8px, 9px)`, notch-masked): the booking ticket.
- **Tip keyline** (`box-shadow: inset 0 0 0 2px` ink): a printed outline, not a shadow.

### Named Rules
**The Second-Plate Rule.** If something needs to lift, print a second flat ink plate under it, offset down-right. Never use a blurred or spread shadow.

**The Halftone Rule.** Tone is a dot screen (radial-gradient dots, 7 to 14px cells), never a smooth gradient.

## Shapes

Soft but print-cut. Pills for buttons and the mobile book bar, 22 to 26px corners for cards and the ticket, 10 to 12px for chips and fields, 6px for tags. Circles for halftone discs and the rubber-stamp badge. Almond nail tips (`50% 50% 44% 44% / 60% 60% 40% 40%`, aspect 1:2.05). Dashed 2px perforations divide sections, tabs, and the ticket stub; dotted 2px rules divide list rows. Small tilts (cards, stamps, picked chip, selected slot at -2deg) keep it hand-pasted.

## Components

### Buttons
Two ink plates, tactile and printed.
- **Shape:** full pill (999px).
- **Primary:** Medium Blue Ink fill, white text, Bricolage 700 at 1rem, padding 0.85em 1.4em, with a pink plate offset beneath.
- **Pink:** pink fill, Deep Ink text, blue plate beneath (white plate on the blue footer).
- **Hover / Active:** lifts (-1px, -2px) as its plate drops to (3px, 4px); presses to (2px, 2px). 0.35s ease-out-expo.
- **Disabled:** 0.55 opacity, no motion.

### Focus
Every focusable element: 3px Deep Ink outline, 3px offset, plus a 7px sunflower ring. Form fields instead swap to a pink border on a white fill.

### Tear-off Tabs (signature)
Vertical text tabs in a white strip under a dashed perforation with a scissors mark. Day in uppercase label, time in Bricolage 800. Hover washes petal pink; the "more times" tab is solid ink, violet on hover. Tapping tears the tab: it swings off and fades, leaving a zig-zag stub on shadow stock.

### Tip Cards
Paper-stock card (22px corners) tilted by a per-card angle with an ink plate beneath. Hover straightens and lifts it. Selected: white stock, 3px ink outline, a pink "picked" pill stamp scales in.

### Nail Tips
Flat almond swatches with an inset 2px ink keyline and an opaque white gloss sliver. Designs are built only from flat inks, halftone screens, checks, and stripes. No shading, no translucent highlight.

### Booking Ticket
White ticket with punched half-circle notches and a blue stub (dashed paper perforation, pink halftone corner, giant pink time). Fields: paper fill, 2px transparent border, 12px corners; focus to pink border on white; invalid to error ink. Slot chips: dashed ink border, selected becomes solid ink, white text, -2deg tilt.

### Navigation
Bricolage wordmark with a rotating rubber-stamp logo. Links in Onest 600 with a pink highlighter bar that sweeps in on hover. On phones the nav hides and a fixed ink pill book bar takes over.

### Sample Marker
Uppercase 0.72rem Onest 600 label in a 1.5px dashed currentColor box (6px corners). Mandatory on any placeholder price, time, policy, address, or illustration.

## Do's and Don'ts

### Do:
- **Do** build every surface from the four inks plus paper; let violet appear through `multiply` overprint.
- **Do** lift objects with an offset flat ink plate (2 to 9px down-right).
- **Do** render tone as halftone dots and tips as flat ink with a 2px inset ink keyline and an opaque white gloss sliver.
- **Do** set prices larger than the line's service name, in Bricolage 800 with tabular figures.
- **Do** divide with dashed perforations and dotted rules.
- **Do** wear a dashed "Sample" marker on every placeholder fact.
- **Do** use the 3px Deep Ink outline plus sunflower ring for focus.

### Don't:
- **Don't** use blurred or spread box-shadows for depth.
- **Don't** shade with smooth gradients; screen it with dots.
- **Don't** put Medium Blue Ink or white text on a pink field; use Deep Ink.
- **Don't** add spa photography, script logos, or blush-pink gradients.
- **Don't** present placeholder prices, hours, or reviews as real.
