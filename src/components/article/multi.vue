<template>
  <router-link :to="routeInfo" :title="article.Title" class="article-multi">
    <div class="article-multi-main">
      <div class="article-multi-head">
        <h2 class="title">{{ article.Title }}</h2>
        <div class="article-intro" v-html="article.Intro" />
      </div>
      <article-info :article="article" />
    </div>
    <div v-if="article.Thumb" class="article-cover">
      <img :src="article.Thumb" :alt="article.Title">
    </div>
  </router-link>
</template>

<script>
/**
 * 文章列表单项
 */

import ArticleInfo from './info.vue';

export default {
  name: 'ArticleMulti',
  components: {
    ArticleInfo,
  },
  props: {
    article: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    routeInfo() {
      return this.$createRoute('Article', this.article);
    },
  },
};
</script>

<style lang="scss" scoped>
.article-multi {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  background: #fff;

  .title {
    margin-bottom: 10px;
    line-height: 1.6;
    font-size: 24px;
    font-weight: normal;
    color: #1a2a3a;

    &:hover {
      color: #3a6ea5;
    }
  }

  .article-intro {
    font-size: 14px;
    line-height: 1.6;
    color: #555;
  }

  .article-cover {
    width: 200px;
    height: 200px;
    margin: auto 0;
    overflow: hidden;

    img {
      display: block;
      width: 100%;
      height: 100%;
      transition: all 200ms ease-in-out;
    }
  }

  .article-multi-main {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-between;
    padding: 24px;

    .article-info {
      margin-top: 10px;
    }
  }

  &:hover {
    .article-cover {
      img {
        transform: scale(1.2);
      }
    }
  }
}
</style>
