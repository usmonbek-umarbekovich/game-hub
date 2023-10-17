import { useEffect, useState } from 'react';
import apiClient from '../services/api-client';
import { AxiosError } from 'axios';
import { Text } from '@chakra-ui/react';

interface Game {
  id: number;
  name: string;
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

function GameGrid() {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await apiClient.get<FetchGamesResponse>('/games');
        setGames(res.data.results);
      } catch (error) {
        if (error instanceof AxiosError) setError(error.message);
      }
    };
    fetchGames();
  }, []);

  return (
    <>
      {error && <Text>{error}</Text>}
      <ul>
        {games.map(game => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </>
  );
}
export default GameGrid;
