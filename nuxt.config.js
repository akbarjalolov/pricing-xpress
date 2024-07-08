export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: true,
  head: {
    title: "Car Shipping Cost Calculator | Get Instant Car Transport Quotes",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Calculate your car shipping costs instantly with our easy-to-use car shipping cost calculator. Get quick and accurate quotes for vehicle transport.",
      },
      {
        name: "keywords",
        content:
          "car shipping, car shipping cost calculator, vehicle transport, auto transport quotes, car transport rates",
      },
      { name: "robots", content: "index, follow" },

      // Open Graph / Facebook
      { property: "og:type", content: "website" },
      {
        property: "og:title",
        content:
          "Car Shipping Cost Calculator | Get Instant Car Transport Quotes",
      },
      {
        property: "og:description",
        content:
          "Calculate your car shipping costs instantly with our easy-to-use car shipping cost calculator. Get quick and accurate quotes for vehicle transport.",
      },
      {
        property: "og:url",
        content: "https://pricing.xpresstransportation.org/",
      },
      {
        property: "og:image",
        content:
          "https://www.xpresstransportation.org/assets/forgoogle2.48e9c249.jpg",
      },

      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content:
          "Car Shipping Cost Calculator | Get Instant Car Transport Quotes",
      },
      {
        name: "twitter:description",
        content:
          "Calculate your car shipping costs instantly with our easy-to-use car shipping cost calculator. Get quick and accurate quotes for vehicle transport.",
      },
      {
        name: "twitter:image",
        content:
          "https://www.xpresstransportation.org/assets/forgoogle2.48e9c249.jpg",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.svg" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/scss/style.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/element.js" },
    { src: "~/plugins/slider.js" },
    { src: "~/plugins/vmask.js" },
    { src: "~/plugins/vuelidate.js" },
    { src: "~/assets/js/scripts.js", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    configPath: "tailwind.config.js",
    exposeConfig: true,
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/style-resources", "@nuxtjs/axios", "@nuxtjs/gtm"],

  styleResources: {
    scss: ["@/assets/scss/functions.scss"],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: "",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    cssSourceMap: false,
  },
};
