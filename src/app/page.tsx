"use client";

import HeroSection from "@/components/shared/hero-section";

import PropertySearch from "@/components/shared/home/property-search";

import LuxuryHomesPage from "@/components/shared/home/LuxuryHomesPage";
import PropertySteps from "@/components/shared/home/property-steps";
import LocationCarousel from "@/components/shared/carousel";

import Link from "next/link";
import HomePropertyCarousel from "@/components/shared/home/carousel/home-property-carousel";
import WhyChooseUs from "@/components/shared/home/why-choose-us";

import LeaveYourDetails from "@/components/shared/leave-your-details";

import HomePagePromotionCarousel from "@/components/shared/home/carousel/promotion-banner";
import PropertyCityByDefault from "@/components/shared/PropertyCityByDefault";



export default function Home() {
  return (
    <>
      <div className="container mx-auto">
        <HeroSection />
        <div className="my-8 mt-12 px-4">
         
          <PropertyCityByDefault />
          
        </div>
        <div className="my-8">
          <HomePagePromotionCarousel />
        </div>
        <div className="my-8 ">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-2 uppercase">
            <span className=" ">
              <img
                src="/images/icons/heading-left.png"
                alt="icon"
                className="w-6 h-6"
              />
            </span>
            Luxury Project
            <span className="">
              <img
                src="/images/icons/heading-right.png"
                alt="icon"
                className="w-6 h-6"
              />
            </span>
          </h1>
          <LuxuryHomesPage />
          <div className="flex justify-center mt-1">
            <Link
              href="/for-sale/all"
              className="bg-secondary hover:bg-navy-900 text-white font-medium py-1 px-4 rounded-md transition-colors duration-300"
            >
              View All Project
            </Link>
          </div>
        </div>
        <div className="my-8 mt-12">
          <PropertySteps />
        </div>
        {/* <div className="my-8 mt-12">
          <BrokerBanner />
        </div> */}
        {/* <div className="my-8">
          <FeatureCards />
        </div> */}
        {/* <div className="my-8">
          <FloorPlanCarousel />
        </div> */}
        {/* <div className="my-8">
          <PropertyCarousel />
        </div> */}
        <div className="my-8 container mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-2 uppercase">
            <span className=" ">
              <img
                src="/images/icons/heading-left.png"
                alt="icon"
                className="w-6 h-6"
              />
            </span>
            Find Properties
            <span className="">
              <img
                src="/images/icons/heading-right.png"
                alt="icon"
                className="w-6 h-6"
              />
            </span>
          </h1>
          <HomePropertyCarousel />
        </div>
        <div className="my-8">
          <WhyChooseUs />
        </div>
        <div className="my-8 container mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-2 uppercase">
            <span className=" ">
              <img
                src="/images/icons/heading-left.png"
                alt="icon"
                className="w-6 h-6"
              />
            </span>
            Most Popular Properties Places
            <span className="">
              <img
                src="/images/icons/heading-right.png"
                alt="icon"
                className="w-6 h-6"
              />
            </span>
          </h1>
          <LocationCarousel />
        </div>
        <div className="my-8">
          <PropertySearch />
        </div>
        {/* <div className="my-8">
          <LatestBlogPosts />
        </div> */}
        {/* <div className="my-8">
          <FeaturedAgencies />
        </div> */}
      </div>
      {/* Contact Form with full width */}
      <LeaveYourDetails />
    </>
  );
}
