<template>
  <footer class="layout-footer">
    <div
      class="copyright"
      v-html="copyrightString"
    />
  </footer>
</template>

<script>
/**
 * Layout Footer
 */

import {
  mapState,
} from 'vuex';

export default {
  name: 'LayoutFooter',
  computed: {
    ...mapState({
      domainString(state) {
        if (state.zbp.host) {
          return state.zbp.host.replace(/http(s)*:\/\//, '').slice(0, -1);
        }
        return '';
      },
    }),
    yearString() {
      return new Date().getFullYear();
    },
    copyrightString() {
      if (window.zbpCopyright && window.zbpCopyright !== '{$copyright}') {
        return window.zbpCopyright;
      }
      return `&copy; ${this.yearString} ${this.domainString}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.layout-footer {
  padding: 30px 0;
  margin-top: 30px;
  background: #fff;

  .copyright {
    text-align: center;
    font-size: 14px;
    color: #aaa;
  }
}
</style>
