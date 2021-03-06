/**
 * This file is generated by the RequestConfigGenerator.
 * Do not edit.
 */
import { Request, RequestParams } from '@gopowerteam/http-request'
import type { Observable } from 'rxjs'
import { MeController } from '@/http/controller/user-service/me.controller'

export class MeService {
  /**
   * 
   */
  @Request({
    server: MeController.getMe,
  })
  public getMe(
    params?: RequestParams | { [key: string]: any }
  ): Observable<any> {
    return RequestParams.create(params).request();
  }
}
