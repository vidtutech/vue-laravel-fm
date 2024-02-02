<template>
    <div class="fm-modal-content">
        <div class="fm-modal-header">
            <h5 class="fm-modal-title">{{ lang.modal.editor.title }}</h5>
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
            <div class="flex flex-row gap-2 w-full items-center">
                <p class="min-w-fit">Editing File:</p>
                <small class="w-full max-w-[85%] truncate font-semibold text-lg">{{ selectedItem.basename }}</small>
            </div>
            <div class="flex size-full overflow-hidden border border-dark rounded-2xl dark:border-light">
                <codemirror
                    ref="fmCodeEditor"
                    v-bind:value="code"
                    v-bind:options="cmOptions"
                    v-bind:height="editorHeight"
                    v-on:change="onChange"
                />
            </div>
        </div>
        <div class="fm-modal-footer">
            <button
                type="button"
                class="inline-flex w-fit rounded-lg bg-green-400/80 px-3 py-2 text-lg font-semibold items-center text-black shadow-lg transition-all ease-in-out hover:scale-105 dark:text-white disabled:opacity-50 disabled:hover:scale-100"
                v-on:click="updateFile"
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
import Codemirror from 'codemirror-editor-vue3';
import 'codemirror/mode/shell/shell';
import 'codemirror/mode/css/css';
import 'codemirror/mode/sass/sass';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/vue/vue';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/php/php';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/lua/lua';
import 'codemirror/mode/perl/perl';
import 'codemirror/mode/python/python';
import 'codemirror/mode/swift/swift';
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/go/go';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/mode/properties/properties';
import modal from '../mixins/modal';
import translate from '../../../mixins/translate';

export default {
    name: 'TextEditModal',
    mixins: [modal, translate],
    components: { Codemirror },
    data() {
        return {
            code: '',
            editedCode: '',
        };
    },
    mounted() {
        // get file for edit
        this.$store
            .dispatch('fm/getFile', {
                disk: this.selectedDisk,
                path: this.selectedItem.path,
            })
            .then((response) => {
                // add code
                if (this.selectedItem.extension === 'json') {
                    this.code = JSON.stringify(response.data, null, 4);
                } else {
                    this.code = response.data;
                }
            });
    },
    computed: {
        /**
         * Selected disk
         * @returns {*}
         */
        selectedDisk() {
            return this.$store.getters['fm/selectedDisk'];
        },

        /**
         * Selected file
         * @returns {*}
         */
        selectedItem() {
            return this.$store.getters['fm/selectedItems'][0];
        },

        /**
         * CodeMirror options
         * @returns {{mode: *, lineNumbers: boolean, line: boolean, theme: string}}
         */
        cmOptions() {
            return {
                mode: this.$store.state.fm.settings.textExtensions[this.selectedItem.extension],
                theme: 'blackboard',
                lineNumbers: true,
                line: true,
            };
        },

        /**
         * Calculate the height of the code editor
         * @returns {number}
         */
        editorHeight() {
            if (this.$store.state.fm.modal.modalBlockHeight) {
                return this.$store.state.fm.modal.modalBlockHeight - 200;
            }

            return 300;
        },
    },
    methods: {
        /**
         * Update file
         */
        updateFile() {
            const formData = new FormData();
            // add disk name
            formData.append('disk', this.selectedDisk);
            // add path
            formData.append('path', this.selectedItem.dirname);
            // add updated file
            formData.append('file', new Blob([this.editedCode]), this.selectedItem.basename);

            this.$store.dispatch('fm/updateFile', formData).then((response) => {
                if (response.data.result.status === 'success') {
                    this.hideModal();
                }
            });
        },

        /**
         * Edited code
         * @param value
         */
        onChange(value) {
            this.editedCode = value;
        },
    },
};
</script>
