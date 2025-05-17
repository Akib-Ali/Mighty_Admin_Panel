import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

// Types
type LocationLink = {
  name: string;
  href: string;
};

type LocationSection = {
  title: string;
  locations: LocationLink[];
};

type PropertyCategory = {
  sections: LocationSection[];
};

// LocationLinks Component
const LocationLinks = ({ locations }: { locations: LocationLink[] }) => (
  <div className="flex flex-col space-y-2">
    {locations.map((location) => (
      <a
        key={location.name}
        href={location.href}
        className="text-rose-700  hover:underline"
      >
        {location.name}
      </a>
    ))}
  </div>
);

// LocationSection Component
const LocationSection = ({ section }: { section: LocationSection }) => (
  <div className="flex flex-col space-y-4 ">
    <h3 className="font-semibold text-gray-900">{section.title}</h3>
    <LocationLinks locations={section.locations} />
  </div>
);

// PropertyCategory Component
const PropertyCategorySection = ({ sections }: PropertyCategory) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
    {sections.map((section) => (
      <LocationSection key={section.title} section={section} />
    ))}
  </div>
);

// ViewAll Button Component
const ViewAllButton = () => (
  <div className="flex justify-end mt-4 border-b pb-6">
    <Button variant="ghost" className="text-gray-600">
      View all <ChevronDown className="ml-1 h-4 w-4" />
    </Button>
  </div>
);

// Main Component
const PropertySearch = () => {
  const saleApartmentData = {
    sections: [
      {
        title: "Dubai Apartments for Sale",
        locations: [
          { name: "Dubai Marina", href: "#sale" },
          { name: "Jumeirah Lake Towers (JLT)", href: "#sale" },
          { name: "Downtown Dubai", href: "#sale" },
          { name: "Business Bay", href: "#sale" },
          { name: "Palm Jumeirah", href: "#sale" },
        ],
      },
      {
        title: "Abu Dhabi Apartments for Sale",
        locations: [
          { name: "Al Reem Island", href: "#sale" },
          { name: "Al Reef", href: "#sale" },
          { name: "Al Ghadeer", href: "#sale" },
          { name: "Al Raha Beach", href: "#sale" },
          { name: "Saadiyat Island", href: "#sale" },
        ],
      },
      {
        title: "Apartments in other Emirates for Sale",
        locations: [
          { name: "Sharjah", href: "#sale" },
          { name: "Ajman", href: "#sale" },
          { name: "Ras Al Khaimah", href: "#sale" },
          { name: "Al Sawan", href: "#sale" },
          { name: "Al Nahda (Sharjah)", href: "#sale" },
        ],
      },
    ],
  };

  const saleVillaData = {
    sections: [
      {
        title: "Dubai Villas for Sale",
        locations: [
          { name: "Arabian Ranches", href: "#sale" },
          { name: "Dubailand", href: "#sale" },
          { name: "Dubai Hills Estate", href: "#sale" },
          { name: "Palm Jumeirah", href: "#sale" },
          { name: "The Springs", href: "#sale" },
        ],
      },
      {
        title: "Abu Dhabi Villas for Sale",
        locations: [
          { name: "Al Reef", href: "#sale" },
          { name: "Yas Island", href: "#sale" },
          { name: "Saadiyat Island", href: "#sale" },
          { name: "Al Raha Gardens", href: "#sale" },
          { name: "Mohammed Bin Zayed City", href: "#sale" },
        ],
      },
      {
        title: "Villas in other Emirates for Sale",
        locations: [
          { name: "Sharjah", href: "#sale" },
          { name: "Ajman", href: "#sale" },
          { name: "Ras Al Khaimah", href: "#sale" },
          { name: "Ajman Uptown", href: "#sale" },
          { name: "Sharjah Waterfront City", href: "#sale" },
        ],
      },
    ],
  };

  const rentApartmentData = {
    sections: [
      {
        title: "Dubai Apartments for Rent",
        locations: [
          { name: "Dubai Marina", href: "#/rent" },
          { name: "Jumeirah Lake Towers (JLT)", href: "#/rent" },
          { name: "Downtown Dubai", href: "#/rent" },
          { name: "Business Bay", href: "#/rent" },
          { name: "Palm Jumeirah", href: "#/rent" },
        ],
      },
      {
        title: "Abu Dhabi Apartments for Rent",
        locations: [
          { name: "Al Reem Island", href: "#/rent" },
          { name: "Al Reef", href: "#/rent" },
          { name: "Al Ghadeer", href: "#/rent" },
          { name: "Al Raha Beach", href: "#/rent" },
          { name: "Saadiyat Island", href: "#/rent" },
        ],
      },
      {
        title: "Apartments for Rent in other Emirates",
        locations: [
          { name: "Sharjah", href: "#/rent" },
          { name: "Ajman", href: "#/rent" },
          { name: "Ras Al Khaimah", href: "#/rent" },
          { name: "Al Sawan", href: "#/rent" },
          { name: "Al Nahda (Sharjah)", href: "#/rent" },
        ],
      },
    ],
  };

  const rentVillaData = {
    sections: [
      {
        title: "Dubai Villas for Rent",
        locations: [
          { name: "Arabian Ranches", href: "#/rent" },
          { name: "Dubailand", href: "#/rent" },
          { name: "Dubai Hills Estate", href: "#/rent" },
          { name: "Palm Jumeirah", href: "#/rent" },
          { name: "The Springs", href: "#/rent" },
        ],
      },
      {
        title: "Abu Dhabi Villas for Rent",
        locations: [
          { name: "Al Reef", href: "#/rent" },
          { name: "Yas Island", href: "#/rent" },
          { name: "Saadiyat Island", href: "#/rent" },
          { name: "Al Raha Gardens", href: "#/rent" },
          { name: "Mohammed Bin Zayed City", href: "#/rent" },
        ],
      },
      {
        title: "Villas for Rent in other Emirates",
        locations: [
          { name: "Sharjah", href: "#/rent" },
          { name: "Ajman", href: "#/rent" },
          { name: "Ras Al Khaimah", href: "#/rent" },
          { name: "Ajman Uptown", href: "#/rent" },
          { name: "Sharjah Waterfront City", href: "#/rent" },
        ],
      },
    ],
  };

  return (
    <div className="container mx-auto p-6 px-4 lg:px-16">
      <h2 className="lg:text-3xl text-2xl text-center font-bold mb-6">Popular searches in the UAE</h2>
      
      <Tabs defaultValue="sale" className="w-full">
        <TabsList>
          <TabsTrigger value="sale"><span className='font-semibold'>For Sale</span></TabsTrigger>
          <TabsTrigger value="rent"><span className='font-semibold'>To Rent</span></TabsTrigger>
        </TabsList>

        <TabsContent value="sale" className="mt-6">
          <PropertyCategorySection sections={saleApartmentData.sections} />
          <ViewAllButton />
          <div className="mt-8">
            <PropertyCategorySection sections={saleVillaData.sections} />
            <ViewAllButton />
          </div>
        </TabsContent>

        <TabsContent value="rent" className="mt-6">
          <PropertyCategorySection sections={rentApartmentData.sections} />
          <ViewAllButton />
          <div className="mt-8">
            <PropertyCategorySection sections={rentVillaData.sections} />
            <ViewAllButton />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertySearch;