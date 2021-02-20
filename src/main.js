import Vue from 'vue';
import Icon from 'ant-design-vue/lib/icon';
import Spin from 'ant-design-vue/lib/spin';
import Pagination from 'ant-design-vue/lib/pagination';
import 'ant-design-vue/lib/icon/style/css';
import 'ant-design-vue/lib/spin/style/css';
import 'ant-design-vue/lib/pagination/style/css';
import 'ant-design-vue/lib/message/style/css';
import App from './App.vue';
import router from './router';
import store from './store';
import plugin from './plugin';
import '@/style/transition.scss';

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
