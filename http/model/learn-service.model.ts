import { Type } from 'class-transformer'
import { Model } from '@gopowerteam/http-request'

export class TrainingBaseInfo extends Model {
  /**
   * 标题
   */
  public title: string
  /**
   * 图片banner地址
   */
  public bannerImg: string
  /**
   * 开设日期
   */
  public date: string
  /**
   * 地点
   */
  public location: string
  /**
   * 描述
   */
  public description: string
}

export class Numbers extends Model {
  /**
   * 当前人数
   */
  public current: number
  /**
   * 最大人数
   */
  public max: number
}

export class TrainingDetail extends Model {
  /**
   * id
   */
  public id: string
  /**
   * 标题
   */
  public title: string
  /**
   * 开始时间
   */
  public date: string

  public count: Numbers
  /**
   * 状态
   */
  public status: string
  /**
   * bannerImg
   */
  public bannerImg: string
  /**
   * 描述
   */
  public description: string
  /**
   *  地点
   */
  public location: string
}

export class Training extends Model {
  public id: string
  public name: string
  public date: string
  public location: string
  public price: number
  public earlyPrice: number
  public groupPrice: number
  public maxNumber: number
  public saleDeadTime: string
  public earlyDeadTime: string
  public releaseType: string
  public releaseTime: string
  public saleType: string[]
  public status: string
  public createAt: string
  public description: string
  public bannerImg: string
}

export class SignResult extends Model {
  public status: string
}

export class TrainingSaleInfo extends Model {
  /**
   * 人数上限
   */
  public max: number
  /**
   * 价格
   */
  public price: number
  /**
   * 订购截止时间
   */
  public saleDeadTime: string
  /**
   * 支持的销售类型
   */
  public saleType: string[]
  /**
   * 订购截止时间
   */
  public earlyPrice: number
  /**
   * 早鸟截止时间
   */
  public earlyDeadTime: string
  /**
   * 三人行价格
   */
  public groupPrice: number
}

export class TrainingReleaseInfo extends Model {
  /**
   * 发布类型
   */
  public releaseType: string
  /**
   * 定时发布时间
   */
  public releaseTime: string
}

export class StudentRequest extends Model {
  public id: string
  /**
   * 姓名
   */
  public name: string
}

export class TrainingStudent extends Model {
  public id: string
  /**
   * 姓名
   */
  public name: string
  /**
   * 手机号码
   */
  public phone: string
  /**
   * 学员类型
   */
  public studentType: string
  /**
   * 分组名称
   */
  public groupName: string
}

export class SignConfigRequest extends Model {
  /**
   * 时间
   */
  public date: string
  /**
   * 类型
   */
  public type: string
}

export class QuestionRequest extends Model {
  public description: string
}

export class Question extends Model {
  public id: string
  public description: string
  @Type(() => RefUser)
  public user: RefUser
  @Type(() => RefActivity)
  public activity: RefActivity
  public createAt: string
  @Type(() => RefUser)
  public starUsers: RefUser[]
  public status: string
}

export class RefActivity extends Model {
  public id: string
  public type: string
}

export class RefUser extends Model {
  public id: string
  public name: string
  public phone: string
  public avatar: string
}

export class GroupRequest extends Model {
  /**
   * 分组控制量
   */
  public number: number
  /**
   * 分组类型
   */
  public type: string
}

export class SystemLog extends Model {
  public level: string
  public type: string
  public operator: string
  public detail: string
  public id: string
  public createAt: string
}

export class SignConfigResponse extends Model {
  /**
   * 签到配置id
   */
  public id: string
}

export class TrainingSignRecord extends Model {
  /**
   * 学员id
   */
  public id: string
  /**
   * 姓名
   */
  public name: string
  /**
   * 手机号码
   */
  public phone: string
  /**
   * 学员类型
   */
  public studentType: string
  /**
   * 签到状态
   */
  public status: string
  /**
   * 签到时间
   */
  public date: string
}

export class TrainingQuestion extends Model {
  /**
   * 问题id
   */
  public id: string
  /**
   * 状态
   */
  public status: string
  /**
   * 问题描述
   */
  public description: string
  /**
   * 点赞数量
   */
  public stars: number
}

export class TrainingOrder extends Model {
  /**
   * 订单id
   */
  public id: string
  /**
   * 用户姓名
   */
  public name: string
  /**
   * 用户手机号
   */
  public phone: string
  /**
   * 价格
   */
  public price: number
  /**
   * 订购类型
   */
  public orderType: string
  /**
   * 成团状态
   */
  public groupStatus: string
  /**
   * 支付状态
   */
  public payStatus: string
  /**
   * 支付时间
   */
  public payedTime: string
}

export class TrainingStudentGroup extends Model {
  /**
   * 组id
   */
  public id: string
  /**
   * 组名
   */
  public groupName: string
  /**
   * 学员
   */
  @Type(() => TrainingStudent)
  public students: TrainingStudent[]
}

export class TrainingOrderDetail extends Model {
  public id: string
  public createTime: string
  public price: number
  public orderType: string
  public payStatus: string
  public name: string
  public phone: string
  public payedTime: string
  /**
   * 外部流水号
   */
  public tradeNo: string
  /**
   * 退费流水号
   */
  public refundTradeNo: string
  /**
   * 三人行关联订单
   */
  @Type(() => TrainingOrder)
  public groupOrders: TrainingOrder[]
}
