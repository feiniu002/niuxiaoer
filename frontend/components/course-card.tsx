import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Star, Users } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface CourseCardProps {
  title: string
  description: string
  instructor: string
  level: "初级" | "中级" | "高级"
  duration: string
  rating: number
  studentsCount: number
  imageSrc: string
}

export function CourseCard({
  title,
  description,
  instructor,
  level,
  duration,
  rating,
  studentsCount,
  imageSrc,
}: CourseCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-[180px] w-full">
        <Image src={imageSrc || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="line-clamp-1">{title}</CardTitle>
            <CardDescription className="mt-1 text-xs">讲师: {instructor}</CardDescription>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "ml-2 shrink-0",
              level === "初级"
                ? "border-blue-500 text-blue-500"
                : level === "中级"
                  ? "border-yellow-500 text-yellow-500"
                  : "border-red-500 text-red-500",
            )}
          >
            {level}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="mt-3 flex items-center justify-between text-sm">
          <div className="flex items-center text-muted-foreground">
            <Clock className="mr-1 h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Users className="mr-1 h-4 w-4" />
            <span>{studentsCount.toLocaleString()}</span>
          </div>
          <div className="flex items-center text-yellow-500">
            <Star className="mr-1 h-4 w-4 fill-yellow-500" />
            <span>{rating}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">开始学习</Button>
      </CardFooter>
    </Card>
  )
}

