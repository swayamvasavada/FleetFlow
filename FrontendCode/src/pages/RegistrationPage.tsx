import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface IFormInput {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();

  // 1. Pull actions and state from your Zustand store
  const { signup, isLoading, error: apiError, resetError } = useAuthStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      role: "",
    },
  });

  useEffect(() => {
    return () => {
      if (resetError) resetError();
    };
  }, [resetError]);

  // 2. Map form data to your API body requirements
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const payload = {
      email: data.email,
      name: data.fullName,
      phoneNo: Number(data.phone),
      password: data.password,
      role: `ROLE_${data.role.toUpperCase()}`,
    };

    // 3. Execute signup and clear error/reset form on success
    const success: any = await signup(payload);
    
    if (success) {
      if (resetError) resetError(); // Clear any existing error
      reset(); // Clear the form fields
      navigate("/login"); // Redirect the user
    }
  };

  // ... fields array remains the same ...
  const fields: any[] = [
    {
      id: "fullName",
      label: "Full Name",
      type: "text",
      placeholder: "John Doe",
      validation: { required: "Name is required" },
    },
    {
      id: "email",
      label: "Email Address",
      type: "email",
      placeholder: "john@example.com",
      validation: { required: "Email is required" },
    },
    {
      id: "phone",
      label: "Phone Number",
      type: "tel",
      placeholder: "9876543210",
      validation: { required: "Phone is required" },
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "••••••••",
      validation: { required: "Password required" },
    },
    {
      id: "role",
      label: "Role",
      type: "select",
      placeholder: "Select your role",
      options: ["MANAGER", "DISPATCHER", "DRIVER"],
      validation: { required: "Role is required" },
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold mb-4">
            Create Account
          </h2>

          {/* 3. Display API Errors if they exist */}
          {apiError && (
            <div className="alert alert-error shadow-sm mb-4 py-2">
              <span className="text-sm">{apiError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {fields.map((f) => (
              <div key={f.id} className="form-control w-full">
                <label className="label py-1">
                  <span className="label-text font-semibold uppercase text-[10px] tracking-wider">
                    {f.label}
                  </span>
                </label>

                {f.type === "select" ? (
                  <select
                    className={`select select-bordered w-full bg-base-200 ${errors[f.id] ? "select-error" : ""}`}
                    {...register(f.id, f.validation)}
                    disabled={isLoading}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      {f.placeholder}
                    </option>
                    {f.options?.map((opt: string) => (
                      <option key={opt} value={opt}>
                        {opt.toUpperCase()}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    className={`input input-bordered w-full bg-base-200 ${errors[f.id] ? "input-error" : ""}`}
                    {...register(f.id, f.validation)}
                    disabled={isLoading}
                  />
                )}
                {errors[f.id] && (
                  <span className="text-error text-xs mt-1">
                    {errors[f.id]?.message as string}
                  </span>
                )}
              </div>
            ))}

            <div className="card-actions mt-6">
              {/* 4. Disable button and show loading state */}
              <button
                type="submit"
                className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register"}
                {!isLoading && <span className="ml-2">→</span>}
              </button>
            </div>
          </form>

          <div className="divider text-xs text-base-content/40">OR</div>

          <p className="text-sm text-center">
            Already have an account?
            <button
              className="link link-primary ml-1 font-semibold"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
