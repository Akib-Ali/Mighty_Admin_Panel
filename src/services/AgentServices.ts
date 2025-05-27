import api from "@/lib/axiosInstance"

export const AgentServices = {
  getAgency: async () => {
    const response = await api.get("/api/v1/agency");
    return response.data;
  },

  // Add new agent API calls here

  addNewAgent: async (formData: any) => {
    const response = await api.post("/api/v1/agency/agent-onboard", formData);
    console.log("Response from addNewAgent:", response.data);
    return response.data;
  },


};


