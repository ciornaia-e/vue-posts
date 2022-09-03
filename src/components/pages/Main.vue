<template>
    <div class="main">
        <h1>Hello! This is Post App</h1>
        <router-link class="main__link" to="/posts">Posts</router-link>
        <router-link class="main__link" to="/about">About</router-link>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .main__link {
        margin: 0 5px;
    }
</style>