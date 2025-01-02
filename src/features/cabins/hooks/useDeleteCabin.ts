import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../../services/apiCabins";
import { QUERY_KEYS } from "../../../types";
import toast from "react-hot-toast";

function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: mutateDeletingCabin } = useMutation({
    // mutationFn: (id: number) => deleteCabin(id),
    mutationFn: deleteCabin,

    // the callback function to be called if the delete query was successful
    onSuccess: () => {
      /*
          react query will refetch the data when a data (queryKey) in cache is invalid.
          without using invalidateQueries(), after clicking on the "delete" button,
          react query will not refetch the data, until the browser tab changes.
          invalidateQueries() makes react query to refetch the data without changing
          the tab (the same as the "invalidate" button in react query extension does)
        */
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CABINS],
      });
      toast.success("Cabin deleted successfully");
    },
    onError: error => {
      toast.error(`Cabin could not be deleted!`);
      console.error(error.message);
    },
  });

  return { isDeleting, mutateDeletingCabin };
}

export default useDeleteCabin;
