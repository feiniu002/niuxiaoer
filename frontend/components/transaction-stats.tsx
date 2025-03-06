import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface TransactionStatsProps {
  title: string
  value: string
  change: string
  changeLabel: string
  trend: "up" | "down" | "neutral"
}

export function TransactionStats({ title, value, change, changeLabel, trend }: TransactionStatsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          <span
            className={cn(
              "inline-flex items-center",
              trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "",
            )}
          >
            {trend === "up" ? (
              <ArrowUp className="mr-1 h-4 w-4" />
            ) : trend === "down" ? (
              <ArrowDown className="mr-1 h-4 w-4" />
            ) : null}
            {change}
          </span>{" "}
          {changeLabel}
        </p>
      </CardContent>
    </Card>
  )
}

