<template>
  <div class="bg">
    <div class="space"></div>
    <div id="app" class="container">
      <v-app id="inspire">
        <div class="container-header">
          <v-img
            max-height="150"
            max-width="100"
            src="../assets/mydigitalschool.png"
          ></v-img>
          <h2>Formulaire - MyDigitalSchool</h2>
          <div></div>
        </div>
        <v-stepper v-model="e1" class="stepper">
          <v-stepper-header class="stepper">
            <v-stepper-step :complete="e1 > 1" step="1"> </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 2" step="2"> </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 3" step="3"> </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 4" step="4"> </v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <Step1 @newdata="handleDataStep1($event)" />
              <v-btn class="btn" elevation="2" large @click="e1 = 2">
                Suivant
              </v-btn>
            </v-stepper-content>
            <v-stepper-content step="2">
              <Step2 @newdata="handleDataStep2($event)" />
              <div class="container-btn">
                <v-btn class="btn" elevation="2" large @click="e1 = 3">
                  Suivant
                </v-btn>
                <v-btn text @click="e1 = 1" class="btn-back"> Retour </v-btn>
              </div>
            </v-stepper-content>
            <v-stepper-content step="3">
              <Step3 @newdata="handleDataStep3($event)" />
              <div class="container-btn">
                <v-btn
                  class="btn"
                  elevation="2"
                  large
                  @click="
                    e1 = 4;
                    show = !show;
                    handleSubmit();
                  "
                >
                  Envoyer
                </v-btn>
                <v-btn text @click="e1 = 2" class="btn-back"> Retour </v-btn>
              </div>
            </v-stepper-content>
            <v-stepper-content step="4">
              <p v-if="errmessage" id="errmsg">
                {{ errmessage }}. Veuillez corriger le(s) champ(s)
              </p>
              <Step4 v-if="!errmessage" />
              <v-btn text @click="e1 = 3" class="btn-back"> Retour </v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-app>
    </div>
    <div class="space"></div>
    <div class="space"></div>
  </div>
</template>
<script>
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import axios from "axios";

export default {
  name: "Stepper",
  components: {
    Step1,
    Step2,
    Step3,
    Step4,
  },
  data() {
    return {
      e1: 1,
      show: true,
      student: {
        firstname: "",
        lastname: "",
        email: "",
        mobilephone: "",
        civilite: "",
        phone: "",
        postal: "",
        city: "",
        birthdate: "",
        code_session_rentree: "",
        study_city: "",
        specialite: "",
        sessions: "",
        codeFormation: "",
        is_initial: 0,
        is_alternance: 0,
        note: "",
        creneaux: "",
        souhait: "",
        other: "",
        horaires: "",
      },
      errmessage: "",
    };
  },
  watch: {},
  methods: {
    handleDataStep1: function (e) {
      [
        this.student.firstname,
        this.student.lastname,
        this.student.email,
        this.student.mobilephone,
        this.student.civilite,
        this.student.phone,
        this.student.postal,
        this.student.city,
        this.student.birthdate,
      ] = e;
    },
    handleDataStep2: function (e) {
      [
        this.student.code_session_rentree,
        this.student.study_city,
        this.student.specialite,
        this.student.sessions,
        this.student.codeFormation,
        this.student.is_initial,
        this.student.is_alternance,
      ] = e;
    },
    handleDataStep3: function (e) {
      [
        this.student.creneaux,
        this.student.horaires,
        this.student.note,
        this.student.souhait,
        this.student.other,
      ] = e;
    },
    async handleSubmit() {
      const data = {
        nom: this.student.lastname,
        prenom: this.student.firstname,
        naissance: this.student.birthdate,
        civilite: this.student.civilite,
        tel: this.student.mobilephone,
        fixe: this.student.phone,
        email: this.student.email,
        cp: this.student.postal,
        ville: this.student.city,
        niveau_actuel: this.student.code_session_rentree,
        code_annee: this.student.sessions,
        souhait_contact: this.student.souhait,
        souhait_autre: this.student.other,
        //formation_souhaitee: this.student.form,
        is_initial: this.student.is_initial,
        is_alternance: this.student.is_alternance,
        lieu_reunion_information: "LYN",
        code_formation: this.student.codeFormation,
        creneau_journalier: this.student.creneaux,
        creneau_horaire: this.student.horaires,
        //canal_acquisition: this.student.,
        note_echange: this.student.note,
        etudiant_spe: this.student.specialite,
        ville_etude: this.student.study_city,
      };
      const response = await axios.post("/response", data);

      if (response.data.errmessage) {
        this.errmessage = response.data.errmessage;
      } else {
        window.location.reload();
      }
    },
  },
};
</script>
<style>
.container {
  background-color: #f6fbf9;
  border-radius: 32px;
  width: 100%;
  max-width: 70rem;
  padding: 1rem;
  height: auto !important;
  font-family: "Karla", sans-serif;
}
.container-header {
  background-color: #f6fbf9;
  display: flex;
  justify-content: space-around;
  font-family: "Karla", sans-serif;
  font-weight: 800;
}
.stepper {
  background-color: #f6fbf9 !important;
  box-shadow: none !important;
  border: 0 none !important;
  outline: 0 !important;
}
.bg {
  background-image: url("../assets/bg.jpg");
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
}
.btn {
  background-color: #62d5dd !important;
  border-radius: 10px;
  transition-duration: 0.4s;
  color: #ffffff !important;
  margin-top: 2em;
  margin-bottom: 2em;
}
.container-btn {
  display: flex !important;
  flex-direction: row-reverse !important;
  justify-content: space-between !important;
}
.btn-back {
  background-color: #9d9d9d !important;
  border-radius: 10px;
  transition-duration: 0.4s;
  color: #ffffff !important;
  height: 45px !important;
  min-width: 78px !important;
  margin-top: 2em;
  margin-bottom: 2em;
}
.v-stepper__step__step {
  width: 50px !important;
  height: 50px !important;
}
.v-application .primary {
  background-color: #62d5dd !important;
  border-color: #62d5dd !important;
}
.v-application--wrap {
  min-height: initial !important;
}
.space {
  height: 5em;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
#errmsg {
  color: rgb(252, 85, 85);
  font-weight: bold;
}
</style>
