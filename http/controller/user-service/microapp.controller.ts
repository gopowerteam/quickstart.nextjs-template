<<<<<<< HEAD
/**
 * This file is generated by the RequestConfigGenerator.
 * Do not edit.
 */
import { RequestMethod } from '@gopowerteam/http-request'

// 控制器名称
const controller = 'microapp'
const service = 'uaa'
const gateway = 'default'

export const MicroappController = {
    // 同步用户信息
    maUserInfoSync: {
        gateway,
        service,
        controller,
        path: '/api/microapp/userinfo',
        action: 'maUserInfoSync',
        type: RequestMethod.Post
    },
    // 同步用户电话号码
    maUserPhoneSync: {
        gateway,
        service,
        controller,
        path: '/api/microapp/phone',
        action: 'maUserPhoneSync',
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
const service = 'uaa'
const gateway = 'default'

export const MicroappController = {
    // 同步用户信息
    maUserInfoSync: {
        gateway,
        service,
        controller,
        path: '/api/microapp/userinfo',
        action: 'maUserInfoSync',
        type: RequestMethod.Post
    },
    // 同步用户电话号码
    maUserPhoneSync: {
        gateway,
        service,
        controller,
        path: '/api/microapp/phone',
        action: 'maUserPhoneSync',
        type: RequestMethod.Post
    }
}
>>>>>>> 18d615df41baaca2cddea9b28ebcdc87ad443ba6
