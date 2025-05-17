import Image from "next/image";
import { MapPin, Home, Maximize2, DoorClosed, Slice } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { PropertyServices } from "@/services/PropertyServices";

export default function LuxuryHomesPage() {
  const {
    data: properties = [],
    isLoading: loading,
    isError,
    error,
  } = useQuery({
    queryKey: ["primium-properties"],
    queryFn: async () => {
      const data = await PropertyServices.premiumProperty();
      // console.log(`premium-properties`, data?.data);
      return Array.isArray(data?.data) ? data?.data : [];
    },
    staleTime: 5 * 60 * 1000,
  });

  console.log(`premium-properties33`, properties);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="px-4 py-8 container mx-auto">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {properties?.slice(0, 4).map((property: any, index: number) => (
      <PropertyCard key={index} property={property?.property} />
    ))}
  </div>
</div>

  );
}

function PropertyCard({ property: property }: { property: any }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/for-sale/${property.id}`)}
      className="overflow-hidden cursor-pointer h-full border border-gray-200 rounded-lg shadow"
    >
      <div className="relative ">
        <div className="absolute left-2 top-2 bg-secondary text-white rounded-lg px-4  z-10 flex items-center gap-1"> 
          <span className="capitalize">{property.type}</span>
        </div>
        <div className="h-full w-full relative">
          <Image
            src={property.images[0]}
            alt={property.title}
            width={480}
            height={216}
            className="object-cover w-full h-48 rounded-t-lg"
            priority
          />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg">{property.title}</h3>
        <div className="flex items-center gap-1 text-gray-500 mt-1">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{property.location}</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">{property.specifications}</span>
          </div>
         {
          property.category && (
            <div className="flex items-center gap-2">
            <DoorClosed className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">{property.category}</span>
          </div>
          )
         }
          <div className="flex items-center gap-2">
            <Maximize2 className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">{property.size} Sqft</span>
          </div>
        </div>
        <div className="mt-4">
          <div className="bg-rose-800 text-white text-center py-2 px-4 rounded-md font-medium">
           AED {property.price} M
          </div>
        </div>
      </div>
    </div>
  );
}
