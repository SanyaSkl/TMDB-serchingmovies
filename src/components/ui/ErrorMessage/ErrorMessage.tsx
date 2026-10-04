import type { SerializedError } from '@reduxjs/toolkit'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import style from './ErrorMessage.module.css'

interface ErrorMessageProps {
  error: FetchBaseQueryError | SerializedError | null | undefined
  customMessage?: string
  title?: string
}

export const ErrorMessage = ({
  error,
  customMessage,
  title = 'Server response:',
}: ErrorMessageProps) => {
  if (!error) return null

  const getErrorMessage = (): string => {
    if (customMessage) return customMessage

    const err = error as { status?: number; data?: { status_message?: string; message?: string } }

    if (err?.status) {
      switch (err.status) {
        case 401:
          return '❌ Invalid API key. Please check your configuration.'
        case 403:
          return "❌ Access forbidden. You don't have permission to access this resource."
        case 404:
          return '❌ Endpoint not found. Please check the URL.'
        case 429:
          return '⚠️ Too many requests. Please try again later.'
        case 500:
          return '❌ Server error. Please try again later.'
        case 503:
          return '❌ Service unavailable. Please try again later.'
        default:
          return `❌ Error ${err.status}: ${err.data?.status_message || err.data?.message || 'Something went wrong'}`
      }
    }

    if (err.data?.status_message) {
      return `❌ ${err.data.status_message}`
    }

    const msg = error as { message?: string }
    if (msg.message) {
      return `❌ ${msg.message}`
    }

    return '❌ An unexpected error occurred'
  }

  const errorMessage = getErrorMessage()

  return (
    <div className={style.errorMessage}>
      <span className={style.errorTitle}>{title}</span>
      {errorMessage}
    </div>
  )
}
