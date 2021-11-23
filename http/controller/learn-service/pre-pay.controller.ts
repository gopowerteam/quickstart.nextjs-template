/**
 * This file is generated by the RequestConfigGenerator.
 * Do not edit.
 */
import { RequestMethod } from '@gopowerteam/http-request'

// 控制器名称
const controller = 'pre-pay'
const service = 'e-learning'
const gateway = 'default'

export const PrePayController = {
    // 微信支付生成微信预支付订单(assistant调用)
    prePayRequest: {
        gateway,
        service,
        controller,
        path: '/api/prePay/{mallOrderId}',
        action: 'prePayRequest',
        type: RequestMethod.Post
    }
}