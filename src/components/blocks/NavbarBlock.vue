<template>
    <div class="fm-navbar">
        <div class="flex w-full gap-2 justify-between" role="group">
            <div class="flex gap-2 flex-wrap" role="group">
                <div class="flex gap-2 flex-wrap" role="group">
                    <div
                        v-tooltip="{
                            content: `${lang.btn.back} ${backDisabled ? '(Currently disabled)' : ''}`,
                            distance: 10,
                        }"
                    >
                        <button
                            type="button"
                            class="flex aspect-square h-10 w-full min-w-fit max-w-10 cursor-pointer items-center justify-center rounded-full ring-1 ring-dark dark:ring-light hover:bg-black dark:hover:bg-white text-dark hover:text-light dark:text-light dark:hover:text-dark disabled:pointer-events-none disabled:opacity-50"
                            v-bind:disabled="backDisabled"
                            v-on:click="historyBack()"
                        >
                            <i class="bi bi-caret-left-fill text-lg" />
                        </button>
                    </div>
                    <div
                        v-tooltip="{
                            content: `${lang.btn.forward} ${forwardDisabled ? '(Currently disabled)' : ''}`,
                            distance: 10,
                        }"
                    >
                        <button
                            type="button"
                            class="flex aspect-square h-10 w-full min-w-fit max-w-10 cursor-pointer items-center justify-center rounded-full ring-1 ring-dark dark:ring-light hover:bg-black dark:hover:bg-white text-dark hover:text-light dark:text-light dark:hover:text-dark disabled:pointer-events-none disabled:opacity-50"
                            v-bind:disabled="forwardDisabled"
                            v-on:click="historyForward()"
                        >
                            <i class="bi bi-caret-right-fill text-lg" />
                        </button>
                    </div>
                    <div v-tooltip="{ content: lang.btn.refresh, distance: 10 }">
                        <button
                            type="button"
                            class="flex aspect-square h-10 w-full min-w-fit max-w-10 cursor-pointer items-center justify-center rounded-full ring-1 ring-dark dark:ring-light hover:bg-black dark:hover:bg-white text-dark hover:text-light dark:text-light dark:hover:text-dark disabled:pointer-events-none disabled:opacity-50"
                            v-on:click="refreshAll()"
                        >
                            <i class="bi bi-arrow-repeat text-lg"></i>
                        </button>
                    </div>
                    <div
                        class="flex lg:hidden"
                        v-tooltip="{
                            content: `${lang.btn.download} ${!isAnyItemSelected ? '(needs selection)' : ''}`,
                            distance: 10,
                        }"
                    >
                        <!-- this download button is only for smaller screens -->
                        <button
                            type="button"
                            class="flex aspect-square h-10 w-full min-w-fit max-w-10 cursor-pointer items-center justify-center rounded-full ring-1 ring-dark dark:ring-light hover:bg-black dark:hover:bg-white text-dark hover:text-light dark:text-light dark:hover:text-dark disabled:pointer-events-none disabled:opacity-50"
                            v-bind:disabled="!isAnyItemSelected"
                            v-on:click="downloadFiles()"
                        >
                            <i class="bi bi-cloud-arrow-down text-lg"></i>
                        </button>
                    </div>
                </div>
                <div class="hidden lg:flex gap-2 flex-wrap" role="group">
                    <div v-tooltip="{ content: lang.btn.file, distance: 10 }">
                        <button
                            type="button"
                            class="flex aspect-square h-10 w-full min-w-fit max-w-10 cursor-pointer items-center justify-center rounded-full ring-1 ring-dark dark:ring-light hover:bg-black dark:hover:bg-white text-dark hover:text-light dark:text-light dark:hover:text-dark disabled:pointer-events-none disabled:opacity-50"
                            v-on:click="showModal('NewFileModal')"
                        >
                            <i class="bi bi-file-plus text-lg"></i>
                        </button>
                    </div>
                    <div v-tooltip="{ content: lang.btn.folder, distance: 10 }">
                        <button
                            type="button"
                            class="flex aspect-square h-10 w-full min-w-fit max-w-10 cursor-pointer items-center justify-center rounded-full ring-1 ring-dark dark:ring-light hover:bg-black dark:hover:bg-white text-dark hover:text-light dark:text-light dark:hover:text-dark disabled:pointer-events-none disabled:opacity-50"
                            v-on:click="showModal('NewFolderModal')"
                        >
                            <i class="bi bi-folder-plus text-lg"></i>
                        </button>
                    </div>
                    <div v-tooltip="{ content: uploading ? 'Uploading...' : lang.btn.upload, distance: 10 }">
                        <button
                            type="button"
                            class="flex aspect-square h-10 w-full min-w-fit max-w-10 cursor-pointer items-center justify-center rounded-full ring-1 ring-dark dark:ring-light hover:bg-black dark:hover:bg-white text-dark hover:text-light dark:text-light dark:hover:text-dark disabled:pointer-events-none disabled:opacity-50"
                            v-bind:disabled="uploading"
                            v-on:click="showModal('UploadModal')"
                        >
                            <i class="bi bi-upload text-lg"></i>
                        </button>
                    </div>
                    <div
                        class="hidden lg:flex"
                        v-tooltip="{
                            content: `${lang.btn.download} ${!isAnyItemSelected ? '(needs selection)' : ''}`,
                            distance: 10,
                        }"
                    >
                        <!-- this download button is only for larger screens -->
                        <button
                            type="button"
                            class="flex aspect-square h-10 w-full min-w-fit max-w-10 cursor-pointer items-center justify-center rounded-full ring-1 ring-dark dark:ring-light hover:bg-black dark:hover:bg-white text-dark hover:text-light dark:text-light dark:hover:text-dark disabled:pointer-events-none disabled:opacity-50"
                            v-bind:disabled="!isAnyItemSelected"
                            v-on:click="downloadFiles()"
                        >
                            <i class="bi bi-cloud-arrow-down text-lg"></i>
                        </button>
                    </div>
                </div>
                <div class="hidden lg:flex flex gap-2 flex-wrap" role="group">
                    <div
                        v-tooltip="{
                            content: `${lang.btn.cut} ${!isAnyItemSelected ? '(needs selection)' : ''}`,
                            distance: 10,
                        }"
                    >
                        <button
                            type="button"
                            class="flex aspect-square h-10 w-full min-w-fit max-w-10 cursor-pointer items-center justify-center rounded-full ring-1 ring-dark dark:ring-light hover:bg-black dark:hover:bg-white text-dark hover:text-light dark:text-light dark:hover:text-dark disabled:pointer-events-none disabled:opacity-50"
                            v-bind:disabled="!isAnyItemSelected"
                            v-on:click="toClipboard('cut')"
                        >
                            <i class="bi bi-scissors text-lg"></i>
                        </button>
                    </div>
                    <div
                        v-tooltip="{
                            content: `${lang.btn.copy} ${!isAnyItemSelected ? '(needs selection)' : ''}`,
                            distance: 10,
                        }"
                    >
                        <button
                            type="button"
                            class="flex aspect-square h-10 w-full min-w-fit max-w-10 cursor-pointer items-center justify-center rounded-full ring-1 ring-dark dark:ring-light hover:bg-black dark:hover:bg-white text-dark hover:text-light dark:text-light dark:hover:text-dark disabled:pointer-events-none disabled:opacity-50"
                            v-bind:disabled="!isAnyItemSelected"
                            v-on:click="toClipboard('copy')"
                        >
                            <i class="bi bi-files text-lg"></i>
                        </button>
                    </div>
                    <div v-tooltip="{ content: clipboardType ? lang.btn.paste : 'nothing to paste', distance: 10 }">
                        <button
                            type="button"
                            class="flex aspect-square h-10 w-full min-w-fit max-w-10 cursor-pointer items-center justify-center rounded-full ring-1 ring-dark dark:ring-light hover:bg-black dark:hover:bg-white text-dark hover:text-light dark:text-light dark:hover:text-dark disabled:pointer-events-none disabled:opacity-50"
                            v-bind:disabled="!clipboardType"
                            v-on:click="paste()"
                        >
                            <i class="bi bi-clipboard text-lg"></i>
                        </button>
                    </div>
                    <div
                        v-tooltip="{
                            content: `${lang.btn.delete} ${!isAnyItemSelected ? '(needs selection)' : ''}`,
                            distance: 10,
                        }"
                    >
                        <button
                            type="button"
                            class="flex aspect-square h-10 w-full min-w-fit max-w-10 cursor-pointer items-center justify-center rounded-full ring-1 ring-dark dark:ring-light hover:bg-black dark:hover:bg-white text-dark hover:text-light dark:text-light dark:hover:text-dark disabled:pointer-events-none disabled:opacity-50"
                            v-bind:disabled="!isAnyItemSelected"
                            v-on:click="showModal('DeleteModal')"
                        >
                            <i class="bi bi-trash text-lg"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex gap-2 flex-wrap" role="group">
                <div
                    v-tooltip="{
                        content: `Switch to ${viewType === 'grid' ? 'list' : 'grid'} view`,
                        distance: 10,
                    }"
                >
                    <button
                        type="button"
                        class="flex aspect-square h-10 w-full min-w-fit max-w-10 cursor-pointer items-center justify-center rounded-full ring-1 ring-dark dark:ring-light hover:bg-black dark:hover:bg-white text-dark hover:text-light dark:text-light dark:hover:text-dark disabled:pointer-events-none disabled:opacity-50"
                        v-on:click="selectView(viewType === 'grid' ? 'table' : 'grid')"
                    >
                        <i :class="['text-lg', 'bi', 'bi-' + (viewType === 'grid' ? 'list-ul' : 'grid')]"></i>
                    </button>
                </div>
                <div
                    v-tooltip="{
                        content: 'More Options',
                        distance: 10,
                    }"
                >
                    <button
                        type="button"
                        class="flex lg:hidden aspect-square h-10 w-full min-w-fit max-w-10 cursor-pointer items-center justify-center rounded-full ring-1 ring-dark dark:ring-light hover:bg-black dark:hover:bg-white text-dark hover:text-light dark:text-light dark:hover:text-dark disabled:pointer-events-none disabled:opacity-50"
                        v-on:click="toggleMenu"
                    >
                        <i class="bi bi-three-dots-vertical"></i>
                    </button>
                </div>
            </div>
        </div>
        <div v-if="showMenu" class="fm-navbar-menu" v-click-outside="closeMenu">
            <ul>
                <li
                    v-tooltip="{
                        content: lang.btn.file,
                        distance: 10,
                        placement: 'left',
                    }"
                >
                    <button
                        type="button"
                        class="flex gap-2 py-1.5 px-3 w-full cursor-pointer items-center rounded-t-xl hover:bg-black dark:hover:bg-white text-dark hover:text-light dark:text-light dark:hover:text-dark disabled:pointer-events-none disabled:opacity-50"
                        v-on:click="
                            showModal('NewFileModal');
                            closeMenu();
                        "
                    >
                        <i class="bi bi-file-plus text-lg"></i>
                        <span>{{ lang.btn.file }}</span>
                    </button>
                </li>
                <li
                    v-tooltip="{
                        content: lang.btn.folder,
                        distance: 10,
                        placement: 'left',
                    }"
                >
                    <button
                        type="button"
                        class="flex gap-2 py-1.5 px-3 w-full cursor-pointer items-center hover:bg-black dark:hover:bg-white text-dark hover:text-light dark:text-light dark:hover:text-dark disabled:pointer-events-none disabled:opacity-50"
                        v-on:click="
                            showModal('NewFolderModal');
                            closeMenu();
                        "
                        v-bind:title="lang.btn.folder"
                    >
                        <i class="bi bi-folder-plus text-lg"></i>
                        <span>{{ lang.btn.folder }}</span>
                    </button>
                </li>
                <li v-tooltip="{ content: uploading ? 'Uploading...' : lang.btn.upload, distance: 10 }">
                    <button
                        type="button"
                        class="flex gap-2 py-1.5 px-3 w-full cursor-pointer items-center hover:bg-black dark:hover:bg-white text-dark hover:text-light dark:text-light dark:hover:text-dark disabled:pointer-events-none disabled:opacity-50"
                        v-bind:disabled="uploading"
                        v-on:click="
                            showModal('UploadModal');
                            closeMenu();
                        "
                        v-bind:title="lang.btn.upload"
                    >
                        <i class="bi bi-upload text-lg"></i>
                        <span>{{ lang.btn.upload }}</span>
                    </button>
                </li>
                <li
                    v-tooltip="{
                        content: `${lang.btn.cut} ${!isAnyItemSelected ? '(needs selection)' : ''}`,
                        distance: 10,
                        placement: 'left',
                    }"
                >
                    <button
                        type="button"
                        class="flex gap-2 py-1.5 px-3 w-full cursor-pointer items-center hover:bg-black dark:hover:bg-white text-dark hover:text-light dark:text-light dark:hover:text-dark disabled:pointer-events-none disabled:opacity-50"
                        v-bind:disabled="!isAnyItemSelected"
                        v-bind:title="lang.btn.cut"
                        v-on:click="
                            toClipboard('cut');
                            closeMenu();
                        "
                    >
                        <i class="bi bi-scissors text-lg"></i>
                        <span>{{ lang.btn.cut }}</span>
                    </button>
                </li>
                <li
                    v-tooltip="{
                        content: `${lang.btn.copy} ${!isAnyItemSelected ? '(needs selection)' : ''}`,
                        distance: 10,
                        placement: 'left',
                    }"
                >
                    <button
                        type="button"
                        class="flex gap-2 py-1.5 px-3 w-full cursor-pointer items-center hover:bg-black dark:hover:bg-white text-dark hover:text-light dark:text-light dark:hover:text-dark disabled:pointer-events-none disabled:opacity-50"
                        v-bind:disabled="!isAnyItemSelected"
                        v-bind:title="lang.btn.copy"
                        v-on:click="
                            toClipboard('copy');
                            closeMenu();
                        "
                    >
                        <i class="bi bi-files text-lg"></i>
                        <span>{{ lang.btn.copy }}</span>
                    </button>
                </li>
                <li
                    v-tooltip="{
                        content: `${lang.btn.paste} ${!isAnyItemSelected ? 'nothing to paste' : ''}`,
                        distance: 10,
                        placement: 'left',
                    }"
                >
                    <button
                        type="button"
                        class="flex gap-2 py-1.5 px-3 w-full cursor-pointer items-center hover:bg-black dark:hover:bg-white text-dark hover:text-light dark:text-light dark:hover:text-dark disabled:pointer-events-none disabled:opacity-50"
                        v-bind:disabled="!clipboardType"
                        v-bind:title="lang.btn.paste"
                        v-on:click="
                            paste();
                            closeMenu();
                        "
                    >
                        <i class="bi bi-clipboard text-lg"></i>
                        <span>{{ lang.btn.paste }}</span>
                    </button>
                </li>
                <li
                    v-tooltip="{
                        content: `${lang.btn.delete} ${!isAnyItemSelected ? '(needs selection)' : ''}`,
                        distance: 10,
                        placement: 'left',
                    }"
                >
                    <button
                        type="button"
                        class="flex gap-2 py-1.5 px-3 w-full cursor-pointer items-center hover:bg-black dark:hover:bg-white text-dark hover:text-light dark:text-light dark:hover:text-dark disabled:pointer-events-none disabled:opacity-50"
                        v-bind:disabled="!isAnyItemSelected"
                        v-bind:title="lang.btn.delete"
                        v-on:click="
                            showModal('DeleteModal');
                            closeMenu();
                        "
                    >
                        <i class="bi bi-trash text-lg"></i>
                        <span>{{ lang.btn.delete }}</span>
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import translate from '../../mixins/translate';
import EventBus from '../../emitter';

