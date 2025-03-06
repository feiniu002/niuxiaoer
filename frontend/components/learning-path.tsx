import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

interface LearningPathProps {
  title: string
  description: string
  level: "初级" | "中级" | "高级"
  coursesCount: number
  duration: string
  progress: number
}

export function LearningPath({ title, description, level, coursesCount, duration, progress }: LearningPathProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          <Badge
            variant="outline"
            className={
              level === "初级"
                ? "border-blue-500 text-blue-500"
                : level === "中级"
                  ? "border-yellow-500 text-yellow-500"
                  : "border-red-500 text-red-500"
            }
          >
            {level}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <BookOpen className="mr-1 h-4 w-4" />
            <span>{coursesCount} 门课程</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            <span>{duration}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>完成进度</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href={`/learn/paths/${encodeURIComponent(title)}`}>{progress > 0 ? "继续学习" : "开始学习"}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

