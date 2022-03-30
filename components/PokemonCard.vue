<template>
  <v-card class="card">
    <v-row class="m-0">
      <v-col cols="6">
        <img :src="pokemon.image" :alt="'Image of ' + pokemon.name">
      </v-col>
      <v-col cols="6">
        <NuxtLink :to="`/pokemon/${pokemon.name}`" style="text-decoration: none; color: white;">
          <p class="pokemon-name pt-4" :style="styleObject">{{pokemon.name}}</p>
        </NuxtLink>
        <v-chip
          v-for="t in pokemon.types"
          :key="t.type.name"
          class="mb-2 mr-2 types"
          :color="$vuetify.theme.themes.dark[t.type.name]"
          :style="['ice', 'grass'].includes(t.type.name) && 'color: black;'"
        >
          {{t.type.name}}
        </v-chip>
      </v-col>
      <div
        class="id"
        :style="`color: ${$vuetify.theme.themes.dark[pokemon.types[0].type.name]}`"
      >
        {{pokemon_number}}
      </div>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: ["pokemon"],
  computed: {
    pokemon_number() {
      return String(this.pokemon.id).padStart(3, '0')
    },
    styleObject() {
      return {
        '--pokemon-name-hover': this.$vuetify.theme.themes.dark[this.pokemon.types[0].type.name]
      }
    }
  }
}
</script>

<style scoped>
  img {
    width: 100%;
  }

  div.id {
    position: absolute;
    bottom: -24px;
    right: -24px;
    font-size: 128px;
    height: 128px;
    line-height: 128px;
    font-weight: 900;
    opacity: 0.2;
    z-index: -1;
  }

  @media screen and (max-width: 1919px) {
    div.id {
      bottom: -18px;
      right: -18px;
      font-size: 96px;
      height: 96px;
      line-height: 96px;
    }
  }

  @media screen and (max-width: 1280px) {
    div.id {
      bottom: -12px;
      right: -12px;
      font-size: 72px;
      height: 72px;
      line-height: 72px;
    }
  }

  .card {
    overflow: hidden;
    z-index: 0;
  }

  .pokemon-name {
    text-transform: capitalize;
    font-size: 1rem;
  }

  .pokemon-name:hover {
    cursor: url('https://img.icons8.com/color/48/000000/open-pokeball--v2.png') 15 15, auto !important;
    text-decoration: underline;
    color: var(--pokemon-name-hover);
  }
</style>
