"use client"

import Image from "next/image"
import Slider from "react-slick"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Import required CSS in your component
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
const CustomPrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <Button
      variant="outline"
      size="icon"
      className="absolute z-10 top-1/2 -translate-y-1/2 left-2"
      onClick={onClick}
    >
      <ChevronLeft />
    </Button>
  );
};

const CustomNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <Button
      variant="outline"
      size="icon"
      className="absolute z-10 top-1/2 -translate-y-1/2 right-2"
      onClick={onClick}
    >
      <ChevronRight />
    </Button>
  );
};

export default function FloorPlanCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <CustomNextArrow />, 
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          arrows: false,
        },
      },
    ],
  }

  const slides = [
    {
      title: "Get a bird's-eye-view of your next home with Floor Plans",
      description: "Easily visualise the layout of properties",
      image: "https://www.bayut.com/assets/floorPlanDesktop2x.a1b9ce977fbf3f97959e2ff004b731c3.webp",
      buttonText: "View now",
    },
    {
      title: "Explore Virtual Tours of Properties",
      description: "Take an immersive walkthrough from anywhere",
      image: "https://www.bayut.com/assets/floorPlanDesktop2x.a1b9ce977fbf3f97959e2ff004b731c3.webp",
      buttonText: "Start Tour",
    },
    {
      title: "Detailed Property Measurements",
      description: "Get accurate dimensions for every room",
      image: "https://www.bayut.com/assets/floorPlanDesktop2x.a1b9ce977fbf3f97959e2ff004b731c3.webp",
      buttonText: "Learn More",
    },
  ]

  return (
    <div className="relative w-full px-4 lg:px-16">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative rounded-lg">
            <div className="relative h-[200px] md:h-[200px] lg:h-[300px] w-full overflow-hidden rounded-lg">
              {/* Green gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-500/30 z-10 rounded-lg" />

              {/* Background image */}
              <Image
                src={slide.image || "/placeholder.svg"}
                alt="Floor plan visualization"
                fill
                className="object-cover rounded-lg"
                priority={index === 0}
              />

              {/* Content */}
              <div className="absolute inset-0 z-20 flex flex-col justify-center p-6 md:p-12 lg:p-16">
                <div className="max-w-2xl space-y-4">
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">{slide.title}</h2>
                  <p className="text-lg md:text-xl text-white/90">{slide.description}</p>
                  <Button variant="secondary" className="mt-4 group">
                    {slide.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

