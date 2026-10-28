import { useEffect, useState } from 'react'
import './alert.css'

export default function Error({ message }) {
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
    <div className="alert" style={{color: '#fa251e',
        backgroundColor: '#f2dede',
        borderColor: '#fa251e'}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
</svg>
      <h3>error: {message}</h3>
      <button
        className="btn-alert-x"
        style={{color : "#fa251e"}}
        type="button"
        aria-label="Close alert"
        onClick={() => setIsVisible(false)}
      >
        X
      </button>
    </div>
  )
}
