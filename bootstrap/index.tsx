import type { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'

const Bootstrap: NextPage = props => {
  const router = useRouter()

  return (
    <div>
      <div>1235</div>
      <div>{props.children}</div>
    </div>
  )
}

export default Bootstrap
