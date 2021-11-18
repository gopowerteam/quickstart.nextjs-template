import { userStore, UserStore } from './user.store'

export class UserService {
  constructor(private userStore: UserStore) {}

  updateUserName(value: string) {
    this.userStore.update({ name: value })
  }

  updateUserToken(value: string) {
    this.userStore.update({ token: value })
  }
}

export const userService = new UserService(userStore)
