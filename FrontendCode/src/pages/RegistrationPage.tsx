import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';


interface IFormInput {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    role: string;
}

type FormField = {
    id: keyof IFormInput;
    label: string;
    type: string;
    placeholder: string;
    validation: any;
    options?: any;
};

const RegistrationPage: React.FC = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm<IFormInput>({
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            password: "",
            role: ""
        }
    });

    const fields: FormField[] = [
        {
            id: "fullName",
            label: "Full Name",
            type: "text",
            placeholder: "John Doe",
            validation: { required: "Name is required" }
        },
        {
            id: "email",
            label: "Email Address",
            type: "email",
            placeholder: "john@example.com",
            validation: {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Valid email required" }
            }
        },
        {
            id: "phone",
            label: "Phone Number",
            type: "tel",
            placeholder: "+91 98765 43210",
            validation: { required: "Phone is required", minLength: { value: 7, message: "Min 7 digits" } }
        },
        {
            id: "password",
            label: "Password",
            type: "password",
            placeholder: "••••••••",
            validation: { required: "Password required", minLength: { value: 6, message: "Min 6 characters" } }
        },
        {
            id: "role",
            label: "Role",
            type: "select",
            placeholder: "Select your role",
            options: ["manager", "dispatcher", "driver"],
            validation: { required: "Role is required" }
        }
    ];

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log("Form Data:", data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-4 font-['Sora']">

            {/* DaisyUI Card Component */}
            <div className="card w-full max-w-md bg-base-100 shadow-2xl overflow-visible">
                <div className="card-body">

                    {isSubmitSuccessful ? (
                        <div className="text-center py-6 space-y-4 animate-in fade-in zoom-in duration-300">
                            <h2 className="card-title justify-center text-2xl font-bold">Registration Completed succesfully!</h2>
                            <p className="text-base-content text-green-500">We have sended a confirmation email to your gmail ? please confirm </p>

                        </div>
                    ) : (
                        <>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                                {fields.map((f, i) => (
                                    <div key={f.id}
                                        className="form-control w-full opacity-0 animate-[slideIn_0.4s_ease-out_forwards]"
                                        style={{ animationDelay: `${i * 100}ms` }}>
                                        <label className="label py-1">
                                            <span className="label-text font-semibold uppercase text-[10px] tracking-wider">{f.label}</span>
                                        </label>

                                        {f.type === "select" ? (
                                            <select
                                                className={`select select-bordered w-full bg-base-200 focus:select-primary transition-all duration-200 ${errors[f.id] ? 'select-error' : ''}`}
                                                {...register(f.id, f.validation)}
                                                defaultValue=""
                                            >
                                                <option value="" disabled>{f.placeholder}</option>
                                                {f.options?.map((opt : any) => (
                                                    <option key={opt} value={opt}>
                                                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                type={f.type}
                                                placeholder={f.placeholder}
                                                className={`input input-bordered w-full bg-base-200 focus:input-primary transition-all duration-200 ${errors[f.id] ? 'input-error' : ''}`}
                                                {...register(f.id, f.validation)}
                                            />
                                        )}

                                        {errors[f.id] && (
                                            <label className="label py-0 mt-1">
                                                <span className="label-text-alt text-error font-medium">{errors[f.id]?.message as string}</span>
                                            </label>
                                        )}
                                    </div>
                                ))}

                                <div className="card-actions mt-6">
                                    <button type="submit" className="btn btn-primary w-full shadow-lg">
                                        Register
                                        <span className="ml-2">→</span>
                                    </button>
                                </div>
                            </form>

                            <div className="divider text-xs text-base-content/40 uppercase tracking-widest">OR</div>

                            <p className="text-sm text-center">
                                Already have an account?
                                <button className="link link-primary no-underline hover:underline ml-1 font-semibold">Sign in</button>
                            </p>
                        </>
                    )}
                </div>
            </div>

            {/* Injected Keyframes */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}} />
        </div>
    );
}

export default RegistrationPage;