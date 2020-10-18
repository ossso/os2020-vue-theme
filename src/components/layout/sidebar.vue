<template>
<aside class="sidebar">
  <side-item
    v-for="(item, index) in modules"
    :key="index"
    :item="item"
  />
</aside>
</template>

<script>
/**
 * Sidebar
 */

import SideItem from '../sidebar/item.vue';

export default {
  name: 'Sidebar',
  components: {
    SideItem,
  },
  data() {
    return {
      modules: [],
    };
  },
  mounted() {
    this.loadSide();
  },
  methods: {
    /**
     * 加载侧栏
     */
    async loadSide() {
      await this.$api({
        query: {
          mod: 'module',
          act: 'list_sidebar',
          id: '1',
        },
      }).then((res) => {
        this.modules = res.map((i) => {
          const item = {
            ...i,
          };
          item.Content = this.$htmlEscape(item.Content);
          return item;
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
