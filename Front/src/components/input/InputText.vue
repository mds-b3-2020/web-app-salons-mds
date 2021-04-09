<template>
    <v-text-field
        v-model='value'
        :rules='rules'
        :label='label'
        required
    ></v-text-field>
</template>

<script>
export default{
    name: 'InputText',
    props:{
        label: String,
        rules: Array
    },
    data(){
        return{
            value:''
        }
    }
}
</script>
