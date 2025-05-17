"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

// ---------- Types ----------
export type FieldType = "text" | "email" | "password" | "phone";

export type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
};

type Props = {
  schema: z.ZodType<any>;
  defaultValues: Record<string, any>;
  fields: FieldConfig[];
  title?: string;
  onSubmit: (data: any) => void;
  isPending?: boolean;
  buttonText?: string;
  linkText: string;
};

// ---------- Component ----------
export const SignupForm = ({
  schema,
  defaultValues,
  fields,
  title = "Sign Up",
  onSubmit,
  isPending = false,
  buttonText = "Submit",
  linkText,
}: Props) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  });

  const { control, handleSubmit, setValue, formState } = form;
  const { isValid } = formState;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md mx-auto p-10 space-y-4 bg-white rounded-2xl shadow-md"
      >
        {title && (
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            {title}
          </h2>
        )}

        {fields.map((field) => {
          //  Phone input with country code
          if (field.type === "phone") {
            return (
              <FormField
                key={field.name}
                control={control}
                name={field.name}
                render={({ field: f }) => {
                  const [code, number] = f.value?.split(" ") || ["+91", ""];
                  return (
                    <FormItem>
                      <FormLabel>{field.label}</FormLabel>
                      <FormControl>
                        <div className="flex gap-2">
                          <Select
                            value={code}
                            onValueChange={(value) =>
                              setValue(field.name, `${value} ${number}`, {
                                shouldValidate: true,
                              })
                            }
                          >
                            <SelectTrigger className="w-24">
                              <SelectValue placeholder="Code" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="+91">+91</SelectItem>
                              <SelectItem value="+971">+971</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            placeholder="Phone number"
                            type="tel"
                            value={number}
                            onChange={(e) =>
                              setValue(
                                field.name,
                                `${code} ${e.target.value}`,
                                { shouldValidate: true }
                              )
                            }
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            );
          }

          //  Password or Confirm Password with toggle visibility
          if (field.name === "password" || field.name === "confirmPassword") {
            const toggle =
              field.name === "password" ? showPassword : showConfirm;
            const setToggle =
              field.name === "password" ? setShowPassword : setShowConfirm;

            return (
              <FormField
                key={field.name}
                control={control}
                name={field.name}
                render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...f}
                          placeholder={field.placeholder}
                          type={toggle ? "text" : "password"}
                        />
                        <button
                          type="button"
                          onClick={() => setToggle(!toggle)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {toggle ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          }

          //  Standard fields (text, email, etc.)
          return (
            <FormField
              key={field.name}
              control={control}
              name={field.name}
              render={({ field: f }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    <Input
                      {...f}
                      type={field.type}
                      placeholder={field.placeholder}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}

        {/*  Submit Button */}
        <Button
          type="submit"
          className="w-full font-semibold"
          disabled={!isValid || isPending}
        >
          {isPending ? "Processing..." : buttonText}
        </Button>
        {/* login Up Link */}
        <div className="text-sm text-gray-600 mt-5">
          Do have already account?{" "}
          <Link href={linkText} className="secondary-btn">
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
};
