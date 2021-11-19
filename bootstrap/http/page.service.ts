import {
  ExtendService,
  RequestParams
} from '@gopowerteam/http-request'

export class PageService extends ExtendService {
  public default = {
    pageSize: 10,
    pageIndex: 1,
    total: 0,
    pageSizeOpts: ['10', '20', '50', '100']
  }
  public pageSize = 0
  public pageIndex = 0
  public total = 0
  public pageSizeOpts: string[] = []

  constructor(data?: any) {
    super()

    if (data) this.default = { ...this.default, ...data }

    this.pageSize = this.default.pageSize
    this.pageIndex = this.default.pageIndex || 1
    this.total = this.default.total
    this.pageSizeOpts = this.default.pageSizeOpts
  }

  public before = (params: RequestParams) => {
    params.setOptions({
      ...(params.getOptions() || {}),
      urlParams: {
        ...params.getOptions('urlParams'),
        size: this.pageSize,
        page: this.pageIndex - 1
      }
    })
  }

  public after = (
    response: any,
    params: RequestParams,
    setData: (data: any) => void
  ) => {
    this.total = response.totalElements

    setData(response.content)
  }

  public reset() {
    this.pageIndex = this.default.pageIndex
    this.pageSize = this.default.pageSize
  }

  public update(pageIndex: number, pageSize: number) {
    this.pageIndex = pageIndex
    this.pageSize = pageSize
    return Promise.resolve()
  }
}
