import { forwardRef } from 'react';
import { Box, Button, TextField, Tooltip } from '@mui/material';
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
  onGenerate: () => void;
  canGenerate: boolean;
}
export const RecommendationTemplate = forwardRef<HTMLDivElement, Props>(
  (
    {
      slots,
      title,
      onTitleChange,
      featuredComment,
      onFeaturedCommentChange,
      onDeleteRequest,
      draggedSlot,
      onDragStart,
      onMoveGame,
      onGenerate,
      canGenerate,
    },
    ref,
  ) => {
    return (
      <Box
        ref={ref}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
        }}
      >
        <TextField
          fullWidth
          label='Mi top 5'
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          slotProps={{
            htmlInput: {
              maxLength: 40,
            },
          }}
          helperText='40 caracteres max.'
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
              gridTemplateColumns: {sx: '1fr', sm: '1fr 1fr'},
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
        <Tooltip title={canGenerate ? '' : 'Debes completar los 5 juegos'}>
          <span>
            <Button
              fullWidth
              variant='contained'
              disabled={!canGenerate}
              onClick={onGenerate}
              sx={{
                mt: 2,
                flexShrink: 0,
              }}
            >
              Generar Imagen
            </Button>
          </span>
        </Tooltip>
      </Box>
    );
  },
);
