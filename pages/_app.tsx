import '~/styles/global.less'
import 'antd/dist/antd.less'

import type { AppProps } from 'next/app'
import Bootstrap from '~/bootstrap'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Bootstrap>
      <Component {...pageProps} />
    </Bootstrap>
  )
}

export default MyApp
