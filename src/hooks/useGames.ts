import { AxiosError, CanceledError } from 'axios';
import { useState, useEffect } from 'react';
import apiClient from '../services/api-client';

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchGames = async () => {
      try {
        const res = await apiClient.get<FetchGamesResponse>('/games', {
          signal: controller.signal,
        });
        setGames(res.data.results);
      } catch (error) {
        if (error instanceof CanceledError) return;
        if (error instanceof AxiosError) setError(error.message);
      }
    };
    fetchGames();

    return () => controller.abort();
  }, []);

  return { games, error };
};

export default useGames;
