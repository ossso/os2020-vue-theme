<template>
  <div class="ui-pagination-bar">
    <span
      class="page-item"
      @click="prevPage"
    >
      上一页
    </span>
    <span
      v-for="item in pagebar"
      :key="item.name"
      class="page-item"
      :class="{ active: item.name === value }"
      @click="changePage(item)"
    >
      {{ item.value }}
    </span>
    <span
      class="page-item"
      @click="nextPage"
    >
      下一页
    </span>
  </div>
</template>

<script>
/**
 * 自定义分页
 */

import parse from './parse';

export default {
  name: 'UIPagination',
  props: {
    value: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    barCount: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    pagebar() {
      try {
        const {
          pagebar = [],
        } = parse(this.value, this.pageSize, this.total, this.barCount);
        return pagebar;
      } catch {
        return [];
      }
    },
  },
  watch: {
    value() {
      this.$emit('input', this.value);
    },
  },
  methods: {
    prevPage() {
      const num = this.value - 1;
      if (num < 1) {
        return;
      }
      this.$emit('change', num);
      this.value = num;
    },
    nextPage() {
      const num = this.value + 1;
      if (num > this.total) {
        return;
      }
      this.$emit('change', num);
      this.value = num;
    },
    changePage(item) {
      if (item.value !== this.value) {
        this.$emit('change', item.value);
        this.value = item.value;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.ui-pagination-bar {
  display: flex;
  flex-direction: row;
  justify-content: center;

  .page-item {
    min-width: 36px;
    height: 36px;
    margin: 0 6px;
    padding: 0 12px;
    line-height: 36px;
    font-size: 14px;
    text-align: center;
    color: #333;
    background: #fff;
    border-radius: 4px;
    cursor: pointer;

    &.active {
      font-weight: bold;
      color: #000;
    }

    &:hover {
      color: #3a6ea5;
    }
  }
}
</style>
