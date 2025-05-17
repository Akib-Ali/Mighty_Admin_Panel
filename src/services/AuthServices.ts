import api from "@/lib/axiosInstance";

export const AuthServices = {

  //  Sign-up API call
  signUp: async (data: {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    phone: string;
  }) => {
    console.log(data);
    const response = await api.post("/api/v1/auth/sign-up", data);
    console.log(response.data);
    return response.data;
  },

  //  Login API call
  login: async (data: { email: string; password: string }) => {
    const response = await api.post("/api/v1/auth/sign-in", data);
    return response.data;
  },

  //  Refresh Token API call
  refreshToken: async (data: { refreshToken: string }) => {
    const response = await api.post("/api/v1/auth/refresh-token", data);
    return response.data;
  },

  //  Fetch User Profile API call
  getUserProfile: async () => {
    const response = await api.get("/api/v1/auth/me");
    return response.data;
  },

  //  Logout method
  // logout: async () => {
  //   try {
  //     const tokens = localStorage.getItem('tokens');
  //     if (tokens) {
  //       const { access_token } = JSON.parse(tokens);
  //       Optional: Call logout API endpoint if you have one
  //       await axios.post(`${API_URL}/logout`, {}, {
  //         headers: { Authorization: `Bearer ${access_token}` }
  //       });
  //     }
  //     return true;
  //   } catch (error) {
  //     console.error('Logout error:', error);
  //     return false;
  //   }
  // },
};
