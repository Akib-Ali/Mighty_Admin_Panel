"use client";
import React, { useState } from 'react';
import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MessageSquare, MapPin, Info, Diamond, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";


export default function AgentDetailsPage() {
  const [activeTab, setActiveTab] = useState("properties");
  const [activePill, setActivePill] = useState("all");
  
  // Mock data based on the provided images
  const agentData = {
    name: "Logan Coppins",
    brnNumber: "64894",
    agency: "Dacha Real Estate",
    contact: {
      phone: "+971 50 123 4567",
      email: "logan@dacharealestate.com",
      whatsapp: "+971501234567"
    },
    languages: ["English"],
    expertise: ["Residential Sales", "Residential Leasing", "Off-Plan Sales"],
    serviceAreas: ["DAMAC Hills", "DAMAC Lagoons", "Jumeirah Golf Estates"],
    properties: {
      forSale: 7,
      forRent: 7,
      total: 14
    },
    experience: "4 years",
    badges: ["MWBroker™", "Quality Lister", "Responsive Broker"],
    bio: "With over four years of experience in the real estate industry, both in the UK and UAE, I bring a wealth of knowledge..."
  };

  // Helper components
  type FilterPillProps = {
    active: boolean;
    label: string;
    onClick: () => void;
  };
  
  const FilterPill = ({ active, label, onClick }: FilterPillProps) => {
    return (
      <button
        className={`px-4 py-1.5 rounded-full text-sm ${
          active ? "bg-primarytext-white" : "bg-gray-100 text-gray-700"
        }`}
        onClick={onClick}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto rounded-lg bg-gray-50 my-10">
      {/* Header Banner */}
      <div className="primary text-white p-3 flex justify-end items-center">
        <span className="text-lg font-semibold">MWBroker™</span>
      </div>
      
      {/* Agent Profile */}
      <div className="relative px-4 pt-4 pb-0 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          {/* Profile picture */}
          <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-2 border-white rounded-full absolute -top-16 left-4">
            <AvatarImage src="/images/avatar/3.jpg" alt={agentData.name} />
            <AvatarFallback className="text-2xl">
              {agentData.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="sm:pl-36 pt-8 w-full">
            {/* Agent info */}
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800">{agentData.name}</h2>
              <p className="text-yellow-800 mb-2">{agentData.agency}</p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge className="primary text-white hover:bg-primary">
                  MWBroker™
                </Badge>
                <Badge className="bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                  <Diamond size={14} /> Quality Lister
                </Badge>
                <Badge className="bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1">
                  <Bell size={14} /> Responsive Broker
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact buttons */}
        <div className="flex justify-end gap-2 my-4">
          <Button className="bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200">
            <Mail size={16} className="mr-2" />
            Email
          </Button>
          <Button className="bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200">
            <Phone size={16} className="mr-2" />
            Call
          </Button>
          <Button className="bg-green-50 hover:bg-green-100 text-green-600 border border-green-200">
            <MessageSquare size={16} className="mr-2" />
            WhatsApp
          </Button>
        </div>
      </div>
      
      {/* Tabs Navigation */}
      <div className="flex border   my-8">
        <div className="w-1/2">
          <Button 
            variant={activeTab === "properties" ? "default" : "ghost"}
            className={`w-full rounded-none h-12 text-base ${activeTab === "properties" ? "bg-primary hover:bg-primary" : "primary"}`}
            onClick={() => setActiveTab("properties")}
          >
            Active Properties
          </Button>
        </div>
        <div className="w-1/2">
          <Button 
            variant={activeTab === "about" ? "default" : "ghost"}
            className={`w-full rounded-none h-12 text-base ${activeTab === "about" ? "bg-primary hover:bg-primary" : "primary"}`}
            onClick={() => setActiveTab("about")}
          >
            About
          </Button>
        </div>
      </div>
      
      {/* Properties Tab Content */}
      {activeTab === "properties" && (
        <div className="p-4">
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
                  <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
              Showing 1 - 12 of {agentData.properties.total} Properties sorted by 
              <Button variant="ghost" size="sm" className="px-2 py-0 text-gray-700">
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
                  <span className="absolute top-6 left-6 bg-primary text-white px-2 py-1 rounded text-xs">Verified</span>
                  <img 
                    src="/images/demo/Luxury-Homes/Rectangle 22.png" 
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
                      <img src="/api/placeholder/16/16" alt="Bed" className="w-4 h-4" />
                      <span>4</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <img src="/api/placeholder/16/16" alt="Bath" className="w-4 h-4" />
                      <span>5</span>
                    </div>
                    <div className="text-gray-500 text-sm">
                      Area: 7,285 sqft
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 my-3">
                    <Badge variant="outline" className="text-xs border border-blue-200 bg-blue-50 text-blue-700">Upgraded</Badge>
                    <Badge variant="outline" className="text-xs border border-blue-200 bg-blue-50 text-blue-700">Single Row</Badge>
                    <Badge variant="outline" className="text-xs border border-blue-200 bg-blue-50 text-blue-700">Private Pool</Badge>
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
                    <Button size="sm" className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200">
                      <Mail size={14} className="mr-1" />
                      Email
                    </Button>
                    <Button size="sm" className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200">
                      <Phone size={14} className="mr-1" />
                      Call
                    </Button>
                    <Button size="sm" className="flex-1 bg-green-50 hover:bg-green-100 text-green-600 border border-green-200">
                      <MessageSquare size={14} />
                      Whats'app
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Additional property cards would go here */}
          </div>
        </div>
      )}
      
      {/* About Tab Content */}
      {activeTab === "about" && (
        <div className="p-4">
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-800">Language(s):</h3>
                  <p>{agentData.languages.join(", ")}</p>
                </div>
                
                <div>
                  <h3 className="font-bold text-gray-800">Expertise:</h3>
                  <p>
                    <span className="primary">{agentData.expertise[0]}</span>,{" "}
                    <span className="primary">{agentData.expertise[1]}</span>,{" "}
                    {agentData.expertise[2]}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-gray-800">Service Areas:</h3>
                  <p>
                    <span className="primary">{agentData.serviceAreas[0]}</span>,{" "}
                    <span className="primary">{agentData.serviceAreas[1]}</span>,{" "}
                    <span className="primary">{agentData.serviceAreas[2]}</span>
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-gray-800">Properties:</h3>
                  <p>
                    <span className="primary">For Sale ({agentData.properties.forSale})</span>,{" "}
                    <span className="primary">For Rent ({agentData.properties.forRent})</span>
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-gray-800">Description:</h3>
                  <p className="text-gray-700">
                    {agentData.bio}
                    <span className="text-primaryfont-medium cursor-pointer"> Read all</span>
                  </p>
                </div>
                
                <div className="flex items-center">
                  <h3 className="font-bold text-gray-800 mr-1">BRN</h3>
                  <Info size={16} className="text-blue-500 cursor-pointer" /> 
                  <span className="mx-1">:</span>
                  <p>{agentData.brnNumber}</p>
                </div>
                
                <div>
                  <h3 className="font-bold text-gray-800">Experience:</h3>
                  <p>{agentData.experience}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}