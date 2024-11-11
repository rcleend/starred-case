import { useCallback, useEffect, useState } from 'react';
import { Job, JobsResponse } from '@/types';
import { getJobs, searchJobs } from '@/lib/api/client';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import debounce from 'lodash/debounce';
import { useMutation } from '@tanstack/react-query';

interface UseJobsProps {
  initialData?: JobsResponse;
}

export const useJobs = ({ initialData }: UseJobsProps = {}) => {
  // Core states
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchValue, setSearchValue] = useState('');
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
    queryKey: ['jobs'],
    queryFn: getJobs,
    getNextPageParam: (lastPage) => 
      lastPage.pagination.currentPage < lastPage.pagination.lastPage
        ? lastPage.pagination.currentPage + 1
        : undefined,
    initialData: initialData ? {
      pages: [initialData],
      pageParams: [0],
    } : undefined,
    enabled: !searchValue.trim(),
  });

  // Search mutation with debounce
  const searchMutation = useMutation({
    mutationFn: searchJobs,
    onSuccess: (results) => {
      setSearchResults(results);
    },
    onError: (error) => {
      console.error('Search failed:', error);
      setSearchResults([]);
    }
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
  const handleSearch = useCallback((value: string) => {
    setSearchValue(value);
    debouncedSearch(value);
  }, [debouncedSearch]);

  // Clear search function
  const clearSearch = useCallback(() => {
    setSearchValue('');
  }, []);

  // Compute active jobs list
  const jobs = searchValue ? searchResults : data?.pages.flatMap(page => page.data) ?? [];

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
    favorites: [], // TODO: Implement
    toggleFavorite: () => {}, // TODO: Implement
    searchValue,
    handleSearch,
    clearSearch,
  };
};