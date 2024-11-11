import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface JobCardProps {
  title: string
  description: string
  company: string
  isFavorite?: boolean
  isSelected?: boolean
  onFavorite?: () => void
  onClick?: () => void
}

export function JobCard({
  title,
  description,
  company,
  isFavorite,
  isSelected,
  onFavorite,
  onClick,
}: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-[1px]"
    >
      <Card 
        className={cn(
          "transition-all duration-200",
          "cursor-pointer h-[200px]",
          isSelected && "ring-1 ring-primary"
        )}
        onClick={onClick}
      >
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold leading-tight line-clamp-2">{title}</CardTitle>
            <p className="text-sm text-muted-foreground font-medium">{company}</p>
          </div>
          {onFavorite && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onFavorite();
              }}
              className={cn(
                "transition-colors duration-200",
                isFavorite && "text-yellow-500 hover:text-yellow-600"
              )}
            >
              <Star className="h-4 w-4" />
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed line-clamp-3">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
} 