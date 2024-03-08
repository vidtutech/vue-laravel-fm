<template>
    <div class="flex flex-col size-full">
        <div class="flex flex-row gap-2 w-full items-center">
            <!-- <disk-list v-bind:manager="manager" /> -->
            <bread-crumb v-bind:manager="manager" />
        </div>
        <div class="size-full overflow-hidden">
            <table-view v-if="viewType === 'table'" v-bind:manager="manager" />
            <grid-view v-else v-bind:manager="manager" />
        </div>
    </div>
</template>

<script>
// Components
import DiskList from './DiskList.vue';
import BreadCrumb from './BreadCrumb.vue';
import TableView from './TableView.vue';
import GridView from './GridView.vue';

export default {
    name: 'Manager',
    components: {
        DiskList,
        BreadCrumb,
        TableView,
        GridView,
    },
    props: {
        manager: { type: String, required: true },
    },
    computed: {
        /**
         * view type - grid or table
         * @returns {any}
         */
        viewType() {
            return this.$store.state.fm[this.manager].viewType;
        },
    },
};
</script>
