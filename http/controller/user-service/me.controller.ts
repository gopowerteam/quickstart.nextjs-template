/**
 * This file is generated by the RequestConfigGenerator.
 * Do not edit.
 */
import { RequestMethod } from '@gopowerteam/http-request'

// 控制器名称
const controller = 'me'
const service = 'uaa'
const gateway = 'default'

export const MeController = {
    // 
    getMe: {
        gateway,
        service,
        controller,
        path: '/api/me',
        action: 'getMe',
        type: RequestMethod.Get
    }
}