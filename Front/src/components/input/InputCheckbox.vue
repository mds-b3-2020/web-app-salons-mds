<template>
    <v-container fluid>
      <v-checkbox v-model="value" label="souhait"></v-checkbox>
      <v-checkbox v-model="value" label="souhait"></v-checkbox>
      <v-checkbox v-model="value" label="souhait"></v-checkbox>
      <v-checkbox v-model="value" label="souhait"></v-checkbox>
      <v-checkbox v-model="value" label="souhait"></v-checkbox>
      <v-checkbox v-model="value" label="souhait"></v-checkbox>
      <v-checkbox v-model="value" label="souhait"></v-checkbox>
    </v-container>
</template>

<script>
export default{
    name: 'InputSelect',
    props:{
        label: String,
        items: Array
    },
    data(){
        return{
            value:''
        }
    }
}
</script>