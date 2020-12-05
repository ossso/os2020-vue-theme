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
    target: 'http://10.0.0.123:39080/',
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
  publicPath: '/',
  outputDir: 'dist',
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },
  productionSourceMap: false,
};

module.exports = config;
