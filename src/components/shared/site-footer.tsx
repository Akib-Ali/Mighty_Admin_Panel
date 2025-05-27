import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
} from "lucide-react";

export default function SiteFooter() {
  return (
    <div className="container mx-auto">

   
    <footer className="w-full bg-primary text-white ">
      <div className="container px-4 lg:px-24 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mb-16">
          <div>
            <h2 className="text-4xl font-bold">Let's Work Together</h2>
          </div>
          <div className="flex items-center justify-end">
            <div className="relative lg:w-1/2 w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent border-b border-white rounded-none outline-none focus:outline-none focus:ring-0 active:ring-0 focus-visible:ring-0 placeholder:text-white/80 h-12 px-0"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2">
                <ArrowRight className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-2">MWREALTY</h3>
            <p className="text-sm mb-6">
              Your Gateway to Real Estate Excellence.
            </p>

            <div className="flex space-x-4">
              <Link href="#" className="bg-white rounded-full p-2">
                <Facebook className="h-5 w-5 text-[#8B0D24]" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="bg-white rounded-full p-2">
                <Twitter className="h-5 w-5 text-[#8B0D24]" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="bg-white rounded-full p-2">
                <Linkedin className="h-5 w-5 text-[#8B0D24]" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="bg-white rounded-full p-2">
                <Instagram className="h-5 w-5 text-[#8B0D24]" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">About</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="hover:underline">
                  About us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Download
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="hover:underline">
                  How we work
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Press room
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Jobs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="hover:underline">
                  Terms of use
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Security Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Cookie settings
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/20">
          <p className="text-center">
            Copyright mwrealty 2025 . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
    </div>
  );
}
