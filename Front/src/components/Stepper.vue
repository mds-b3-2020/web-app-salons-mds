<template>
  <div id="app">
    <v-app id="inspire">
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">
            Etape 1
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2">
            Etape 2
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">
            Name of step 3
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-btn color="accent" elevation="2" large @click="e1 = 2">
              Continue
            </v-btn>
            <v-btn text>
              Cancel
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-btn color="accent" elevation="2" large @click="e1 = 3">
              Continue
            </v-btn>

            <v-btn text>
              Cancel
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-btn color="accent" elevation="2" large @click="e1 = 1">
              Continue
            </v-btn>

            <v-btn text>
              Cancel
            </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-app>
  </div>
</template>

<script>
//import Step1 from './Step1';
//import Step2 from './Step2';
export default {
  name: "Stepper",
  data() {
    return {
      e1: 1
    };
  }
};
</script>
<style></style>
