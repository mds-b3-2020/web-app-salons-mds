<template>
  <v-form v-model="valid">
    <v-container>
      <v-container fluid>
        <v-checkbox v-model="selected" label="John" value="John"></v-checkbox>
        <v-checkbox v-model="selected" label="Jacob" value="Jacob"></v-checkbox>
        <v-checkbox v-model="selected" label="John" value="John"></v-checkbox>
        <v-checkbox v-model="selected" label="Jacob" value="Jacob"></v-checkbox>
        <v-checkbox v-model="selected" label="John" value="John"></v-checkbox>
        <v-checkbox v-model="selected" label="Jacob" value="Jacob"></v-checkbox>
        <v-checkbox v-model="selected" label="John" value="John"></v-checkbox>
      </v-container>
    </v-container>
  </v-form>
</template>

<script>

export default {
  name: "Step3",
  data() {
    return {
      select: ["John"],
    };
  },
};
</script>
