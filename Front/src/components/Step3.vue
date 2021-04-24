<template>
  <v-form v-model="valid">
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="6">
          1
          <label> Je souhaite : </label>

          <v-row>
            <v-checkbox
              v-model="formData.souhait"
              label="Être invité(e) aux prochaines journées portes ouvertes"
              value="Invité"
            >
            </v-checkbox>
          </v-row>

          <v-row>
            <v-checkbox
              v-model="formData.souhait"
              label="Recevoir une brochure"
              value="Brochure"
            ></v-checkbox>
          </v-row>

          <v-row>
            <v-checkbox
              v-model="formData.souhait"
              label="Être rappelé(e) pour obtenir plus d’information"
              value="Rappelé"
            ></v-checkbox>
          </v-row>

          <v-row>
            <v-checkbox
              v-model="formData.souhait"
              label="Programmer un entretien d’admission"
              value="Entretien"
            ></v-checkbox>
          </v-row>

          <v-row>
            <v-checkbox
              v-model="formData.souhait"
              label="Participer à une journée d’immersion"
              value="Immersion"
            ></v-checkbox>
          </v-row>

          <v-row>
            <v-checkbox
              v-model="formData.souhait"
              label="Aucun de ces choix"
              value="Aucun"
            ></v-checkbox>
          </v-row>

          <v-col cols="12" md="4">
            <v-row align="center">
              <v-text-field v-model="formData.other" label="Autre">
              </v-text-field>
            </v-row>
          </v-col>
        </v-col>
        <v-col cols="6" sm="3">
          2
          <label> Mes créneaux de disponibilités à privilégier: </label>
          <v-row cols="6">
            <v-checkbox v-model="formData.creneaux" label="Lundi" value="Lundi">
            </v-checkbox>
          </v-row>

          <v-row>
            <v-checkbox v-model="formData.creneaux" label="Mardi" value="Mardi">
            </v-checkbox>
          </v-row>

          <v-row>
            <v-checkbox
              v-model="formData.creneaux"
              label="Mercredi"
              value="Mercredi"
            >
            </v-checkbox>
          </v-row>

          <v-row>
            <v-checkbox v-model="formData.creneaux" label="Jeudi" value="Jeudi">
            </v-checkbox>
          </v-row>

          <v-row>
            <v-checkbox
              v-model="formData.creneaux"
              label="Vendredi"
              value="Vendredi"
            >
            </v-checkbox>
          </v-row>
        </v-col>
        <v-col cols="6" sm="3" class="mt-12">
          <v-row cols="6">
            <v-checkbox
              v-model="formData.horaires"
              label="9h-12h"
              value="9h-12h"
            >
            </v-checkbox>
          </v-row>

          <v-row>
            <v-checkbox
              v-model="formData.horaires"
              label="12h-14h"
              value="12h-14h"
            >
            </v-checkbox>
          </v-row>

          <v-row>
            <v-checkbox
              v-model="formData.horaires"
              label="14h-17h"
              value="14h-17h"
            >
            </v-checkbox>
          </v-row>

          <v-row>
            <v-checkbox
              v-model="formData.horaires"
              label="après-17h"
              value="après-17h"
            >
            </v-checkbox>
          </v-row>

        </v-col>
          <v-row> </v-row>
        
      </v-row>
    </v-container>

    <v-container>
      <v-col cols="12" md="6">
        <label>
          Quelle note donneriez-vous à votre échange avec votre interlocuteur
          MyDigitalSchool Lyon ?
        </label>
        <v-text-field
          type="number"
          class="input"
          v-model="formData.note"
          placeholder="/10"
          min="0"
          max="10"
        ></v-text-field>
      </v-col>
    </v-container>
  </v-form>
</template>

<script>
//import InputText from "../components/input/InputText";

export default {
  name: "Step3",
  components: {},
  data() {
    return {
      valid: false,
      formData: {
        creneaux: [],
        horaires: [],
        note: "",
        souhait: [],
        other: "",
      },
    };
  },
  watch: {
    formData: {
      handler: function () {
        this.$emit("newdata", [
          this.formData.creneaux,
          this.formData.horaires,
          this.formData.note,
          this.formData.souhait,
          this.formData.other,
        ]);
      },
      deep: true,
    },
  },
};
</script>