import axios from 'axios';
import { ErrorResponse } from 'react-router';
import { toast } from 'react-toastify';

interface IResponseData {
  message: string;
}

interface IErrorResponse extends ErrorResponse {
  data: IResponseData;
}

export const axiosInstance = axios.create({
  baseURL: 'http://todo-app-dev.ap-south-1.elasticbeanstalk.com/api/',
});

axiosInstance.interceptors.request.use((config: Axios.AxiosXHRConfig<unknown>) => {
  if (!config.url.includes('login')) {
    const token = sessionStorage.getItem('auth-token');

    if (!token) window.location.href = '/login';

    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    const { data } = response;
    const responseData = data as {
      message?: string;
    };

    if (responseData.message) toast.success(responseData.message);

    return response;
  },
  (error: { response: IErrorResponse }) => {
    console.log('Error response:', error.response);
    toast.error(error.response.data.message);

    if (['Token has expired', 'Token is invalid'].includes(error.response.data.message)) {
      window.location.href = '/login';
    }

    return error;
  }
);
