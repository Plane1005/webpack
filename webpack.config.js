const path = require('path')
const { DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  // watch: true,
  mode: 'development',
  devtool:false,
  entry: './src/index.js',
  target: 'web', // 开发时屏蔽 .browserslistrc
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, 'build'),
    // publicPath: '/'
    // assetModuleFilename: "img/[name][hash:6][ext]"
  },
  resolve: {
    extensions: [".js", ".json", "jsx", "ts", "tsx"],
    alias: {
      '@': path.resolve(__dirname,'src')
    }
  },
  devServer: {
    hot: true,
    open: true,
    compress: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://apis.juhe.cn',
        pathRewrite: { "^/api": "" },
        changeOrigin: true
      }
    }
    // publicPath: '/jet'
    // progress: true,
    // port: 6666,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            esModule: false
          }
        },'postcss-loader']
      },{
        test: /\.less/,
        use: ['style-loader', 'css-loader','postcss-loader','less-loader']
      },
      // { //输出文件
      //   test: /\.(png|svg|gif|jpe?g)$/,
      //   type: 'asset/resource',
      //   generrator: {
      //     filename: "img/[name][hash:6][ext]"
      //   }
      // { // 转换base64
      //   test: /\.(png|svg|gif|jpe?g)$/,
      //   type: 'asset/inline',
      // },
      { //根据大小输出文件
        test: /\.(png|svg|gif|jpe?g)$/,
        type: 'asset',
        generator: {
          filename: "img/[name][hash:6][ext]"
        },
        parser: {
          dataUrlCondition: {
            maxSize: 50 * 1024
          }
        }
      },
        // use: [{ // 通过插件打包
        //   // loader: 'file-loader',
        //   loader: 'url-loader', // 图片转换为base64，放入main.js
        //   options: {
        //     // esModule: false  reqiure引用文件，打包成esmodule
        //     name: '[name].[hash:6].[ext]',
        //     outputPath: 'img',
        //     limit: 50 * 1024, // 如果超出这个值，就不进行转换
        //   }
        // }]
      {
        test: /\.(ttf|woff2?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name][hash:3][ext]'
        }
      }, {
        test: /\.(jsx?|tsx?)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Webpack App',
      template: './public/index.html',
      // favicon: './public/favicon.ico'
    }),
    new DefinePlugin({
      PUBLIC_URL: '"./"'
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: 'public',
        globOptions: {
          ignore: ['**/index.html']
        }
      }]
    }),
    new ReactRefreshWebpackPlugin()
  ]
}
