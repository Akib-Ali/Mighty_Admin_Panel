"use client";

import React from "react";
import { z } from "zod";
import LoginForm from "../../_components/login-form";

// Zod schema for form validation
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Type inferred from schema
type LoginFormData = z.infer<typeof loginSchema>;

const defaultValues: LoginFormData = {
  email: "",
  password: "",
};

const LoginPage: React.FC = () => {
  const [isPending, setIsPending] = React.useState(false);

  const handleLogin = async (data: LoginFormData) => {
    setIsPending(true);
    try {
      console.log("Submitted data:", data);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <div className="lg:w-1/3 border p-8 rounded-lg shadow-lg mx-4 lg:mx-auto">
        <LoginForm
          schema={loginSchema}
          defaultValues={defaultValues}
          onSubmit={handleLogin}
          isPending={isPending}
          buttonText="Sign In"
          linkText="Don't have an account?"
          linkLabel="Sign Up"
          role="agent"
        />
      </div>
    </div>
  );
};

export default LoginPage;
