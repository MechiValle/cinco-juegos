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
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteGameModal = ({ open, game, onClose, onConfirm }: Props) => {
  if (!game) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>Eliminar juego</DialogTitle>

      <DialogContent>
        <Typography>
          ¿Deseás eliminar <strong>{game.name}</strong> de la plantilla?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>No</Button>

        <Button color='error' variant='contained' onClick={onConfirm}>
          Si
        </Button>
      </DialogActions>
    </Dialog>
  );
};
