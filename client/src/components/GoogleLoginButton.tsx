// src/components/GoogleLoginButton.tsx
import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { APP_ENV } from '../env';

interface Props {
  onSuccess: (token: string) => void;
}

const GoogleLoginButton: React.FC<Props> = ({ onSuccess }) => {
  const clientId = APP_ENV.GOOGLE_AUTH_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={credentialResponse => {
          if (credentialResponse.credential) {
            onSuccess(credentialResponse.credential);
          }
        }}
        onError={() => {
          console.error('Ошибка входа через Google');
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
