export default {
  version: '1.0.0',
  routes: {
    index: {
      path: '/',
      name: 'Home',
      component: () => import('../views/home.vue'),
      meta: {
        title: '首页',
        sidebar: true,
      },
    },
  },
};
