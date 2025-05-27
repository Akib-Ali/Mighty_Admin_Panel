import api from "@/lib/axiosInstance"

export const AgencyServices = {
  getAgency: async () => {
    const response = await api.get("/api/v1/agency");
    return response.data;
  },
  addNewAgency: async (formData: any) => {
    const response = await api.post("/api/v1/agency/agency-onboard", formData);
    console.log("Response from addNewAgency:", response.data);
    return response.data;
  },

};
