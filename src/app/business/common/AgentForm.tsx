
// "use client"

// import { Formik, Form, Field, ErrorMessage } from "formik"
// import * as Yup from "yup"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"

// type AgentFormValues = {
//     fullName: string
//     email: string
//     mobileNumber: string
//     password: string
//     emiratesIdNumber: string
//     emiratesIdFront: string
//     emiratesIdBack: string
//     passport: string
//     visa: string
//     profilePicture: string
//     yearsOfExperience: number
//     agencyId: string
//     reraBrnCertificate: string
//     preferredAreas: string[]
//     city: string
// }

// type Props = {
//     initialValues: AgentFormValues
//      handleSubmit: (values: AgentFormValues) => void
//     isEdit?: boolean
// }


// const validationSchema = Yup.object({
//     fullName: Yup.string().required("Required"),
//     email: Yup.string().email().required("Required"),
//     mobileNumber: Yup.string().required("Required"),
//     password: Yup.string().when("isEdit", {
//         is: false,
//         then: () => Yup.string().required("Required"),
//         otherwise: () => Yup.string()
//     }),
//     emiratesIdNumber: Yup.string().required("Required"),
//     emiratesIdFront: Yup.string().url().required("Required"),
//     emiratesIdBack: Yup.string().url().required("Required"),
//     passport: Yup.string().url().required("Required"),
//     visa: Yup.string().url().required("Required"),
//     profilePicture: Yup.string().url().required("Required"),
//     yearsOfExperience: Yup.number().min(0).required("Required"),
//     agencyId: Yup.string().required("Required"),
//     reraBrnCertificate: Yup.string().url().required("Required"),
//     preferredAreas: Yup.array().of(Yup.string()).required("Required"),
//     city: Yup.string().required("Required"),
// })

// export const AgentForm = ({ initialValues, isEdit = false }: Props) => {
//     const handleSubmit=()=>{

//     }
//     return (
//         <div className="space-y-6">

//             <Formik
//                 initialValues={initialValues}
//                 onSubmit={handleSubmit}
//                 validationSchema={validationSchema}
//                 enableReinitialize
//             >
//                 <Form>
//                     <Card className="border border-primary rounded-xl p-6 w-full">
//                         <CardContent className="p-0 space-y-4">
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                     <label>Full Name</label>
//                                     <Field name="fullName" as={Input} />
//                                     <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm" />
//                                 </div>

//                                 <div>
//                                     <label>Email</label>
//                                     <Field name="email" as={Input} />
//                                     <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
//                                 </div>

//                                 <div>
//                                     <label>Mobile Number</label>
//                                     <Field name="mobileNumber" as={Input} />
//                                     <ErrorMessage name="mobileNumber" component="div" className="text-red-500 text-sm" />
//                                 </div>

//                                 {!isEdit && (
//                                     <div>
//                                         <label>Password</label>
//                                         <Field name="password" as={Input} type="password" />
//                                         <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
//                                     </div>
//                                 )}

//                                 <div>
//                                     <label>Emirates ID Number</label>
//                                     <Field name="emiratesIdNumber" as={Input} />
//                                     <ErrorMessage name="emiratesIdNumber" component="div" className="text-red-500 text-sm" />
//                                 </div>

//                                 <div>
//                                     <label>Emirates ID Front URL</label>
//                                     <Field name="emiratesIdFront" as={Input} />
//                                     <ErrorMessage name="emiratesIdFront" component="div" className="text-red-500 text-sm" />
//                                 </div>

//                                 <div>
//                                     <label>Emirates ID Back URL</label>
//                                     <Field name="emiratesIdBack" as={Input} />
//                                     <ErrorMessage name="emiratesIdBack" component="div" className="text-red-500 text-sm" />
//                                 </div>

//                                 <div>
//                                     <label>Passport URL</label>
//                                     <Field name="passport" as={Input} />
//                                     <ErrorMessage name="passport" component="div" className="text-red-500 text-sm" />
//                                 </div>

//                                 <div>
//                                     <label>Visa URL</label>
//                                     <Field name="visa" as={Input} />
//                                     <ErrorMessage name="visa" component="div" className="text-red-500 text-sm" />
//                                 </div>

//                                 <div>
//                                     <label>Profile Picture URL</label>
//                                     <Field name="profilePicture" as={Input} />
//                                     <ErrorMessage name="profilePicture" component="div" className="text-red-500 text-sm" />
//                                 </div>

//                                 <div>
//                                     <label>Years of Experience</label>
//                                     <Field name="yearsOfExperience" type="number" as={Input} />
//                                     <ErrorMessage name="yearsOfExperience" component="div" className="text-red-500 text-sm" />
//                                 </div>

//                                 <div>
//                                     <label>Agency ID</label>
//                                     <Field name="agencyId" as={Input} />
//                                     <ErrorMessage name="agencyId" component="div" className="text-red-500 text-sm" />
//                                 </div>

//                                 <div>
//                                     <label>RERA BRN Certificate URL</label>
//                                     <Field name="reraBrnCertificate" as={Input} />
//                                     <ErrorMessage name="reraBrnCertificate" component="div" className="text-red-500 text-sm" />
//                                 </div>

//                                 <div className="col-span-2">
//                                     <label>Preferred Areas (comma separated)</label>
//                                     <Field name="preferredAreas">
//                                         {({ field, form }: any) => (
//                                             <Input
//                                                 {...field}
//                                                 onChange={(e) =>
//                                                     form.setFieldValue("preferredAreas", e.target.value.split(",").map((a: string) => a.trim()))
//                                                 }
//                                                 value={field.value.join(", ")}
//                                             />
//                                         )}
//                                     </Field>
//                                     <ErrorMessage name="preferredAreas" component="div" className="text-red-500 text-sm" />
//                                 </div>

//                                 <div className="col-span-2">
//                                     <label>City</label>
//                                     <Field name="city" as={Input} />
//                                     <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />
//                                 </div>
//                             </div>

//                         </CardContent>
//                     </Card>
//                 </Form>
//             </Formik>


//             <div className="flex justify-end gap-4">
//                 <Button variant="outline" onClick={() => router.push("/agents")}>
//                     Cancel
//                 </Button>
//                 <Button type="submit" form="agent-form">
//                     {isEdit ? "Update Agent" : "Add Agent"}
//                 </Button>
//             </div>

//         </div>
//     )
// }
