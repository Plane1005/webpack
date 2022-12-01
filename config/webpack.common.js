const resolveApp = require('./path')
const path = require('path')
const { DefinePlugin, ContextReplacementPlugin, DllReferencePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const prodConfig = require('./webpack.prod')
const devConfig = require('./webpack.dev')

// 生产环境和开发环境通用配置
const commonConfig = {
  // watch: true,
  entry: './src/index.tsx',
  output: {
    filename: 'js/[name].js',
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
          MiniCssExtractPlugin.loader,
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
        test: /\.scss/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
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
      {
        test: /\.(ttf|woff2?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name][hash:3][ext]',
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader?cacheDirectory=true'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack App',
      template: './public/index.html',
      // favicon: './public/favicon.ico'
    }),
    new MiniCssExtractPlugin({
      //提取css
      filename: 'css/main.css',
    }),
    new DefinePlugin({
      PUBLIC_URL: '"./"',
    }),
    new ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn|en/),
    // new DllReferencePlugin({
    //   manifest: path.resolve(__dirname, 'dist/dll', 'mainfist.json'),
    // }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    minimizer: [
      new UglifyJsPlugin({
        //压缩js
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin(), //压缩css
    ],
  },
}

module.exports = (env) => {
  const isProduction = env.production
  // 根据环境进行webpack配置合并
  const config = isProduction ? prodConfig : devConfig
  const mergeConfig = merge(commonConfig, config)
  return mergeConfig
}
