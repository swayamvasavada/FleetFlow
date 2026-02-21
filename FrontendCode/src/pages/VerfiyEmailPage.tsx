import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';


const VerifyEmailPage: React.FC = () => {
  const { token } = useParams<{ token: string }>(); // Grab token from URL path
  const navigate = useNavigate();
  const { verifyAccount, isLoading, error } = useAuthStore();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');

  useEffect(() => {
    if (token) {
      verifyAccount(token)
        .then(() => setStatus('success'))
        .catch(() => setStatus('error'));
    } else {
      setStatus('error');
    }
  }, [token, verifyAccount]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl text-center">
        <div className="card-body">
          {status === 'verifying' && (
            <>
              <h2 className="text-xl font-bold">Verifying your account...</h2>
              <span className="loading loading-spinner loading-lg mx-auto mt-4"></span>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="text-success text-5xl mb-4">✓</div>
              <h2 className="text-2xl font-bold">Verified!</h2>
              <p>Your email has been confirmed. You can now access the dashboard.</p>
              <button className="btn btn-primary mt-6" onClick={() => navigate('/')}>
                Go to Dashboard
              </button>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="text-error text-5xl mb-4">✕</div>
              <h2 className="text-2xl font-bold">Verification Failed</h2>
              <p className="text-sm text-base-content/70">{error || "The link is invalid or has expired."}</p>
              <button className="btn btn-outline mt-6" onClick={() => navigate('/login')}>
                Back to Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;