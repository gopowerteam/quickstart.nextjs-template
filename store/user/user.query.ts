import { Query } from '@datorama/akita'
import { useState } from 'react'
import {
  UserState,
  userStore,
  UserStore
} from './user.store'

export class UserQuery extends Query<UserState> {
  constructor(protected store: UserStore) {
    super(store)
  }

  name$ = this.select(state => state.name)

  token$ = this.select(state => state.token)
}

export const userQuery = new UserQuery(userStore)
