import {
  PersistStateSelectFn,
  Store,
  StoreConfig
} from '@datorama/akita'

export interface AppState {
  ready: boolean
  collapsed: boolean
}

function createInitialState(): AppState {
  return {
    ready: false,
    collapsed: false
  }
}

@StoreConfig({ name: 'app' })
export class AppStore extends Store<AppState> {
  constructor() {
    super(createInitialState())
  }
}

export const appStore = new AppStore()

// 持久化存储
export const AppPersistState: PersistStateSelectFn<AppState> =
  state => ({})

AppPersistState.storeName = 'app'
