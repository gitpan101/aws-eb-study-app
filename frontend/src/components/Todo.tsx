import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { ITodo } from '../types';

interface TodoProps {
  todo: ITodo;
  onEdit: () => void;
  onDelete: () => void;
}

const Todo = ({ todo, onEdit, onDelete }: TodoProps) => {
  return (
    <Box
      sx={{
        p: '10px',
        border: '1px solid #F08080',
        borderRadius: 2,
        maxWidth: '400px',
        height: '90px',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        mb: 2,
      }}
    >
      <Box
        sx={{
          fontWeight: 'bold',
          marginBottom: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} gap={'5px'}>
          <Box
            sx={{
              p: '5px',
            }}
          >
            {todo.title}
          </Box>

          <IconButton onClick={onEdit} size="small" color="primary">
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>

        <IconButton onClick={onDelete} size="small" color="error">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box
        sx={{
          overflow: 'hidden',
        }}
      >
        {todo.description}
      </Box>
    </Box>
  );
};

export default Todo;
