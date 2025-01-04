import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../../services/apiSettings";
import { QUERY_KEYS } from "../../../types";
import { SettingsType } from "../types";

const useSettings = function () {
  const {
    data: settings,
    error,
    isPending,
  }: {
    data: SettingsType | undefined;
    error: any;
    isPending: boolean;
  } = useQuery({
    queryKey: [QUERY_KEYS.SETTINGS],
    queryFn: getSettings,
  });

  return { settings, error, isPending };
};

export default useSettings;
