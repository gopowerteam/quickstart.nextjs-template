import { Query } from '@datorama/akita'
import { map } from 'rxjs'
import {
  UserState,
  userStore,
  UserStore
} from './user.store'

export class UserQuery extends Query<UserState> {
  constructor(protected store: UserStore) {
    super(store)
  }

  public userReady$ = this.select([
    state => state.access_token,
    state => state.current
  ]).pipe(
    map(([access_token, current]) => {
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
    })
  )
}

export const userQuery = new UserQuery(userStore)
