import { Box } from '@mui/material';
import { ITodo } from '../pages/Todos';

const Todo = ({ todo }: { todo: ITodo }) => {
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
        }}
      >
        {todo.title}
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
