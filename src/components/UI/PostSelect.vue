<template>
    <select 
        v-model="modelValue" 
        @change="changeOption"
        class="select"
    >
        <option disabled value="">Select from list</option>
        <option 
            v-for="option in options"
            :key="option.value"
            :value="option.value"
        >
            {{ option.name }}
        </option>
    </select>
</template>

<script>
    export default {
        name: 'post-select',
        props: {
            modelValue: {
                type: String
            },
            options: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            changeOption(event) {
                this.$emit('update:modelValue', event.target.value)
            }
        }
    }
</script>

<style scoped>
    .select {
        border-color: teal;
        color: teal;
    }
</style>