import { Layout } from 'antd'

const { Content } = Layout

const BlankLayout: React.FC = props => {
  return (
    <Layout>
      <Content> {props.children}</Content>
    </Layout>
  )
}

export default BlankLayout
