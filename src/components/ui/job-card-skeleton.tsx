import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface JobCardSkeletonProps {
  isDetailed?: boolean;
}

export function JobCardSkeleton({ isDetailed = false }: JobCardSkeletonProps) {
  return (
    <Card 
      className={cn(
        "transition-shadow",
        isDetailed ? "lg:min-h-[600px]" : "h-[200px]"
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="space-y-2 w-full max-w-[70%]">
          <div className="h-6 bg-secondary rounded-md animate-shimmer" />
          <div className="h-4 w-24 bg-secondary rounded-md animate-shimmer" />
        </div>
        <div className="flex gap-2">
          {isDetailed && (
            <div className="h-9 w-20 bg-secondary rounded-md animate-shimmer" />
          )}
          <div className="h-9 w-9 bg-secondary rounded-md animate-shimmer" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="h-4 bg-secondary rounded-md animate-shimmer" />
          <div className="h-4 bg-secondary rounded-md animate-shimmer w-[90%]" />
          <div className="h-4 bg-secondary rounded-md animate-shimmer w-[80%]" />
        </div>
      </CardContent>
    </Card>
  );
}
