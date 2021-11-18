import '~/styles/global.less'
import 'antd/dist/antd.less'

import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import Bootstrap from '~/bootstrap'

function MyApp({
  Component,
  pageProps
}: AppProps & {
  Component: {
    getLayout: any
  }
}) {
  const getLayout =
    Component.getLayout || ((page: NextPage) => page)

  return (
    <Bootstrap>
      {getLayout(<Component {...pageProps} />)}
    </Bootstrap>
  )
}

export default MyApp
