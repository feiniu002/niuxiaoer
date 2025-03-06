import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StrategyCard } from "@/components/strategy-card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function StrategiesPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">股票策略分析</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新建策略
        </Button>
      </div>
      <Tabs defaultValue="my-strategies" className="space-y-4">
        <TabsList>
          <TabsTrigger value="my-strategies">我的策略</TabsTrigger>
          <TabsTrigger value="popular">热门策略</TabsTrigger>
          <TabsTrigger value="templates">策略模板</TabsTrigger>
        </TabsList>
        <TabsContent value="my-strategies" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <StrategyCard
              title="价值投资策略"
              description="基于公司基本面和估值的长期投资策略"
              performance="+15.2%"
              risk="中等"
              timeframe="长期"
              lastUpdated="2023-05-15"
            />
            <StrategyCard
              title="动量交易策略"
              description="追踪市场趋势的短期交易策略"
              performance="+8.7%"
              risk="高"
              timeframe="短期"
              lastUpdated="2023-06-01"
            />
            <StrategyCard
              title="股息收益策略"
              description="专注于高股息收益率的稳健投资策略"
              performance="+6.5%"
              risk="低"
              timeframe="长期"
              lastUpdated="2023-04-20"
            />
            <StrategyCard
              title="成长股投资"
              description="投资于高增长潜力的公司"
              performance="+21.3%"
              risk="高"
              timeframe="中期"
              lastUpdated="2023-05-28"
            />
          </div>
        </TabsContent>
        <TabsContent value="popular" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <StrategyCard
              title="量化对冲策略"
              description="利用数学模型和算法的市场中性策略"
              performance="+12.8%"
              risk="中等"
              timeframe="中期"
              lastUpdated="2023-05-10"
            />
            <StrategyCard
              title="技术分析突破策略"
              description="基于价格和成交量模式的交易策略"
              performance="+9.5%"
              risk="高"
              timeframe="短期"
              lastUpdated="2023-06-05"
            />
            <StrategyCard
              title="ETF轮动策略"
              description="在不同行业ETF之间进行资产配置的策略"
              performance="+11.2%"
              risk="中等"
              timeframe="中期"
              lastUpdated="2023-05-22"
            />
          </div>
        </TabsContent>
        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <StrategyCard
              title="巴菲特价值投资模板"
              description="基于沃伦·巴菲特投资理念的策略模板"
              performance="历史+18.2%"
              risk="低"
              timeframe="长期"
              lastUpdated="2023-03-15"
              isTemplate={true}
            />
            <StrategyCard
              title="彼得·林奇成长投资模板"
              description="基于彼得·林奇投资理念的策略模板"
              performance="历史+16.7%"
              risk="中等"
              timeframe="中长期"
              lastUpdated="2023-04-10"
              isTemplate={true}
            />
            <StrategyCard
              title="格雷厄姆防御型投资模板"
              description="基于本杰明·格雷厄姆投资理念的策略模板"
              performance="历史+12.5%"
              risk="低"
              timeframe="长期"
              lastUpdated="2023-02-28"
              isTemplate={true}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

