/**
 * 声明应用所需的自定义插件
 */

import {
  message,
} from 'ant-design-vue';
import api from './api';
import quickDate from './utils/quick-date';
import globalMixin from './mixins/global';

const install = (Vue) => {
  Vue.prototype.$message = message;

  Vue.mixin(globalMixin);

  Vue.prototype.$api = api;
  Vue.prototype.$quickDate = quickDate;

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
    const query = {
      type,
    };
    switch (type) {
      case 'Article':
        query.id = info.ID || info.id;
        break;
      case 'Category':
        query.cate = info.cate || info.id;
        break;
      case 'Date':
        query.date = info.date;
        break;
      case 'Author':
        query.auth = info.auth || info.id;
        break;
      case 'Tags':
        query.tags = info.tags || info.id;
        break;
      default:
      case 'Home':
        break;
    }
    route.query = query;
    return route;
  }
  Vue.prototype.$createRoute = createRoute;
};

export default {
  install,
};
