const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        createProxyMiddleware("/api",{
          target: 'https://api.douban.com/v2/',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          },
          secure: false
        })
    )
};

console.log('测试')
