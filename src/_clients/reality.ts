import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import { onReject } from './onReject';

const defaultOptions = {
  baseURL: process.env.NEXT_PUBLIC_REALITY_BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
};

const reality = axios.create(defaultOptions);

// Add a response interceptor
reality.interceptors.response.use((response) => response, onReject);

export default reality;

export const realityNoRefresh = axios.create(defaultOptions);
realityNoRefresh.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || {
        message: 'خطایی در ارتباط با سرور رخ داد',
      }
    )
);
