<template>
    <div class="fm-modal-content">
        <div class="fm-modal-header">
            <h5 class="fm-modal-title">
                {{ lang.modal.newFolder.title }}
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
                <label for="fm-folder-name">{{ lang.modal.newFolder.fieldName }}</label>
                <input
                    type="text"
                    class="w-full rounded-lg bg-dark/5 dark:bg-light/5 text-dark dark:text-light"
                    id="fm-folder-name"
                    v-focus
                    v-bind:class="{ 'border-vidtu-red': directoryExist }"
                    v-model="directoryName"
                    v-on:keyup="validateDirName"
                />
                <div class="invalid-feedback text-vidtu-red font-semibold" v-show="directoryExist">
                    {{ lang.modal.newFolder.fieldFeedback }}
                </div>
            </div>
        </div>
        <div class="fm-modal-footer">
            <button
                type="button"
                class="inline-flex w-fit rounded-lg bg-green-400/80 px-3 py-2 text-lg font-semibold items-center text-black shadow-lg transition-all ease-in-out hover:scale-105 dark:text-white disabled:opacity-50 disabled:hover:scale-100"
                v-bind:disabled="!submitActive"
                v-on:click="addFolder"
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
    name: 'NewFolderModal',
    mixins: [modal, translate],
    data() {
        return {
            // name for new directory
            directoryName: '',

            // directory exist
            directoryExist: false,
        };
    },
    computed: {
        /**
         * Submit button - active or no
         * @returns {string|boolean}
         */
        submitActive() {
            return this.directoryName && !this.directoryExist;
        },
    },
    methods: {
        /**
         * Check the folder name if it exists or not.
         */
        validateDirName() {
            if (this.directoryName) {
                this.directoryExist = this.$store.getters[`fm/${this.activeManager}/directoryExist`](
                    this.directoryName
                );
            } else {
                this.directoryExist = false;
            }
        },

        /**
         * Create new directory
         */
        addFolder() {
            this.$store.dispatch('fm/createDirectory', this.directoryName).then((response) => {
                if (response.data.result.status === 'success') {
                    this.hideModal();
                }
            });
        },
    },
};
</script>
