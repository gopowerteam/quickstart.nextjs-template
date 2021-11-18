import { NextPage } from 'next'
import { Button } from 'antd'
import {
  userQuery,
  userService,
  appQuery,
  appService
} from '~/store'
import { useObservable } from '~/shared/common/use-obserable'
import { useRouter } from 'next/dist/client/router'
import definePage from '~/shared/common/define-page'

const DashBoardPage: NextPage = () => {
  const name = useObservable(userQuery.name$)
  const token = useObservable(userQuery.token$)

  const ready = useObservable(appQuery.ready$)
  const router = useRouter()
  function updateName() {
    userService.updateUserName(name + 'z')
    userService.updateUserToken(token + 'x')
  }

  function updateReady() {
    appService.updateReady()
  }

  if (!ready) {
    return (
      <>
        <div className="text-red-500">1231</div>
        <Button
          className="m-20"
          onClick={() => updateReady()}
        >
          not Ready
        </Button>
        <div>xxx {token}</div>
      </>
    )
  } else {
    return (
      <Button onClick={() => router.push('about')}>
        Dashboard {name} - {token}
      </Button>
    )
  }
}

export default definePage(DashBoardPage, {
  layout: 'workspace',
  title: '仪表盘'
})
