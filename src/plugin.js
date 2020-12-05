/**
 * 声明应用所需的自定义插件
 */

import {
  message,
} from 'ant-design-vue';
import api from './api';
import dateFormat from './utils/date-format';
import globalMixin from './mixins/global';

const install = (Vue) => {
  Vue.prototype.$message = message;

  Vue.mixin(globalMixin);

  Vue.prototype.$api = api;
  Vue.prototype.$dateFormat = dateFormat;

  /**
   * 实体转字符串
   */
  function htmlEscape(text) {
    return text.replace(/&(lt|gt|amp|quote|quot);/g, (match) => {
      switch (match) {
        case '&lt;':
          return '<';
        case '&gt;':
          return '>';
        case '&amp;':
          return '&';
        case '&quote;':
          return '"';
        case '&quot;':
          return '"';
        default:
      }
      return match;
    });
  }
  Vue.prototype.$htmlEscape = htmlEscape;

  /**
   * 绑定设置标题
   */
  function setTitle(value) {
    this.$store.dispatch('setPageTitle', value);
  }
  Object.defineProperty(Vue.prototype, '$title', {
    set: setTitle,
    get() {
      return this.$store.page.title;
    },
  });

  /**
   * 创建访问路由
   * @param {String} type 页面类型
   * @param {Object} info 页面信息
   */
  function createRoute(type, info) {
    const route = {
      name: type,
    };
    if (window.$os2020 && window.$os2020.routerType === 'active') {
      const configItem = window.$os2020.routes[type];
      const query = {
        type,
      };
      switch (type) {
        case 'Article':
          if (configItem.param === 'alias') {
            query.alias = info.Alias;
          } else {
            query.id = info.ID;
          }
          break;
        default:
        case 'Home':
          break;
      }
      route.query = query;
    } else {
      const params = {};
      route.params = params;
    }
    console.log(route);
    return route;
  }
  Vue.prototype.$createRoute = createRoute;
};

export default {
  install,
};
