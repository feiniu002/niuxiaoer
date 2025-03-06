"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertCircle,
  ArrowUpDown,
  BarChart3,
  Clock,
  Cog,
  DollarSign,
  Eye,
  LinkIcon,
  Play,
  Plus,
  Power,
  RefreshCw,
  Settings,
  Shield,
  StopCircle,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

// 模拟数据 - 自动交易策略
const tradingStrategies = [
  {
    id: "1",
    name: "均线突破策略",
    status: "running",
    type: "趋势跟踪",
    profit: 12.5,
    runningTime: "3天5小时",
    trades: 28,
    winRate: 68,
    lastTrade: "2023-06-15 14:30",
  },
  {
    id: "2",
    name: "RSI超买超卖策略",
    status: "paused",
    type: "震荡指标",
    profit: 8.2,
    runningTime: "1天8小时",
    trades: 15,
    winRate: 60,
    lastTrade: "2023-06-14 10:15",
  },
  {
    id: "3",
    name: "MACD金叉死叉策略",
    status: "stopped",
    type: "趋势跟踪",
    profit: -2.3,
    runningTime: "5小时",
    trades: 7,
    winRate: 42,
    lastTrade: "2023-06-13 16:45",
  },
  {
    id: "4",
    name: "布林带突破策略",
    status: "running",
    type: "波动突破",
    profit: 5.7,
    runningTime: "2天12小时",
    trades: 19,
    winRate: 63,
    lastTrade: "2023-06-15 09:20",
  },
]

// 模拟数据 - 交易账户
const tradingAccounts = [
  {
    id: "1",
    name: "主交易账户",
    broker: "某证券",
    balance: 50000,
    equity: 53250,
    margin: 10000,
    status: "connected",
    lastSync: "2023-06-15 15:30",
  },
  {
    id: "2",
    name: "测试账户",
    broker: "某券商",
    balance: 10000,
    equity: 10120,
    margin: 2000,
    status: "connected",
    lastSync: "2023-06-15 15:30",
  },
]

// 模拟数据 - 最近交易
const recentTrades = [
  {
    id: "1",
    strategy: "均线突破策略",
    symbol: "AAPL",
    type: "买入",
    price: 185.92,
    quantity: 10,
    time: "2023-06-15 14:30",
    profit: null,
  },
  {
    id: "2",
    strategy: "RSI超买超卖策略",
    symbol: "MSFT",
    type: "卖出",
    price: 337.5,
    quantity: 5,
    time: "2023-06-15 13:45",
    profit: 125.5,
  },
  {
    id: "3",
    strategy: "布林带突破策略",
    symbol: "TSLA",
    type: "买入",
    price: 248.38,
    quantity: 8,
    time: "2023-06-15 11:20",
    profit: null,
  },
  {
    id: "4",
    strategy: "均线突破策略",
    symbol: "NVDA",
    type: "卖出",
    price: 471.63,
    quantity: 3,
    time: "2023-06-15 10:05",
    profit: 87.3,
  },
  {
    id: "5",
    strategy: "MACD金叉死叉策略",
    symbol: "AMZN",
    type: "卖出",
    price: 178.12,
    quantity: 12,
    time: "2023-06-14 15:30",
    profit: -45.6,
  },
]

