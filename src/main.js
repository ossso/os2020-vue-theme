import Vue from 'vue';
import {
  Icon,
} from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import plugin from './plugin';

Vue.config.productionTip = false;
Vue.use(plugin);
Vue.use(Icon);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
