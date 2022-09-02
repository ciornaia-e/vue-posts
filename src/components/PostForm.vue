<template>
    <form class="form" @submit.prevent>
        <h2>Описание поста</h2>
        <post-input 
            v-model="post.title"
            type="text" 
            placeholder="Название" 
        />
        <post-input 
            v-model="post.body"
            type="text" 
            placeholder="Описание" 
        />
        <post-button 
            class="btn-create"
            @click="createPost"
        >
            Создать
        </post-button>
    </form>
</template>

<script>
    export default {
        data() {
            return {
                post: {
                    title: '',
                    body: ''
                }
            }
        },
        methods: {
            createPost() {
                this.post.id = Date.now()
                this.$emit('create', this.post)
                this.post = {
                    title: '',
                    body: ''
                }
            }
        }
    }
</script>

<style scoped>
    h2 {
        margin-bottom: 15px;
    }
    .form {
        display: flex;
        flex-direction: column;
    }

    .btn-create {
        align-self: flex-end;
        margin: 15px 0;
    }
</style>