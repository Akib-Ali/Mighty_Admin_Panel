import Image from "next/image"
import Link from "next/link"

// Blog post data
const blogPosts = [
  {
    id: 1,
    title: "Big Infra Boost - After Jewar Airport",
    description:
      "The Uttar Pradesh Cricket Association (UPCA) Has Approved The Development Of An International Cricket Stadium In Noida's Sector 150 Along The Noida-Greater Noida Expressway.",
    image: "/images/demo/blog/Group 292 (1).png",
    date: "2023-03-30",
    slug: "big-infra-boost",
  },
  {
    id: 2,
    title: "The Outlook For Commercial Real Estate",
    description:
      "The Commercial Real Estate Sector In North India Is Set To Experience A Massive Boom In The Coming Years. The Region Has Been Witnessing A Rise In Investment Inflows, A Surge In Construction...",
      image: "/images/demo/blog/Group 292 (2).png",
    date: "2023-03-24",
    slug: "commercial-real-estate-outlook",
  },
  {
    id: 3,
    title: "Delhi Mumbai Expressway Game Changer",
    description:
      "The Uttar Pradesh Cricket Association (UPCA) Has Approved The Development Of An International Cricket Stadium In Noida's Sector 150 Along The Noida-Greater Noida Expressway.",
      image: "/images/demo/blog/Group 292 (3).png",
    date: "2023-03-30",
    slug: "delhi-mumbai-expressway",
  },
  {
    id: 4,
    title: "Property Transfer Process And Regulations",
    description:
      "The Uttar Pradesh Cricket Association (UPCA) Has Approved The Development Of An International Cricket Stadium In Noida's Sector 150 Along The Noida-Greater Noida Expressway.",
      image: "/images/demo/blog/Group 292.png",
    date: "2023-03-30",
    slug: "property-transfer-process",
  },
]

export default function LatestBlogPosts() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-12">
          <div className="text-navy-800">
            <svg
              className="w-8 h-8 inline-block mr-3 rotate-180"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.75 16.25L18 12L13.75 7.75"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M6 12H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 tracking-wide">LATEST BLOG POST</h2>
          <div className="text-navy-800">
            <svg
              className="w-8 h-8 inline-block ml-3"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.75 16.25L18 12L13.75 7.75"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M6 12H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative h-48 w-full">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-gray-700 text-sm mb-4 line-clamp-4">{post.description}</p>
                <div className="bg-gray-200 text-gray-700 py-2 px-4 rounded inline-block text-sm">{post.date}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-10">
          <Link
            href="/projects"
            className="bg-blue-900 hover:bg-navy-900 text-white font-medium py-1 px-4 rounded-md transition-colors duration-300"
          >
            View All Project
          </Link>
        </div>
      </div>
    </section>
  )
}

