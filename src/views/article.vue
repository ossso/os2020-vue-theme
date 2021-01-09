<template>
  <div class="article-container">
    <article
      v-if="info"
      class="article-box"
    >
      <h1>{{ info.Title }}</h1>
      <div
        ref="content"
        class="content"
        v-html="info.Content"
      />
      <div class="article-info">
        <span
          class="info-item author-info"
        >作者：{{ info.Author.StaticName }}</span>
        <span
          class="info-item cate-info"
        >分类：{{ info.Category.Name }}</span>
        <span
          class="info-item post-date-info"
        >时间：{{ date }}</span>
      </div>
    </article>

    <comment-list
      v-if="showComment"
      :post-id="id"
    />
  </div>
</template>

<script>
/**
 * 文章页面
 */
import NProgress from 'nprogress';
import * as clipboard from 'clipboard-polyfill/text';
import prismFormat from '@/utils/prism';
import CommentList from '@/components/comment/list.vue';

function getParentNodeClass(className) {
  if (this.nodeName === 'BODY' || this.nodeName === 'HTML') {
    return undefined;
  }
  if (!this.parentNode) {
    return undefined;
  }
  if (this.parentNode.classList && this.parentNode.classList.contains(className)) {
    return this.parentNode;
  }
  return getParentNodeClass.call(this.parentNode, className);
}

export default {
  name: 'ArticlePage',
  components: {
    CommentList,
  },
  data() {
    return {
      id: null,
      info: null,
      loading: false,
    };
  },
  computed: {
    date() {
      if (this.info && this.info.PostTime) {
        return this.$dateFormat.format('yyyy/mm/dd hh:ii', this.info.PostTime * 1000);
      }
      return '';
    },
    showComment() {
      if (this.info && this.info.IsLock === false && !this.zbp.comment_turnoff) {
        return true;
      }
      return false;
    },
  },
  mounted() {
    this.initInfo();
  },
  methods: {
    /**
     * 初始化信息
     */
    initInfo() {
      this.$title = '加载中...';
      if (this.$route.params.id) {
        this.id = this.$route.params.id;
      } else if (this.$route.query.id) {
        this.id = this.$route.query.id;
      }
      if (this.id > 0) {
        this.loadArticleInfo();
      } else {
        this.$router.replace({
          name: '404',
        });
      }
    },
    /**
     * 加载文章信息
     */
    loadArticleInfo() {
      NProgress.start();
      this.loading = true;
      this.$api({
        query: {
          mod: 'post',
          id: this.id,
          with_relations: 'Author,Category',
        },
      }).then((res) => {
        this.info = res.post;
        this.info.Content = prismFormat(this.$htmlEscape(res.post.Content));
        this.$store.commit('comment/setPostCmtKey', res.post.CommentPostKey);
        this.$title = res.post.Title;
        this.$nextTick(() => {
          this.queryCopyBtn();
        });
      }).finally(() => {
        NProgress.done();
        this.loading = false;
      });
    },
    /**
     * 匹配复制按钮
     */
    queryCopyBtn() {
      const copyBtnList = this.$refs.content.querySelectorAll('.copy-btn');
      for (let i = 0; i < copyBtnList.length; i += 1) {
        const item = copyBtnList[i];
        item.addEventListener('click', () => {
          const parentElem = getParentNodeClass.call(item, 'prism-highlight');
          if (parentElem) {
            const codeElem = parentElem.querySelector('code');
            if (codeElem) {
              this.copyText(codeElem.innerText);
            }
          }
        });
      }
    },
    /**
     * 复制内容
     */
    copyText(text) {
      clipboard.writeText(text).then(() => {
        this.$message.success('复制成功');
      });
    },
  },
  /**
   * 路由守卫
   */
  beforeRouteUpdate(to, from, next) {
    setTimeout(() => {
      this.initInfo();
    }, 100);
    next();
  },
};
</script>

<style lang="scss" scoped>
.article-box {
  margin-bottom: 24px;
  padding: 25px;
  background: #fff;

  h1 {
    margin-bottom: 10px;
    line-height: 1.6;
    font-size: 24px;
    color: #222;
    letter-spacing: 2px;
  }

  .content {
    margin-bottom: 10px;
  }

  .article-info {
    margin-bottom: 10px;
    .info-item {
      margin-right: 12px;
      color: #888;
    }
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

  .prism-highlight {
    position: relative;
  }
  .pre-side {
    position: absolute;
    top: 0;
    right: 12px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
  }
  .lang-name,
  .copy-btn {
    display: block;
    height: 24px;
    padding: 0 8px;
    line-height: 24px;
    font-size: 12px;
    color: #888;
    background: #eee;
    border-radius: 0 0 6px 6px;
    text-shadow: none;
  }
  .copy-btn {
    margin-left: 10px;
    color: #1a2a3a;
    cursor: pointer;
  }
}
</style>
