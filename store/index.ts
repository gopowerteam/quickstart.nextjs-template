import { persistState } from '@datorama/akita'
import { AppPersistState } from './app'
import { UserPersistState } from './user'

export * from './app'
export * from './user'

// 持久化存储
persistState({
  select: [AppPersistState, UserPersistState]
})
