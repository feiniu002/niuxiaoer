import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Eye, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface VideoCardProps {
  title: string
  description: string
  duration: string
  views: number
  date: string
  thumbnailSrc: string
}

export function VideoCard({ title, description, duration, views, date, thumbnailSrc }: VideoCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-[150px] w-full group">
        <Image src={thumbnailSrc || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="rounded-full bg-primary/90 p-3">
            <Play className="h-6 w-6 text-primary-foreground fill-current" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">{duration}</div>
      </div>
      <CardHeader className="p-4">
        <CardTitle className="line-clamp-1">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{description}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="mr-1 h-3 w-3" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <Eye className="mr-1 h-3 w-3" />
            <span>{views.toLocaleString()} 次观看</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" asChild>
          <Link href={`/learn/videos/${encodeURIComponent(title)}`}>观看视频</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

