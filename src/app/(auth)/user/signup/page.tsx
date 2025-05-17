"use client";
import { z } from "zod";
import { SignupForm } from "../../_components/signup-form";
import { useSignUp } from "@/hooks/use-auth";

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  agencyId: z.string().optional(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

const defaultValues = {
  name: "",
  email: "",
  phone: "+91 ",
  // agencyId: "",
  password: "",
  confirmPassword: "",
};

const fields: FieldConfig[] = [
  { name: "name", label: "Full Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone Number", type: "phone" },
  // { name: "agencyId", label: "Agency ID", type: "text" },
  { name: "password", label: "Password", type: "password" },
  { name: "confirmPassword", label: "Confirm Password", type: "password" },
];

type FieldType = "text" | "email" | "password" | "phone";

type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
};



export default function RegisterPage() {

  const { mutate, isPending} = useSignUp();

const handleRegister = (data: any) => {
  mutate(data);

  console.log("Submitted data:", data);
};
  return (
    <div className=" flex items-center justify-center bg-gray-100 p-4">
      <SignupForm
        schema={registerSchema}
        defaultValues={defaultValues}
        fields={fields}
        title="Create MW Realty account"
        onSubmit={handleRegister}
        isPending={isPending}
        buttonText="Register"
        linkText="/user/login"
      />
    </div>
  );
}
