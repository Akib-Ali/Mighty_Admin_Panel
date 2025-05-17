import api from "@/lib/axiosInstance"

interface Banner {
  id: string;
  name: string;
  imageMobile: string;
  imageDesktop: string;
}

interface BannerResponse {
  data: Banner[];
}

export const BannerServices = {
  getBanner: async (): Promise<BannerResponse> => {
    const response = await api.get<BannerResponse>("/api/v1/assets/all-banners");
    return response.data;
  }
};
