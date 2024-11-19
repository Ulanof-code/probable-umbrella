import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/theme"; 

const config: Config = {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    // добавляем все файлы из папки pages
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    // добавляем все файлы из папки components
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // добавляем все файлы из папки app
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // добавляем все файлы из папки node_modules/@nextui-org/theme/dist
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};

export default config;