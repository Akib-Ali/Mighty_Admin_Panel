"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


// Define Zod validation schema
const ForgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      setIsSubmitting(true);
      // TODO: Implement forgot password API call
      // await AuthServices.forgotPassword(data);
      toast.success("Password reset instructions sent to your email");
      router.push("/login");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Forgot Password</h2>
            <p className="text-sm text-gray-600 mt-2">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
          </div>

          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input 
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Reset Instructions"}
        </Button>

        <div className="text-sm text-center text-gray-600">
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-primary hover:underline"
          >
            Back to Login
          </button>
        </div>
      </form>
    </Form>
  );
}