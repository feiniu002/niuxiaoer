import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TransactionTable } from "@/components/transaction-table"
import { TransactionStats } from "@/components/transaction-stats"
import { TransactionFilter } from "@/components/transaction-filter"
import { Plus, Download } from "lucide-react"

export default function RecordsPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">交易记录</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            导出数据
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新增交易
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <TransactionStats title="总交易次数" value="128" change="+12" changeLabel="较上月" trend="up" />
        <TransactionStats title="总盈利" value="¥24,521.35" change="+15.3%" changeLabel="较上月" trend="up" />
        <TransactionStats title="胜率" value="68%" change="+2.5%" changeLabel="较上月" trend="up" />
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <TabsList>
            <TabsTrigger value="all">全部交易</TabsTrigger>
            <TabsTrigger value="buy">买入记录</TabsTrigger>
            <TabsTrigger value="sell">卖出记录</TabsTrigger>
          </TabsList>
          <TransactionFilter />
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>交易历史</CardTitle>
              <CardDescription>查看您的所有交易记录和表现</CardDescription>
            </CardHeader>
            <CardContent>
              <TransactionTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="buy" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>买入记录</CardTitle>
              <CardDescription>查看您的所有买入交易记录</CardDescription>
            </CardHeader>
            <CardContent>
              <TransactionTable type="buy" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sell" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>卖出记录</CardTitle>
              <CardDescription>查看您的所有卖出交易记录</CardDescription>
            </CardHeader>
            <CardContent>
              <TransactionTable type="sell" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

