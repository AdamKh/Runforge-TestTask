import { useEffect, useState } from "react";

import { fetchRuns } from "@/entities/run/api/fetchRuns";
import type { Run } from "@/entities/run/model/types";
import { RunCard } from "@/entities/run/ui/runCard";

import styles from "./styles.module.css";

export function RunPage() {
  const [runs, setRuns] = useState<Run[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    fetchRuns()
      .then((runs) => setRuns(runs))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Recent runs</h1>
      <div className={styles.runs}>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error</p>}
        {runs?.map((run) => (
          <RunCard run={run} key={run.id} />
        ))}
      </div>
    </div>
  );
}
