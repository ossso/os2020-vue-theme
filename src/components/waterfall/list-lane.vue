<template>
  <div class="waterfall-lane">
    <waterfall-list-item v-for="(item, index) in list" :key="index" :article="item" />
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
    list: {
      type: Array,
      default: () => ([]),
    },
  },
};
</script>

<style lang="scss" scoped>
.waterfall-list-item {
  margin-bottom: 24px;
}
</style>
