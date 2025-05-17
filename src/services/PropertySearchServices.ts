import api from "@/lib/axiosInstance"


export const SearchProperty = {
  fetchSearchProperty: async () => {
    const response = await api.get("/api/v1/property/search?city=dubai");
    return response.data;
  }
};
