import { NextPage } from 'next'
import definePage from '~/shared/common/define-page'

const AboutPage: NextPage = () => {
  // const router = useRouter()
  return <div>About</div>
}

export default definePage(AboutPage, {
  title: '关于我们',
  layout: 'workspace',
  auth: true
})
