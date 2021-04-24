<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-select
            v-model="formData.civilite"
            label="Civilité"
            :items="items"
            required
          >
          </v-select>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="formData.firstname"
            :rules="firstNameRules"
            label="Prénom *"
            placeholder="Léa"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="formData.lastname"
            :rules="lastNameRules"
            label="Nom *"
            placeholder="Dupont"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="formData.mobilephone"
            :rules="lastNameRules"
            label="Téléphone Mobile *"
            placeholder="0601020304"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="formData.phone"
            :rules="phoneRules"
            label="Téléphone fixe"
            placeholder="0401020304"
            :counter="10"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="formData.email"
            :rules="emailRules"
            label="E-mail *"
            placeholder="lea.dupont@gmail.com"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="formData.postal"
            :rules="postalRules"
            label="Code Postal *"
            placeholder="69001"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="formData.city"
            :rules="cityRules"
            label="Ville *"
            placeholder="Lyon"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateFormatted"
                label="Date de naissance"
                prepend-icon="mdi-calendar"
                readonly
                required
                :rules="birthDateRules"
                v-bind="attrs"
                v-on="on"
                @blur="date = parseDate(dateFormatted)"
              ></v-text-field>
            </template>
            <v-date-picker
              ref="picker"
              max="2009-12-31"
              locale="fr-FR"
              v-model="formData.birthdate"
              @change="save"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
//import InputText from "../components/input/InputText";
//import InputSelect from "../components/input/InputSelect";

export default {
  name: "Step1",
  components: {},
  data: (vm) => ({
    valid: false,
    formData: {
      civilite: "",
      firstname: "",
      lastname: "",
      email: "",
      mobilephone: "",
      phone: "",
      postal: "",
      city: "",
      birthdate: null,
    },
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    firstNameRules: [(v) => !!v || "Le prénom est obligatoire"],
    items: ["Madame", "Monsieur", "Non Binaire"],
    lastNameRules: [(v) => !!v || "Le nom est obligatoire"],

    emailRules: [
      (v) => !!v || "L'e-mail est obligatoire",
      (v) => /.+@.+/.test(v) || "L'e-mail doit être valide",
    ],
    select: null,

    mobilePhoneRules: [
      (v) => !!v || "Le téléphone mobile est obligatoire",
      (v) =>
        /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/gm.test(
          v
        ) || "Le téléphone mobile doit être valide",
    ],

    phoneRules: [
      (v) => v.length <= 10 || "Le téléphone fixe doit faire 10 chiffres",
    ],

    postalRules: [
      (v) => !!v || "Le code postal est obligatoire",
      (v) => v.length <= 5 || "Le code postal doit faire 5 chiffres",
    ],

    cityRules: [(v) => !!v || "La ville est obligatoire"],

    menu: false,
    birthDateRules: [(v) => !!v || "La date de naissance est obligatoire"],
  }),

  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
      this.dateFormatted = this.formatDate(this.formData.birthdate);
    },
    formData: {
      handler: function () {
        this.$emit("newdata", [
          this.formData.firstname,
          this.formData.lastname,
          this.formData.email,
          this.formData.mobilephone,
          this.formData.civilite,
          this.formData.phone,
          this.formData.postal,
          this.formData.city,
          this.formData.birthdate,
        ]);
      },
      deep: true,
    },
  },

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.formData.birthdate);
    },
  },

  methods: {
    save(birthdate) {
      this.$refs.menu.save(birthdate);
    },

    formatDate(birthdate) {
      const [year, month, day] = birthdate.split("-");
      return `${day}/${month}/${year}`;
    },

    parseDate(birthdate) {
      const [day, month, year] = birthdate.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
};
</script>