import {
  Button,
  HStack,
  Heading,
  Image,
  List,
  ListItem,
  Spinner,
} from '@chakra-ui/react';
import useGenres from '../hooks/useGenres';
import getCroppedImageUrl from '../services/image-url';
import useGameQueryStore from '../store';

function GenreList() {
  const selectedGenreId = useGameQueryStore(store => store.gameQuery.genreId);
  const setSelectedGenreId = useGameQueryStore(store => store.setGenreId);
  const { data, isLoading, error } = useGenres();

  if (error) return null;
  if (isLoading) return <Spinner />;

  return (
    <>
      <Heading fontSize="2xl" marginBottom={3}>
        Genres
      </Heading>
      <List>
        {data?.results.map(genre => (
          <ListItem key={genre.id} paddingY={1}>
            <HStack>
              <Image
                src={getCroppedImageUrl(genre.image_background)}
                boxSize={8}
                borderRadius={8}
                objectFit="cover"
              />
              <Button
                variant="link"
                whiteSpace="normal"
                textAlign="left"
                fontSize="lg"
                fontWeight={genre.id === selectedGenreId ? 'bold' : 'normal'}
                onClick={() => setSelectedGenreId(genre.id)}>
                {genre.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
}
export default GenreList;
