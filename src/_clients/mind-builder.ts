import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import { onReject } from './onReject';

const defaultOptions = {
  // baseURL: 'https://mind-builder.armogroup.tech',
  baseURL: process.env.NEXT_PUBLIC_MIND_BUILDER_BASE_URL,
};

const mindBuilder = axios.create(defaultOptions);

mindBuilder.interceptors.response.use((response) => response, onReject);

export default mindBuilder;
