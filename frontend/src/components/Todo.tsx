import { Box } from '@mui/material';

const Todo = () => {
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
        Submit document
      </Box>

      <Box
        sx={{
          overflow: 'hidden',
        }}
      >
        Make sure to submit all the necessary documents. Make sure to submit all the necessary documents.
      </Box>
    </Box>
  );
};

export default Todo;
