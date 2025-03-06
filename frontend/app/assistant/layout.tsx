import type React from "react"

export default function AssistantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="container mx-auto py-4">{children}</div>
}

