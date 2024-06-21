import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/components/firebase';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;

  return user ? children : null;
};

export default ProtectedRoute;
