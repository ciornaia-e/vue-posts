<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'post-button'
    }
</script>

<style scoped>
    .btn {
        padding: 10px 15px;
        background: transparent;
        border: 1px solid teal;
        color: teal;
    }
</style>