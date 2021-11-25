module.exports = {
  apps: [
    {
      name: 'nextjs',
      exec_mode: 'cluster',
      instances: 'max',
      script: 'npm',
      args: 'start'
    }
  ]
}
