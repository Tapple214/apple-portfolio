import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FAF8F5",
        secondary: "#806DBF",
        dark: "#0D0714",
        accent: "#C1B7E1",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      transformStyle: {
        "preserve-3d": "preserve-3d",
      },
      perspective: {
        "300": "300px",
      },
      scale: {
        "3": "3",
        "2.75": "2.75",
        "2.33333333": "2.33333333",
        "1.833333333": "1.833333333",
        "1.4167": "1.4167",
      },
      zIndex: {
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5",
        "6": "6",
        "7": "7",
        "8": "8",
      },
    },
  },
  plugins: [],
};

export default config;
