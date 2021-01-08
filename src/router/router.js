import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '首页',
      sidebar: true,
    },
    component: () => import('@/views/list.vue'),
  }, {
    path: '/cate/:cateId',
    name: 'Category',
    meta: {
      title: '分类',
      sidebar: true,
    },
    component: () => import('@/views/list.vue'),
  }, {
    path: '/article/:id',
    name: 'Article',
    meta: {
      title: '文章',
      sidebar: true,
    },
    component: () => import('@/views/article.vue'),
  }, {
    path: '/page/:id',
    name: 'Page',
    meta: {
      title: '单页',
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
