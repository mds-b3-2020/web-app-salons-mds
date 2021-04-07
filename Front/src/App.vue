<template>
  <v-app>
    <v-app>
      <v-img
  max-height="150"
  max-width="250"
  src="./assets/mydigitalschool.jpg"
></v-img>
  
<Stepper/>
  <v-main>
    <Step1/>
    <Step2/>
  </v-main>
</v-app>
    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Stepper from './components/Stepper';
import axios from 'axios'

export default {
  name: 'App',

  components: {
    HelloWorld,
    Step1,
    Step2,
    Stepper
  },

  data: () => ({
    
    mounted (){
  axios
    }
    //
  }),
};
</script>
