import { SearchProperty } from "@/services/PropertySearchServices";
import { useMutation } from "@tanstack/react-query";
import type { PropertySearchParams } from "@/services/PropertySearchServices";

export function useSearchProperty() {
  return useMutation({
    mutationKey: ["searchProperty"],
    mutationFn: async (params: PropertySearchParams) => {
      try {
        const response = await SearchProperty.fetchSearchProperty(params);
        console.log('API Response:', response);
        return response;
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    }
  });
}

