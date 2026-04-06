/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--app-background)",
        panel: "var(--panel-background)",
        secondary: "var(--secondary-surface)",
        border: "var(--border)",
        primary: {
          text: "var(--primary-text)",
          blue: "var(--accent-blue)",
        },
        accent: {
          blue: "var(--accent-blue)",
          soft: "var(--accent-blue-soft)",
        },
        status: {
          success: "var(--success)",
          warning: "var(--warning)",
          error: "var(--error)",
        },
        caption: {
          base: "var(--caption-base)",
          active: "var(--active-word)",
          bg: "var(--caption-bg)",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-poppins)", "sans-serif"],
        caption: ["var(--font-montserrat)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
