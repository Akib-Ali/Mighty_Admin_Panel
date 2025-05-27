
import { AgencyServices } from "@/services/AgencyServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function usegetAgencyList() {
    return useQuery({
        queryKey: ["agencyList"],
        queryFn: AgencyServices.getAgency,
        staleTime: 1000 * 60 * 5,
        retry: 2,
    })
}

export function useAddAgency() {
  const router = useRouter();

  return useMutation({
    mutationFn: AgencyServices.addNewAgency,
    onSuccess: () => {
      toast.success("Agency added successfully");
      router.push("/agency/login");
    },
    onError: (error: any) => {
      if (error?.response?.data?.message ) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(`Failed to add agent: ${error.message}`);
      }
    },
  });
}

