import { Layout } from 'antd'
import { useState } from 'react'
import { useObservable } from '~/shared/common/use-obserable'
import { appQuery } from '~/store'
import dynamic from 'next/dynamic'

import PageHeader from './components/page-header'
const PageSider = dynamic(
  () => import('./components/page-sider'),
  { ssr: false }
)

const { Header, Footer, Sider, Content } = Layout

const WorkspaceLayout: React.FC = props => {
  const collapsed = useObservable(appQuery.collapsed$)

  return (
    <Layout className="absolute inset-0">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <PageSider></PageSider>
      </Sider>
      <Layout>
        <Header>
          <PageHeader></PageHeader>
        </Header>
        <Content> {props.children}</Content>
      </Layout>
    </Layout>
  )
}

export default WorkspaceLayout
