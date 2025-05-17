// src/services/propertyService.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from "@/lib/axiosInstance";

// Define the Property type
export interface Property {
  id: string;
  name: string;
  type: "Apartments" | "Townhouses" | "Villas";
  location: string;
  city: string;
  launchPrice: number;
  handoverDate: string;
  imageUrl: string;
}

export type City = "Dubai" | "Abu Dhabi" | "Sharjah" | "Ajman" | "Ras Al Khaimah" | "Umm Al Quwain";
export type PropertyType = "BUY" | "RENT" | "SELL";
export type PropertyStatus = "ACTIVE" | "INACTIVE";

// Define the search params interface
export interface PropertySearchParams {
  city?: City;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  maxBathrooms?: number;
  type?: PropertyType;
  status?: PropertyStatus;
}

// Function to fetch properties
const fetchProperties = async (params: PropertySearchParams): Promise<Property[]> => {
  // Convert params object to URL search params
  const searchParams = new URLSearchParams();
  
  // Add non-empty params
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      searchParams.append(key, value?.toString());
    }
  });

  const response = await api.get<Property[]>(`/property/search?${searchParams?.toString()}`);
  return response.data;
};

// Hook for fetching properties with query params
export const useProperties = (params: PropertySearchParams) => {
  return useQuery({
    queryKey: ['properties', params],
    queryFn: () => fetchProperties(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Function to fetch a single property by ID
const fetchPropertyById = async (id: string): Promise<Property> => {
  const response = await api.get<Property>(`/property/${id}`);
  return response.data;
};

// Hook for fetching a single property
export const useProperty = (id: string) => {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => fetchPropertyById(id),
    enabled: !!id, // Only run if id is provided
  });
};

// Function to fetch featured properties
const fetchFeaturedProperties = async (): Promise<Property[]> => {
  const response = await api.get<Property[]>('/property/featured');
  return response.data;
};

// Hook for fetching featured properties
export const useFeaturedProperties = () => {
  return useQuery({
    queryKey: ['featuredProperties'],
    queryFn: fetchFeaturedProperties,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Function to fetch properties by city
const fetchPropertiesByCity = async (city: City): Promise<Property[]> => {
  const response = await api.get<Property[]>(`/property/search?city=${city}`);
  return response.data;
};

// Hook for fetching properties by city
export const usePropertiesByCity = (city: City) => {
  return useQuery({
    queryKey: ['properties', 'city', city],
    queryFn: () => fetchPropertiesByCity(city),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};