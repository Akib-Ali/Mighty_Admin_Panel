"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Mail,
  MessageSquare,
  MapPin,
  Info,
  Clock,
  Users,
  Building,
  Home,
  ExternalLink,
  BedDouble,
  Bath,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function AgencyDetailsPage() {
  // Mock data for the agency
  const agencyData = {
    name: "Dacha Real Estate",
    logo: "/images/logo/dacha-logo.png",
    establishedYear: 2015,
    contact: {
      phone: "+971 4 555 1234",
      email: "info@dacharealestate.com",
      whatsapp: "+971555551234",
      address: "Business Bay, Dubai, UAE",
    },
    socialMedia: {
      instagram: "dacharealestate",
      facebook: "dacharealestate",
      linkedin: "dacha-real-estate",
    },
    reraDeveloperId: "12345",
    reraAgencyId: "67890",
    mapLink: "https://maps.google.com",
    workingHours: {
      weekdays: "9:00 AM - 6:00 PM",
      saturday: "10:00 AM - 4:00 PM",
      sunday: "Closed",
    },
    totalAgents: 34,
    properties: {
      forSale: 128,
      forRent: 95,
      total: 223,
      offPlan: 47,
    },
    about:
      "Dacha Real Estate is a premier real estate agency in Dubai specializing in luxury properties, off-plan developments, and investment opportunities. With a team of experienced professionals, we provide personalized service to help clients find their perfect property or maximize their investment returns.",
    featuredAgents: [
      {
        id: 1,
        name: "Logan Coppins",
        image: "/images/avatar/3.jpg",
        brnNumber: "64894",
        properties: 14,
        specialization: "Residential Sales",
      },
      {
        id: 2,
        name: "Sarah Johnson",
        image: "/images/avatar/2.jpg",
        brnNumber: "72341",
        properties: 12,
        specialization: "Off-Plan Sales",
      },
      {
        id: 3,
        name: "Ahmad Hassan",
        image: "/images/avatar/1.jpg",
        brnNumber: "58912",
        properties: 18,
        specialization: "Commercial Leasing",
      },
    ],
  };

  // Mock agent data (kept from original)
  const agentData = {
    name: "Logan Coppins",
    brnNumber: "64894",
    agency: "Dacha Real Estate",
    contact: {
      phone: "+971 50 123 4567",
      email: "logan@dacharealestate.com",
      whatsapp: "+971501234567",
    },
    languages: ["English"],
    expertise: ["Residential Sales", "Residential Leasing", "Off-Plan Sales"],
    serviceAreas: ["DAMAC Hills", "DAMAC Lagoons", "Jumeirah Golf Estates"],
    properties: {
      forSale: 7,
      forRent: 7,
      total: 14,
    },
    experience: "4 years",
    badges: ["MWBroker™", "Quality Lister", "Responsive Broker"],
    bio: "With over four years of experience in the real estate industry, both in the UK and UAE, I bring a wealth of knowledge...",
  };

  return (
    <div className="w-full max-w-7xl mx-auto rounded-lg bg-gray-50 my-10">
      {/* Agency Header Banner */}
      <div className="bg-primary text-white p-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Avatar className="h-16 w-16 mr-4 bg-white p-1 rounded">
              <AvatarImage src={agencyData.logo} alt={agencyData.name} />
              <AvatarFallback className="bg-white text-primary text-xl">
                {agencyData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{agencyData.name}</h1>
              <p className="text-sm">
                Established {agencyData.establishedYear}
              </p>
              <div className="flex mt-1">
                <Badge className="bg-white text-primary hover:bg-white mr-2">
                  RERA {agencyData.reraAgencyId}
                </Badge>
                <Badge className="bg-yellow-400 text-primary hover:bg-yellow-300">
                  Premium Agency
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button className="bg-white text-primary hover:bg-gray-100">
              <Phone size={16} className="mr-2" />
              Call
            </Button>
            <Button className="bg-white text-primary hover:bg-gray-100">
              <Mail size={16} className="mr-2" />
              Email
            </Button>
            <Button className="bg-white text-primary hover:bg-gray-100">
              <MapPin size={16} className="mr-2" />
              Get Directions
            </Button>
          </div>
        </div>
      </div>

      {/* Agency Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white border-b">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
          <h3 className="text-xl font-bold text-gray-800">
            {agencyData.totalAgents}
          </h3>
          <p className="text-sm text-gray-600">Total Agents</p>
        </div>

        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <Building className="h-6 w-6 mx-auto mb-2 text-primary" />
          <h3 className="text-xl font-bold text-gray-800">
            {agencyData.properties.total}
          </h3>
          <p className="text-sm text-gray-600">Total Properties</p>
        </div>

        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <Home className="h-6 w-6 mx-auto mb-2 text-primary" />
          <h3 className="text-xl font-bold text-gray-800">
            {agencyData.properties.forSale}
          </h3>
          <p className="text-sm text-gray-600">For Sale</p>
        </div>

        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <Key className="h-6 w-6 mx-auto mb-2 text-primary" />
          <h3 className="text-xl font-bold text-gray-800">
            {agencyData.properties.forRent}
          </h3>
          <p className="text-sm text-gray-600">For Rent</p>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="properties" className="w-full">
        <TabsList className="grid grid-cols-4 bg-gray-100 rounded-none border my-10  h-15">
          <TabsTrigger
            value="properties"
            className="py-4 rounded-none data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Properties
          </TabsTrigger>
          <TabsTrigger
            value="agents"
            className="py-4 rounded-none data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Agents
          </TabsTrigger>
          <TabsTrigger
            value="about"
            className="py-4 rounded-none data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            About
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="py-4 rounded-none data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Reviews
          </TabsTrigger>
        </TabsList>

        {/* Properties Tab Content */}
        <TabsContent value="properties" className="p-4">
          {/* Filter Section */}
          <div className="mb-4">
            <div className="flex flex-col">
              <div className="flex gap-2 mb-3 flex-wrap">
                <Button
                  variant="outline"
                  className="border border-gray-300 bg-white flex-1 sm:flex-none text-gray-700 justify-between"
                >
                  All <span className="ml-1">▼</span>
                </Button>

                <div className="relative flex-1">
                  <MapPin
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    placeholder="Enter location"
                    className="pl-10 border-gray-300 bg-white"
                  />
                </div>
              </div>

              <div className="flex gap-2 mb-3 flex-wrap">
                <Button
                  variant="outline"
                  className="border border-gray-300 bg-white flex-1 sm:flex-none text-gray-700 justify-between"
                >
                  Any Type <span className="ml-1">▼</span>
                </Button>

                <Button
                  variant="outline"
                  className="border border-gray-300 bg-white flex-1 sm:flex-none text-gray-700 justify-between"
                >
                  Beds & Baths <span className="ml-1">▼</span>
                </Button>

                <Button
                  variant="outline"
                  className="border border-gray-300 bg-white flex-1 sm:flex-none text-gray-700 justify-between"
                >
                  Price (AED) <span className="ml-1">▼</span>
                </Button>
              </div>
            </div>

            <div className="text-sm text-gray-500 my-2">
              Showing 1 - 12 of {agencyData.properties.total} Properties sorted
              by
              <Button
                variant="ghost"
                size="sm"
                className="px-2 py-0 text-gray-700"
              >
                Popular <span className="ml-1">▼</span>
              </Button>
            </div>
          </div>

          {/* Property Cards */}
          <div className="space-y-4">
            <Card className="overflow-hidden rounded-md border border-gray-200">
              <div className="flex flex-col sm:flex-row">
                {/* Property Image */}
                <div className="relative w-full sm:w-2/5">
                  <span className="absolute top-6 left-6 bg-primary text-white px-2 py-1 rounded text-xs">
                    Verified
                  </span>
                  <img
                    src="/images/demo/Luxury-Homes/Rectangle 23.png"
                    alt="Villa Property"
                    className="w-full h-64 sm:h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 flex gap-1">
                    <span className="bg-white w-2 h-2 rounded-full"></span>
                    <span className="bg-white/50 w-2 h-2 rounded-full"></span>
                    <span className="bg-white/50 w-2 h-2 rounded-full"></span>
                    <span className="bg-white/50 w-2 h-2 rounded-full"></span>
                    <span className="bg-white/50 w-2 h-2 rounded-full"></span>
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-4 w-full sm:w-3/5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">AED 560,000</h3>
                      <span className="text-gray-500">Yearly</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 my-2">
                    <span className="font-medium">Villa</span>
                    <div className="flex items-center gap-1">
                      <BedDouble className="w-4 h-4" />
                      <span>4</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4" />

                      <span>5</span>
                    </div>
                    <div className="text-gray-500 text-sm">
                      Area: 7,285 sqft
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 my-3">
                    <Badge
                      variant="outline"
                      className="text-xs border border-blue-200 bg-blue-50 text-blue-700"
                    >
                      Upgraded
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-xs border border-blue-200 bg-blue-50 text-blue-700"
                    >
                      Single Row
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-xs border border-blue-200 bg-blue-50 text-blue-700"
                    >
                      Private Pool
                    </Badge>
                  </div>

                  <div className="flex items-center text-gray-700 mb-3 text-sm">
                    <MapPin size={14} className="mr-1" />
                    <span>District 9, Jumeirah Park, Dubai</span>
                  </div>

                  <div className="text-xs text-gray-500 border-t pt-2 mb-3">
                    <div className="flex items-center gap-1">
                      <span className="bg-green-500 h-2 w-2 rounded-full"></span>
                      Property authenticity was validated on 24th of April
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200"
                    >
                      <Mail size={14} className="mr-1" />
                      Email
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200"
                    >
                      <Phone size={14} className="mr-1" />
                      Call
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-green-50 hover:bg-green-100 text-green-600 border border-green-200"
                    >
                      <MessageSquare size={14} />
                      Whats'app
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Additional property cards would go here */}
          </div>
        </TabsContent>

        {/* Agents Tab Content */}
        <TabsContent value="agents" className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agencyData.featuredAgents.map((agent) => (
              <Card key={agent.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative bg-primary h-20">
                    <Avatar className="absolute -bottom-8 left-4 h-16 w-16 border-2 border-white">
                      <AvatarImage src={agent.image} alt={agent.name} />
                      <AvatarFallback className="text-xl">
                        {agent.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="pt-10 pb-4 px-4">
                    <h3 className="text-lg font-bold">{agent.name}</h3>
                    <p className="text-gray-500 text-sm mb-2">
                      {agent.specialization}
                    </p>

                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Info size={14} className="mr-1" />
                      <span>BRN: {agent.brnNumber}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <Building size={14} className="mr-1" />
                      <span>{agent.properties} Properties</span>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/agents/${agent.id}`}
                        className="flex-1 bg-primary text-white rounded-lg px-4 py-1 text-center"
                      >
                        View Profile
                      </Link>
                      <Button
                        size="sm"
                        className="flex-1 bg-blue-50 text-blue-600 border border-blue-200"
                      >
                        <Phone size={14} className="mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button className="bg-primary text-white">
              View All {agencyData.totalAgents} Agents
            </Button>
          </div>
        </TabsContent>

        {/* About Tab Content */}
        <TabsContent value="about" className="p-4">
          <Card className="border border-gray-200 bg-white">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">
                About {agencyData.name}
              </h2>
              <p className="text-gray-700 mb-6">{agencyData.about}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone size={16} className="text-primary mr-2" />
                      <span>{agencyData.contact.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail size={16} className="text-primary mr-2" />
                      <span>{agencyData.contact.email}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare size={16} className="text-primary mr-2" />
                      <span>{agencyData.contact.whatsapp}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin size={16} className="text-primary mr-2" />
                      <span>{agencyData.contact.address}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 mb-3">
                    Agency Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Info size={16} className="text-primary mr-2" />
                      <span>RERA Agency ID: {agencyData.reraAgencyId}</span>
                    </div>
                    <div className="flex items-center">
                      <Info size={16} className="text-primary mr-2" />
                      <span>
                        RERA Developer ID: {agencyData.reraDeveloperId}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="text-primary mr-2" />
                      <div>
                        <p>Mon-Fri: {agencyData.workingHours.weekdays}</p>
                        <p>Sat: {agencyData.workingHours.saturday}</p>
                        <p>Sun: {agencyData.workingHours.sunday}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-bold text-gray-800 mb-3">Location</h3>
                <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center h-60">
                  <div className="text-center">
                    <MapPin size={32} className="mx-auto mb-2 text-primary" />
                    <p className="mb-2">Business Bay, Dubai, UAE</p>
                    <Button className="bg-primary text-white flex items-center">
                      <ExternalLink size={14} className="mr-1" />
                      Open in Google Maps
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reviews Tab Content */}
        <TabsContent value="reviews" className="p-4">
          <Card className="border border-gray-200 bg-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Customer Reviews</h2>
                <Button className="bg-primary text-white">
                  Write a Review
                </Button>
              </div>

              <div className="flex items-center mb-6">
                <div className="text-3xl font-bold mr-4">4.8</div>
                <div className="flex text-yellow-400 text-xl mr-4">★★★★★</div>
                <div className="text-sm text-gray-500">
                  Based on 127 reviews
                </div>
              </div>

              <div className="space-y-4">
                {/* Sample review */}
                <div className="border-b pb-4">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-2">
                        <AvatarFallback>SM</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-bold">Sarah M.</h4>
                        <p className="text-sm text-gray-500">March 15, 2025</p>
                      </div>
                    </div>
                    <div className="flex text-yellow-400">★★★★★</div>
                  </div>
                  <p>
                    Working with Dacha Real Estate was a pleasure. They helped
                    me find my dream home in DAMAC Hills at a great price. The
                    team was professional and responsive throughout the entire
                    process.
                  </p>
                </div>

                {/* More reviews would go here */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Key(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  );
}
