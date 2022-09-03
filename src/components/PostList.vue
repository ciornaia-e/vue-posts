<template>
    <div v-if="posts.length > 0">
        <h2>Список постов</h2>
        <transition-group name="post-list">
            <post-item 
                v-for="post in posts"
                :post="post" 
                :key="post.id"
                @remove="$emit('remove', post)"
            />
        </transition-group>
    </div>
    <h2 v-else>Список пользователей пуст</h2>
</template>

<script>
    import PostItem from '@/components/PostItem'

    export default {
        components: {
            PostItem
        },
        props: {
            posts: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style scoped>
    .post-list-move,
    .post-list-enter-active,
    .post-list-leave-active {
        transition: all 0.4s ease;
    }

    .post-list-enter-from,
    .post-list-leave-to {
        opacity: 0;
        transform: translateX(130px);
    }

    .post-list-leave-active {
        position: absolute;
    }
</style>