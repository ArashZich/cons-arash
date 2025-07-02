// sections

import { VerificationView } from 'src/sections/auth/verification/view';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'Phone Verification',
  };
}

export default function VerificationPage() {
  return <VerificationView />;
}
