"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useBanner } from "@/hooks/use-banner";


// Custom arrow components
const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      className="absolute left-4 top-1/2 z-10 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-red-700/80 text-white cursor-pointer focus:outline-none"
      onClick={onClick}
    >
      <ChevronLeft size={24} />
    </button>
  );
};

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      className="absolute right-4 top-1/2 z-10 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-red-700/80 text-white cursor-pointer focus:outline-none"
      onClick={onClick}
    >
      <ChevronRight size={24} />
    </button>
  );
};

export default function HomePagePromotionCarousel() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { data: bannerData, isLoading } = useBanner();
  const banners = bannerData?.data || [];

  useEffect(() => {
    setMounted(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return null;
  if (isLoading) return <div className="h-96">Loading...</div>;
  if (!banners.length) return <div className="h-96">No banners found</div>;

  const settings = {
    dots: false,
    infinite: banners.length > 1, 
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: banners.length > 1 ? <PrevArrow /> : undefined,
    nextArrow: banners.length > 1 ? <NextArrow /> : undefined,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-8xl mx-auto px-4 py-8">
      <Slider {...settings} className="location-carousel">
        {banners.map((banner: any, index: number) => (
          <div key={index} className="px-2">
            <div className="relative lg:aspect-[10/3] aspect-[10/6] overflow-hidden rounded-xl">
              <Image
                src={isMobile ? banner.imageMobile : banner.imageDesktop}
                alt={banner.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
