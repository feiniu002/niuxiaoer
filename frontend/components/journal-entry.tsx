import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"

interface JournalEntryProps {
  date: string
  title: string
  content: string
  mood: string
  marketCondition: string
  tags: string[]
}

export function JournalEntry({ date, title, content, mood, marketCondition, tags }: JournalEntryProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{date}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{content}</p>
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center gap-2 mr-4">
            <span className="text-xs font-medium">情绪:</span>
            <Badge variant="outline">{mood}</Badge>
          </div>
          <div className="flex items-center gap-2 mr-4">
            <span className="text-xs font-medium">市场状况:</span>
            <Badge variant="outline">{marketCondition}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium">标签:</span>
            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

