/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Cyber colors for direct usage
        cyber: {
          teal: "hsl(var(--cyber-teal))",
          purple: "hsl(var(--cyber-purple))",
          pink: "hsl(var(--cyber-pink))",
          dark: "hsl(var(--cyber-dark))",
          darker: "hsl(var(--cyber-darker))",
        },
        // Legacy support
        'cyber-blue': '#00ffff',
        'cyber-purple': '#ff00ff',
        'cyber-dark': '#0a0a0f',
      },
      fontFamily: {
        display: ['"Black Ops One"', 'cursive'],
        subtitle: ['"Sirin Stencil"', 'cursive'],
        heading: ['"Allerta Stencil"', 'sans-serif'],
        body: ['"Big Shoulders Stencil Text"', 'sans-serif'],
        // Legacy support
        orbitron: ['"Black Ops One"', 'cursive'],
        rajdhani: ['"Big Shoulders Stencil Text"', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow-pulse": {
          "0%, 100%": { 
            boxShadow: "0 0 20px hsl(174 72% 56% / 0.4), 0 0 40px hsl(280 85% 65% / 0.2)" 
          },
          "50%": { 
            boxShadow: "0 0 30px hsl(174 72% 56% / 0.6), 0 0 60px hsl(280 85% 65% / 0.4)" 
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "float": "float 3s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
      },
      backgroundImage: {
        "cyber-gradient": "linear-gradient(135deg, hsl(var(--cyber-teal)), hsl(var(--cyber-purple)), hsl(var(--cyber-pink)))",
        "cyber-gradient-subtle": "linear-gradient(135deg, hsl(var(--cyber-teal) / 0.2), hsl(var(--cyber-purple) / 0.2), hsl(var(--cyber-pink) / 0.2))",
        "cyber-radial": "radial-gradient(ellipse at center, hsl(var(--cyber-purple) / 0.2) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
}
