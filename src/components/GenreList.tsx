import { List, ListItem, Image, Text, HStack } from '@chakra-ui/react';
import useGenres from '../hooks/useGenres';
import getCroppedImageUrl from '../services/image-url';

function GenreList() {
  const { data } = useGenres();

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
            <Text fontSize="lg">{genre.name}</Text>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
}
export default GenreList;
