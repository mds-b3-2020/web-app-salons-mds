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
        <h2>
          Formulaire - MyDigitalSchool
        </h2>
        <div>
          
        </div>
      </div>
      <v-stepper v-model="e1" class="stepper">
        <v-stepper-header class="stepper">
          <v-stepper-step :complete="e1 > 1" step="1">
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 2" step="2">
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1> 3" step="3">
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 4" step="4">
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <Step1 />
            <div class="container-btn">
              <v-btn class="btn" elevation="2" large @click="e1 = 2">
                Suivant
              </v-btn>
              <div></div>
              </div>
          </v-stepper-content>
          <v-stepper-content step="2">
            <Step2 />
            <div class="container-btn">
              <v-btn class="btn" elevation="2" large @click="e1 = 3">
                Suivant
              </v-btn>
              <v-btn text @click="e1 = 1" class="btn-back" >
                Retour
              </v-btn>
            </div>
          </v-stepper-content>
          <v-stepper-content step="3">
            <Step3 />
            <div class="container-btn">
            <v-btn class="btn" elevation="2" large @click="e1 = 4; show = !show">
              Envoyer
            </v-btn>
            <v-btn text @click="e1 = 2" class="btn-back">
              Retour
            </v-btn>
            </div>
          </v-stepper-content>
          <v-stepper-content step="4">
            <Step4 />
            <v-btn text @click="e1 = 1" class="btn-back">
              Retour a la première page
            </v-btn>
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
import Step4 from './Step4';
export default {
  name: "Stepper",
  components: {
    Step1,
    Step2,
    Step3,
    Step4
  },
  data() {
    return {
      e1: 1,
      show:true,
    };
  } 
};

</script>
<style>
.container {
  background-color: #F6FBF9;
  border-radius: 32px;
  width:100%;
  max-width: 70rem;
  padding: 1rem;
  height: auto !important;
  font-family: 'Karla', sans-serif;
}
.container-header {
  background-color: #F6FBF9;
  display:flex;
  justify-content:space-around;
  font-family: 'Karla', sans-serif;
  font-weight: 800;
}
.stepper {
  background-color: #F6FBF9 !important;
  box-shadow:none !important;
  border:0 none !important;
  outline:0 !important;
}
.bg {
  background-image: url("../assets/bg.jpg");
  background-repeat:no-repeat;
  background-size:cover;
}
.btn {
  background-color: #62D5DD !important;
  border-radius:10px;
  transition-duration: 0.4s;
  color: #FFFFFF !important;
  margin-top: 2em;
  margin-bottom: 2em;

}
.container-btn {
  display: flex !important;
  flex-direction: row-reverse !important;
  justify-content: space-between !important;

}
.btn-back {
  background-color: #9D9D9D !important;
  border-radius:10px;
  transition-duration: 0.4s;
  color: #FFFFFF !important;
  height: 45px !important;
  min-width: 78px !important;
  margin-top: 2em;
  margin-bottom: 2em;

}
.v-stepper__step__step {
  width:50px !important;
  height:50px !important
}
.v-application .primary {
    background-color: #62D5DD !important;
    border-color: #62D5DD !important;
}
.v-application--wrap {
  min-height: initial !important;
}
.space {
  height: 5em;
}
</style>