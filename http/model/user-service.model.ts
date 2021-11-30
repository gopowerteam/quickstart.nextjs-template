import { Type } from 'class-transformer'
import { Model } from '@gopowerteam/http-request'


export class CreateUserRequest extends Model {
  public username : string
  public password : string
}

export class UserView extends Model {
  public id : string
  public username : string
  public access : string
}

export class WaUserInfoRequest extends Model {
  public openId : string
  public nickName : string
  public gender : string
  public language : string
  public city : string
  public province : string
  public country : string
  public avatarUrl : string
  public unionId : string
}

export class WxMaUserPhone extends Model {
  public unionId : string
  public openId : string
  public phoneNumber : string
  public purePhoneNumber : string
  public countryCode : string
}
