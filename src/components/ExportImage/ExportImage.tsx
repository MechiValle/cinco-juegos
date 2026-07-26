import { Box, Typography } from '@mui/material';

import type { RecommendationSlots } from '../../types/recommendation';

interface Props {
  title: string;
  slots: RecommendationSlots;
  featuredComment: string;
}

export const ExportImage = ({ title, slots, featuredComment }: Props) => {
  const smallGames = [slots.slot1, slots.slot2, slots.slot3, slots.slot4];

  const featuredGame = slots.slot5;

  return (
    <Box
      sx={{
        width: 1080,
        height: 1350,
        bgcolor: '#FAFAFA',
        color: '#1A1A1A',
        p: 5,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Typography
        variant='h3'
        sx={{
          fontWeight: 800,
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 3,
        }}
      >
        {smallGames.map((game, index) => (
          <Box
            key={index}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              bgcolor: '#FFFFFF',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
          >
            {game && (
              <>
                <img
                  src={game.background_image ?? 'https://placehold.co/600x800'}
                  alt={game.name}
                  style={{
                    width: '100%',
                    height: '220px',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />

                <Box sx={{ p: 2 }}>
                  <Typography sx={{ fontWeight: 700 }}>{game.name}</Typography>

                  <Typography variant='body2' color='text.secondary'>
                    {game.released?.slice(0, 4)}
                  </Typography>

                  <Typography variant='body2' color='text.secondary'>
                    {game.genres?.map((genre) => genre.name).join(', ')}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        ))}
      </Box>

      {featuredGame && (
        <Box
          sx={{
            flex: 1,
            borderRadius: 4,
            bgcolor: '#FFFFFF',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            overflow: 'hidden',
            display: 'flex',
          }}
        >
          <img
            src={
              featuredGame.background_image ?? 'https://placehold.co/600x800'
            }
            alt={featuredGame.name}
            style={{
              width: '520px',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />

          <Box
            sx={{
              p: 4,
              flex: 1,
            }}
          >
            <Typography variant='h4' sx={{ fontWeight: 800 }}>
              {featuredGame.name}
            </Typography>

            <Typography sx={{ mt: 1 }}>
              {featuredGame.released?.slice(0, 4)}
            </Typography>

            <Typography sx={{ mt: 1 }}>
              {featuredGame.genres?.map((genre) => genre.name).join(', ')}
            </Typography>

            <Typography sx={{ mt: 1 }}>
              {featuredGame.platforms
                ?.map((platform) => platform.platform.name)
                .join(', ')}
            </Typography>

            <Typography
              sx={{
                mt: 4,
                fontSize: 24,
                fontStyle: 'italic',
              }}
            >
              {featuredComment}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};
