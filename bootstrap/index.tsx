import type { NextPage } from 'next'
import { useRouter, Router } from 'next/router'
import { useEffect, useState } from 'react'
import { useObservable } from '~/shared/common/use-obserable'
import { userQuery } from '~/store'

const Bootstrap: NextPage = props => {
  const token = useObservable(userQuery.token$)

  // if (router.pathname === '/about') {
  //   router.push('dashboard')
  // }

  return <main>{props.children}</main>
}

export default Bootstrap
