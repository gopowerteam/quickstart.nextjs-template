import { lastValueFrom } from 'rxjs'
import { CurrentUserService } from '~/http/services/user-service/current-user.service'
import { userAction } from '~/store'

const currentUserService = new CurrentUserService()

function awaitUserReady() {
  // TODO: 副作用是会提前设置UserReady
  return lastValueFrom(
    currentUserService.currentUser()
  ).then(data => {
    userAction.updateUser(data)
  })
}

export async function userLaunch() {
  // 用户数据准备
  await awaitUserReady()
  // 用户数据初始化
  await Promise.all([])
}
