/**
 * This file is generated by the RequestConfigGenerator.
 * Do not edit.
 */
import { RequestMethod } from '@gopowerteam/http-request'

// 控制器名称
const controller = 'users'
const service = 'uaa'
const gateway = 'default'

export const UsersController = {
    // 当前用户（分页查询）
    queryUserLists: {
        gateway,
        service,
        controller,
        path: '/api/users',
        action: 'queryUserLists',
        type: RequestMethod.Get
    }
}