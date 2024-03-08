<template>
    <div class="fm-grid">
        <div v-if="!isRootPath" v-on:click="levelUp" class="fm-grid-item text-center" id="fm-back-btn-grid-view">
            <div class="fm-item-icon">
                <i class="bi bi-arrow-90deg-up text-4xl" />
            </div>
            <div class="fm-item-info"><strong>..</strong></div>
        </div>

        <div
            class="fm-grid-item text-center unselectable"
            v-for="(directory, index) in directories"
            v-bind:key="`d-${index}`"
            v-bind:title="directory.basename"
            v-bind:class="{ active: checkSelect('directories', directory.path) }"
            v-on:click="selectItem('directories', directory.path, $event)"
            v-on:dblclick.stop="selectDirectory(directory.path)"
            v-on:contextmenu.prevent="contextMenu(directory, $event)"
        >
            <div class="fm-item-icon">
                <i class="bi" v-bind:class="acl && directory.acl === 0 ? 'bi-lock' : 'bi-folder'" />
            </div>
            <div class="fm-item-info">
                <span class="text-sm truncate">{{ directory.basename }}</span>
            </div>
        </div>

        <div
            class="fm-grid-item text-center unselectable"
            v-for="(file, index) in files"
            v-bind:key="`f-${index}`"
            v-bind:title="file.basename"
            v-bind:class="{ active: checkSelect('files', file.path) }"
            v-on:click="selectItem('files', file.path, $event)"
            v-on:dblclick="selectAction(file.path, file.extension)"
            v-on:contextmenu.prevent="contextMenu(file, $event)"
        >
            <div class="fm-item-icon">
                <i v-if="acl && file.acl === 0" class="bi bi-file-earmark-lock" />
                <thumbnail v-else-if="thisImage(file.extension)" v-bind:disk="disk" v-bind:file="file"></thumbnail>
                <i v-else class="bi" v-bind:class="extensionToIcon(file.extension)" />
            </div>
            <div class="fm-item-info">
                <span class="text-sm truncate">{{ `${file.filename}.${file.extension}` }}</span>
                <span class="text-xs truncate">{{ bytesToHuman(file.size) }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import translate from '../../mixins/translate';
import helper from '../../mixins/helper';
import managerHelper from './mixins/manager';
import Thumbnail from './Thumbnail.vue';

export default {
    name: 'GridView',
    components: { Thumbnail },
    mixins: [translate, helper, managerHelper],
    data() {
        return {
            disk: '',
        };
    },
    props: {
        manager: { type: String, required: true },
    },
    mounted() {
        this.disk = this.selectedDisk;
    },
    beforeUpdate() {
        // if disk changed
        if (this.disk !== this.selectedDisk) {
            this.disk = this.selectedDisk;
        }
    },
    computed: {
        /**
         * Image extensions list
         * @returns {*}
         */
        imageExtensions() {
            return this.$store.state.fm.settings.imageExtensions;
        },
    },
    methods: {
        /**
         * Check file extension (image or no)
         * @param extension
         * @returns {boolean}
         */
        thisImage(extension) {
            // extension not found
            if (!extension) return false;

            return this.imageExtensions.includes(extension.toLowerCase());
        },
    },
};
</script>
