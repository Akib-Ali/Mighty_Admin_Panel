"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CityTabs from "./CityTabs";
import PropertyCard from "./PropertyCard";
import { City, Property, PropertyType, PropertyStatus } from "@/types/property";


export default function PropertyCity() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCity, setSelectedCity] = useState<City>("Dubai");
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBedrooms, setMinBedrooms] = useState("");
  const [maxBedrooms, setMaxBedrooms] = useState("");
  const [minBathrooms, setMinBathrooms] = useState("");
  const [maxBathrooms, setMaxBathrooms] = useState("");
  const [propertyType, setPropertyType] = useState<PropertyType | "ALL">("ALL");
  const [propertyStatus, setPropertyStatus] = useState<PropertyStatus | "ALL">("ALL");
  const [category, setCategory] = useState("");

  // Fetch properties
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      
      try {
        // In a real implementation, you would use the actual API with filters
        // For now, we'll simulate the API call with mock data
        const response = await fetch(`/api/property/search?city=${selectedCity}`);
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [selectedCity]);

  const handleCityChange = (city: City) => {
    setSelectedCity(city);
  };

  const handleSearch = () => {
    // Build query parameters for API call
    const params = new URLSearchParams();
    
    if (category) params.append("category", category);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (minBedrooms) params.append("minBedrooms", minBedrooms);
    if (maxBedrooms) params.append("maxBedrooms", maxBedrooms);
    if (minBathrooms) params.append("minBathrooms", minBathrooms);
    if (maxBathrooms) params.append("maxBathrooms", maxBathrooms);
    if (propertyType) params.append("type", propertyType);
    if (propertyStatus) params.append("status", propertyStatus);
    params.append("city", selectedCity);
    
    // Update URL and refetch
    router.push(`/?${params?.toString()}`);
    
    // Actual API call would be here
    // For now we're relying on the useEffect to handle city changes
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Browse New Projects in the UAE</h1>
      
      {/* City Tabs */}
      <div className="mb-8">
        <CityTabs selectedCity={selectedCity} onChange={handleCityChange} />
      </div>
      
      {/* Filters - Mobile Collapsible */}
      <div className="lg:hidden mb-6">
        <details className="bg-slate-50 rounded-lg p-4">
          <summary className="font-medium cursor-pointer">
            Search Filters
          </summary>
          <div className="mt-4 space-y-4">
            <Input 
              placeholder="Category" 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Input 
                placeholder="Min Price" 
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <Input 
                placeholder="Max Price" 
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Input 
                placeholder="Min Bedrooms" 
                type="number"
                value={minBedrooms}
                onChange={(e) => setMinBedrooms(e.target.value)}
              />
              <Input 
                placeholder="Max Bedrooms" 
                type="number"
                value={maxBedrooms}
                onChange={(e) => setMaxBedrooms(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Input 
                placeholder="Min Bathrooms" 
                type="number"
                value={minBathrooms}
                onChange={(e) => setMinBathrooms(e.target.value)}
              />
              <Input 
                placeholder="Max Bathrooms" 
                type="number"
                value={maxBathrooms}
                onChange={(e) => setMaxBathrooms(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Select value={propertyType} onValueChange={(value) => setPropertyType(value as PropertyType | "ALL")}>
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Types</SelectItem>
                  <SelectItem value="BUY">Buy</SelectItem>
                  <SelectItem value="RENT">Rent</SelectItem>
                  <SelectItem value="SELL">Sell</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={propertyStatus} onValueChange={(value) => setPropertyStatus(value as PropertyStatus | "ALL")}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Status</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button className="w-full" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </details>
      </div>
      
      {/* Filters - Desktop */}
      <div className="hidden lg:block mb-8">
        <div className="bg-slate-50 rounded-lg p-6">
          <div className="grid grid-cols-4 gap-6">
            <div>
              <Input 
                placeholder="Category" 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mb-4"
              />
              <Input 
                placeholder="Min Price" 
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            
            <div>
              <Input 
                placeholder="Max Price" 
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="mb-4"
              />
              <Input 
                placeholder="Min Bedrooms" 
                type="number"
                value={minBedrooms}
                onChange={(e) => setMinBedrooms(e.target.value)}
              />
            </div>
            
            <div>
              <Input 
                placeholder="Max Bedrooms" 
                type="number"
                value={maxBedrooms}
                onChange={(e) => setMaxBedrooms(e.target.value)}
                className="mb-4"
              />
              <Input 
                placeholder="Min Bathrooms" 
                type="number"
                value={minBathrooms}
                onChange={(e) => setMinBathrooms(e.target.value)}
              />
            </div>
            
            <div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <Input 
                  placeholder="Max Bathrooms" 
                  type="number"
                  value={maxBathrooms}
                  onChange={(e) => setMaxBathrooms(e.target.value)}
                />
                <Button onClick={handleSearch}>
                  Search
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Select value={propertyType} onValueChange={(value) => setPropertyType(value as PropertyType | "ALL")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Types</SelectItem>
                    <SelectItem value="BUY">Buy</SelectItem>
                    <SelectItem value="RENT">Rent</SelectItem>
                    <SelectItem value="SELL">Sell</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={propertyStatus} onValueChange={(value) => setPropertyStatus(value as PropertyStatus | "ALL")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Status</SelectItem>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Property Listings */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <ScrollArea className="w-full whitespace-nowrap pb-6 container mx-auto">
            <div className="flex w-max space-x-6 max-w-5xl mx-auto">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
              {properties.length === 0 && (
                <div className="flex justify-center items-center w-full h-64">
                  <p className="text-gray-500">No properties found in {selectedCity}</p>
                </div>
              )}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          
          <div className="mt-8 flex justify-center">
            <Button variant="outline" className="bg-slate-50">
              View all new projects in {selectedCity}
            </Button>
          </div>
        </>
      )}
    </main>
  );
}