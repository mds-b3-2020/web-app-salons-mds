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

  </v-main>
</v-app>
    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import Stepper from './components/Stepper';
import axios from 'axios'

export default {
  name: 'App',

  components: {
    HelloWorld,
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
