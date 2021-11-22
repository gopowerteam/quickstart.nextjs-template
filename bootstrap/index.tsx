import type {
  NextComponentType,
  NextPageContext
} from 'next'
import { useEffect, useState } from 'react'
import {
  useStoreQuery,
  useStoreSelect
} from '~/shared/common/use-store'
import { appAction, appQuery, userQuery } from '~/store'
import { setup } from './setup'
import Exception403Page from '~/pages/403'
import { appLaunch, userLaunch } from './launch'
import { useRouter } from 'next/router'

interface BootstrapProps {
  page: NextComponentType<NextPageContext, any, {}> & {
    getLayout: any
    auth?: boolean
  }
}

const Bootstrap: React.FC<BootstrapProps> = props => {
  const router = useRouter()
  const { page: Page } = props

  // 系统准备状态
  const appReady = useStoreQuery(
    appQuery,
    store => store.ready
  )

  const userReady = useStoreSelect(userQuery.userReady$)

  async function startAppLaunch() {
    if (!appReady) {
      await setup()
      await appLaunch()
      appAction.updateReady()
    }
  }

  async function startUserLaunch() {
    if (userReady === undefined) {
      await userLaunch()
    }
  }

  useEffect(() => {
    startAppLaunch().then(startUserLaunch)
  }, [userReady])

  switch (true) {
    // 系统&用户数据准备中
    case !appReady || userReady === undefined:
      return <main>loading</main>
    // 无需用户权限即可访问
    case !Page.auth:
      return <main>{props.children}</main>
    // 用户权限验证通过
    case Page.auth &&
      userReady &&
      getUserRoleAuth() === true:
      return <main>{props.children}</main>
    // 用户权限验证失败
    case Page.auth &&
      userReady &&
      getUserRoleAuth() === false:
      return render403Page()
    // 用户未登录
    default:
      router.replace('/login')
      return <></>
  }

  /**
   * 获取用户访问权限
   * @returns
   */
  function getUserRoleAuth(): boolean {
    return true
  }

  /**
   * 用户无访问权限
   * @returns
   */
  function render403Page() {
    const getLayout = Exception403Page.getLayout

    return (
      <main>
        {getLayout((<Exception403Page />) as any)}
      </main>
    )
  }
}

export default Bootstrap
