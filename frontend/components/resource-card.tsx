import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import type { ReactNode } from "react"

interface ResourceCardProps {
  title: string
  description: string
  type: string
  size: string
  downloads: number
  icon: ReactNode
}

export function ResourceCard({ title, description, type, size, downloads, icon }: ResourceCardProps) {
  return (
    <Card>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-center mb-2">{icon}</div>
        <CardTitle className="text-center text-base line-clamp-1">{title}</CardTitle>
        <CardDescription className="text-center text-xs">{type}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-xs text-muted-foreground text-center line-clamp-2 mb-2">{description}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>大小: {size}</span>
          <span>{downloads.toLocaleString()} 次下载</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" size="sm" className="w-full">
          <Download className="mr-2 h-3 w-3" />
          下载资源
        </Button>
      </CardFooter>
    </Card>
  )
}

