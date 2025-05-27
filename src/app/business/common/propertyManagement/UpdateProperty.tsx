
"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import LocationSelector from "../../agent/add-property/LocationSelector";
import { addProperty } from "@/services/propertyService";
import { X } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import { useState } from "react";
import { getPropertyById, updatePropertyById } from "@/services/propertyService";
import { useEffect } from "react";

// ✅ Step 1: Define Interface here
interface PropertyFormValues {
    title: string;
    category: string;
    price: number;
    launchPrice: number;
    handOverPrice: number;
    type: string;
    mwBroker: string;
    mwVerified: boolean;
    bedrooms: number;
    bathrooms: number;
    specification: string;
    size: number;
    floor: number;
    zipCode: string;
    city: string;
    country: string;
    reraId: string;
    serviceCharges: string;
    description: string;
    furnishingStatus: string;
    status: string;
    availabilityStatus: string;
    amenities: string[];
    nearBy: {
        [key: string]: string;
    };
    images: string[];
    videos: string[];
}

const UpdatePropertyForm = (props:any) => {
    const { id } = props;
    console.log("id in update property page", id)

    const getUser = localStorage.getItem("agentUser");
    const parsedUser = getUser ? JSON.parse(getUser) : null;
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const res = await getPropertyById(id);
                const property = res.data;

                console.log("data received from get api", res);

                formik.setValues({
                    title: property?.title || "",
                    category: property?.category || "",
                    price: property?.price || 0,
                    launchPrice: property?.launchPrice || 0,
                    handOverPrice: property?.handOverPrice || 0,
                    type: property?.type || "",
                    mwBroker: parsedUser?.id || "",
                    mwVerified: property?.mwVerified || false,
                    bedrooms: property?.bedrooms || 0,
                    bathrooms: property?.bathrooms || 0,
                    specification: property?.specifications || "",
                    size: property?.size || 0,
                    floor: property?.floor || 0,
                    zipCode: property?.zipcode || "",
                    city: property?.city || "",
                    country: property?.country || "",
                    reraId: property?.reraId || "",
                    serviceCharges: property?.serviceCharges || "",
                    description: property?.description || "",
                    furnishingStatus: property?.furnishingStatus || "",
                    status: property?.status || "",
                    availabilityStatus: property?.availabilityStatus || "",
                    amenities: property?.amenities || [],
                    nearBy: {
                        School: property?.nearby?.School || "",
                        Hospital: property?.nearby?.Hospital || "",
                        "Shopping Mall": property?.nearby?.["Shopping Mall"] || "",
                        Park: property?.nearby?.Park || "",
                        "Public Transport": property?.nearby?.["Public Transport"] || "",
                    },
                    images: property?.images || [],
                    videos: property?.videos || [],
                });

            } catch (error) {
                console.error("Failed to fetch property details:", error);
            }
        };

        if (id) {
            fetchProperty();
        }
    }, [id]);


    const formik = useFormik<PropertyFormValues>({
        initialValues: {
            title: "",
            category: "",
            price: 0,
            launchPrice: 0,
            handOverPrice: 0,
            type: "",
            mwBroker: parsedUser?.id || "",
            mwVerified: false,
            bedrooms: 0,
            bathrooms: 0,
            specification: "",
            size: 0,
            floor: 0,
            zipCode: "",
            city: "",
            country: "",
            reraId: "",
            serviceCharges: "",
            description: "",
            furnishingStatus: "",
            status: "",
            availabilityStatus: "",
            amenities: [],
            nearBy: {
                School: "",
                Hospital: "",
                "Shopping Mall": "",
                Park: "",
                "Public Transport": "",
            },
            images: [],
            videos: [],
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Required"),
            category: Yup.string().required("Required"),
            price: Yup.number().required("Required"),
            launchPrice: Yup.number().required("Required"),
            handOverPrice: Yup.number().required("Required"),
            type: Yup.string().required("Required"),
            mwBroker: Yup.string().required("Required"),
            mwVerified: Yup.boolean().required("Required"),
            bedrooms: Yup.number().required("Required"),
            bathrooms: Yup.number().required("Required"),
            specification: Yup.string().required("Required"),
            size: Yup.number().required("Required"),
            floor: Yup.number().required("Required"),
            zipCode: Yup.string().required("Required"),
            city: Yup.string().required("Required"),
            country: Yup.string().required("Required"),
            reraId: Yup.string().required("Required"),
            serviceCharges: Yup.string().required("Required"),
            description: Yup.string().required("Required"),
            status: Yup.string().required("Required"),
            furnishingStatus: Yup.string().required("Required"),
            amenities: Yup.array().of(Yup.string()).min(1, "Min 1 Value is Selected"),
            nearBy: Yup.object().shape({
                School: Yup.string(),
                Hospital: Yup.string(),
                "Shopping Mall": Yup.string(),
                Park: Yup.string(),
                "Public Transport": Yup.string(),
            }),
        }),


        // onSubmit: async (values) => {
        //     setIsSubmitting(true);
        //     try {
        //         const res = await addProperty(values);
        //         console.log("Property added successfully:", res);
        //         toast.success("Property added successfully!");

        //         formik.resetForm();
        //     } catch (err) {
        //         toast.error("Failed to add property. Please try again.");
        //         console.error("Error adding property:", err);
        //     } finally {
        //         setIsSubmitting(false);
        //     }
        // },

        onSubmit: async (values) => {
            setIsSubmitting(true);
            try {
                if (!id) {
                    toast.error("Property ID not found.");
                    return;
                }

                const res = await updatePropertyById(id, values); // ✅ pass id and data
                console.log("Property updated successfully:", res);
                toast.success("Property updated successfully!");
            } catch (err) {
                console.error("Error updating property:", err);
                toast.error("Failed to update property. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        }


    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const uploadedUrls: string[] = [];

        for (const file of Array.from(files)) {
            const formData = new FormData();
            formData.append("files", file);
            formData.append("type", "IMAGE");

            try {
                const response = await fetch("https://api.mightywarnersrealty.com/api/v1/assets/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`Upload failed with status: ${response.status}`);
                }

                const data = await response.json();
                const fileUrl = data?.data?.assets?.[0]?.url || "";

                if (!fileUrl) {
                    throw new Error("No URL returned from upload");
                }

                uploadedUrls.push(fileUrl);
            } catch (error) {
                console.error("Image upload failed:", error);
            }
        }

        // ✅ Append to existing images instead of replacing
        const currentImages = formik.values.images || [];
        formik.setFieldValue("images", [...currentImages, ...uploadedUrls]);
    };


    // video uplaod

    const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const uploadedUrls: string[] = [];

        for (const file of Array.from(files)) {
            const formData = new FormData();
            formData.append("files", file);
            formData.append("type", "VIDEO"); // 👈 Note this line

            try {
                const response = await fetch("https://api.mightywarnersrealty.com/api/v1/assets/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`Upload failed with status: ${response.status}`);
                }

                const data = await response.json();
                const fileUrl = data?.data?.assets?.[0]?.url || "";

                if (!fileUrl) {
                    throw new Error("No URL returned from upload");
                }

                uploadedUrls.push(fileUrl);
            } catch (error) {
                console.error("Video upload failed:", error);
            }
        }

        // ✅ Append to existing videos instead of replacing
        const currentVideos = formik.values.videos || [];
        formik.setFieldValue("videos", [...currentVideos, ...uploadedUrls]);

        console.log("Updated video URLs:", [...currentVideos, ...uploadedUrls]);

    };



    const handleRemoveImage = (indexToRemove: number) => {
        const updatedImages = formik.values.images.filter((_, index) => index !== indexToRemove);
        formik.setFieldValue("images", updatedImages);
    };


    return (

        <>

            <div className="p-4">
                <h1 className="text-xl font-bold mb-4 text-primary">Please Provide Property Detail</h1>
                <form onSubmit={formik.handleSubmit} >
                    <Card className="shadow-md border border-primary">

                        <CardHeader>
                            <div className="flex items-center gap-4">
                                {/* Step 1 */}
                                <div className="flex items-center gap-2">
                                    <span className="bg-gray-200 text-sm rounded-full w-6 h-6 flex items-center justify-center font-semibold">
                                        1
                                    </span>
                                    <span className="font-medium">Details</span>
                                </div>

                                <div className="flex-1 h-px bg-muted mx-2" />

                                {/* Step 2 */}
                                <div className="flex items-center gap-2">
                                    <span className="bg-gray-200 text-sm rounded-full w-6 h-6 flex items-center justify-center font-semibold">
                                        2
                                    </span>
                                    <span className="font-medium">Amenities</span>
                                </div>

                                <div className="flex-1 h-px bg-muted mx-2" />

                                {/* Step 3 */}
                                <div className="flex items-center gap-2">
                                    <span className="bg-gray-200 text-sm rounded-full w-6 h-6 flex items-center justify-center font-semibold">
                                        3
                                    </span>
                                    <span className="font-medium">Upload</span>
                                </div>
                            </div>

                            <CardDescription className="mt-2 text-sm text-muted-foreground">
                                Basic property details
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label>Property Title</Label>
                                    <Input name="title" value={formik.values.title} onChange={formik.handleChange} />
                                    {formik.touched.title && formik.errors.title && <div className="text-red-500 text-sm">{formik.errors.title}</div>}
                                </div>
                                <div>
                                    <Label>Property Category</Label>
                                    <Input name="category" value={formik.values.category} onChange={formik.handleChange} />
                                    {formik.touched.category && formik.errors.category && <div className="text-red-500 text-sm">{formik.errors.category}</div>}
                                </div>

                                <div>
                                    <Label>Price</Label>
                                    <Input type="number" name="price" value={formik.values.price} onChange={formik.handleChange} />
                                    {formik.touched.price && formik.errors.price && <div className="text-red-500 text-sm">{formik.errors.price}</div>}
                                </div>
                                <div>
                                    <Label>Launch Price</Label>
                                    <Input type="number" name="launchPrice" value={formik.values.launchPrice} onChange={formik.handleChange} />
                                    {formik.touched.launchPrice && formik.errors.launchPrice && <div className="text-red-500 text-sm">{formik.errors.launchPrice}</div>}
                                </div>
                                <div>
                                    <Label>Handover Price</Label>
                                    <Input type="number" name="handOverPrice" value={formik.values.handOverPrice} onChange={formik.handleChange} />
                                    {formik.touched.handOverPrice && formik.errors.handOverPrice && <div className="text-red-500 text-sm">{formik.errors.handOverPrice}</div>}
                                </div>

                                <div>
                                    <Label>Property For</Label>
                                    <Select onValueChange={(value) => formik.setFieldValue("type", value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="BUY">Buy</SelectItem>
                                            <SelectItem value="RENT">Rent</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {formik.touched.type && formik.errors.type && <div className="text-red-500 text-sm">{formik.errors.type}</div>}
                                </div>

                                <div>
                                    <Label>MW Verified</Label>
                                    <div className="flex gap-4 mt-1">
                                        <label className="flex items-center gap-1">
                                            <input type="radio" name="mwVerified" value="true" checked={formik.values.mwVerified === true} onChange={() => formik.setFieldValue("mwVerified", true)} />
                                            Yes
                                        </label>
                                        <label className="flex items-center gap-1">
                                            <input type="radio" name="mwVerified" value="false" checked={formik.values.mwVerified === false} onChange={() => formik.setFieldValue("mwVerified", false)} />
                                            No
                                        </label>
                                    </div>
                                    {formik.touched.mwVerified && formik.errors.mwVerified && <div className="text-red-500 text-sm">{formik.errors.mwVerified}</div>}
                                </div>

                                <div>
                                    <Label>Bedroom</Label>
                                    <Input type="number" name="bedrooms" value={formik.values.bedrooms} onChange={formik.handleChange} />
                                    {formik.touched.bedrooms && formik.errors.bedrooms && <div className="text-red-500 text-sm">{formik.errors.bedrooms}</div>}
                                </div>
                                <div>
                                    <Label>Bathroom</Label>
                                    <Input type="number" name="bathrooms" value={formik.values.bathrooms} onChange={formik.handleChange} />
                                    {formik.touched.bathrooms && formik.errors.bathrooms && <div className="text-red-500 text-sm">{formik.errors.bathrooms}</div>}
                                </div>
                                <div>
                                    <Label>Specification</Label>
                                    <Input name="specification" value={formik.values.specification} onChange={formik.handleChange} />
                                    {formik.touched.specification && formik.errors.specification && <div className="text-red-500 text-sm">{formik.errors.specification}</div>}
                                </div>

                                <div>
                                    <Label>Square Foot</Label>
                                    <Input type="number" name="size" value={formik.values.size} onChange={formik.handleChange} />
                                    {formik.touched.size && formik.errors.size && <div className="text-red-500 text-sm">{formik.errors.size}</div>}
                                </div>
                                <div>
                                    <Label>Floor</Label>
                                    <Input type="number" name="floor" value={formik.values.floor} onChange={formik.handleChange} />
                                    {formik.touched.floor && formik.errors.floor && <div className="text-red-500 text-sm">{formik.errors.floor}</div>}
                                </div>

                                <LocationSelector formik={formik} />
                                <div>
                                    <Label>Zip Code</Label>
                                    <Input name="zipCode" value={formik.values.zipCode} onChange={formik.handleChange} />
                                    {formik.touched.zipCode && formik.errors.zipCode && <div className="text-red-500 text-sm">{formik.errors.zipCode}</div>}
                                </div>
                                <div>
                                    <Label>City</Label>
                                    <Input name="city" value={formik.values.city} onChange={formik.handleChange} />
                                    {formik.touched.city && formik.errors.city && <div className="text-red-500 text-sm">{formik.errors.city}</div>}
                                </div>
                                <div>
                                    <Label>Country</Label>
                                    <Input name="country" value={formik.values.country} onChange={formik.handleChange} />
                                    {formik.touched.country && formik.errors.country && <div className="text-red-500 text-sm">{formik.errors.country}</div>}
                                </div>
                            </div>

                            {/* </form> */}
                        </CardContent>
                    </Card>

                    <Card className="mt-6 shadow-md border border-primary">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="bg-gray-200 text-sm rounded-full w-6 h-6 flex items-center justify-center">2</span>
                                Additional Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>RERA ID</Label>
                                <Input name="reraId" onChange={formik.handleChange} />
                                {formik.touched.reraId && formik.errors.reraId && <div className="text-red-500 text-sm">{formik.errors.reraId}</div>}
                            </div>
                            <div>
                                <Label>Service Charge</Label>
                                <Input type="number" name="serviceCharges" onChange={formik.handleChange} />
                                {formik.touched.serviceCharges && formik.errors.serviceCharges && <div className="text-red-500 text-sm">{formik.errors.serviceCharges}</div>}
                            </div>
                            <div className="md:col-span-2">
                                <Label>Property Description</Label>
                                <textarea name="description" onChange={formik.handleChange} className="w-full border rounded p-2" rows={4} />
                                {formik.touched.description && formik.errors.description && <div className="text-red-500 text-sm">{formik.errors.description}</div>}

                            </div>
                        </CardContent>
                    </Card>
                    <Card className="mt-6 shadow-md border border-primary">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="bg-gray-200 text-sm rounded-full w-6 h-6 flex items-center justify-center">3</span>
                                Property Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>Status</Label>
                                <Select onValueChange={(value) => formik.setFieldValue("status", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ACTIVE">Active</SelectItem>
                                        <SelectItem value="INACTIVE">InActive</SelectItem>
                                    </SelectContent>
                                </Select>
                                {formik.touched.status && formik.errors.status && <div className="text-red-500 text-sm">{formik.errors.status}</div>}
                            </div>
                            <div>
                                <Label>Furnishing Status</Label>
                                <Select onValueChange={(value) => formik.setFieldValue("furnishingStatus", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="FURNISHED">Furnshied</SelectItem>
                                        <SelectItem value="UNFURNISHED">Unfurnshied</SelectItem>
                                        <SelectItem value="SEMIFURNISHED">Semi-Furnshied</SelectItem>
                                    </SelectContent>
                                </Select>
                                {formik.touched.furnishingStatus && formik.errors.furnishingStatus && <div className="text-red-500 text-sm">{formik.errors.furnishingStatus}</div>}
                            </div>
                            <div>
                                <Label>Available Status</Label>
                                <Select onValueChange={(value) => formik.setFieldValue("availabilityStatus", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="READY">Ready</SelectItem>
                                        <SelectItem value="OFF_PLAN">Off Plan</SelectItem>
                                        <SelectItem value="UNDER_CONSTRUCTION">Under Construction</SelectItem>
                                        <SelectItem value="COMPLETED">Completed</SelectItem>
                                    </SelectContent>
                                </Select>
                                {formik.touched.availabilityStatus && formik.errors.availabilityStatus && <div className="text-red-500 text-sm">{formik.errors.availabilityStatus}</div>}
                            </div>
                        </CardContent>
                    </Card>

                    {/* 4th */}

                    <Card className="mt-6 shadow-md border border-primary">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="bg-gray-200 text-sm rounded-full w-6 h-6 flex items-center justify-center">4</span>
                                Amenities
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                "Swimming Pool", "Gym", "Garden", "Parking", "Security", "Elevator",
                                "Air Condition", "Heating", "Internet", "Furnished"
                            ].map((item) => (
                                <Label key={item} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="amenities"
                                        value={item}
                                        checked={formik.values.amenities.includes(item)}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            const isChecked = e.target.checked;
                                            const currentAmenities = formik.values.amenities;

                                            if (isChecked) {
                                                formik.setFieldValue("amenities", [...currentAmenities, value]);
                                            } else {
                                                formik.setFieldValue("amenities", currentAmenities.filter((amenity) => amenity !== value));
                                            }
                                        }}
                                        onBlur={() => formik.setFieldTouched("amenities", true)}
                                    />
                                    {item}
                                </Label>
                            ))}
                            {formik.touched.amenities && formik.errors.amenities && (
                                <p className="text-red-500 text-sm col-span-4">{formik.errors.amenities}</p>
                            )}
                        </CardContent>
                    </Card>


                    {/* 5th */}
                    <Card className="mt-6 shadow-md border border-primary">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="bg-gray-200 text-sm rounded-full w-6 h-6 flex items-center justify-center">5</span>
                                Near Places
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {["School", "Hospital", "Shopping Mall", "Park", "Public Transport"].map((place) => (
                                <div key={place}>
                                    <Label>{place}</Label>
                                    <Input
                                        name={`nearBy.${place}`}
                                        value={formik.values.nearBy[place]}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                            ))}
                        </CardContent>
                    </Card>


                    {/* 6th */}
                    <Card className="mt-6 shadow-md border border-primary">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="bg-gray-200 text-sm rounded-full w-6 h-6 flex items-center justify-center">6</span>
                                Media
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label>Upload Images</Label>
                                <Input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />

                                {formik.values.images.length > 0 && (
                                    <div className="flex gap-2 mt-2 flex-wrap">
                                        {formik.values.images.map((img, idx) => (
                                            <div key={idx} className="relative w-20 h-20">
                                                <img
                                                    src={img}
                                                    alt={`uploaded-${idx}`}
                                                    className="w-full h-full object-cover rounded-full border border-gray-300"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveImage(idx)}
                                                    className="absolute top-[-8px] right-[-8px] bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600 transition"
                                                    title="Remove Image"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>


                            {/* video upload */}
                            <div className="mt-4">
                                <Label>Upload Videos</Label>
                                <Input
                                    type="file"
                                    multiple
                                    accept="video/*"
                                    onChange={handleVideoUpload}
                                />

                                {formik.values.videos.length > 0 && (
                                    <div className="flex gap-2 mt-2 flex-wrap">
                                        {formik.values.videos.map((video, idx) => (
                                            <div key={idx} className="relative w-32">
                                                <video
                                                    src={video}
                                                    controls
                                                    className="w-full h-20 rounded border border-gray-300 object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute top-[-8px] right-[-8px] bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600 transition"
                                                    title="Remove Video"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {/* end video upload */}

                        </CardContent>
                    </Card>

                    <div className="flex flex-col md:flex-row justify-end gap-4 mt-8">
                        <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Update Property"}
                        </Button>

                        <Button
                            variant="outline"
                            type="button"
                            className="w-full md:w-auto"
                            onClick={() => formik.resetForm()}
                        >
                            Cancel
                        </Button>

                    </div>
                </form>
            </div>

            <ToastContainer
                position="top-center"
                toastStyle={{ marginTop: '1rem' }}
            />
        </>
    )



}


export default UpdatePropertyForm