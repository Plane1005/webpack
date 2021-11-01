module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage', // 是否进行polyfill填充
        corejs: 3, // 不设置会报错 
      }
    ],
    ['@babel/preset-react'],
    ['@babel/preset-typescript'],
  ],
  plugins: [
    [
      'import',
      {
        libraryName: '@amap/amap-react',
        libraryDirectory: 'lib',
      },
    ],
  ],
  // plugins: [
  //   ['react-refresh/babel']
  // ]
}
