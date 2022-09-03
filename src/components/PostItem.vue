<template>
    <div class="post">
        <div class="post__container">
            <!-- <div>{{ post.id }} likes: {{ $store.state.likes }}</div> -->
            <p><strong>Title:</strong> {{ post.title }}</p>
            <p><strong>Description:</strong> {{ post.body }}</p>
        </div>
        <div class="post__btns">
            <post-button
                @click="$router.push(`/posts/${post.id}`)"
            >
                Open
            </post-button>
            <post-button
                @click="$emit('remove', post)"
            >
                Remove
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

    .post__container {
        margin-right: 30px;
    }

    .post__btns {
        display: flex;
        column-gap: 10px;
    }
</style>