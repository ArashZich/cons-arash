import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import { onReject } from './onReject';

const defaultOptions = {
  baseURL: process.env.NEXT_PUBLIC_RECOMMENDER_URL,
};

const recommender = axios.create(defaultOptions);

recommender.interceptors.response.use((response) => response, onReject);

export default recommender;
