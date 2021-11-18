// @ts-check
const withPlugins = require('next-compose-plugins')
const withLess = require('next-with-less')
const path = require('path')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')

const redirectsConfig = async () => {
  return [
    {
      source: '/',
      destination: '/dashboard',
      permanent: true
    }
  ]
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 严格模式
  reactStrictMode: true,
  // 默认路由跳转配置
  redirects: redirectsConfig
}

const lessPluginConfig = () => {
  withLess.patchNext(
    require('next/dist/build/webpack/config/blocks/css')
  )

  // 加载主题变量
  const themeVariables = lessToJS(
    fs.readFileSync(
      path.resolve(__dirname, 'styles/theme.less'),
      'utf8'
    )
  )

  // 加载全局变量
  const lessVariables = path.resolve(
    __dirname,
    'styles/variables.less'
  )

  return [
    withLess,
    {
      lessLoaderOptions: {
        lessOptions: {
          modifyVars: themeVariables
        },
        additionalData: content =>
          `${content}\n\n@import '${lessVariables}';`
      }
    }
  ]
}

module.exports = withPlugins(
  [lessPluginConfig()],
  nextConfig
)
