<template>
<div v-html="content" class="side-calendar-box"></div>
</template>

<script>
/**
 * 日历
 */
export default {
  name: 'Calendar',
  props: {
    content: String,
  },
};
</script>

<style lang="scss">
.side-calendar-box {
  margin: -15px;
  text-align: center;
  caption {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    padding: 0;
    text-align: center;
    caption-side: top;
  }

  table {
    width: 100%;
    border: 1px solid #eee;
    border-collapse: collapse;
    tr, th, td {
      border: 1px solid #eee;
    }
  }

  thead {
    background: #f5f5f5;
    th {
      line-height: 30px;
      font-weight: normal;
      color: #2a3a4a;
    }
  }

  tbody {
    td {
      line-height: 32px;
      color: #666;
      a {
        display: block;
        color: #3a6ea5;
        background: #E0FFFF;
        transition: all 200ms ease-in;
        &:hover {
          color: #fff;
          background: #3a6ea5;
        }
      }
    }
  }
}
</style>
