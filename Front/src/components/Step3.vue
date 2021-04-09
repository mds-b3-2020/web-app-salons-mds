<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
    <v-col cols="12" md="4">
      <v-checkbox
        v-model="select"
        label="Être invité(e)aux prochaines journées portes ouvertes"
        value="Invité"
      ></v-checkbox>
    </v-col>
    <v-col cols="12" md="4">
      <v-checkbox
        v-model="select"
        label="Recevoir  une  brochure"
        value="Brochure"
      ></v-checkbox>
    </v-col>
    <v-col cols="12" md="4">
      <v-checkbox
        v-model="select"
        label="Etre rappelé pour obtenir plus d’information"
        value="Rappelé"
      ></v-checkbox>
    </v-col>
    <v-col cols="12" md="4">
      <v-checkbox
        v-model="select"
        label="Programmer un entretien d’admission"
        value="Entretien"
      ></v-checkbox>
    </v-col>
    <v-col cols="12" md="4">
      <v-checkbox
        v-model="select"
        label="Participer à une journée d’immersion"
        value="Immersion"
      ></v-checkbox>
    </v-col>
    <v-col cols="12" md="4">
      <v-checkbox
        v-model="select"
        label="Aucun de ces choix"
        value="Aucun"
      ></v-checkbox>
    </v-col>
    <v-col cols="12" md="4">
      <v-row align="center">
        <v-checkbox
          v-model="enabled"
          hide-details
          class="shrink mr-2 mt-0"
        ></v-checkbox>
        <v-text-field :disabled="!enabled" label="Autre"></v-text-field>
      </v-row>
    </v-col>
  </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "Step3",
  data() {
    return {
      valid: false,
      select: [],
      enabled: false,
    };
  },
};
</script>