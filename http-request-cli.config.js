module.exports = {
  name: 'default',
  gateway: 'http://192.168.5.52:8000',
  swagger: 'rest-api-docs/dso',
  model: false,
  modelDir: {
    alias: '@/http/model', // 控制器目录名别
    path: './http/model' // 控制器目录路径
  },
  controllerDir: {
    alias: '@/http/controller', // 控制器目录名别
    path: './http/controller' // 控制器目录路径
  },
  serviceDir: {
    alias: '@/http/services', // 服务目录名别
    path: './http/services' // 服务目录名别
  },
  services: {
    'assistant-service': 'as',
    'user-service': 'uaa',
    'learn-service': 'e-learning'
  }
}
