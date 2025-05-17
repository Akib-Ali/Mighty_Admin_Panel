

import { SearchProperty } from "@/services/PropertySearchServices";
import { useQuery } from "@tanstack/react-query";

export function userFetchSearchProperty() {
    return useQuery({
        queryKey: ["fetchSearchProperty"],
        queryFn: SearchProperty.fetchSearchProperty,
        staleTime: 1000 * 60 * 5,
        retry: 2,
    })
}

