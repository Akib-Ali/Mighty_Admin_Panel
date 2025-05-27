"use client";

import { useState,useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, BadgeCheck, Pencil } from "lucide-react";
import { getUserProflile } from "@/services/AgentUserProfile";

const agentData = {
    id: "dd722bca-5605-448a-b7cd-9244a7fe1eba",
    name: "Anupam Tiwari",
    email: "akib7599@gmail.com",
    phone: "+971501234565",
    role: "AGENT",
    image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDGMp734S91sDuUFqL51_xRTXS15iiRoHew&s",
};

const ManageProfile = () => {
    const [profileImage, setProfileImage] = useState(agentData.image);
    const [isEditable, setIsEditable] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: agentData.name,
            email: agentData.email,
            phone: agentData.phone,
            image: null,
            role:"",
            id:""
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            phone: Yup.string().required("Phone is required"),
            role:Yup.string().required("Role is required")
        }),
        onSubmit: (values) => {
            console.log("Submitted values:", values);
            // API call here
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            formik.setFieldValue("image", file);
            setProfileImage(URL.createObjectURL(file));
        }
    };


    const handleShowUserProfile = async () => {
        try {
            const response = await getUserProflile(); // API call
            console.log("response data in console", response.data);

            if (response?.success) {
                const user = response.data;

                // Set image and form values
                setProfileImage(user.image);
                formik.setValues({
                    name: user.name || "",
                    email: user.email || "",
                    phone: user.phone || "",
                    image: null, 
                    role:user.role || "",
                    id:user.id || ""
                });
            }
        } catch (error) {
            console.error("Error loading profile:", error);
        }
    };

    useEffect(() => {
        handleShowUserProfile();
    }, []);


    return (
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Card: Profile Info */}
                <Card className="shadow-md border border-gray-200">
                    <CardHeader className="flex flex-col items-center">
                        <CardTitle className="text-xl font-semibold">Your Profile</CardTitle>
                    </CardHeader>

                    <CardContent className="flex flex-col items-center text-center space-y-4">
                        <div className="relative group">
                            <Image
                                src={profileImage}
                                alt="Profile"
                                width={100}
                                height={100}
                                className="rounded-full border-4 border-primary shadow-lg object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => setIsEditable(true)}
                                className="absolute bottom-0 right-0 p-1 bg-primary text-white rounded-full hover:scale-105 transition"
                            >
                                <Pencil className="w-4 h-4" />
                            </button>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold">{agentData.name}</h2>
                            <p className="text-sm text-gray-500">{agentData.role}</p>
                        </div>

                        <div className="w-full space-y-3 text-left">
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-primary" />
                                <span className="text-sm text-gray-700">{agentData.email}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-primary" />
                                <span className="text-sm text-gray-700">{agentData.phone}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <BadgeCheck className="w-5 h-5 text-primary" />
                                <span className="text-sm text-gray-700 capitalize">{agentData.role}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Right Card: Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Update Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={formik.handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    disabled={!isEditable}
                                    className="mt-1"
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <p className="text-sm text-red-500">{formik.errors.name}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    disabled={!isEditable}
                                    className="mt-1"
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <p className="text-sm text-red-500">{formik.errors.email}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    disabled={!isEditable}
                                    className="mt-1"
                                />
                                {formik.touched.phone && formik.errors.phone && (
                                    <p className="text-sm text-red-500">{formik.errors.phone}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="image">Profile Image</Label>
                                <Input
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    disabled={!isEditable}
                                    className="mt-1"
                                />
                            </div>

                            <Separator />
                            <Button type="submit" className="w-full" disabled={!isEditable}>
                                Update Profile
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ManageProfile;

