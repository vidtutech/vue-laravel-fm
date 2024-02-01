<template>
    <div class="fm-additions-file-list">
        <div
            class="flex justify-between p-2 hover:bg-dark/10 hover:dark:bg-light/10 rounded"
            v-for="(item, index) in selectedItems"
            v-bind:key="index"
        >
            <div class="w-full truncate">
                <span v-if="item.type === 'dir'" class="flex gap-2">
                    <i class="bi bi-folder" />{{ item.basename }}
                </span>
                <span v-else>
                    <i class="bi" v-bind:class="extensionToIcon(item.extension)" /> {{ item.basename }}
                </span>
            </div>
            <div class="text-center min-w-fit" v-if="item.type === 'file'">
                {{ bytesToHuman(item.size) }}
            </div>
        </div>
    </div>
</template>

<script>
import helper from '../../../mixins/helper';

export default {
    name: 'SelectedFileList',
    mixins: [helper],
    computed: {
        /**
         * Selected files and folders
         * @returns {*}
         */
        selectedItems() {
            return this.$store.getters['fm/selectedItems'];
        },
    },
};
</script>
