<template>
    <v-text-field
        v-model='value'
        :rules='rules'
        :label='label'
        :placeholder='placeholder'
        required
    ></v-text-field>
</template>

<script>
export default{
    name: 'InputText',
    props:{
        label: String,
        rules: Array,
        placeholder: String,
    },
    data(){
        return{
            value:''
        }
    }
}
</script>
