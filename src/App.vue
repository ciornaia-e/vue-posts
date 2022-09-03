<template>
    <div class="app">
        <nav-bar></nav-bar>
        <div class="wrapper">
            <router-view></router-view>
        </div>
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

    .wrapper {
        margin: 15px;
    }
</style>