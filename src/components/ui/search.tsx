import * as React from "react"
import { Input } from "./input"
import { cn } from "@/lib/utils"
import { Search as SearchIcon, X } from "lucide-react"
import { Button } from "./button"
import { motion } from "framer-motion"

interface SearchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (value: string) => void;
  onClear?: () => void;
}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ className, value, onChange, onClear, ...props }, ref) => {
    const showHelper = typeof value === 'string' && value.length > 0 && value.length < 2;

    return (
      <motion.div 
        className="relative"
        initial={false}
        animate={value ? "active" : "inactive"}
        variants={{
          active: { scale: 1.01 },
          inactive: { scale: 1 }
        }}
        transition={{ duration: 0.2 }}
      >
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
        <Input
          ref={ref}
          className={cn(
            "pl-10 pr-10",
            "bg-background/50",
            "border-muted-foreground/20",
            "focus:border-primary/30 focus:ring-primary/20",
            "transition-all duration-300",
            "placeholder:text-muted-foreground/50",
            className
          )}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...props}
        />
        {value && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-7 w-7"
            onClick={onClear}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        {showHelper && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-6 left-0 text-sm text-muted-foreground"
          >
            Please enter at least 2 characters to search
          </motion.p>
        )}
      </motion.div>
    )
  }
)
Search.displayName = "Search"

export { Search } 