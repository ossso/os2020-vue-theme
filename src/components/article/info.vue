<template>
<div class="article-info">
  <div class="article-info-item">
    <a-icon type="appstore" />
    <span class="value">{{article.Category.Name}}</span>
  </div>
  <div class="article-info-item">
    <a-icon type="eye" />
    <span class="value">{{article.ViewNums}}</span>
  </div>
  <div class="article-info-item">
    <a-icon type="message" />
    <span class="value">{{article.CommNums}}</span>
  </div>
</div>
</template>

<script>
/**
 * 文章信息
 */
export default {
  name: 'ArticleInfo',
  props: {
    article: Object,
  },
};
</script>

<style lang="scss" scoped>
.article-info {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;

  .article-info-item {
    margin-right: 20px;
    color: #666;
  }

  .value {
    margin-left: 6px;
    color: #3a4a5a;
  }
}
</style>
