import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ArticleCardProps {
  title: string
  description: string
  author: string
  date: string
  readTime: string
  category: string
  imageSrc: string
}

export function ArticleCard({ title, description, author, date, readTime, category, imageSrc }: ArticleCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-[150px] w-full">
        <Image src={imageSrc || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <CardHeader className="p-4 pb-0">
        <div className="flex items-start justify-between">
          <Badge variant="secondary" className="mb-2">
            {category}
          </Badge>
        </div>
        <CardTitle className="line-clamp-1">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{description}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="mr-1 h-3 w-3" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            <span>{readTime}</span>
          </div>
          <div>
            <span>作者: {author}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/learn/articles/${encodeURIComponent(title)}`}>
            <BookOpen className="mr-2 h-4 w-4" />
            阅读全文
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

