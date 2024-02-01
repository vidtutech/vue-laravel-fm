<template>
    <div
        ref="contextMenu"
        v-if="menuVisible"
        v-bind:style="menuStyle"
        v-on:blur="closeMenu"
        class="fm-context-menu bg-light dark:bg-dark shadow-sm shadow-dark/50 dark:shadow-light/50 rounded-2xl overflow-hidden"
        tabindex="-1"
    >
        <ul
            v-for="(group, index) in menu"
            v-bind:key="`g-${index}`"
            class="list-unstyled text-dark dark:text-light border-b border-dark/50 dark:border-light/50"
        >
            <template v-for="(item, index) in group">
                <li
                    class="hover:bg-dark/20 dark:hover:bg-light/20 flex gap-4 w-full p-2 px-4"
                    title="`${lang.contextMenu[item.name]}`"
                    v-if="showMenuItem(item.name)"
                    v-on:click="menuAction(item.name)"
                    v-bind:key="`i-${index}`"
                >
                    <i class="bi" v-bind:class="item.icon" />
                    {{ lang.contextMenu[item.name] }}
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
import EventBus from '../../emitter';
import translate from '../../mixins/translate';
import contextMenu from './mixins/contextMenu';
import contextMenuRules from './mixins/contextMenuRules';
import contextMenuActions from './mixins/contextMenuActions';

export default {
    name: 'ContextMenu',
    mixins: [translate, contextMenu, contextMenuRules, contextMenuActions],
    data() {
        return {
            menuVisible: false,
            menuStyle: {
                top: 0,
                left: 0,
            },
        };
    },
    mounted() {
        /**
         * Listen events
         * 'contextMenu'
         */
        EventBus.on('contextMenu', (event) => this.showMenu(event));
    },
    computed: {
        /**
         * Context menu items
         * @returns {*}
         */
        menu() {
            return this.$store.state.fm.settings.contextMenu;
        },
    },
    methods: {
        /**
         * Show context menu
         * @param event
         */
        showMenu(event) {
            console.log(event, this.$refs);
            if (this.selectedItems) {
                this.menuVisible = true;

                // focus on menu
                this.$nextTick(() => {
                    if (this.$refs.contextMenu) {
                        this.$refs.contextMenu.focus();
                        this.setMenu(event.pageY, event.pageX);
                    }
                });
            }
        },

        /**
         * Set context menu coordinates
         * @param top
         * @param left
         */
        setMenu(top, left) {
            // get parent el (.fm-body)
            const el = this.$refs.contextMenu.parentNode;

            // get parent el size
            const elSize = el.getBoundingClientRect();

            // actual coordinates of the block
            const elY = window.scrollY + elSize.top;
            const elX = window.scrollX + elSize.left;

            // calculate the preliminary coordinates
            let menuY = top - elY;
            let menuX = left - elX;

            // calculate max X and Y coordinates
            const maxY = elY + (el.offsetHeight - this.$refs.contextMenu.offsetHeight - 25);
            const maxX = elX + (el.offsetWidth - this.$refs.contextMenu.offsetWidth - 25);

            if (top > maxY) menuY = maxY - elY;
            if (left > maxX) menuX = maxX - elX;

            // set coordinates
            this.menuStyle.top = `${menuY}px`;
            this.menuStyle.left = `${menuX}px`;
        },

        /**
         * Close context menu
         */
        closeMenu() {
            this.menuVisible = false;
        },

        /**
         * Show context menu item
         * @param name
         * @returns {*}
         */
        showMenuItem(name) {
            if (Object.prototype.hasOwnProperty.call(this, `${name}Rule`)) {
                return this[`${name}Rule`]();
            }

            return false;
        },

        /**
         * Call actions when clicking the context menu
         * @param name
         */
        menuAction(name) {
            if (Object.prototype.hasOwnProperty.call(this, `${name}Action`)) {
                this[`${name}Action`]();
            }
            // close context menu
            this.closeMenu();
        },
    },
};
</script>

<style lang="scss">
.fm-context-menu {
    position: absolute;
    z-index: 9997;
    border-radius: 5px;

    &:focus {
        outline: none;
    }

    .list-unstyled {
        margin-bottom: 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    }

    ul > li:not(.disabled) {
        cursor: pointer;
    }
}
</style>
