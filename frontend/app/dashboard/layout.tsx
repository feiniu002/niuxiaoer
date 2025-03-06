import type React from "react"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"
import Link from "next/link"
import { TrendingUp } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2 mr-4">
            <TrendingUp className="h-6 w-6 text-primary" />
            <Link href="/" className="text-xl font-bold">
              牛小二
            </Link>
          </div>
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </header>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">{children}</div>
    </div>
  )
}

