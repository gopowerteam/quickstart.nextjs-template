import React from 'react'
import Image from 'next/image'
import { Avatar, Button, Dropdown, Menu } from 'antd'
import {
  DownOutlined,
  PoweroffOutlined,
  UserOutlined
} from '@ant-design/icons'
import { useStoreQuery } from '~/shared/common/use-store'
import { userAction, userQuery } from '~/store'
import { useRouter } from 'next/router'

const HeaderLogo: React.FC = () => {
  return (
    <div className="flex  items-center">
      <Image
        src="/favicon.ico"
        alt=""
        height={50}
        width={50}
      />
      <div className="text-white font-bold text-xl">
        E-LEARNING
      </div>
    </div>
  )
}

const HeaderAction: React.FC = () => {
  const current = useStoreQuery(
    userQuery,
    store => store.current
  )

  const router = useRouter()

  function renderUserAvatar() {
    const { current } = userQuery.getValue()

    function onExit() {
      userAction.logout()
      router.push('/login')
    }

    const menu = (
      <Menu>
        <Menu.Item className="flex items-center" key="exit">
          <PoweroffOutlined />
          <Button type="link" onClick={() => onExit()}>
            退出登录
          </Button>
        </Menu.Item>
      </Menu>
    )

    return (
      <div className="flex user-avatar items-center">
        <Avatar
          className="bg-green-500"
          size="small"
          icon={<UserOutlined />}
        />
        <Dropdown overlay={menu}>
          <Button type="link">
            {current?.username}
            <DownOutlined />
          </Button>
        </Dropdown>
      </div>
    )
  }

  return (
    <div className="flex  text-white">
      {renderUserAvatar()}
    </div>
  )
}

const PageHeader: React.FC = () => {
  return (
    <div className="flex flex-row justify-between h-full">
      <HeaderLogo></HeaderLogo>
      <HeaderAction></HeaderAction>
    </div>
  )
}

export default PageHeader
