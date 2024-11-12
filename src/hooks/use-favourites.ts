import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToFavourites, removeFromFavourites } from "@/lib/api/client";
import { useToast } from "@/hooks/use-toast";
import { QUERY_KEYS } from "@/lib/constants";

export const useFavourites = ({
  initialFavouriteJobIds,
}: {
  initialFavouriteJobIds: number[];
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [favouriteJobIds, setFavouriteJobIds] = useState(
    initialFavouriteJobIds
  );

  const invalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.JOBS });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.FAVOURITE_JOBS });
  };

  const addFavouriteMutation = useMutation({
    mutationFn: (jobId: number) => addToFavourites(jobId),
    onSuccess: (favouriteJobIds: number[]) => {
      setFavouriteJobIds(favouriteJobIds);
      invalidateQueries();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add job to favourites",
      });
    },
  });

  const removeFavouriteMutation = useMutation({
    mutationFn: (jobId: number) => removeFromFavourites(jobId),
    onSuccess: (favouriteJobIds: number[]) => {
      setFavouriteJobIds(favouriteJobIds);
      invalidateQueries();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove job from favourites",
      });
    },
  });

  const toggleFavourite = (jobId: number) => {
    const isCurrentlyFavourited = favouriteJobIds.some((id) => id === jobId);

    if (isCurrentlyFavourited) {
      removeFavouriteMutation.mutate(jobId);
    } else {
      addFavouriteMutation.mutate(jobId);
    }
  };

  return {
    favouriteJobIds,
    toggleFavourite,
    isLoading:
      addFavouriteMutation.isPending || removeFavouriteMutation.isPending,
    isError: addFavouriteMutation.isError || removeFavouriteMutation.isError,
  };
};
