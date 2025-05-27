"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Search,
  MapPin,
  Play,
  Filter,
  ChevronDown,
  Bed,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useSearchProperty } from "@/hooks/use-property-search";
import {
  PropertyType,
  FurnishingStatus,
} from "@/services/PropertySearchServices";
import { useRouter } from "next/navigation";

const tabs = [
  { value: "properties", label: "Properties" },
  { value: "new-projects", label: "New Launches", isNew: true },
  { value: "commercial", label: "Commercial" },
  { value: "market-trends", label: "Market Trends" },
  { value: "smartvalue", label: "MW SmartValue™" },
  { value: "locality", label: "Locality Insights" },
  { value: "agents", label: "Find Agents" },
];

export default function HeroSection() {
  const [activePropertyTab, setActivePropertyTab] = useState("buy");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const {
    mutate: searchProperties,
    isPending,
    data: searchResults,
  } = useSearchProperty();
  const router = useRouter();
  const [searchParams, setSearchParams] = useState({
    // specifications: "",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
    maxBedrooms: "",
    minBathrooms: "",
    maxBathrooms: "",
    minSize: "",
    maxSize: "",
    // type: PropertyType.SELL,
    status: "ACTIVE",
    city: "",
    country: "",
    amenities: [] as string[],
    mwVerified: true,
    isReady: true,
    furnishingStatus: "" as FurnishingStatus,
    hasFloorPlan: true,
    category: "",
    isOffPlan: false,
    sort: "popular" as const,
  });

  const handleSearch = () => {
    // Log the search params for debugging
    console.log("Search params before cleaning:", searchParams);

    const params = {
      ...searchParams,
      type: activePropertyTab === "buy" ? PropertyType.SELL : PropertyType.RENT,
      // Ensure numeric values are properly converted
      minPrice: searchParams.minPrice
        ? Number(searchParams.minPrice)
        : undefined,
      maxPrice: searchParams.maxPrice
        ? Number(searchParams.maxPrice)
        : undefined,
      minBedrooms: searchParams.minBedrooms
        ? Number(searchParams.minBedrooms)
        : undefined,
      maxBedrooms: searchParams.maxBedrooms
        ? Number(searchParams.maxBedrooms)
        : undefined,
      minBathrooms: searchParams.minBathrooms
        ? Number(searchParams.minBathrooms)
        : undefined,
      maxBathrooms: searchParams.maxBathrooms
        ? Number(searchParams.maxBathrooms)
        : undefined,
      minSize: searchParams.minSize ? Number(searchParams.minSize) : undefined,
      maxSize: searchParams.maxSize ? Number(searchParams.maxSize) : undefined,
      // Ensure boolean values are properly set
      mwVerified: true,
      isReady: true,
      isOffPlan: false,
      // Remove empty strings
      furnishingStatus: searchParams.furnishingStatus || undefined,
      category: searchParams.category || undefined,
      amenities:
        searchParams.amenities.length > 0 ? searchParams.amenities : undefined,
    };

    // Remove undefined values
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v != null && v !== "")
    );

    console.log("Clean params for API:", cleanParams);

    searchProperties(cleanParams, {
      onSuccess: (data) => {
        console.log("Search Results:", data);

        // Convert the clean params to URL parameters
        const queryParams = new URLSearchParams();

        // Add each parameter to the URL
        Object.entries(cleanParams).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            // Handle array values like amenities
            value.forEach((item) => queryParams.append(key, item));
          } else if (value !== undefined && value !== "") {
            queryParams.set(key, String(value));
          }
        });

        // Navigate to search results page with query parameters
        const searchUrl =
          activePropertyTab === "rent"
            ? `/to-rent/${queryParams.toString()}`
            : `/for-sale/${queryParams.toString()}`;

        console.log("Navigating to:", searchUrl);
        router.push(searchUrl);
      },
      onError: (error) => {
        console.error("Search Error:", error);
      },
    });
  };

  // Update the Beds & Baths dropdown handler
  const handleBedroomsBathrooms = (value: string) => {
    const [bedrooms] = value.match(/\d+/) || [""];
    setSearchParams((prev) => ({
      ...prev,
      minBedrooms: bedrooms || "",
      maxBedrooms: bedrooms || "",
      minBathrooms: "",
      maxBathrooms: "",
    }));
  };

  // Update the Price Range dropdown handler
  const handlePriceRange = (range: string) => {
    const ranges: Record<string, { min: string; max: string }> = {
      "0-100k": { min: "0", max: "100000" },
      "100k-500k": { min: "100000", max: "500000" },
      "500k-1m": { min: "500000", max: "1000000" },
      "1m-2m": { min: "1000000", max: "2000000" },
      "2m+": { min: "2000000", max: "" },
    };

    const selected = ranges[range];
    if (selected) {
      setSearchParams((prev) => ({
        ...prev,
        minPrice: selected.min,
        maxPrice: selected.max,
      }));
    }
  };

  return (
    <div className="container">
      <div className="relative w-full h-dvh pb-10 overflow-hidden mx-auto">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/MWRealtyGroup.webp"
            alt="Real estate background with sunset view"
            fill
            className="object-cover brightness-90 rounded-b-lg"
            priority
          />
        </div>

        {/* Content Container */}
        <div className="container mx-auto h-[800px] pt-10 px-4">
          {/* Tagline */}
          <div className="text-center text-white mb-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-white mb-2">
              Your trusted partner in{" "}
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-white">
              finding the best.
            </p>
          </div>

          {/* Property Navigation Tabs */}
          <div className="bg-transparent rounded-lg shadow-lg md:max-w-5xl px-4 mx-auto ">
            <Tabs defaultValue="properties" className="w-full rounded-full ">
              <TabsList className="w-full flex justify-center items-center mt-2 py-6 md:py-6 px-0 bg-primary rounded-full">
                {tabs.map((tab, index) => {
                  const isMobileHidden = index > 2;
                  return (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className={`group inline px-4 md:px-4 py-2 md:py-4 text-gray-300 
                      data-[state=active]:text-white data-[state=active]:bg-transparent 
                      data-[state=active]:shadow-none data-[state=active]:-translate-y-1 
                      rounded-none whitespace-nowrap transition-transform 
                      ${isMobileHidden ? "hidden lg:flex" : "flex"}`}
                    >
                      <span className="flex flex-col items-center">
                        <span className="flex items-center">
                          {tab.label}
                          {tab.isNew && (
                            <Badge className="ml-2 bg-gray-100 border border-primary text-black text-xs h-5">
                              NEW
                            </Badge>
                          )}
                        </span>
                        <span className="w-full h-[2px] mt-1 bg-transparent group-data-[state=active]:bg-white transition-all" />
                      </span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              <div className="bg-white my-8 rounded-xl">
                {/* Tab Content */}
                <TabsContent
                  value="properties"
                  className="p-4 md:p-6 bg-white pt-10 rounded-lg"
                >
                  {/* Buy/Rent/Off-Plan Tabs */}
                  <div className="mb-4">
                    <Tabs
                      value={activePropertyTab}
                      onValueChange={setActivePropertyTab}
                      className="w-full md:w-auto"
                    >
                      <TabsList className="bg-gray-100 p-1 h-10 w-full md:w-auto overflow-x-auto flex-nowrap">
                        <TabsTrigger
                          value="buy"
                          className="flex-1 font-medium text-sm md:text-base data-[state=active]:bg-white data-[state=active]:border-r-full] data-[state=active]:border-[#AB213B] data-[state=active]:text-primary whitespace-nowrap"
                        >
                          Buy
                        </TabsTrigger>
                        <TabsTrigger
                          value="rent"
                          className="flex-1 font-medium text-sm md:text-base data-[state=active]:bg-white data-[state=active]:text-primary whitespace-nowrap"
                        >
                          Rent
                        </TabsTrigger>
                        {/* <TabsTrigger
                          value="off-plan"
                          className="flex-1 font-medium text-sm md:text-base data-[state=active]:bg-white data-[state=active]:text-primary whitespace-nowrap"
                        >
                          Off-Plan
                        </TabsTrigger>
                        <TabsTrigger
                          value="auctions"
                          className="flex-1 font-medium text-sm md:text-base data-[state=active]:bg-white data-[state=active]:text-primary whitespace-nowrap"
                        >
                          Auctions
                        </TabsTrigger> */}
                      </TabsList>
                    </Tabs>
                  </div>

                  {/* Search Form */}
                  <div className="grid grid-cols-12 gap-2 md:gap-3">
                    {/* Location Search */}
                    <div className="col-span-12 md:col-span-4 relative">
                      <MapPin
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input
                        placeholder="Enter location"
                        className="pl-10 h-10 md:h-12 border-gray-300"
                        onChange={(e) =>
                          setSearchParams((prev) => ({
                            ...prev,
                            city: e.target.value,
                          }))
                        }
                      />
                    </div>

                    {/* Property Type Dropdown */}
                    <div className="col-span-6 md:col-span-2">
                      <Select
                        onValueChange={(value) =>
                          setSearchParams((prev) => ({
                            ...prev,
                            category: value,
                          }))
                        }
                      >
                        <SelectTrigger className="h-10 md:h-12 border-gray-300 text-sm">
                          <SelectValue placeholder="Property Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="villa">Villa</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                          <SelectItem value="penthouse">Penthouse</SelectItem>
                          <SelectItem value="studio">Studio</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Beds & Baths Dropdown */}
                    <div className="col-span-6 md:col-span-2">
                      <Select onValueChange={handleBedroomsBathrooms}>
                        <SelectTrigger className="h-10 md:h-12 border-gray-300 text-sm">
                          <SelectValue placeholder="Beds & Baths" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="studio">Studio</SelectItem>
                          <SelectItem value="1bhk">1 BHK</SelectItem>
                          <SelectItem value="2bhk">2 BHK</SelectItem>
                          <SelectItem value="3bhk">3 BHK</SelectItem>
                          <SelectItem value="4bhk">4 BHK</SelectItem>
                          <SelectItem value="5bhk">5 BHK</SelectItem>
                          <SelectItem value="6bhk">6+ BHK</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Price Dropdown */}
                    <div className="col-span-8 md:col-span-2">
                      <Select onValueChange={handlePriceRange}>
                        <SelectTrigger className="h-10 md:h-12 border-gray-300 text-sm">
                          <SelectValue placeholder="Price (AED)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-100k">Up to 100K</SelectItem>
                          <SelectItem value="100k-500k">100K - 500K</SelectItem>
                          <SelectItem value="500k-1m">500K - 1M</SelectItem>
                          <SelectItem value="1m-2m">1M - 2M</SelectItem>
                          <SelectItem value="2m+">2M+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Search Button */}
                    <div className="col-span-4 md:col-span-2">
                      <Button
                        className="w-full h-10 md:h-12 text-sm md:text-base"
                        onClick={handleSearch}
                        disabled={isPending}
                      >
                        {isPending ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Search size={16} className="mr-1 md:mr-2" />
                        )}
                        {isPending ? "Searching..." : "Search"}
                      </Button>
                    </div>
                  </div>

                  {/* Advanced Filter Toggle */}
                  <div className="flex justify-between items-center mt-4">
                    {/* Filter Pills */}
                    <div className="flex gap-2 overflow-x-auto pb-1 max-w-[70%]">
                      {["All", "Ready", "Off-Plan"].map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setActiveFilter(filter)}
                          className={`rounded-full px-3 py-1 text-xs md:text-sm whitespace-nowrap transition-colors ${
                            activeFilter === filter
                              ? "bg-primary text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>

                    {/* Advanced Filters Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs md:text-sm"
                      onClick={() =>
                        setShowAdvancedFilters(!showAdvancedFilters)
                      }
                    >
                      <Filter size={14} className="mr-1" /> Filters
                      <ChevronDown
                        size={14}
                        className={`ml-1 transition-transform ${
                          showAdvancedFilters ? "rotate-180" : ""
                        }`}
                      />
                    </Button>
                  </div>

                  {/* Advanced Filters Panel */}
                  {showAdvancedFilters && (
                    <div className="mt-4 bg-gray-50 p-3 rounded-md grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Size Range */}
                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          Size (sqft)
                        </label>
                        <div className="flex items-center gap-2">
                          <Input
                            placeholder="Min"
                            className="h-8 text-sm"
                            type="number"
                            onChange={(e) =>
                              setSearchParams((prev) => ({
                                ...prev,
                                minSize: e.target.value,
                              }))
                            }
                          />
                          <span>-</span>
                          <Input
                            placeholder="Max"
                            className="h-8 text-sm"
                            type="number"
                            onChange={(e) =>
                              setSearchParams((prev) => ({
                                ...prev,
                                maxSize: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>

                      {/* Furnishing */}
                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          Furnishing
                        </label>
                        <Select
                          onValueChange={(value) =>
                            setSearchParams((prev) => ({
                              ...prev,
                              furnishingStatus: value as FurnishingStatus,
                            }))
                          }
                        >
                          <SelectTrigger className="h-8 text-sm">
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any</SelectItem>
                            <SelectItem value="furnished">Furnished</SelectItem>
                            <SelectItem value="semi-furnished">
                              Semi-Furnished
                            </SelectItem>
                            <SelectItem value="unfurnished">
                              Unfurnished
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Amenities */}
                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          Amenities
                        </label>
                        <Select
                          onValueChange={(value) =>
                            setSearchParams((prev) => ({
                              ...prev,
                              amenities: [value],
                            }))
                          }
                        >
                          <SelectTrigger className="h-8 text-sm">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pool">Pool</SelectItem>
                            <SelectItem value="gym">Gym</SelectItem>
                            <SelectItem value="parking">Parking</SelectItem>
                            <SelectItem value="balcony">Balcony</SelectItem>
                            <SelectItem value="security">Security</SelectItem>
                            <SelectItem value="pet-friendly">
                              Pet Friendly
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </TabsContent>

                {/* Placeholders for other tabs */}
                <TabsContent value="new-projects" className="p-4 md:p-6 ">
                  <div className="space-y-4">
                    {/* Location Search */}
                    <div className="flex items-center justify-between gap-8">
                      <div className="relative w-full ">
                        <MapPin
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <Input
                          placeholder="Enter location"
                          className="w-full pl-10 h-12 text-base border-gray-200"
                        />
                      </div>
                      {/* Search Button */}
                      <Button className="w-44 h-12 text-base bg-[#AB213B] hover:bg-[#8B1B30] text-white">
                        Search
                      </Button>
                    </div>

                    {/* Filter Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      <Select>
                        <SelectTrigger className="h-12 border-gray-200">
                          <SelectValue placeholder="Residential" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residential">
                            Residential
                          </SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select>
                        <SelectTrigger className="h-12 border-gray-200">
                          <SelectValue placeholder="Handover By" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ready">Ready</SelectItem>
                          <SelectItem value="3months">3 Months</SelectItem>
                          <SelectItem value="6months">6 Months</SelectItem>
                          <SelectItem value="1year">1 Year</SelectItem>
                          <SelectItem value="2years">2 Years</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select>
                        <SelectTrigger className="h-12 border-gray-200">
                          <SelectValue placeholder="Payment Plan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="mortgage">Mortgage</SelectItem>
                          <SelectItem value="installments">
                            Installments
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <Select>
                        <SelectTrigger className="h-12 border-gray-200">
                          <SelectValue placeholder="% Completion" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="100">100% Complete</SelectItem>
                          <SelectItem value="75">75% or more</SelectItem>
                          <SelectItem value="50">50% or more</SelectItem>
                          <SelectItem value="25">25% or more</SelectItem>
                          <SelectItem value="0">Not Started</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="commercial" className="p-4 md:p-6 ">
                  <div className="space-y-4">
                    {/* Location Search */}
                    <div className="flex items-center justify-between gap-8">
                      <div className="relative w-full ">
                        <MapPin
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <Input
                          placeholder="Enter location"
                          className="w-full pl-10 h-12 text-base border-gray-200"
                        />
                      </div>
                      {/* Search Button */}
                      <Button className="w-44 h-12 text-base bg-[#AB213B] hover:bg-[#8B1B30] text-white">
                        Search
                      </Button>
                    </div>

                    {/* Filter Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      <Select>
                        <SelectTrigger className="h-12 border-gray-200">
                          <SelectValue placeholder="Residential" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residential">
                            Residential
                          </SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select>
                        <SelectTrigger className="h-12 border-gray-200">
                          <SelectValue placeholder="Handover By" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ready">Ready</SelectItem>
                          <SelectItem value="3months">3 Months</SelectItem>
                          <SelectItem value="6months">6 Months</SelectItem>
                          <SelectItem value="1year">1 Year</SelectItem>
                          <SelectItem value="2years">2 Years</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select>
                        <SelectTrigger className="h-12 border-gray-200">
                          <SelectValue placeholder="Payment Plan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="mortgage">Mortgage</SelectItem>
                          <SelectItem value="installments">
                            Installments
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <Select>
                        <SelectTrigger className="h-12 border-gray-200">
                          <SelectValue placeholder="% Completion" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="100">100% Complete</SelectItem>
                          <SelectItem value="75">75% or more</SelectItem>
                          <SelectItem value="50">50% or more</SelectItem>
                          <SelectItem value="25">25% or more</SelectItem>
                          <SelectItem value="0">Not Started</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="market-trends" className="p-4 md:p-6 ">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <h4 className="font-medium mb-2">Price Trends</h4>
                        <p className="text-sm text-gray-600">
                          Track property price movements
                        </p>
                        <div className="mt-2">
                          <Badge variant="outline" className="mr-2">
                            +5.2% YoY
                          </Badge>
                          <Badge variant="outline">+1.8% QoQ</Badge>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <h4 className="font-medium mb-2">Market Analysis</h4>
                        <p className="text-sm text-gray-600">
                          Expert insights and reports
                        </p>
                        <Button variant="link" className="mt-2 p-0">
                          Download Latest Report →
                        </Button>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <h4 className="font-medium mb-2">
                          Investment Hotspots
                        </h4>
                        <p className="text-sm text-gray-600">
                          Top performing areas
                        </p>
                        <Button variant="link" className="mt-2 p-0">
                          View Analysis →
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="smartvalue" className="p-4 md:p-6 ">
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">
                        MW SmartValue™ Calculator
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Get an instant property valuation using our AI-powered
                        tool
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input placeholder="Enter property location" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Property Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="villa">Villa</SelectItem>
                            <SelectItem value="townhouse">Townhouse</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          placeholder="Built-up Area (sq ft)"
                          type="number"
                        />
                        <Button className="md:mt-0">Calculate Value</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="locality" className="p-4 md:p-6 ">
                  <div className="space-y-4">
                    <div className="flex gap-4 mb-4">
                      <div className="relative flex-1 maxw-md">
                        <MapPin
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={18}
                        />
                        <Input
                          placeholder="Search for a locality..."
                          className="pl-10 w-full"
                        />
                      </div>
                      <Button variant="outline">View on Map</Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <h4 className="font-medium mb-2">Neighborhood Guide</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          Explore detailed area guides
                        </p>
                        <Button variant="link" className="p-0">
                          Browse Areas →
                        </Button>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <h4 className="font-medium mb-2">
                          Schools & Education
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          Find nearby educational institutions
                        </p>
                        <Button variant="link" className="p-0">
                          View Schools →
                        </Button>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <h4 className="font-medium mb-2">Amenities</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          Discover local facilities
                        </p>
                        <Button variant="link" className="p-0">
                          Explore →
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="agents" className="p-4 md:p-6 ">
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">
                          Find Your Perfect Agent
                        </h3>
                        <p className="text-sm text-gray-600">
                          Connect with top-rated real estate professionals
                        </p>
                      </div>
                      <Button>Become an Agent</Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-start gap-3">
                          <div className="w-16 h-16 rounded-full bg-gray-200" />
                          <div>
                            <h4 className="font-medium">Find an Agent</h4>
                            <p className="text-sm text-gray-600 mb-2">
                              Search by location or specialty
                            </p>
                            <Button variant="link" className="p-0">
                              Search Now →
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-start gap-3">
                          <div className="w-16 h-16 rounded-full bg-gray-200" />
                          <div>
                            <h4 className="font-medium">Agent Rankings</h4>
                            <p className="text-sm text-gray-600 mb-2">
                              View top performing agents
                            </p>
                            <Button variant="link" className="p-0">
                              View Rankings →
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-start gap-3">
                          <div className="w-16 h-16 rounded-full bg-gray-200" />
                          <div>
                            <h4 className="font-medium">Agency Directory</h4>
                            <p className="text-sm text-gray-600 mb-2">
                              Browse real estate agencies
                            </p>
                            <Button variant="link" className="p-0">
                              Browse Directory →
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* AI Assistant */}
                <div className="flex items-center justify-between  bg-gray-50 rounded-lg p-3 py-4 ">
                  <div className="flex items-center">
                    <div className="rounded-full bg-red-100 p-2 mr-2 md:mr-3">
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-xs md:text-sm">
                      Want to find out more about UAE real estate using AI?
                    </p>
                    <Badge className="ml-2 bg-red-100 border border-primary/50 text-primary/60 text-xs h-5">
                      Comming Soon
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:bg-red-50 hover:text-primary/90 text-xs md:text-sm hidden"
                  >
                    Try AI <span className="ml-1">→</span>
                  </Button>
                </div>
              </div>
            </Tabs>
          </div>

          {/* Experience Journey Button */}
          <div className="flex justify-center mt-8 md:mt-12">
            <Button
              variant="outline"
              className="bg-black/30 text-white border-white hover:bg-black/40 hover:text-white text-xs md:text-sm"
              onClick={() =>
                window.open(
                  "https://www.youtube.com/watch?v=xw5UY83kNEs",
                  "_blank"
                )
              }
            >
              <Play size={14} className="mr-1 md:mr-2" /> LET US GUIDE YOUR HOME
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
