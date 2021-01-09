/**
 * 路由处理
 */
import NProgress from 'nprogress';
import router from './router'; // 路由配置
import 'nprogress/nprogress.css';

NProgress.configure({
  showSpinner: false,
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  next();
  return true;
});

router.afterEach(() => {
  window.document.body.scrollTop = 0;
  window.document.documentElement.scrollTop = 0;
  NProgress.done();
});

export default router;
