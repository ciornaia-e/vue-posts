<template>
    <div class="post">
        <div>
            <div>{{ post.id }}</div>
            <p><strong>Название:</strong> {{ post.title }}</p>
            <p><strong>Описание:</strong> {{ post.body }}</p>
        </div>
        <div class="post__btns">
            <post-button
                @click="$emit('remove', post)"
            >
                Удалить
            </post-button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            post: {
                type: Object,
                required: true
            }
        }
    }

</script>

<style scoped>
    .post {
        padding: 15px;
        border: 2px solid teal;
        margin: 15px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>