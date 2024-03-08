/* eslint-disable dot-notation */
import { createApp } from 'vue';
import { createStore } from 'vuex';
import fm from './store';
import ClickOutside from './directives/ClickOutside';
// import sharedFm from './store';
import FMApp from './FileManager.vue';
// import SharedFMApp from './FileManager.vue';

window.loadFm = async (path = 'room') => {
    console.log(`fm.min.js :: loadFm :: ${path}`, path === 'shared' ? window['sharedFm'] : window['fm']);

    const app = createApp(FMApp);

    const store = createStore({ strict: true, modules: { fm } });

    app.directive('click-outside', ClickOutside);

    if (path === 'shared') {
        if (window['sharedFm'] && window['sharedFm'].unmount) window['sharedFm'].unmount();

        window['sharedFm'] = app.use(store);

        window['sharedFm'].mount('#shared-fm');
    } else {
        if (window['fm'] && window['fm'].unmount) window['fm'].unmount();

        window['fm'] = app.use(store);

        window['fm'].mount('#fm');
    }

    console.log(`fm.min.js :: loaded :: ${path}`, path === 'shared' ? window['sharedFm'] : window['fm']);
};
