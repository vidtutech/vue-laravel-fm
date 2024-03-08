<template>
    <div class="fm-modal-content">
        <div class="fm-modal-header">
            <h5 class="fm-modal-title">{{ lang.modal.properties.title }}</h5>
            <button
                type="button"
                class="ml-auto flex rounded-full bg-dark/10 hover:bg-dark/20 px-4 py-3 dark:bg-light/10 dark:hover:bg-light/20 text-dark dark:text-light"
                aria-label="Close"
                v-on:click="hideModal"
            >
                <i class="bi bi-x-lg" />
            </button>
        </div>
        <div class="fm-modal-body">
            <div
                class="flex flex-row gap-3 justify-between items-center hover:bg-dark/10 hover:dark:bg-light/10 py-1.5 px-3 rounded-lg"
            >
                <div class="font-bold w-full max-w-[25%] lg:max-w-[20%] truncate">
                    {{ lang.modal.properties.disk }}:
                </div>
                <div class="w-full break-words">{{ selectedDisk }}</div>
                <div
                    class="p-1 px-2 text-right cursor-pointer hover:scale-110 transition-all ease-in-out hover:bg-dark/25 dark:hover:bg-light/25 rounded-lg"
                >
                    <i
                        v-on:click="copyToClipboard(selectedDisk)"
                        v-bind:title="lang.clipboard.copy"
                        class="bi bi-files"
                    />
                </div>
            </div>
            <div
                class="flex flex-row gap-3 justify-between items-center hover:bg-dark/10 hover:dark:bg-light/10 py-1.5 px-3 rounded-lg"
            >
                <div class="font-bold w-full max-w-[25%] lg:max-w-[20%] truncate">
                    {{ lang.modal.properties.name }}:
                </div>
                <div class="w-full break-words">{{ selectedItem.basename }}</div>
                <div
                    class="p-1 px-2 text-right cursor-pointer hover:scale-110 transition-all ease-in-out hover:bg-dark/25 dark:hover:bg-light/25 rounded-lg"
                >
                    <i
                        v-on:click="copyToClipboard(selectedItem.basename)"
                        v-bind:title="lang.clipboard.copy"
                        class="bi bi-files"
                    />
                </div>
            </div>
            <div
                class="flex flex-row gap-3 justify-between items-center hover:bg-dark/10 hover:dark:bg-light/10 py-1.5 px-3 rounded-lg"
            >
                <div class="font-bold w-full max-w-[25%] lg:max-w-[20%] truncate">
                    {{ lang.modal.properties.path }}:
                </div>
                <div class="w-full break-words">{{ selectedItem.path }}</div>
                <div
                    class="p-1 px-2 text-right cursor-pointer hover:scale-110 transition-all ease-in-out hover:bg-dark/25 dark:hover:bg-light/25 rounded-lg"
                >
                    <i
                        v-on:click="copyToClipboard(selectedItem.path)"
                        v-bind:title="lang.clipboard.copy"
                        class="bi bi-files"
                    />
                </div>
            </div>
            <template v-if="selectedItem.type === 'file'">
                <div
                    class="flex flex-row gap-3 justify-between items-center hover:bg-dark/10 hover:dark:bg-light/10 py-1.5 px-3 rounded-lg"
                >
                    <div class="font-bold w-full max-w-[25%] lg:max-w-[20%] truncate">
                        {{ lang.modal.properties.size }}:
                    </div>
                    <div class="w-full break-words">{{ bytesToHuman(selectedItem.size) }}</div>
                    <div
                        class="p-1 px-2 text-right cursor-pointer hover:scale-110 transition-all ease-in-out hover:bg-dark/25 dark:hover:bg-light/25 rounded-lg"
                    >
                        <i
                            v-on:click="copyToClipboard(bytesToHuman(selectedItem.size))"
                            v-bind:title="lang.clipboard.copy"
                            class="bi bi-files"
                        />
                    </div>
                </div>
                <div
                    class="flex flex-row gap-3 justify-between items-center hover:bg-dark/10 hover:dark:bg-light/10 py-1.5 px-3 rounded-lg"
                >
                    <div class="font-bold w-full max-w-[25%] lg:max-w-[20%] truncate">
                        {{ lang.modal.properties.url }}:
                    </div>
                    <div class="w-full break-words">
                        <span v-if="url">{{ url }}</span>
                        <span v-else>
                            <button
                                v-on:click="getUrl"
                                type="button"
                                title="Get URL"
                                class="flex items-center justify-center gap-3 rounded-full bg-dark/10 dark:bg-light/10 py-1.5 px-3 hover:bg-dark/25 dark:hover:bg-light/25"
                            >
                                <i class="bi bi-link-45deg" />
                                <span class="font-bold">Get URL</span>
                            </button>
                        </span>
                    </div>
                    <div
                        v-if="url"
                        class="p-1 px-2 text-right cursor-pointer hover:scale-110 transition-all ease-in-out hover:bg-dark/25 dark:hover:bg-light/25 rounded-lg"
                    >
                        <i v-on:click="copyToClipboard(url)" v-bind:title="lang.clipboard.copy" class="bi bi-files" />
                    </div>
                </div>
            </template>
            <template v-if="selectedItem.hasOwnProperty('timestamp')">
                <div
                    class="flex flex-row gap-3 justify-between items-center hover:bg-dark/10 hover:dark:bg-light/10 py-1.5 px-3 rounded-lg"
                >
                    <div class="font-bold w-full max-w-[25%] lg:max-w-[20%] truncate">
                        {{ lang.modal.properties.modified }}:
                    </div>
                    <div class="w-full break-words">{{ timestampToDate(selectedItem.timestamp) }}</div>
                    <div
                        class="p-1 px-2 text-right cursor-pointer hover:scale-110 transition-all ease-in-out hover:bg-dark/25 dark:hover:bg-light/25 rounded-lg"
                    >
                        <i
                            v-on:click="copyToClipboard(timestampToDate(selectedItem.timestamp))"
                            v-bind:title="lang.clipboard.copy"
                            class="bi bi-files"
                        />
                    </div>
                </div>
            </template>
            <template v-if="selectedItem.hasOwnProperty('acl')">
                <div
                    class="flex flex-row gap-3 justify-between items-center hover:bg-dark/10 hover:dark:bg-light/10 py-1.5 px-3 rounded-lg"
                >
                    <div class="font-bold w-full max-w-[25%] lg:max-w-[20%] truncate">
                        {{ lang.modal.properties.access }}:
                    </div>
                    <div class="w-full break-words">{{ lang.modal.properties['access_' + selectedItem.acl] }}</div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import modal from '../mixins/modal';
import translate from '../../../mixins/translate';
import helper from '../../../mixins/helper';
import EventBus from '../../../emitter';

export default {
    name: 'PropertiesModal',
    mixins: [modal, translate, helper],
    data() {
        return {
            url: null,
        };
    },
    computed: {
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
    },
    methods: {
        /**
         * Get URL
         */
        getUrl() {
            this.$store
                .dispatch('fm/url', {
                    disk: this.selectedDisk,
                    path: this.selectedItem.path,
                })
                .then((response) => {
                    if (response.data.result.status === 'success') {
                        this.url = response.data.url;
                    }
                });
        },

        /**
         * Copy text to clipboard
         * @param text
         */
        async copyToClipboard(text) {
            try {
                await navigator.clipboard.writeText(text);
                EventBus.emit('addNotification', {
                    status: 'success',
                    message: this.lang.notifications.copyToClipboard,
                });
            } catch (error) {
                console.warn('File Manager failed to copy', error);
                EventBus.emit('addNotification', {
                    status: 'error',
                    message: this.lang.notifications.copyFailed,
                });
            }
        },
    },
};
</script>