export default function AutoTradingPage() {
  const [activeStrategies, setActiveStrategies] = useState(tradingStrategies)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isAddingStrategy, setIsAddingStrategy] = useState(false)

  // 处理策略状态变更
  const handleStrategyStatusChange = (id: string, newStatus: string) => {
    setActiveStrategies((prev) =>
      prev.map((strategy) => (strategy.id === id ? { ...strategy, status: newStatus } : strategy)),
    )
  }

  // 模拟连接交易账户
  const handleConnectAccount = async () => {
    setIsConnecting(true)
    // 模拟API请求延迟
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsConnecting(false)
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">自动交易</h2>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                添加策略
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>添加自动交易策略</DialogTitle>
                <DialogDescription>选择一个已创建的策略添加到自动交易系统</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="strategy">选择策略</Label>
                  <Select>
                    <SelectTrigger id="strategy">
                      <SelectValue placeholder="选择一个策略" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="strategy1">价值投资策略</SelectItem>
                      <SelectItem value="strategy2">动量交易策略</SelectItem>
                      <SelectItem value="strategy3">股息收益策略</SelectItem>
                      <SelectItem value="strategy4">成长股投资</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account">交易账户</Label>
                  <Select>
                    <SelectTrigger id="account">
                      <SelectValue placeholder="选择交易账户" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="account1">主交易账户</SelectItem>
                      <SelectItem value="account2">测试账户</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capital">分配资金</Label>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <Input id="capital" placeholder="输入分配资金金额" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="auto-start" />
                  <Label htmlFor="auto-start">添加后自动启动</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingStrategy(false)}>
                  取消
                </Button>
                <Button type="submit">添加</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            系统设置
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃策略</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeStrategies.filter((s) => s.status === "running").length}</div>
            <p className="text-xs text-muted-foreground">共 {activeStrategies.length} 个策略</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今日交易</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">买入: 7 | 卖出: 5</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总收益</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">+¥5,832.40</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+4.8%</span> 收益率
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">系统状态</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
              <div className="text-sm font-medium">正常运行中</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">上次检查: 2分钟前</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="strategies" className="space-y-4">
        <TabsList>
          <TabsTrigger value="strategies">交易策略</TabsTrigger>
          <TabsTrigger value="accounts">交易账户</TabsTrigger>
          <TabsTrigger value="trades">交易记录</TabsTrigger>
          <TabsTrigger value="settings">风控设置</TabsTrigger>
        </TabsList>

        <TabsContent value="strategies" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Input placeholder="搜索策略..." className="max-w-sm" />
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="所有状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有状态</SelectItem>
                  <SelectItem value="running">运行中</SelectItem>
                  <SelectItem value="paused">已暂停</SelectItem>
                  <SelectItem value="stopped">已停止</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              刷新
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">策略名称</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead className="text-right">收益</TableHead>
                  <TableHead>运行时间</TableHead>
                  <TableHead className="text-center">交易次数</TableHead>
                  <TableHead className="text-center">胜率</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeStrategies.map((strategy) => (
                  <TableRow key={strategy.id}>
                    <TableCell className="font-medium">{strategy.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          strategy.status === "running" && "border-green-500 text-green-500",
                          strategy.status === "paused" && "border-yellow-500 text-yellow-500",
                          strategy.status === "stopped" && "border-red-500 text-red-500",
                        )}
                      >
                        {strategy.status === "running" && "运行中"}
                        {strategy.status === "paused" && "已暂停"}
                        {strategy.status === "stopped" && "已停止"}
                      </Badge>
                    </TableCell>
                    <TableCell>{strategy.type}</TableCell>
                    <TableCell
                      className={cn(
                        "text-right font-medium",
                        strategy.profit > 0 ? "text-green-500" : strategy.profit < 0 ? "text-red-500" : "",
                      )}
                    >
                      {strategy.profit > 0 ? "+" : ""}
                      {strategy.profit}%
                    </TableCell>
                    <TableCell>{strategy.runningTime}</TableCell>
                    <TableCell className="text-center">{strategy.trades}</TableCell>
                    <TableCell className="text-center">{strategy.winRate}%</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {strategy.status === "running" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStrategyStatusChange(strategy.id, "paused")}
                          >
                            <StopCircle className="h-4 w-4" />
                          </Button>
                        )}
                        {strategy.status === "paused" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStrategyStatusChange(strategy.id, "running")}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        )}
                        {strategy.status === "stopped" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStrategyStatusChange(strategy.id, "running")}
                          >
                            <Power className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Cog className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">交易账户</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <LinkIcon className="mr-2 h-4 w-4" />
                  连接新账户
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>连接交易账户</DialogTitle>
                  <DialogDescription>输入您的交易账户信息以连接到自动交易系统</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="account-name">账户名称</Label>
                    <Input id="account-name" placeholder="输入账户名称" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="broker">券商</Label>
                    <Select>
                      <SelectTrigger id="broker">
                        <SelectValue placeholder="选择券商" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="broker1">某证券</SelectItem>
                        <SelectItem value="broker2">某券商</SelectItem>
                        <SelectItem value="broker3">某投资</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API密钥</Label>
                    <Input id="api-key" placeholder="输入API密钥" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-secret">API密钥</Label>
                    <Input id="api-secret" type="password" placeholder="输入API密钥" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsConnecting(false)}>
                    取消
                  </Button>
                  <Button type="submit" onClick={handleConnectAccount} disabled={isConnecting}>
                    {isConnecting ? "连接中..." : "连接账户"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {tradingAccounts.map((account) => (
              <Card key={account.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{account.name}</CardTitle>
                    <Badge
                      variant="outline"
                      className={
                        account.status === "connected"
                          ? "border-green-500 text-green-500"
                          : "border-red-500 text-red-500"
                      }
                    >
                      {account.status === "connected" ? "已连接" : "未连接"}
                    </Badge>
                  </div>
                  <CardDescription>{account.broker}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">账户余额</div>
                      <div className="text-xl font-bold">¥{account.balance.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">账户净值</div>
                      <div className="text-xl font-bold">¥{account.equity.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">保证金</div>
                      <div className="text-lg font-medium">¥{account.margin.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">上次同步</div>
                      <div className="text-sm">{account.lastSync}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    同步
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="mr-2 h-4 w-4" />
                    设置
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trades" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">最近交易</h3>
            <div className="flex items-center gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="所有策略" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有策略</SelectItem>
                  <SelectItem value="strategy1">均线突破策略</SelectItem>
                  <SelectItem value="strategy2">RSI超买超卖策略</SelectItem>
                  <SelectItem value="strategy3">MACD金叉死叉策略</SelectItem>
                  <SelectItem value="strategy4">布林带突破策略</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                排序
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>策略</TableHead>
                  <TableHead>股票</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead className="text-right">价格</TableHead>
                  <TableHead className="text-right">数量</TableHead>
                  <TableHead>时间</TableHead>
                  <TableHead className="text-right">盈亏</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTrades.map((trade) => (
                  <TableRow key={trade.id}>
                    <TableCell>{trade.strategy}</TableCell>
                    <TableCell className="font-medium">{trade.symbol}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          trade.type === "买入" ? "border-blue-500 text-blue-500" : "border-purple-500 text-purple-500"
                        }
                      >
                        {trade.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">${trade.price}</TableCell>
                    <TableCell className="text-right">{trade.quantity}</TableCell>
                    <TableCell>{trade.time}</TableCell>
                    <TableCell
                      className={cn(
                        "text-right font-medium",
                        trade.profit === null ? "" : trade.profit > 0 ? "text-green-500" : "text-red-500",
                      )}
                    >
                      {trade.profit === null
                        ? "-"
                        : (trade.profit > 0 ? "+" : "") + "$" + Math.abs(trade.profit).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-end space-x-2">
            <Button variant="outline" size="sm">
              上一页
            </Button>
            <Button variant="outline" size="sm">
              下一页
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>风险控制设置</CardTitle>
              <CardDescription>配置自动交易系统的风险控制参数</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">每日交易限制</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="max-daily-trades">最大交易次数</Label>
                    <Input id="max-daily-trades" type="number" defaultValue={20} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-daily-loss">最大日亏损 (%)</Label>
                    <Input id="max-daily-loss" type="number" defaultValue={5} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-position-size">最大仓位比例 (%)</Label>
                    <Input id="max-position-size" type="number" defaultValue={20} />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">止损设置</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="default-stop-loss">默认止损比例 (%)</Label>
                    <Input id="default-stop-loss" type="number" defaultValue={3} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trailing-stop">启用追踪止损</Label>
                    <div className="flex items-center space-x-2">
                      <Switch id="trailing-stop" defaultChecked />
                      <Label htmlFor="trailing-stop">启用</Label>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">系统安全</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emergency-stop">紧急停止</Label>
                      <p className="text-sm text-muted-foreground">当系统检测到异常波动时自动停止所有交易</p>
                    </div>
                    <Switch id="emergency-stop" defaultChecked />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications">交易通知</Label>
                      <p className="text-sm text-muted-foreground">接收交易执行和系统状态的通知</p>
                    </div>
                    <Switch id="notifications" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>保存设置</Button>
            </CardFooter>
          </Card>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>风险提示</AlertTitle>
            <AlertDescription>
              自动交易存在风险，请确保您了解相关风险并设置合理的风控参数。系统不能保证盈利，请根据自身风险承受能力进行设置。
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>系统监控</CardTitle>
          <CardDescription>实时监控自动交易系统的运行状态</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>CPU 使用率</Label>
                <span className="text-sm text-muted-foreground">12%</span>
              </div>
              <Progress value={12} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>内存使用率</Label>
                <span className="text-sm text-muted-foreground">45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>网络延迟</Label>
                <span className="text-sm text-muted-foreground">120ms</span>
              </div>
              <Progress value={30} className="h-2" />
            </div>
          </div>

          <div className="rounded-md border p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">系统日志</h4>
              <Button variant="outline" size="sm">
                <Clock className="mr-2 h-4 w-4" />
                查看全部
              </Button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-start">
                <div className="text-muted-foreground w-32 shrink-0">15:30:45</div>
                <div>均线突破策略触发买入信号: AAPL</div>
              </div>
              <div className="flex items-start">
                <div className="text-muted-foreground w-32 shrink-0">15:25:12</div>
                <div>RSI超买超卖策略执行卖出操作: MSFT</div>
              </div>
              <div className="flex items-start">
                <div className="text-muted-foreground w-32 shrink-0">15:20:03</div>
                <div>系统自动同步账户数据完成</div>
              </div>
              <div className="flex items-start">
                <div className="text-muted-foreground w-32 shrink-0">15:15:30</div>
                <div>布林带突破策略触发买入信号: TSLA</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

