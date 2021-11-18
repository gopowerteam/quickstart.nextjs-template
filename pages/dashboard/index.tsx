import { NextPage } from 'next'
import { Button } from 'antd'
import {
  userQuery,
  userService,
  appQuery,
  appService
} from '~/store'
import { useObservable } from '~/shared/components/useObserable'

const DashBoardPage: NextPage = () => {
  const name = useObservable(userQuery.name$)
  const token = useObservable(userQuery.token$)

  const ready = useObservable(appQuery.ready$)

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
      <Button onClick={() => updateName()}>
        Dashboard {name} - {token}
      </Button>
    )
  }
}

export default DashBoardPage
