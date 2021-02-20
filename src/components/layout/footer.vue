<template>
  <footer class="layout-footer">
    <div
      v-if="copyrightString"
      class="copyright"
      v-html="copyrightString"
    />
    <div class="program-info">
      <span>Powered By Z-BlogPHP.</span>
      <span>Theme By <span title="橙色阳光主题 - OS2020">OS2020</span>.</span>
    </div>
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
    margin-bottom: 10px;
    text-align: center;
    font-size: 14px;
    color: #aaa;
  }

  .program-info {
    text-align: center;
    font-size: 12px;
    color: #aaa;
    & > span {
      margin: 0 3px;
    }
  }
}
</style>
