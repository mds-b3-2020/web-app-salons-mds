<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <InputSelect
            class="input"
            v-model="etudes"
            label="Je suis actuellement en :"
            placeholder="Terminale"
            :items="etudes"
            required
          ></InputSelect>
        </v-col>
        <v-col cols="12" md="4">
          <InputText
            class="input"
            v-model="study_city"
            label="J'étudie dans la ville de :"
            placeholder="Lyon"
            required
          ></InputText>
        </v-col>
        <v-col cols="12" md="4">
          <InputText
            class="input"
            v-model="specialite"
            label="Veuillez saisir votre spécialité..."
            placeholder="..."
            required
          ></InputText>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <InputSelect
            class="input"
            v-model="sessions"
            label="Je recherche une formation pour la rentrée :"
            placeholder="2022"
            :items="sessions"
            required
          ></InputSelect>
        </v-col>
        <v-col cols="12" md="4">
          <InputSelect
            class="input"
            v-model="formations"
            label="Je m’intéresse à la formation :"
            placeholder="1ère année Cycle Web et Multimédia"
            :items="formations"
            required
          ></InputSelect>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import InputText from "../components/input/InputText";
import InputSelect from "../components/input/InputSelect";
export default {
  components: {
    InputText,
    InputSelect,
  },
  data: () => ({
    valid: false,
    etudes: [
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
    sessions: [
    "2022", 
    "2023", 
    "2024"
    ],
    formations: [
      "1ère année Cycle Web et Multimédia ",
      "2ème année Cycle Web et Multimédia"
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
