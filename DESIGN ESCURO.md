---
name: PromoFarma Noir
colors:
  surface: '#181d1b'
  surface-dim: '#0f1413'
  surface-bright: '#353a38'
  surface-container-lowest: '#0a0f0d'
  surface-container-low: '#181d1b'
  surface-container: '#2c3130'
  surface-container-high: '#262b29'
  surface-container-highest: '#313634'
  on-surface: '#eaefec'
  on-surface-variant: '#bdc9c5'
  inverse-surface: '#dfe4e0'
  inverse-on-surface: '#2c312f'
  outline: '#879390'
  outline-variant: '#3e4946'
  surface-tint: '#74d8c6'
  primary: '#74d8c6'
  on-primary: '#003730'
  primary-container: '#008374'
  on-primary-container: '#f1fffa'
  inverse-primary: '#006b5e'
  secondary: '#74d8c6'
  on-secondary: '#003730'
  secondary-container: '#008374'
  on-secondary-container: '#f4fffb'
  tertiary: '#ffb59f'
  on-tertiary: '#591c09'
  tertiary-container: '#af5e45'
  on-tertiary-container: '#fffbff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#91f4e2'
  primary-fixed-dim: '#74d8c6'
  on-primary-fixed: '#00201b'
  on-primary-fixed-variant: '#005047'
  secondary-fixed: '#90f4e2'
  secondary-fixed-dim: '#74d8c6'
  on-secondary-fixed: '#00201b'
  on-secondary-fixed-variant: '#005046'
  tertiary-fixed: '#ffdbd0'
  tertiary-fixed-dim: '#ffb59f'
  on-tertiary-fixed: '#3a0a00'
  on-tertiary-fixed-variant: '#76321d'
  background: '#0e1110'
  on-background: '#dfe4e0'
  surface-variant: '#313634'
  white: '#ffffff'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1'
    letterSpacing: -0.05em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  price-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '800'
    lineHeight: 24px
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  margin-desktop: 64px
  margin-mobile: 16px
  gutter: 24px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  container-max: 1440px
---

## Brand & Style
PromoFarma Noir is a premium, high-octane retail aesthetic designed for the modern pharmaceutical and wellness space. It departs from traditional sterile pharmacy environments, adopting a **Midnight Tech** style that blends the sophistication of a luxury dark-mode interface with the urgency of retail performance.

The brand personality is authoritative, agile, and high-end. It utilizes high-contrast teal accents against charcoal and obsidian backgrounds to create a "digital apothecary" feel. The emotional response is one of trust and exclusivity—positioning health and wellness as a premium lifestyle choice rather than a chore. The design is characterized by crisp typography, subtle gradients, and "premium-shadow" depth that elevates product imagery.

## Colors
The palette is rooted in deep, desaturated teals and charcoals. The primary **Teal (#008374)** serves as the structural anchor for buttons and UI markers, while the secondary **Teal Accent (#74d8c6)** is reserved for high-impact text, icons, and interactive hover states to provide a luminous, high-tech glow.

The background system uses a layered dark approach:
- **Background (#0e1110):** The deepest layer, used for the main canvas and product image backdrops.
- **Surface (#181d1b):** Used for navigation and footer headers to provide structural separation.
- **Surface-Container (#2c3130):** Used for hero sections and secondary card backgrounds.
- **Typography:** Headlines use pure White (#ffffff) for maximum legibility, while body text uses On-Surface (#eaefec) to reduce eye strain.

## Typography
The system relies exclusively on **Plus Jakarta Sans**, utilizing its geometric and modern proportions to maintain a clean, athletic look. 

- **Headlines:** Use heavy weights (700-800) and tight tracking. Hero displays are often uppercase and slightly condensed to emphasize the "Festival/Sale" urgency.
- **Product Names:** Set in Body-MD with bold weight to stand out in grid layouts.
- **Functional Labels:** High-contrast, small-caps labels (10px) are used for availability status and category headers, often paired with the Teal Accent color.
- **Mobile Scaling:** Display titles should scale down to 32px on mobile devices, while maintaining the heavy font-weight and uppercase styling.

## Layout & Spacing
The layout follows a **Fixed-Width Container** model (max-width: 1440px) centered on the screen, providing a controlled reading experience on large displays. 

- **Grid:** A 12-column logic is applied to the product grid, reflowing from 6 columns on desktop to 2 columns on mobile.
- **Vertical Rhythm:** Sections are separated by large 64px to 80px padding blocks to maintain a premium, airy feel despite the dark palette.
- **Horizontal Split:** Hero sections utilize a 50/50 split on desktop, transitioning to a vertical stack on mobile with imagery taking the bottom position.

## Elevation & Depth
Elevation is primarily expressed through **Tonal Layering** and **Luminous Depth**.

- **Surfaces:** Depth is achieved by transitioning from #0e1110 (base) to #181d1b (raised) to #2c3130 (active/focus).
- **Shadows:** The "Premium Shadow" (0 4px 20px rgba(0, 0, 0, 0.4)) is applied to cards to make them appear slightly detached from the surface. 
- **Inner Depth:** Search bars and input fields use a `shadow-inner` effect to appear recessed into the UI.
- **Interactive States:** Hovering over cards or buttons triggers a subtle border color shift to the Teal Accent, creating a "glow" effect that replaces traditional shadow-based elevation.

## Shapes
The shape language is diverse, blending **Geometric Rigidity** with **Ergonomic Curves**.

- **Cards:** Use 1rem (rounded-2xl) corners for a soft, friendly container.
- **Product Images:** Inner containers use 0.75rem (rounded-xl) corners.
- **Buttons & Search:** Utilize a Full-Pill (9999px) design for primary actions, suggesting speed and modern accessibility.
- **Accents:** Section markers (like the 2x8px vertical bar) use fully rounded ends to soften the otherwise rigid grid lines.

## Components
- **Buttons:** Primary buttons are pill-shaped with bold weight text. "Add" buttons in grids are circular with icons only. Secondary buttons in the hero section are white with black text, transitioning to teal on hover.
- **Product Cards:** Feature a distinct separated header for the image (in a darker background), a middle section for metadata, and a bottom section for pricing/actions separated by a subtle border.
- **Search Bar:** A full-width (on mobile) or 2/3 width (on desktop) pill-shaped input with an integrated circular action button at the end.
- **Category Navigation:** Uses a horizontal-scroll "chip" style without backgrounds, relying on icon + text pairs that transition to teal on hover.
- **Badges:** Small, rectangular tags with sharp corners (or 2px radius) used for discount percentages (-30%), positioned in the top right of product cards.
- **Inputs:** Dark backgrounds with low-opacity borders; focus states should highlight the border in teal without changing the background color.