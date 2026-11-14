import { useEffect, useState } from "react";

import { fetchRuns } from "@/entities/run/api/fetchRuns";
import type { Run } from "@/entities/run/model/types";

export const useRun = () => {
  const [runs, setRuns] = useState<Run[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const load = () =>
    fetchRuns()
      .then((runs) => setRuns(runs))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));

  const refetch = () => {
    setIsLoading(true);
    setIsError(false);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return { runs, isLoading, isError, refetch };
};
