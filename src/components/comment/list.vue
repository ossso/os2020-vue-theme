<template>
<div class="comment-list">
  <div class="mode-head">
    <h3 class="comment-title">参与评论</h3>
  </div>
  <comment-post />
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
    postId: [String, Number],
  },
  computed: {
    ...mapState({
      list: (state) => state.comment.list,
    }),
  },
  mounted() {
    this.$store.commit('comment/init', {
      postId: this.postId,
    });
    this.$store.dispatch('comment/list');
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
