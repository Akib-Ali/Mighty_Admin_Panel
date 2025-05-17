"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { City } from "@/types/property";

interface CityTabsProps {
  selectedCity: City;
  onChange: (city: City) => void;
}

export default function CityTabs({ selectedCity, onChange }: CityTabsProps) {
  const cities: City[] = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Umm Al Quwain"];

  return (
    <div className="border rounded-lg p-1 flex flex-wrap gap-2 justify-center max-w-max mx-auto">
      {cities?.map((city) => (
        <button
          key={city}
          onClick={() => onChange(city)}
          className={cn(
            "px-4 py-2  text-sm md:text-base rounded-md transition-colors flex-grow sm:flex-grow-0",
            selectedCity === city
              ? "bg-red-100 text-red-600 font-medium"
              : "text-gray-700 hover:bg-gray-100"
          )}
        >
          {city}
        </button>
      ))}
    </div>
  );
}
