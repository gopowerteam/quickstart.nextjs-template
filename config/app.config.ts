export const appConfig = {
  title: '开发系统',
  http: {
    gateway: {
      default: process.env
        .NEXT_PUBLIC_GATEWAY_DEFAULT as string
    }
  },
  storage: {
    public: {
      bucket: process.env
        .NEXT_PUBLIC_STORAGE_PUBLIC_BUCKET as string,
      region: process.env
        .NEXT_PUBLIC_STORAGE_PUBLIC_REGION as string,
      type: process.env
        .NEXT_PUBLIC_STORAGE_PUBLIC_TYPE as string
    },
    private: {
      bucket: process.env
        .NEXT_PUBLIC_STORAGE_PRIVATE_BUCKET as string,
      region: process.env
        .NEXT_PUBLIC_STORAGE_PRIVATE_REGION as string,
      type: process.env
        .NEXT_PUBLIC_STORAGE_PRIVATE_TYPE as string
    }
  }
}
