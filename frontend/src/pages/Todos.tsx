import { Box } from '@mui/material';
import Page from '../components/Page';
import Todo from '../components/Todo';

const Todos = () => {
  return (
    <Page>
      <h2>Todos</h2>

      <Box
        sx={{
          maxHeight: '800px',
          overflowY: 'scroll',
          p: 2,
          borderRadius: 1,
          boxShadow: '0px -5px 0px 1px #F08080',
        }}
      >
        <Todo />
        <Todo />
        <Todo />
        <Todo />
        <Todo />
        <Todo />
        <Todo />
        <Todo />
        <Todo />
        <Todo />
        <Todo />
        <Todo />
        <Todo />
        <Todo />
        <Todo />
        <Todo />
        <Todo />
        <Todo />
      </Box>
    </Page>
  );
};

export default Todos;
