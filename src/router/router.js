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
    path: '/cate/:cateId',
    name: 'Category',
    meta: {
      sidebar: true,
    },
    component: () => import('@/views/list.vue'),
  }, {
    path: '/date/:date',
    name: 'Date',
    meta: {
      sidebar: true,
    },
    component: () => import('@/views/list.vue'),
  }, {
    path: '/author/:authId',
    name: 'Author',
    meta: {
      sidebar: true,
    },
    component: () => import('@/views/list.vue'),
  }, {
    path: '/tags/:tagId',
    name: 'Tags',
    meta: {
      sidebar: true,
    },
    component: () => import('@/views/list.vue'),
  }, {
    path: '/article/:id',
    name: 'Article',
    meta: {
      sidebar: true,
    },
    component: () => import('@/views/article.vue'),
  }, {
    path: '/page/:id',
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

if (window.$os2020) {
  Object.keys(window.$os2020.routes).forEach((i) => {
    const item = routes.find((r) => r.name === i);
    if (item) {
      const configItem = window.$os2020.routes[i];
      item.path = configItem.path || '/';
    }
  });
}

const router = new VueRouter({
  mode: window.$os2020 ? window.$os2020.routerMode : 'history',
  routes,
});

export default router;
