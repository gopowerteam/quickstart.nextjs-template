import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import definePage from '~/shared/common/define-page'

const AboutPage: NextPage = () => {
  const router = useRouter()
  return (
    <div onClick={() => router.push('dashboard')}>
      About
    </div>
  )
}

export default definePage(AboutPage, {
  title: '关于我们',
  layout: 'workspace',
  auth: true
})
