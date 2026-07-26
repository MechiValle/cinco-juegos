import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

import type { Game } from '../../types/game';

interface Props {
  open: boolean;
  game: Game | null;
  hasEmptySlot: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export const AddGameModal = ({
  open,
  game,
  hasEmptySlot,
  onConfirm,
  onClose,
}: Props) => {
  if (!game) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle sx={{color: '#000000'}}>Agregar juego</DialogTitle>

      <DialogContent>
        <Typography>
          ¿Deseás agregar <strong>{game.name}</strong> a la plantilla?
        </Typography>

        {!hasEmptySlot && (
          <Typography color='error' sx={{ mt: 2 }}>
            Plantilla completa. Eliminá un juego primero.
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>No</Button>

        <Button
          variant='contained'
          onClick={onConfirm}
          disabled={!hasEmptySlot}
        >
          Si
        </Button>
      </DialogActions>
    </Dialog>
  );
};
