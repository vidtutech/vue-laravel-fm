<template>
    <div class="fm-info-block">
        <div class="flex w-full text-xs lg:text-sm items-center">
            <div v-bind:class="[selectedCount ? 'flex' : 'hidden']" class="gap-2 items-center">
                <div class="flex gap-1 items-center">
                    <span>{{ lang.info.selected }}</span>
                    <span class="font-semibold">{{ selectedCount }}</span>
                </div>
                <div class="flex gap-1 items-center">
                    <span>{{ lang.info.selectedSize }}</span>
                    <span class="font-semibold">{{ selectedFilesSize }}</span>
                </div>
            </div>
            <div v-bind:class="[selectedCount ? 'hidden' : 'flex']" class="gap-2 items-center">
                <div class="flex gap-1 items-center">
                    <span>{{ lang.info.directories }}</span>
                    <span class="font-semibold">{{ directoriesCount }}</span>
                </div>
                <div class="flex gap-1 items-center">
                    <span>{{ lang.info.files }}</span>
                    <span class="font-semibold">{{ filesCount }}</span>
                </div>
                <div class="flex gap-1 items-center">
                    <span>{{ lang.info.size }}</span>
                    <span class="font-semibold">{{ filesSize }}</span>
                </div>
            </div>
        </div>
        <div class="flex gap-2 items-center">
            <div :class="['gap-1', 'items-center', loadingSpinner ? 'flex' : 'hidden']" role="status">
                <span class="inline-flex animate-spin">
                    <i class="bi bi-arrow-repeat"></i>
                </span>
                <span class="hidden lg:block visually-hidden">Loading...</span>
            </div>
            <span
                v-show="clipboardType"
                v-on:click="showModal('ClipboardModal')"
                class="font-semibold cursor-pointer"
                v-bind:title="[lang.clipboard.title + ' - ' + lang.clipboard[clipboardType]]"
            >
                <i class="bi bi-clipboard"></i>
            </span>
            <span
                v-on:click="showModal('StatusModal')"
                class="font-semibold cursor-pointer"
                v-bind:class="[hasErrors ? 'text-vidtu-red' : '']"
                v-bind:title="lang.modal.status.title"
            >
                <i class="bi bi-info-circle-fill"></i>
            </span>
        </div>
    </div>
</template>

<script>
import translate from '../../mixins/translate';
import helper from '../../mixins/helper';

export default {
    name: 'InfoBlock',
    mixins: [translate, helper],
    computed: {
        /**
         * Active manager
         * @returns {any}
         */
        activeManager() {
            return this.$store.state.fm.activeManager;
        },

        /**
         * Progress bar value - %
         * @returns {number}
         */
        progressBar() {
            return this.$store.state.fm.messages.actionProgress;
        },

        /**
         * App has errors
         * @returns {boolean}
         */
        hasErrors() {
            return !!this.$store.state.fm.messages.errors.length;
        },

        /**
         * Files count in selected directory
         * @returns {*}
         */
        filesCount() {
            return this.$store.getters[`fm/${this.activeManager}/filesCount`];
        },

        /**
         * Directories count in selected directory
         * @returns {*}
         */
        directoriesCount() {
            return this.$store.getters[`fm/${this.activeManager}/directoriesCount`];
        },

        /**
         * Files size in selected directory
         * @returns {*|string}
         */
        filesSize() {
            return this.bytesToHuman(this.$store.getters[`fm/${this.activeManager}/filesSize`]);
        },

        /**
         * Count files and folders
         * @returns {*}
         */
        selectedCount() {
            return this.$store.getters[`fm/${this.activeManager}/selectedCount`];
        },

        /**
         * Calculate selected files size
         * @returns {*|string}
         */
        selectedFilesSize() {
            return this.bytesToHuman(this.$store.getters[`fm/${this.activeManager}/selectedFilesSize`]);
        },

        /**
         * Clipboard - action type
         * @returns {null}
         */
        clipboardType() {
            return this.$store.state.fm.clipboard.type;
        },
        /**
         * Spinner
         * @returns {number}
         */
        loadingSpinner() {
            return this.$store.state.fm.messages.loading;
        },
    },
    methods: {
        /**
         * Show modal window
         * @param modalName
         */
        showModal(modalName) {
            this.$store.commit('fm/modal/setModalState', {
                modalName,
                show: true,
            });
        },
    },
};
</script>
