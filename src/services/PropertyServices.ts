import api from "@/lib/axiosInstance";

export const PropertyServices = {
  propertySearchCity: async (city: string) => {
    const response = await api.get(`/api/v1/property/search?city=${city}`);
    return response.data;
  },

  premiumProperty: async () => {
    const response = await api.get(`/api/v1/property/premium-property`);
    return response.data;
  },
};


