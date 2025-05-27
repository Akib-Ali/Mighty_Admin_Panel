"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
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
  Info,
  Heart,
  Mail,
  Phone,
  BadgeAlert,
  BellRing,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Pagination } from "@/components/shared/Pagination";

// Update the Property interface to match API response
interface Property {
  id: string;
  title: string;
  description: string;
  type: string;
  price: number;
  location: string;
  size: number;
  amenities: string[];
  images: string[];
  videos: string[];
  category: string;
  reraId: string;
  serviceCharges: number;
  bedrooms: number;
  bathrooms: number;
  floor: number;
  city: string;
  country: string;
  mwVerified: boolean;
  isReady: boolean;
  furnishingStatus: string | null;
  status: string;
  owner: any;
}

// Add API parameter mappings
const API_MAPPINGS = {
  purpose: {
    Buy: "SELL",
    Rent: "RENT",
  },
  sort: {
    Popular: "popular",
    Newest: "newest",
    "Price-High": "price-high-to-low",
    "Price-Low": "price-low-to-high",
  },
} as const;

// Add pagination interfaces
interface Metadata {
  page: number;
  limit: number;
  totalPages: number;
  count: number;
}

interface ApiResponse {
  metadata: Metadata;
  property: {
    message: string;
    data: Property[];
  };
}

// get all url param
const getAllUrlParams = (searchParams: URLSearchParams) => {
  const params = new URLSearchParams(searchParams);
  const urlParams: { [key: string]: string } = {};

  params.forEach((value, key) => {
    urlParams[key] = value;
  });

  return urlParams;
};

// Add after other interfaces
interface AdvancedFilters {
  minSize: string;
  maxSize: string;
  furnishingStatus: string;
  amenities: string[];
}

