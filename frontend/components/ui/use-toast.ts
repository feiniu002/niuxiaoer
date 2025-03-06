// Simplified version of the use-toast hook
"use client"

import * as React from "react"

type ToastProps = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  open: boolean
}

type ToastActionElement = React.ReactElement

export const useToast = () => {
  const [toasts, setToasts] = React.useState<ToastProps[]>([])

  const toast = ({
    title,
    description,
    action,
  }: {
    title?: React.ReactNode
    description?: React.ReactNode
    action?: ToastActionElement
  }) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prevToasts) => [...prevToasts, { id, title, description, action, open: true }])
    return id
  }

  const dismiss = (id: string) => {
    setToasts((prevToasts) => prevToasts.map((toast) => (toast.id === id ? { ...toast, open: false } : toast)))
  }

  return { toast, dismiss, toasts }
}

