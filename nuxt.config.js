export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Cost Calculator | Xpress Auto Transport Inc.",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.svg" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/scss/style.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/element.js" },
    { src: "~/plugins/slider.js" },
    { src: "~/plugins/vmask.js" },
    { src: "~/plugins/vuelidate.js" },
    { src: "~/assets/js/scripts.js" }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    configPath: "tailwind.config.js",
    exposeConfig: true
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/style-resources",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios"
  ],

  styleResources: {
    scss: ["@/assets/scss/functions.scss"]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: ""
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    cssSourceMap: false
  }
};
