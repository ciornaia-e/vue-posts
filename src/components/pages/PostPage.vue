<template>
    <div>
        <h1>Post Page</h1>
        <post-input
            v-model="searchQuery"
            placeholder="Search..." 
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
            <post-form @create="createPost" />
        </post-modal>
        <!-- <post-list 
            :posts="sortedPosts" 
            @remove="removePost"
            class="posts"
            v-if="!isPostsLoading"
        /> -->
        <div class="post-wrapper">
            <post-list 
                :posts="sortedAndSearchedPosts" 
                @remove="removePost"
                class="posts"
                v-if="!isPostsLoading"
            />
            <div v-else>Loading...</div>
        </div>
        <!-- <div class="page-wrapper">
            <div 
                v-for="pageNumber in totalPages" 
                :key="pageNumber"
                class="page"
                :class="{
                    'current-page': page === pageNumber
                }"
                @click="changePage(pageNumber)"
            >
                {{ pageNumber }}
            </div>
        </div> -->
        <div ref="observer" class="observer"></div>
    </div>
</template>

<script>
    import axios from 'axios'
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
                posts: [],
                modalVisible: false,
                isPostsLoading: false,
                page: 1,
                limit: 10,
                totalPages: 0,
                searchQuery: '',
                selectedSort: '',
                sortOptions: [
                    {value: 'title', name: 'By title'},
                    {value: 'body', name: 'By description'},
                ]
            }
        },
        methods: {
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
            // changePage(pageNumber) {
            //     this.page = pageNumber
            // },
            async fetchPost() {
                try {
                    this.isPostsLoading = true
                    setTimeout(async () => {
                        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                            params: {
                                _page: this.page,
                                _limit: this.limit
                            }
                        })
                        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                        this.posts = response.data
                        this.isPostsLoading = false
                    }, 1000)
                } catch(e) {
                    alert('Ошибка!')
                } finally {
                    // this.isPostsLoading = false
                }
            },
            async loadMorePost() {
                try {
                    this.page += 1
                    setTimeout(async () => {
                        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                            params: {
                                _page: this.page,
                                _limit: this.limit
                            }
                        })
                        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                        this.posts = [...this.posts, ...response.data]
                        this.isPostsLoading = false
                    }, 1000)
                } catch(e) {
                    alert('Ошибка!')
                }
            }
        },
        mounted() {
            this.fetchPost()
            console.log(this.$refs.observer)
            const options = {
                rootMargin: '0px',
                threshold: 1.0
            }
            const callback = (entries, observer) => {
                if(entries[0].isIntersecting && this.page < this.totalPages) {
                    this.loadMorePost()
                }
            }
            const observer = new IntersectionObserver(callback, options)
            observer.observe(this.$refs.observer)
        },
        computed: {
            sortedPosts() {
                return[...this.posts].sort((a, b) => a[this.selectedSort]?.localeCompare(b[this.selectedSort]))
            },
            sortedAndSearchedPosts() {
                return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase())) 
            }
        },
        watch: {
            // page() {
            //     this.fetchPost()
            // }
        }
        // watch: {
        //     selectedSort(newValue) {
        //         this.posts.sort((a, b) => a[newValue]?.localeCompare(b[newValue]))
        //     }
        // }
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