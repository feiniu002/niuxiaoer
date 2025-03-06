import { Button } from "@/components/ui/button"
import { JournalEntry } from "@/components/journal-entry"
import { Plus } from "lucide-react"
import { DatePicker } from "@/components/date-picker"

export default function JournalPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">交易日记</h2>
        <div className="flex items-center gap-2">
          <DatePicker />
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新建日记
          </Button>
        </div>
      </div>
      <div className="grid gap-4">
        <JournalEntry
          date="2023-06-08"
          title="市场波动中的机会"
          content="今天市场出现较大波动，我观察到科技板块有超跌迹象，特别是半导体行业。基于对行业长期发展的信心，我增持了两只半导体ETF。同时，我注意到自己在市场下跌时容易产生恐慌情绪，需要更加理性地分析市场。"
          mood="平静"
          marketCondition="波动"
          tags={["科技", "半导体", "ETF"]}
        />
        <JournalEntry
          date="2023-06-05"
          title="季度财报分析"
          content="分析了几家持仓公司的季度财报，其中阿里巴巴的业绩超出预期，决定小幅增持。腾讯的游戏业务增长放缓，但云服务表现强劲，维持持仓不变。美团的外卖业务竞争加剧，但新业务线增长迅速，需要继续观察。"
          mood="乐观"
          marketCondition="稳定"
          tags={["财报", "阿里巴巴", "腾讯", "美团"]}
        />
        <JournalEntry
          date="2023-06-01"
          title="宏观经济数据思考"
          content="今日公布的PMI数据低于预期，市场对经济增长前景担忧加剧。我认为这可能导致短期市场调整，但也可能促使政策转向更加宽松，为长期投资创造机会。决定保持现有资产配置，并准备在市场大幅调整时分批买入优质股票。"
          mood="谨慎"
          marketCondition="下跌"
          tags={["宏观经济", "政策", "资产配置"]}
        />
      </div>
    </div>
  )
}

