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
    this.cache.watcher = this.$watch('$route', () => {
      this.$store.commit('setRefreshSidebar', true);
      this.initInfo();
    });
    this.initInfo();
  },
  destroyed() {
    this.cache.watcher();
  },
  methods: {
    /**
     * 初始化页面信息
     */
    initInfo() {
      this.cache.titleHandle = null;
      this.cache.pageTypeQuery = {};
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
        case 'Date': {
          const date = (() => {
            if (this.$route.params.date) {
              return this.$route.params.date;
            }
            return this.$route.query.date;
          })();
          this.cache.query = {
            ...LIST_COMMON_QUERY,
            date,
          };
          this.cache.titleHandle = () => {
            if (date.indexOf('-') === date.lastIndexOf('-')) {
              return `${date.replace('-', '年')}月`;
            }
            return this.$dateFormat.format('yyyy年mm月dd日', date);
          };
          break;
        }
        case 'Author': {
          const authId = (() => {
            if (this.$route.params.authId) {
              return this.$route.params.authId;
            }
            return this.$route.query.auth || this.$route.query.id;
          })();
          this.cache.query = {
            ...LIST_COMMON_QUERY,
            auth_id: authId,
          };
          this.cache.pageTypeQuery = {
            mod: 'member',
            act: 'get',
            id: authId,
          };
          this.cache.titleHandle = (data) => data.member.StaticName;
          break;
        }
        case 'Tags': {
          const tagId = (() => {
            if (this.$route.params.tagId) {
              return this.$route.params.tagId;
            }
            return this.$route.query.tags || this.$route.query.id;
          })();
          this.cache.query = {
            ...LIST_COMMON_QUERY,
            tag_id: tagId,
          };
          this.cache.pageTypeQuery = {
            mod: 'tag',
            act: 'get',
            id: tagId,
          };
          this.cache.titleHandle = (data) => data.tag.Name;
          break;
        }
        default:
        case 'Home':
          this.cache.query = {
            ...LIST_COMMON_QUERY,
          };
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
        if (this.cache.titleHandle) {
          this.$title = this.cache.titleHandle();
        } else if (this.zbp.name) {
          this.$store.dispatch('setPageTitle', {
            title: `${this.zbp.name} - ${this.zbp.subname}`,
          });
        } else {
          const watcher = this.$watch('zbp', () => {
            this.$store.dispatch('setPageTitle', {
              title: `${this.zbp.name} - ${this.zbp.subname}`,
            });
            watcher();
          });
        }
        return;
      }
      this.$api({
        query: this.cache.pageTypeQuery,
      }).then((res) => {
        if (this.cache.titleHandle) {
          this.$title = this.cache.titleHandle(res);
        }
      });
    },
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
