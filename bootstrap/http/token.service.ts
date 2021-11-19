import { ExtendService } from '@gopowerteam/http-request'
import { userQuery } from '~/store'

export class TokenService extends ExtendService {
  public before = (params: any) => {
    const access_token = userQuery.getValue().access_token
    if (access_token) {
      params.options.header = params.options.header || {}
      params.options.header[
        'Authorization'
      ] = `Bearer ${access_token}`
    }
  }
}
