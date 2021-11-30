<<<<<<< HEAD
/**
 * This file is generated by the RequestConfigGenerator.
 * Do not edit.
 */
import { RequestMethod } from '@gopowerteam/http-request'

// 控制器名称
const controller = 'microapp'
const service = 'as'
const gateway = 'default'

export const MicroappController = {
    // 用户信息
    userInfo: {
        gateway,
        service,
        controller,
        path: '/api/microapp/userinfo',
        action: 'userInfo',
        type: RequestMethod.Post
    },
    // 电话号码
    userPhone: {
        gateway,
        service,
        controller,
        path: '/api/microapp/phone',
        action: 'userPhone',
        type: RequestMethod.Post
    },
    // 小程序获取unionId及sessionKey
    fetchUserIds: {
        gateway,
        service,
        controller,
        path: '/api/microapp/code',
        action: 'fetchUserIds',
        type: RequestMethod.Post
    }
}
=======
/**
 * This file is generated by the RequestConfigGenerator.
 * Do not edit.
 */
import { RequestMethod } from '@gopowerteam/http-request'

// 控制器名称
const controller = 'microapp'
const service = 'as'
const gateway = 'default'

export const MicroappController = {
    // 用户信息
    userInfo: {
        gateway,
        service,
        controller,
        path: '/api/microapp/userinfo',
        action: 'userInfo',
        type: RequestMethod.Post
    },
    // 电话号码
    userPhone: {
        gateway,
        service,
        controller,
        path: '/api/microapp/phone',
        action: 'userPhone',
        type: RequestMethod.Post
    },
    // 小程序获取unionId及sessionKey
    fetchUserIds: {
        gateway,
        service,
        controller,
        path: '/api/microapp/code',
        action: 'fetchUserIds',
        type: RequestMethod.Post
    }
}
>>>>>>> 18d615df41baaca2cddea9b28ebcdc87ad443ba6
