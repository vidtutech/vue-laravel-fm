<template>
    <div class="fm-disk-list">
        <ul class="list-inline">
            <li class="list-inline-item" v-for="(disk, index) in disks" v-bind:key="index">
                <span
                    title="`${ disk }`"
                    class="badge text-dark dark:text-light font-bold gap-1 cursor-pointer"
                    v-on:click="selectDisk(disk)"
                    v-bind:class="[disk === selectedDisk ? 'bg-dark/10 dark:bg-light/10' : 'bg-dark/5 dark:bg-light/5']"
                >
                    <i class="bi bi-hdd"></i> {{ disk }}
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'DiskList',
    props: {
        // manager name - left or right
        manager: { type: String, required: true },
    },
    computed: {
        /**
         * Disk list
         * @returns {Array}
         */
        disks() {
            return this.$store.getters['fm/diskList'];
        },

        /**
         * Selected Disk for this manager
         * @returns {any}
         */
        selectedDisk() {
            return this.$store.state.fm[this.manager].selectedDisk;
        },
    },
    methods: {
        /**
         * Select disk
         * @param disk
         */
        selectDisk(disk) {
            if (this.selectedDisk !== disk) {
                this.$store.dispatch('fm/selectDisk', {
                    disk,
                    manager: this.manager,
                });
            }
        },
    },
};
</script>
