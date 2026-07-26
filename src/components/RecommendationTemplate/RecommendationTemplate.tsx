import { Box, Button, TextField } from '@mui/material';
import type { RecommendationSlots, SlotId } from '../../types/recommendation';

import { GameSlot } from '../GameSlot/GameSlot';

import type { Game } from '../../types/game';

interface Props {
  slots: RecommendationSlots;

  title: string;

  onTitleChange: (value: string) => void;

  featuredComment: string;

  onFeaturedCommentChange: (value: string) => void;

  onDeleteRequest: (slotKey: keyof RecommendationSlots, game: Game) => void;

  draggedSlot: SlotId | null;

  onDragStart: (slot: SlotId | null) => void;

  onMoveGame: (from: SlotId, to: SlotId) => void;
}
export const RecommendationTemplate = ({
  slots,
  title,
  onTitleChange,
  featuredComment,
  onFeaturedCommentChange,
  onDeleteRequest,
  draggedSlot,
  onDragStart,
  onMoveGame,
}: Props) => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
      }}
    >
      <TextField
        fullWidth
        label='Título'
        value={title}
        onChange={(event) => onTitleChange(event.target.value)}
        slotProps={{
          htmlInput: {
            maxLength: 40,
          },
        }}
        helperText='40 caracteres máximo'
      />

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          mt: 2,
          pr: 1,
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '110px 110px auto',
            gap: 2,
          }}
        >
          <GameSlot
            game={slots.slot1}
            label=''
            slotKey='slot1'
            onDeleteRequest={onDeleteRequest}
            draggedSlot={draggedSlot}
            onDragStart={onDragStart}
            onMoveGame={onMoveGame}
          />

          <GameSlot
            game={slots.slot2}
            label=''
            slotKey='slot2'
            onDeleteRequest={onDeleteRequest}
            draggedSlot={draggedSlot}
            onDragStart={onDragStart}
            onMoveGame={onMoveGame}
          />

          <GameSlot
            game={slots.slot3}
            label=''
            slotKey='slot3'
            onDeleteRequest={onDeleteRequest}
            draggedSlot={draggedSlot}
            onDragStart={onDragStart}
            onMoveGame={onMoveGame}
          />

          <GameSlot
            game={slots.slot4}
            label=''
            slotKey='slot4'
            onDeleteRequest={onDeleteRequest}
            draggedSlot={draggedSlot}
            onDragStart={onDragStart}
            onMoveGame={onMoveGame}
          />

          <Box
            sx={{
              gridColumn: '1 / span 2',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <GameSlot
              game={slots.slot5}
              label=''
              featured
              slotKey='slot5'
              onDeleteRequest={onDeleteRequest}
              featuredComment={featuredComment}
              onFeaturedCommentChange={onFeaturedCommentChange}
              draggedSlot={draggedSlot}
              onDragStart={onDragStart}
              onMoveGame={onMoveGame}
            />
          </Box>
        </Box>
      </Box>
      <Button
        fullWidth
        variant='contained'
        sx={{
          mt: 2,
          flexShrink: 0,
        }}
        disabled
      >
        Generar Imagen
      </Button>
    </Box>
  );
};
