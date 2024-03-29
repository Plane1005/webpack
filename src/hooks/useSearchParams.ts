import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export default function useSearchParams() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search) as any, [search])
}
