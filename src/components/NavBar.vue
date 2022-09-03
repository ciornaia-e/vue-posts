<template>
    <div class="navbar">
        <h1 @click="$router.push('/')">Post Logo</h1>
        <div class="navbar__btns">
            <post-button 
                @click="$router.push('/posts')"
                class="btn-nav"
            >
                Посты
            </post-button>
            <post-button 
                @click="$router.push('/about')"
                class="btn-nav"
            >
                О сайте
            </post-button>
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>

<style scoped>
    .navbar {
        height: 50px;
        background-color: gray;
        box-shadow: 2px 2px 4px gray;
        display: flex;
        align-items: center;
        padding: 0 15px;
    }

    h1 {
        margin: 0;
    }

    .navbar__btns {
        margin-left: auto;
    }

    .btn-nav {
        margin: 0 5px;
    }
</style>