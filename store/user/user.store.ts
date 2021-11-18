import {
  PersistStateSelectFn,
  Store,
  StoreConfig
} from '@datorama/akita'
import { persistState } from '@datorama/akita'

export interface UserState {
  token: string
  name: string
}

function createInitialState(): UserState {
  return {
    token: '',
    name: ''
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
  state => ({ token: state.token })

UserPersistState.storeName = 'user'
