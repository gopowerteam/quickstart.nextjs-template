import type {
  NextComponentType,
  NextPage,
  NextPageContext
} from 'next'
import { ReactNode, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useStoreQuery } from '~/shared/common/use-store-query'
import { appAction, appQuery, userQuery } from '~/store'
import { boot } from './boot'
import Exception403Page from '~/pages/403'

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
  const userReady = userQuery.userReady

  // const [cookies, setCookie] = useCookies(['name'])

  useEffect(() => {
    if (!appReady) {
      boot(() => {
        appAction.updateReady()
      })
    }

    if (!userReady) {
    }
  }, [])

  switch (true) {
    case !appReady:
      return <main>loading</main>
    case !Page.auth:
      return <main>{props.children}</main>
    case userReady:
      return <main>{props.children}</main>
    default:
      const getLayout =
        Page.getLayout || ((page: NextPage) => page)

      return <main>{getLayout(<Exception403Page />)}</main>
  }
}

export default Bootstrap
