import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { CabinType } from "../types";
import { editCabin } from "../../../services/apiCabins";
import { QUERY_KEYS } from "../../../types";
import toast from "react-hot-toast";

function useEditCabin() {
  /* 
      2 useMutation() for one form submission:
      1 for creating a new cabin
      1 for editing a cabin
    */
  const queryClient = useQueryClient();
  const { mutate: mutateEditing, isPending: isEditing } = useMutation({
    // the function value assigned to "mutationFn" receives only 1 parameter
    mutationFn: (obj: {
      data: FieldValues;
      id: number;
      cabinToEdit: CabinType;
    }) => editCabin(obj),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CABINS],
      });
      toast.success("Cabin successfully edited");
      // reset(); // resets to "default" values
      // reset({
      //   name: "",
      //   maxCapacity: 0,
      //   description: "",
      //   discount: 0,
      //   regularPrice: 0,
      // });
    },

    onError: () => {
      toast.error("Cabin could not be edited");
    },
  });

  return { isEditing, mutateEditing };
}

export default useEditCabin;
