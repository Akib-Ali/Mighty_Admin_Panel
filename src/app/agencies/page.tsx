"use client";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LeaveYourDetails from "@/components/shared/leave-your-details";

export default function AgenciesPage() {
  const agencies = [
    {
      id: 1,
      name: "4s Homes Real Estate",
      totalProperties: 45,
      serviceArea:
        "mohammad Bin rashid city,meydan city,jumeirah village circle (jvc)",
      image: "/images/agencies/3.png",
    },
    // Repeat for other agencies
    ...Array(8)
      .fill(null)
      .map((_, index) => ({
        id: index + 2,
        name: "4s Homes Real Estate",
        totalProperties: 45,
        serviceArea:
          "mohammad Bin rashid city,meydan city,jumeirah village circle (jvc)",
        image: "/images/agencies/3.png",
      })),
  ];

  return (
    <div className="container mx-auto flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-[400px]">
        <Image
          src="/images/agencies/1.png"
          alt="Real Estate Agencies"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="container text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Turning Dreams into Addresses
            </h1>
            <div className="flex items-center justify-center gap-2 text-lg">
              <Link href="/" className="hover:text-light">
                HOME
              </Link>
              <span>»</span>
              <span className="">Agencies</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Buy/Residential" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buy">Buy/Residential</SelectItem>
                <SelectItem value="rent">Rent</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <Input
                type="text"
                placeholder="Enter Location"
                className="pl-10"
              />
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>

            <Input type="text" placeholder="Agency Name" />

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Enter Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="arabic">Arabic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4">
            <Button className="bg-[#AB213B] hover:bg-[#AB213B]/90 text-white px-8">
              Find
            </Button>
          </div>
        </div>
      </div>

      {/* Agencies Section */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-[#0B3558]">
                MW Realty
              </h2>
              <p className="text-gray-600">Showing 1 - 12 of 5,375 agencies</p>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="border-[#AB213B] text-[#AB213B]"
              >
                Dubai
              </Button>
              <Button variant="outline" className="border-gray-300">
                Abu Dhabi
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agencies.map((agency) => (
              <div
                key={agency.id}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <Link href={`/agencies/${agency.id}`} className="flex items-start gap-4">
                  <div className="relative w-32 h-32">
                    <Image
                      src={agency.image}
                      alt={agency.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{agency.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {agency.totalProperties} Properties
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Service Area: {agency.serviceArea}
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              className="text-[#AB213B] border-[#AB213B]"
            >
              View All
            </Button>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <LeaveYourDetails />
    </div>
  );
}
