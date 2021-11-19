const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

const CONFIG_FILE = [
  'http-request-cli.config.cjs',
  'http-request-cli.config.js'
]

let CONFIG_DATA = null

/**
 * 加载配置信息
 * @returns
 */
module.exports.loadConfig = () => {
  if (CONFIG_DATA) return CONFIG_DATA

  const filePath = CONFIG_FILE.find(file =>
    fs.existsSync(file)
  )

  if (!filePath) {
    throw Error('未找到配置文件')
  } else {
    console.info(`发现配置文件: ${filePath}`)
  }

  const configJson = require(path.resolve('./', filePath))

  const getConfig = config => ({
    ...config,
    controllerAlias: config.controllerDir.alias,
    controllerDir: path.resolve(config.controllerDir.path),
    serviceAlias: config.serviceDir.alias,
    serviceDir: path.resolve(config.serviceDir.path),
    modelAlias: config.modelDir?.alias,
    modelDir:
      config.modelDir?.path &&
      path.resolve(config.modelDir?.path)
  })

  if (Array.isArray(configJson)) {
    CONFIG_DATA = configJson.map(getConfig)
  } else {
    CONFIG_DATA = getConfig(configJson)
  }

  return CONFIG_DATA
}

module.exports.log = (type, message) => {
  console.log(
    chalk`{blue.bold [${type}]} {gray ${message}}`
  )
}

module.exports.info = (type, message = '') => {
  console.log(
    chalk`{red.bold ${type}} {green.bold ${message}}`
  )
}
