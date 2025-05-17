"use client";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LeaveYourDetails from "@/components/shared/leave-your-details";

export default function AgentPortal() {
  const agents = [
    {
      id: 1,
      name: "Lathin Danoun",
      location: "Dubai",
      languages: ["Arabic"],
      totalSales: 15,
      totalRent: 28,
      image: "/images/agents/1.png"
    },
    // Repeat the same structure for other agents (2-12)
    ...Array(11).fill(null).map((_, index) => ({
      id: index + 2,
      name: "Lathin Danoun",
      location: "Dubai",
      languages: ["Arabic"],
      totalSales: 15,
      totalRent: 28,
      image: "/images/agents/1.png"
    }))
  ];

  return (
    <div className="container mx-auto flex flex-col min-h-screen">
      {/* Hero Section */}
    <div className="relative w-full h-[400px]">
        <Image 
          src="/images/agencies/1.png" 
          alt="Real Estate Agencies" 
          fill 
          className="object-cover" 
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="container text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Turning Dreams into Addresses</h1>
            <div className="flex items-center justify-center gap-2 text-lg">
              <Link href="/" className="hover:text-light">HOME</Link>
              <span>»</span>
              <span className="">Agent</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Select defaultValue="buy">
              <SelectTrigger>
                <SelectValue placeholder="Buy/Residential" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buy">Buy/Residential</SelectItem>
                <SelectItem value="rent">Rent</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <Input
                type="text"
                placeholder="Enter Location"
                className="pl-10"
              />
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>

            <div className="relative">
              <Input
                type="text"
                placeholder="Agent Name"
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Enter Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="arabic">Arabic</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-[#AB213B] hover:bg-[#AB213B]/90 text-white">
              Find
            </Button>
          </div>
        </div>
      </div>

      {/* Agents Section */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-[#0B3558]">MW Realty</h2>
              <p className="text-gray-600">
                Explore agents with a proven track record of high response rates and authentic listings.
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="border-[#AB213B] text-[#AB213B]">
                Dubai
              </Button>
              <Button variant="outline" className="border-gray-300">
                Abu Dhabi
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-white rounded-lg shadow-sm border p-4">
                <Link href={`/agents/${agent.id}`} className="flex items-start gap-4">
                  <div className="relative w-24 h-24">
                    <Image
                      src={agent.image}
                      alt={agent.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{agent.name}</h3>
                    <p className="text-gray-600 text-sm">
                      Serves in {agent.location}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Speaks: {agent.languages.join(", ")} + more
                    </p>
                    <div className="flex gap-4 mt-2">
                      <div className="text-sm">
                        <span className="font-semibold">{agent.totalSales}</span> Sale
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold">{agent.totalRent}</span> Rent
                      </div>
                    </div>
                  </div>
                  <Image
                    src="/images/Realty-Logo.png"
                    alt="MW Realty"
                    width={80}
                    height={30}
                    className="object-contain"
                  />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="link" className="text-[#AB213B]">
              View All
            </Button>
          </div>
        </div>
      </div>

    
 <LeaveYourDetails />
       
      
    </div>
  );
} 