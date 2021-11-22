import { useStoreQuery } from '~/shared/common/use-store'
import { appAction, appQuery } from '~/store'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons'
import React from 'react'

const PageSider: React.FC = () => {
  const collapsed = useStoreQuery(
    appQuery,
    store => store.collapsed
  )

  return (
    <>
      {React.createElement(
        collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
        {
          style: { color: '#fff', fontSize: 21 },
          onClick: () =>
            appAction.updateCollapsed(!collapsed)
        }
      )}
    </>
  )
}

export default PageSider
