/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // warm ink neutrals replace Tailwind's cool default gray everywhere
        gray: {
          50: "#F8F5EF",
          100: "#EFEAE0",
          200: "#E1D9C8",
          300: "#C9BCA3",
          400: "#A79680",
          500: "#8A7A66",
          600: "#6E6151",
          700: "#544A3D",
          800: "#3A322A",
          900: "#241F1A",
        },
        primary: {
          50: "#FBEEF0",
          100: "#F3D6DB",
          200: "#E3AEB6",
          300: "#CE7D8B",
          400: "#A94D5E",
          500: "#8A2A3B",
          600: "#6B1220",
          700: "#54070E",
          800: "#3D0208",
          900: "#2A0004",
        },
        accent: {
          50: "#FBF4E4",
          100: "#F5E6C2",
          200: "#E9D090",
          400: "#D0A63F",
          500: "#B8860B",
          600: "#946B08",
        },
        surface: {
          DEFAULT: "#FFFEFB",
          muted: "#FBF7EE",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        serif: [
          '"Playfair Display"',
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(42, 31, 26, 0.05)",
        "card-hover": "0 3px 10px -2px rgba(42, 31, 26, 0.10)",
        popover: "0 10px 28px -6px rgba(42, 31, 26, 0.18)",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        md: "0.25rem",
        lg: "0.375rem",
      },
    },
  },
  plugins: [],
}
