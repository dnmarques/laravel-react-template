import { useEffect, useState } from 'react'

export default function Dialog({ open, children }) {
  const [mounted, setMounted] = useState(open)

  useEffect(() => {
    open ? setMounted(true) : setTimeout(() => setMounted(false), 200)
  }, [open]);

  return (
    mounted && children
  )
}
