<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-select
            class="input"
            v-model="etude"
            label="Je suis actuellement en : *"
            placeholder="Terminale"
            :items="etudes"
            required
          >
          </v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            class="input"
            v-model="formData.study_city"
            label="J'étudie dans la ville de : *"
            placeholder="Lyon"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            class="input"
            v-model="formData.specialite"
            label="Veuillez saisir votre spécialité..."
            placeholder="..."
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-select
            class="input"
            v-model="formData.sessions"
            label="Je recherche une formation pour la rentrée : *"
            placeholder="2022"
            :items="session"
            required
          >
          </v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            class="input"
            v-model="formation"
            label="Je m’intéresse à la formation : *"
            placeholder="1ère année Cycle Web et Multimédia"
            :items="formations"
            required
          >
          </v-select>
        </v-col>
      </v-row> </v-container
    >
  </v-form>
</template>

<script>
//import InputText from "../components/input/InputText";
//import InputSelect from "../components/input/InputSelect";
export default {
  components: {},
  data: () => ({
    valid: false,
    etudes: [
      "Collège",
      "Seconde",
      "Première",
      "Terminale",
      "BAC+1",
      "BAC+2",
      "BAC+3",
      "BAC+4",
      "BAC+5",
    ],
    etude: "",
    session: ["2022", "2023", "2024"],
    formations: [
      "1ère année Cycle Web et Multimédia",
      "2ème année Cycle Web et Multimédia",
      "3ème année Webdesign",
      "3ème année Webmarketing & Social Media",
      "3ème année Développeur web",
      "3ème année E-Business",
      "4ème année Marketing Digital",
      "4ème année Développeur Full Stack",
      "4ème année UX/UI Design",
      "4ème année Management de l’innovation digitale",
      "4ème année Data Marketing",
      "5ème année Marketing Digital",
      "5ème année Développeur Full Stack",
      "5ème année UX/UI Design",
      "5ème année Management de l’innovation digitale",
      "5ème année Data Marketing",
    ],
    formData: {
      code_session_rentree: "",
      study_city: "",
      specialite: "",
      sessions: "",
      codeFormation: "",
    },
    formation: "",
    is_initial: 0,
    is_alternance: 0
    
  }),

  watch: {
    formData: {
      handler: function () {
        this.$emit("newdata", [
          this.formData.code_session_rentree,
          this.formData.study_city,
          this.formData.specialite,
          this.formData.sessions,
          this.formData.codeFormation,
          this.is_initial,
          this.is_alternance
        ]);
      },
      deep: true,
    },
    formation: function() {
      this.formData.codeFormation = this.formatFormation(this.formation)
    },
    etude: function() {
      this.formData.code_session_rentree = this.formatEtude(this.etude)
    }
  },

  methods: {
    submit() {
      this.$refs.observer.validate();
    },
    clear() {
      this.select = null;
      this.$refs.observer.reset();
    },
    formatFormation(formation) {
     
      if ( formation === "1ère année Cycle Web et Multimédia" || formation === "2ème année Cycle Web et Multimédia" ) {
        this.isInitial()
        return "WEBD"
      } else if (formation === "3ème année Webdesign") {
        this.isAlternance();
        return "BWED"
      } else if (formation === "3ème année Webmarketing & Social Media") {
        this.isAlternance();
        return "BWSM"
      } else if (formation === "3ème année Développeur web") {
        this.isAlternance();
        return "BDEW"
      } else if (formation === "3ème année E-Business" ) {
        this.isAlternance();
        return "BEBU"
      } else if (formation === "4ème année Marketing Digital" || formation === "5ème année Marketing Digital" ) {
        this.isAlternance();
        return "EWEB"
      } else if (formation === "4ème année Développeur Full Stack" || formation === "5ème année Développeur Full Stack") {
        this.isAlternance();
        return "AWEB"
      } else if (formation === "4ème année UX/UI Design" || formation === "5ème année UX/UI Design" ) {
        this.isAlternance();
        return "UIUX"
      } else if (formation === "4ème année Data Marketing" || formation === "5ème année Data Marketing" ) {
        this.isAlternance();
        return "DATA"
      } else if (formation === "4ème année Management de l’innovation digitale" || formation === "5ème année Management de l’innovation digitale") {
        this.isAlternance();
        return "MID-"
      } else {
        return ""
      }
    },
    isAlternance(){
      this.is_alternance = 1
      this.is_initial = 0
    },
    isInitial(){
      this.is_alternance = 0
      this.is_initial = 1
    },
    formatEtude(etude) {
      if ( etude === "Collège") {
        return ""
      } else if (etude === "Seconde") {
        return "OCT 24"
      } else if (etude === "Première") {
        return "OCT 23"
      } else if (etude === "Terminale" || etude === "BAC+1" || etude === "BAC+2" || etude === "BAC+3" || etude === "BAC+4" || etude === "BAC+5" ) {
        return "OCT 22"
      } else {
        return ""
      }
    }
  },
};
</script>

<style>
.input input::placeholder {
  color: #b8bcca !important;
  opacity: 1;
}
</style>
