/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLogin, type ILoginData } from "@/api/auth";
import { AuthContext } from "@/AuthProvider/AuthContext";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import { useContext } from "react";
import type { FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginForm = () => {
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { setRefetch, refetch } = context;

  const handleSubmit = (data: FieldValues) => {
    const toastId = toast.loading("login...");
    const loginData = data as ILoginData;

    loginMutation.mutate(loginData, {
      onSuccess: (res) => {
        toast.success("Login successful!", { id: toastId });
        localStorage.setItem("access-token", res?.data?.token);
        localStorage.setItem("user", JSON.stringify(res?.data?.user));
        navigate("/");
        setRefetch(!refetch);
      },
      onError: (error: any) => {
        console.log(error);
        toast.error(error?.response?.data?.message || "Login failed", {
          id: toastId,
        });
      },
    });
  };

  return (
    <div className="bg-white/95 p-8 rounded-2xl shadow-xl border">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Login to Your Account
      </h2>

      <MyFormWrapper onSubmit={handleSubmit}>
        <div className="space-y-2">
          <MyFormInput
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
          />

          <MyFormInput
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
          />

          <button
            type="submit"
            className="w-full py-2.5 bg-primary hover:bg-secondary text-white font-medium rounded-lg transition"
          >
            Login
          </button>
        </div>
      </MyFormWrapper>

      <p className="text-center text-sm text-gray-600 mt-4">
        Don’t have an account?{" "}
        <Link
          to="/register"
          className="text-[hsl(215,39%,48%)] font-medium hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
