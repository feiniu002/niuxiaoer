import type React from "react"

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="container mx-auto py-4">{children}</div>
}

