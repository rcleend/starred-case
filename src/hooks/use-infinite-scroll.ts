import { useCallback, useEffect, useRef } from 'react';
import { QueryKey, useInfiniteQuery} from '@tanstack/react-query';

interface UseInfiniteScrollOptions<TData> {
  queryKey: QueryKey;
  queryFn: (pageParam: number) => Promise<TData>;
  getNextPageParam: (lastPage: TData, allPages: TData[]) => number | undefined;
  initialData?: {
    pages: TData[];
    pageParams: number[];
  };
  enabled?: boolean;
  onError?: (error: Error) => void;
}

export function useInfiniteScroll<TData>({
  queryKey,
  queryFn,
  getNextPageParam,
  initialData,
  enabled = true,
  onError,
}: UseInfiniteScrollOptions<TData>) {
  const observerRef = useRef<IntersectionObserver>();
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey,
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) => queryFn(pageParam),
    getNextPageParam,
    initialData,
    enabled, 
  });

  useEffect(() => {
    if (isError && onError) {
      onError(error);
    }
  }, [isError]);


  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = undefined;
    }

    const element = lastElementRef.current;
    if (!element || !enabled) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      threshold: 0.5,
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver, enabled]);

  return {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    lastElementRef,
  };
} 