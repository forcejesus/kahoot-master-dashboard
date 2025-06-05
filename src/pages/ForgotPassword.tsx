
import { useState } from 'react';
import { AuthBackground } from '@/components/auth/AuthBackground';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import { ForgotPasswordSuccess } from '@/components/auth/ForgotPasswordSuccess';

export default function ForgotPassword() {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSuccess = () => {
    setIsSuccess(true);
  };

  return (
    <AuthBackground>
      {isSuccess ? (
        <ForgotPasswordSuccess />
      ) : (
        <ForgotPasswordForm onSuccess={handleSuccess} />
      )}
    </AuthBackground>
  );
}
