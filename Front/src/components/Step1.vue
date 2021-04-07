<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-select
            v-model="civilite"
            label="Civilité"
            :items="items"
            required
          ></v-select>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="firstname"
            :rules="firstNameRules"
            label="Prénom"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="lastname"
            :rules="lastNameRules"
            label="Nom"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="mobilephone"
            :rules="mobilePhoneRules"
            label="Téléphone Mobile"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="phone"
            :rules="phoneRules"
            :counter="10"
            label="Téléphone fixe"
            required
          ></v-text-field>
        </v-col>

      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "Step1",
  data: () => ({
    valid: false,
    firstname: "",
    firstNameRules: [
      (v) => !!v || "Le prénom est obligatoire",
    ],
    lastname: "",
    lastNameRules: [
      (v) => !!v || "Le nom est obligatoire",
    ],

    email: "",
    emailRules: [
      (v) => !!v || "L'e-mail est obligatoire",
      (v) => /.+@.+/.test(v) || "L'e-mail doit être valide",
    ],
    select: null,
    items: ["Madame", "Monsieur", "Non Binaire"],
    mobilephone: "",
    mobilePhoneRules: [
      (v) => !!v || "Le téléphone mobile est obligatoire",
      (v) =>
        /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/gm.test(v) ||
        "Le téléphone mobile doit être valide",
      (v) => v.length >= 10 || "Le téléphone fixe doit faire 10 chiffres",
    ],
    phone: "",
    phoneRules: [
      (v) => v.length <= 10 || "Le téléphone fixe doit faire 10 chiffres",
    ],
  }),
};
</script>
