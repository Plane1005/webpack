const resolveApp = require('./path')
const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')

const prodConfig = require('./webpack.prod')
const devConfig = require('./webpack.dev')

// 生产环境和开发环境通用配置
const commonConfig = {
  // watch: true,
  entry: './src/index.tsx',
  output: {
    filename: 'js/main.js',
    path: resolveApp('./build'),
    // publicPath: '/'
    // assetModuleFilename: "img/[name][hash:6][ext]"
  },
  externals: {
    BMap: 'BMap',
    AMap: 'AMap',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': resolveApp('./src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              esModule: false,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.less/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      { test: /\.(pdf|svg)$/, use: 'file-loader?name=[path][name].[ext]' },
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
      {
        //根据大小输出文件
        test: /\.(png|svg|gif|jpe?g)$/,
        type: 'asset',
        generator: {
          filename: 'img/[name][hash:6][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 50 * 1024,
          },
        },
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
          filename: 'font/[name][hash:3][ext]',
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack App',
      template: './public/index.html',
      // favicon: './public/favicon.ico'
    }),
    new DefinePlugin({
      PUBLIC_URL: '"./"',
    }),
  ],
}

module.exports = (env) => {
  const isProduction = env.production
  // 根据环境进行webpack配置合并
  const config = isProduction ? prodConfig : devConfig
  const mergeConfig = merge(commonConfig, config)
  return mergeConfig
}
