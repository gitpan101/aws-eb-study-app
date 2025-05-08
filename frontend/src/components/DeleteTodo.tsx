import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { toast } from 'react-toastify';

const DeleteTodo = ({
  open,
  setOpen,
  todoId,
  deleteTodo,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  todoId: string | null;
  deleteTodo: (todoId: string) => Promise<void>;
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    if (todoId) {
      try {
        await deleteTodo(todoId);
        toast.success('Todo deleted successfully');
      } catch (error) {
        console.error('Error deleting todo:', error);
        toast.error('Failed to delete todo');
      } finally {
        setOpen(false);
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Todo</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this todo?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTodo;
