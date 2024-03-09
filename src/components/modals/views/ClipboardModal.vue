<template>
    <div class="fm-modal-content">
        <div class="fm-modal-header">
            <h5 class="fm-modal-title">{{ lang.clipboard.title }}</h5>
            <button
                type="button"
                class="flex aspect-square h-10 w-full min-w-fit max-w-10 cursor-pointer items-center justify-center rounded-full ring-1 ring-dark dark:ring-light hover:bg-black dark:hover:bg-white text-dark hover:text-light dark:hover:text-dark dark:text-light"
                aria-label="Close"
                v-on:click="hideModal"
            >
                <i class="bi bi-x-lg" />
            </button>
        </div>
        <div class="fm-modal-body">
            <template v-if="clipboard.type">
                <div class="flex justify-between items-center p-2">
                    <div class="flex gap-2 w-75 items-center truncate">
                        <span class="badge bg-light text-dark">
                            <i class="bi bi-folder" />
                        </span>
                        <span class="truncate text-whitespace-pre w-[95%]">{{ clipboard.disk }}</span>
                    </div>
                    <div class="text-right text-muted">
                        <span v-bind:title="`${lang.clipboard.actionType} - ${lang.clipboard[clipboard.type]}`">
                            <i :class="['bi', 'bi-' + (clipboard.type === 'copy' ? 'files' : 'scissors')]"></i>
                        </span>
                    </div>
                </div>
                <hr />
                <div
                    class="flex justify-between items-center p-2 hover:bg-dark/10 hover:dark:bg-light/10 rounded"
                    v-for="(dir, index) in directories"
                    v-bind:key="`d-${index}`"
                >
                    <div class="flex gap-2 w-75 items-center truncate">
                        <i class="bi bi-folder" />
                        <span class="truncate text-whitespace-pre w-[95%]">{{ dir.name }}</span>
                    </div>
                    <div class="text-right">
                        <button
                            type="button"
                            class="btn-close"
                            v-bind:title="lang.btn.delete"
                            v-on:click="deleteItem('directories', dir.path)"
                        ></button>
                    </div>
                </div>
                <div
                    class="flex justify-between items-center p-2 hover:bg-dark/10 hover:dark:bg-light/10 rounded"
                    v-for="(file, index) in files"
                    v-bind:key="`f-${index}`"
                >
                    <div class="flex gap-2 w-75 items-center truncate">
                        <i class="bi" v-bind:class="file.icon" />
                        <span class="truncate text-whitespace-pre w-[95%]">{{ file.name }}</span>
                    </div>
                    <div class="text-right">
                        <button
                            type="button"
                            class="btn-close"
                            v-bind:title="lang.btn.delete"
                            v-on:click="deleteItem('files', file.path)"
                        ></button>
                    </div>
                </div>
            </template>
            <template v-else>
                <span>{{ lang.clipboard.none }}</span>
            </template>
        </div>
        <div class="fm-modal-footer">
            <button
                type="button"
                v-bind:disabled="!clipboard.type"
                class="inline-flex w-fit rounded-lg bg-vidtu-red/80 px-3 py-2 text-lg font-semibold text-black shadow-lg transition-all ease-in-out hover:scale-105 dark:text-white disabled:opacity-50 disabled:pointer-events-none"
                v-on:click="resetClipboard"
            >
                {{ lang.btn.clear }}
            </button>
            <button
                type="button"
                class="inline-flex w-fit rounded-lg bg-black px-3 py-2 text-base font-bold items-center text-white shadow-lg transition-all ease-in-out hover:scale-105 dark:bg-white dark:text-black"
                v-on:click="hideModal"
            >
                {{ lang.btn.cancel }}
            </button>
        </div>
    </div>
</template>

<script>
import modal from '../mixins/modal';
import translate from '../../../mixins/translate';
import helper from '../../../mixins/helper';

export default {
    name: 'ClipboardModal',
    mixins: [modal, translate, helper],
    computed: {
        /**
         * Clipboard state
         * @returns {*}
         */
        clipboard() {
            return this.$store.state.fm.clipboard;
        },

        /**
         * Paths and names for directories
         * @returns {{path: *, name: *}[]}
         */
        directories() {
            return this.$store.state.fm.clipboard.directories.map((item) => ({
                path: item,
                name: item.split('/').slice(-1)[0],
            }));
        },

        /**
         * File names, paths and icons
         * @returns {{path: *, name: *, icon: *}[]}
         */
        files() {
            return this.$store.state.fm.clipboard.files.map((item) => {
                const name = item.split('/').slice(-1)[0];
                return {
                    path: item,
                    name,
                    icon: this.extensionToIcon(name.split('.').slice(-1)[0]),
                };
            });
        },
    },
    methods: {
        /**
         * Delete item from clipboard
         * @param type
         * @param path
         */
        deleteItem(type, path) {
            this.$store.commit('fm/truncateClipboard', { type, path });
        },

        /**
         * Reset clipboard
         */
        resetClipboard() {
            this.$store.commit('fm/resetClipboard');
        },
    },
};
</script>
