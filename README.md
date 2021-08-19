# 前言

鉴于 vue3.x 与 vue-server-renderer@2.6.x 不适配，本次使用 vue2.x 搭建 vue ssr

+ vue
+ vue-router
+ vuex
+ express
+ vue-server-renderer
+ lodash.merge
+ cross-env



# 打包
1. server：`yarn build:server`
2. client：`yarn build:client`
3. build: `yarn build` == `yarn build:client && yarn build:server`


# 启动
```
yarn start
```
  OR
```
node ./server/index.js
```






