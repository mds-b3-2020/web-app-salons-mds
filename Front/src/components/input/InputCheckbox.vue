<template>
    <v-container fluid>
      <v-checkbox v-model="value" :label="label"></v-checkbox>
      <v-checkbox v-model="value" :label="label"></v-checkbox>
      <v-checkbox v-model="value" :label="label"></v-checkbox>
      <v-checkbox v-model="value" :label="label"></v-checkbox>
      <v-checkbox v-model="value" :label="label"></v-checkbox>
      <v-checkbox v-model="value" :label="label"></v-checkbox>
      <v-checkbox v-model="value" :label="label"></v-checkbox>
    </v-container>
</template>

<script>
export default{
    name: 'InputText',
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