import mutations from './mutations';
import getters from './getters';

// languages
import en from '../../lang/en';

export default {
    namespaced: true,
    state() {
        return {
            // ACL
            acl: null,

            // App version
            version: '3.1.1',

            // axios headers
            headers: {},

            // axios default URL
            baseUrl: null,

            /**
             * File manager windows configuration
             * 1 - only one file manager window
             * 2 - one file manager window with directories tree module
             * 3 - two file manager windows
             */
            windowsConfig: null,

            // App language
            lang: null,

            // Translations (/src/lang)
            translations: {
                en: Object.freeze(en),
            },

            // show or hide hidden files
            hiddenFiles: false,

            // Context menu items
            contextMenu: [
                [
                    {
                        name: 'open',
                        icon: 'bi-folder2-open',
                    },
                    {
                        name: 'audioPlay',
                        icon: 'bi-play',
                    },
                    {
                        name: 'videoPlay',
                        icon: 'bi-play',
                    },
                    {
                        name: 'view',
                        icon: 'bi-eye',
                    },
                    {
                        name: 'edit',
                        icon: 'bi-pen',
                    },
                    {
                        name: 'select',
                        icon: 'bi-check2',
                    },
                    {
                        name: 'download',
                        icon: 'bi-download',
                    },
                ],
                [
                    {
                        name: 'copy',
                        icon: 'bi-files',
                    },
                    {
                        name: 'cut',
                        icon: 'bi-scissors',
                    },
                    {
                        name: 'rename',
                        icon: 'bi-pencil-square',
                    },
                    {
                        name: 'paste',
                        icon: 'bi-clipboard',
                    },
                    {
                        name: 'zip',
                        icon: 'bi-file-zip',
                    },
                    {
                        name: 'unzip',
                        icon: 'bi-file-zip-fill',
                    },
                ],
                [
                    {
                        name: 'delete',
                        icon: 'bi-trash text-danger',
                    },
                ],
                [
                    {
                        name: 'properties',
                        icon: 'bi-card-list',
                    },
                ],
            ],

            // Image extensions for view and preview
            imageExtensions: ['png', 'jpg', 'jpeg', 'gif', 'webp'],

            docExtensions: ['pdf'],

            // Image extensions for cropping
            cropExtensions: ['png', 'jpg', 'jpeg', 'webp'],

            // audio extensions for play
            audioExtensions: ['ogg', 'mp3', 'aac', 'wav'],

            // video extensions for play
            videoExtensions: ['webm', 'mp4'],

            // File extensions for code editor
            textExtensions: {
                sh: 'text/x-sh',
                // styles
                css: 'text/css',
                less: 'text/x-less',
                sass: 'text/x-sass',
                scss: 'text/x-scss',
                html: 'text/html',
                // js
                js: 'text/javascript',
                ts: 'text/typescript',
                vue: 'text/x-vue',
                // text
                htaccess: 'text/plain',
                env: 'text/plain',
                txt: 'text/plain',
                log: 'text/plain',
                ini: 'text/x-ini',
                xml: 'application/xml',
                md: 'text/x-markdown',
                // c-like
                java: 'text/x-java',
                c: 'text/x-csrc',
                cpp: 'text/x-c++src',
                cs: 'text/x-csharp',
                scl: 'text/x-scala',
                php: 'application/x-httpd-php',
                // DB
                sql: 'text/x-sql',
                // other
                pl: 'text/x-perl',
                py: 'text/x-python',
                lua: 'text/x-lua',
                swift: 'text/x-swift',
                rb: 'text/x-ruby',
                go: 'text/x-go',
                yaml: 'text/x-yaml',
                json: 'application/json',
            },
        };
    },
    mutations,
    getters,
};
