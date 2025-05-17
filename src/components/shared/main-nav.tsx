"use client";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  Menu,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";


interface NavItem {
  title: string;
  href: string;
  isNew?: boolean;
  isExternal?: boolean;
  children?: { title: string; href: string; isNew?: boolean }[];
}

const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
    isNew: false,
  },

  {
    title: "Properties",
    href: "/properties",
    children: [
      { title: "Residential", href: "/properties/residential" },
      { title: "Commercial", href: "/properties/commercial", isNew: true }

    ],
  },
  {
    title: "About Us",
    href: "/about-us",
  },
  // {
  //   title: "Market Intelligence",
  //   href: "/market-intelligence",
  //   children: [
  //     { title: "Market Reports", href: "/market-intelligence/reports" },
  //     { title: "Price Trends", href: "/market-intelligence/trends" },
  //     { title: "Area Guides", href: "/market-intelligence/areas" },
  //     {
  //       title: "Neighborhood Insights",
  //       href: "/market-intelligence/neighborhoods",
  //       isNew: true,
  //     },
  //   ],
  // },
  {
    title: "Agents",
    href: "/agents",
  },
  {
    title: "Agencies",
    href: "/agencies",
  },
  {
    title: "Blog",
    href: "https://mightywarnersrealty.com",
    isExternal: false,
  },
  {
    title: "Contact Us",
    href: "/contact-us",
  },
  {
    title: "Login",
    href: "",
    children: [
      { title: "User Login", href: "/user/login" },
      { title: "Agent Login", href: "/agent/login" },
      { title: "Agency Login", href: "/agency/login", isNew: true },
      { title: "Portfolio", href: "/admin",},

    ],
  },
];

export function MainNav() {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/login")
  };


  return (
    <div className="sticky top-0 z-50 w-full bg-background border-b container mx-auto ">
      {/* Top Navigation */}
      {/* <div className="w-full  container bg-gray-100 mx-auto px-4 lg:px-16">
        <div className="container  h-10 items-center justify-between hidden md:flex">
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center "
                >
                  <Globe className="h-4 w-4" />
                  <span>EN</span>
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>العربية</DropdownMenuItem>
                <DropdownMenuItem>中文</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center "
            >
              <Settings className="h-4 w-4" />
              <span>Site settings</span>
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center "
            >
              <Heart className="h-4 w-4" />
              <span>Favorite properties</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center "
            >
              <Search className="h-4 w-4" />
              <span>Saved searches</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center  bg-gay-800 text-black"
              onClick={handleLogin}
            >
              <User className="h-4 w-4" />
              <span>Log in</span>
            </Button>
          </div>
        </div>
      </div> */}

      {/* Main Navigation */}
      <div className="w-full">
        <div className="container flex h-16 items-center justify-between mx-auto px-4 lg:px-16">
          {/* Logo */}
          <div className="flex-shrink-0 mr-4 ">
            <Link href="/">
              <Image
                src="/images/Realty-Logo.png"
                alt="Realty Logo"
                width={200}
                height={30}
                className="h-12 w-auto hidden md:block"
              />
              <Image
                src="/images/Realty-Logo.png"
                alt="Realty Logo"
                width={90}
                height={40}
                className="h-12 w-auto md:hidden"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 flex-grow justify-end">
            {navItems.map((item) => {
              if (item.children) {
                return (
                  <DropdownMenu key={item.title}>
                    <DropdownMenuTrigger className="flex items-center  text-sm font-medium focus-visible:outline-none">
                      <span>{item.title}</span>
                      {item.isNew && (
                        <Badge
                          variant="secondary"
                          className="ml-1 bg-primary text-white"
                        >
                          NEW
                        </Badge>
                      )}
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      {item.children.map((child) => (
                        <DropdownMenuItem key={child.title} asChild>
                          <Link
                            href={child.href}
                            className="w-full flex items-center justify-between cursor-pointer"
                          >
                            {child.title}
                            {child.isNew && (
                              <Badge
                                variant="secondary"
                                className="ml-1 bg-primary text-white text-xs"
                              >
                                NEW
                              </Badge>
                            )}

                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="flex items-center text-sm font-medium"
                >
                  {item.title}
                  {item.isExternal && (
                    <ExternalLink className="ml-1 h-3 w-3" />
                  )}
                  {item.isNew && (
                    <Badge
                      variant="secondary"
                      className="ml-1 bg-primary text-white"
                    >
                      NEW
                    </Badge>
                  )}
                </Link>
              );
            })}
            {/* <Button
              variant="ghost"
              size="sm"
              className="flex items-center  bg-gay-800 text-black"
              onClick={handleLogin}
            >
              <User className="h-4 w-4" />
              <span>Log in</span>
            </Button> */}
          </nav>

          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden ml-auto">
              <Button variant="ghost" size="icon">
                <Menu className="w-8 h-8" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 pt-10">
              <SheetHeader>
                <SheetTitle className="flex justify-between items-center">
                  <Button variant="outline" className="w-full">
                    Sign up or Log in
                  </Button>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col h-[calc(100vh-120px)]">
                {/* <div className="mb-4">
                  <h3 className="mb-2 text-sm font-medium">
                    Change site language
                  </h3>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      English
                    </Button>
                    <Button variant="outline" className="flex-1">
                      العربية
                    </Button>
                    <Button variant="outline" className="flex-1">
                      中文
                    </Button>
                  </div>
                </div> */}
                <nav className="flex flex-col space-y-4 overflow-y-auto flex-grow">
                  {navItems.map((item) => (
                    <div key={item.title}>
                      {item.children ? (
                        <details className="group">
                          <summary className="flex items-center justify-between py-2 text-sm font-medium cursor-pointer">
                            <span className="flex items-center">
                              {item.title}
                              {item.isNew && (
                                <Badge
                                  variant="secondary"
                                  className="ml-2 bg-primary text-white"
                                >
                                  NEW
                                </Badge>
                              )}
                            </span>
                            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                          </summary>
                          <div className="pl-4 mt-2 space-y-2">
                            {item.children.map((child) => (
                              <Link
                                key={child.title}
                                href={child.href}
                                className="flex items-center py-1 text-sm"
                              >
                                {child.title}
                                {child.isNew && (
                                  <Badge
                                    variant="secondary"
                                    className="ml-2 bg-primary text-white text-xs"
                                  >
                                    NEW
                                  </Badge>
                                )}
                              </Link>
                            ))}
                          </div>
                        </details>
                      ) : (
                        <Link
                          href={item.href}
                          className="flex items-center py-2 text-sm font-medium"
                        >
                          {item.title}
                          {item.isNew && (
                            <Badge
                              variant="secondary"
                              className="ml-2 bg-primary text-white"
                            >
                              NEW
                            </Badge>
                          )}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
                {/* <div className="mt-4 pt-4 border-t">
                  <h3 className="mb-2 text-sm font-medium">Download our app:</h3>
                  <div className="flex space-x-2">
                    <Link href="#" target="_blank">
                      <Image
                        src="/images/Realty-Logo.png"
                        alt="Get it on Google Play"
                        width={120}
                        height={36}
                        className="h-auto w-32"
                      />
                    </Link>
                    <Link href="#" target="_blank">
                      <Image
                        src="/images/Realty-Logo.png"
                        alt="Download on the App Store"
                        width={120}
                        height={36}
                        className="h-auto w-32"
                      />
                    </Link>
                  </div>
                </div> */}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}
