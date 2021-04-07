bli<template>
    <v-container class="container">
        <div id="app">
            <v-app id="inspire">
              <v-form v-model="valid">
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      md="4"
                    >
          
                      <v-select class="input"
                        v-model="select"
                        label="Je suis actuellement en :"
                        :items="items"
                        required
                      ></v-select>

                    </v-col>
            
                    <v-col
                      cols="12"
                      md="4"
                    >
                      <v-text-field class="input"
                        v-model="study_city"
                        label="J'étuidie dans la ville de :"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      cols="12"
                      md="4"
                    >
                      <v-text-field class="input"
                        v-model="specialite"
                        label="Specialité"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                    >
                      <v-select class="input"
                        v-model="select_year"
                        label="Je recherche une formation pour la rentrée :"
                        :items_year="items_year"
                        required
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-app>
          </div>
    </v-container>

</template>

<script>
  //import { required } from 'vee-validate/dist/rules'
  //import { extend, setInteractionMode } from 'vee-validate'

  export default {
    components: {
    },
    data: () => ({
      select: 'Collège',
      items: [
        'Collège',
        'Seconde',
        'Première',
        'Terminale',
        'BAC+1 ',
        'BAC+2',
        'BAC+3',
        'BAC+4',
        'BAC+5',
      ],
      specialite:'Veuillez saisir votre spécialité',
      study_city:'Lyon',
      select_year:'2022',
      items_year:[
        '2022',
        '2023',
        '2024',
      ]
    }),

    methods: {
      submit () {
        this.$refs.observer.validate()
      },
      clear () {
        this.select = null
        this.$refs.observer.reset()
      },
    },
  }
</script>

<style>
.container {
 background-color: #F6FBF9;
},
.input input::placeholder {
  color: green !important;
  opacity: 1;
}
</style>