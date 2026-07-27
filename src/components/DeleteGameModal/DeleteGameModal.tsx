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
      <DialogTitle sx={{color: '#000000'}}>Eliminar juego</DialogTitle>

      <DialogContent>
        <Typography>
          ¿Deseás eliminar <strong>{game.name}</strong> de la plantilla?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button sx={{color: '#e29578'}} onClick={onClose}>No</Button>

        <Button sx={{backgroundColor:'#e29578'}} variant='contained' onClick={onConfirm}>
          Si
        </Button>
      </DialogActions>
    </Dialog>
  );
};
