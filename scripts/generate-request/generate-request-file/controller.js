const { compile } = require('handlebars')
const { readFileSync, writeFileSync } = require('fs')
const { resolve, dirname } = require('path')
const { loadConfig, log } = require('../utils')
const mkdirp = require('mkdirp')

const TEMPLATE_FOLDER = resolve(
  __dirname,
  '..',
  'templates'
)

const ENCODING = 'utf8'
const controllerTemplatePath = `${TEMPLATE_FOLDER}/controller.template.hbs`
// export const controllerDirectionPath = loadConfig().controllerDir

module.exports.generateControllerFiles = (
  service,
  controllers
) => {
  controllers.forEach(controller =>
    generateControllerFile(service, controller)
  )
}

function generateControllerFile(service, controller) {
  let templateSource = readFileSync(
    controllerTemplatePath,
    ENCODING
  )
  let template = compile(templateSource)
  let controllerFileContent = template(
    Object.assign(controller, { service: service.name })
  )
  writeControllerFile(
    service.key,
    controller,
    controllerFileContent,
    service.config
  ).then(filename => {
    log('Controller File Generate', `${filename}`)
  })
}

/**
 * 生成控制器文件
 * @param service
 * @param param1
 * @param content
 */
async function writeControllerFile(
  service,
  { controller, filename },
  content,
  config
) {
  const controllerDirectionPath = config.controllerDir

  const path = resolve(
    controllerDirectionPath,
    service,
    `${filename}.controller.ts`
  )
  await mkdirp.sync(dirname(path))
  await writeFileSync(path, content, ENCODING)
  return path
}
