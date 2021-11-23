import { Layout } from 'antd'
import { useStoreQuery } from '~/shared/common/use-store'
import { appQuery } from '~/store'
import dynamic from 'next/dynamic'

import PageHeader from './components/page-header'
const PageSider = dynamic(
  () => import('./components/page-sider'),
  { ssr: false }
)

const { Header, Footer, Sider, Content } = Layout

const WorkspaceLayout: React.FC = props => {
  const collapsed = useStoreQuery(
    appQuery,
    store => store.collapsed
  )

  return (
    <Layout className="absolute inset-0">
      <Header className="h-12 px-5">
        <PageHeader></PageHeader>
      </Header>
      <Layout>
        <Sider
          className="bg-gray-50"
          trigger={null}
          collapsedWidth={50}
          collapsible
          collapsed={collapsed}
        >
          <PageSider></PageSider>
        </Sider>

        <Content>{props.children}</Content>
      </Layout>
    </Layout>
  )
}

export default WorkspaceLayout
