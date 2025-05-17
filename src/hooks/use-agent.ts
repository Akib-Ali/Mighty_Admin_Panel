
import { AgencyServices } from "@/services/AgencyServices";
import { AgentServices } from "@/services/AgentServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AgentServices.addNewAgent,
    onSuccess: () => {
      toast.success("Agent added successfully ");
    //   queryClient.invalidateQueries(["agentList"]); 
    },
    onError: (error) => {
      toast.error(`Failed to add agent : ${ error.message}`);
    },
  });
}

