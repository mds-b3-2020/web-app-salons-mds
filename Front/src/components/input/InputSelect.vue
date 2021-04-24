<template>
    <v-select
        v-model="value"
        :label="label"
        :items="items"
        required
    ></v-select>
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