import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import definePage from '~/shared/common/define-page'

const Exception403Page: NextPage = () => {
  return <div>403123</div>
}

export default definePage(Exception403Page, {
  title: '403',
  layout: 'blank',
  auth: false
})
