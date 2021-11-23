import { Query } from '@datorama/akita'
import {
  UserState,
  userStore,
  UserStore
} from './user.store'

export class UserQuery extends Query<UserState> {
  constructor(protected store: UserStore) {
    super(store)
  }

  public getUserReady() {
    const { access_token, current } = this.getValue()

    switch (true) {
      // 用户未认证
      case !access_token:
        return false
      // 用户已认证
      case !!access_token && !!current:
        return true
      // 用户待刷新
      default:
        return undefined
    }
  }
}

export const userQuery = new UserQuery(userStore)
