/**
 * This file is generated by the RequestConfigGenerator.
 * Do not edit.
 */
import { Request, RequestParams } from '@gopowerteam/http-request'
import type { Observable } from 'rxjs'
import { MicroappController } from '@/http/controller/assistant-service/microapp.controller'
import { WxMaUserInfo, WxMaPhoneNumberInfo, WxMaJscode2SessionResult } from '@/http/model/assistant-service.model'

export class MicroappService {
  /**
   * 用户信息
   */
  @Request({
    server: MicroappController.userInfo,
    model: WxMaUserInfo
  })
  public userInfo(
    params?: RequestParams | { [key: string]: any }
  ): Observable<WxMaUserInfo> {
    return RequestParams.create(params).request();
  }
  /**
   * 电话号码
   */
  @Request({
    server: MicroappController.userPhone,
    model: WxMaPhoneNumberInfo
  })
  public userPhone(
    params?: RequestParams | { [key: string]: any }
  ): Observable<WxMaPhoneNumberInfo> {
    return RequestParams.create(params).request();
  }
  /**
   * 小程序获取unionId及sessionKey
   */
  @Request({
    server: MicroappController.fetchUserIds,
    model: WxMaJscode2SessionResult
  })
  public fetchUserIds(
    params?: RequestParams | { [key: string]: any }
  ): Observable<WxMaJscode2SessionResult> {
    return RequestParams.create(params).request();
  }
}
