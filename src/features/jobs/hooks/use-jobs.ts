import { useCallback, useState } from "react";
import { Job, JobsResponse } from "@/types";
import { getJobs, searchJobs } from "@/lib/api/client";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import debounce from "lodash/debounce";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface UseJobsProps {
  initialJobs?: JobsResponse;
}

export const useJobs = ({ initialJobs }: UseJobsProps = {}) => {
  // Core states
  const { toast } = useToast();
  const [selectedJob, setSelectedJob] = useState<Job | null>(
    initialJobs?.data[0] ?? null
  );
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<Job[]>([]);

  // Infinite scroll setup
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    lastElementRef,
  } = useInfiniteScroll<JobsResponse>({
    queryKey: ["jobs"],
    queryFn: getJobs,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.currentPage < lastPage.pagination.lastPage
        ? lastPage.pagination.currentPage + 1
        : undefined,
    initialData: initialJobs
      ? {
          pages: [initialJobs],
          pageParams: [0],
        }
      : undefined,
    enabled: !searchValue.trim(),
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch jobs. Please try again later.",
      });
    },
  });

  // Search mutation with debounce
  const searchMutation = useMutation({
    mutationFn: searchJobs,
    onSuccess: (results) => {
      setSearchResults(results);
    },
    onError: (error) => {
      setSearchResults([]);
      toast({
        variant: "destructive",
        title: "Search Failed",
        description: "Failed to search jobs. Please try again.",
      });
    },
  });

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (value.length >= 2) {
        searchMutation.mutate(value);
      }
    }, 300),
    [searchMutation]
  );

  // Debounced search function
  const handleSearch = useCallback(
    (value: string) => {
      setSearchValue(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  // Clear search function
  const clearSearch = useCallback(() => {
    setSearchValue("");
  }, []);

  // Compute active jobs list
  const jobs =
    searchValue.trim().length > 2
      ? searchResults
      : data?.pages.flatMap((page) => page.data) ?? [];

  return {
    jobs,
    selectedJob,
    setSelectedJob,
    isLoading: isLoading || searchMutation.isPending,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    lastElementRef,
    searchValue,
    handleSearch,
    clearSearch,
  };
};
