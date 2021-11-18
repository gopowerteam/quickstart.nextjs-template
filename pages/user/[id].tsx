import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'

const UserPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <div onClick={() => router.push('/')}>user-{id}</div>
  )
}

export default UserPage
