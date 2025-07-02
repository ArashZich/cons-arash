// sections

import { ResetPasswordView } from 'src/sections/auth/reset-password/view';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'Reset Password',
  };
}

export default function ForgotPage() {
  return <ResetPasswordView />;
}
