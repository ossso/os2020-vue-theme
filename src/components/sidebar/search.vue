<template>
  <div class="side-search-group">
    <form
      action="#"
      class="search-form"
      onsubmit="return false;"
    >
      <input
        v-model="keyword"
        class="search-input"
        type="text"
        placeholder="请输入搜索关键词"
      >
      <button
        class="search-submit"
        @click="onSubmit"
      >
        搜索
      </button>
    </form>
  </div>
</template>

<script>
/**
 * 侧栏搜索
 */
export default {
  name: 'SideSearch',
  data() {
    return {
      keyword: '',
    };
  },
  methods: {
    onSubmit() {
      if (this.keyword === '') {
        this.$message.error('搜索词不能为空');
        return;
      }
      if (this.$route.query.search === this.keyword) {
        return;
      }
      this.$router.push({
        name: 'Search',
        query: {
          search: this.keyword,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.side-search-group {
  padding: 10px 0;

  .search-form {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
  }

  .search-input {
    flex: 1;
    width: 140px;
    height: 40px;
    padding: 5px 10px;
    line-height: 28rpx;
    font-size: 14px;
    border: 1px solid #eee;
    border-radius: 4px;
    transition: all 200ms linear;
    &:focus {
      border-color: #aaa;
    }
  }

  .search-submit {
    width: 60px;
    height: 40px;
    margin: 0 0 0 10px;
    padding: 0;
    line-height: 40px;
    font-size: 14px;
    text-align: center;
    color: #fff;
    border: none;
    border-radius: 4px;
    background: #3a6ea5;
    cursor: pointer;
    transition: all 200ms linear;
    &:hover {
      background: lighten(#3a6ea5, 10%);
    }
  }
}
</style>
