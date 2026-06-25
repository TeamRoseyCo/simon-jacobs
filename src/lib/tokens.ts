// Design tokens — palette derived from Simon's photo (blazer, beard, eyes)
export const colors = {
  // Backgrounds
  bg:      '#F7F5F1', // warm parchment
  surface: '#EDEAE4', // slightly darker parchment

  // Type
  ink:     '#0B1420', // his blazer navy — primary text, buttons, nav
  muted:   '#6B7280', // subtext, captions

  // Accents — all sourced from Simon's appearance
  copper:  '#7D5036', // beard
  seafoam: '#7EAAA8', // eyes
  // Primary action colour TBD: copper or seafoam — confirm with client

  // Utility
  border:  '#D8D4CC', // photo background grey
  white:   '#FFFFFF',
} as const

export type ColorToken = keyof typeof colors

// Typography
export const fonts = {
  serif:  '"Instrument Serif", Georgia, serif',
  sans:   '"DM Sans", system-ui, sans-serif',
} as const

// Spacing scale (px → rem at 16px base)
export const spacing = {
  xs:   '0.5rem',   //  8px
  sm:   '1rem',     // 16px
  md:   '1.5rem',   // 24px
  lg:   '2.5rem',   // 40px
  xl:   '4rem',     // 64px
  '2xl':'6rem',     // 96px
  '3xl':'8rem',     // 128px
} as const
