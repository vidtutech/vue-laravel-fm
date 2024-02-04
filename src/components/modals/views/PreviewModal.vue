<template>
    <div class="fm-modal-content fm-modal-preview">
        <div class="fm-modal-header">
            <h5 class="fm-modal-title">
                {{ lang.modal.preview.loading }}
                <small class="font-bold">{{ selectedItem.basename }}</small>
            </h5>
            <button
                id="close-fm-preview-modal"
                type="button"
                class="ml-auto flex rounded-full bg-dark/10 hover:bg-dark/20 px-4 py-3 dark:bg-light/10 dark:hover:bg-light/20 text-dark dark:text-light"
                aria-label="Close"
                v-on:click="hideModal"
            >
                <i class="bi bi-x-lg" />
            </button>
        </div>
        <div class="fm-modal-body">
            <transition name="fade" mode="out-in">
                <div class="flex size-full flex-col content-center items-center justify-center" v-if="previewLoaded">
                    <span
                        className="loading loading-bars w-[20%] text-vidtu-red transition-colors delay-150 ease-in-out motion-reduce:transition-none motion-reduce:hover:transform-none lg:w-[10%]"
                    />
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import modal from '../mixins/modal';
import translate from '../../../mixins/translate';
import helper from '../../../mixins/helper';
import GET from '../../../http/get';
import EventBus from '../../../emitter';

export default {
    name: 'PreviewModal',
    mixins: [modal, translate, helper],
    data() {
        return {
            showCropperModule: false,
            previewLoaded: false,
            previewFailed: false,
        };
    },
    mounted() {
        this.loadPreview();
    },
    computed: {
        /**
         * Authorization required
         * @return {*}
         */
        auth() {
            return this.$store.getters['fm/settings/authHeader'];
        },

        /**
         * Selected disk
         * @returns {*}
         */
        selectedDisk() {
            return this.$store.getters['fm/selectedDisk'];
        },

        /**
         * Selected file
         * @returns {*}
         */
        selectedItem() {
            return this.$store.getters['fm/selectedItems'][0];
        },

        /**
         * Show modal footer
         * @return boolean
         */
        showFooter() {
            return this.canCrop(this.selectedItem.extension) && !this.showCropperModule;
        },

        /**
         * Calculate the max height for image
         * @returns {number}
         */
        maxHeight() {
            if (this.$store.state.fm.modal.modalBlockHeight) {
                return this.$store.state.fm.modal.modalBlockHeight - 170;
            }

            return 300;
        },
    },
    methods: {
        /**
         * Can we crop this image?
         * @param extension
         * @returns {boolean}
         */
        canCrop(extension) {
            return this.$store.state.fm.settings.cropExtensions.includes(extension.toLowerCase());
        },

        /**
         * Close cropper
         */
        closeCropper() {
            this.showCropperModule = false;
            this.loadPreview();
        },

        /**
         * Load image
         */
        loadPreview() {
            EventBus.emit(
                'addNotification',
                {
                    status: 'info',
                    message: this.lang.response.previewLoading,
                },
                1000
            );
            fetch(
                `${this.$store.getters['fm/settings/baseUrl']}preview?disk=${
                    this.selectedDisk
                }&path=${encodeURIComponent(this.selectedItem.path)}&v=${this.selectedItem.timestamp}`,
                { cache: 'reload', mode: 'no-cors' }
            )
                .then((res) => {
                    console.log('preview loaded', res);
                    this.previewLoaded = true;
                    EventBus.emit('addNotification', {
                        status: 'success',
                        message: this.lang.response.previewLoaded,
                    });
                })
                .catch((error) => {
                    console.warn('Failed to load preview', error);
                    this.previewFailed = true;
                    EventBus.emit('addNotification', {
                        status: 'error',
                        message: this.lang.response.previewFailed,
                    });
                })
                .finally(() => {
                    if (this.hideModal) this.hideModal();
                });
        },
    },
};
</script>

<style lang="scss">
.fm-modal-preview {
    .modal-body {
        padding: 0;

        img {
            display: block;
            max-width: 100%;
            object-fit: contain;
        }
    }

    & > .d-flex {
        padding: 1rem;
        border-top: 1px solid #e9ecef;
    }
}
</style>
