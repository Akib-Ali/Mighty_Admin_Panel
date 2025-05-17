"use client";

import {  useState } from "react";
import {  useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CityTabs from "./CityTabs";
import PropertyCard from "./PropertyCard";
import { City} from "@/types/property";
import { PropertyServices } from "@/services/PropertyServices";
import { useQuery } from "@tanstack/react-query";

export default function PropertyCityByDefault() {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState<City>("Dubai");

  const {
    data: properties = [],
    isLoading: loading,
    isError,
    error,
  } = useQuery({
    queryKey: ["properties", selectedCity],
    queryFn: async () => {
      const data = await PropertyServices.propertySearchCity(selectedCity);
      return Array.isArray(data?.property?.data) ? data.property.data : [];
    },
    staleTime: 5 * 60 * 1000
  });

  if (isError) return <p>Error fetching properties: {String(error)}</p>;

  const handleCityChange = (city: City) => {
    setSelectedCity(city);
  };

  const handleClick = () => {
    router.push(`/for-sale/1`);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Browse New Projects in the UAE
      </h1>
      {/* City Tabs */}
      <div className="mb-8">
        <CityTabs selectedCity={selectedCity} onChange={handleCityChange} />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          {" "}
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>{" "}
        </div>
      ) : (
        <>
          {" "}
          <ScrollArea className="w-full whitespace-nowrap pb-6">
            {" "}
            <div className="flex mx-auto w-max gap-6">
              {" "}
              {Array.isArray(properties) &&
                properties?.map((property, index) => (
                  <div className="max-w-6xl" key={index}>
                    {" "}
                    <PropertyCard key={index} property={property} />
                  </div>
                ))}
              {(!Array.isArray(properties) || properties.length === 0) && (
                <div className="flex justify-center items-center   w-full h-64">
                  {" "}
                  <p className="text-gray-500 text-center">
                    No properties found in {selectedCity}
                  </p>{" "}
                </div>
              )}{" "}
            </div>{" "}
            <ScrollBar orientation="horizontal" />{" "}
          </ScrollArea>{" "}
          <div className="mt-8 flex justify-center">
            {" "}
            <Button
              onClick={handleClick}
              variant="outline"
              className="bg-slate-50"
            >
              {" "}
              View all new projects in {selectedCity}{" "}
            </Button>{" "}
          </div>{" "}
        </>
      )}{" "}
    </main>
  );
}
