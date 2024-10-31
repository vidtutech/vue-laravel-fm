<template>
    <div class="fm-modal-content">
        <div class="fm-modal-header">
            <h5 class="fm-modal-title">{{ lang.modal.upload.title }}</h5>
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
            <div class="relative flex w-full" v-show="!progressBar">
                <button
                    type="button"
                    class="inline-flex w-full rounded-xl bg-black px-3 py-2 text-base font-bold justify-center items-center text-white shadow-lg transition-all ease-in-out hover:scale-105 dark:bg-white dark:text-black"
                >
                    {{ lang.btn.uploadSelect }}
                </button>
                <input
                    class="absolute inset-0 cursor-pointer opacity-0"
                    type="file"
                    multiple
                    name="myfile"
                    :style="{
                        opacity: '0 !important;',
                    }"
                    v-on:change="selectFiles($event)"
                />
            </div>
            <div class="flex flex-col gap-2" v-if="countFiles">
                <div
                    class="flex justify-between hover:bg-dark/10 hover:dark:bg-light/10 p-1.5 px-3 rounded"
                    v-for="(item, index) in newFiles"
                    v-bind:key="index"
                >
                    <div class="flex gap-2 w-full max-w-[75%] text-truncate">
                        <i class="bi" v-bind:class="mimeToIcon(item.type)" />
                        {{ item.name }}
                    </div>
                    <div class="text-right">
                        {{ bytesToHuman(item.size) }}
                    </div>
                </div>
                <hr />
                <div class="flex justify-between">
                    <div>
                        <strong>{{ lang.modal.upload.selected }}</strong>
                        {{ newFiles.length }}
                    </div>
                    <div class="text-right">
                        <strong>{{ lang.modal.upload.size }}</strong>
                        {{ allFilesSize }}
                    </div>
                </div>
                <hr />
                <div class="flex justify-between">
                    <div class="flex w-full font-semibold">
                        {{ lang.modal.upload.ifExist }}
                    </div>
                    <div class="flex flex-row gap-2">
                        <div class="form-check form-check-inline flex gap-2 items-center">
                            <input
                                class="form-check-input"
                                id="uploadRadio1"
                                type="radio"
                                name="uploadOptions"
                                v-bind:checked="!overwrite"
                                v-on:change="overwrite = 0"
                            />
                            <label class="form-check-label" for="uploadRadio1">
                                {{ lang.modal.upload.skip }}
                            </label>
                        </div>
                        <div class="form-check form-check-inline flex gap-2 items-center">
                            <input
                                class="form-check-input"
                                id="uploadRadio2"
                                type="radio"
                                name="uploadOptions"
                                v-bind:checked="overwrite"
                                v-on:change="overwrite = 1"
                            />
                            <label class="form-check-label" for="uploadRadio2">
                                {{ lang.modal.upload.overwrite }}
                            </label>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
            <div v-else>
                <p>{{ lang.modal.upload.noSelected }}</p>
            </div>
            <div class="fm-upload-info pt-2">
                <!-- Progress Bar -->
                <div class="progress h-fit" v-show="countFiles">
                    <div
                        class="progress-bar bg-dark dark:bg-light text-light dark:text-dark text-center font-bold"
                        role="progressbar"
                        v-bind:aria-valuenow="progressBar"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        v-bind:style="{ width: progressBar + '%' }"
                    >
                        {{ progressBar }}%
                    </div>
                </div>
            </div>
        </div>
        <div class="fm-modal-footer">
            <button
                type="button"
                class="inline-flex w-fit rounded-lg bg-green-600 dark:bg-green-400 px-3 py-2 text-lg font-semibold items-center text-white dark:text-black shadow-lg transition-all ease-in-out hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                v-bind:disabled="!countFiles"
                v-on:click="uploadFiles"
            >
                {{ lang.btn.submit }}
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
    name: 'UploadModal',
    mixins: [modal, translate, helper],
    data() {
        return {
            newFiles: [],
            overwrite: 0,
        };
    },
    computed: {
        /**
         * Progress bar value - %
         * @returns {number}
         */
        progressBar() {
            return this.$store.state.fm.messages.actionProgress;
        },

        /**
         * Count of files selected for upload
         * @returns {number}
         */
        countFiles() {
            return this.newFiles.length;
        },

        /**
         * Calculate the size of all files
         * @returns {*|string}
         */
        allFilesSize() {
            let size = 0;

            for (let i = 0; i < this.newFiles.length; i += 1) {
                size += this.newFiles[i].size;
            }

            return this.bytesToHuman(size);
        },
    },
    methods: {
        /**
         * Select file or files
         * @param event
         */
        selectFiles(event) {
            // files selected?
            if (event.target.files.length === 0) {
                // no file selected
                this.newFiles = [];
            } else {
                // we have file or files
                this.newFiles = event.target.files;
            }
        },

        /**
         * Upload new files
         */
        uploadFiles() {
            // if files exists
            if (this.countFiles) {
                // upload files
                this.$store
                    .dispatch('fm/upload', {
                        files: this.newFiles,
                        overwrite: this.overwrite,
                    })
                    .then((response) => {
                        if (
                            response &&
                            response.data &&
                            response.data.result &&
                            response.data.result.status === 'success'
                        ) {
                            this.hideModal();
                        } else {
                            this.$store.commit('fm/setMessages', {
                                type: 'error',
                                message: this.lang.modal.upload.error,
                            });
                        }
                    });
            }
        },
    },
};
</script>
