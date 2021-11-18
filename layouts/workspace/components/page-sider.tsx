import { Menu } from 'antd'
import { MailOutlined } from '@ant-design/icons'

const PageSider: React.FC = () => {
  function onChange() {}

  return (
    <Menu theme="dark" onClick={onChange} mode="inline">
      <Menu.SubMenu
        key="sub1"
        icon={<MailOutlined />}
        title="Navigation One"
      >
        <Menu.Item key="1">Option 1</Menu.Item>
        <Menu.Item key="2">Option 2</Menu.Item>
        <Menu.Item key="3">Option 3</Menu.Item>
        <Menu.Item key="4">Option 4</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu
        key="sub2"
        icon={<MailOutlined />}
        title="Navigation One"
      >
        <Menu.Item key="5">Option 5</Menu.Item>
        <Menu.Item key="6">Option 6</Menu.Item>
        <Menu.Item key="7">Option 7</Menu.Item>
        <Menu.Item key="8">Option 8</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}

export default PageSider
