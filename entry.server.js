import createApp from './src/app.js';

const {
    app,
    router
} = createApp();

export default context => new Promise((resolve, reject) => {
    // server request url ==> router url
    router.push(context.url);
    router.onReady(_ => {
        resolve(app);
    }, reject);
})