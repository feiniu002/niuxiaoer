import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const transactions = [
  {
    id: "1",
    amount: "+¥2,500.00",
    status: "完成",
    date: "2023-06-08",
    type: "买入",
    stockName: "阿里巴巴",
    stockCode: "BABA",
    isPositive: false,
  },
  {
    id: "2",
    amount: "-¥1,800.00",
    status: "完成",
    date: "2023-06-07",
    type: "卖出",
    stockName: "腾讯控股",
    stockCode: "0700.HK",
    isPositive: true,
  },
  {
    id: "3",
    amount: "+¥5,000.00",
    status: "完成",
    date: "2023-06-06",
    type: "买入",
    stockName: "美团",
    stockCode: "3690.HK",
    isPositive: false,
  },
  {
    id: "4",
    amount: "-¥3,200.00",
    status: "完成",
    date: "2023-06-05",
    type: "卖出",
    stockName: "京东",
    stockCode: "JD",
    isPositive: true,
  },
  {
    id: "5",
    amount: "+¥1,500.00",
    status: "完成",
    date: "2023-06-04",
    type: "买入",
    stockName: "百度",
    stockCode: "BIDU",
    isPositive: false,
  },
]

export function RecentTransactions() {
  return (
    <div className="space-y-8">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback
              className={cn(transaction.isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600")}
            >
              {transaction.type === "买入" ? "买" : "卖"}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {transaction.stockName} ({transaction.stockCode})
            </p>
            <p className="text-sm text-muted-foreground">{transaction.date}</p>
          </div>
          <div className={cn("ml-auto font-medium", transaction.isPositive ? "text-green-600" : "text-red-600")}>
            {transaction.amount}
          </div>
        </div>
      ))}
    </div>
  )
}

