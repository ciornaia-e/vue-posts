<template>
    <div class="app">
        <nav-bar></nav-bar>
        <router-view></router-view>
    </div>
</template>

<script>
    import NavBar from '@/components/NavBar'

    export default {
    components: { NavBar }
}
</script>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .app {
        margin: 15px;
    }
</style>