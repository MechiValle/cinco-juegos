import { Card, CardContent, CardMedia, Typography } from '@mui/material';

import type { Game } from '../../types/game';

interface Props {
  game: Game;
  onSelect: (game: Game) => void;
}

export const GameCard = ({ game, onSelect }: Props) => {
  return (
    <Card
      onClick={() => onSelect(game)}
      sx={{
        cursor: 'pointer',
        transition: '0.2s',
        '&:hover': {
          transform: 'translateY(-3px)',
        },
      }}
    >
      <CardMedia
        component='img'
        height='100'
        image={game.background_image ?? 'https://placehold.co/600x800'}
      />

      <CardContent>
        <Typography
          variant='body2'
          sx={{
            fontWeight: 600,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: 40,
          }}
          noWrap
        >
          {game.name}
        </Typography>

        <Typography variant='caption' color='text.secondary'>
          {game.released?.slice(0, 4)}
        </Typography>
      </CardContent>
    </Card>
  );
};
