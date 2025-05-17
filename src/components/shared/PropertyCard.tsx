"use client";
// src/components/PropertyCard.tsx
import React from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface PropertyCardProps {
  property: any;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const router = useRouter();
  if (!property) {
    return null;
  }

  const handleClick = (property:any) => {
    // Handle click event, e.g., navigate to property details page
    router.push(`/for-sale/${property.id}`);
  };
  // console.log("PropertyCard", property);
  return (
    <Card
      className="w-72 md:w-80 flex-shrink-0 overflow-hidden px-0 rounded-xl hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={()=> handleClick(property)}
    >
      <div className="relative h-48 w-full ">
        <Image
          src={property.images[0] || "/placeholder.png"}
          alt={property.title}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <CardContent className="pt-4">
        <h3 className="text-lg font-semibold">{property.title}</h3>
        <div className="flex justify-between my-2">
          <p className="text-gray-600 mb-2 ">{property.category}</p>
        </div>

        <div className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin size={14} className="mr-1" />
          <span className="truncate">{property.location}</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-xs text-gray-500">Launch Price</p>
            <p className="font-semibold text-primary">
              AED {formatCurrency(property.launchPrice)}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-xs text-gray-500">Hand Over Price</p>
            <p className="font-semibold text-primary">
              AED {formatCurrency(property.handOverPrice)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
