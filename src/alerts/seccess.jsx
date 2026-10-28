import { useEffect, useState } from 'react'
import './alert.css'

export default function Seccess({ message }) {
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
    <div className="alert" style={{color: '#0eb910',
        backgroundColor: '#dff0d8',
        borderColor: '#0eb910'}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </svg>
      <h3>SECCESS: {message}</h3>
      <button
        className="btn-alert-x"
        style={{color:"#0eb910"}}
        type="button"
        aria-label="Close alert"
        onClick={() => setIsVisible(false)}
      >
        X
      </button>
    </div>
  )
}
