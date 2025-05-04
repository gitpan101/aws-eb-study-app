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
  baseURL: 'http://localhost:5000/api/',
});

axiosInstance.interceptors.request.use((config: Axios.AxiosXHRConfig<unknown>) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer token`,
  };

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    const { data } = response;
    const responseData = data as {
      message: string;
    };

    toast.success(responseData.message);
    return response;
  },
  (error: { response: IErrorResponse }) => {
    console.log('Error response:', error.response);
    toast.error(error.response.data.message);

    return error;
  }
);
