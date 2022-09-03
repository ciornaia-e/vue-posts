<template>
    <div 
        class="modal"
        v-if="show"
        @click.stop="hideModal"
    >
        <div @click.stop class="modal__content">
            <slot></slot>    
        </div>  
    </div>
</template>

<script>
    import toggleMixin from '@/mixins/toggleMixin';

    export default {
        name: 'post-modal',
        mixins: [toggleMixin],
    }
</script>

<style scoped>
    .modal {
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0,0,0,.5);
        position: fixed;
        display: flex;
    }

    .modal__content {
        margin: auto;
        background: white;
        min-height: 50px;
        min-width: 300px;
        padding: 20px;
    }
</style>