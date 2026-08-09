/** @type {import('tailwindcss').Config} */
// PLACEHOLDER visual identity — Volume 9 (UI/UX Design System) is unresolved pending final visual
// identity decisions for Vexora Global (business name confirmed; see docs/volume-1-business-requirements.md
// §1.1). This palette is a professional placeholder so the site is usable and coherent during
// development; expect it to be replaced wholesale once Volume 9 is resolved.
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm graphite + clay — evokes woven fabric/craftsmanship, deliberately distinct from
        // finrise-website's navy/gold so the two businesses never look like the same company.
        graphite: {
          DEFAULT: "#262220",
          dark: "#171412",
        },
        clay: {
          DEFAULT: "#9C4E36",
          dark: "#7A3D29",
        },
        surface: {
          page: "#F7F4EF",
          card: "#FFFFFF",
        },
        border: {
          DEFAULT: "#E1DAD1",
          strong: "#C7BDAF",
        },
        ink: {
          DEFAULT: "#2B2622",
          secondary: "#6B6259",
        },
        status: {
          success: "#0F6E56",
          successBg: "#EAF3DE",
          warning: "#854F0B",
          warningBg: "#FAEEDA",
          danger: "#A32D2D",
          dangerBg: "#FBEAEA",
          info: "#0C447C",
          infoBg: "#EAF0FB",
        },
      },
      fontFamily: {
        // Serif headings (craft/heritage feel) + clean sans body — set via CSS variables from
        // next/font/google in app/layout.js. Applied globally to h1-h4 in globals.css; these
        // utility classes exist for ad-hoc use (e.g. font-serif on a non-heading element).
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        serif: ["var(--font-source-serif)", "Georgia", "serif"],
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "16px",
      },
      maxWidth: {
        content: "1120px",
      },
    },
  },
  plugins: [],
};
