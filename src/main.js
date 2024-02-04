/* eslint-disable dot-notation */
import { createApp } from 'vue';
import { createStore } from 'vuex';
import fm from './store';
// import sharedFm from './store';
import FMApp from './FileManager.vue';
// import SharedFMApp from './FileManager.vue';

window.loadFm = async (path = 'room') => {
    console.log(`fm.min.js :: loadFm :: ${path}`, path === 'shared' ? window['sharedFm'] : window['fm']);

    if (path === 'shared') {
        if (window['sharedFm'] && window['sharedFm'].unmount) window['sharedFm'].unmount();

        window['sharedFm'] = createApp(FMApp).use(createStore({ strict: true, modules: { fm } }));

        window['sharedFm'].mount('#shared-fm');
    } else {
        if (window['fm'] && window['fm'].unmount) window['fm'].unmount();

        window['fm'] = createApp(FMApp).use(createStore({ strict: true, modules: { fm } }));

        window['fm'].mount('#fm');
    }

    console.log(`fm.min.js :: loaded :: ${path}`, path === 'shared' ? window['sharedFm'] : window['fm']);
};
