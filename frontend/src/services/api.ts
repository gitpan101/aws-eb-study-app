import { axiosInstance } from './axios-http';

export const login = (email: string, password: string) => {
  return axiosInstance.post('login', {
    email,
    password,
  });
};

export const getTodos = (userId: string) => {
  return axiosInstance.get(`todos/${userId}`);
};

export const addTodoApi = (userId: string, title: string, description: string) => {
  return axiosInstance.post(`todos/${userId}`, {
    title,
    description,
  });
};
