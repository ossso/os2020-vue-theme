<template>
  <div class="comment-post">
    <form action="#" onsubmit="return false;" @submit.stop="">
      <div class="comment-user-group">
        <label class="user-info-item">
          <span class="label-name">昵称</span>
          <input v-model="commentUser.name" type="text" class="user-info-input" placeholder="请输入您的名字">
        </label>
        <label class="user-info-item">
          <span class="label-name">邮箱</span>
          <input v-model="commentUser.email" type="text" class="user-info-input" placeholder="请输入您的邮箱">
        </label>
        <label class="user-info-item">
          <span class="label-name">主页</span>
          <input v-model="commentUser.homepage" type="text" class="user-info-input" placeholder="请输入您的主页">
        </label>
      </div>
      <div class="comment-form-content">
        <textarea v-model="form.Content" class="comment-form-textarea" name="Content" placeholder="请输入您评论的正文" />
        <span v-show="form.Content.length > 0 && form.Content.length <= 1000" class="input-count">您已输入{{ form.Content.length }}字</span>
        <span v-show="form.Content.length > 1000" class="input-count">您输入内容已经超过1000字，无法继续提交</span>
      </div>
      <div class="comment-post-foot">
        <div class="comment-vaildate-image" />
        <button class="submit-btn">提交评论</button>
      </div>
    </form>
  </div>
</template>

<script>
/**
 * 评论编辑框
 */
export default {
  name: 'CommentPost',
  data() {
    return {
      form: {
        Content: '',
      },
      commentUser: {
        name: '访客',
        email: '',
        homepage: '',
      },
    };
  },
  methods: {
    onSubmit() {},
    submitForm() {},
  },
};
</script>

<style lang="scss" scoped>
.comment-post {
  margin-bottom: 24px;
  .comment-form-content {
    position: relative;
    width: 100%;
    height: 120px;
    margin-bottom: 10px;

    .input-count {
      position: absolute;
      right: 0;
      bottom: 0;
      padding: 0 10px;
      line-height: 30px;
      font-size: 12px;
      color: #aaa;
    }
  }
  .comment-form-textarea {
    width: 100%;
    height: 100%;
    padding: 10px;
    line-height: 1.5;
    font-size: 14px;
    border: 1px solid #eee;
    border-radius: 4px;
    resize: none;
  }

  .comment-post-foot {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;

    .submit-btn {
      width: 150px;
      height: 40px;
      margin: 0;
      padding: 0;
      padding-left: 2px;
      line-height: 40px;
      color: #fff;
      border: none;
      border-radius: 4px;
      background: #3a6ea5;
      letter-spacing: 2px;
      cursor: pointer;
      &:active {
        opacity: .95;
      }
    }
  }
}

.comment-user-group {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;

  .user-info-item {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    position: relative;
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }

    .label-name {
      position: absolute;
      top: 0;
      left: 10px;
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      color: #666;
    }

    .user-info-input {
      width: 100%;
      height: 36px;
      padding: 4px 10px 4px 50px;
      line-height: 24px;
      font-size: 14px;
      color: #333;
      border: 1px solid #eee;
      border-radius: 4px;
    }
  }
}
</style>
