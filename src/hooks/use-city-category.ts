
import { CategoryServices } from "@/services/CityAndCategoryServices";
import { useQuery } from "@tanstack/react-query";

export function useGetCategories() {
    return useQuery({
        queryKey: ["getCategories"],
        queryFn: CategoryServices.getCategories,
        staleTime: 1000 * 60 * 5,
        retry: 2,
    })
}
export function useGetCategoriesCity() {
    return useQuery({
        queryKey: ["getCategoriesCity"],
        queryFn: CategoryServices.getCategoriesCity,
        staleTime: 1000 * 60 * 5,
        retry: 2,
    })
}

