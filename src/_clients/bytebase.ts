import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import { onReject } from './onReject';

const defaultOptions = {
  baseURL: process.env.NEXT_PUBLIC_BYTEBASE_BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
};

const bytebase = axios.create(defaultOptions);

bytebase.interceptors.response.use((response) => response, onReject);

export default bytebase;
