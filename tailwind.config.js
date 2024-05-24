const defaultTheme = require("tailwindcss/defaultTheme");
const screens = {};
const spacing = {};
for (let i = 1440; i >= 320; i--) {
  screens[`-${i}`] = { max: `${i}px` };
}
for (let i = 500; i >= 0; i--) {
  spacing[`${i}`] = `${i}rem`;
}
module.exports = {
  mode: "jit",
  purge: {
    content: [
      "components/**/*.vue",
      "layouts/**/*.vue",
      "pages/**/*.vue",
      "plugins/**/*.ts",
      "nuxt.config.ts"
    ]
  },
  theme: {
    extend: {
      colors: {
        primary: defaultTheme.colors.green
      }
    }
  },
  spacing: { ...spacing }
};
