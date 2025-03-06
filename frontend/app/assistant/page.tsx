"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BrainCircuit, Send, Trash2, Save, Settings, ChevronRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

// 模拟AI助手的消息类型
type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

// 预设问题
const suggestedQuestions = [
  "如何评估一只股票的价值？",
  "当前市场趋势如何？",
  "如何构建一个多元化的投资组合？",
  "什么是价值投资策略？",
  "如何分析公司财务报表？",
  "如何设置止损点？",
  "什么是技术分析？",
  "如何判断市场顶部和底部？",
]

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "您好！我是牛小二的AI投资助手。我可以帮您分析市场趋势、评估股票价值、提供投资建议等。请问有什么可以帮到您的吗？",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // 发送消息
  const handleSendMessage = () => {
    if (!input.trim()) return

    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // 模拟AI响应
    setTimeout(() => {
      const aiResponse = generateAIResponse(input)
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1000)
  }

  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // 清除对话
  const handleClearChat = () => {
    setMessages([
      {
        id: "1",
        content:
          "您好！我是牛小二的AI投资助手。我可以帮您分析市场趋势、评估股票价值、提供投资建议等。请问有什么可以帮到您的吗？",
        role: "assistant",
        timestamp: new Date(),
      },
    ])
  }

  // 使用预设问题
  const handleUseQuestion = (question: string) => {
    setInput(question)
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">AI助手</h2>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-5">
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI助手" />
                <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>投资AI助手</CardTitle>
                <CardDescription>由先进的AI模型提供支持</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                      message.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted",
                    )}
                  >
                    {message.content}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex w-max max-w-[80%] flex-col gap-2 rounded-lg bg-muted px-3 py-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-primary"></div>
                      <div
                        className="h-2 w-2 animate-pulse rounded-full bg-primary"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="h-2 w-2 animate-pulse rounded-full bg-primary"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="pt-0">
            <div className="flex w-full items-center space-x-2">
              <Button variant="outline" size="icon" onClick={handleClearChat} title="清除对话">
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" title="保存对话">
                <Save className="h-4 w-4" />
              </Button>
              <Input
                placeholder="输入您的问题..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button size="icon" onClick={handleSendMessage} disabled={!input.trim() || isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>

        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI助手功能</CardTitle>
              <CardDescription>智能投资分析与建议</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-2">
                <BrainCircuit className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">市场分析</p>
                  <p className="text-sm text-muted-foreground">获取最新市场趋势和分析</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">投资建议</p>
                  <p className="text-sm text-muted-foreground">基于您的投资组合提供建议</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">知识解答</p>
                  <p className="text-sm text-muted-foreground">解答投资相关的各种问题</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>推荐问题</CardTitle>
              <CardDescription>点击尝试这些问题</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start text-left h-auto py-2"
                    onClick={() => handleUseQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// 模拟AI响应生成
function generateAIResponse(userInput: string): Message {
  // 这里可以根据用户输入生成不同的响应
  // 在实际应用中，这里会调用AI API

  const responses = [
    "根据最新的市场数据分析，目前A股市场整体估值处于合理区间，但科技和消费板块存在一定的投资机会。建议关注具有核心竞争力和稳定现金流的龙头企业。",
    "价值投资策略强调寻找被低估的股票，关注公司的内在价值而非短期市场波动。您可以通过分析公司的财务状况、竞争优势、管理团队和行业前景来评估其价值。",
    "构建多元化投资组合的关键是资产配置。建议您根据自己的风险承受能力，将资金分配到不同类型的资产中，如股票、债券、基金、现金等，并在不同行业和地区之间进行分散投资。",
    "技术分析是通过研究价格走势和交易量等市场数据来预测未来价格走势的方法。常用的技术指标包括移动平均线、相对强弱指标(RSI)、MACD等。",
    "设置止损点是风险管理的重要部分。一般建议将止损点设置在支撑位下方或者投资金额的5-10%处，具体需要根据个人风险承受能力和市场波动性来调整。",
    "评估股票价值可以使用多种方法，如市盈率(P/E)、市净率(P/B)、股息收益率、自由现金流折现模型(DCF)等。建议综合使用多种估值方法，并与行业平均水平和历史数据进行比较。",
    "分析公司财务报表时，需要关注收入增长、利润率、资产负债率、现金流等关键指标。同时，要注意财务报表的一致性和可能存在的会计处理问题。",
    "判断市场顶部和底部是非常困难的，即使是专业投资者也很难准确把握。建议关注估值水平、市场情绪、资金流向、政策环境等多方面因素，并采用分批买入或卖出的策略来降低风险。",
  ]

  // 简单匹配关键词返回相应回答
  let response = "感谢您的问题。我需要更多信息来提供准确的建议。您能否提供更多具体细节？"

  if (userInput.includes("价值") || userInput.includes("评估")) {
    response = responses[5]
  } else if (userInput.includes("市场") || userInput.includes("趋势")) {
    response = responses[0]
  } else if (userInput.includes("投资组合") || userInput.includes("多元化")) {
    response = responses[2]
  } else if (userInput.includes("价值投资")) {
    response = responses[1]
  } else if (userInput.includes("财务") || userInput.includes("报表")) {
    response = responses[6]
  } else if (userInput.includes("止损")) {
    response = responses[4]
  } else if (userInput.includes("技术分析")) {
    response = responses[3]
  } else if (userInput.includes("顶部") || userInput.includes("底部")) {
    response = responses[7]
  }

  return {
    id: (Date.now() + 1).toString(),
    content: response,
    role: "assistant",
    timestamp: new Date(),
  }
}

