<template>
<div class="waterfall-wrap">
  <waterfall-lane v-for="(item, index) in lane" :key="index" :list="item"></waterfall-lane>
</div>
</template>

<script>
/**
 * 瀑布流
 */

import WaterfallLane from './list-lane.vue';

export default {
  name: 'Waterfall',
  components: {
    WaterfallLane,
  },
  props: {
    list: Array,
    column: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      lane: [],
    };
  },
  watch: {
    list(n) {
      this.pushData(n);
    },
  },
  mounted() {
    if (this.list && this.list.length > 1) {
      this.pushData(this.list);
    }
  },
  methods: {
    /**
     * 推送数据
     */
    pushData(list) {
      const lane = [];
      for (let i = 0; i < this.column; i += 1) {
        lane.push([]);
      }
      this.pushLane(lane, list);
      if (this.lane.length !== lane.length) {
        this.lane = lane;
      } else {
        for (let i = 0; i < lane.length; i += 1) {
          const item = lane[i];
          this.lane[i] = this.lane[i].concat(item);
        }
      }
    },
    /**
     * 推送新的数据进泳道
     */
    pushLane(lane, list) {
      for (let i = 0; i < list.length; i += 1) {
        const item = list[i];
        const key = i % this.column;
        lane[key].push(item);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.waterfall-wrap {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 -12px;
}
.waterfall-lane {
  flex: 1;
  margin: 0 12px;
}
</style>
