const { readFileSync, writeFileSync } = require('fs')
const { compile } = require('handlebars')
const { dirname, resolve } = require('path')
const mkdirp = require('mkdirp')

const TEMPLATE_FOLDER = resolve(__dirname, '..', 'templates')

const ENCODING = 'utf8'
const modelTemplatePath = `${TEMPLATE_FOLDER}/model.template.hbs`
const modelExtendTemplatePath = `${TEMPLATE_FOLDER}/model-extend.template.hbs`

module.exports.generateModelFiles = async (service, components) => {
  if (!service.config.model || !service.config.modelDir) {
    return
  }

  const modelClassContent = getDefinitionItems(components.schemas)
    .map(({ className, properties }) =>
      generateModelContent(className, properties)
    )
    .join('\r\n')

  const modelImportContent = getImportContent()

  const modelFileContent = [modelImportContent, modelClassContent].join('\r\n')

  await writeModelFile(service, modelFileContent)
}

function getImportContent() {
  return [
    `import { Type } from 'class-transformer'`,
    `import { Model } from '@gopowerteam/http-request'`,
    '\r\n'
  ].join('\r\n')
}

function getDefinitionItems(definitions) {
  return Object.entries(definitions)
    .map(([className, { type, properties }]) => ({
      className,
      type,
      properties
    }))
    .filter(
      ({ className, type }) =>
        !className.startsWith('Map') &&
        !className.startsWith('Page') &&
        !className.startsWith('Pageable') &&
        !className.startsWith('Serializable') &&
        !className.startsWith('Predicate') &&
        !className.startsWith('Sort') &&
        type == 'object'
    )
}

function generateModelContent(className, properties) {
  const templateSource = readFileSync(modelTemplatePath, ENCODING)
  const template = compile(templateSource)

  return template({
    className: className,
    properties: getformatProperty(properties)
  })
}

function getformatProperty(properties) {
  return Object.entries(properties).map(([propertyName, propertyConfig]) => {
    return {
      propertyName,
      propertyType: getPropertyType(propertyConfig),
      originalRef: getOriginalRef(propertyConfig),
      description: propertyConfig.description
    }
  })
}

function getOriginalRef(propertyConfig) {
  return (propertyConfig?.$ref || propertyConfig?.items?.$ref)?.replace(
    '#/components/schemas/',
    ''
  )
}

function getPropertyType(config) {
  switch (true) {
    case !!config.$ref:
      return config.$ref.replace('#/components/schemas/', '')
    case config.type === 'integer':
      return 'number'
    case config.type === 'array':
      return `${getPropertyType(config.items)}[]`
  }

  return config.type
}

/**
 * ?????????????????????
 * @param service
 * @param param1
 * @param content
 */
async function writeModelFile(service, content) {
  const modelDirectionPath = service.config.modelDir

  const path = resolve(modelDirectionPath, `${service.key}.model.ts`)

  await mkdirp.sync(dirname(path))
  await writeFileSync(path, content, ENCODING)
}
