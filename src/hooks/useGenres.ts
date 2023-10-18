import { useState, useEffect } from 'react';
import { CanceledError, AxiosError } from 'axios';
import apiClient from '../services/api-client';

interface Genre {
  id: number;
  name: string;
}

interface FetchGenresResponse {
  count: number;
  results: Genre[];
}

const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchGames = async () => {
      try {
        const res = await apiClient.get<FetchGenresResponse>('/genres', {
          signal: controller.signal,
        });
        setGenres(res.data.results);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof CanceledError) return;
        if (error instanceof AxiosError) setError(error.message);
        setIsLoading(false);
      }
    };
    fetchGames();

    return () => controller.abort();
  }, []);

  return { genres, error, isLoading };
};

export default useGenres;
