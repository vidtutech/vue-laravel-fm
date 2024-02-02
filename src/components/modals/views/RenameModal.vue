<template>
    <div class="fm-modal-content">
        <div class="fm-modal-header">
            <h5 class="fm-modal-title">{{ lang.modal.rename.title }}</h5>
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
            <div class="flex flex-col gap-3 justify-between p-3 rounded-xl">
                <label for="fm-input-rename">{{ lang.modal.rename.fieldName }}</label>
                <input
                    type="text"
                    class="w-full rounded-lg bg-dark/5 dark:bg-light/5 text-dark dark:text-light"
                    id="fm-input-rename"
                    v-focus
                    v-bind:class="{ 'border-vidtu-red': checkName }"
                    v-model="name"
                    v-on:keyup="validateName"
                />
                <div class="invalid-feedback text-vidtu-red font-semibold" v-show="checkName">
                    {{ lang.modal.rename.fieldFeedback }}
                    {{ directoryExist ? ` - ${lang.modal.rename.directoryExist}` : '' }}
                    {{ fileExist ? ` - ${lang.modal.rename.fileExist}` : '' }}
                </div>
            </div>
        </div>
        <div class="fm-modal-footer">
            <button
                type="button"
                class="inline-flex w-fit rounded-lg bg-green-400/80 px-3 py-2 text-lg font-semibold items-center text-black shadow-lg transition-all ease-in-out hover:scale-105 dark:text-white disabled:opacity-50 disabled:hover:scale-100"
                v-bind:disabled="submitDisable"
                v-on:click="rename"
            >
                {{ lang.btn.submit }}
            </button>
            <button
                type="button"
                class="inline-flex w-fit rounded-lg bg-black px-3 py-2 text-base font-semibold items-center text-white shadow-lg transition-all ease-in-out hover:scale-105 dark:bg-white dark:text-black"
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
    name: 'RenameModal',
    mixins: [modal, translate],
    data() {
        return {
            name: '',
            directoryExist: false,
            fileExist: false,
        };
    },
    computed: {
        /**
         * Selected item
         * @returns {*}
         */
        selectedItem() {
            return this.$store.getters[`fm/${this.activeManager}/selectedList`][0];
        },

        /**
         * Check new name
         * @returns {boolean}
         */
        checkName() {
            return this.directoryExist || this.fileExist || !this.name;
        },

        /**
         * Submit button disable
         * @returns {*|boolean}
         */
        submitDisable() {
            return this.checkName || this.name === this.selectedItem.basename;
        },
    },
    mounted() {
        // initiate item name
        this.name = this.selectedItem.basename;
    },
    methods: {
        /**
         * Validate item name
         */
        validateName() {
            if (this.name !== this.selectedItem.basename) {
                // if item - folder
                if (this.selectedItem.type === 'dir') {
                    // check folder name matches
                    this.directoryExist = this.$store.getters[`fm/${this.activeManager}/directoryExist`](this.name);
                } else {
                    // check file name matches
                    this.fileExist = this.$store.getters[`fm/${this.activeManager}/fileExist`](this.name);
                }
            }
        },

        /**
         * Rename item
         */
        rename() {
            // create new name with path
            const newName = this.selectedItem.dirname ? `${this.selectedItem.dirname}/${this.name}` : this.name;

            this.$store
                .dispatch('fm/rename', {
                    type: this.selectedItem.type,
                    newName,
                    oldName: this.selectedItem.path,
                })
                .then(() => {
                    // close modal window
                    this.hideModal();
                });
        },
    },
};
</script>
