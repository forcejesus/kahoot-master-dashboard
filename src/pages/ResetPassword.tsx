
import { useState } from 'react';
import { AuthBackground } from '@/components/auth/AuthBackground';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import { ResetPasswordSuccess } from '@/components/auth/ResetPasswordSuccess';

export default function ResetPassword() {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSuccess = () => {
    setIsSuccess(true);
  };

  return (
    <AuthBackground>
      {isSuccess ? (
        <ResetPasswordSuccess />
      ) : (
        <ResetPasswordForm onSuccess={handleSuccess} />
      )}
    </AuthBackground>
  );
}
