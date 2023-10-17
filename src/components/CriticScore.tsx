import { Badge } from '@chakra-ui/react';

interface CriticScoreProps {
  score: number;
}

function CriticScore({ score }: CriticScoreProps) {
  let color = score > 75 ? 'green' : score > 60 ? 'yellow' : '';

  return (
    <Badge colorScheme={color} fontSize="14px" paddingX={2} borderRadius={1}>
      {score}
    </Badge>
  );
}
export default CriticScore;
