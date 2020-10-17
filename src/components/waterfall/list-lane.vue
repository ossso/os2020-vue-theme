<template>
<div class="waterfall-lane">
  <waterfall-list-item v-for="(item, index) in list" :key="index" :article="item"></waterfall-list-item>
</div>
</template>

<script>
import WaterfallListItem from './list-item.vue';

export default {
  name: 'WaterfallLane',
  components: {
    WaterfallListItem,
  },
  props: {
    list: Array,
  },
};
</script>

<style lang="scss" scoped>
.waterfall-list-item {
  margin-bottom: 24px;
}
</style>
