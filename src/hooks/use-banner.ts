
import { BannerServices } from "@/services/BannerServices";
import { useQuery } from "@tanstack/react-query";

export function useBanner() {
    return useQuery({
        queryKey: ["banner"],
        queryFn: BannerServices.getBanner,
        staleTime: 1000 * 60 * 5,
        retry: 2,
    })
}

