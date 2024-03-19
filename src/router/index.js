import Vue from 'vue'
import VueRouter from 'vue-router'

// 解决跳转重复路由报错问题的代码
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  return routerPush.call(this, location).catch(err => { })
};

Vue.use(VueRouter)

const routes = [
  {
    path: '/printPDF',
    name: 'Home',
    component: () => import( /* webpackChunkName: "about" */ "../views/Home.vue")
  },
  {
    path: '/print',
    name: 'print',
    component: () => import(/* webpackChunkName: "about" */ "../views/Print.vue")
  }
]


export default function createRouter() {
  return new VueRouter({
    mode: 'history',
    routes
  })
}