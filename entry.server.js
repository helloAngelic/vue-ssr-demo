import createApp from './src/app.js';

export default context => new Promise((resolve, reject) => {
    const {
        app,
        router,
        store
    } = createApp();
    // server request url ==> router url
    router.push(context.url);
    router.onReady(_ => {
        const matchedComponents = router.getMatchedComponents()
        if (!matchedComponents.length) {
            return reject({ code: 404 })
        }
        console.log(1);
        // resolve(app);
        Promise.all(matchedComponents.map(Component => {
            if (Component.asyncData) {
                console.log(2);
                return Component.asyncData({
                    store,
                    route: router.currentRoute
                })
            }
        })).then(() => {
            console.log('complete');
            // 在所有预取钩子(preFetch hook) resolve 后，
            // 我们的 store 现在已经填充入渲染应用程序所需的状态。
            // 当我们将状态附加到上下文，
            // 并且 `template` 选项用于 renderer 时，
            // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
            context.state = store.state

            resolve(app)
        }).catch(reject)
    }, reject);
})