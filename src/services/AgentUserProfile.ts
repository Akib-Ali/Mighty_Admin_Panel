// src/services/propertyService.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from "@/lib/axiosInstance";


export const getUserProflile = async () => {
    const response = await api.get(`api/v1/user/me`)
    return response.data
};
