<template>
  <div class="home-main">
    <waterfall
      v-if="type === 'waterfall'"
      :list="list"
      :column="2"
    />
    <div v-else class="list-box">
      <article-multi
        v-for="(item, index) in list"
        :key="`${item.ID}_${index}`"
        :article="item"
      />
    </div>
  </div>
</template>

<script>
/**
 * 首页
 */
import listMixin from '@/mixins/list';
import Waterfall from '@/components/waterfall/index.vue';
import ArticleMulti from '@/components/article/multi.vue';

const LIST_COMMON_QUERY = {
  mod: 'post',
  act: 'list',
  type: '0',
  sortby: 'PostTime',
  order: 'DESC',
  with_relations: 'Author,Category',
};

export default {
  name: 'ArticleList',
  components: {
    Waterfall,
    ArticleMulti,
  },
  mixins: [listMixin],
  data() {
    return {
      type: 'mutil',
    };
  },
  mounted() {
    this.initInfo();
  },
  methods: {
    /**
     * 初始化页面信息
     */
    initInfo() {
      switch (this.$route.name) {
        case 'Category': {
          const cateId = (() => {
            if (this.$route.params.cateId) {
              return this.$route.params.cateId;
            }
            return this.$route.query.cate || this.$route.query.id;
          })();
          this.cache.query = {
            ...LIST_COMMON_QUERY,
            cate_id: cateId,
          };
          this.cache.pageTypeQuery = {
            mod: 'category',
            act: 'get',
            id: cateId,
          };
          this.cache.titleHandle = (data) => data.category.Name;
          break;
        }
        default:
        case 'Home':
          this.cache.query = {
            ...LIST_COMMON_QUERY,
          };
          this.cache.pageTypeQuery = {};
          this.cache.titleHandle = () => this.zbp.name;
          break;
      }
      this.loadList(1);
      this.getPageTitle();
    },
    /**
     * 加载文章列表
     */
    loadList(pagenow = 1) {
      this.$api({
        query: {
          ...this.cache.query,
          pagenow,
        },
      }).then((res) => {
        if (pagenow === 1) {
          this.list = [];
        }
        this.list.push(...res.list.map((i) => {
          const item = { ...i };
          item.Content = this.$htmlEscape(item.Content);
          item.Intro = this.$htmlEscape(item.Intro);
          return item;
        }));
        this.page.pagenow = pagenow;
        if (res.pagination.pageAll) {
          this.page.pagination = res.pagination;
        } else {
          this.page.loadError = false;
          this.page.loadOver = true;
        }
      }).catch((err) => {
        this.page.loadError = true;
        this.$message.error(err.message);
      }).finally(() => {
        this.page.loading = false;
      });
    },
    /**
     * 获取页面标题
     */
    getPageTitle() {
      if (!this.cache.pageTypeQuery.mod) {
        this.$title = this.zbp.name;
        return;
      }
      this.$api({
        query: this.cache.pageTypeQuery,
      }).then((res) => {
        this.$title = this.cache.titleHandle(res);
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
.home-main {
  width: 100%;
  .article-multi {
    margin-bottom: 24px;
  }
}
</style>
