import { appStore, AppStore } from './app.store'

export class AppAction {
  constructor(private appStore: AppStore) {}

  updateCollapsed(collapsed: boolean) {
    this.appStore.update({ collapsed })
  }

  updateReady() {
    this.appStore.update({ ready: true })
  }
}

export const appAction = new AppAction(appStore)
