"use client"
import React from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Import required CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PropertyCard: React.FC<{ image: string; title: string }> = ({ image, title }) => (
  <Card className="mx-2 overflow-hidden">
    <div className="relative h-48 overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
    <CardContent className="p-4">
      <h5 className="text-gray-800">{title}</h5>
    </CardContent>
  </Card>
);


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

const PropertyCarousel = () => {
  const properties = [
    { title: "Setting the right sale price for your Dubai property", image: "/images/service/1.webp" },
    { title: "Most popular bed types for high ROI in Abu Dhabi", image: "/images/service/2.webp" },
    { title: "The Island by Wasl: Dubai's Vegas-inspired mega project", image: "/images/service/3.webp" },
    { title: "Hotels in Dubai with monthly rental options from AED 1,000", image: "/images/service/1.webp" },
    { title: "Most popular bed types for high ROI in Abu Dhabi", image: "/images/service/2.webp" },
    { title: "The Island by Wasl: Dubai's Vegas-inspired mega project", image: "/images/service/3.webp" },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />, 
    prevArrow: <CustomPrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="relative w-full container mx-auto  py-6 px-4 lg:px-16">
      <h2 className="lg:text-3xl text-2xl text-center font-bold text-gray-800 my-4">
      Discover more about the UAE real estate market
      </h2>
      <Slider {...settings}>
        {properties.map((property, index) => (
          <PropertyCard key={index} image={property.image} title={property.title} />
        ))}
      </Slider>
    </div>
  );
};

export default PropertyCarousel;
