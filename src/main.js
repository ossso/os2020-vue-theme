import Vue from 'vue';
import {
  Icon,
  Spin,
  Pagination,
} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue';
import router from './router';
import store from './store';
import plugin from './plugin';

Vue.config.productionTip = false;
Vue.use(plugin);
Vue.use(Icon);
Vue.use(Spin);
Vue.use(Pagination);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
