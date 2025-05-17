"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { LeadsFormServices } from "@/services/LeadsFormServices";
import { toast } from "sonner";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "+91",
    phone: "",
    message: "",
  });

  console.log("Form Data:", formData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: (data: any) => LeadsFormServices.postLeadsForm(data),
    onSuccess: () => {
      toast.success("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        country: "+91",
        phone: "",
        message: "",
      });
    },
    onError: () => {
      toast.error("Failed to send message");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submissionData = {
      fullname: formData.name,
      email: formData.email,
      phone: `${formData.country}${formData.phone}`,
      message: formData.message,
    };

    mutation.mutate(submissionData);
  };

  return (
    <div className="relative">
      <div className="absolute inset-0" />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-lg p-6 backdrop-blur-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="bg-transparent border border-gray-300 text-white placeholder:text-gray-400"
              />
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="bg-transparent border border-gray-300 text-white placeholder:text-gray-400"
              />
              <div className="flex">
                <select
                  name="country"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      country: e.target.value,
                    }))
                  }
                  className="w-24 bg-transparent border border-gray-300 bg-primary text-white px-3 py-1 rounded-l-md"
                >
                  <option value="+91" className="bg-black">
                    +91
                  </option>
                  <option value="+971" className="bg-black">
                    +971
                  </option>
                </select>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Mobile No."
                  className="flex-1 bg-transparent border border-gray-300 text-white placeholder:text-gray-400 rounded-l-none"
                />
              </div>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                className="bg-transparent border border-gray-300 text-white placeholder:text-gray-400 min-h-[120px]"
              />
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="bg-[#AB213B] hover:bg-[#96192F] text-white px-6 py-2"
              >
                {mutation.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Location Details */}
          <div className="backdrop-blur-sm rounded-lg p-6 border">
            <h3 className="text-xl font-semibold text-white mb-6">
              Location Details
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-[#FFB800] font-medium mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Address
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  243, Tower-4, Assotech Business Cresterra, Sector 135, Noida,
                  Uttar Pradesh 201308
                </p>
              </div>
              <div>
                <h4 className="text-[#FFB800] font-medium mb-2 flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Phone
                </h4>
                <p className="text-white text-sm">+91 9310-520-930</p>
              </div>
              <div>
                <h4 className="text-[#FFB800] font-medium mb-2 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email
                </h4>
                <p className="text-white text-sm">Info@Company.Com</p>
              </div>
              <div>
                <h4 className="text-[#FFB800] font-medium mb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Working Hour
                </h4>
                <p className="text-white text-sm">24/7 Working</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
