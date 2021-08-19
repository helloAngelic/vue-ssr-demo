"use strict";

var fs = require('fs');

var path = require('path'); // 创建 express 服务


var express = require('express');

var server = express(); // 创建渲染器

var _require = require('vue-server-renderer'),
    createBundleRenderer = _require.createBundleRenderer;

var serverBundle = require(path.resolve(__dirname, '../dist/server/vue-ssr-server-bundle.json'));

var clientManifest = require(path.resolve(__dirname, '../dist/client/vue-ssr-client-manifest.json'));

var renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: fs.readFileSync(path.resolve(__dirname, '../public/index.temp.html'), 'utf-8'),
  clientManifest: clientManifest
}); // 处理静态文件请求

server.use(express["static"](path.resolve(__dirname, '../dist/client'), {
  index: false
}));
server.get('*', function _callee(req, res) {
  var context, html;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          context = {
            url: req.url,
            title: "",
            metas: ""
          };
          _context.next = 4;
          return regeneratorRuntime.awrap(renderer.renderToString(context));

        case 4:
          html = _context.sent;
          res.send(html);
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).end('Internal Server Error');

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
server.listen(3000, function (_) {
  console.log("http://localhost:3000");
});