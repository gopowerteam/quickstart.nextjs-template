export const appConfig = {
  title: '开发系统',
  http: {
    gateway: {
      default: process.env
        .NEXT_PUBLIC_GATEWAY_DEFAULT as string
    }
  }
} as const
