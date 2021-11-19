import {
  PersistStateSelectFn,
  Store,
  StoreConfig
} from '@datorama/akita'
import { persistState } from '@datorama/akita'

export interface User {
  id: string
  username: string
}
export interface UserState {
  access_token: string
  refresh_token: string
  current?: User
}

function createInitialState(): UserState {
  return {
    access_token: '',
    refresh_token: '',
    current: undefined
  }
}

@StoreConfig({ name: 'user' })
export class UserStore extends Store<UserState> {
  constructor() {
    super(createInitialState())
  }
}

export const userStore = new UserStore()

// 持久化存储
export const UserPersistState: PersistStateSelectFn<UserState> =
  state => ({
    access_token: state.access_token,
    refresh_token: state.refresh_token
  })

UserPersistState.storeName = 'user'
