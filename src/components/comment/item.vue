<template>
  <div
    class="comment-item"
    :class="{ 'comment-child-item': child }"
  >
    <a :name="'cmt' + item.ID" />
    <span class="comment-author-avatar">
      <img
        :src="item.Author.Avatar"
        :alt="item.Author.StaticName"
      >
    </span>
    <div class="comment-item-head">
      <span class="nickname">{{ item.Author.StaticName }}</span>
      <span>
        <span
          v-show="!activeReplyPost"
          class="reply-btn"
          @click="activeReply"
        >@回复Ta</span>
        <span class="post-date">{{ date }}</span>
      </span>
    </div>
    <div class="comment-item-content">
      {{ item.Content }}
    </div>
    <div class="comment-child-list">
      <comment-item
        v-for="(childItem, index) in item.Children"
        :key="index"
        :item="childItem"
      />
    </div>
    <transition name="fade-transform">
      <comment-post
        v-if="activeReplyPost"
        class="comment-child-reply-post"
        :is-reply="true"
      />
    </transition>
  </div>
</template>

<script>
/**
 * 评论的单条
 */

import {
  mapState,
} from 'vuex';
import CommentPost from './post.vue';

export default {
  name: 'CommentItem',
  components: {
    CommentPost,
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    child: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState({
      activeReplyPost(state) {
        return state.comment.replyId === this.item.ID;
      },
    }),
    date() {
      if (this.item.PostTime) {
        if (Date.now() - (this.item.PostTime * 1000) < 30 * 24 * 60 * 60 * 1000) {
          return this.$quickDate.ago(this.item.PostTime * 1000);
        }
        return this.$quickDate.format('yyyy/mm/dd hh:ii', this.item.PostTime * 1000);
      }
      return '';
    },
  },
  methods: {
    activeReply() {
      this.$store.commit('comment/setReplyId', this.item.ID);
    },
  },
};
</script>

<style lang="scss" scoped>
.comment-item {
  position: relative;
  padding-left: 60px;
  margin-bottom: 20px;

  .comment-author-avatar {
    position: absolute;
    top: 0;
    left: 0;
    width: 48px;
    height: 48px;

    img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .comment-item-head {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 5px;
    line-height: 24px;
    font-size: 14px;

    .nickname {
      color: #2a3a4a;
      font-weight: bold;
    }

    .post-date {
      color: #999;
    }

    .reply-btn {
      margin-right: 10px;
      font-size: 12px;
      color: #369;
      opacity: 0;
      transition: all 200ms ease-in-out;
      cursor: pointer;
    }
  }

  .comment-item-content {
    line-height: 1.6;
    font-size: 14px;
  }

  .comment-child-reply-post {
    margin-top: 10px;
  }

  &:hover {
    .comment-item-head {
      .reply-btn {
        opacity: 1;
      }
    }
  }

  &.comment-child-item {
    padding-left: 40px;

    .comment-author-avatar {
      width: 32px;
      height: 32px;
    }
  }
}
</style>
