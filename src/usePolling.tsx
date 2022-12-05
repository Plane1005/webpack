import React, { useRef } from 'react'

interface PropsType<T> {
  fn: (values?: any) => Promise<T>
  onSuccess: (values: T) => void
  onError?: (value: Error) => void
  timeout?: number
  interval?: number
  isFinished: string | ((value: any) => boolean)
  params?: any
}

const usePolling = (props: PropsType<T>) => {
  const {
    timeout = 10000,
    interval = 1000,
    fn,
    onSuccess,
    onError,
    params,
    isFinished = '',
  } = props

  const isPolling = useRef(false)
  const beginTime = useRef(0)

  const run = () => {
    try {
      if (isPolling.current) return
      isPolling.current = true
      beginTime.current = new Date().getTime()
      const poll = async () => {
        const now = new Date().getTime()
        if (now - beginTime.current > timeout) {
          const err = new Error('Polling is timeout!')
          onError?.(err)
          throw err
        }
        const res = await fn(params)
        const isFinish = typeof isFinished === 'string' ? res[isFinished] : isFinished(res)
        if (isFinish) {
          isPolling.current = false
          beginTime.current = 0
          onSuccess(res)
        } else {
          setTimeout(poll, interval)
        }
      }
      poll()
    } catch (error) {
      onError?.(error)
    }
  }

  return [run, isPolling]
}

export default usePolling
