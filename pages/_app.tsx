import '~/styles/global.less'
import 'antd/dist/antd.less'

import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import Bootstrap from '~/bootstrap'
import { CookiesProvider } from 'react-cookie'

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
    <CookiesProvider>
      <Bootstrap page={Component}>
        {getLayout(<Component {...pageProps} />)}
      </Bootstrap>
    </CookiesProvider>
  )
}

export default MyApp
