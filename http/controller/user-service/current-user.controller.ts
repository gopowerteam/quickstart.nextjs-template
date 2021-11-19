/**
 * This file is generated by the RequestConfigGenerator.
 * Do not edit.
 */
import { RequestMethod } from '@gopowerteam/http-request'

// 控制器名称
const controller = 'current-user'
const service = 'uaa'
const gateway = 'default'

export const CurrentUserController = {
    // 当用用户
    currentUser: {
        gateway,
        service,
        controller,
        path: '/api/currentUser',
        action: 'currentUser',
        type: RequestMethod.Get
    }
}