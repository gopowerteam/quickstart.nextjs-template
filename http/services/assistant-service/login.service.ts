/**
 * This file is generated by the RequestConfigGenerator.
 * Do not edit.
 */
import { Request, RequestParams } from '@gopowerteam/http-request'
import type { Observable } from 'rxjs'
import { LoginController } from '@/http/controller/assistant-service/login.controller'

export class LoginService {
  /**
   * 用户名，密码登录
   */
  @Request({
    server: LoginController.loginWithUserName,
  })
  public loginWithUserName(
    params?: RequestParams | { [key: string]: any }
  ): Observable<any> {
    return RequestParams.create(params).request();
  }
  /**
   * 微信用户unionId登录
   */
  @Request({
    server: LoginController.loginWithUnionId,
  })
  public loginWithUnionId(
    params?: RequestParams | { [key: string]: any }
  ): Observable<any> {
    return RequestParams.create(params).request();
  }
}
