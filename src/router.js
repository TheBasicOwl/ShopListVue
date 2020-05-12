import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/list/:listname',
    name: 'Home',
    component: () => import('./pages/ShopingList.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('./pages/about.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
