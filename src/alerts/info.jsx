import { useEffect, useState } from 'react'
import './alert.css'

export default function Info({ message }) {
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
    <div className="alert" style={{color: '#0e9fb9',
        backgroundColor: '#d9edf7',
        borderColor: '#0e9fb9'}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
      </svg>
      <h3>INFO: {message}</h3>
      <button
        className="btn-alert-x"
        style={{color:'#0e9fb9'}}
        type="button"
        aria-label="Close alert"
        onClick={() => setIsVisible(false)}
      >
        X
      </button>
    </div>
  )
}
