const fetch = require('node-fetch')
const Handlebars = require('handlebars')
const { generateControllerFiles } = require('./controller')
const { generateServiceFiles } = require('./service')
const { info, loadConfig } = require('../utils')
const { generateModelFiles } = require('../generate-model-file')

const configJson = loadConfig()

// 扩展模版命令toUpperCase
Handlebars.registerHelper('toUpperCase', function (str) {
  return str.toUpperCase()
})

// 扩展模版命令toLowerCase
Handlebars.registerHelper('toLowerCase', function (str) {
  return str.toLowerCase()
})

Handlebars.registerHelper('replace', function (context, findStr, replaceStr) {
  return context.replace(findStr, replaceStr)
})
/**
 * 生成服务
 */
function generateService(config) {
  const { gateway, services, swagger } = config
  info('-------------------------')
  info('Gatewat地址', gateway)
  info('Swagger地址', swagger)
  if (services && Object.keys(services).length) {
    info('服务模式', '多服务')
    // 多服务模式
    return Object.entries(services).map(([key, service]) => ({
      key: key,
      name: service,
      url: `${gateway}/${service}/${swagger}`,
      gateway: config.name,
      config
    }))
  } else {
    info('服务模式', '单服务')
    // 单服务模式
    return [
      {
        key: '',
        name: '',
        gateway: config.name,
        url: `${gateway}/${swagger}`,
        config
      }
    ]
  }
}

/**
 * 获取控制器名称
 */
function getControllerName(path, currentTag, tags) {
  // 无法解析
  try {
    const [controller] =
      path.match(/(?<=\b\api\/).*?(?=\/)/g) ||
      path.match(/(?<=\b\api\/).*/g) ||
      path.match(/(?<=\/).*?(?=\/)/g) ||
      path.match(/(?<=\/).*/g)
    return controller
      .split('/')
      .map((x) => x.replace(/^\S/, (s) => s.toUpperCase()))
      .join('')
  } catch (a) {
    throw new Error(`路径:${path}不符合规范`)
  }
}

/**
 * 获取行为器名称
 */
function getActionName(operation) {
  return operation.replace(/Using.*?$/, '')
}

function getAliasName(config, service, key) {
  if (!config.alias) {
    return
  }

  if (Array.isArray(config.alias)) {
    const target = config.alias.find(
      (x) => x.service === service && x.from === key
    )

    if (target) {
      return target.to
    }
  } else {
    if (config.alias.from === key) {
      return config.alias.to
    }
  }
}

function getPropertyType(schema) {
  switch (true) {
    case !!schema.$ref:
      const ref = schema.$ref.replace('#/components/schemas/', '')
      if (ref.startsWith('Map')) return
      return ref.startsWith('Page')
        ? ref.replace(/^Page/, '').replace(/$/, '[]')
        : ref
    case schema.type === 'array':
      const type = getPropertyType(schema.items)
      return type && `${type}[]`
  }
}

function getActionReponseShema(service, responses) {
  const response = responses['200']

  if (
    !response ||
    !(response.content['*/*'] || response.content['application/json']).schema ||
    !service.config.model
  ) {
    return
  }

  const { schema } =
    response.content['*/*'] || response.content['application/json']

  return getPropertyType(schema)
}

/**
 * 获取Action列表
 * @param paths
 */
function createControllers(service, controllers, paths, tags) {
  Object.entries(paths)
    // .filter(
    //   ([key]) =>
    //     key.startsWith('/api') ||
    //     key.startsWith(`/${service.name}`)
    // )
    .map(([key, config]) => ({
      path: key.replace(new RegExp(`^\/${service.name}\/`), '/'),
      config
    }))
    .forEach(({ path, config }) => {
      // 接口行为
      Object.entries(config).forEach(
        ([
          method,
          { summary, description, tags: currentTag, operationId, responses }
        ]) => {
          const getController = service.config.controllerResolver
            ? service.config.controllerResolver
            : getControllerName
          const controllerName = getController(path, currentTag, tags)
          const aliasName = getAliasName(
            service.config,
            service.key,
            controllerName
          )
          const controller = aliasName || controllerName
          const action = getActionName(operationId)
          const filename = controller
            .replace(/([A-Z])/g, '-$1')
            .replace(/^-/g, '')
            .toLowerCase()

          // 查询并创建控制器
          let target = controllers.find((x) => x.controller === filename)

          // 控制器不存在则自动创建
          if (!target) {
            target = {
              gateway: service.gateway,
              controller: filename,
              filename: filename,
              controllerClass: `${controller}Controller`,
              serviceClass: `${controller}Service`,
              actions: []
            }
            controllers.push(target)
          }

          // 添加控制器行为
          target.actions.push({
            path,
            controller,
            action: (action || method).replace(/-(\w)/g, ($, $1) =>
              $1.toUpperCase()
            ),
            schema: getActionReponseShema(service, responses),
            defaultAction: !action,
            method: method.replace(/^\S/, (s) => s.toUpperCase()),
            comment: summary ?? description
          })
        }
      )
    })
}

/**
 * 生成配置文件
 * @param service
 */
function generate(service) {
  fetch(service.url, { method: 'GET' })
    .then((res) => res.json()) // expecting a json response
    .then(({ tags, paths, components }) => {
      info('-------------------------')
      info('服务名称', service.name || '无')
      info('服务路径', service.url)
      info('-------------------------')
      // 控制器列表
      const controllers = []
      // 填装控制器列表
      createControllers(service, controllers, paths, tags)

      // 生产文件
      generateControllerFiles(service, controllers)
      generateServiceFiles(service, controllers)

      if (configJson.model) {
        generateModelFiles(service, components)
      }
    })
}

module.exports.generateRequestFile = () => {
  if (!configJson) {
    throw new Error('无法找到配置文件')
  }

  const generateGatewayFile = (config) =>
    generateService(config).forEach(generate)
  // 多网关处理
  if (Array.isArray(configJson)) {
    configJson.forEach(generateGatewayFile)
  } else {
    generateGatewayFile(configJson)
  }
}
