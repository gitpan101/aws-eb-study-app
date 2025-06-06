import { Box, Button } from '@mui/material';
import Page from '../components/Page';
import Todo from '../components/Todo';
import { useCallback, useEffect, useRef, useState } from 'react';
import { addTodoApi, editTodoApi, deleteTodoApi, getTodos as getTodosApi } from '../services/api';
import { useNavigate } from 'react-router';
import { ITodo, IUser } from '../types';
import { toast } from 'react-toastify';

import AddTodo from '../components/AddTodo';
import DeleteTodo from '../components/DeleteTodo'; // Import the DeleteTodo component

const Todos = () => {
  const navigate = useNavigate();

  const [todos, setTodos] = useState<ITodo[]>([]);
  const [openTodoForm, setOTF] = useState(false);
  const [editingTodo, setEditingTodo] = useState<ITodo | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // State for delete modal
  const [todoToDelete, setTodoToDelete] = useState<string | null>(null); // State for the todo to delete
  const user = useRef<IUser | null>(null);

  const getTodos = useCallback(async () => {
    const result = await getTodosApi(user.current?.id as string);
    setTodos(result.data as ITodo[]);
  }, []);

  const addTodo = async (title: string, description: string) => {
    const result = await addTodoApi(user.current?.id as string, title, description);

    if (result.status === 201) {
      await getTodos();
      toast.success('Todo added successfully');
    }
  };

  const editTodo = async (todoId: string, title: string, description: string) => {
    const result = await editTodoApi(todoId, title, description);

    if (result.status === 200) {
      await getTodos();
      toast.success('Todo updated successfully');
    }
  };

  const deleteTodo = async (todoId: string) => {
    const result = await deleteTodoApi(todoId);

    if (result.status === 200) {
      await getTodos();
    }
  };

  const handleEdit = (todo: ITodo) => {
    setEditingTodo(todo);
    setOTF(true);
  };

  const handleDelete = (todoId: string) => {
    setTodoToDelete(todoId);
    setOpenDeleteModal(true);
  };

  useEffect(() => {
    const data = sessionStorage.getItem('user');

    if (data) {
      user.current = JSON.parse(data);
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
            <Todo
              key={todo.id}
              todo={todo}
              onEdit={() => handleEdit(todo)}
              onDelete={() => handleDelete(todo.id)} // Pass delete handler
            />
          ))}
        </Box>
      </Page>

      <AddTodo
        open={openTodoForm}
        setOpen={setOTF}
        addTodo={addTodo}
        editTodo={editTodo}
        editingTodo={editingTodo}
        setEditingTodo={setEditingTodo}
      />

      <DeleteTodo open={openDeleteModal} setOpen={setOpenDeleteModal} todoId={todoToDelete} deleteTodo={deleteTodo} />
    </>
  );
};

export default Todos;
