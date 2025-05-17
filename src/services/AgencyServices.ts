import api from "@/lib/axiosInstance"

export const AgencyServices = {
  getAgency: async ()  => {
    const response = await api.get("/api/v1/agency");
    return response.data;
  }
};
