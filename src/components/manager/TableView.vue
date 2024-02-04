<template>
    <div class="fm-table">
        <table class="table table-sm">
            <thead>
                <tr>
                    <th
                        title="`${ lang.manager.table.name }`"
                        class="w-full text-dark dark:text-light bg-white dark:bg-black"
                        v-on:click="sortBy('name')"
                    >
                        {{ lang.manager.table.name }}
                        <template v-if="sortSettings.field === 'name'">
                            <i class="bi bi-sort-down" v-show="sortSettings.direction === 'down'" />
                            <i class="bi bi-sort-up" v-show="sortSettings.direction === 'up'" />
                        </template>
                    </th>
                    <th
                        title="`${ lang.manager.table.size }`"
                        class="w-fit text-dark dark:text-light bg-white dark:bg-black"
                        v-on:click="sortBy('size')"
                    >
                        {{ lang.manager.table.size }}
                        <template v-if="sortSettings.field === 'size'">
                            <i class="bi bi-sort-down" v-show="sortSettings.direction === 'down'" />
                            <i class="bi bi-sort-up" v-show="sortSettings.direction === 'up'" />
                        </template>
                    </th>
                    <th
                        title="`${ lang.manager.table.type }`"
                        class="w-fit text-dark dark:text-light bg-white dark:bg-black"
                        v-on:click="sortBy('type')"
                    >
                        {{ lang.manager.table.type }}
                        <template v-if="sortSettings.field === 'type'">
                            <i class="bi bi-sort-down" v-show="sortSettings.direction === 'down'" />
                            <i class="bi bi-sort-up" v-show="sortSettings.direction === 'up'" />
                        </template>
                    </th>
                    <th
                        title="`${ lang.manager.table.date }`"
                        class="w-fit text-dark dark:text-light bg-white dark:bg-black"
                        v-on:click="sortBy('date')"
                    >
                        {{ lang.manager.table.date }}
                        <template v-if="sortSettings.field === 'date'">
                            <i class="bi bi-sort-down" v-show="sortSettings.direction === 'down'" />
                            <i class="bi bi-sort-up" v-show="sortSettings.direction === 'up'" />
                        </template>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="!isRootPath" id="fm-back-btn-table-view">
                    <td colspan="4" class="fm-content-item max-w-[1px]" v-on:click="levelUp">
                        <i class="bi bi-arrow-90deg-up" />
                    </td>
                </tr>
                <tr
                    v-for="(directory, index) in directories"
                    v-bind:key="`d-${index}`"
                    v-bind:class="{ 'table-info': checkSelect('directories', directory.path) }"
                    v-on:click="selectItem('directories', directory.path, $event)"
                    v-on:contextmenu.prevent="contextMenu(directory, $event)"
                >
                    <td
                        class="fm-content-item flex gap-2 unselectable"
                        v-bind:class="acl && directory.acl === 0 ? 'text-hidden' : ''"
                        v-on:dblclick="selectDirectory(directory.path)"
                    >
                        <i class="bi bi-folder"></i> {{ directory.basename }}
                    </td>
                    <td />
                    <td>{{ lang.manager.table.folder }}</td>
                    <td>
                        {{ timestampToDate(directory.timestamp) }}
                    </td>
                </tr>
                <tr
                    class="hover:bg-dark/20 dark:hover:bg-light/20"
                    v-for="(file, index) in files"
                    v-bind:key="`f-${index}`"
                    v-bind:class="{ 'table-info': checkSelect('files', file.path) }"
                    v-on:click="selectItem('files', file.path, $event)"
                    v-on:dblclick="selectAction(file.path, file.extension)"
                    v-on:contextmenu.prevent="contextMenu(file, $event)"
                >
                    <td
                        class="fm-content-item flex gap-2 unselectable"
                        v-bind:class="acl && file.acl === 0 ? 'text-hidden' : ''"
                    >
                        <i class="bi" v-bind:class="extensionToIcon(file.extension)" />
                        {{ file.filename ? file.filename : file.basename }}
                    </td>
                    <td>{{ bytesToHuman(file.size) }}</td>
                    <td>
                        {{ file.extension }}
                    </td>
                    <td>
                        {{ timestampToDate(file.timestamp) }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import translate from '../../mixins/translate';
import helper from '../../mixins/helper';
import managerHelper from './mixins/manager';

export default {
    name: 'table-view',
    mixins: [translate, helper, managerHelper],
    props: {
        manager: { type: String, required: true },
    },
    computed: {
        /**
         * Sort settings
         * @returns {*}
         */
        sortSettings() {
            return this.$store.state.fm[this.manager].sort;
        },
    },
    methods: {
        /**
         * Sort by field
         * @param field
         */
        sortBy(field) {
            this.$store.dispatch(`fm/${this.manager}/sortBy`, { field, direction: null });
        },
    },
};
</script>

<style lang="scss">
.fm-table {
    thead th {
        position: sticky;
        top: 0;
        z-index: 10;
        cursor: pointer;
        border-top: none;

        & > i {
            padding-left: 0.5rem;
        }
    }

    td {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .w-10 {
        width: 10%;
    }

    .w-65 {
        width: 65%;
    }

    .fm-content-item {
        cursor: pointer;
    }

    .text-hidden {
        color: #cdcdcd;
    }
}
</style>
