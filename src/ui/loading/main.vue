<template>
  <div class="ui-loading-group">
    <div
      v-if="loading"
      class="loading-box"
    >
      <div class="loader" />
    </div>
    <slot />
  </div>
</template>

<script>
/**
 * Loading
 */
export default {
  name: 'UILoading',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.ui-loading-group {
  position: relative;

  .loading-box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    display: flex;
    background: rgba(#fff, 0.5);
  }

  .loader,
  .loader:before,
  .loader:after {
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation-fill-mode: both;
    animation: load 1.2s infinite ease-in-out;
  }

  .loader {
    position: relative;
    margin: auto;
    color: #3a6ea5;
    transform: translateY(-24px);
    animation-delay: -0.1s;
  }
  .loader:before,
  .loader:after {
    content: '';
    position: absolute;
    top: 0;
  }
  .loader:before {
    left: -35px;
    animation-delay: -0.2s;
  }
  .loader:after {
    left: 35px;
  }
}

@keyframes load {
  0%,
  80%,
  100% {
    box-shadow: 0 24px 0 -13px;
  }
  40% {
    box-shadow: 0 24px 0 0;
  }
}
</style>
