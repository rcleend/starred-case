import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";
import { Confetti } from "./confetti";

interface DetailedJobCardProps {
  title: string;
  description: string;
  company: string;
  isFavorite?: boolean;
  onFavorite?: () => void;
  onApply?: () => void;
}

export function DetailedJobCard({
  title,
  description,
  company,
  isFavorite,
  onFavorite,
  onApply,
}: DetailedJobCardProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="p-[1px]"
      >
        <Card className="lg:min-h-[600px]">
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold leading-tight">
                {title}
              </CardTitle>
              <p className="text-sm text-muted-foreground font-medium">
                {company}
              </p>
            </div>
            <div className="flex gap-2">
              {onApply && (
                <Button
                  variant="default"
                  className="shadow-sm"
                  onClick={onApply}
                >
                  Apply Now
                </Button>
              )}
              {onFavorite && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onFavorite}
                  className={cn(
                    "transition-colors duration-200",
                    isFavorite && "text-yellow-500 hover:text-yellow-600"
                  )}
                >
                  <Star className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
