"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Upload, CheckCircle, Loader2 } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useAddAgent } from "@/hooks/use-agent"
import React from "react"

// Fix RERA field name mismatch
const formSchema = z
  .object({
    fullName: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    mobileNumber: z.string().min(1, "Phone is required"),
    password: z.string().min(6, "Minimum 6 characters"),
    confirmPassword: z.string().min(6, "Minimum 6 characters"),
    emiratesIdNumber: z.string().min(1, "Required"),
    emiratesIdFront: z.string().min(1, "Emirates ID Front is required"),
    emiratesIdBack: z.string().min(1, "Emirates ID Back is required"),
    passport: z.string().optional(),
    visa: z.string().optional(),
    profilePicture: z.string().min(1, "Profile Picture is required"),
    yearsOfExperience: z.string().transform((val) => Number(val) || 0), // Transform string to number with fallback
    agencyId: z.string().optional(),
    reraBrnCertificate: z.string().min(1, "RERA Certificate is required"),
    preferredAreas: z.array(z.string()).min(1, "Select at least one area"),
    city: z.string().min(1, "City is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

// Type for file upload state
type FileUploadState = {
  file: File | null
  url: string
  isUploading: boolean
  preview: string // Add this line
}

// Type for file uploads object
type FileUploads = {
  emiratesIdFront: FileUploadState
  emiratesIdBack: FileUploadState
  passport: FileUploadState
  visa: FileUploadState
  profilePicture: FileUploadState
  reraBrnCertificate: FileUploadState
}

// Type for upload file object
type FileToUpload = {
  file: File
  fieldName: keyof FileUploads
}

export default function AgentRegistrationForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const { mutate: addAgent, isPending } = useAddAgent()

  // For debugging
  const [submitAttempted, setSubmitAttempted] = useState(false)

  // File upload states
  const [fileUploads, setFileUploads] = useState<FileUploads>({
    emiratesIdFront: { file: null, url: "", isUploading: false, preview: "" },
    emiratesIdBack: { file: null, url: "", isUploading: false, preview: "" },
    passport: { file: null, url: "", isUploading: false, preview: "" },
    visa: { file: null, url: "", isUploading: false, preview: "" },
    profilePicture: { file: null, url: "", isUploading: false, preview: "" },
    reraBrnCertificate: { file: null, url: "", isUploading: false, preview: "" },
  })

  React.useEffect(() => {
    // Cleanup function to revoke object URLs when component unmounts
    return () => {
      Object.values(fileUploads).forEach((item) => {
        if (item.preview) {
          URL.revokeObjectURL(item.preview)
        }
      })
    }
  }, [])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobileNumber: "+971 ",
      password: "",
      confirmPassword: "",
      emiratesIdNumber: "",
      emiratesIdFront: "",
      emiratesIdBack: "",
      passport: "",
      visa: "",
      profilePicture: "",
      yearsOfExperience: 0,
      agencyId: "",
      reraBrnCertificate: "",
      preferredAreas: [] as string[],
      city: "",
    },
    mode: "onChange", // This enables real-time validation
  })

  const { control, handleSubmit, setValue, watch, formState } = form

  // Handle file selection
  const handleFileSelect = (fieldName: keyof FileUploads, file: File) => {
    // Create a preview URL for the file
    const previewUrl = URL.createObjectURL(file)

    setFileUploads((prev) => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        file,
        preview: previewUrl,
      },
    }))
  }

  // Add a function to handle removing a file:

  const handleRemoveFile = (fieldName: keyof FileUploads) => {
    // Revoke the object URL to prevent memory leaks
    if (fileUploads[fieldName].preview) {
      URL.revokeObjectURL(fileUploads[fieldName].preview)
    }

    setFileUploads((prev) => ({
      ...prev,
      [fieldName]: {
        file: null,
        url: "",
        isUploading: false,
        preview: "",
      },
    }))

    // Clear the form value
    setValue(fieldName, "", { shouldValidate: true })
  }

  // Upload a single file
  const uploadFile = async (fieldName: keyof FileUploads) => {
    const file = fileUploads[fieldName].file
    if (!file) return null

    try {
      setFileUploads((prev) => ({
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          isUploading: true,
        },
      }))

      const formData = new FormData()
      formData.append("files", file)
      formData.append("type", "IMAGE")

      const response = await fetch("https://api.mightywarnersrealty.com/api/v1/assets/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`)
      }

      const data = await response.json()

      // Extract URL from the response
      const fileUrl = data?.data?.assets?.[0]?.url || ""
      if (!fileUrl) {
        throw new Error("No URL returned from upload")
      }

      // Set the URL in our state and the form
      setFileUploads((prev) => ({
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          url: fileUrl,
          isUploading: false,
          // Keep the preview
        },
      }))

      setValue(fieldName, fileUrl, { shouldValidate: true })
      return fileUrl
    } catch (error) {
      console.error(`Error uploading ${fieldName}:`, error)
      setFileUploads((prev) => ({
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          isUploading: false,
        },
      }))
      return null
    }
  }

  // Function to upload multiple files at once
  const uploadMultipleFiles = async (files: FileToUpload[]) => {
    if (!files || files.length === 0) return []

    try {
      const formData = new FormData()

      files.forEach((fileObj) => {
        if (fileObj?.file instanceof File) {
          formData.append("files", fileObj.file)
        }
      })

      formData.append("type", "IMAGE")

      const response = await fetch("https://api.mightywarnersrealty.com/api/v1/assets/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`)
      }

      const data = await response.json()

      if (!data?.data?.assets || !Array.isArray(data.data.assets)) {
        throw new Error("Invalid response format")
      }

      return data.data.assets
        .map((asset: any, index: number) => ({
          fieldName: files[index]?.fieldName,
          url: asset?.url || "",
        }))
        .filter((item: { fieldName: string; url: string }) => item.fieldName && item.url)
    } catch (error) {
      console.error("Error uploading multiple files:", error)
      return []
    }
  }

  // Add a button to upload all files at once
  const uploadAllFiles = async () => {
    const fileFields: (keyof FileUploads)[] = [
      "emiratesIdFront",
      "emiratesIdBack",
      "passport",
      "visa",
      "profilePicture",
      "reraBrnCertificate",
    ]

    // Prepare files for batch upload
    const filesToUpload: FileToUpload[] = []
    for (const field of fileFields) {
      if (fileUploads[field].file && !fileUploads[field].url) {
        filesToUpload.push({
          file: fileUploads[field].file as File,
          fieldName: field,
        })

        // Mark as uploading
        setFileUploads((prev) => ({
          ...prev,
          [field]: {
            ...prev[field],
            isUploading: true,
          },
        }))
      }
    }

    // Upload all files in a single request if there are any
    if (filesToUpload.length > 0) {
      try {
        const uploadedFiles = await uploadMultipleFiles(filesToUpload)

        // Update form values with URLs
        uploadedFiles.forEach(({ fieldName, url }: { fieldName: keyof FileUploads; url: string }) => {
          if (fieldName && url) {
            setValue(fieldName, url, { shouldValidate: true })

            // Update file upload state
            setFileUploads((prev) => ({
              ...prev,
              [fieldName]: {
                ...prev[fieldName],
                url,
                isUploading: false,
              },
            }))
          }
        })
      } catch (error) {
        console.error("Error uploading files:", error)

        // Reset uploading status on error
        Object.keys(fileUploads).forEach((field) => {
          const key = field as keyof FileUploads;
          setFileUploads((prev) => ({
            ...prev,
            [key]: {
              ...prev[key],
              isUploading: false,
            },
          }))
        })
      }
    }
  }

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Form submitted with data:", data)
    setSubmitAttempted(true)

    try {
      // Check if all required files are uploaded
      const requiredFields: (keyof FileUploads)[] = [
        "emiratesIdFront",
        "emiratesIdBack",
        "profilePicture",
        "reraBrnCertificate",
      ]

      const missingFiles = requiredFields.filter((field) => !fileUploads[field].url)

      if (missingFiles.length > 0) {
        console.error("Missing required files:", missingFiles)
        // Set form errors for missing files
        missingFiles.forEach((field) => {
          form.setError(field, {
            type: "manual",
            message: `${field.replace(/([A-Z])/g, " $1").trim()} is required`,
          })
        })
        return
      }

      // First upload any remaining files
      await uploadAllFiles()

      // Prepare final form data
      const finalFormData = {
        ...data,
        // Use the already transformed number from zod
        yearsOfExperience: data.yearsOfExperience,
        // Only include file URLs
        emiratesIdFront: fileUploads.emiratesIdFront.url,
        emiratesIdBack: fileUploads.emiratesIdBack.url,
        profilePicture: fileUploads.profilePicture.url,
        reraBrnCertificate: fileUploads.reraBrnCertificate.url,
        passport: fileUploads.passport.url || undefined,
        visa: fileUploads.visa.url || undefined,
      }

      console.log("Final submission data:", finalFormData)

      // Send the data to the API
      addAgent(finalFormData)

      // Additional console log to verify submission
      console.log("Form submitted successfully to API")
    } catch (error) {
      console.error("Error during form submission:", error)
    }
  }

  const preferredAreas = ["Jumeirah", "Marina", "Business Bay", "Downtown"]
  const cities = ["Dubai", "Abu Dhabi", "Sharjah"]

  // Function to render file upload field
  const renderFileField = (fieldName: keyof FileUploads, label: string, required = true) => {
    const { file, url, isUploading, preview } = fileUploads[fieldName]
    const fileSelected = !!file
    const uploadComplete = !!url

    return (
      <FormField
        control={control}
        name={fieldName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {label} {required && "*"}
            </FormLabel>
            <div className="space-y-2">
              {(preview || url) && (
                <div className="relative w-24 h-24 mb-2">
                  <img
                    src={url || preview}
                    alt={`${label} preview`}
                    className="w-full h-full object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(fieldName)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              )}
              <div className="flex items-center gap-2">
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        handleFileSelect(fieldName, file)
                      }
                    }}
                    className={uploadComplete ? "border-green-500" : ""}
                  />
                </FormControl>
                {fileSelected && !uploadComplete && (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => uploadFile(fieldName)}
                    disabled={isUploading}
                    className="whitespace-nowrap"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        Upload Now
                        <Upload className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
                {uploadComplete && <CheckCircle className="h-5 w-5 text-green-500" />}
              </div>

              {uploadComplete && (
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> File uploaded successfully
                </p>
              )}
              {url && <input type="hidden" {...field} value={url} />}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit, (errors) => console.log("Form errors:", errors))}
        className="w-full max-w-xl mx-auto p-8 bg-white my-6 border shadow-md rounded-xl space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">MW Agent Registration</h2>

        {/* Upload All Files Button */}
        {Object.values(fileUploads).some((item) => item.file && !item.url) && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
            <p className="text-sm text-blue-700 mb-2">You have files selected that haven't been uploaded yet.</p>
            <Button
              type="button"
              onClick={uploadAllFiles}
              variant="outline"
              className="w-full bg-blue-500 text-white hover:bg-blue-600"
              disabled={Object.values(fileUploads).some((item) => item.isUploading)}
            >
              {Object.values(fileUploads).some((item) => item.isUploading) ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading All Files...
                </>
              ) : (
                <>
                  Upload All Files at Once
                  <Upload className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}

        {/* Full fullName */}
        <FormField
          control={control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name (As per Emirates ID) *</FormLabel>
              <FormControl>
                <Input {...field} placeholder="John Doe" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="example@email.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={control}
          name="mobileNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone *</FormLabel>
              <FormControl>
                <Input {...field} placeholder="+971 5xxxxxxx" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password *</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input {...field} type={showPassword ? "text" : "password"} placeholder="********" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password *</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input {...field} type={showConfirm ? "text" : "password"} placeholder="********" />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Emirates ID Number */}
        <FormField
          control={control}
          name="emiratesIdNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emirates ID Number *</FormLabel>
              <FormControl>
                <Input {...field} placeholder="784-XXXX-XXXXXXX-X" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* File Upload Fields */}
        {renderFileField("emiratesIdFront", "Emirates ID Front", true)}
        {renderFileField("emiratesIdBack", "Emirates ID Back", true)}
        {renderFileField("passport", "Passport", false)}
        {renderFileField("visa", "Visa", false)}
        {renderFileField("profilePicture", "Profile Picture", true)}
        {renderFileField("reraBrnCertificate", "RERA Certificate", true)}

        {/* Experience */}
        <FormField
          control={control}
          name="yearsOfExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience (in years) *</FormLabel>
              <FormControl>
                <Input {...field} type="number" min="0" placeholder="e.g. 3" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Agency ID */}
        <FormField
          control={control}
          name="agencyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agency ID (Optional)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Agency ID" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Preferred Areas */}
        <FormField
          control={control}
          name="preferredAreas"
          render={() => (
            <FormItem>
              <FormLabel>Preferred Areas *</FormLabel>
              <FormControl>
                <div className="grid grid-cols-2 gap-2">
                  {preferredAreas?.map((area) => (
                    <label key={area} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={area}
                        checked={watch("preferredAreas")?.includes(area)}
                        onChange={(e) => {
                          const checked = e.target.checked
                          const current = watch("preferredAreas") || []

                          const newValue = checked ? [...current, area] : current.filter((v) => v !== area)

                          setValue("preferredAreas", newValue, {
                            shouldValidate: true,
                            shouldDirty: true,
                            shouldTouch: true,
                          })

                          console.log("Updated preferredAreas:", newValue)
                        }}
                      />
                      {area}
                    </label>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* City */}
        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City *</FormLabel>
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

        {/* Submit */}
        <Button type="submit" className="w-full">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Register"
          )}
        </Button>

        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link href="/agent/login" className="underline text-primary">
            Login
          </Link>
        </p>
      </form>
    </Form>
  )
}
