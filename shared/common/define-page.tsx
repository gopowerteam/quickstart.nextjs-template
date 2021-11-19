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

type ExtendNextPageConfig = {
  layout: keyof typeof layouts
  title: string
  auth: boolean
  type: ExtendNextPageConfig
  getLayout: (Page: ExtendNextPage) => JSX.Element
}

type ExtendNextPage = NextPage & ExtendNextPageConfig

const definePage = (
  page: NextPage,
  config: definePageProps
) => {
  const pageConfig = Object.assign(defaultPageProps, config)

  const Page = page as ExtendNextPage

  Page.title = pageConfig.title
  Page.auth = pageConfig.auth
  Page.layout = pageConfig.layout

  // 设置布局
  Page.getLayout = page => {
    const pageLayout = page.layout ?? page.type.layout
    const Layout = layouts[pageLayout]
    return <Layout>{page}</Layout>
  }

  return Page
}

export default definePage
