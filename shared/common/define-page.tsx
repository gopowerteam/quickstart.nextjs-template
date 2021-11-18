import { NextPage } from 'next'
import { useState } from 'react'

import BlankLayout from '~/layouts/blank'
import WorkspaceLayout from '~/layouts/workspace'

const layouts = {
  blank: BlankLayout,
  workspace: WorkspaceLayout
}

interface definePageProps {
  layout?: keyof typeof layouts
  title: string
  auth?: boolean
}

const defaultPageProps: definePageProps & {
  layout: keyof typeof layouts
  auth: boolean
} = {
  layout: 'workspace',
  title: '',
  auth: true
}

const definePage = (
  Page: NextPage & {
    getLayout?: (page: NextPage) => JSX.Element
  },
  config: definePageProps
) => {
  const getConfig = () =>
    Object.assign(defaultPageProps, config)

  // 设置布局
  Page.getLayout = (page: NextPage) => {
    const pageConfig = getConfig()

    const Layout = layouts[pageConfig.layout]
    return <Layout>{page}</Layout>
  }

  return Page
}

export default definePage
