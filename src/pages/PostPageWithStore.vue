<template>
    <div>
        <!-- <div>
            {{ $store.state.isAuth ? 
                'User is authorized' : 
                'Log in to use the service' 
            }}
        </div>
        <div>{{ $store.getters.doubleLikes }}</div>
        <div>
            <post-button 
                @click="$store.commit('incrementLikes')"
            >
                Like
            </post-button>
            <post-button 
                @click="$store.commit('decrementLikes')"
            >
                Dislike
            </post-button>
        </div> -->


        <h1>Store Page</h1>
        <post-input
            :model-value="searchQuery"
            @update:model-value="setSearchQuery"
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
                :model-value="selectedSort"
                @update:model-value="setSelectedSort" 
                :options="sortOptions"
            />
        </div>
        <post-modal v-model:show="modalVisible">
            <post-form @create="createPost" />
        </post-modal>
        <div class="post-wrapper">
            <post-list 
                :posts="sortedAndSearchedPosts" 
                @remove="removePost"
                class="posts"
                v-if="!isPostsLoading"
            />
            <div v-else>Loading...</div>
        </div>
        <div v-intersection="loadMorePosts" class="observer"></div>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
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
                modalVisible: false
            }
        },
        methods: {
            ...mapMutations({
                setPage: 'post/setPage',
                setSearchQuery: 'post/setSearchQuery',
                setSelectedSort: 'post/setSelectedSort'
            }),
            ...mapActions({
                loadMorePosts: 'post/loadMorePosts',
                fetchPosts: 'post/fetchPosts'
            }),
            createPost(post) {
                this.posts.push(post)
                this.modalVisible = false

            },
            removePost(post) {
                this.posts = this.posts.filter(p => p.id !== post.id)
            },
            showModal() {
                this.modalVisible = true
            },
        },
        mounted() {
            this.fetchPosts()
        },
        computed: {
            ...mapState({
                posts: state => state.post.posts,
                isPostsLoading: state => state.post.isPostsLoading,
                page: state => state.post.page,
                limit: state => state.post.limit,
                totalPages: state => state.post.totalPages,
                searchQuery: state => state.post.searchQuery,
                selectedSort: state => state.post.selectedSort,
                sortOptions: state => state.post.sortOptions
            }),
            ...mapGetters({
                sortedPosts: '/post/sortedPosts',
                sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
            })
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