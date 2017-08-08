// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
// import Vuex from 'vuex';
// import axios from 'axios';
import App from './App';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';

import './common/stylus/index.styl'; // 全局引用刚开始因为stylus-loader版本问题有一个bug

Vue.use(VueRouter);
Vue.use(VueResource);
// Vue.use(Vuex);
// Vue.prototype.$http = axios;

const routes = [
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller }
];

const router = new VueRouter({
  linkActiveClass: 'active', // 和a标签的class有关
  routes // （缩写）相当于 routes: routes
});

/* eslint-disable no-new */
// 这句话很关键
new Vue({
  el: '#app',
  router,
  render: h => h(App)
  // render函数是渲染一个视图,然后提供给el挂载,=> 是es6写法
});

router.push('goods');
// 默认在商品页面

