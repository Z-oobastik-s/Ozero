/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0066CC",
        secondary: "#2C7BE5",
        accent: "#FF9500",
        dark: "#121212",
        light: "#F9FAFB",
        success: "#34D399",
        warning: "#FBBF24",
        danger: "#F87171",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      animation: {
        "pulse-slow": "pulse 3s infinite",
        "bounce-slow": "bounce 3s infinite",
      },
      boxShadow: {
        'neu-light': '10px 10px 20px #d1d9e6, -10px -10px 20px #ffffff',
        'neu-dark': '8px 8px 16px #0f0f0f, -8px -8px 16px #151515',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, var(--tw-gradient-stops))',
      },
      gradientColorStops: {
        'gradient-primary-start': '#0066CC',
        'gradient-primary-end': '#2C7BE5',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}; 