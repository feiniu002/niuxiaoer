import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, BarChart3, LineChart, TrendingUp } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-background/80">
      {/* 背景装饰 */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-primary/10 to-background rounded-b-[50%] opacity-60"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-1.5 rounded-md">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold">牛小二</span>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" className="hover:bg-primary/10">
              <Link href="/login">登录</Link>
            </Button>
            <Button asChild className="shadow-md hover:shadow-lg transition-shadow">
              <Link href="/register">注册</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="container px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-primary/20 blur-xl opacity-70"></div>
              <div className="relative bg-primary/10 p-4 rounded-full">
                <TrendingUp className="h-16 w-16 text-primary" />
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              智能投资，轻松管理
            </h1>

            <p className="text-xl text-muted-foreground max-w-[700px] leading-relaxed">
              牛小二为您提供全方位的股票投资工具，让您的投资决策更加科学、高效。
            </p>

            <div className="flex justify-center gap-8 py-8">
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-3 rounded-lg mb-2">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <span className="text-sm font-medium">数据分析</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-3 rounded-lg mb-2">
                  <LineChart className="h-8 w-8 text-primary" />
                </div>
                <span className="text-sm font-medium">策略管理</span>
              </div>
            </div>

            <div className="w-full max-w-md bg-card border rounded-xl shadow-lg p-8 transform hover:scale-[1.01] transition-transform">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">准备好开始您的投资之旅了吗？</h2>

              <p className="text-lg text-muted-foreground max-w-[600px] mb-6">立即注册牛小二，开启智能投资新体验。</p>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button asChild size="lg" className="px-8 h-12 rounded-full shadow-md hover:shadow-lg transition-all">
                  <Link href="/register">免费注册</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="px-8 h-12 rounded-full border-primary/20 hover:bg-primary/5 transition-all"
                >
                  <Link href="/login">
                    登录账号
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full border-t py-6 bg-background/50 backdrop-blur-sm">
        <div className="container flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <p className="text-sm font-medium">© 2025 牛小二. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

