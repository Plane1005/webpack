const path = require('path')
const { DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { PUBLIC_URL, File_URL } = require('./proxy')

module.exports = {
  // watch: true,
  mode: 'development',
  devtool:'cheap-module-source-map',
  target: 'web', // 开发时屏蔽 .browserslistrc
  devServer: {
    hot: true,
    open: true,
    compress: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: PUBLIC_URL,
        // pathRewrite: { "^/api": "" },
        changeOrigin: true
      },
      '/test': {
        target: File_URL,
        // pathRewrite: { "^/api": "" },
        changeOrigin: true
      }
    }
  },
  plugins: [
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
