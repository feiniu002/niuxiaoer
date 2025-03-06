import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CourseCard } from "@/components/course-card"
import { ArticleCard } from "@/components/article-card"
import { VideoCard } from "@/components/video-card"
import { ResourceCard } from "@/components/resource-card"
import { LearningPath } from "@/components/learning-path"
import { BookOpen, BookmarkIcon, FileText, Filter, Lightbulb, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function LearnPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">学习区</h2>
          <p className="text-muted-foreground">提升您的投资知识和技能</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="搜索学习资源..." className="w-full pl-8 md:w-[300px]" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">全部</TabsTrigger>
          <TabsTrigger value="courses">课程</TabsTrigger>
          <TabsTrigger value="articles">文章</TabsTrigger>
          <TabsTrigger value="videos">视频</TabsTrigger>
          <TabsTrigger value="resources">资源</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">推荐学习路径</h3>
              <Button variant="link" asChild>
                <Link href="/learn/paths">查看全部</Link>
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <LearningPath
                title="投资新手入门"
                description="从零开始学习投资基础知识和技能"
                level="初级"
                coursesCount={5}
                duration="10小时"
                progress={0}
              />
              <LearningPath
                title="价值投资进阶"
                description="深入学习价值投资理念和实践方法"
                level="中级"
                coursesCount={7}
                duration="15小时"
                progress={30}
              />
              <LearningPath
                title="技术分析专家"
                description="掌握高级技术分析方法和交易策略"
                level="高级"
                coursesCount={8}
                duration="20小时"
                progress={10}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">热门课程</h3>
              <Button variant="link" asChild>
                <Link href="/learn/courses">查看全部</Link>
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <CourseCard
                title="股票投资基础"
                description="了解股票市场的基本概念和投资方法"
                instructor="张教授"
                level="初级"
                duration="3小时"
                rating={4.8}
                studentsCount={1250}
                imageSrc="/placeholder.svg?height=200&width=300"
              />
              <CourseCard
                title="财务报表分析"
                description="学习如何解读公司财务报表并评估投资价值"
                instructor="李分析师"
                level="中级"
                duration="5小时"
                rating={4.7}
                studentsCount={980}
                imageSrc="/placeholder.svg?height=200&width=300"
              />
              <CourseCard
                title="技术分析入门"
                description="掌握基本的技术分析工具和方法"
                instructor="王交易员"
                level="初级"
                duration="4小时"
                rating={4.6}
                studentsCount={1560}
                imageSrc="/placeholder.svg?height=200&width=300"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">最新文章</h3>
              <Button variant="link" asChild>
                <Link href="/learn/articles">查看全部</Link>
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <ArticleCard
                title="如何在波动市场中保持冷静"
                description="市场波动是正常的，学会控制情绪是成功投资的关键"
                author="陈投资顾问"
                date="2023-06-15"
                readTime="8分钟"
                category="投资心理"
                imageSrc="/placeholder.svg?height=150&width=300"
              />
              <ArticleCard
                title="2023年下半年市场展望"
                description="分析当前经济形势和市场趋势，展望下半年投资机会"
                author="赵首席分析师"
                date="2023-06-10"
                readTime="12分钟"
                category="市场分析"
                imageSrc="/placeholder.svg?height=150&width=300"
              />
              <ArticleCard
                title="ETF投资策略详解"
                description="了解ETF的优势和如何构建ETF投资组合"
                author="刘基金经理"
                date="2023-06-05"
                readTime="10分钟"
                category="投资策略"
                imageSrc="/placeholder.svg?height=150&width=300"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">精选视频</h3>
              <Button variant="link" asChild>
                <Link href="/learn/videos">查看全部</Link>
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <VideoCard
                title="股票估值方法详解"
                description="深入讲解市盈率、市净率等常用估值指标"
                duration="25:30"
                views={3500}
                date="2023-06-12"
                thumbnailSrc="/placeholder.svg?height=150&width=300"
              />
              <VideoCard
                title="K线图基础教程"
                description="学习如何解读K线图和常见形态"
                duration="18:45"
                views={4200}
                date="2023-06-08"
                thumbnailSrc="/placeholder.svg?height=150&width=300"
              />
              <VideoCard
                title="巴菲特投资哲学"
                description="解析巴菲特的投资理念和成功秘诀"
                duration="32:15"
                views={5800}
                date="2023-06-03"
                thumbnailSrc="/placeholder.svg?height=150&width=300"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">实用资源</h3>
              <Button variant="link" asChild>
                <Link href="/learn/resources">查看全部</Link>
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <ResourceCard
                title="投资者日历模板"
                description="跟踪重要财经事件和公司公告"
                type="Excel模板"
                size="1.2MB"
                downloads={850}
                icon={<FileText className="h-8 w-8 text-primary" />}
              />
              <ResourceCard
                title="股票筛选工具"
                description="基于多种指标筛选潜力股票"
                type="在线工具"
                size="--"
                downloads={1200}
                icon={<Lightbulb className="h-8 w-8 text-primary" />}
              />
              <ResourceCard
                title="投资术语词典"
                description="详细解释500+投资专业术语"
                type="PDF文档"
                size="3.5MB"
                downloads={1500}
                icon={<BookOpen className="h-8 w-8 text-primary" />}
              />
              <ResourceCard
                title="投资组合跟踪表"
                description="记录和分析您的投资表现"
                type="Excel模板"
                size="1.8MB"
                downloads={980}
                icon={<FileText className="h-8 w-8 text-primary" />}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <CourseCard
              title="股票投资基础"
              description="了解股票市场的基本概念和投资方法"
              instructor="张教授"
              level="初级"
              duration="3小时"
              rating={4.8}
              studentsCount={1250}
              imageSrc="/placeholder.svg?height=200&width=300"
            />
            <CourseCard
              title="财务报表分析"
              description="学习如何解读公司财务报表并评估投资价值"
              instructor="李分析师"
              level="中级"
              duration="5小时"
              rating={4.7}
              studentsCount={980}
              imageSrc="/placeholder.svg?height=200&width=300"
            />
            <CourseCard
              title="技术分析入门"
              description="掌握基本的技术分析工具和方法"
              instructor="王交易员"
              level="初级"
              duration="4小时"
              rating={4.6}
              studentsCount={1560}
              imageSrc="/placeholder.svg?height=200&width=300"
            />
            <CourseCard
              title="投资组合管理"
              description="学习如何构建和管理多元化投资组合"
              instructor="郑基金经理"
              level="中级"
              duration="6小时"
              rating={4.9}
              studentsCount={820}
              imageSrc="/placeholder.svg?height=200&width=300"
            />
            <CourseCard
              title="风险管理策略"
              description="了解投资风险类型和管理方法"
              instructor="孙风控专家"
              level="中级"
              duration="4.5小时"
              rating={4.7}
              studentsCount={750}
              imageSrc="/placeholder.svg?height=200&width=300"
            />
            <CourseCard
              title="宏观经济分析"
              description="学习如何分析宏观经济指标及其对市场的影响"
              instructor="吴经济学家"
              level="高级"
              duration="7小时"
              rating={4.8}
              studentsCount={680}
              imageSrc="/placeholder.svg?height=200&width=300"
            />
          </div>
        </TabsContent>

        <TabsContent value="articles" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ArticleCard
              title="如何在波动市场中保持冷静"
              description="市场波动是正常的，学会控制情绪是成功投资的关键"
              author="陈投资顾问"
              date="2023-06-15"
              readTime="8分钟"
              category="投资心理"
              imageSrc="/placeholder.svg?height=150&width=300"
            />
            <ArticleCard
              title="2023年下半年市场展望"
              description="分析当前经济形势和市场趋势，展望下半年投资机会"
              author="赵首席分析师"
              date="2023-06-10"
              readTime="12分钟"
              category="市场分析"
              imageSrc="/placeholder.svg?height=150&width=300"
            />
            <ArticleCard
              title="ETF投资策略详解"
              description="了解ETF的优势和如何构建ETF投资组合"
              author="刘基金经理"
              date="2023-06-05"
              readTime="10分钟"
              category="投资策略"
              imageSrc="/placeholder.svg?height=150&width=300"
            />
            <ArticleCard
              title="价值投资者的20条黄金法则"
              description="汇总价值投资大师的核心投资原则"
              author="黄价值投资者"
              date="2023-06-01"
              readTime="15分钟"
              category="价值投资"
              imageSrc="/placeholder.svg?height=150&width=300"
            />
            <ArticleCard
              title="如何识别财务造假"
              description="学习识别公司财务报表中的红旗信号"
              author="钱财务专家"
              date="2023-05-28"
              readTime="14分钟"
              category="财务分析"
              imageSrc="/placeholder.svg?height=150&width=300"
            />
            <ArticleCard
              title="投资者常犯的10个错误"
              description="避免这些常见错误，提高投资成功率"
              author="周投资教练"
              date="2023-05-25"
              readTime="9分钟"
              category="投资心理"
              imageSrc="/placeholder.svg?height=150&width=300"
            />
          </div>
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <VideoCard
              title="股票估值方法详解"
              description="深入讲解市盈率、市净率等常用估值指标"
              duration="25:30"
              views={3500}
              date="2023-06-12"
              thumbnailSrc="/placeholder.svg?height=150&width=300"
            />
            <VideoCard
              title="K线图基础教程"
              description="学习如何解读K线图和常见形态"
              duration="18:45"
              views={4200}
              date="2023-06-08"
              thumbnailSrc="/placeholder.svg?height=150&width=300"
            />
            <VideoCard
              title="巴菲特投资哲学"
              description="解析巴菲特的投资理念和成功秘诀"
              duration="32:15"
              views={5800}
              date="2023-06-03"
              thumbnailSrc="/placeholder.svg?height=150&width=300"
            />
            <VideoCard
              title="量化投资入门"
              description="了解量化投资的基本概念和策略"
              duration="28:20"
              views={2900}
              date="2023-05-30"
              thumbnailSrc="/placeholder.svg?height=150&width=300"
            />
            <VideoCard
              title="如何分析行业趋势"
              description="掌握行业分析方法和工具"
              duration="22:10"
              views={3100}
              date="2023-05-25"
              thumbnailSrc="/placeholder.svg?height=150&width=300"
            />
            <VideoCard
              title="投资者心理学"
              description="了解市场心理和行为金融学基础"
              duration="35:45"
              views={4500}
              date="2023-05-20"
              thumbnailSrc="/placeholder.svg?height=150&width=300"
            />
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <ResourceCard
              title="投资者日历模板"
              description="跟踪重要财经事件和公司公告"
              type="Excel模板"
              size="1.2MB"
              downloads={850}
              icon={<FileText className="h-8 w-8 text-primary" />}
            />
            <ResourceCard
              title="股票筛选工具"
              description="基于多种指标筛选潜力股票"
              type="在线工具"
              size="--"
              downloads={1200}
              icon={<Lightbulb className="h-8 w-8 text-primary" />}
            />
            <ResourceCard
              title="投资术语词典"
              description="详细解释500+投资专业术语"
              type="PDF文档"
              size="3.5MB"
              downloads={1500}
              icon={<BookOpen className="h-8 w-8 text-primary" />}
            />
            <ResourceCard
              title="投资组合跟踪表"
              description="记录和分析您的投资表现"
              type="Excel模板"
              size="1.8MB"
              downloads={980}
              icon={<FileText className="h-8 w-8 text-primary" />}
            />
            <ResourceCard
              title="财务比率计算器"
              description="自动计算关键财务比率和指标"
              type="Excel工具"
              size="2.3MB"
              downloads={720}
              icon={<FileText className="h-8 w-8 text-primary" />}
            />
            <ResourceCard
              title="投资决策清单"
              description="系统化您的投资决策过程"
              type="PDF文档"
              size="0.8MB"
              downloads={1050}
              icon={<BookmarkIcon className="h-8 w-8 text-primary" />}
            />
            <ResourceCard
              title="市场数据API指南"
              description="获取和使用金融市场数据API"
              type="PDF指南"
              size="2.1MB"
              downloads={650}
              icon={<FileText className="h-8 w-8 text-primary" />}
            />
            <ResourceCard
              title="投资电子书合集"
              description="10本经典投资电子书"
              type="ZIP压缩包"
              size="15.6MB"
              downloads={2200}
              icon={<BookOpen className="h-8 w-8 text-primary" />}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