export default function PropertyList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State for filters
  const [purpose, setPurpose] = useState("Buy");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("UAE");
  const [status, setStatus] = useState("All");
  const [propertyType, setPropertyType] = useState("Villa");
  const [bedsAndBaths, setBedsAndBaths] = useState("");
  const [showTruCheck, setShowTruCheck] = useState(false);
  const [showFloorPlans, setShowFloorPlans] = useState(false);
  const [sortBy, setSortBy] = useState("Popular");
  const [viewType, setViewType] = useState("List");
  const [likedProperties, setLikedProperties] = useState<number[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  // Add pagination state
  const [metadata, setMetadata] = useState<Metadata>({
    page: 1,
    limit: 40,
    totalPages: 1,
    count: 0,
  });

  // Options for filters
  const statusOptions = ["All", "Ready", "Off-Plan"];
  const propertyTypes = ["Villa", "Apartment", "Townhouse", "Penthouse"];
  const bedsOptions = ["Studio", "1", "2", "3", "4", "5+"];

  const toggleLike = (propertyId: number) => {
    setLikedProperties((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  // Replace getInitialValues with direct URL parsing
  useEffect(() => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const params = new URLSearchParams(url.search);

    // Set state based on URL params
    Object.entries(Object.fromEntries(params)).forEach(([key, value]) => {
      switch (key) {
        case "type":
          setPurpose(value === "SELL" ? "BUY" : "RENT");
          break;
        case "city":
          setLocation(value);
          break;
        case "country":
          setCountry(value);
          break;
        case "status":
          setStatus(value);
          break;
        case "category":
          setPropertyType(value);
          break;
        case "bedrooms":
          setBedsAndBaths(value);
          break;
        case "mwVerified":
          setShowTruCheck(value === "true");
          break;
        case "hasFloorPlan":
          setShowFloorPlans(value === "true");
          break;
        case "sort":
          setSortBy(value);
          break;
      }
    });
  }, [searchParams]);

  // Simplify updateSearch function
  const updateSearch = (newParams: any) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    console.log("Current URL params:", Object.fromEntries(params.entries()));

    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== undefined && value !== "" && value !== null) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    });

    console.log("Updated URL params:", Object.fromEntries(params.entries()));
    router.push(`${pathname}?${params.toString()}`);
  };

  // Fetch properties when filters change
  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(searchParams);

      console.log("Search params:", Object.fromEntries(params.entries()));

      try {
        const response = await fetch(
          `https://api.mightywarnersrealty.com/api/v1/property/search?${params.toString()}`
        );
        const data: ApiResponse = await response.json();

        if (data?.property?.data) {
          setProperties(data.property.data);
          setMetadata(data.metadata);
        }
      } catch (error) {
        console.error("Search error:", error);
      }
    };

    fetchData();
  }, [searchParams]);

  // Handle filter changes
  const handleFilterChange = (
    key: string,
    value: string | boolean | string[]
  ) => {
    updateSearch({ [key]: value.toString() });
  };

  // Clear all filters
  const clearAllFilters = () => {
    const params = new URLSearchParams();

    console.log(`Clearing all filters...`, pathname);
    params.set("city", "");
    params.set("limit", "40");
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  // Add debugging for filtered properties
  const filteredProperties = properties.filter((property) => {
    if (showTruCheck && !property.mwVerified) return false;
    if (status !== "All" && property.status !== status) return false;
    return true;
  });

  console.log("Filtered properties:", filteredProperties);
  console.log("Filtered properties:", filteredProperties.length);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    const sortValue =
      API_MAPPINGS.sort[value as keyof typeof API_MAPPINGS.sort];
    updateSearch({ sort: sortValue, page: "1" });
  };

  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false);
  const [isWhatsappDialogOpen, setIsWhatsappDialogOpen] = useState(false);
  const [contactValue, setContactValue] = useState<string | null>(null);

  // Replace handleContactClick with separate handlers
  const handleEmailClick = (email: string) => {
    setContactValue(email);
    setIsEmailDialogOpen(true);
  };
  const handleCallClick = (phone: string) => {
    setContactValue(phone);
    setIsCallDialogOpen(true);
  };
  const handleWhatsappClick = (phone: string) => {
    setContactValue(phone);
    setIsWhatsappDialogOpen(true);
  };

  // Add pagination handler
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    // Preserve all existing params and update page
    const queryString = params.toString();
    router.push(`${pathname}?${queryString}`, { scroll: false });
  };

  // Add with other state declarations
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>({
    minSize: "",
    maxSize: "",
    furnishingStatus: "",
    amenities: [],
  });

  // Add handler for advanced filters
  const handleAdvancedFilterChange = (key: keyof AdvancedFilters, value: any) => {
    setAdvancedFilters((prev) => ({ ...prev, [key]: value }));
    updateSearch({ [key]: value });
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-2 sm:px-4 py-4 sm:py-6">
      {/* Original Search and Filter Section */}
      <div className="mb-3 sm:mb-3">
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
            <Select
              value={propertyType}
              onValueChange={(value) => handleFilterChange("category", value)}
            >
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
            <Select
              value={bedsAndBaths}
              onValueChange={(value) => handleFilterChange("beds", value)}
            >
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
            <Button
              variant="outline"
              className="h-10 w-full sm:w-auto"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Advanced Filters
              <ChevronDown
                className={`ml-2 h-4 w-4 transition-transform ${
                  showAdvancedFilters ? "rotate-180" : ""
                }`}
              />
            </Button>
          </div>

          {/* Advanced Filters Panel */}
          {showAdvancedFilters && (
            <div className="mt-4 bg-gray-50 p-4 rounded-md grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Size Range */}
              <div>
                <label className="text-sm font-medium mb-1 block">Size (sqft)</label>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Min"
                    type="number"
                    value={advancedFilters.minSize}
                    onChange={(e) =>
                      handleAdvancedFilterChange("minSize", e.target.value)
                    }
                    className="h-9"
                  />
                  <span>-</span>
                  <Input
                    placeholder="Max"
                    type="number"
                    value={advancedFilters.maxSize}
                    onChange={(e) =>
                      handleAdvancedFilterChange("maxSize", e.target.value)
                    }
                    className="h-9"
                  />
                </div>
              </div>

              {/* Furnishing */}
              <div>
                <label className="text-sm font-medium mb-1 block">Furnishing</label>
                <Select
                  value={advancedFilters.furnishingStatus}
                  onValueChange={(value) =>
                    handleAdvancedFilterChange("furnishingStatus", value)
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ANY">Any</SelectItem>
                    <SelectItem value="FURNISHED">Furnished</SelectItem>
                    <SelectItem value="UNFURNISHED">Unfurnished</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Amenities */}
              <div>
                <label className="text-sm font-medium mb-1 block">Amenities</label>
                <Select
                  value={advancedFilters.amenities[0] || "ALL"}
                  onValueChange={(value) =>
                    handleAdvancedFilterChange("amenities", [value])
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select Amenity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Amenities</SelectItem>
                    <SelectItem value="POOL">Pool</SelectItem>
                    <SelectItem value="GYM">Gym</SelectItem>
                    <SelectItem value="PARKING">Parking</SelectItem>
                    <SelectItem value="BALCONY">Balcony</SelectItem>
                    <SelectItem value="SECURITY">Security</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

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
              onClick={clearAllFilters}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>

      {/* View Controls */}

      <hr className="border-gray-200 mb-2" />

      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Page Title */}
        <h1 className="text-xl sm:text-2xl font-semibold mb-4">
          {propertyType} for sale in {country}
        </h1>
        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            {" "}
            {/* Increased width for better visibility */}
            <ChevronDown className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Sort by" defaultValue="Popular">
              {sortBy}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {Object.keys(API_MAPPINGS.sort).map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Add property count display */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Found {metadata.count} properties
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Property Grid */}
        <div className="space-y-4 sm:space-y-6 lg:col-span-2">
          {filteredProperties.length > 0 ? (
            filteredProperties?.map((property) => (
              <Card key={property.id} className="p-3 sm:p-4">
                <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                  {/* Image Gallery */}
                  <div className="relative w-full md:w-[400px] h-[250px] sm:h-[300px] bg-gray-100 rounded-lg overflow-hidden">
                    <div className="relative w-full h-full">
                      <Image
                        src={property.images[0] || "/images/placeholder.png"}
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
                      {/* <button
                        onClick={() => toggleLike(property.id)}
                        className="absolute top-4 right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 rounded-full flex items-center justify-center"
                      >
                        {likedProperties.includes(property.id) ? (
                          <Heart className="h-5 w-5 text-primary fill-primary" />
                        ) : (
                          <Heart className="h-5 w-5 text-gray-400 fill-gary-100" />
                        )}
                      </button> */}
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
                          AED {property.price.toLocaleString()}
                        </p>
                      </div>
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
                        <span>{property.size} sqft</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4 sm:mb-6">
                      <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <span className="text-gray-600 text-sm sm:text-base">
                        {property.location}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {property?.owner?.name && (
                        <span className="sr-only">
                          Contact Person name: {property.owner.name}
                        </span>
                      )}
                      <Button
                        className="bg-secondary-light hover:bg-secondary-light/90 text-secondary h-9 sm:h-10 px-3 sm:px-4 text-sm sm:text-base"
                        onClick={() => handleEmailClick(property?.owner?.email)}
                      >
                        <Mail className="h-5 w-5 mr-1" />
                        Email
                      </Button>
                      <Button
                        className="bg-secondary-light hover:bg-secondary-light/90 text-secondary h-9 sm:h-10 px-3 sm:px-4 text-sm sm:text-base"
                        onClick={() => handleCallClick(property?.owner?.phone)}
                      >
                        <Phone className="h-5 w-5 mr-1" />
                        Call
                      </Button>
                      <Button
                        className="bg-[#E7F5E8] hover:bg-[#E7F5E8]/90 text-secondary border h-9 sm:h-10 px-3 sm:px-4 text-sm sm:text-base"
                        onClick={() =>
                          handleWhatsappClick(property?.owner?.phone)
                        }
                      >
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
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No properties found matching your criteria
              </p>
            </div>
          )}
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
              {[1, 2, 3, 4, 5, 6].map((beds) => (
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
              {[1, 2, 3, 4].map((beds) => (
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

      {/* Drive Time Feature Dialog - Place this outside the property map loop */}
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Email Contact</DialogTitle>
            <DialogDescription>
              <div className="text-center mt-4">
                <p className="mb-4">Email this address:</p>
                <a
                  href={`mailto:${contactValue || ""}`}
                  className="text-xl font-semibold text-primary"
                >
                  {contactValue}
                </a>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={isCallDialogOpen} onOpenChange={setIsCallDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Call Contact</DialogTitle>
            <DialogDescription>
              <div className="text-center mt-4">
                <p className="mb-4">Call this number:</p>
                <a
                  href={`tel:${contactValue || ""}`}
                  className="text-xl font-semibold text-primary"
                >
                  {contactValue}
                </a>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog
        open={isWhatsappDialogOpen}
        onOpenChange={setIsWhatsappDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>WhatsApp Contact</DialogTitle>
            <DialogDescription>
              <div className="text-center mt-4">
                <p className="mb-4">WhatsApp this number:</p>
                <a
                  href={`https://wa.me/${contactValue || ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-semibold text-green-600"
                >
                  {contactValue}
                </a>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Replace pagination UI with new component */}
      <div className="mt-8">
        <Pagination
          currentPage={Number(searchParams.get("page") || 1)}
          totalPages={metadata.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
