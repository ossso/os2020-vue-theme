/**
 * 评论模块
 */

import api from '@/api';

const defaultState = {
  postId: null,
  postCmtKey: null,
  replyId: null,
  list: [],
  page: {
    pagenow: 1,
  },
};

export default {
  namespaced: true,
  state: {
    ...defaultState,
  },
  mutations: {
    // 初始化
    init(state, {
      postId = null,
    }) {
      state.postId = postId;
      state.postCmtKey = null;
      state.replyId = null;
      state.list = [];
      state.page = {
        ...defaultState.page,
      };
    },
    setPostId(state, postId) {
      state.postId = postId;
    },
    setPostCmtKey(state, postCmtKey) {
      state.postCmtKey = postCmtKey;
    },
    setReplyId(state, replyId) {
      state.replyId = replyId;
    },
    setList(state, {
      list = [],
      pagenow = 1,
    }) {
      if (pagenow === 1) {
        state.list = [];
      }
      state.list.push(...list);
    },
    addList(state, item) {
      state.list.push(item);
    },
  },
  actions: {
    /**
     * 获取评论列表
     */
    async list({
      commit,
      state,
    }, page = 1) {
      await api({
        query: {
          mod: 'comment',
          act: 'list',
          post_id: state.postId,
          pagenow: page,
          with_relations: 'Author',
        },
      }).then((res) => {
        commit('setList', {
          list: res,
          pagenow: page,
        });
      });
    },
    /**
     * 发布评论
     */
    async post({
      commit,
      dispatch,
      state,
    }, formData) {
      console.log(formData);
      await api({
        method: 'post',
        query: {
          mod: 'comment',
          act: 'post',
          postid: state.postId,
          key: state.postCmtKey,
          with_relations: 'Author',
        },
        body: formData,
      }).then((res) => {
        console.log(res);
        console.log(commit);
        dispatch('list');
      });
    },
  },
};
