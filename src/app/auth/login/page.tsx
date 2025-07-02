// sections

import { LoginView } from 'src/sections/auth/login/view';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'Login',
  };
}

export default function LoginPage() {
  return <LoginView />;
}
