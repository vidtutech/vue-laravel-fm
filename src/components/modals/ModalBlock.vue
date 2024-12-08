<template>
    <transition name="fm-modal">
        <div class="fm-modal" ref="fmModal" v-on:click="hideModal">
            <div class="fm-modal-dialog" role="document" v-bind:class="modalSize" v-on:click.stop>
                <component v-bind:is="modalName" />
            </div>
        </div>
    </transition>
</template>

<script>
import NewFileModal from './views/NewFileModal.vue';
import NewFolderModal from './views/NewFolderModal.vue';
import UploadModal from './views/UploadModal.vue';
import DeleteModal from './views/DeleteModal.vue';
import ClipboardModal from './views/ClipboardModal.vue';
import StatusModal from './views/StatusModal.vue';
import RenameModal from './views/RenameModal.vue';
import PropertiesModal from './views/PropertiesModal.vue';
import TextEditModal from './views/TextEditModal.vue';
import ZipModal from './views/ZipModal.vue';
import PreviewModal from './views/PreviewModal.vue';
import UnzipModal from './views/UnzipModal.vue';

export default {
    name: 'ModalBlock',
    components: {
        NewFileModal,
        NewFolderModal,
        UploadModal,
        DeleteModal,
        ClipboardModal,
        StatusModal,
        RenameModal,
        PropertiesModal,
        TextEditModal,
        ZipModal,
        UnzipModal,
        PreviewModal,
    },
    mounted() {
        // set height
        this.$store.commit('fm/modal/setModalBlockHeight', this.$refs.fmModal.offsetHeight);
    },
    computed: {
        /**
         * Selected modal name
         * @returns {null|*}
         */
        modalName() {
            return this.$store.state.fm.modal.modalName;
        },

        /**
         * Modal size style
         * @returns {{'modal-lg': boolean, 'modal-sm': boolean}}
         */
        modalSize() {
            return {
                'modal-xl': this.modalName === 'PreviewModal' || this.modalName === 'TextEditModal',
                'modal-lg': this.modalName === 'VideoPlayerModal',
                'modal-sm': false,
            };
        },
    },
    methods: {
        /**
         * Hide modal window
         */
        hideModal() {
            this.$store.commit('fm/modal/clearModal');
        },
    },
};
</script>

<style lang="scss">
.fm-modal {
    .modal-xl {
        max-width: 96%;
    }
}

.fm-modal-enter-active,
.fm-modal-leave-active {
    transition: opacity 0.5s;
}

.fm-modal-enter,
.fm-modal-leave-to {
    opacity: 0;
}
</style>
