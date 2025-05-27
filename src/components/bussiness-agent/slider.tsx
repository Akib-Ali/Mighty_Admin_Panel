"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css";

import Image from "next/image";

const property = {
  title: "Luxury Apartment in Downtown",
  location: "Atque iusto eligendi",
  images: [
    "https://res.cloudinary.com/dfrcmd6uz/image/upload/v1748023961/general/340cca25-c2b8-4b2d-b0f1-d82ed355247f.png",
    "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D",
  ],
};

export default function PropertySlider() {
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* 🔁 Swiper Slider with Arrows and Autoplay */}
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 3000 }}
        loop={true}
        className="rounded-xl overflow-hidden"
      >
        {property.images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full aspect-video">
              <Image
                src={img}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover rounded-xl"
              />
              <div className="absolute bottom-0 left-0 bg-black/50 w-full p-4 text-white z-10">
                <h2 className="text-2xl font-bold">{property.title}</h2>
                <p className="text-sm">{property.location}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
