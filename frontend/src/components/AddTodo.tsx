import { Button, Dialog, DialogTitle, IconButton, styled, TextField } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';

import * as yup from 'yup';
import { CSSProperties } from 'react';
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
    title: yup.string().required(),
    description: yup.string().required(),
  })
  .required();

const errorStyles: CSSProperties = {
  color: '#ED2939',
};

const AddTodo = ({
  open = false,
  setOpen,
  addTodo,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  addTodo: (title: string, description: string) => Promise<void>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClose = (_event: unknown, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const onSubmit = async ({ title, description }: { title: string; description: string }) => {
    await addTodo(title, description);

    reset();
    setOpen(false);
  };

  return (
    <BootstrapDialog onClose={handleClose} aria-labelledby="dialog-title" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="dialog-title">
        Add Todo
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => setOpen(false)}
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
          <TextField sx={{ width: '100%' }} label="Title" {...register('title')} />
          <p style={errorStyles}>{errors.title?.message}</p>

          <TextField sx={{ width: '100%' }} label="Description" {...register('description')} />
          <p style={errorStyles}>{errors.description?.message}</p>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </DialogActions>
      </form>
    </BootstrapDialog>
  );
};

export default AddTodo;
