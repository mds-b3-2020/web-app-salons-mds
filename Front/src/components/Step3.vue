<template>
  <v-form v-model="valid">
    <v-container>
        <v-row no-gutters>
          <v-col
            cols="12"
            sm="6"
          >       
          1
      <label>
      Je souhaite :
      </label>

        <v-row>
          <v-checkbox
            v-model="souhait"
            label="Être invité(e) aux prochaines journées portes ouvertes"
          value="Invité">
          </v-checkbox>
        </v-row>

        <v-row>
          <v-checkbox
            v-model="souhait"
            label="Recevoir une brochure"
            value="Brochure"
          ></v-checkbox>
        </v-row>

        <v-row>
          <v-checkbox
            v-model="souhait"
            label="Être rappelée pour obtenir plus d’information"
            value="Rappelé"
          ></v-checkbox>
        </v-row>

        <v-row>
          <v-checkbox
            v-model="souhait"
            label="Programmer un entretien d’admission"
            value="Entretien"
          ></v-checkbox>       
        </v-row>
        
        <v-row>
          <v-checkbox
        v-model="souhait"
        label="Participer à une journée d’immersion"
        value="Immersion"
      ></v-checkbox>
        </v-row>

        <v-row>
          <v-checkbox
        v-model="souhait"
        label="Aucun de ces choix"
        value="Aucun"
      ></v-checkbox>
        </v-row>

        <v-col cols="12" md="4">
      <v-row align="center">
        <v-text-field v-model="other" label="Autre"></v-text-field>
      </v-row>
    </v-col>

          </v-col>
          <v-col
            cols="12"
            sm="6"
          >       
          2
          <label>
            Mes créneaux de disponibilités à privilégier:
          </label>
          <v-row>
            <v-checkbox
            v-model="creneaux"
            label="Lundi"
            value="Lundi">
            </v-checkbox>
          </v-row>

          <v-row>
            <v-checkbox
            v-model="creneaux"
            label="Mardi"
            value="Mardi">
            </v-checkbox>
          </v-row>

          <v-row>
            <v-checkbox
            v-model="creneaux"
            label="Mercredi"
            value="Mercredi">
            </v-checkbox>
          </v-row>

          <v-row>
            <v-checkbox
            v-model="creneaux"
            label="Jeudi"
            value="Jeudi">
            </v-checkbox>
          </v-row>

          <v-row>
            <v-checkbox
            v-model="creneaux"
            label="Vendredi"
            value="Vendredi">
            </v-checkbox>
          </v-row>

      <v-row>
    

            </v-row>
          </v-col>
        </v-row>
    </v-container>


          <v-container>
          <v-col cols="12" md="4">
        <InputText
            v-model="note"
            :rules="noteRule"
            label="Quelle note donneriez-vousà votre échange avec votre interlocuteur MyDigitalSchool Lyon?"
            placeholder="/10"
          ></InputText>
        </v-col>
          </v-container>
  </v-form>
</template>

<script>
export default {
  name: "Step3",
  data() {
    return {
      valid: false,
      souhait: [],
      other: '',
      creneaux: [],
      note: [],
    };
  },
};
</script>