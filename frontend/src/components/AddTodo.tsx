import { Button, Dialog, DialogTitle, IconButton, styled, TextField } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';

import * as yup from 'yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    minWidth: '400px',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const schema = yup
  .object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
  })
  .required();

const AddTodo = ({
  open = false,
  setOpen,
  addTodo,
  editTodo,
  editingTodo,
  setEditingTodo,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  addTodo: (title: string, description: string) => Promise<void>;
  editTodo: (todoId: string, title: string, description: string) => Promise<void>;
  editingTodo: { id: string; title: string; description: string } | null;
  setEditingTodo: (todo: null) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (editingTodo) {
      reset({
        title: editingTodo.title,
        description: editingTodo.description,
      });
    } else {
      reset({
        title: '',
        description: '',
      });
    }
  }, [editingTodo, reset]);

  const handleClose = (_event: unknown, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason !== 'backdropClick') {
      setOpen(false);
      setEditingTodo(null); // Clear editing state
    }
  };

  const onSubmit = async ({ title, description }: { title: string; description: string }) => {
    if (editingTodo) {
      await editTodo(editingTodo.id, title, description);
      setEditingTodo(null); // Clear editing state
    } else {
      await addTodo(title, description);
    }

    reset();
    setOpen(false);
  };

  return (
    <BootstrapDialog onClose={handleClose} aria-labelledby="dialog-title" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="dialog-title">
        {editingTodo ? 'Edit Todo' : 'Add Todo'}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => {
          setOpen(false);
          setEditingTodo(null); // Clear editing state
        }}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <TextField
            sx={{ width: '100%' }}
            label="Title"
            {...register('title')}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            sx={{ width: '100%', mt: 2 }}
            label="Description"
            {...register('description')}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained">
            {editingTodo ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </BootstrapDialog>
  );
};

export default AddTodo;
