"use client"
import React from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CustomArrow: React.FC<{ direction: "left" | "right"; onClick?: () => void }> = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className={`absolute z-10 top-1/2 -translate-y-1/2 ${
      direction === "left" ? "-left-4" : "-right-4"
    }`}
  >
    {direction === "left" ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
  </button>
);

const FeaturedAgencies: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const agencies = [
    { name: "First Choice Properties LLC", image: "/images/icons/partner/1.jpeg", propertiesForSale: 56, propertiesToRent: 25 },
    { name: "Global City Real Estate - Branch", image: "/images/icons/partner/2.jpeg", propertiesForSale: 56, propertiesToRent: 25 },
    { name: "Another Agency", image: "/images/icons/partner/3.jpeg", propertiesForSale: 45, propertiesToRent: 30 },
    { name: "First Choice Properties LLC", image: "/images/icons/partner/4.webp", propertiesForSale: 56, propertiesToRent: 25 },
    { name: "First Choice Properties LLC", image: "/images/icons/partner/5.jpeg", propertiesForSale: 56, propertiesToRent: 25 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="lg:text-3xl text-2xl font-bold text-center mb-8">Featured Agencies</h2>
      <div className="relative">
        <Slider {...settings}>
          {agencies.map((agency, index) => (
            <div key={index} className="px-4">
              <div className="flex flex-col items-center">
                <img src={agency.image} alt={agency.name} className="h-24 object-contain mb-4" />
                <h3 className="text-lg font-semibold text-center mb-2">{agency.name}</h3>
                <div className="flex gap-4 text-sm">
                  <span>{agency.propertiesForSale} Properties for Sale</span>
                  <span>{agency.propertiesToRent} Properties to Rent</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default FeaturedAgencies;
