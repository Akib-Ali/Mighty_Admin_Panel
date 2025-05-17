import { AuthServices } from "@/services/AuthServices";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useSignUp() {
  const router = useRouter();
  return useMutation({
    mutationFn: AuthServices.signUp, 
    onSuccess: (data) => {
      console.log("Signup successful:", data);
      toast.success("Signup successful!");
      router.push("/login");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.message || "Signup failed!");
    },
  });
}
export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: AuthServices.login, 
    onSuccess: (data) => {
      console.log("login successful:", data);
      toast.success("Login successful!");
      router.push("/");
    },
    onError: (error) => {
      console.error("login error:", error);
      toast.error("Login failed!");
    },
  });
}




