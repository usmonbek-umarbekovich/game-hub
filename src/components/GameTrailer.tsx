import useTrailers from '../hooks/useTrailers';

interface Props {
  gameId: number;
}

function GameTrailer({ gameId }: Props) {
  const { data: trailers, error, isLoading } = useTrailers(gameId);

  if (isLoading) return null;

  if (error) throw error;

  const firstTrailer = trailers?.results[0];
  if (!firstTrailer) return null;

  return (
    firstTrailer && (
      <video
        src={firstTrailer?.data[480]}
        poster={firstTrailer.preview}
        controls
        style={{ height: '480px' }}
      />
    )
  );
}
export default GameTrailer;
