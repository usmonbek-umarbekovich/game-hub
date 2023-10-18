import { useState } from 'react';
import { Grid, GridItem, Show } from '@chakra-ui/react';
import { Genre } from './hooks/useGenres';
import { Platform } from './hooks/usePlatforms';

import Navbar from './components/Navbar';
import GameGrid from './components/GameGrid';
import GenreList from './components/GenreList';
import PlatformSelector from './components/PlatformSelector';

function App() {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null
  );

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: '1fr',
        lg: '250px 1fr',
      }}>
      <GridItem area="nav">
        <Navbar />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenreList
            onSelectGenre={genre => setSelectedGenre(genre)}
            selectedGenre={selectedGenre}
          />
        </GridItem>
      </Show>
      <GridItem area="main">
        <PlatformSelector
          onSelectPlatform={platform => setSelectedPlatform(platform)}
          selectedPlatform={selectedPlatform}
        />
        <GameGrid
          selectedGenre={selectedGenre}
          selectedPlatform={selectedPlatform}
        />
      </GridItem>
    </Grid>
  );
}

export default App;
