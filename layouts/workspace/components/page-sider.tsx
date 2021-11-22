import { Menu } from 'antd'
import { DesktopOutlined } from '@ant-design/icons'
import {
  useMenus,
  MenuConfigItem
} from '~/config/menu.config'
import { useRouter } from 'next/router'

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

const PageSider: React.FC = () => {
  const menus = useMenus()
  const router = useRouter()

  function onChange(node: { key: string }) {
    router.push(node.key)
  }

  return (
    <Menu
      theme="dark"
      onClick={onChange}
      mode="inline"
      inlineIndent={24}
    >
      {menus.map(item => MenuItem(item))}
    </Menu>
  )
}

export default PageSider
