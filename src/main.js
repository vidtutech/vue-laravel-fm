import { createApp } from 'vue';
import { createStore } from 'vuex';
// store
import fm from './store';
// App
import FMApp from './FileManager.vue';
import SharedFMApp from './FileManager.vue';

// create new store
const fmStore = createStore({
    strict: true,
    modules: { fm: { ...fm } }, // pass by value, not reference
});

const sharedFmStore = createStore({
    strict: true,
    modules: { fm: { ...fm } }, // pass by value, not reference
});

window.loadFm = (path = 'room') => {
    const targetElement = path === 'shared' ? '#shared-fm' : '#fm';

    if (document.querySelector(targetElement)) {
        // window.unloadFm(path);
        if (path === 'shared') {
            window.fm = null;
            window.sharedFm = createApp(SharedFMApp).use(sharedFmStore);
        } else {
            window.sharedFm = null;
            window.fm = createApp(FMApp).use(fmStore);
        }
    } else {
        console.error(`Target element ${targetElement} not found. Cannot mount Vue instance.`);
    }
};

window.unloadFm = (path = 'room') => {
    if (path === 'shared') {
        if (window['sharedFm']) window['sharedFm']['unmount']();
        window['sharedFm'] = null;
    } else {
        if (window['fm']) window['fm']['unmount']();
        window['fm'] = null;
    }
};
