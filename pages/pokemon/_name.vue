<template>
  <v-row v-if="pokemon.id" :style="$vuetify.breakpoint.xs && 'max-height: calc(100vh - 60px)'">
    <v-btn
      color="primary"
      style="color: black; position: fixed; top: 20px; left: 20px; z-index: 10;"
      @click="$router.push('/')"
    >
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <v-col cols="12" sm="6">
        <img
        :src="pokemon_image"
        :title="`Image of ${pokemon.name}`"
        width="100%"
      />
    </v-col>
    <v-col cols="12" sm="6" class="pt-16" :style="$vuetify.breakpoint.xs && 'display: flex; flex-direction: column; align-items: center; text-align: center;'">
      <span :style="`color: ${$vuetify.theme.themes.dark[pokemon.types[0].type.name]}`">{{`#${pokemon.id}`}}</span>
      <h1 class="pokemon-name mb-6" :style="`color: ${$vuetify.theme.themes.dark[pokemon.types[0].type.name]}`">{{pokemon.name}}</h1>
      <div class="pb-12">
        <v-chip
          v-for="t in pokemon.types"
          :key="t.type.name"
          class="mb-2 mr-2 types"
          :color="$vuetify.theme.themes.dark[t.type.name]"
          :style="['ice', 'grass'].includes(t.type.name) && 'color: black;'"
        >
          {{t.type.name}}
        </v-chip>
      </div>
      <v-row class="pb-8">
        <v-col>
          <h4 class="pb-4 color-primary">ABILITIES</h4>
          <p
            v-for="{ ability } in pokemon.abilities"
            :key="ability.name"
            style="text-transform: capitalize; font-size: 0.875rem;"
          >{{ability.name}}</p>
        </v-col>
        <v-col>
          <h4 class="pb-4 color-primary">LOCATION AREA</h4>
          <p
            v-for="location in pokemon.locations"
            :key="location.location_area.name"
            style="text-transform: capitalize; font-size: 0.875rem;"
          >{{location.location_area.name}}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0">
          <h4 class="color-primary">STATS</h4>
        </v-col>
      </v-row>
      <v-row >
        <v-col
          cols="4"
          sm="6"
          :style="$vuetify.breakpoint.xs && 'display: flex; flex-direction: column; align-items: center; text-align:center'"
          v-for="{ stat, base_stat } in pokemon.stats"
          :key="stat.name"
          style="text-transform: capitalize; font-size: 0.875rem;"
        >
          <p>{{stat.name}}<br/>{{base_stat}}</p>
        </v-col>
      </v-row>
    </v-col>
  </v-row>

</template>

<script>
export default {
  data() {
    return {
      pokemon: {
        name: this.$route.params.name,
        locations: [],
        types: [

        ],
      }
    }
  },
  computed: {
    pokemon_image() {
      return(
        this.pokemon.sprites?.other["official-artwork"]?.front_default
        || this.pokemon.sprites?.front_default
      );
    }
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const {data, status} = await this.$axios.get(`/pokemon/${this.pokemon.name}`);

        if(status !== 200) {
          throw Error("Erro ao buscar pokemon");
        }

        const local = await this.$axios.get(data.location_area_encounters);
        data.locations = local.data.slice(0, 5);

        this.pokemon = data;
        console.log(data);
      } catch(err) {
        console.log(err);
      }
    }
  }
}
</script>

<style scoped>
  .pokemon-name {
    text-transform: capitalize;
  }

  .color-primary {
    color: var(--v-primary-base);
  }
</style>
