"use client";

import { Button } from "@/components/ui/button";
import { IoIosArrowDown } from "react-icons/io";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";
import { usePathname } from "next/navigation";



export default function Header() {

    const pathname = usePathname();

    const pageTitle = useMemo(() => {
        const routes: { [key: string]: string } = {
            "/business/agency/add-property": "Add Property",
            "/business/agency/agents": "All Agents",
            "/business/agency/add-agent": "Add Agent",
            "/business/agency/property-managements": "Property Management",
            "/business/agency/property-catalogues": "Property Catalogues",
            "/business/agency": "Agency Dashboard",
            "/business/agent/update-property": "Update Property",
        };

        if (pathname.startsWith("/business/agency/property-catalogue/")) {
            return "Property Catalogue Detail";
        }
        else if (pathname.startsWith("/business/agency/property-management/")) {
            return "Property Management Detail";
        }
        else if (pathname.startsWith("/business/agency/update-property/")) {
            return "Update Property";
        }

         else if (pathname.startsWith("/business/agency/edit-agent/")) {
            return "Update Agent";
        }
         else if (pathname.startsWith("/business/agency/agent/")) {
            return "Agent Detail";
        }
        

        return routes[pathname] || "Dashboard";
    }, [pathname]);


    return (
        <header className="bg-white shadow p-4">
            <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold">{pageTitle}</h2>

                    <span className="text-sm text-gray-500">Mighty Warners Real Estate</span>
                </div>


                {/* Right Side Controls */}
                <div className="flex items-center space-x-4">
                    {/* Quick Action Button */}
                    <Button className="bg-secondary text-white hover:bg-red-900 flex items-center gap-2">
                        <span className="w-5 h-5 bg-white text-secondary rounded-full flex items-center justify-center">
                            <Plus className="w-3 h-3" />
                        </span>
                        Quick Actions
                    </Button>

                    <div className="w-8 h-8 rounded-full overflow-hidden border">
                        <Image
                            src="/images/avatar/2.jpg"
                            alt="User"
                            width={32}
                            height={32}
                        />
                    </div>

                </div>
            </div>
        </header>
    );
}



