import { useState, useEffect } from 'react';
import { CanceledError, AxiosError } from 'axios';
import apiClient from '../services/api-client';

interface FetchResponse<T> {
  count: number;
  results: T[];
}

const useData = <T>(endpoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchGames = async () => {
      try {
        const res = await apiClient.get<FetchResponse<T>>(endpoint, {
          signal: controller.signal,
        });
        setData(res.data.results);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof CanceledError) return;
        if (error instanceof AxiosError) setError(error.message);
        setIsLoading(false);
      }
    };
    fetchGames();

    return () => controller.abort();
  }, [endpoint]);

  return { data, error, isLoading };
};

export default useData;