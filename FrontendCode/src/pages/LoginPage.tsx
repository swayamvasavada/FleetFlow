import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface ILoginInput {
  email: string;
  password: string;
  role: string;
}

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInput>({
    defaultValues: {
      email: "",
      password: "",
      role: "driver"
    }
  });

  const onSubmit: SubmitHandler<ILoginInput> = (data) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4 font-['Sora']">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl overflow-visible relative">

        <div className="card-body pt-12">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold tracking-tight">Welcome Back</h1>
            <p className="text-s text-base-content/60 mt-2">Please enter your details to sign in</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

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

            {/* Password Field */}
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-semibold uppercase text-[10px] tracking-wider">Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className={`input input-bordered w-full bg-base-200 focus:input-primary transition-all ${errors.password ? 'input-error' : ''}`}
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <span className="text-[10px] text-error mt-1 ml-1 font-medium">{errors.password.message}</span>
              )}
              <label className="label p-0 mt-1 justify-end">
                <span className="label-text-alt link link-hover text-primary text-[11px]">Forgot password?</span>
              </label>
            </div>

            {/* Login Button */}
            <div className="card-actions mt-4">
              <button type="submit" className="btn btn-primary w-full shadow-lg">
                Login
                <span className="ml-2">→</span>
              </button>
            </div>
          </form>

          <div className="divider text-xs text-base-content/40 uppercase tracking-widest">OR</div>

          <p className="text-sm text-center">
            Don't have an account?
            <button className="link link-primary no-underline hover:underline ml-1 font-semibold">Sign up</button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
