import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FeatureCards() {
  const features = [
    {
      title: "TruEstimate™",
      description: "Find out how much your property is worth",
      image: "/images/service/iconTruEstimateCard.svg",
      href: "#",
      bgColor: "bg-[#e6f7f1]",
    },
    {
      title: "Search 2.0",
      description: "Find homes by drive time",
      image: "/images/service/iconCommuteCard.svg",
      href: "#",
      bgColor: "bg-[#e6f2ff]",
    },
    {
      title: "Map View",
      description: "Search for properties in preferred areas using a map",
      image: "/images/service/iconTruEstimateCard.svg",
      href: "#",
      bgColor: "bg-[#e8f7eb]",
    },
  ]

  return (
    <div className="container mx-auto py-12 px-4 lg:px-16">
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature, index) => (
          <Link key={index} href={feature.href}>
            <Card
              className={`relative border-none transition-transform hover:scale-105 h-56 ${feature.bgColor}`}
              style={{ backgroundImage: `url(${feature.image})`, backgroundSize: "contain", backgroundPosition: "right" , backgroundRepeat: "no-repeat" }}
            >
              <div className="absolute inset-0 bg-black/5 rounded-lg" /> 
              <CardHeader className="relative z-10 text-white">
                <CardTitle className="text-xl font-bold text-gray-700">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10  text-gray-700">
                <div className="text-gray-700 max-w-[60%]">
                  {feature.description}
                  <ArrowRight className="inline ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
