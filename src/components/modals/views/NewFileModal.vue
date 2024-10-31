<template>
    <div class="fm-modal-content">
        <div class="fm-modal-header">
            <h5 class="fm-modal-title">
                {{ lang.modal.newFile.title }}
            </h5>
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
            <div class="flex flex-col gap-3 justify-between p-3 rounded-xl">
                <label for="fm-file-name">{{ lang.modal.newFile.fieldName }}</label>
                <input
                    type="text"
                    class="w-full rounded-lg bg-dark/5 dark:bg-light/5 text-dark dark:text-light"
                    id="fm-file-name"
                    v-focus
                    v-bind:class="{ 'border-vidtu-red': fileExist }"
                    v-model="fileName"
                    v-on:keyup="validateFileName"
                />
                <div class="invalid-feedback text-vidtu-red font-semibold" v-show="fileExist">
                    {{ lang.modal.newFile.fieldFeedback }}
                </div>
            </div>
        </div>
        <div class="fm-modal-footer">
            <button
                type="button"
                class="inline-flex w-fit rounded-lg bg-green-600 dark:bg-green-400 px-3 py-2 text-lg font-semibold items-center text-white dark:text-black shadow-lg transition-all ease-in-out hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                v-bind:disabled="!submitActive"
                v-on:click="addFile"
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

export default {
    name: 'NewFileModal',
    mixins: [modal, translate],
    data() {
        return {
            // name for new file
            fileName: '',

            // file exist
            fileExist: false,
        };
    },
    computed: {
        /**
         * Submit button - active or no
         * @returns {string|boolean}
         */
        submitActive() {
            return this.fileName && !this.fileExist;
        },
    },
    methods: {
        /**
         * Check the file name if it exists or not.
         */
        validateFileName() {
            if (this.fileName) {
                this.fileExist = this.$store.getters[`fm/${this.activeManager}/fileExist`](this.fileName);
            } else {
                this.fileExist = false;
            }
        },

        /**
         * Create new file
         */
        addFile() {
            this.$store.dispatch('fm/createFile', this.fileName).then((response) => {
                if (response.data.result.status === 'success') {
                    this.hideModal();
                }
            });
        },
    },
};
</script>
