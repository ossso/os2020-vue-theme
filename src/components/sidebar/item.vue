<template>
  <div
    class="side-item"
    :class="{ 'hide-title': item.IsHideTitle }"
  >
    <div
      v-if="!item.IsHideTitle"
      class="side-item-head"
    >
      <h3>{{ item.Name }}</h3>
    </div>
    <template v-if="item.FileName === 'calendar'">
      <calendar :content="item.Content" />
    </template>
    <template v-else-if="item.FileName === 'searchpanel'">
      <search />
    </template>
    <template v-else>
      <ul
        v-if="item.Type === 'ul'"
        class="side-content side-content-ul"
        :class="item.HtmlID"
        v-html="item.Content"
      />
      <div
        v-else
        class="side-content side-content-div"
        :class="item.HtmlID"
        v-html="item.Content"
      />
    </template>
  </div>
</template>

<script>
/**
 * 侧栏单条
 */

import linkHandle from '@/utils/a-link-handle';
import Calendar from './calendar.vue';
import Search from './search.vue';

export default {
  name: 'SidebarItem',
  components: {
    Calendar,
    Search,
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    this.cache.linkHandle = (e) => {
      linkHandle.call(this, e);
    };
    this.cache.allATag = this.$el.querySelectorAll('a');
    for (let i = 0; i < this.cache.allATag.length; i += 1) {
      const item = this.cache.allATag[i];
      item.addEventListener('click', this.cache.linkHandle);
    }
  },
  destroyed() {
    if (this.cache.allATag) {
      for (let i = 0; i < this.cache.allATag.length; i += 1) {
        const item = this.cache.allATag[i];
        item.removeEventListener('click', this.cache.linkHandle);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.side-item {
  margin-bottom: 24px;
  padding: 15px 25px;
  background: #fff;

  &.hide-title {
    padding: 25px;
  }

  .side-item-head {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
    border-bottom: 2px solid #eee;

    h3 {
      position: relative;
      height: 40px;
      margin: 0;
      padding: 0;
      line-height: 40px;
      font-size: 18px;
      font-weight: bold;
      color: #3a6ea5;
      &::after {
        content: '';
        position: absolute;
        right: 0;
        bottom: -2px;
        left: 0;
        display: block;
        height: 2px;
        background: #3a6ea5;
      }
    }
  }
}
</style>

<style lang="scss">
.side-content.divNavbar,
.side-content.divCatalog,
.side-content.divComments,
.side-content.divPrevious,
.side-content.divAuthors,
.side-content.divArchives {
  li {
    position: relative;
    padding-left: 10px;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 4px;
      height: 4px;
      margin-top: -2px;
      border-radius: 50%;
      background: #222;
    }

    a {
      display: block;
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      color: #222;
      overflow: hidden;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.side-content.divTags,
.side-content.divFavorites,
.side-content.divLinkage {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;

  li {
    margin-right: 5px;

    a {
      font-size: 14px;
      color: #222;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.side-content.divMisc {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: -10px;

  li {
    margin: 0 10px 10px 0;

    a {
      font-size: 14px;
      color: #222;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.side-content.divStatistics {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;

  li {
    width: 50%;
  }
}
</style>
