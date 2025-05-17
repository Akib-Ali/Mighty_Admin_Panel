"use client";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function ContactUs() {
  const contactInfo = {
    phone: [
      { label: "Sales", number: "+971 4 876 5432" },
      { label: "Support", number: "+971 4 876 5433" },
      { label: "WhatsApp", number: "+971 50 123 4567" }
    ],
    email: [
      { label: "General Inquiries", address: "info@mwrealty.ae" },
      { label: "Sales", address: "sales@mwrealty.ae" },
      { label: "Support", address: "support@mwrealty.ae" }
    ],
    offices: [
      {
        city: "Dubai",
        address: "Business Bay, Churchill Tower, Office 2408",
        hours: "Mon - Sat: 9:00 AM - 6:00 PM"
      },
      {
        city: "Abu Dhabi",
        address: "Al Reem Island, Sky Tower, Office 1506",
        hours: "Mon - Sat: 9:00 AM - 6:00 PM"
      }
    ]
  };

  return (
    <div className="container mx-auto flex flex-col min-h-screen">
      {/* Hero Section */}
    <div className="relative w-full h-[400px]">
        <Image 
          src="/images/contact/5.jpg" 
          alt="Real Estate " 
          fill 
          className="object-cover" 
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="container text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <div className="flex items-center justify-center gap-2 text-lg">
              <Link href="/" className="hover:text-light">HOME</Link>
              <span>»</span>
              <span className="">Contact Us</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Have questions about our properties or services? Our team is here to help you.
              </p>
            </div>

            {/* Phone Numbers */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Phone Numbers</h3>
              <div className="space-y-3">
                {contactInfo.phone.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-[#AB213B]" />
                    <div>
                      <p className="text-sm text-gray-600">{item.label}</p>
                      <p className="font-medium">{item.number}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Email Addresses */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Email Addresses</h3>
              <div className="space-y-3">
                {contactInfo.email.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-[#AB213B]" />
                    <div>
                      <p className="text-sm text-gray-600">{item.label}</p>
                      <p className="font-medium">{item.address}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Office Locations */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Office Locations</h3>
              <div className="space-y-6">
                {contactInfo.offices.map((office, index) => (
                  <div key={index} className="flex gap-3">
                    <MapPin className="h-5 w-5 text-[#AB213B] flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">{office.city} Office</h4>
                      <p className="text-gray-600 mt-1">{office.address}</p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{office.hours}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="First Name"
                />
                <Input
                  type="text"
                  placeholder="Last Name"
                />
              </div>
              <Input
                type="email"
                placeholder="Email Address"
              />
              <Input
                type="tel"
                placeholder="Phone Number"
              />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Inquiry Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales Inquiry</SelectItem>
                  <SelectItem value="rental">Rental Inquiry</SelectItem>
                  <SelectItem value="property">Property Management</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full border rounded-md p-2"
              />
              <Button className="w-full bg-[#AB213B] hover:bg-[#AB213B]/90 text-white">
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-[400px] relative mt-12">
        <Image
          src="/images/contact/map.png"
          alt="Office Location Map"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Button className="bg-white text-[#AB213B] hover:bg-white/90">
            View on Google Maps
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      
    </div>
  );
} 