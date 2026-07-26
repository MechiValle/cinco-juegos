import { Box, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import type { Game } from '../../types/game';

import type { SlotId } from '../../types/recommendation';

interface Props {
  game: Game | null;
  label: string;
  featured?: boolean;
  slotKey: SlotId;
  onDeleteRequest: (slotKey: SlotId, game: Game) => void;
  featuredComment?: string;
  onFeaturedCommentChange?: (value: string) => void;
  draggedSlot: SlotId | null;
  onDragStart: (slot: SlotId | null) => void;
  onMoveGame: (from: SlotId, to: SlotId) => void;
}

export const GameSlot = ({
  game,
  label,
  featured = false,
  slotKey,
  onDeleteRequest,
  featuredComment,
  onFeaturedCommentChange,
  draggedSlot,
  onDragStart,
  onMoveGame,
}: Props) => {
  if (!game) {
    return (
      <Box
        onDragOver={(event) => {
          event.preventDefault();
        }}
        onDrop={() => {
          if (draggedSlot) {
            onMoveGame(draggedSlot, slotKey);
          }

          onDragStart(null);
        }}
        sx={{
          ...slotStyle,
          border: draggedSlot ? '2px dashed #7C4DFF' : slotStyle.border,
        }}
      >
        <Typography color='text.secondary'>{label}</Typography>
      </Box>
    );
  }

  if (featured) {
    return (
      <Box
        draggable
        onDragStart={() => {
          onDragStart(slotKey);
        }}
        onDragEnd={() => {
          onDragStart(null);
        }}
        sx={{
          ...slotStyle,
          p: 2,
          gap: 2,
          display: 'flex',
          padding: '20px',
          border:
            draggedSlot && draggedSlot !== slotKey
              ? '2px dashed #7C4DFF'
              : slotStyle.border,
        }}
        onDragOver={(event) => {
          event.preventDefault();
        }}
        onDrop={() => {
          if (draggedSlot && draggedSlot !== slotKey) {
            onMoveGame(draggedSlot, slotKey);
          }

          onDragStart(null);
        }}
      >
        <Box
          sx={{
            position: 'relative',
            flexShrink: 0,

            '&:hover .delete-button': {
              opacity: 1,
            },
          }}
        >
          <Box
            component='img'
            src={game.background_image ?? 'https://placehold.co/200x300'}
            sx={{
              width: 120,
              height: 140,
              objectFit: 'cover',
              borderRadius: 2,
              display: 'block',
            }}
          />

          <Box
            className='delete-button'
            onClick={() => onDeleteRequest(slotKey, game)}
            sx={{
              position: 'absolute',
              inset: 0,

              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',

              borderRadius: 2,
              overflow: 'hidden',

              opacity: 0,
              transition: '0.2s',

              cursor: 'pointer',

              backgroundColor: 'rgba(0,0,0,0.65)',
            }}
          >
            <DeleteIcon
              sx={{
                fontSize: 36,
                color: '#fff',
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: 700 }}>
            {game.name}
          </Typography>

          <Typography variant='caption' color='text.secondary'>
            ({game.released?.slice(0, 4)})
          </Typography>
          <br></br>
          <Typography
            variant='caption'
            color='text.secondary'
            sx={{
              mb: 1,
            }}
          >
            {game.genres?.map((genre) => genre.name).join(', ')}
          </Typography>

          <TextField
            fullWidth
            size='small'
            label='Comentario destacado'
            value={featuredComment ?? ''}
            onChange={(event) => onFeaturedCommentChange?.(event.target.value)}
            multiline
            rows={2}
            helperText={`${featuredComment?.length ?? 0}/120`}
            slotProps={{
              htmlInput: {
                maxLength: 120,
              },
            }}
            sx={{
              mt: 1.5,
            }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      draggable
      onDragStart={() => {
        onDragStart(slotKey);
      }}
      onDragEnd={() => {
        onDragStart(null);
      }}
      sx={{
        ...slotStyle,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
        p: 1.5,
        border:
          draggedSlot && draggedSlot !== slotKey
            ? '2px dashed #7C4DFF'
            : slotStyle.border,
      }}
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDrop={() => {
        if (draggedSlot && draggedSlot !== slotKey) {
          onMoveGame(draggedSlot, slotKey);
        }

        onDragStart(null);
      }}
    >
      <Box
        sx={{
          position: 'relative',
          flexShrink: 0,

          '&:hover .delete-button': {
            opacity: 1,
          },
        }}
      >
        <Box
          component='img'
          src={game.background_image ?? 'https://placehold.co/200x300'}
          sx={{
            width: 60,
            height: 60,
            objectFit: 'cover',
            borderRadius: 2,
            display: 'block',
          }}
        />

        <Box
          className='delete-button'
          onClick={() => onDeleteRequest(slotKey, game)}
          sx={{
            position: 'absolute',
            inset: 0,

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            borderRadius: 2,
            overflow: 'hidden',

            opacity: 0,
            transition: '0.2s',

            cursor: 'pointer',

            backgroundColor: 'rgba(0,0,0,0.65)',
          }}
        >
          <DeleteIcon
            sx={{
              fontSize: 24,
              color: '#fff',
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
        }}
      >
        <Typography
          variant='caption'
          sx={{
            lineHeight: 1.2,
            fontWeight: 700,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {game.name}
        </Typography>

        <Typography
          variant='caption'
          color='text.secondary'
          sx={{ display: 'block' }}
        >
          ({game.released?.slice(0, 4)})
        </Typography>

        <Typography
          variant='caption'
          color='text.secondary'
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            display: 'block',
            maxWidth: '100%',
          }}
        >
          {game.genres?.map((genre) => genre.name).join(', ')}
        </Typography>

        {featured && (
          <Typography
            variant='caption'
            sx={{
              mt: 1,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {game.description ?? 'Game description will appear here.'}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const slotStyle = {
  border: '2px dashed #ddd',

  borderRadius: 3,

  display: 'flex',

  overflow: 'hidden',

  minHeight: 90,
};
