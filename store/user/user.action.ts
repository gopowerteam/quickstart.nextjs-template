import { User } from '.'
import { userStore, UserStore } from './user.store'

export class UserAction {
  constructor(private userStore: UserStore) {}

  updateUser(user: User) {
    this.userStore.update({ current: user })
  }

  updateToken({
    access_token,
    refresh_token
  }: {
    access_token: string
    refresh_token: string
  }) {
    this.userStore.update({
      access_token,
      refresh_token
    })
  }

  logout() {
    this.userStore.update({
      access_token: '',
      refresh_token: '',
      current: undefined
    })
  }
}

export const userAction = new UserAction(userStore)
