<template>
  <v-row>
    <v-col>
      <v-row
        justify="center"
        class="pt-15 mb-10"
      >
        <v-col cols="12" md="10">
          <v-form @submit.prevent="search">
            <v-text-field
              label="Search a pokemon"
              placeholder="Search a pokemon"
              title="Search a pokemon"
              append-icon="mdi-magnify"
              v-model="search_pokemon"
              @click:append="search"
              solo
            ></v-text-field>
          </v-form>
        </v-col>
      </v-row>

      <v-row
        v-if="historyPokemons.length > 0"
        align="baseline"
        justify="space-between"
        class="mx-4 mb-2"
      >
        <h1>HISTORY</h1>
        <v-icon
          color="primary"
          @click="clearHistory"
          title="Delete history"
          x-large
        >
          mdi-delete-outline
        </v-icon>
      </v-row>
      <v-row v-if="historyPokemons.length > 0" class="mb-16">
        <v-col cols="12" md="6" lg="4" xl="4" v-for="pokemon in historyPokemons" :key="pokemon.id" class="mb-10">
          <pokemon-card :pokemon="pokemon" />
        </v-col>
      </v-row>

      <v-row
        v-if="defaultPokemons.length > 0"
        align="center"
        justify="space-between"
        class="mx-4 mb-2"
      >
        <h1>LIST</h1>
      </v-row>
      <v-row v-if="defaultPokemons.length > 0">
        <v-col cols="12" md="6" lg="4" xl="4" v-for="pokemon in defaultPokemons" :key="pokemon.id" class="mb-10">
          <pokemon-card :pokemon="pokemon" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-center mb-10">
          <v-btn
            outlined
            color="primary"
            @click="defaultOffset += 21"
          >
            View more
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-btn
      v-show="showButtonTop"
      fab
      color="primary"
      style="color: black; position: fixed; bottom: 10px; right: 10px; z-index: 10;"
      @click="scrollTop()"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      search_pokemon: "",
      historyPokemons: [],
      defaultPokemons: [],
      defaultOffset: 0,
      showButtonTop: false,
    }
  },
  mounted() {
    const hasHistory = !!localStorage.getItem("@pokelist:history");
    if(hasHistory){
      this.historyPokemons = JSON.parse(localStorage.getItem("@pokelist:history"));
    }

    this.getPokemonList();

    window.addEventListener('scroll', () => {
      this.showButtonTop = !!(window.scrollY > window.innerHeight / 2);
    });
  },
  methods: {
    async search() {
      try {
        const {data, status} = await this.$axios.get(`/pokemon/${this.search_pokemon}`);

        if(status !== 200) {
          throw Error("Erro ao buscar pokemon");
        }

        this.historyPokemons.unshift({
          id: data.id,
          name: data.name,
          image: data.sprites.front_default,
          types: data.types
        });

        localStorage.setItem("@pokelist:history", JSON.stringify(this.historyPokemons));

        this.$router.push(`pokemon/${this.search_pokemon}`);
      } catch(err) {
        console.log(err);
      }
    },
    async getPokemonList() {
      try {
        const url = `/pokemon/?limit=21&offset=${this.defaultOffset}`;
        const { data, status } = await this.$axios.get(url);
        if(status !== 200) {
          throw Error("Erro ao buscar lista inicial de pokemons");
        }
        const pokemons = data.results;
        pokemons.map(async (pokemon) => {
          const { data, status } = await this.$axios.get(`/pokemon/${pokemon.name}`);
          if(status !== 200) {
            throw Error("Erro ao buscar pokemon da lista inicial");
          }

          this.defaultPokemons.push({
            id: data.id,
            name: data.name,
            image: data.sprites.front_default,
            types: data.types,
            order: data.order,
          });
          this.defaultPokemons.sort((a, b) => a.order - b.order);
        });
      } catch(err) {
        console.log(err);
      }
    },
    clearHistory() {
      localStorage.removeItem("@pokelist:history");
      this.historyPokemons = [];
    },
    scrollTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  },
  watch: {
    defaultOffset(new_value) {
      this.getPokemonList();
    },
  }
}
</script>

<style scoped>
  .container {
    min-height: 100vh;
  }
</style>
