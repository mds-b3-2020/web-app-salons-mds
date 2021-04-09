<template>
    <v-select
        v-model="value"
        label="Civilité"
        :items="items"
        required
    ></v-select>
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