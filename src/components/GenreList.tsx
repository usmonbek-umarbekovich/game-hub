import {
  List,
  ListItem,
  Image,
  HStack,
  Spinner,
  Button,
} from '@chakra-ui/react';
import useGenres, { Genre } from '../hooks/useGenres';
import getCroppedImageUrl from '../services/image-url';

interface GenreListProps {
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

function GenreList({ onSelectGenre, selectedGenre }: GenreListProps) {
  const { data, isLoading, error } = useGenres();

  if (error) return null;
  if (isLoading) return <Spinner />;

  return (
    <List>
      {data.map(genre => (
        <ListItem key={genre.id} paddingY={1}>
          <HStack>
            <Image
              src={getCroppedImageUrl(genre.image_background)}
              boxSize={8}
              borderRadius={8}
            />
            <Button
              variant="link"
              fontSize="lg"
              fontWeight={genre.id === selectedGenre?.id ? 'bold' : 'normal'}
              onClick={() => onSelectGenre(genre)}>
              {genre.name}
            </Button>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
}
export default GenreList;
