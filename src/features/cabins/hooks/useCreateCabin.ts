import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCabin } from "../../../services/apiCabins";
import { QUERY_KEYS } from "../../../types";
import toast from "react-hot-toast";

function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: mutateCreating, isPending: isCreating } = useMutation({
    mutationFn: CreateCabin,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CABINS],
      });
      toast.success("Cabin successfully created");
      // reset();
    },

    onError: () => {
      // toast.error("Cabin could not be created");
      toast.error("Permission denied");
    },
  });

  return { mutateCreating, isCreating };
}

export default useCreateCabin;
