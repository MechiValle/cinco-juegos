import { Box, Skeleton } from '@mui/material';

import type { Game } from '../../types/game';
import { GameCard } from '../GameCard/GameCard';

interface Props {
  games: Game[];
  isLoading: boolean;
  searchTerm: string;
  onGameSelect: (game: Game) => void;
}

export const SearchResults = ({
  games,
  isLoading,
  searchTerm,
  onGameSelect,
}: Props) => {
  if (!searchTerm.trim()) {
    return (
      <Box
        sx={{
          mt: 3,
          p: 4,
          textAlign: 'center',
          border: '2px dashed #ddd',
          borderRadius: 3,
        }}
      >
        Buscá un juego para empezar
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          mt: 3,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 2,
        }}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} variant='rounded' height={300} />
        ))}
      </Box>
    );
  }

  if (games.length === 0) {
    const displaySearchTerm =
      searchTerm.length > 30 ? `${searchTerm.slice(0, 30)}...` : searchTerm;

    return (
      <Box
        sx={{
          mt: 3,
          p: 4,
          textAlign: 'center',
          border: '2px dashed #ddd',
          borderRadius: 3,
        }}
      >
        No se encontraron juegos para "{displaySearchTerm}"
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mt: 3,
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          lg: 'repeat(2, 1fr)',
        },
        gap: 2,
      }}
    >
      {games.map((game) => (
        <GameCard key={game.id} game={game} onSelect={onGameSelect} />
      ))}
    </Box>
  );
};
