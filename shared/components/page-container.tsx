import { Breadcrumb } from 'antd'
import { useRouter } from 'next/router'
import { getCurrentMenuByPath } from '../utils'

const Header: React.FC = () => {
  const router = useRouter() as any

  function renderBreadcrumb() {
    const menus = getCurrentMenuByPath(router.route)

    return (
      <Breadcrumb>
        {menus.map(menu => (
          <Breadcrumb.Item key={menu.id}>
            {menu.title}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    )
  }

  function renderTitle() {
    const { Component } = router.components[router.asPath]

    return (
      <div className="title font-bold text-xl pt-2 text-gray-600">
        {Component.title}
      </div>
    )
  }
  return (
    <div className="page-container_header bg-white p-3">
      {renderBreadcrumb()}
      {renderTitle()}
    </div>
  )
}

const PageContainer: React.FC = props => {
  function renderContent() {
    return (
      <div
        className="page-container_content bg-white m-3 p-3"
        style={{ minHeight: 400 }}
      >
        {props.children}
      </div>
    )
  }
  return (
    <div className="page-container">
      <Header></Header>
      {renderContent()}
    </div>
  )
}

export default PageContainer
