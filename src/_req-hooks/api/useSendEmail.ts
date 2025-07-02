// hooks/useSendEmail.ts
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface EmailFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone_number: string;
}

const useSendEmail = () =>
  useMutation(async (formData: EmailFormData) => {
    // Using Axios to make the POST request
    const response = await axios.post('/api/sendEmail', formData);

    // Axios automatically returns the response data, so you don't need to manually parse JSON
    return response.data;
  });

export default useSendEmail;
