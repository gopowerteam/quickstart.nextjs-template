import httpBoot from './http.boot'

export async function boot(done: () => void) {
  await httpBoot()

  done()
}
