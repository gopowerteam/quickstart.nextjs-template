import { Breadcrumb } from 'antd'
import { useRouter } from 'next/router'
import { getCurrentMenuByPath } from '../utils'

interface PageContainerProps {
  hiddenHeader?: boolean
  description?: string
  actions?: React.ReactChild
  attachContent?: React.ReactChild
}

const Header: React.FC<PageContainerProps> = props => {
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
    const { Component } = router.components[router.pathname]

    return (
      <section className="page-container_header_title space-y-1">
        <div className="font-bold text-xl text-gray-600">
          {Component.title}
        </div>
        <div className="text-gray-500">
          {props.description}
        </div>
      </section>
    )
  }

  function renderActions() {
    const { Component } = router.components[router.pathname]

    return (
      <section className="page-container_header_actions space-x-1">
        {props.actions}
      </section>
    )
  }

  return (
    <section className="page-container_header bg-white p-3 space-y-2">
      <div>{renderBreadcrumb()}</div>
      <div className="flex flex-row justify-between">
        {renderTitle()}
        {renderActions()}
      </div>
      <div>{props.attachContent}</div>
    </section>
  )
}

const PageContainer: React.FC<PageContainerProps> =
  props => {
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
        {!props.hiddenHeader && (
          <Header {...props}></Header>
        )}
        {renderContent()}
      </div>
    )
  }

export default PageContainer
