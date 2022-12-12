import React, { useCallback, useState } from 'react'

export default function useForceRender(): [() => void, number] {
  const [count, setCount] = useState(0)

  const forceRender = useCallback(() => {
    setCount((i) => i + 1)
  }, [])

  return [forceRender, count]
}
