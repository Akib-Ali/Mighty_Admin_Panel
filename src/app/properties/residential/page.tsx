"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import ContactForm from "@/components/shared/contact-form";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import LeaveYourDetails from "@/components/shared/leave-your-details";
import Image from "next/image";

const PropertyCard = ({ property }: { property: any }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={property.image}
          alt={property.name || "Property"}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-[#AB213B] text-white text-xs rounded-md">
            {property.status}
          </span>
        </div>
        
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg truncate">{property.name}</h3>
        <div className="flex items-center text-gray-500 text-sm mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="truncate">{property.location}</span>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
          <div className="flex flex-col items-center border-r">
            <span className="text-gray-500">Area</span>
            <span className="font-medium">{property.area}</span>
          </div>
          <div className="flex flex-col items-center border-r">
            <span className="text-gray-500">BHK</span>
            <span className="font-medium">{property.bhk}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-500">Status</span>
            <span className="font-medium">{property.possession}</span>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="text-[#AB213B] font-bold">₹ {property.price} Cr</div>
          <Link
            href={`/property/${property.id}`}
            className="text-sm text-white bg-[#AB213B] hover:bg-[#96192F] px-3 py-1 rounded"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function ResidentialPage() {
  const [areaRange, setAreaRange] = useState([20, 200]);
  const [priceRange, setPriceRange] = useState([20, 200]);

  // Mock properties data
  const properties = [
    {
      id: 1,
      name: "The Resident Tower",
      location: "Sector 160, Noida",
      area: "3000 sq.ft",
      bhk: "3 BHK",
      price: "2.28",
      image: "/images/demo/residential/1.png",
      status: "Ongoing",
      possession: "Ready",
      featured: true,
    },
    {
      id: 2,
      name: "The Prateek Canary Duplex",
      location: "Sector 150, Noida",
      area: "3550 sq.ft",
      bhk: "4 BHK",
      price: "2.27",
      image: "/images/demo/residential/2.png",
      status: "Ongoing",
      possession: "2025",
      featured: false,
    },
    {
      id: 3,
      name: "The Kalpataruv Vista",
      location: "Sector 145, Noida",
      area: "2700 sq.ft",
      bhk: "4 BHK",
      price: "3.02",
      image: "/images/demo/residential/3.png",
      status: "Ongoing",
      possession: "2026",
      featured: true,
    },
    {
      id: 4,
      name: "Eldeco Live Green",
      location: "Sector 150, Noida",
      area: "3600 sq.ft",
      bhk: "3 BHK",
      price: "2.08",
      image: "/images/demo/residential/4.png",
      status: "Ongoing",
      possession: "Ready",
      featured: false,
    },
    {
      id: 5,
      name: "Godrej Nature",
      location: "Sector 132, Noida",
      area: "3500 sq.ft",
      bhk: "3 BHK",
      price: "1.23",
      image: "/images/demo/residential/1.png",
      status: "Ongoing",
      possession: "2024",
      featured: true,
    },
    {
      id: 6,
      name: "Homekraft Pious Hideaways",
      location: "Sector 151, Noida",
      area: "1875 sq.ft",
      bhk: "3 BHK",
      price: "78.21",
      image: "/images/demo/residential/2.png",
      status: "Ongoing",
      possession: "2023",
      featured: false,
    },
    {
      id: 7,
      name: "Sikka Kaamya Greens",
      location: "Sector 143, Noida",
      area: "2750 sq.ft",
      bhk: "4 BHK",
      price: "82.98",
      image: "/images/demo/residential/3.png",
      status: "Ongoing",
      possession: "Ready",
      featured: true,
    },
    {
      id: 8,
      name: "Tata Eureka Park",
      location: "Sector 150, Noida",
      area: "1589 sq.ft",
      bhk: "3 BHK",
      price: "81.1",
      image: "/images/demo/residential/4.png",
      status: "Ongoing",
      possession: "2024",
      featured: false,
    },
  ];

  return (
    <main>
      {/* Hero Section */}
    <div className="relative w-full h-[400px]">
        <Image 
          src="/images/properties-hero.png" 
          alt="Real Estate " 
          fill 
          className="object-cover" 
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="container text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4"> Residential Properties</h1>
            <div className="flex items-center justify-center gap-2 text-lg">
              <Link href="/" className="hover:text-light">HOME</Link>
              <span>»</span>
              <span className="">Residential Properties</span>
            </div>
          </div>
        </div>
      </div>

      {/* Find New Home Section */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center">
              <span className="inline-block mr-2">⟵</span>
              Find New Home
              <span className="inline-block ml-2">⟶</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ready">Ready to Move</SelectItem>
                  <SelectItem value="under-construction">
                    Under Construction
                  </SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sector-150">Sector 150, Noida</SelectItem>
                  <SelectItem value="sector-143">Sector 143, Noida</SelectItem>
                  <SelectItem value="sector-132">Sector 132, Noida</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="noida">Noida</SelectItem>
                  <SelectItem value="greater-noida">Greater Noida</SelectItem>
                  <SelectItem value="gurgaon">Gurgaon</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Developer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="godrej">Godrej</SelectItem>
                  <SelectItem value="tata">Tata</SelectItem>
                  <SelectItem value="prateek">Prateek</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="BHK Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1bhk">1 BHK</SelectItem>
                  <SelectItem value="2bhk">2 BHK</SelectItem>
                  <SelectItem value="3bhk">3 BHK</SelectItem>
                  <SelectItem value="4bhk">4 BHK</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-2">Area Range</label>
                <div className="px-4">
                  <Slider
                    defaultValue={[20, 200]}
                    max={500}
                    step={1}
                    value={areaRange}
                    onValueChange={setAreaRange}
                    className="my-4"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{areaRange[0]} Sq Ft</span>
                  <span>{areaRange[1]} Sq Ft</span>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-2">
                  Price Range
                </label>
                <div className="px-4">
                  <Slider
                    defaultValue={[20, 200]}
                    max={500}
                    step={1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="my-4"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>₹{priceRange[0]} Lac</span>
                  <span>₹{priceRange[1]} Lac</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button className="bg-[#AB213B] hover:bg-[#96192F] text-white px-8">
                Filter
              </Button>
            </div>
          </div>

          {/* Property Listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* View All Projects Button */}
          <div className="flex justify-center mt-8">
            <Button className="bg-[#AB213B] hover:bg-[#96192F] text-white px-8">
              View All Projects
            </Button>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <LeaveYourDetails />
    </main>
  );
}
