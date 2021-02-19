<template>
  <div class="comment-list">
    <div class="mode-head">
      <h3 class="comment-title">
        参与评论
      </h3>
    </div>
    <transition name="fade">
      <comment-post
        v-show="!replyActived"
      />
    </transition>
    <div class="list-container">
      <comment-item
        v-for="(item, index) in list"
        :key="index"
        :item="item"
      />
    </div>
  </div>
</template>

<script>
/**
 * 评论列表
 */

import {
  mapState,
} from 'vuex';
import CommentPost from './post.vue';
import CommentItem from './item.vue';

export default {
  name: 'CommentList',
  components: {
    CommentPost,
    CommentItem,
  },
  props: {
    postId: {
      type: [String, Number],
      default: '',
    },
  },
  computed: {
    ...mapState({
      list: (state) => state.comment.list,
      replyActived: (state) => Boolean(state.comment.replyId),
    }),
  },
  watch: {
    postId(n, o) {
      if (n !== o) {
        this.initCommentData();
      }
    },
  },
  mounted() {
    if (this.postId) {
      this.initCommentData();
    }
  },
  methods: {
    /**
     * 初始化评论
     */
    initCommentData() {
      this.$store.commit('comment/init', {
        postId: this.postId,
      });
      this.$store.dispatch('comment/list');
    },
  },
};
</script>

<style lang="scss" scoped>
.comment-list {
  padding: 25px;
  background: #fff;

  .comment-title {
    margin-bottom: 12px;
    line-height: 36px;
    font-size: 18px;
    font-weight: bold;
    color: #222;
  }
}
</style>
