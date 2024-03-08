<template>
    <div class="fm-modal-content">
        <div class="fm-modal-header">
            <h5 class="fm-modal-title">{{ lang.modal.status.title }}</h5>
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
            <div v-if="errors.length">
                <ul class="list-unstyled">
                    <li
                        v-for="(item, index) in errors"
                        v-bind:key="index"
                        class="flex justify-between items-center p-2 hover:bg-dark/10 hover:dark:bg-light/10 rounded"
                    >
                        {{ item.status }} - {{ item.message }}
                    </li>
                </ul>
            </div>
            <div v-else>
                <span>{{ lang.modal.status.noErrors }}</span>
            </div>
        </div>
        <div class="fm-modal-footer">
            <button
                type="button"
                v-bind:disabled="!errors.length"
                class="inline-flex w-fit rounded-lg bg-vidtu-red/80 px-3 py-2 text-lg font-semibold text-black shadow-lg transition-all ease-in-out hover:scale-105 dark:text-white disabled:opacity-50 disabled:pointer-events-none"
                v-on:click="clearErrors"
            >
                {{ lang.btn.clear }}
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
    name: 'StatusModal',
    mixins: [modal, translate],
    computed: {
        /**
         * Application errors
         * @returns {any}
         */
        errors() {
            return this.$store.state.fm.messages.errors;
        },
    },
    methods: {
        /**
         * Clear all errors
         */
        clearErrors() {
            this.$store.commit('fm/messages/clearErrors');
        },
    },
};
</script>
