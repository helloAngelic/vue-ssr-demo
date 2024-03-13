import createApp from './src/app.js';

const {
    app,
    router,
    store
} = createApp();

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(_ => {
    app.$mount('#app');
})