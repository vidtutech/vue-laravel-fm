/* eslint-disable dot-notation */
import { createApp } from 'vue';
import { createStore } from 'vuex';
import fm from './store';
import FMApp from './FileManager.vue';
import ClickOutside from './directives/ClickOutside';

const loadFm = async (path = 'documents') => {
    const app = createApp(FMApp);

    const storeModules = Object.freeze({ strict: true, modules: { fm } });

    const store = createStore(storeModules);

    app.use(store).directive('click-outside', ClickOutside);

    window['fm'] = app;

    window['sharedFm'] = app;

    if (path === 'shared-documents') {
        window['sharedFm'].mount('#shared-documents-fm');
    } else {
        window['fm'].mount('#documents-fm');
    }
};

window.loadFm = loadFm;

export default loadFm;
