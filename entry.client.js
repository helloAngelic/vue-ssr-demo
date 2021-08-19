import createApp from './src/app.js';

const {
    app,
    router
} = createApp();

router.onReady(_ => {
    app.$mount('#app');
})