import { useObservable } from '~/shared/common/use-obserable'
import { appQuery, appService } from '~/store'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons'
import React from 'react'

const PageSider: React.FC = () => {
  const collapsed = useObservable(appQuery.collapsed$)

  return (
    <>
      {React.createElement(
        collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
        {
          style: { color: '#fff', fontSize: 21 },
          onClick: () =>
            appService.updateCollapsed(!collapsed)
        }
      )}
    </>
  )
}

export default PageSider
