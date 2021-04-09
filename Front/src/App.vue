<template>

  <v-app>
    <v-app>
<Stepper/>
  <v-main>

  </v-main>
</v-app>
    <v-main>
  
    </v-main>
  </v-app>
</template>

<script>

import Stepper from './components/Stepper';
import axios from 'axios'

export default {
  name: 'App',

  components: {
    Stepper
  },

  data: () => ({
    
    mounted (){
  axios
   .get('http://localhost:8010')
      .then(response => (this.info = response))
    }
    //
  }),
};
</script>
<style>
</style>
