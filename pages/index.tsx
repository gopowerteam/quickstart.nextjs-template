import type { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  const router = useRouter()

  return (
    <div onClick={() => router.push('user/1')}>123</div>
  )
}

export default Home
