/**
 * 原生链接处理工具
 */

import routesQueryParams from './routes-query-params';

function linkHandle(e) {
  // e.preventDefault();
  const {
    href,
  } = e.target;
  let toUrl = null;
  try {
    toUrl = new window.URL(href);
  } catch (error) {
    toUrl = {};
  }
  const isOtherHost = (
    href.indexOf(this.zbp.host) === -1 // 不包含zbp的host
    && href.indexOf(window.location.origin) === -1 // 不包含当前的host
    && toUrl.protocol // 有访问协议
  );
  const isZbpPath = (
    toUrl.pathname.indexOf('/zb_system/') > -1 // 包含zb_system
    || toUrl.pathname.indexOf('/zb_users/') > -1 // 包含zb_users
  );
  if (isOtherHost || isZbpPath) {
    return;
  }
  // 如果href仅仅是路径，需要额外处理一下
  if (href.indexOf('http') !== 0) {
    try {
      toUrl = new window.URL(href, window.location);
    } catch (error) {
      toUrl = null;
      throw Error(`${href} 不是一个合法的链接路径`);
    }
  }
  const toFullPath = `${toUrl.pathname}${toUrl.search}`;
  if (this.$route.path === toUrl.pathname) {
    if (toUrl.search.indexOf('?') === -1) {
      this.$router.push({
        name: 'Home',
      });
      return;
    }
    const params = new URLSearchParams(toUrl.search.split('?')[1]);
    const routesArray = Object.keys(routesQueryParams);
    for (let i = 0; i < routesArray.length; i += 1) {
      const key = routesArray[i];
      const item = routesQueryParams[key];
      const param = params.get(item.param);
      if (param) {
        const info = {};
        // eslint-disable-next-line no-restricted-syntax
        for (const [k, v] of params) {
          info[k] = v;
        }
        const route = this.$createRoute(key, info);
        this.$router.push(route)
          .then()
          .catch(() => {
            window.location.href = toUrl.toString();
          });
        break;
      }
    }
  } else
  if (this.$route.fullPath !== toFullPath) {
    this.$router.push(toFullPath)
      .then()
      .catch(() => {
        window.location.href = toUrl.toString();
      });
  }
  // 阻止默认事件
  if (e.preventDefault) {
    e.preventDefault();
  }
}

export default linkHandle;
