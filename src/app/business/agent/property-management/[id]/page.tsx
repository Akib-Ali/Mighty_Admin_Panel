// const PropertyManagementDetail=()=>{

//     return(

//         <>
//         <h1>Property Management Detail</h1>
//         </>
//     )


// }

// export default PropertyManagementDetail



"use client"; // Important for client-side component

import React, { useState, useEffect } from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MessageSquare } from "lucide-react";
import Image from "next/image";
import PropertySlider from "@/components/bussiness-agent/slider";

const property = {
    title: "Luxury Apartment in Downtown",
    location: "Atque iusto eligendi",
    images: [
        "https://res.cloudinary.com/dfrcmd6uz/image/upload/v1748023961/general/340cca25-c2b8-4b2d-b0f1-d82ed355247f.png",
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D",
    ],
    bedrooms: 3,
    bathrooms: 2,
    size: 1200,
    specifications: "Et cillum molestiae",
    amenities: ["Swimming Pool", "Gym", "Garden"],
    description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

`,
    mapEmbed: "https://www.google.com/maps/embed?...",
};

export default function PropertyDetailPage() {
    //   const [selectedImage, setSelectedImage] = useState(property.images[0]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // Auto-play logic
    useEffect(() => {
        const interval = setInterval(() => {
            setSelectedImageIndex((prevIndex) =>
                (prevIndex + 1) % property.images.length
            );
        }, 3000); // change every 3 seconds

        return () => clearInterval(interval); // cleanup on unmount
    }, []);

    const selectedImage = property.images[selectedImageIndex];


    return (
        <div className="max-w-6xl mx-auto p-4 space-y-6">

            <PropertySlider />


            <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                <Image
                    src={selectedImage}
                    alt="Property Main"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl transition-all duration-500"
                />
                <div className="absolute bottom-0 left-0 bg-black/50 w-full p-4 text-white">
                    <h2 className="text-2xl font-bold">{property.title}</h2>
                    <p className="text-sm">{property.location}</p>
                </div>
            </div>

            {/* Features with Icons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4 text-center">
                        <p className="font-semibold">Bedrooms</p>
                        <p>{property.bedrooms}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 text-center">
                        <p className="font-semibold">Bathrooms</p>
                        <p>{property.bathrooms}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 text-center">
                        <p className="font-semibold">Area (sqft)</p>
                        <p>{property.size}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 text-center">
                        <p className="font-semibold">Specs</p>
                        <p>{property.specifications}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Thumbnails (optional) */}
            <div className="flex gap-2 justify-center">
                {property.images.map((img, index) => (
                    <div
                        key={img}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`w-24 h-16 rounded overflow-hidden cursor-pointer border-2 ${selectedImageIndex === index
                            ? "border-primary"
                            : "border-transparent"
                            }`}
                    >
                        <Image
                            src={img}
                            alt={`Thumbnail ${index}`}
                            width={100}
                            height={100}
                            className="object-cover w-full h-full"
                        />
                    </div>
                ))}
            </div>


            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="status">Status & Activity</TabsTrigger>
                    <TabsTrigger value="media">Media & Documents</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                    <h2 className="text-xl font-semibold mt-4">Description</h2>
                    <p>{property.description}</p>
                    <Separator className="my-4" />
                    <h3 className="font-semibold">Amenities</h3>
                    <ul className="list-disc list-inside">
                        {property.amenities.map((a, i) => (
                            <li key={i}>{a}</li>
                        ))}
                    </ul>
                    <Separator className="my-4" />
                    <h3 className="font-semibold mb-2">Map View</h3>
                    <iframe
                        src={property.mapEmbed}
                        className="w-full h-64 rounded-lg border"
                        loading="lazy"
                        allowFullScreen
                    ></iframe>
                </TabsContent>

                <TabsContent value="status">
                    <p>Status History, Compliance Flag, Validation Logs etc...</p>
                </TabsContent>

                <TabsContent value="media">
                    <h3 className="font-semibold">Images</h3>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        {property.images.map((img, i) => (
                            <Image
                                key={i}
                                src={img}
                                width={200}
                                height={150}
                                className="rounded-md"
                                alt={`Media ${i}`}
                            />
                        ))}
                    </div>
                    <h3 className="font-semibold mt-4">Videos</h3>
                    <video controls className="w-full mt-2 rounded-md">
                        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </TabsContent>
            </Tabs>

            {/* Agent Interaction Card */}
            <Card className="mt-6">
                <CardContent className="p-4">
                    <h2 className="text-lg font-semibold mb-2">Quick Contact</h2>
                    <div className="flex gap-4 mb-4">
                        <Button variant="outline"><Phone className="mr-2 w-4 h-4" /> Call</Button>
                        <Button variant="outline"><Mail className="mr-2 w-4 h-4" /> Email</Button>
                        <Button variant="outline"><MessageSquare className="mr-2 w-4 h-4" /> WhatsApp</Button>
                    </div>
                    <Textarea placeholder="Write a note or internal comment..." />
                    <Button className="mt-2">Send</Button>
                </CardContent>
            </Card>
        </div >
    );
}
