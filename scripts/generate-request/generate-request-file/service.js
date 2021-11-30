const { compile } = require('handlebars')
const { readFileSync, writeFileSync } = require('fs')
const { resolve, dirname } = require('path')
const { loadConfig, log } = require('../utils')
const mkdirp = require('mkdirp')

const TEMPLATE_FOLDER = resolve(__dirname, '..', 'templates')

const ENCODING = 'utf8'
const serviceTemplatePath = `${TEMPLATE_FOLDER}/service.template.hbs`
// export const serviceDirectionPath = loadConfig().serviceDir

module.exports.generateServiceFiles = (service, controllers) => {
  controllers.forEach((controller) => generateServiceFile(service, controller))
}

function generateServiceFile(service, controller) {
  let templateSource = readFileSync(serviceTemplatePath, ENCODING)
  let template = compile(templateSource)

  const schemas = [
    ...new Set(
      controller.actions
        .map((action) => action.schema)
        .filter((x) => !!x)
        .map((schema) => schema.replace(/\[\]/g, ''))
    )
  ]

  let serviceFileContent = template(
    Object.assign(controller, {
      service: service.key,
      controllerDir: [service.config.controllerAlias, service.key]
        .filter((x) => x)
        .join('/'),
      modelDir: [service.config.modelAlias].filter((x) => x).join('/'),
      schemas: schemas.length ? schemas : undefined
    })
  )
  writeServiceFile(
    service.key,
    controller,
    serviceFileContent,
    service.config
  ).then((filename) => {
    log(`Service File Generate`, filename)
  })
}

async function writeServiceFile(
  service,
  { controller, filename },
  content,
  config
) {
  const serviceDirectionPath = config.serviceDir
  const path = resolve(serviceDirectionPath, service, `${filename}.service.ts`)
  await mkdirp.sync(dirname(path))
  await writeFileSync(path, content, ENCODING)
  return path
}
