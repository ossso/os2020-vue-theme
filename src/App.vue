<template>
<div id="app">
  <layout-header />
  <div class="container">
    <template v-if="visibleSidebar">
      <div class="main">
        <router-view />
      </div>
      <aside class="sidebar">
        <sidebar />
      </aside>
    </template>
    <template v-else>
      <router-view />
    </template>
  </div>
  <layout-footer />
</div>
</template>

<script>
/**
 * App Start
 */

import LayoutHeader from '@/components/layout/header.vue';
import LayoutFooter from '@/components/layout/footer.vue';
import Sidebar from '@/components/layout/sidebar.vue';

export default {
  name: 'App',
  components: {
    LayoutHeader,
    LayoutFooter,
    Sidebar,
  },
  computed: {
    visibleSidebar() {
      if (this.$route.meta && this.$route.meta.sidebar) {
        return this.$route.meta.sidebar;
      }
      return false;
    },
  },
  created() {
    this.$store.dispatch('getBasicInfo');
  },
  mounted() {
    this.initRoute();
  },
  methods: {
    /**
     * 初始化路由
     */
    initRoute() {
      if (!window.location.search) return this;
      if (window.$os2020.routerType === 'rewrite') return this;
      const query = {};
      window.location.search.split('?')[1].split('&').forEach((i) => {
        const [key, val] = i.split('=');
        query[key] = val;
      });
      console.log(query);
      if (query.id) {
        this.$router.replace({
          name: 'Article',
          query,
        });
      }
      return this;
    },
  },
};
</script>

<style lang="scss">
@import "./assets/base.scss";

.container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  width: 1000px;
  margin: 30px auto;

  .main {
    width: 676px;
  }

  .sidebar {
    width: 300px;
    overflow: hidden;
  }
}
</style>
