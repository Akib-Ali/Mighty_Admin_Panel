import api from "@/lib/axiosInstance"


export const CategoryServices = {
  getCategories: async () => {
    const response = await api.get("/api/v1/homepage/categories");
    return response.data;
  },
  getCategoriesCity: async () => {
    const response = await api.get("/api/v1/homepage/cities");
    return response.data;
  }
};
