"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useLogin } from "@/hooks/use-auth";
import { AuthServices } from "@/services/AuthServices";

// Define Zod validation schema
const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

interface LoginFormProps {
  schema: z.ZodType<any, any>;
  defaultValues: LoginFormValues;
  onSubmit: (data: LoginFormValues) => void;
  isPending?: boolean;
  buttonText?: string;
  linkText?: string;
  linkLabel?: string;
  role?: string;
}

export default function LoginForm(loginProps: LoginFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login } = useLogin();

  // react-hook-form
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    mode: "onSubmit",
    defaultValues: { email: "", password: "" },
  });

  // const onSubmit = handleSubmit(async (data) => {
  //   try {
  //     const response = await AuthServices.login(data);
  //     const token = response?.data?.access_token
  //     console.log("token here" , token)
  //     console.log("login respoce here" , response)
  //     if (response.data?.data?.existingUser) {
  //       localStorage.setItem("accessToken",token)
  //       login(response.data?.data.existingUser);
  //       toast.success(response.data?.message)
  //       router.push("/business/agent");
  //     } else {
  //       toast.error(response.data?.message);
  //     }
  //   } catch (error: any) {
  //     const errorMessage = error.response?.data?.message;
  //     toast.error(errorMessage);
  //   }
  // });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await AuthServices.login(data);
      const token = response?.data?.access_token;
      const user = response?.data?.user;

      console.log("token here", token);
      console.log("login response here", response);

      if (user) {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("agentUser",JSON.stringify(user))
        login(user); // <- assuming this is from some context or auth store
        toast.success(response.data?.message);
        router.push("/business/agent");
      } else {
        toast.error(response.data?.message);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  });


  return (
    <form onSubmit={onSubmit} className="py-2">
      <div className="space-y-5">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">
            Log in to MW Realty account
          </h2>
        </div>

        {/* Email Field */}
        <FormField label="Email address" error={errors.email?.message}>
          <Input
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />
        </FormField>

        {/* Password Field */}
        <FormField label="Password" error={errors.password?.message}>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              {...register("password")}
            />
            <TogglePasswordButton
              show={showPassword}
              toggle={() => setShowPassword(!showPassword)}
            />
          </div>
        </FormField>

        {/* Forgot Password */}
        <div className="text-sm text-gray-600">
          <button
            type="button"
            onClick={() => router.push(`/${loginProps.role}/reset-password`)}
            className="secondary-btn"
          >
            Forgot your password?
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full font-semibold mt-8"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Logging in..." : "Log in"}
      </Button>

      {/* Sign Up Link */}
      <div className="text-sm text-gray-600 mt-5">
        Don&apos;t have an account?{" "}
        <Link href={`/${loginProps.role}/signup`} className="secondary-btn">
          {loginProps.linkLabel || "Sign Up"}
        </Link>
      </div>
    </form>
  );
}

/** 🔹 Reusable FormField Component */
function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

/** 🔹 Toggle Password Button Component */
function TogglePasswordButton({
  show,
  toggle,
}: {
  show: boolean;
  toggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={toggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
    >
      {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
    </button>
  );
}
