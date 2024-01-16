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
        lightBlack: "#141414",
        darkGrey: "#1F1F1F",
        mediumGrey: "#262626",
        grey: "#e3e3e34d",
        lightGrey: "#686868",
        fogWhite: "#F9F9F9",
        green: "#30B94D",
        blue: "#4F92F7",
        red: "#E90516",
      },
    },
  },
  plugins: [],
};
export default config;
