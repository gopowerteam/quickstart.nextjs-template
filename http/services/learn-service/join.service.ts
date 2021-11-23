/**
 * This file is generated by the RequestConfigGenerator.
 * Do not edit.
 */
import { Request, RequestParams } from '@gopowerteam/http-request'
import type { Observable } from 'rxjs'
import { JoinController } from '@/http/controller/learn-service/join.controller'

export class JoinService {
  /**
   * 加入三人行团购
   */
  @Request({
    server: JoinController.joinGroupOrder,
  })
  public joinGroupOrder(
    params?: RequestParams | { [key: string]: any }
  ): Observable<any> {
    return RequestParams.create(params).request();
  }
}