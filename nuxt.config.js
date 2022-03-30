export default {
  ssr: false,
  head: {
    title: 'Pokelist',
    htmlAttrs: {
      lang: 'pt-br'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png'}
    ]
  },
  css: [
    "@/assets/global.scss",
  ],
  plugins: [
  ],
  components: true,
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    baseURL: 'https://pokeapi.co/api/v2/',
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      options: { customProperties: true },
      dark: true,
      themes: {
        dark: {
          primary: "#00FF00",
          bug: "#00cc00",
          dark: "#441d57",
          dragon: "#0066cc",
          electric: "#f6bd20",
          fairy: "#ec5268",
          fighting: "#ee6138",
          flying: "#93b2c7",
          ghost: "#33336b",
          fire: "#de5239",
          grass: "#00ff73",
          ground: "#a9702c",
          ice: "#d8f0fa",
          normal: "#75515b",
          poison: "#9441bd",
          psychic: "#ed5a8f",
          rock: "#491b0e",
          steel: "#5f756d",
          water: "#1a58e2",
        }
      }
    }
  },
  build: {
  }
}
