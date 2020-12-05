<template>
  <div class="page-404">
    <h2 v-if="lang.error">{{ lang.error[2] }}</h2>
  </div>
</template>

<script>
/**
 * 404页面
 */

import {
  mapState,
} from 'vuex';

export default {
  name: '404',
  computed: {
    ...mapState({
      lang: (state) => state.zbp.lang,
    }),
  },
};
</script>
