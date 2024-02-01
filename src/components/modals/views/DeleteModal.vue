<template>
    <div class="fm-modal-content fm-modal-delete">
        <div class="fm-modal-header">
            <h5 class="fm-modal-title">{{ lang.modal.delete.title }}</h5>
            <button type="button" class="btn-close" aria-label="Close" v-on:click="hideModal"></button>
        </div>
        <div class="fm-modal-body">
            <div v-if="selectedItems.length">
                <selected-file-list />
            </div>
            <div v-else>
                <span class="text-danger">{{ lang.modal.delete.noSelected }}</span>
            </div>
        </div>
        <div class="fm-modal-footer">
            <button
                type="button"
                class="inline-flex w-fit rounded-lg bg-vidtu-red/80 px-3 py-2 text-lg font-semibold text-black shadow-lg transition-all ease-in-out hover:scale-105 dark:text-white"
                v-on:click="deleteItems"
            >
                {{ lang.modal.delete.title }}
            </button>
            <button
                type="button"
                class="inline-flex w-fit rounded-lg bg-black px-3 py-2 text-base font-bold text-white shadow-lg transition-all ease-in-out hover:scale-105 dark:bg-white dark:text-black"
                v-on:click="hideModal"
            >
                {{ lang.btn.cancel }}
            </button>
        </div>
    </div>
</template>

<script>
import SelectedFileList from '../additions/SelectedFileList.vue';
import modal from '../mixins/modal';
import translate from '../../../mixins/translate';

export default {
    name: 'DeleteModal',
    mixins: [modal, translate],
    components: { SelectedFileList },
    computed: {
        /**
         * Files and folders for deleting
         * @returns {*}
         */
        selectedItems() {
            return this.$store.getters['fm/selectedItems'];
        },
    },
    methods: {
        /**
         * Delete selected directories and files
         */
        deleteItems() {
            // create items list for delete
            const items = this.selectedItems.map((item) => ({
                path: item.path,
                type: item.type,
            }));

            this.$store.dispatch('fm/delete', items).then(() => {
                this.hideModal();
            });
        },
    },
};
</script>
