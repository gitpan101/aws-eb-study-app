import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { ITodo } from '../types';

const Todo = ({ todo, onEdit }: { todo: ITodo; onEdit: () => void }) => {
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
        {todo.title}

        <IconButton onClick={onEdit}>
          <EditIcon color="action" fontSize="small" />
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
