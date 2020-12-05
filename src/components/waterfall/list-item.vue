<template>
  <router-link :to="routeInfo" :title="article.Title" class="waterfall-list-item">
    <div v-if="article.Thumb" class="article-cover">
      <img :src="article.Thumb" :alt="article.Title">
    </div>
    <div class="article-multi">
      <h2 class="title">{{ article.Title }}</h2>
      <div class="article-intro" v-html="article.Intro" />
      <article-info :article="article" />
    </div>
  </router-link>
</template>

<script>
/**
 * 瀑布流列表单项
 */

import ArticleInfo from '../article/info.vue';

export default {
  name: 'WaterfallListItem',
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
.waterfall-list-item {
  display: block;
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
    max-height: 72px;
    line-height: 24px;
    font-size: 14px;
    color: #555;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  .article-cover {
    width: 100%;
    overflow: hidden;

    img {
      display: block;
      width: 100%;
      height: 100%;
      transition: all 300ms ease-in-out;
    }
  }

  .article-multi {
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
