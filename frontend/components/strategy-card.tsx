import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, LineChart, TrendingUp } from "lucide-react"
import Link from "next/link"

interface StrategyCardProps {
  title: string
  description: string
  performance: string
  risk: string
  timeframe: string
  lastUpdated: string
  isTemplate?: boolean
}

export function StrategyCard({
  title,
  description,
  performance,
  risk,
  timeframe,
  lastUpdated,
  isTemplate = false,
}: StrategyCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          <LineChart className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col space-y-1">
            <span className="text-xs text-muted-foreground">表现</span>
            <span className="font-medium text-green-600">{performance}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-xs text-muted-foreground">风险</span>
            <span className="font-medium">{risk}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-xs text-muted-foreground">时间周期</span>
            <span className="font-medium">{timeframe}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-xs text-muted-foreground">更新时间</span>
            <span className="font-medium">{lastUpdated}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        {isTemplate ? (
          <Button variant="outline" className="w-full">
            <Copy className="mr-2 h-4 w-4" />
            使用模板
          </Button>
        ) : (
          <Button asChild variant="outline" className="w-full">
            <Link href={`/strategies/${encodeURIComponent(title)}`}>
              <TrendingUp className="mr-2 h-4 w-4" />
              查看详情
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

