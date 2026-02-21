import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface IForgotPasswordInput {
  email: string;
}

const ForgotPasswordPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPasswordInput>({
    defaultValues: {
      email: "",
    }
  });

  const onSubmit: SubmitHandler<IForgotPasswordInput> = (data) => {
    console.log("Reset link requested for:", data.email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4 font-['Sora']">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl overflow-visible relative">
        <div className="card-body pt-10">
          
          {isSubmitted ? (
            /* Success State */
            <div className="text-center py-6 space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="text-6xl">📧</div>
              <h2 className="card-title justify-center text-2xl font-bold">Check your email</h2>
              <p className="text-sm text-base-content/60">
                We've sent a password reset link to your email address.
              </p>
              <div className="card-actions justify-center mt-6">
                <button 
                  className="btn btn-primary btn-outline w-full" 
                  onClick={() => setIsSubmitted(false)}
                >
                  Back to Forgot Password
                </button>
              </div>
            </div>
          ) : (
            /* Request State */
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight">Reset Password</h1>
                <p className="text-sm text-base-content/60 mt-2">
                  Enter your email and we'll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
                <div className="form-control w-full">
                  <label className="label py-1">
                    <span className="label-text font-semibold uppercase text-[10px] tracking-wider">Email Address</span>
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className={`input input-bordered w-full bg-base-200 focus:input-primary transition-all ${errors.email ? 'input-error' : ''}`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                    })}
                  />
                  {errors.email && (
                    <span className="text-[10px] text-error mt-1 ml-1 font-medium">{errors.email.message}</span>
                  )}
                </div>

                {/* Submit Button */}
                <div className="card-actions">
                  <button type="submit" className="btn btn-primary w-full shadow-lg">
                    Send Reset Link
                  </button>
                </div>
              </form>

              <div className="divider mt-8"></div>

              <p className="text-sm text-center">
                Remember your password? 
                <button className="link link-primary no-underline hover:underline ml-1 font-semibold">
                  Back to Login
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;