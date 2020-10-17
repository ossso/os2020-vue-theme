<template>
<div class="article-container">
  <article class="article-box" v-if="info">
    <h1>{{info.Title}}</h1>
    <div class="content" v-html="info.Content"></div>
  </article>
</div>
</template>

<script>
/**
 * 文章页面
 */

import NProgress from 'nprogress';

export default {
  name: 'ArticlePage',
  data() {
    return {
      id: null,
      info: null,
      loading: false,
    };
  },
  mounted() {
    this.$title = '加载中...';
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
    } else if (this.$route.query.id) {
      this.id = this.$route.query.id;
    }
    if (this.id > 0) {
      this.loadInfo();
    } else {
      this.$router.replace({
        name: '404',
      });
    }
  },
  methods: {
    loadInfo() {
      NProgress.start();
      this.loading = true;
      this.$api({
        query: {
          mod: 'post',
          id: this.id,
        },
      }).then((res) => {
        this.info = res.post;
        this.info.Content = this.$htmlEscape(res.post.Content);
        this.$title = res.post.Title;
      }).finally(() => {
        NProgress.done();
        this.loading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.article-box {
  padding: 25px;
  background: #fff;

  h1 {
    margin-bottom: 20px;
    line-height: 1.6;
    font-size: 24px;
    color: #222;
    letter-spacing: 2px;
  }
}
</style>

<style lang="scss">
.article-box {
  .content {
    line-height: 2;
    font-size: 16px;
    color: #333;

    p,
    blockquote {
      word-wrap: break-word;
      word-break: break-all;
    }

    pre {
      font-size: 14px;
      word-wrap: break-word;
      word-break: break-all;
      box-sizing: content-box;

      * {
        box-sizing: content-box;
      }

      &::-webkit-scrollbar {
        height: 10px;
        cursor: pointer;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: .3em;
        background: #888;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }
    }

    p {
      margin-bottom: .5em;
    }

    pre[class*="language-"] {
      margin: 0 0 .5em;
    }

    img {
      max-width: 100%;
      font-size: 12px;
      color: #888;
    }

    blockquote {
      margin: 5px 0;
      padding: 10px 15px;
      border-radius: 8px;
      background: #f9f9f9;
      box-shadow: 0 .5px 1px #eee;

      p {
        margin-bottom: 0;
      }
    }
  }
}
</style>
