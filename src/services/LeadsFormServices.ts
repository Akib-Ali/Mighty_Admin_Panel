import api from "@/lib/axiosInstance"



export const LeadsFormServices = {
  postLeadsForm: async (data: {
    fullname: string;
    email: string;
    country: string;
    phone: string;
    message: string;
  }) => {
    
    const response = await api.post("/api/v1/leads", data);
    console.log("Response from postLeadsForm:", response.data); 
    return response.data;
  }
};
