import api from "@/lib/axiosInstance"

export enum SortOrder {
  POPULAR = 'popular',
  NEWEST = 'newest',
  PRICE_HIGH_TO_LOW = 'price-high-to-low',
  PRICE_LOW_TO_HIGH = 'price-low-to-high'
}

export enum FurnishingStatus {
  FURNISHED = 'FURNISHED',
  UNFURNISHED = 'UNFURNISHED',
}

export enum PropertyType {
  BUY = 'BUY',
  RENT = 'RENT',
  SELL = 'SELL'
}

export interface PropertySearchParams {
  specifications?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  maxBathrooms?: number;
  minSize?: number;
  maxSize?: number;
  type?: 'BUY' | 'RENT' | 'SELL';
  status?: 'ACTIVE' | 'INACTIVE';
  city?: string;
  country?: string;
  amenities?: string[];
  mwVerified?: boolean;
  isReady?: boolean;
  furnishingStatus?: 'FURNISHED' | 'UNFURNISHED';
  hasFloorPlan?: boolean;
  category?: string;
  isOffPlan?: boolean;
  sort?: 'popular' | 'newest' | 'price-high-to-low' | 'price-low-to-high';
  page?: number;
  limit?: number | 40;
}

export const SearchProperty = {
  fetchSearchProperty: async (params: PropertySearchParams = { limit: 40 }) => {
    const searchParams = new URLSearchParams();

    // Ensure limit is set
    params.limit = params.limit || 40;

    // Add all parameters to searchParams if they exist
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          // Handle arrays like amenities
          value.forEach(item => searchParams.append(key, item));
        } else if (typeof value === 'boolean') {
          searchParams.append(key, value.toString());
        } else {
          searchParams.append(key, value.toString());
        }
      }
    });

    const response = await api.get(`/api/v1/property/search?${searchParams.toString()}`);
    return response.data;
  }
};
