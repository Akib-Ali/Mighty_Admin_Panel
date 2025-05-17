import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="container mx-auto flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-[400px]">
        <Image
          src="/images/builders/1.png"
          alt="Real Estate "
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="container text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
            <div className="flex items-center justify-center gap-2 text-lg">
              <Link href="/" className="hover:text-light">
                HOME
              </Link>
              <span>»</span>
              <span className="">About Us</span>
            </div>
          </div>
        </div>
      </div>

      {/* Company Description */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <h2 className="text-3xl font-semibold mb-6">
                <span className="text-[#AB213B]">About Us</span>
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  At Mighty Warner Realty, we aren't just find properties; we
                  craft lifestyles. As Dubai's #1 property management
                  specialists, we are your trusted partners in buying, selling,
                  and managing real estate with unmatched expertise and care.
                  From luxury residences to savvy investments, we deliver
                  tailored solutions that align with your aspirations.
                </p>
                <p>
                  Our professional team combines market insight with a
                  personalized touch to make every transaction seamless and
                  rewarding. With Mighty Warner Realty, you're not just
                  navigating Dubai's dynamic property market, you're unlocking
                  its finest opportunities to find your next great chapter with
                  us.
                </p>
                <p>
                  At Mighty Warner Realty, we aren't just find properties; we
                  craft lifestyles. As Dubai's #1 property management
                  specialists, we are your trusted partners in buying, selling,
                  and managing real estate with unmatched expertise and care.
                  From luxury residences to savvy investments, we deliver
                  tailored solutions that align with your aspirations.
                </p>
                <p>
                  Our professional team combines market insight with a
                  personalized touch to make every transaction seamless and
                  rewarding. With Mighty Warner Realty, you're not just
                  navigating Dubai's dynamic property market, you're unlocking
                  its finest opportunities to find your next great chapter with
                  us.
                </p>
              </div>
            </div>
            <div className="md:w-1/3">
              <div className="relative">
                <Image
                  src="/images/Realty-Logo.png"
                  alt="MW Realty Logo"
                  width={300}
                  height={400}
                  className="mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Trends Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold inline-flex items-center gap-2">
              <span>Real Estate Market Trends & Investment Tips</span>
              <span className="text-[#AB213B]"></span>
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <Image
                src="/images/builders/6.png"
                alt="Market Trends"
                width={500}
                height={400}
                className="rounded-lg"
              />
            </div>
            <div className="md:w-1/2 space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-[#AB213B] font-bold">•</span>
                  <span>
                    Higher mortgage rates have slowed rapid price growth,
                    leading to a more balanced market.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#AB213B] font-bold">•</span>
                  <span>
                    Buyers have more negotiation power, but financing costs
                    remain a challenge.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#AB213B] font-bold">•</span>
                  <span>
                    With remote work still prevalent, suburban and mid-sized
                    cities continue to attract investors.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#AB213B] font-bold">•</span>
                  <span>
                    Lower home prices and strong rental demand make these areas
                    attractive for buy-and-hold investors.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#AB213B] font-bold">•</span>
                  <span>
                    Higher interest rates for construction loans are limiting
                    new supply.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#AB213B] font-bold">•</span>
                  <span>
                    Mortgage rates remain elevated, making affordability a key
                    concern for buyers.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#AB213B] font-bold">•</span>
                  <span>
                    More buyers are opting for adjustable-rate mortgages (ARMs)
                    or waiting for rate cuts.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#AB213B] font-bold">•</span>
                  <span>
                    Rising home prices have pushed demand toward smaller homes,
                    condos, and suburban areas.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0B3558] text-white p-6 rounded-lg flex items-center justify-center">
              <h3 className="text-xl font-semibold">Who we are</h3>
            </div>
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">What we offer</h3>
              <p className="text-gray-700">
                Our comprehensive services include property management, buying
                and selling assistance, investment consulting, and market
                analysis to help you make informed real estate decisions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">Why choose us</h3>
              <p className="text-gray-700">
                With our deep market knowledge, personalized approach, and
                commitment to excellence, we ensure that every client receives
                exceptional service and achieves their real estate goals.
              </p>
            </div>
          </div>

          <div className="mt-10 relative">
            <div className="w-full h-[400px] relative">
              <Image
                src="/images/builders/who-we-are.png"
                alt="Real Estate Keys"
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                {/* <h2 className="text-4xl md:text-5xl font-bold text-[#AB213B]">who we are</h2> */}
              </div>
            </div>

            <div className="mt-8 text-gray-700 space-y-4">
              <p>
                Mighty Warner Realty is one of the finest real estate company,
                bringing the best deals of houses in various locations. It is
                the most suitable one where one can get the best deals for
                occupying a house. Houses which are loaded with all amenities,
                luxury and comfort are located in Noida, Greater Noida and
                Ghaziabad.
              </p>
              <p>
                Our team has put all their efforts for upholding the name of
                Mighty Warner Realty, on the elite in the Real Estate. You can
                easily find out your relevant property here in a single go.
              </p>
              <p>
                We deal in both residential and commercial fields. We have a
                large empire of buying and selling the equity and we also makes
                the supplies on affordable prices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Director Message */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold inline-flex items-center gap-2">
              <span>Director Message</span>
              <span className="text-[#AB213B]"></span>
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3 text-gray-700 space-y-4">
              <p>
                A company stands on the shoulders of its representatives. The
                employees, directors and the investors are the backs for any
                company in the group. The Mighty Warner Realty has hit to the
                toes of the Real Estate Industries and now looking with its
                acceptance and assistance.
              </p>
              <p>
                Our winning mantra is that we regularly keep in mind about the
                value and the quality of service that we are providing to the
                users. Contentment of our clients is expertise in our priority
                and one of our company guidelines. We help to each and every
                customer that comes in contact with Mighty Warner Realty which
                also hand over all information to the customer that he wants to
                know about the property or locality.
              </p>
              <p>
                Thank you for making our patrons contended of getting a
                relationship, participation in Real Estate. We deals in all kind
                of worth from the residential to commercial and we are jubilant
                by doing this again and again.
              </p>
            </div>
            <div className="w-full md:w-1/3">
              <div className="relative h-[300px] w-full md:h-[400px]">
                <Image
                  src="/images/builders/5.png"
                  alt="Director"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Builders */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold inline-flex items-center gap-2">
              <span>Our Builders</span>
              <span className="text-[#AB213B]"></span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="bg-white p-4 rounded-lg border flex items-center justify-center h-32">
              <Image
                src="/images/builders/buildersLogo/1.png"
                alt="TATA"
                width={150}
                height={44}
              />
            </div>
            <div className="bg-white p-4 rounded-lg border flex items-center justify-center h-32">
              <Image
                src="/images/builders/buildersLogo/2.png"
                alt="Godrej"
                width={150}
                height={44}
              />
            </div>
            <div className="bg-white p-4 rounded-lg border flex items-center justify-center h-32">
              <Image
                src="/images/builders/buildersLogo/3.png"
                alt="Dynasty"
                width={150}
                height={44}
              />
            </div>
            <div className="bg-white p-4 rounded-lg border flex items-center justify-center h-32">
              <Image
                src="/images/builders/buildersLogo/4.png"
                alt="BCC"
                width={150}
                height={44}
              />
            </div>
            <div className="bg-white p-4 rounded-lg border flex items-center justify-center h-32">
              <Image
                src="/images/builders/buildersLogo/5.png"
                alt="Mahagun"
                width={150}
                height={44}
              />
            </div>
            <div className="bg-white p-4 rounded-lg border flex items-center justify-center h-32">
              <Image
                src="/images/builders/buildersLogo/6.png"
                alt="Gaurs"
                width={150}
                height={44}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
