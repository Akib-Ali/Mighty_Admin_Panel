
import { AgencyServices } from "@/services/AgencyServices";
import { useQuery } from "@tanstack/react-query";

export function usegetAgencyList() {
    return useQuery({
        queryKey: ["agencyList"],
        queryFn: AgencyServices.getAgency,
        staleTime: 1000 * 60 * 5,
        retry: 2,
    })
}

