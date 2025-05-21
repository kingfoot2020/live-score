import { useState, useEffect, useCallback } from 'react';

interface ApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

// Simple cache implementation
const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export function useApiData<T>(
  fetchFn: () => Promise<T>,
  cacheKey?: string,
  dependencies: any[] = []
): ApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Check cache if cacheKey is provided
      if (cacheKey) {
        const cachedData = cache[cacheKey];
        const now = Date.now();
        
        if (cachedData && now - cachedData.timestamp < CACHE_DURATION) {
          setData(cachedData.data);
          setIsLoading(false);
          return;
        }
      }
      
      // Fetch fresh data
      const result = await fetchFn();
      setData(result);
      
      // Update cache if cacheKey is provided
      if (cacheKey) {
        cache[cacheKey] = {
          data: result,
          timestamp: Date.now(),
        };
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn, cacheKey]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]);

  return { data, isLoading, error, refetch: fetchData };
}

export default useApiData; 