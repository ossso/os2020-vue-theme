/**
 * 用户组件
 */

const defaultState = {
  info: {},
};

export default {
  namespaced: true,
  state: {
    ...defaultState,
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
  },
  actions: {},
};