export default {
    name: 'NavbarBlock',
    mixins: [translate],
    data() {
        return {
            showMenu: false,
        };
    },
    computed: {
        /**
         * Active manager name
         * @returns {any}
         */
        activeManager() {
            return this.$store.state.fm.activeManager;
        },

        /**
         * Back button state
         * @returns {boolean}
         */
        backDisabled() {
            return !this.$store.state.fm[this.activeManager].historyPointer;
        },

        /**
         * Forward button state
         * @returns {boolean}
         */
        forwardDisabled() {
            return (
                this.$store.state.fm[this.activeManager].historyPointer ===
                this.$store.state.fm[this.activeManager].history.length - 1
            );
        },

        /**
         * Is any files or directories selected?
         * @returns {boolean}
         */
        isAnyItemSelected() {
            return (
                this.$store.state.fm[this.activeManager].selected.files.length > 0 ||
                this.$store.state.fm[this.activeManager].selected.directories.length > 0
            );
        },

        /**
         * Manager view type - grid or table
         * @returns {any}
         */
        viewType() {
            return this.$store.state.fm[this.activeManager].viewType;
        },

        /**
         * Upload files
         * @returns {boolean}
         */
        uploading() {
            return this.$store.state.fm.messages.actionProgress > 0;
        },

        /**
         * Clipboard - action type
         * @returns {null}
         */
        clipboardType() {
            return this.$store.state.fm.clipboard.type;
        },

        /**
         * Full screen status
         * @returns {any}
         */
        fullScreen() {
            return this.$store.state.fm.fullScreen;
        },

        /**
         * Show or Hide hidden files
         * @returns {boolean}
         */
        hiddenFiles() {
            return this.$store.state.fm.settings.hiddenFiles;
        },
    },
    methods: {
        /**
         * Open navbar menu
         */
        toggleMenu(event) {
            event.stopPropagation();
            this.showMenu = !this.showMenu;
        },

        /**
         * Close navbar menu
         */
        closeMenu() {
            this.showMenu = false;
        },

        /**
         * Close menu on resize
         */
        handleResize() {
            this.showMenu = false;
        },

        /**
         * Refresh file manager
         */
        refreshAll() {
            this.$store.dispatch('fm/refreshAll');
            console.log('peerId', this.$store.state.fm.peerId);
        },

        /**
         * History back
         */
        historyBack() {
            this.$store.dispatch(`fm/${this.activeManager}/historyBack`);
        },

        /**
         * History forward
         */
        historyForward() {
            this.$store.dispatch(`fm/${this.activeManager}/historyForward`);
        },

        /**
         * Copy
         * @param type
         */
        toClipboard(type) {
            this.$store.dispatch('fm/toClipboard', type);

            // show notification
            if (type === 'cut') {
                EventBus.emit('addNotification', {
                    status: 'success',
                    message: this.lang.notifications.cutToClipboard,
                });
            } else if (type === 'copy') {
                EventBus.emit('addNotification', {
                    status: 'success',
                    message: this.lang.notifications.copyToClipboard,
                });
            }
        },

        /**
         * Paste
         */
        paste() {
            this.$store.dispatch('fm/paste');
        },

        /**
         * download
         */
        downloadFiles() {
            const selectedItems = this.$store.state.fm[this.activeManager].selected.files;
            if (selectedItems.length) {
                EventBus.emit('addNotification', {
                    status: 'success',
                    message: `Downloading ${selectedItems.length} file(s)`,
                });
                this.$store.dispatch('fm/downloadFiles');
            }
        },

        /**
         * Set Hide or Show hidden files
         */
        toggleHidden() {
            this.$store.commit('fm/settings/toggleHiddenFiles');
        },

        /**
         * Show modal window
         * @param modalName
         */
        showModal(modalName) {
            // show selected modal
            this.$store.commit('fm/modal/setModalState', {
                modalName,
                show: true,
            });
        },

        /**
         * Select view type
         * @param type
         */
        selectView(type) {
            if (this.viewType !== type) this.$store.commit(`fm/${this.activeManager}/setView`, type);
        },
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    },
};
</script>

<style lang="scss">
.v-popper--theme-tooltip .v-popper__inner {
    color: #fff !important;
    font-size: 0.875rem !important;
    line-height: 1.25rem !important;
    border-radius: 0.5rem !important;
    background: rgba(97, 97, 97, 0.92) !important;
}

.v-popper__arrow-outer,
.v-popper__arrow-inner {
    visibility: hidden;
}
</style>
