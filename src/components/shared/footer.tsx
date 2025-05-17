"use client";
import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram, Youtube, ChevronsUp } from "lucide-react";

const Footer: React.FC = () => {
  const socialLinks = [
    { name: "Facebook", href: "#", icon: <Facebook size={24} /> },
    { name: "Twitter", href: "#", icon: <Twitter size={24} /> },
    { name: "LinkedIn", href: "#", icon: <Linkedin size={24} /> },
    { name: "Instagram", href: "#", icon: <Instagram size={24} /> },
    { name: "YouTube", href: "#", icon: <Youtube size={24} /> },
  ];

  const appStoreLinks = [
    { name: "App Store", href: "#", icon: "/images/iconAppStore.svg" },
    { name: "Google Play", href: "#", icon: "/images/iconGooglePlay.svg" },
  ];

  return (
    <footer className=" bg-gradient-to-r from-[#AB213B] to-[#274270] text-white py-8 container mx-auto">
      <div className=" mx-auto px-4 lg:px-24">
        <div className="flex flex-wrap gap-6 mb-6">
          <Link href="#" className="hover:text-gray-300">
            ABOUT US 
          </Link>
          <span className="text-gray-500">|</span>
          <Link href="#" className="hover:text-gray-300">
            CAREERS
          </Link>
          <span className="text-gray-500">|</span>
          <Link href="#" className="hover:text-gray-300">
            CONTACT US
          </Link>
          <span className="text-gray-500">|</span>
          <Link href="#" className="hover:text-gray-300">
            TERMS & PRIVACY POLICY
          </Link>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <span>COUNTRY:</span>
          <div className="flex items-center gap-2">
            <span>United Arab Emirates</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center mb-6">
          {/* Social Media Links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <Link key={social.name} href={social.href} className="hover:opacity-80">
                {social.icon}
              </Link>
            ))}
          </div>

          {/* App Store Links */}
          <div className="flex gap-4 mt-4 md:mt-0">
            {appStoreLinks.map((store) => (
              <Link key={store.name} href={store.href} className="hover:opacity-80">
                <img src={store.icon} alt={store.name} className="h-10" />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">© 2025 mightywarnersrealty.ae</div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm text-gray-400 hover:text-white flex items-center gap-2"
          >
            TOP <ChevronsUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
