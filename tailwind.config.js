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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        script: ['Petit Formal Script', 'cursive'],
      },
      boxShadow: {
        'black-soft': '0 4px 8px rgba(0, 0, 0, 0.5)', // Adjust the offset and blur as needed
      },
    },
  },
  plugins: [],
};
