const fs = require('fs');
const path = require('path');
const clc = require("cli-color");

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
    index: false // 不设置为 false 会导致无法查看网页源代码，搜索引擎将无法爬取
}));
// // 请求超时中间件
// server.use(function (rqe, res, next) {
//     res.setTimeout(120 * 1000, function () {
//         return res.status(408).send('请求超时')
//     })
// })

// 通用服务 ==> 查看网页都是 GET 请求
server.get('*', async (req, res) => {
    try {
        const context = {
            url: req.url, // 请求 url ==> router.push(url)
            title: ``, // 网页标题
            metas: ``, // 写网站关键词，网站描述，给爬虫看
        }
        const html = await renderer.renderToString(context);
        console.log('3', context);
        res.send(html);
    } catch (error) {
        console.log(clc.red.bold(error));
        res.status(500).end('Internal Server Error')
    }
});

// 监听服务
server.listen(3000, _ => {
    console.log(clc.green.underline.bold("http://localhost:3000"));
});