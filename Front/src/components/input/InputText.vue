<template>
    <v-text-field
        :rules='rules'
        :label='label'
        :placeholder='placeholder'
        v-bind:value="value"
        v-on:change="$emit('input', $event.target.value)"
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
    model: {
        prop: 'value',
        event: 'change'
    },
}
</script>
