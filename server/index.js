const fs = require('fs');
const path = require('path');

// 创建 express 服务
const express = require('express');
const server = express();

// 创建渲染器
const {
    createBundleRenderer
} = require('vue-server-renderer');
const serverBundle = require(path.resolve(__dirname, '../dist/server/vue-ssr-server-bundle.json'));
const clientManifest = require(path.resolve(__dirname, '../dist/client/vue-ssr-client-manifest.json'));
const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template: fs.readFileSync(path.resolve(__dirname, '../public/index.temp.html'), 'utf-8'),
    clientManifest
});

// 处理静态文件请求
server.use(express.static(path.resolve(__dirname, '../dist/client'), {
    index: false
}));


server.get('*', async (req, res) => {
    try {
        const context = {
            url: req.url,
            title: ``,
            metas: ``,
        }
        const html = await renderer.renderToString(context);
        res.send(html);
    } catch (error) {
        console.log(error);
        res.status(500).end('Internal Server Error')
    }
});


server.listen(3000, _ => {
    console.log("http://localhost:3000");
});