<template>
  <header class="layout-header">
    <div class="header-container">
      <div class="site-name">
        <h1 class="name">
          <router-link :to="{ path: '/' }">
            {{ zbp.name }}
          </router-link>
        </h1>
      </div>
      <navbar />
    </div>
  </header>
</template>

<script>
/**
 * Layout Header
 */

import Navbar from './navbar.vue';

export default {
  name: 'LayoutHeader',
  components: {
    Navbar,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>

$headerHeight: 80px;

.layout-header {
  height: $headerHeight;
  background: #fff;
}

.header-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  width: 1000px;
  height: $headerHeight;
  margin: auto;
}

.site-name {
  margin-right: 100px;
  .name {
    line-height: $headerHeight;
    font-size: 28px;
    color: #1a2a3a;
    letter-spacing: 2px;
    a {
      color: #1a2a3a;
    }
  }
}
</style>
