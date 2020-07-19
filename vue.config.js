const path = require("path");
const resolve = dir => path.join(__dirname, dir);
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
module.exports = {
    configureWebpack: {
      devServer: {
        proxy: {
          //名字可以自定义，用于指定哪些请求需要被 target 对应的主机代理
          // 当前 devServer 的地址是 localhost:8080
          '/api': {
            target: 'http://localhost:8081', //设置你调用的接口域名和端口号
            changeOrigin: true, //这里设置是否跨域
            pathRewrite: { // 路径重写
              '^/api': ''
            }
          }
        }
      }
    },
    chainWebpack: config => {
      // 添加别名
      config.resolve.alias
        .set("vue$", "vue/dist/vue.esm.js")
        .set("@", resolve("src"))
        .set("@assets", resolve("src/assets"))
        .set("@scss", resolve("src/assets/scss"))
        .set("@components", resolve("src/components"))
        .set("@plugins", resolve("src/plugins"))
        .set("@views", resolve("src/views"))
        .set("@router", resolve("src/router"))
        .set("@store", resolve("src/store"))
        .set("@layouts", resolve("src/layouts"))
        .set("@static", resolve("src/static"));
    }
  }
