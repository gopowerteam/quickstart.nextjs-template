import { NextPage } from 'next'
import definePage from '~/shared/common/define-page'
import PageContainer from '~/shared/components/page-container'

const UserPage: NextPage = () => {
  // const router = useRouter()
  // const { id } = router.query
  return (
    <PageContainer>
      <div>user</div>
    </PageContainer>
  )
}

export default definePage(UserPage, {
  title: '用户',
  layout: 'workspace',
  auth: true
})
