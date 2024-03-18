const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const merge = require('lodash.merge');

// 判断 build:server OR build:client
const TARGET_NODE = process.env.WEBPACK_TARGET === "node";
const target = TARGET_NODE ? "server" : "client";

module.exports = {
    outputDir: `./dist/${target}`,
    // devServer: {
    //     port: 9527,
    //     open: true,
    //     // client: {
    //     //     overlay: false
    //     // },
    //     // historyApiFallback: true,
    //     // // allowedHosts: 'all',
    //     proxy: {
    //         '/': {
    //             target: 'http://172.22.128.151:36812/api',
    //             changeOrigin: true,
    //             ws: false,
    //         }
    //     }
    // },
    configureWebpack: _ => ({
        entry: `./entry.${target}.js`,
        output: {
            libraryTarget: TARGET_NODE ? 'commonjs2' : undefined
        },
        devtool: 'source-map',
        target: TARGET_NODE ? "node" : "web",
        module: {},
        optimization: TARGET_NODE ? {
            splitChunks: {
                name: "manifest",
                minChunks: Infinity
            }
        } : {},
        plugins: (_ => [
            TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin(),
        ].filter(item => item != null))()
    }),
    chainWebpack: config => {
        config.module
            .rule("vue")
            .use("vue-loader")
            .tap(options => {
                merge(options, {
                    optimizeSSR: false
                });
            });
    }
}