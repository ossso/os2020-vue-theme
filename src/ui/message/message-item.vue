<template>
  <div
    class="ui-message-box"
    :class="options.type"
    :style="style"
  >
    <div
      v-if="options.title"
      class="message-title"
    >
      <span>{{ options.title }}</span>
    </div>
    <div
      v-if="options.content"
      class="message-content"
    >
      <span>{{ options.content }}</span>
    </div>
  </div>
</template>

<script>
/**
 * MessageItem
 */
export default {
  name: 'UIMessageItem',
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    style() {
      const {
        top = 10,
        index = 0,
      } = this.options;
      const style = {};
      style.marginTop = `${top}px`;
      style.zIndex = 100000 + index;
      return style;
    },
  },
};
</script>

<style lang="scss" scoped>
.ui-message-box {
  margin: 0 auto;
  padding: 15px 20px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 15px rgba(50, 50, 50, .1);

  .message-title {
    margin-bottom: 5px;
    font-weight: bold;
    color: #222;
  }

  .message-content {
    color: #444;
  }

  &.error {
    .message-content {
      color: #f30;
    }
  }
}
</style>
