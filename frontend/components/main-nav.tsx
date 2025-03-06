"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { BarChart3, BookOpen, BrainCircuit, Calendar, Home, LineChart, RefreshCw } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link
        href="/dashboard"
        className={cn(
          "flex items-center text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <Home className="mr-2 h-4 w-4" />
        控制台
      </Link>
      <Link
        href="/auto-trading"
        className={cn(
          "flex items-center text-sm font-medium transition-colors hover:text-primary",
          pathname === "/auto-trading" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        自动交易
      </Link>
      <Link
        href="/strategies"
        className={cn(
          "flex items-center text-sm font-medium transition-colors hover:text-primary",
          pathname === "/strategies" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <BarChart3 className="mr-2 h-4 w-4" />
        策略分析
      </Link>
      <Link
        href="/journal"
        className={cn(
          "flex items-center text-sm font-medium transition-colors hover:text-primary",
          pathname === "/journal" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <Calendar className="mr-2 h-4 w-4" />
        交易日记
      </Link>
      <Link
        href="/records"
        className={cn(
          "flex items-center text-sm font-medium transition-colors hover:text-primary",
          pathname === "/records" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <LineChart className="mr-2 h-4 w-4" />
        交易记录
      </Link>
      <Link
        href="/assistant"
        className={cn(
          "flex items-center text-sm font-medium transition-colors hover:text-primary",
          pathname === "/assistant" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <BrainCircuit className="mr-2 h-4 w-4" />
        AI助手
      </Link>
      <Link
        href="/learn"
        className={cn(
          "flex items-center text-sm font-medium transition-colors hover:text-primary",
          pathname === "/learn" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <BookOpen className="mr-2 h-4 w-4" />
        学习区
      </Link>
    </nav>
  )
}

