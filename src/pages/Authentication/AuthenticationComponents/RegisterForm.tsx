/* eslint-disable @typescript-eslint/no-explicit-any */
import MyFormWrapper from "@/components/form/MyFormWrapper";
import MyFormInput from "@/components/form/MyFormInput";
import type { FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRegister, type IRegisterData } from "@/api/auth";

const RegisterForm = () => {
  const registerMutation = useRegister();
  const navigate = useNavigate();

  const handleSubmit = (data: FieldValues) => {
    const toastId = toast.loading("Registering...");

    const registerData = data as IRegisterData;

    registerMutation.mutate(registerData, {
      onSuccess: () => {
        toast.success("Register successfully!", { id: toastId });
        navigate("/login");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Register failed", {
          id: toastId,
        });
      },
    });
  };

  return (
    <div className="bg-white w-full max-w-md rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Create an Account
      </h2>

      <MyFormWrapper onSubmit={handleSubmit}>
        <div className="space-y-2">
          <MyFormInput
            name="fullName"
            label="Full Name"
            placeholder="Enter your full name"
          />
          <MyFormInput
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
          />
          <MyFormInput
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-primary hover:bg-secondary text-white font-medium rounded-lg transition"
        >
          Register
        </button>
      </MyFormWrapper>

      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-[hsl(215,39%,48%)] font-medium hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
