"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, ArrowLeft, HelpCircle, LineChart, Save, Settings } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import type { DateRange } from "react-day-picker"
import { addDays } from "date-fns"

export default function NewStrategyPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("basic")
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -90),
    to: new Date(),
  })

  // 基本信息表单状态
  const [basicInfo, setBasicInfo] = useState({
    name: "",
    description: "",
    type: "",
    riskLevel: "",
    timeframe: "",
  })

  // 参数设置状态
  const [parameters, setParameters] = useState({
    useMA: true,
    maShort: 5,
    maLong: 20,
    useRSI: false,
    rsiPeriod: 14,
    rsiOverbought: 70,
    rsiOversold: 30,
    useMACD: false,
    macdFast: 12,
    macdSlow: 26,
    macdSignal: 9,
  })

  // 回测设置状态
  const [backtestSettings, setBacktestSettings] = useState({
    initialCapital: 100000,
    positionSize: 10,
    stopLoss: 5,
    takeProfit: 10,
    commissionRate: 0.1,
    slippageRate: 0.05,
    allowShort: false,
  })

  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBasicInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setBasicInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleParameterChange = (name: string, value: any) => {
    setParameters((prev) => ({ ...prev, [name]: value }))
  }

  const handleBacktestSettingChange = (name: string, value: any) => {
    setBacktestSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveStrategy = async () => {
    setIsLoading(true)

    try {
      // 模拟保存请求
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // 保存成功后返回策略列表页
      router.push("/strategies?created=true")
    } catch (error) {
      console.error("保存策略失败", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const handleNext = () => {
    if (activeTab === "basic") setActiveTab("parameters")
    else if (activeTab === "parameters") setActiveTab("backtest")
  }

  const handlePrevious = () => {
    if (activeTab === "parameters") setActiveTab("basic")
    else if (activeTab === "backtest") setActiveTab("parameters")
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/strategies")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">新建交易策略</h1>
        </div>
        <Button onClick={handleSaveStrategy} disabled={isLoading}>
          <Save className="mr-2 h-4 w-4" />
          {isLoading ? "保存中..." : "保存策略"}
        </Button>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>提示</AlertTitle>
        <AlertDescription>
          创建策略前，请确保您了解相关的技术指标和参数设置。您可以在学习区查看更多关于策略构建的教程。
        </AlertDescription>
      </Alert>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">基本信息</TabsTrigger>
          <TabsTrigger value="parameters">参数设置</TabsTrigger>
          <TabsTrigger value="backtest">回测设置</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>策略基本信息</CardTitle>
              <CardDescription>设置您的策略名称、描述和基本属性</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">策略名称 *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="输入策略名称"
                  value={basicInfo.name}
                  onChange={handleBasicInfoChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">策略描述</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="描述您的策略目标和逻辑"
                  className="min-h-[100px]"
                  value={basicInfo.description}
                  onChange={handleBasicInfoChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">策略类型 *</Label>
                  <Select value={basicInfo.type} onValueChange={(value) => handleSelectChange("type", value)}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="选择策略类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trend">趋势跟踪</SelectItem>
                      <SelectItem value="reversal">反转交易</SelectItem>
                      <SelectItem value="breakout">突破交易</SelectItem>
                      <SelectItem value="oscillator">震荡指标</SelectItem>
                      <SelectItem value="mean-reversion">均值回归</SelectItem>
                      <SelectItem value="custom">自定义</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="riskLevel">风险等级 *</Label>
                  <Select value={basicInfo.riskLevel} onValueChange={(value) => handleSelectChange("riskLevel", value)}>
                    <SelectTrigger id="riskLevel">
                      <SelectValue placeholder="选择风险等级" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">低风险</SelectItem>
                      <SelectItem value="medium">中等风险</SelectItem>
                      <SelectItem value="high">高风险</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeframe">时间周期 *</Label>
                  <Select value={basicInfo.timeframe} onValueChange={(value) => handleSelectChange("timeframe", value)}>
                    <SelectTrigger id="timeframe">
                      <SelectValue placeholder="选择时间周期" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">短期（日内）</SelectItem>
                      <SelectItem value="medium">中期（数天至数周）</SelectItem>
                      <SelectItem value="long">长期（数月以上）</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleNext}>下一步</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="parameters" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>策略参数设置</CardTitle>
              <CardDescription>配置技术指标和交易信号参数</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="useMA"
                      checked={parameters.useMA}
                      onCheckedChange={(checked) => handleParameterChange("useMA", checked)}
                    />
                    <Label htmlFor="useMA" className="font-medium">
                      移动平均线 (MA)
                    </Label>
                  </div>
                  <Button variant="ghost" size="icon">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </div>

                {parameters.useMA && (
                  <div className="pl-10 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="maShort">短期MA周期: {parameters.maShort}</Label>
                        <span className="text-sm text-muted-foreground">{parameters.maShort} 天</span>
                      </div>
                      <Slider
                        id="maShort"
                        min={1}
                        max={50}
                        step={1}
                        value={[parameters.maShort]}
                        onValueChange={(value) => handleParameterChange("maShort", value[0])}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="maLong">长期MA周期: {parameters.maLong}</Label>
                        <span className="text-sm text-muted-foreground">{parameters.maLong} 天</span>
                      </div>
                      <Slider
                        id="maLong"
                        min={10}
                        max={200}
                        step={1}
                        value={[parameters.maLong]}
                        onValueChange={(value) => handleParameterChange("maLong", value[0])}
                      />
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="useRSI"
                      checked={parameters.useRSI}
                      onCheckedChange={(checked) => handleParameterChange("useRSI", checked)}
                    />
                    <Label htmlFor="useRSI" className="font-medium">
                      相对强弱指数 (RSI)
                    </Label>
                  </div>
                  <Button variant="ghost" size="icon">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </div>

                {parameters.useRSI && (
                  <div className="pl-10 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="rsiPeriod">RSI周期: {parameters.rsiPeriod}</Label>
                        <span className="text-sm text-muted-foreground">{parameters.rsiPeriod} 天</span>
                      </div>
                      <Slider
                        id="rsiPeriod"
                        min={2}
                        max={30}
                        step={1}
                        value={[parameters.rsiPeriod]}
                        onValueChange={(value) => handleParameterChange("rsiPeriod", value[0])}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="rsiOverbought">超买阈值: {parameters.rsiOverbought}</Label>
                        </div>
                        <Slider
                          id="rsiOverbought"
                          min={50}
                          max={90}
                          step={1}
                          value={[parameters.rsiOverbought]}
                          onValueChange={(value) => handleParameterChange("rsiOverbought", value[0])}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="rsiOversold">超卖阈值: {parameters.rsiOversold}</Label>
                        </div>
                        <Slider
                          id="rsiOversold"
                          min={10}
                          max={50}
                          step={1}
                          value={[parameters.rsiOversold]}
                          onValueChange={(value) => handleParameterChange("rsiOversold", value[0])}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="useMACD"
                      checked={parameters.useMACD}
                      onCheckedChange={(checked) => handleParameterChange("useMACD", checked)}
                    />
                    <Label htmlFor="useMACD" className="font-medium">
                      MACD指标
                    </Label>
                  </div>
                  <Button variant="ghost" size="icon">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </div>

                {parameters.useMACD && (
                  <div className="pl-10 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="macdFast">快线周期: {parameters.macdFast}</Label>
                        <Slider
                          id="macdFast"
                          min={5}
                          max={20}
                          step={1}
                          value={[parameters.macdFast]}
                          onValueChange={(value) => handleParameterChange("macdFast", value[0])}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="macdSlow">慢线周期: {parameters.macdSlow}</Label>
                        <Slider
                          id="macdSlow"
                          min={10}
                          max={40}
                          step={1}
                          value={[parameters.macdSlow]}
                          onValueChange={(value) => handleParameterChange("macdSlow", value[0])}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="macdSignal">信号线周期: {parameters.macdSignal}</Label>
                        <Slider
                          id="macdSignal"
                          min={5}
                          max={20}
                          step={1}
                          value={[parameters.macdSignal]}
                          onValueChange={(value) => handleParameterChange("macdSignal", value[0])}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious}>
                上一步
              </Button>
              <Button onClick={handleNext}>下一步</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="backtest" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>回测设置</CardTitle>
              <CardDescription>配置回测参数和交易规则</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>回测时间范围</Label>
                <DatePickerWithRange date={date} setDate={setDate} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="initialCapital">初始资金 (元)</Label>
                    <Input
                      id="initialCapital"
                      type="number"
                      value={backtestSettings.initialCapital}
                      onChange={(e) => handleBacktestSettingChange("initialCapital", Number(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="positionSize">仓位大小 (%)</Label>
                    <div className="flex items-center space-x-2">
                      <Slider
                        id="positionSize"
                        min={1}
                        max={100}
                        step={1}
                        value={[backtestSettings.positionSize]}
                        onValueChange={(value) => handleBacktestSettingChange("positionSize", value[0])}
                        className="flex-1"
                      />
                      <span className="w-12 text-center">{backtestSettings.positionSize}%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="allowShort"
                        checked={backtestSettings.allowShort}
                        onCheckedChange={(checked) => handleBacktestSettingChange("allowShort", !!checked)}
                      />
                      <Label htmlFor="allowShort">允许做空</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="stopLoss">止损设置 (%)</Label>
                    <div className="flex items-center space-x-2">
                      <Slider
                        id="stopLoss"
                        min={0}
                        max={20}
                        step={0.5}
                        value={[backtestSettings.stopLoss]}
                        onValueChange={(value) => handleBacktestSettingChange("stopLoss", value[0])}
                        className="flex-1"
                      />
                      <span className="w-12 text-center">{backtestSettings.stopLoss}%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="takeProfit">止盈设置 (%)</Label>
                    <div className="flex items-center space-x-2">
                      <Slider
                        id="takeProfit"
                        min={0}
                        max={50}
                        step={0.5}
                        value={[backtestSettings.takeProfit]}
                        onValueChange={(value) => handleBacktestSettingChange("takeProfit", value[0])}
                        className="flex-1"
                      />
                      <span className="w-12 text-center">{backtestSettings.takeProfit}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">交易成本设置</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="commissionRate">佣金率 (%)</Label>
                    <Input
                      id="commissionRate"
                      type="number"
                      step="0.01"
                      value={backtestSettings.commissionRate}
                      onChange={(e) => handleBacktestSettingChange("commissionRate", Number(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slippageRate">滑点率 (%)</Label>
                    <Input
                      id="slippageRate"
                      type="number"
                      step="0.01"
                      value={backtestSettings.slippageRate}
                      onChange={(e) => handleBacktestSettingChange("slippageRate", Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious}>
                上一步
              </Button>
              <Button onClick={handleSaveStrategy} disabled={isLoading}>
                <Save className="mr-2 h-4 w-4" />
                {isLoading ? "保存中..." : "保存策略"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <LineChart className="mr-2 h-5 w-5 text-primary" />
            策略预览
          </CardTitle>
          <CardDescription>根据当前设置的预览效果</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full rounded-md border border-dashed flex items-center justify-center">
            <div className="text-center space-y-2">
              <Settings className="h-10 w-10 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">完成参数设置后将显示策略预览</p>
              <Button variant="outline" size="sm">
                生成预览
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

