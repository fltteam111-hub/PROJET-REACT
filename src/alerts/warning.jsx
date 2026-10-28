import { useEffect, useState } from 'react'
import './alert.css'

export default function Warning({ message }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsVisible(true), 0)
    return () => clearTimeout(timeoutId)
  }, [])
  setTimeout(() => setIsVisible(false), 6000)
  if (!isVisible) {
    return null
  }

  return (
    <div className="alert" style={{color: '#a8a634',
        backgroundColor: '#fcf8e3',
        borderColor: '#a8a634'}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
</svg>
      <h3>WARNING: {message}</h3>
      <button
        className="btn-alert-x"
        style={{color: '#a8a634'}}
        type="button"
        aria-label="Close alert"
        onClick={() => setIsVisible(false)}
      >
        X
      </button>
    </div>
  )
}
