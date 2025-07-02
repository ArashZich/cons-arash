// sections

import ForgotPasswordView from 'src/sections/auth/forgot-password/view/forgot-password-view';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'Forgot Password',
  };
}

export default function ForgotPage() {
  return <ForgotPasswordView />;
}
