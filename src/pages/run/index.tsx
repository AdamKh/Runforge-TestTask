import { useEffect, useState } from "react";

import { fetchRuns } from "@/entities/run/api/fetchRuns";
import type { Run } from "@/entities/run/model/types";

import styles from "./styles.module.css";

export function RunPage() {
  const [runs, setRuns] = useState<Run[] | null>(null);

  useEffect(() => {
    fetchRuns().then((runs) => setRuns(runs));
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Recent runs</h2>
      {runs?.map((run) => (
        <p>{run.name}</p>
      ))}
    </div>
  );
}
