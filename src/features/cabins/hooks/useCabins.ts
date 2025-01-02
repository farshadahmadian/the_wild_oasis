import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "../../../types";
import { getCabins } from "../../../services/apiCabins";

function useCabins() {
  const {
    isPending,
    data: cabins,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.CABINS],
    queryFn: getCabins,
  });

  return { isPending, cabins, error };
}

export default useCabins;
