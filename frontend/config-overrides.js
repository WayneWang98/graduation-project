const { override, fixBabelImports, addLessLoader } = require('customize-cra')
const webpackConfig = require('./build/webpack.dev')

module.exports = override(
  // 配置按需加载
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  // 配置less
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {}
  }),
  (config) => {
    return config
  }
)
