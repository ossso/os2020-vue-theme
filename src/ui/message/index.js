import Vue from 'vue';
import MessageComponent from './message.vue';

const MsgConstructor = Vue.extend(MessageComponent);

let instance = null;

const message = ({
  type = 'normal',
  title = '',
  content = '',
  deply = 3000,
}) => {
  if (!instance) {
    instance = new MsgConstructor({
      el: document.createElement('div'),
    });
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
  }
  instance.vm.$nextTick(() => {
    instance.vm.message({
      type,
      title,
      content,
      deply,
    });
  });
};

['success', 'error'].forEach((i) => {
  message[i] = (msg, options = {}) => {
    message({
      type: i,
      content: msg,
      ...options,
    });
  };
});

export default message;
