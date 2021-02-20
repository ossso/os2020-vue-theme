<template>
  <div class="ui-message-group">
    <transition-group
      name="fade-up"
      tag="div"
    >
      <message-item
        v-for="item in list"
        :key="item.key"
        :options="item"
      />
    </transition-group>
  </div>
</template>

<script>
/**
 * 自定义的message弹窗提示
 */

import MessageItem from './message-item.vue';

export default {
  name: 'UIMessage',
  components: {
    MessageItem,
  },
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.cacheIndex = 0;
    this.setTimer = [];
  },
  destroyed() {
    this.setTimer.forEach((i) => clearTimeout(i));
  },
  methods: {
    /**
     * 添加消息
     */
    message({
      type,
      title,
      content,
      deply,
    }) {
      const key = `message_${Date.now()}_${this.cacheIndex += 1}`;
      this.list.push({
        key,
        title,
        content,
        type,
        index: this.cacheIndex,
      });
      this.setTimer.push(setTimeout(() => {
        const index = this.list.findIndex((i) => i.key === key);
        if (index > -1) {
          this.list.splice(index, 1);
        }
      }, deply));
    },
  },
};
</script>

<style lang="scss" scoped>
.ui-message-group {
  position: fixed;
  top: 20px;
  left: 50%;
  width: max(12vw, 360px);
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateX(-50%);
}

/* fade-up */
.fade-up-leave-active,
.fade-up-enter-active {
  transition: all .3s;
}

.fade-up-enter,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
