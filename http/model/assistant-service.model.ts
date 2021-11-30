import { Type } from 'class-transformer'
import { Model } from '@gopowerteam/http-request'


export class LoginRequest extends Model {
  public username : string
  public password : string
}

export class WxAuthRequest extends Model {
  public code : string
  public unionId : string
}

export class WxMaRequest extends Model {
  public code : string
  public rawData : string
  public encryptedData : string
  public iv : string
  public signature : string
}

export class Watermark extends Model {
  public timestamp : string
  public appid : string
}

export class WxMaUserInfo extends Model {
  public openId : string
  public nickName : string
  public gender : string
  public language : string
  public city : string
  public province : string
  public country : string
  public avatarUrl : string
  public unionId : string
  @Type(() => Watermark)
  public watermark : Watermark
}

export class WxMaPhoneNumberInfo extends Model {
  public phoneNumber : string
  public purePhoneNumber : string
  public countryCode : string
  @Type(() => Watermark)
  public watermark : Watermark
}

export class WxMaJscode2SessionResult extends Model {
  public sessionKey : string
  public openid : string
  public unionid : string
}

export class COSUploadUrlResponse extends Model {
  public url : string
}

export class COSTempSecretResponse extends Model {
  public tmpSecretId : string
  public tmpSecretKey : string
  public sessionToken : string
  public requestId : string
  public expiration : string
  public startTime : string
  public expiredTime : string
}
