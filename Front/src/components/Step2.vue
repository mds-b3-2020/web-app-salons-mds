<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-select
            class="input"
            v-model="select"
            label="Je suis actuellement en :"
            :items="items"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            class="input"
            v-model="study_city"
            label="J'étudie dans la ville de :"
            placeholder="Lyon"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            class="input"
            v-model="specialite"
            label="Specialité"
            placeholder="Veuillez saisir votre spécialité..."
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            class="input"
            v-model="items_year"
            label="Je recherche une formation pour la rentrée :"
            placeholder="2022"
            :items_year="items_year"
            required
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  components: {},
  data: () => ({
    valid: false,
    select: "Collège",
    items: [
      "Collège",
      "Seconde",
      "Première",
      "Terminale",
      "BAC+1 ",
      "BAC+2",
      "BAC+3",
      "BAC+4",
      "BAC+5",
    ],
    items_year: [
    "2022", 
    "2023", 
    "2024"
    ],
    study_city: "",
    specialite: ""
  }),

  methods: {
    submit() {
      this.$refs.observer.validate();
    },
    clear() {
      this.select = null;
      this.$refs.observer.reset();
    },
  },
};
</script>

<style>
.input input::placeholder {
  color:#B8BCCA !important;
  opacity: 1;
}
</style>
