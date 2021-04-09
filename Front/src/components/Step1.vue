<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <InputSelect label='Civilité' :items='items'></InputSelect>
        </v-col>

        <v-col cols="12" md="4">
          <InputText label='Prénom'></InputText>
        </v-col>

        <v-col cols="12" md="4">
          <InputText label='Nom'></InputText>
        </v-col>

        <v-col cols="12" md="4">
          <InputText label='Téléphone Mobile' :rules='mobilePhoneRules'></InputText>
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
            v-model="postal"
            :rules="postalRules"
            :counter="5"
            label="Code Postal"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="city"
            :rules="cityRules"
            label="Ville"
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
              max="2011-12-31"
              locale="fr-FR"
              v-model="birthdate"
              @change="save"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import InputText from '../components/input/InputText'
import InputSelect from '../components/input/InputSelect'

export default {
  name: "Step1",
  components: {
    InputText,
    InputSelect
  },
  data: vm => ({
    valid: false,
    firstname: "",
    firstNameRules: [(v) => !!v || "Le prénom est obligatoire"],
    lastname: "",
    lastNameRules: [(v) => !!v || "Le nom est obligatoire"],
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
        /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/gm.test(
          v
        ) || "Le téléphone mobile doit être valide",
    ],
    phone: "",
    phoneRules: [
      (v) => v.length <= 10 || "Le téléphone fixe doit faire 10 chiffres",
    ],
    postal: "",
    postalRules: [
      (v) => !!v || "Le code postal est obligatoire",
      (v) => v.length <= 5 || "Le code postal doit faire 5 chiffres",
    ],
    city: "",
    cityRules: [(v) => !!v || "La ville est obligatoire"],
    birthdate: null,
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu: false,
    birthDateRules: [(v) => !!v || "La date de naissance est obligatoire"],
  }),

  watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
        this.dateFormatted = this.formatDate(this.birthdate)
      },
    },

    computed: {
      computedDateFormatted () {
        return this.formatDate(this.birthdate)
      },
    },

    methods: {
      save (birthdate) {
        this.$refs.menu.save(birthdate)
      },

      formatDate (birthdate) {
        const [year, month, day] = birthdate.split('-')
        return `${day}/${month}/${year}`
      },

      parseDate (birthdate) {
        const [day, month, year] = birthdate.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
    },
};
</script>
