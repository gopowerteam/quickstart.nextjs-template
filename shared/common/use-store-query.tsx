import {
  isFunction,
  Query,
  ReturnTypes
} from '@datorama/akita'
import { useState, useEffect } from 'react'
import { Observable } from 'rxjs'

function UseStoreQuery<T, R>(
  query: Query<T>,
  project: (store: T) => R
): R
function UseStoreQuery<
  T,
  R extends [(state: R) => any] | Array<(state: R) => any>
>(query: Query<T>, selectorFns: R): ReturnTypes<R>
function UseStoreQuery<T, R>(query: Query<T>): R
function UseStoreQuery<T, R>(
  query: Query<T>,
  project?: ((store: T) => R) | ((state: T) => any)[]
) {
  let steam: Observable<R | T | any[]>
  let state: R | T | any[]

  if (isFunction(project)) {
    steam = query.select(project)
    state = project(query.getValue())
  } else if (Array.isArray(project)) {
    steam = query.select(project)
    state = project.map(p => p(query.getValue()))
  } else {
    steam = query.select()
    state = query.getValue()
  }

  const [value, setValue] = useState<R | T | any[]>(state)

  useEffect(() => {
    const subscription = steam.subscribe(newValue => {
      setValue(newValue)
    })
    return () => subscription.unsubscribe()
  }, [])

  return value
}

export const useStoreQuery = UseStoreQuery
