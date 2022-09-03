<template>
    <div>
        <!-- <div>{{ likes }}</div>
        <button @click="addLike">Add like</button> -->
        <h1>Post Page</h1>
        <post-input
            v-model="searchQuery"
            placeholder="Search..."
            v-focus 
        />
        <div class="app__btns">
            <post-button 
                @click="showModal"
            >
                Create post
            </post-button>
            <post-select 
                v-model="selectedSort" 
                :options="sortOptions"
            />
        </div>
        <post-modal v-model:show="modalVisible">
            <post-form />
        </post-modal>
        <div class="post-wrapper">
            <post-list 
                :posts="sortedAndSearchedPosts"
                class="posts"
                v-if="!isPostsLoading"
            />
            <div v-else>Loading...</div>
        </div>
    </div>
</template>

<script>
    import { usePosts } from '@/hooks/usePosts'
    import useSortedPosts from '@/hooks/useSortedPosts'
    import useSortedAndSearchedPosts from '@/hooks/useSortedAndSearchedPosts'
    import PostModal from '@/components/UI/PostModal.vue'
    import PostButton from '@/components/UI/PostButton.vue'
    import PostForm from '@/components/PostForm'
    import PostList from '@/components/PostList'
    import PostSelect from '@/components/UI/PostSelect'
    import PostInput from '@/components/UI/PostInput'

    export default {
        components: {
            PostForm,
            PostList,
            PostModal,
            PostButton,
            PostSelect,
            PostInput
        },
        data() {
            return {
                modalVisible: false,
                sortOptions: [
                    {value: 'title', name: 'By title'},
                    {value: 'body', name: 'By description'},
                ]
            }
        },
        setup(props) {
            const {posts, totalPages, isPostsLoading} = usePosts(10)
            const {sortedPosts, selectedSort} = useSortedPosts(posts)
            const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)

            // const likes = ref(0)
            // console.log(likes)

            // const addLike = () => {
            //     likes.value += 1
            // }

            return {
                posts, 
                totalPages,
                isPostsLoading,
                sortedPosts,
                selectedSort,
                searchQuery,
                sortedAndSearchedPosts
                // likes,
                // addLike
            }
        },
        methods: {
            showModal() {
                this.modalVisible = true
            }
        }
    }
</script>

<style>
    h1 {
        margin-bottom: 30px;
    }

    .app__btns {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .post-wrapper {
        margin-bottom: 15px;
    }

    .page-wrapper {
        display: flex;
        margin: 0 -10px;
    }

    .page {
        border: 1px solid black;
        padding: 10px;
        margin: 0 10px;
    }

    .page.current-page {
        border: 2px solid teal;
    }

    .observer {
        height: 30px;
        background: green;
    }
</style>