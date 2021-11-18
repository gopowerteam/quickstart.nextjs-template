import { Query } from '@datorama/akita'
import { useState } from 'react'
import { AppState, appStore, AppStore } from './app.store'

export class AppQuery extends Query<AppState> {
  constructor(protected store: AppStore) {
    super(store)
  }

  ready$ = this.select(state => state.ready)
}

export const appQuery = new AppQuery(appStore)