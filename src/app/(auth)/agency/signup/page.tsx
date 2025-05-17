"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

// File schema
const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size > 0, { message: "File is required" });

// Form schema
const formSchema = z.object({
  tradeName: z.string().min(1, "Trade name is required"),
  licenseNumber: z.string().min(1, "License number is required"),
  licenseExpiry: z.string().min(1, "License expiry date is required"),
  tradeLicense: fileSchema,
  emiratesIdOwner: fileSchema.optional(),
  contactPersonName: z.string().min(1, "Contact person name is required"),
  contactPersonEmiratesId: fileSchema,
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Mobile number is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  companyLogo: fileSchema,
  website: z.string().optional(),
});

export default function AgencyRegistrationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tradeName: "",
      licenseNumber: "",
      licenseExpiry: "",
      tradeLicense: undefined,
      emiratesIdOwner: undefined,
      contactPersonName: "",
      contactPersonEmiratesId: undefined,
      email: "",
      phone: "+971 ",
      address: "",
      city: "",
      companyLogo: undefined,
      website: "",
    },
  });

  const { control, handleSubmit, setValue, formState } = form;
  const [isPending, setIsPending] = useState(false);

  const cities = ["Dubai", "Abu Dhabi", "Sharjah"];

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsPending(true);
    console.log("Submitted Data:", data);
    setTimeout(() => {
      setIsPending(false);
      alert("Agency Registered!");
    }, 1500);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xl mx-auto p-8 bg-white my-6 border shadow-md rounded-xl space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">
          Agency Registration
        </h2>

        {/* Text/Date/Email Inputs */}
        {[
          { name: "tradeName", label: "Trade Name (As per License)" },
          { name: "licenseNumber", label: "License Number (DED or other)" },
          { name: "licenseExpiry", label: "License Expiry Date", type: "date" },
          { name: "contactPersonName", label: "Contact Person Name" },
          { name: "email", label: "Email Address", type: "email" },
          { name: "phone", label: "Mobile Number" },
          { name: "address", label: "Company Address" },
          { name: "website", label: "Website (optional)" },
        ].map(({ name, label, type = "text" }) => (
          <FormField
            key={name}
            control={control}
            name={name as keyof z.infer<typeof formSchema>}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input {...field} type={type} placeholder={label} value={field.value as string} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {/* City Dropdown */}
        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* File Upload Fields */}
        {[
          { name: "tradeLicense", label: "Trade License Upload" },
          { name: "emiratesIdOwner", label: "Emirates ID of Owner (optional)" },
          {
            name: "contactPersonEmiratesId",
            label: "Contact Person Emirates ID Upload",
          },
          { name: "companyLogo", label: "Company Logo Upload" },
        ].map(({ name, label }) => (
          <FormField
            key={name}
            control={control}
            name={name as keyof z.infer<typeof formSchema>}
            render={() => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  
                  <Input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || undefined;
                      setValue(name as keyof typeof formSchema._type, file, {
                        shouldValidate: true,
                      });
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          type="submit"
          disabled={isPending || !formState.isValid}
          className="w-full"
        >
          {isPending ? "Registering..." : "Register"}
        </Button>

        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link href="/user/login" className="underline text-primary">
            Login
          </Link>
        </p>
      </form>
    </Form>
  );
}
