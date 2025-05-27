
import { AgencyServices } from "@/services/AgencyServices";
import { AgentServices } from "@/services/AgentServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export function useAddAgent() {
  const router = useRouter();

  return useMutation({
    mutationFn: AgentServices.addNewAgent,
    onSuccess: () => {
      toast.success("Agent added successfully");
      router.push("/agent/login");
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

