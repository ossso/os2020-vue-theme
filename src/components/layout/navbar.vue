<template>
<nav class="layout-navbar">
  <ul class="nav-menu">
    <li
      v-for="(item, index) in list"
      :key="index"
      class="nav-item"
      @mouseenter="showMenuIndex = index"
      @mouseleave="showMenuIndex = -1"
    >
      <a
        :href="item.url"
        class="nav-item-link"
        @click="toNavItem(item)"
      >{{item.name}}</a>
      <template v-if="item.children">
        <transition name="nav-child-menu">
          <ul
            class="nav-child-menu"
            v-show="showMenuIndex === index">
            <li
              v-for="(childItem, childIndex) in item.children"
              :key="childIndex"
              class="nav-child-item"
            >
              <a
                :href="childItem.url"
                class="nav-child-item-link"
                @click="toNavItem(childItem)"
              >{{childItem.name}}</a>
            </li>
          </ul>
        </transition>
      </template>
    </li>
  </ul>
</nav>
</template>

<script>
/**
 * Layout NavBar
 */
export default {
  name: 'NavBar',
  data() {
    return {
      list: [],
      showMenuIndex: -1,
    };
  },
  created() {
    this.getNavBar();
  },
  methods: {
    /**
     * 获取导航条的内容
     */
    getNavBar() {
      this.$api({
        query: {
          mod: 'module',
          filename: 'navbar',
        },
      }).then((res) => {
        const content = res.module.Content;
        const elem = document.createElement('div');
        elem.innerHTML = content;
        elem.innerHTML = elem.innerText;
        this.initNavbar(elem);
      }).catch((err) => {
        this.$message.error(`getNavBar ${err.message}`);
      });
    },
    /**
     * 初始化导航栏
     */
    initNavbar(elem) {
      const list = [];
      function getMenuItem(el) {
        const item = {};
        const a = el.querySelector('a:not(li)');
        if (a) {
          item.name = a.innerText.trim();
          item.url = a.href;
          item.target = a.target;
        } else {
          const span = el.querySelector('span');
          item.name = span ? span.innerText.trim() : el.innerText.tirm();
          item.url = '#';
          item.target = '';
        }
        return item;
      }
      elem.children.forEach((el) => {
        const item = getMenuItem(el);
        const ulElem = el.querySelector('ul');
        if (ulElem) {
          item.children = [];
          ulElem.children.forEach((el2) => {
            item.children.push(getMenuItem(el2));
          });
        }
        if (item.name) {
          list.push(item);
        }
      });
      this.list = list;
    },
    /**
     * 前往单条页面
     */
    toNavItem(item) {
      console.log(item);
    },
  },
};
</script>

<style lang="scss" scoped>
$navHeight: 60px;

.layout-navbar {
  flex: 1;
  display: flex;

  .nav-menu {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
    height: $navHeight;
    margin: auto 0;

    .nav-item {
      position: relative;
      margin-left: 2em;
      line-height: $navHeight;
      font-size: 16px;
    }

    .nav-item-link {
      color: #2a3a4a;

      &:hover {
        color: #f66;
      }
    }

    .nav-child-menu {
      position: absolute;
      top: $navHeight;
      left: 50%;
      width: max-content;
      padding: 10px 0;
      border-radius: 6px;
      background: #fff;
      box-shadow: 0 2px 2px 3px rgba(50, 50, 50, .05);
      transform: translateX(-50%);
    }

    .nav-child-item {
      line-height: 40px;
      padding: 0 15px;
    }

    .nav-child-item-link {
      color: #2a3a4a;

      &:hover {
        color: #f66;
      }
    }
  }
}

.nav-child-menu-enter-active,
.nav-child-menu-leave-active {
  transition: all 300ms ease-in-out;
}

.nav-child-menu-enter {
  opacity: 0;
  margin-top: -20px;
}

.nav-child-menu-leave-to {
  opacity: 0;
  margin-top: 20px;
}
</style>
