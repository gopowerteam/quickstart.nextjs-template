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

  get userReady() {
    const { access_token, current } = this.getValue()
    return !!access_token && !!current
  }
}

export const userQuery = new UserQuery(userStore)
