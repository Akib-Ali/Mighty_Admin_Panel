"use client"

import { useEffect, useState } from "react"
import Slider from "react-slick"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useGetCategoriesCity } from "@/hooks/use-city-category"
import Loader from "./Loader"
import Link from "next/link"


const PrevArrow = (props: any) => {
  const { onClick } = props
  return (
    <button
      className="absolute left-4 top-1/2 z-10 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-red-700/80 text-white cursor-pointer focus:outline-none"
      onClick={onClick}
    >
      <ChevronLeft size={24} />
    </button>
  )
}

const NextArrow = (props: any) => {
  const { onClick } = props
  return (
    <button
      className="absolute right-4 top-1/2 z-10 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-red-700/80 text-white cursor-pointer focus:outline-none"
      onClick={onClick}
    >
      <ChevronRight size={24} />
    </button>
  )
}



export default function LocationCarousel() {
  const [mounted, setMounted] = useState(false)
  const { data, isLoading } = useGetCategoriesCity()

  // Settings for the slider
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
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
  }

  // Handle client-side rendering of Slider
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (isLoading) {
    return (
      <div className="col-span-full text-center text-gray-500">
        <Loader />
      </div>
    )
  }

  return (
    <div className="max-w-8xl mx-auto px-4 py-8">
      <Slider {...settings} className="location-carousel">
        {data?.map((location:any) => (
          <Link href={`/for-sale/${location.id}`} key={location.id} className="px-2">
            <div className="relative overflow-hidden rounded-3xl lg:aspect-[4/5] aspect-[4/3]">
              <Image src={`${location.image}`} alt={location.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-8 left-0 w-full text-center">
                <h3 className="text-white text-2xl md:text-3xl font-bold tracking-wider">{location.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  )
}

