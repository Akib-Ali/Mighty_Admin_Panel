"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MapPin,
  ChevronDown,
  SlidersHorizontal,
  Info,
  Heart,
  Mail,
  Phone,
  BadgeAlert,
  BellRing,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

interface Property {
  id: number;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  images: string[];
  developer: {
    name: string;
    logo: string;
  };
  trucheck?: boolean;
  hasFloorPlan?: boolean;
  status?: string;
}

export default function PropertyList() {
  // State for filters
  const [purpose, setPurpose] = useState("Buy");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("All");
  const [propertyType, setPropertyType] = useState("Villa");
  const [bedsAndBaths, setBedsAndBaths] = useState("");
  const [showTruCheck, setShowTruCheck] = useState(false);
  const [showFloorPlans, setShowFloorPlans] = useState(false);
  const [sortBy, setSortBy] = useState("Popular");
  const [viewType, setViewType] = useState("List");
  const [likedProperties, setLikedProperties] = useState<number[]>([]);

  // Options for filters
  const statusOptions = ["All", "Ready", "Off-Plan"];
  const propertyTypes = ["Villa", "Apartment", "Townhouse", "Penthouse"];
  const bedsOptions = ["Studio", "1", "2", "3", "4", "5+"];

  // Location data with property counts
  const locations = [
    { name: "Ajman", count: "31,653" },
    { name: "Sharjah", count: "15,803" },
    { name: "Abu Dhabi", count: "12,989" },
  ];

  // Sample properties data
  const properties: Property[] = [
    {
      id: 1,
      title: "Spacious 5-Bedroom Villa for Sale in Masaar",
      price: "3,824,000",
      location: "Robinia, Masaar, Tilal City, Sharjah",
      bedrooms: 5,
      bathrooms: 6,
      area: "5,522 sqft",
      images: [
        "/images/properties/1.png",
        "/images/properties/2.png",
        "/images/properties/3.png",
      ],
      developer: {
        name: "Vision X",
        logo: "/images/Realty-Logo.png",
      },
      trucheck: true,
      hasFloorPlan: true,
      status: "Ready",
    },
    {
      id: 2,
      title: "Premium 5-Bedroom Villa in Masaar for Sale",
      price: "3,821,000",
      location: "Sendian Villas, Masaar, Tilal City, Sharjah",
      bedrooms: 5,
      bathrooms: 6,
      area: "5,519 sqft",
      images: [
        "/images/properties/2.png",
        "/images/properties/1.png",
        "/images/properties/3.png",
      ],
      developer: {
        name: "Vision X",
        logo: "/images/Realty-Logo.png",
      },
      trucheck: false,
      hasFloorPlan: true,
      status: "Off-Plan",
    },
  ];

  const toggleLike = (propertyId: number) => {
    setLikedProperties((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-2 sm:px-4 py-4 sm:py-6">
      {/* Original Search and Filter Section */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col gap-3 sm:gap-4">
          {/* Main Search Bar */}
          <div className="flex flex-wrap gap-2 items-start">
            {/* Purpose Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-10 px-3 sm:px-4 text-[#AB213B] border-[#AB213B] w-full sm:w-auto"
                >
                  {purpose} <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setPurpose("Buy")}>
                  Buy
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPurpose("Rent")}>
                  Rent
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Location Input */}
            <div className="flex-1 relative w-full sm:w-auto min-w-[200px] sm:min-w-[300px]">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 h-10 border-gray-300 w-full"
              />
            </div>

            {/* Status Tabs */}
            <div className="flex items-center bg-gray-100 rounded-md p-1 w-full sm:w-auto overflow-x-auto">
              {statusOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setStatus(option)}
                  className={cn(
                    "px-3 sm:px-4 py-1.5 rounded-md text-sm transition-colors whitespace-nowrap flex-shrink-0",
                    status === option
                      ? "bg-white text-[#AB213B] shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Property Type Dropdown */}
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="h-10 w-full sm:w-auto sm:min-w-[120px]">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                {propertyTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Beds & Baths Dropdown */}
            <Select value={bedsAndBaths} onValueChange={setBedsAndBaths}>
              <SelectTrigger className="h-10 w-full sm:w-auto sm:min-w-[140px]">
                <SelectValue placeholder="Beds & Baths" />
              </SelectTrigger>
              <SelectContent>
                {bedsOptions.map((beds) => (
                  <SelectItem key={beds} value={beds}>
                    {beds} {beds !== "Studio" ? "Beds" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* More Filters Button */}
            <Button variant="outline" className="h-10 w-full sm:w-auto">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>

          {/* Additional Options */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-4 text-sm">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="trucheck"
                checked={showTruCheck}
                onChange={(e) => setShowTruCheck(e.target.checked)}
                className="rounded border-gray-300"
              />
              <label
                htmlFor="trucheck"
                className="flex items-center cursor-pointer"
              >
                MW Verified Property
                <Info className="ml-1 h-4 w-4 text-gray-400" />
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="floorplans"
                checked={showFloorPlans}
                onChange={(e) => setShowFloorPlans(e.target.checked)}
                className="rounded border-gray-300"
              />
              <label
                htmlFor="floorplans"
                className="flex items-center cursor-pointer"
              >
                Properties with floor plans
                <Info className="ml-1 h-4 w-4 text-gray-400" />
              </label>
            </div>

            <div className="flex-1" />

            <Button
              variant="link"
              className="text-[#AB213B] hover:text-[#AB213B]/90 p-0"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Locations Bar */}
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 overflow-x-auto pb-2 -mx-2 px-2 sm:mx-0 sm:px-0">
        {locations.map((loc) => (
          <Link
            key={loc.name}
            href={`/property-list?location=${loc.name.toLowerCase()}`}
            className="text-secondary hover:underline whitespace-nowrap text-sm sm:text-base"
          >
            {loc.name} ({loc.count})
          </Link>
        ))}
        <Link
          href="/locations"
          className="text-secondary hover:underline ml-auto whitespace-nowrap text-sm sm:text-base"
        >
          VIEW ALL LOCATIONS
        </Link>
      </div>

      {/* View Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 sm:mb-6">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[140px]">
            <ChevronDown className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Popular">Popular</SelectItem>
            <SelectItem value="Newest">Newest</SelectItem>
            <SelectItem value="Price-High">Price (High to Low)</SelectItem>
            <SelectItem value="Price-Low">Price (Low to High)</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <Button
            variant={viewType === "List" ? "default" : "outline"}
            onClick={() => setViewType("List")}
            className="px-3 sm:px-4"
          >
            List
          </Button>
          {/* <Button
            variant={viewType === "Map" ? "default" : "outline"}
            onClick={() => setViewType("Map")}
            className="px-3 sm:px-4"
          >
            Map
          </Button> */}
        </div>
      </div>

      <hr className="border-gray-200 mb-6" />

      {/* Page Title */}
      <h1 className="text-xl sm:text-2xl font-semibold mb-4">
        Villas for sale in UAE
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Property Grid */}
        <div className="space-y-4 sm:space-y-6 lg:col-span-2">
          {properties
            .filter((property) => {
              if (showTruCheck && !property.trucheck) return false;
              if (showFloorPlans && !property.hasFloorPlan) return false;
              if (status !== "All" && property.status !== status) return false;
              return true;
            })
            .map((property) => (
              <Card key={property.id} className="p-3 sm:p-4">
                <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                  {/* Image Gallery */}
                  <div className="relative w-full md:w-[400px] h-[250px] sm:h-[300px] bg-gray-100 rounded-lg overflow-hidden">
                    <div className="relative w-full h-full">
                      <Image
                        src={property.images[0]}
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                      {/* Image Navigation Dots */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {[1, 2, 3, 4].map((dot) => (
                          <div
                            key={dot}
                            className={`w-2 h-2 rounded-full ${
                              dot === 1 ? "bg-white" : "bg-white/50"
                            }`}
                          />
                        ))}
                      </div>
                      {/* Favorite Button */}
                      <button
                        onClick={() => toggleLike(property.id)}
                        className="absolute top-4 right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 rounded-full flex items-center justify-center"
                      >
                        {likedProperties.includes(property.id) ? (
                          <Heart className="h-5 w-5 text-primary fill-primary" />
                        ) : (
                          <Heart className="h-5 w-5 text-gray-400 fill-gary-100" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div>
                        <h2 className="text-lg sm:text-xl font-semibold mb-2">
                          {property.title}
                        </h2>
                        <p className="text-xl sm:text-2xl font-bold text-[#AB213B]">
                          AED {property.price}
                        </p>
                      </div>
                      <Image
                        src={property.developer.logo}
                        alt={property.developer.name}
                        width={70}
                        height={50}
                        className="rounded sm:w-[50px] sm:h-[30px]"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">
                          {property.bedrooms}
                        </span>
                        <span>Beds</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">
                          {property.bathrooms}
                        </span>
                        <span>Baths</span>
                      </div>
                      <div>
                        <span className="font-semibold">Area: </span>
                        <span>{property.area}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4 sm:mb-6">
                      <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <span className="text-gray-600 text-sm sm:text-base">
                        {property.location}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      <Button className="bg-secondary-light hover:bg-secondary-light/90 text-secondary h-9 sm:h-10 px-3 sm:px-4 text-sm sm:text-base">
                        <Mail className="h-5 w-5 mr-1" />
                        Email
                      </Button>
                      <Button className="bg-secondary-light hover:bg-secondary-light/90 text-secondary h-9 sm:h-10 px-3 sm:px-4 text-sm sm:text-base">
                        <Phone className="h-5 w-5 mr-1" />
                        Call
                      </Button>
                      <Button className="bg-[#E7F5E8] hover:bg-[#E7F5E8]/90 text-secondary border h-9 sm:h-10 px-3 sm:px-4 text-sm sm:text-base">
                        <img
                          className="h-7 w-7"
                          src="/images/whatsapp.svg"
                          alt="icon"
                        />
                        WhatsApp
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
        </div>

        <div>
          {/* Drive Time Feature */}
          <div className=" bg-secondary-light rounded-lg p-3 sm:p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded">
                <BellRing />
              </span>
              <span className="font-medium text-sm sm:text-base capitalize">
                Alert me for new properties
              </span>
            </div>
            <Button
              variant="secondary"
              className="text-white  text-sm sm:text-base"
            >
              Subscribe
            </Button>
          </div>

          {/* Recommended Searches */}
          <div className="mt-6 sm:mt-8">
            <h2 className="text-lg font-semibold mb-3 sm:mb-4  bg-gray-100 py-2 px-4 rounded">
              Recommended searches
            </h2>
            <div className="space-y-2">
              {[1,2, 3, 4, 5, 6].map((beds) => (
                <Link
                  key={beds}
                  href={`/property-list?beds=${beds}`}
                  className="block text-secondary hover:underline text-sm mx-4"
                >
                  {beds} Bedroom Villas for sale in UAE
                </Link>
              ))}
            </div>
            <Button
              variant="link"
              className="text-secondary mt-2 p-0 text-sm font-bold mx-4"
            >
              View More
            </Button>
          </div>
          {/* Recommended Searches */}
          <div className="mt-6 sm:mt-8">
           
               <h2 className="text-lg font-semibold mb-3 sm:mb-4 bg-gray-100 py-2 px-4 rounded">
               Invest in Off Plan
            </h2>
           
           
            <div className="space-y-2 mx-4">
              {[1,2, 3, 4].map((beds) => (
                <Link
                  key={beds}
                  href={`/property-list?beds=${beds}`}
                  className="block text-secondary hover:underline text-sm"
                >
                  {beds} Off Plan Properties in UAE
                </Link>
              ))}
            </div>
            <Button
              variant="link"
              className="text-secondary mt-2 p-0 text-sm font-bold mx-4"
            >
              View More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
