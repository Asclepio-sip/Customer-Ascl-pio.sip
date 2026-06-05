---
name: PromoFarma Pulse
colors:
  surface: '#ffffff'
  surface-dim: '#f5d2cd'
  surface-bright: '#fff8f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff0ee'
  surface-container: '#f8fafc'
  surface-container-high: '#ffe2dd'
  surface-container-highest: '#fedbd6'
  on-surface: '#0f172a'
  on-surface-variant: '#64748b'
  inverse-surface: '#402b28'
  inverse-on-surface: '#ffedea'
  outline: '#936e69'
  outline-variant: '#e2e8f0'
  surface-tint: '#c0000a'
  primary: '#b90009'
  on-primary: '#ffffff'
  primary-container: '#e31918'
  on-primary-container: '#fff8f7'
  inverse-primary: '#ffb4aa'
  secondary: '#056b5d'
  on-secondary: '#ffffff'
  secondary-container: '#a0f2e0'
  on-secondary-container: '#147163'
  tertiary: '#505b6f'
  on-tertiary: '#ffffff'
  tertiary-container: '#687388'
  on-tertiary-container: '#f9f9ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad5'
  primary-fixed-dim: '#ffb4aa'
  on-primary-fixed: '#410001'
  on-primary-fixed-variant: '#930005'
  secondary-fixed: '#a0f2e0'
  secondary-fixed-dim: '#84d5c4'
  on-secondary-fixed: '#00201b'
  on-secondary-fixed-variant: '#005045'
  tertiary-fixed: '#d8e3fb'
  tertiary-fixed-dim: '#bcc7de'
  on-tertiary-fixed: '#111c2d'
  on-tertiary-fixed-variant: '#3c475a'
  background: '#fafafa'
  on-background: '#1e293b'
  surface-variant: '#fedbd6'
  success: '#16a34a'
  error-bold: '#93000a'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.0'
    letterSpacing: -0.05em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.2'
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '800'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  price-display:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '800'
    lineHeight: '1.0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  margin-mobile: 16px
  margin-desktop: 64px
  gutter: 20px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  container-max: 1440px
---

## Brand & Style
PromoFarma Pulse is a **Corporate Modern** design system tailored for the pharmaceutical and wellness retail sector. It balances the urgency and energy of retail "super offers" with the clinical trustworthiness required for healthcare.

The visual language is characterized by high-impact primary accents, generous white space, and a "Premium-Retail" aesthetic. It utilizes subtle shadows and refined borders to create a structured, organized environment that feels both accessible and professional. The emotional response should be one of efficiency, reliability, and value.

## Colors
The palette is anchored by **Promo Red (#e31918)**, used strategically for branding, primary actions, and urgent notifications. **Healthcare Green (#066b5d)** acts as a secondary anchor, signifying safety, savings, and "Super Offers," providing a calming counter-balance to the red.

Neutral tones utilize a "Slate" scale (from #f8fafc to #0f172a) to maintain a clean, clinical feel without the harshness of pure blacks. Surface colors are strictly light, with a very subtle off-white background (#FAFAFA) to allow white cards to pop visually.

## Typography
The system exclusively uses **Plus Jakarta Sans** to achieve a friendly yet modern geometric look.
- **Display and Headlines:** Use ExtraBold (800) or Bold (700) weights with tight letter-spacing for impact.
- **Functional Labels:** High-emphasis labels (like "OFF" or "IMBATÍVEL") should be uppercase with slightly increased tracking for readability at small sizes.
- **Numbers:** Product prices use the "price-display" role, emphasizing the currency value with heavy weights to drive conversion.

## Layout & Spacing
The system follows a **Fixed Grid** philosophy with a maximum container width of 1440px.
- **Desktop:** 64px outer margins. Use a 12-column grid for complex layouts and a 4-column responsive grid for product listings.
- **Mobile:** 16px outer margins with vertical stacking for most card-based elements.
- **Spacing Rhythm:** Use a base-8 scale for vertical stacking. Sections are typically separated by 64px (stack-lg x 2) to maintain a premium, airy feel.

## Elevation & Depth
Depth is communicated through **Tonal Layers** and **Premium Shadows**.
- **Level 0 (Background):** #FAFAFA.
- **Level 1 (Cards/Surface):** White (#FFFFFF) with a `0 4px 20px rgba(0, 0, 0, 0.05)` shadow and a 1px border (#E2E8F0).
- **Interactive Depth:** On hover, cards should transition to a slightly deeper shadow and a subtle border color shift toward the primary accent (e.g., #e31918 at 30% opacity).
- **Navigation:** The header uses a sticky position with a simple border-bottom for clear separation without excessive shadow weight.

## Shapes
The shape language is "Hyper-Rounded," emphasizing friendliness and modern retail trends.
- **Standard Cards:** 1rem (16px) corner radius.
- **Buttons & Search Bars:** Use full pill-shaping (9999px) for primary actions to make them feel "tappable" and soft.
- **Small Components:** Tags and badges use a smaller 4px radius or full-pill depending on context.
- **Image Containers:** Within cards, images should sit in a 12px rounded container with a light neutral background (#F8FAFC).

## Components
- **Buttons:**
  - *Primary:* Pill-shaped, #e31918 background, white text, bold weight.
  - *Secondary:* Pill-shaped, #066b5d background, white text (used for specialized offers).
  - *Ghost:* Slate-50 background with outline-variant border.
- **Product Cards:** Must include a neutral-padded image area, a clear title, a "Stock status" label in success-green, and a dedicated price-action footer separated by a light border.
- **Search Bar:** Centrally located, pill-shaped, featuring a leading icon and a primary-colored circular button on the trailing edge.
- **Badges:** Use high-contrast backgrounds (Red, Green, or Navy) with 10px Bold Uppercase text for "Offers," "Promotions," or "New" tags.
- **Input Fields:** Soft grey backgrounds (#F8FAFC) with no borders except on focus, where they adopt the primary color.