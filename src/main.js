/* eslint-disable dot-notation */
import { createApp } from 'vue';
import { createStore } from 'vuex';
import fm from './store';
import FMApp from './FileManager.vue';
import ClickOutside from './directives/ClickOutside';

export const loadFm = async (path = 'room') => {
    const app = createApp(FMApp);

    const storeModules = Object.assign({}, Object.freeze({ strict: true, modules: { fm } }));

    const store = createStore(storeModules);

    app.use(store).directive('click-outside', ClickOutside);

    window['fm'] = app;
    window['sharedFm'] = app;

    if (path === 'shared') {
        window['sharedFm'].mount('#shared-fm');
    } else {
        window['fm'].mount('#fm');
    }
};

window.loadFm = loadFm;
