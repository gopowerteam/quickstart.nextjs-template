import { Menu } from 'antd'
import {
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons'
import {
  useMenus,
  MenuConfigItem
} from '~/config/menu.config'
import { useRouter } from 'next/router'
import React from 'react'
import { useStoreQuery } from '~/shared/common/use-store'
import { appAction, appQuery } from '~/store'

const MenuItem: React.FC<MenuConfigItem> = props => {
  function renderSubMenu() {
    return (
      <Menu.SubMenu
        key={props.id}
        icon={<DesktopOutlined />}
        title={props.title}
      >
        {props.children &&
          props.children.map(item => MenuItem(item))}
      </Menu.SubMenu>
    )
  }

  function renderLeafMenu() {
    return (
      <Menu.Item key={props.path}>{props.title}</Menu.Item>
    )
  }

  function isLeafMenu() {
    return !props.children && !!props.path
  }
  return isLeafMenu() ? renderLeafMenu() : renderSubMenu()
}

const SiderMenu: React.FC = () => {
  const menus = useMenus()
  const router = useRouter()

  function onChange(node: { key: string }) {
    router.push(node.key)
  }

  return (
    <Menu
      className="flex-auto"
      theme="light"
      onClick={onChange}
      mode="inline"
      inlineIndent={24}
    >
      {menus.map(item => MenuItem(item))}
    </Menu>
  )
}

const SiderAction: React.FC = () => {
  const collapsed = useStoreQuery(
    appQuery,
    store => store.collapsed
  )

  return (
    <div className="bg-white">
      {React.createElement(
        collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
        {
          style: {
            fontSize: 18,
            width: 50,
            height: 50,
            paddingTop: 20
          },
          onClick: () =>
            appAction.updateCollapsed(!collapsed)
        }
      )}
    </div>
  )
}

const PageSider: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <SiderMenu></SiderMenu>
      <SiderAction></SiderAction>
    </div>
  )
}

export default PageSider
