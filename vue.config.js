const proxyPreList = ['api.php', 'zb_system', 'zb_users'];

const proxy = {};

proxyPreList.forEach((item) => {
  const key = `/${item}`;
  proxy[key] = {
    target: process.env.ZBLOG_HOST || '/',
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
