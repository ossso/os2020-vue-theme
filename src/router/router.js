import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      sidebar: true,
    },
    component: () => import('@/views/list.vue'),
  }, {
    path: '/cate',
    name: 'Category',
    meta: {
      sidebar: true,
    },
    component: () => import('@/views/list.vue'),
  }, {
    path: '/',
    name: 'Date',
    meta: {
      sidebar: true,
    },
    component: () => import('@/views/list.vue'),
  }, {
    path: '/',
    name: 'Author',
    meta: {
      sidebar: true,
    },
    component: () => import('@/views/list.vue'),
  }, {
    path: '/',
    name: 'Tags',
    meta: {
      sidebar: true,
    },
    component: () => import('@/views/list.vue'),
  }, {
    path: '/',
    name: 'Search',
    meta: {
      sidebar: true,
    },
    component: () => import('@/views/list.vue'),
  }, {
    path: '/',
    name: 'Article',
    meta: {
      sidebar: true,
    },
    component: () => import('@/views/article.vue'),
  }, {
    path: '/',
    name: 'Page',
    meta: {
      sidebar: true,
    },
    component: () => import('@/views/article.vue'),
  },

  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue'),
  },

  {
    path: '*',
    redirect: '/404',
  },
];

const router = new VueRouter({
  mode: window.$os2020 ? window.$os2020.routerMode : 'history',
  routes,
});

export default router;
