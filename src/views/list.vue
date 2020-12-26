<template>
  <div class="home-main">
    <waterfall v-if="type === 'waterfall'" :list="list" :column="2" />
    <div v-else class="list-box">
      <article-multi v-for="(item, index) in list" :key="index" :article="item" />
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
    this.loadList();
  },
  methods: {
    /**
     * 加载文章列表
     */
    loadList(pagenow = 1) {
      this.$api({
        query: {
          mod: 'post',
          act: 'list',
          type: '0',
          sortby: 'PostTime',
          order: 'DESC',
          with_relations: 'Author,Category',
          pagenow,
        },
      }).then((res) => {
        const list = pagenow > 1 ? this.list : [];
        this.list = list.concat(res.list.map((i) => {
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
