const proxyPreList = ['api.php', 'zb_system', 'zb_users'];

const proxy = {
  // '/': {
  //   target: 'http://10.0.0.180/',
  //   changeOrigin: true,
  // },
};

proxyPreList.forEach((item) => {
  const key = `/${item}`;
  proxy[key] = {
    target: 'http://10.0.0.180:39080/',
    changeOrigin: true,
  };
});

const devServer = {
  proxy,
  port: 8088,
};

const config = {
  devServer,
  lintOnSave: false,
  publicPath: (() => {
    /**
     * 本地运行的生产路径
     */
    if (process.env.NODE_ENV === 'production') {
      /**
       * 基于CDN内容
       */
      if (process.env.NODE_PUBLIC === 'cdn') {
        return './static/cdn-spa/';
      }
      return './static/spa/';
    }
    if (process.env.DEV_HOST) {
      return '/teaxcx-admin/';
    }
    return '/';
  })(),
  outputDir: (() => {
    /**
     * 基于CDN内容
     */
    if (process.env.NODE_PUBLIC === 'cdn') {
      return 'dist/cdn';
    }
    return 'dist/all';
  })(),
  pages: {
    index: {
      entry: (() => {
        /**
         * 基于CDN内容
         */
        if (process.env.NODE_PUBLIC === 'cdn') {
          return 'src/main-cdn.js';
        }
        return 'src/main.js';
      })(),
      template: (() => {
        /**
         * 基于CDN内容
         */
        if (process.env.NODE_PUBLIC === 'cdn') {
          return 'public-cdn/index.html';
        }
        return 'public/index.html';
      })(),
      filename: 'index.html',
    },
  },
  productionSourceMap: false,
};

if (process.env.NODE_PUBLIC === 'cdn') {
  config.configureWebpack = {
    externals: {
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      'element-ui': 'ElementUI',
      axios: 'axios',
      nprogress: 'NProgress',
      'vue-awesome-swiper': 'VueAwesomeSwiper',
      'vue-grid-layout': 'VueGridLayout',
      lodash: 'lodash',
    },
  };
}

module.exports = config;
