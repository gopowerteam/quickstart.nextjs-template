import { NextPage } from 'next'
import { Button } from 'antd'
import {
  userQuery,
  appQuery,
  userAction,
  appAction
} from '~/store'
import { useRouter } from 'next/dist/client/router'
import definePage from '~/shared/common/define-page'
import { useStoreQuery } from '~/shared/common/use-store-query'
import { useCookies } from 'react-cookie'
import { useState } from 'react'

const DashBoardPage: NextPage = () => {
  // useCookies([''])
  const ready = useStoreQuery(
    appQuery,
    store => store.ready
  )

  const [a, u] = useState('1')

  const router = useRouter()
  function updateName() {
    // userAction.updateUserName(name + 'z')
  }

  function updateReady() {
    appAction.updateReady()
  }

  if (!ready) {
    return (
      <>
        <div className="text-red-500">1231</div>
        <Button
          className="m-20"
          onClick={() => updateName()}
        >
          not Ready
        </Button>
        <div>xxx</div>
      </>
    )
  } else {
    return (
      <>
        <Button onClick={() => router.push('about')}>
          Dashboard
        </Button>
        <Button onClick={() => u(a + '1')}>
          Dashboard {a}
        </Button>
      </>
    )
  }
}

export default definePage(DashBoardPage, {
  layout: 'workspace',
  title: '仪表盘'
})
