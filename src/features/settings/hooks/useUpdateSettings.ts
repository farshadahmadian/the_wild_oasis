import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../../services/apiSettings";
import { QUERY_KEYS } from "../../../types";
import toast from "react-hot-toast";

const useUpdateSettings = function () {
  const queryClient = useQueryClient();
  const { mutate: mutateUpdatingSettings, isPending: isUpdating } = useMutation(
    {
      mutationFn: updateSetting,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.SETTINGS],
        });
        toast.success("Settings successfully updated");
      },

      onError: () => {
        toast.error("Settings could not be updated");
      },
    }
  );

  return { mutateUpdatingSettings, isUpdating };
};

export default useUpdateSettings;
