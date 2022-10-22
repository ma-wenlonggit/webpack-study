const path = require("path");
// eslint配置
const ESLintPlugin = require('eslint-webpack-plugin');
// html文件处理
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 遵循commonJs模块化
// 入口相对路径  输出绝对路径
module.exports = {
  // 入口
  entry: "./src/main.js",
  // 输出
  output: {
    // 文件输出路径,所有打包文件的输出目录,开发模式不需要输出目录
    // path: path.resolve(__dirname, "dist"), //绝对路径
    path: undefined, //绝对路径
    // path: path.resolve(__dirname, "dist/js"), //绝对路径
    // 入口文件打包输出文件名
    filename: "static/js/main.js",
    // 自动清空上次打包结果,清空 path 目录,开发模式不需要清空
    // clean: true,
  },
  // 加载器
  module: {
    rules: [
      // loader的配置
      // css
      {
        test: /\.css$/i, //检测.css结尾文件
        //使用哪些loader，从右往左执行
        // style-loader 将js中css通过创建style标签添加到html中生效
        // css-loader 将css资源编译成commonjs模块到js中
        use: ["style-loader", "css-loader"],
      },
      // less
      {
        test: /\.less$/i,
        // loader 只能使用一个loader，use可以使用多个，要注意
        use: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
      // scss
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          "style-loader",
          // 将 CSS 转化成 CommonJS 模块
          "css-loader",
          // 将 Sass 编译成 CSS
          "sass-loader",
        ],
      },
      //  stylus
      {
        test: /\.styl$/,
        // loader: "stylus-loader", // 将 Stylus 文件编译为 CSS
        use: ["style-loader", "css-loader", "stylus-loader"],
      },
      //   图片转base64
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        // 小于指定大小转base64
        type: "asset",
        // 小于10kb，不要请求，减少请求数据，提高访问速度，但是体积会变大
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb
          },
        },
        generator: {
          // 输出图片名称
          // [hash:number] hash字符长度
          filename: "static/images/[hash:5][ext][query]",
        },
      },
      //   字体
      {
        // 其他资源处理，如音视频
        test: /\.(ttf|woff2?|mp3|mp4|rmvb|avi)$/,
        // 不转base64，原样输出
        type: "asset/resource",
        generator: {
          // 输出字体名称
          // [hash:number] hash字符长度
          filename: "static/media/[hash:6][ext][query]",
        },
      },
      //排除node_modules目录代码不编译
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
    ],
  },
  // 插件
  plugins: [
    new ESLintPlugin({
      // 指定检查文件的目录
      context: path.resolve(__dirname,"../src")
    }),
    new HtmlWebpackPlugin({
      // 以public/index.html为模版文件
      // 内容和原文件一致，自动引入打包生产的js文件
      // template:path.resolve(__dirname,"public/index.html"),
      template: path.resolve(__dirname, "../../src/public/index.html"),
    })
  ],
  // 模式
  mode: "development",
  // 开发服务器
  devServer: {
    // 域名
    host: "localhost",
    // 端口
    port: 3000,
    // 自动开启浏览器
    open: true

  }
};
