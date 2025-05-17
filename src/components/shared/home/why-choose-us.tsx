import Image from "next/image"
import type React from "react"
import { Building, Users, MapPin, Key, Wallet, Headphones } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeatureItem {
  title: string
  subtitle: string
  icon: React.ReactNode
  color: string
}

const WhyChooseUs = () => {
  // Features data
  const features: FeatureItem[] = [
    {
      title: "Property",
      subtitle: "Select",
      icon: <Building className="h-6 w-6 md:h-8 md:w-8" />,
      color: "bg-[#7B68EE]",
    },
    {
      title: "Team",
      subtitle: "Meet Our",
      icon: <Users className="h-6 w-6 md:h-8 md:w-8" />,
      color: "bg-[#E6A417]",
    },
    {
      title: "Visit",
      subtitle: "Site",
      icon: <MapPin className="h-6 w-6 md:h-8 md:w-8" />,
      color: "bg-[#F8B4B4]",
    },
    {
      title: "Property",
      subtitle: "Buy",
      icon: <Key className="h-6 w-6 md:h-8 md:w-8" />,
      color: "bg-[#F87171]",
    },
    {
      title: "Assistance",
      subtitle: "Loan",
      icon: <Wallet className="h-6 w-6 md:h-8 md:w-8" />,
      color: "bg-[#2DD4BF]",
    },
    {
      title: "Support",
      subtitle: "Customer",
      icon: <Headphones className="h-6 w-6 md:h-8 md:w-8" />,
      color: "bg-[#60A5FA]",
    },
  ]

  return (
    <div className="w-full bg-black py-8 md:py-16 px-4 md:px-8 relative overflow-hidden">
      {/* Desktop version - Image only */}
      <div className="hidden md:block">
        <Image
          src="/images/why-choose-us.svg"
          alt="why choose us"
          width={1000}
          height={600}
          className="w-full h-auto aspect-auto object-cover"
        />
      </div>

      {/* Mobile version - Static grid */}
      <div className=" md:hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              d="M10,10 C90,30 180,10 190,90 C200,170 110,190 30,170 C-50,150 -70,70 10,10 Z"
            />
            <path
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              d="M20,20 C100,40 190,20 200,100 C210,180 120,200 40,180 C-40,160 -60,80 20,20 Z"
            />
            <path
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              d="M30,30 C110,50 200,30 210,110 C220,190 130,210 50,190 C-30,170 -50,90 30,30 Z"
            />
          </svg>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-white text-2xl font-bold flex items-center justify-center gap-2">
          <span>
        <img
          src="/images/icons/heading-gold-left.png"
          alt="icon"
          className="w-6 h-6"
        />
      </span>
            Why Choose US
            <span>
        <img
          src="/images/icons/heading-gold-right.png"
          alt="icon"
          className="w-6 h-6"
        />
      </span>
          </h2>
        </div>

        {/* Features grid for mobile */}
        <div className="grid grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative mb-3">
                <div className={cn("w-16 h-16 rounded-full flex items-center justify-center", feature.color)}>
                  <div className="text-white">{feature.icon}</div>
                </div>
                <div className="absolute -inset-1.5 rounded-full border-2 border-[#F97316] opacity-70"></div>
              </div>
              <div className="text-center">
                <p className="text-white/70 text-xs">{feature.subtitle}</p>
                <h3 className="text-white text-sm font-bold">{feature.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WhyChooseUs

