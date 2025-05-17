"use client";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeaveYourDetails from "@/components/shared/leave-your-details";
export default function PropertyDetails() {
  const amenities = [
    { icon: "/images/icons/cctv.png", name: "CCTV" },
    { icon: "/images/icons/jogging.png", name: "Jogging Track" },
    { icon: "/images/icons/swimming.png", name: "Swimming Pool" },
  ];

  const similarProperties = [
    {
      id: 1,
      title: "The Resident Tower",
      location: "Sector 150, Noida",
      price: "₹ 2.25 Cr*",
      image: "/images/properties/1.png",
      type: "READY TO MOVE",
    },
    {
      id: 2,
      title: "The Prestige Grand Heights",
      location: "Sector 150, Noida",
      price: "₹ 2.25 Cr*",
      image: "/images/properties/2.png",
      type: "UNDER CONSTRUCTION",
    },
    {
      id: 3,
      title: "World Butterfly",
      location: "Sector 150, Noida",
      price: "₹ 2.25 Cr*",
      image: "/images/properties/3.png",
      type: "READY TO MOVE",
    },
    {
      id: 4,
      title: "Metro Life Green",
      location: "Sector 150, Noida",
      price: "₹ 2.25 Cr*",
      image: "/images/properties/1.png",
      type: "UNDER CONSTRUCTION",
    },
  ];

  return (
    <div className="container mx-auto flex flex-col min-h-screen">
      {/* Hero Section with Property Images */}
      <div className="relative w-full h-[400px] md:h-[500px]">
        <div className="grid lg:grid-cols-2 gap-2 h-full">
          <div className="relative">
            <Image
              src="/images/properties/1.png"
              alt="Property Main View"
              fill
              className="object-cover"
            />
            <button className="absolute inset-0 flex items-center justify-center bg-black/30 group hover:bg-black/40 transition-all">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                <Play className="w-6 h-6 text-[#AB213B] ml-1" />
              </div>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 bg-white/90 ">
            {[1, 2, 3, 1].map((i) => (
              <div key={i} className="relative">
                <Image
                  src={`/images/properties/${i}.png`}
                  alt={`Property View ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-semibold">
              Overview of The The Resident Tower
            </h2>
            {/* <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-[#AB213B] border-[#AB213B]"
              >
                READY TO MOVE
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-[#AB213B] border-[#AB213B]"
              >
                RERA APPROVED
              </Button>
            </div> */}
            {/* <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-[#AB213B] border-[#AB213B]"
              >
                READY TO MOVE
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-[#AB213B] border-[#AB213B]"
              >
                RERA APPROVED
              </Button>
            </div> */}
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="border-b w-full justify-start rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger
                value="overview"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#AB213B] data-[state=active]:text-[#AB213B] px-4 py-2 bg-transparent"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="amenities"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#AB213B] data-[state=active]:text-[#AB213B] px-4 py-2 bg-transparent"
              >
                Features & Amenities
              </TabsTrigger>
              <TabsTrigger
                value="pricing"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#AB213B] data-[state=active]:text-[#AB213B] px-4 py-2 bg-transparent"
              >
                Pricing
              </TabsTrigger>
              <TabsTrigger
                value="construction"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#AB213B] data-[state=active]:text-[#AB213B] px-4 py-2 bg-transparent"
              >
                Construction Update
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-2 space-y-4 text-gray-700">
                  <p>
                    Your ultimate destination for luxurious living at "The
                    Resident Tower Sector 150, Noida"!
                  </p>
                  <p>
                    At The Resident Tower, we understand that choosing a home is
                    more than just selecting four walls and a roof. It's about
                    embracing a lifestyle that resonates with your aspirations.
                    Our meticulously designed spaces combine comfort, elegance,
                    and functionality to create homes that inspire and delight.
                  </p>
                  <p>
                    Each apartment is thoughtfully crafted with premium finishes
                    and superior amenities, ensuring that every corner reflects
                    quality and sophistication. From the grand entrance lobby to
                    the private sanctuaries of our residences, every detail has
                    been carefully considered to enhance your living experience.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Project Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status</span>
                        <span>Ready to Move</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type</span>
                        <span>Residential</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location</span>
                        <span>Sector 150, Noida</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Possession</span>
                        <span>Dec 2024</span>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Price Range</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Starting From</span>
                        <span className="text-[#AB213B] font-semibold">
                          ₹ 2.34 Cr*
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Area Range</span>
                        <span>2750 - 3450 Sq.ft</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="amenities" className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-16 h-16 relative mb-2 bg-primary rounded-full p-2 flex items-center justify-center">
                      <Image
                        src={amenity.icon}
                        alt={amenity.name}
                        width={24}
                        height={24}
                        className="object-contain w-10 h-10"
                      />
                    </div>
                    <span className="text-sm font-medium">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="mt-6">
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border px-4 py-2 text-left">Type</th>
                      <th className="border px-4 py-2 text-left">
                        Area (Sq.ft)
                      </th>
                      <th className="border px-4 py-2 text-left">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">2 BHK</td>
                      <td className="border px-4 py-2">2750</td>
                      <td className="border px-4 py-2">₹ 2.34 Cr*</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">3 BHK</td>
                      <td className="border px-4 py-2">2950</td>
                      <td className="border px-4 py-2">₹ 2.42 Cr*</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">4 BHK</td>
                      <td className="border px-4 py-2">3450</td>
                      <td className="border px-4 py-2">₹ 3.1 Cr*</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="construction" className="mt-6">
              <div className="bg-[#AB213B]/10 rounded-lg p-6">
                <h4 className="font-semibold mb-4">March 2024</h4>
                <p className="text-gray-700">
                  Construction is progressing as per schedule. The structural
                  work for towers A and B is complete, and interior work is in
                  progress. The clubhouse facilities are 80% complete.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Similar Properties */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Similar Properties</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProperties.map((property) => (
              <div key={property.id} className="group cursor-pointer">
                <div className="relative h-48 mb-3">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#AB213B] text-white text-xs px-2 py-1 rounded">
                      {property.type}
                    </span>
                  </div>
                </div>
                <h4 className="font-semibold group-hover:text-[#AB213B] transition-colors">
                  {property.title}
                </h4>
                <p className="text-sm text-gray-600">{property.location}</p>
                <p className="text-[#AB213B] font-semibold mt-1">
                  {property.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leave Your Details */}
      <LeaveYourDetails />
    </div>
  );
}
