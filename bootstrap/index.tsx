import type {
  NextComponentType,
  NextPageContext
} from 'next'
import { useEffect, useState } from 'react'
import { useStoreQuery } from '~/shared/common/use-store-query'
import { appAction, appQuery, userQuery } from '~/store'
import { setup } from './setup'
import Exception403Page from '~/pages/403'
import { appLaunch, userLaunch } from './launch'

interface BootstrapProps {
  page: NextComponentType<NextPageContext, any, {}> & {
    getLayout: any
    auth?: boolean
  }
}

const Bootstrap: React.FC<BootstrapProps> = props => {
  const { page: Page } = props

  // 系统准备状态
  const appReady = useStoreQuery(
    appQuery,
    store => store.ready
  )

  // 用户准备状态
  const [userReady, updateUserReady] = useState(false)

  async function startAppLaunch() {
    if (!appReady) {
      await setup()
      await appLaunch()
      appAction.updateReady()
    }
  }

  async function startUserLaunch() {
    if (!userReady) {
      await userLaunch()
      updateUserReady(true)
    }
  }

  useEffect(() => {
    startAppLaunch().then(startUserLaunch)
  }, [])

  switch (true) {
    case !appReady:
      return <main>loading</main>
    case !Page.auth:
      return <main>{props.children}</main>
    case userReady:
      return <main>{props.children}</main>
    default:
      return render403Page()
  }

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
