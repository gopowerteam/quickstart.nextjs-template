import { useState, useEffect } from 'react'
import { Observable } from 'rxjs'

export function useObservable<T>(
  observable: Observable<T>
) {
  const [value, setValue] = useState<T>()

  useEffect(() => {
    const subscription = observable.subscribe(newValue => {
      setValue(newValue)
    })
    return () => subscription.unsubscribe()
  }, [])

  return value
}