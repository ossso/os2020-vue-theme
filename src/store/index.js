/* eslint-disable no-underscore-dangle */
import Vue from 'vue';
import Vuex from 'vuex';
import {
  message,
} from 'ant-design-vue';
import comment from './modules/comment';
import user from './modules/user';

Vue.use(Vuex);

const titleElem = document.querySelector('title');

const store = new Vuex.Store({
  state: {
    zbp: {
      lang: {},
    },
    isLogin: false,
    page: {
      title: {},
    },
    refreshSidebar: false,
  },
  mutations: {
    /**
     * 设置登录状态
     */
    setLogin(state, status) {
      state.isLogin = !!status;
    },
    /**
     * 设置zbp信息
     */
    setZBP(state, zbp) {
      state.zbp = zbp;
    },
    /**
     * 设置标题
     */
    setPageTitle(state, title) {
      state.page.title = title;
    },
    /**
     * 刷新侧边栏
     */
    setRefreshSidebar(state, status) {
      state.refreshSidebar = Boolean(status);
    },
  },
  actions: {
    /**
     * 获取基础配置
     */
    getBasicInfo({
      commit,
      dispatch,
      state,
    }) {
      store._vm.$api({
        query: {
          mod: 'system',
          act: 'basic_info',
        },
      }).then((res) => {
        commit('setZBP', res.zbp);
        commit('setLogin', res.is_logged_in);
        commit('comment/setReverse', res.zbp.comment_reverse_order);
        if (res.is_logged_in) {
          commit('user/setInfo', res.current_member);
        }
        if (state.page.title) {
          dispatch('setPageTitle', state.page.title);
        }
      }).catch((err) => {
        message.error(`getBasicInfo ${err.message}`);
      });
    },
    /**
     * 设置页面标题
     */
    setPageTitle({
      commit,
      state,
    }, title) {
      if (typeof title === 'object') {
        titleElem.innerHTML = `${title.title}`;
        if (title.suffix) {
          titleElem.innerHTML += ` - ${title.suffix}`;
        }
        commit('setPageTitle', title.title);
      } else {
        const {
          zbp,
        } = state;
        if (zbp.name) {
          titleElem.innerHTML = `${title} - ${zbp.name}`;
        } else {
          titleElem.innerHTML = `${title}`;
        }
        commit('setPageTitle', title);
      }
    },
  },
  modules: {
    comment,
    user,
  },
});

export default store;
