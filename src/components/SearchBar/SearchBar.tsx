import SearchIcon from '@mui/icons-material/Search';
import { IconButton, Paper, TextField } from '@mui/material';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: Props) => {
  return (
    <Paper
      sx={{
        display: 'flex',
        p: 1,
        gap: 1,
        backgroundColor: '#FAFAFA',
      }}
    >
      <TextField
        fullWidth
        value={value}
        placeholder='Buscar juegos...'
        onChange={(event) => onChange(event.target.value)}
      />

      <IconButton
        sx={{
          color: '#000000',
        }}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
