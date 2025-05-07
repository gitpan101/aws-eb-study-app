import { Box, Button } from '@mui/material';
import Page from '../components/Page';
import Todo from '../components/Todo';
import { useCallback, useEffect, useState } from 'react';
import { getTodos as getTodosApi } from '../services/api';
import { useNavigate } from 'react-router';
import AddTodo from '../components/AddTodo';

export interface ITodo {
  id: string;
  user_id: string;
  title: string;
  description: string;
  is_completed: string;
  created_at: string;
}

const Todos = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [openTodoForm, setOTF] = useState(false);

  const getTodos = useCallback(async () => {
    const user = sessionStorage.getItem('user');

    if (user) {
      const userTyped: {
        id: string;
      } = JSON.parse(user);

      const result = await getTodosApi(userTyped.id);
      setTodos(result.data as ITodo[]);
    } else navigate('/login');
  }, [navigate]);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <>
      <Page>
        <Box
          sx={{
            display: 'inline-flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <h2>Todos</h2>

          <Box>
            <Button variant="contained" size="small" onClick={() => setOTF(true)}>
              Add Todo
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            maxHeight: '800px',
            overflowY: 'scroll',
            p: 2,
            borderRadius: 1,
            border: '1px solid #F08080',
            borderTop: '5px solid #F08080',
          }}
        >
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </Box>
      </Page>

      <AddTodo open={openTodoForm} setOpen={setOTF} />
    </>
  );
};

export default Todos;
