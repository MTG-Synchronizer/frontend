'use client';

import { useAuth } from '@components/auth/auth-context';

export default function Login() {
  const { signIn } = useAuth();

  return (
    <div>
      <h1>Please sign in to view content</h1>
      <button onClick={signIn}>Sign in with Google</button>
    </div>
  );
}