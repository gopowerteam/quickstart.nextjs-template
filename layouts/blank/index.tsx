import { Layout } from 'antd'

const { Content } = Layout

const BlankLayout: React.FC = props => {
  return (
    <Layout className="absolute inset-0">
      <Content> {props.children}</Content>
    </Layout>
  )
}

export default BlankLayout
