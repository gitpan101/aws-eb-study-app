import { CSSProperties } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Page from '../components/Page';
import { login } from '../services/api';
import { useNavigate } from 'react-router';

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

const errorStyles: CSSProperties = {
  color: '#ED2939',
};

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData: { email: string; password: string }) => {
    const { status, data } = await login(formData.email, formData.password);
    const responseData = data as {
      message: string;
      user: unknown;
      token: string;
    };

    if (status === 200) {
      sessionStorage.setItem('auth-token', responseData.token);
      sessionStorage.setItem('user', JSON.stringify(responseData.user));

      navigate('/todos');
    }
  };

  return (
    <Page
      addonStyles={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '100px',
      }}
    >
      <Card variant="outlined" className="d-flex" sx={{ width: '100%', maxWidth: '400px', alignItems: 'center' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Login
            </Typography>

            <TextField sx={{ width: '100%' }} label="Email" {...register('email')} />
            <p style={errorStyles}>{errors.email?.message}</p>

            <TextField sx={{ width: '100%' }} type="password" label="Password" {...register('password')} />
            <p style={errorStyles}>{errors.password?.message}</p>

            <Button type="submit" variant="contained" sx={{ mt: 1 }}>
              Login
            </Button>
          </CardContent>
        </form>
      </Card>
    </Page>
  );
};

export default Login;
