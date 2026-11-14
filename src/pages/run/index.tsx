import { useState } from "react";

import { RunCard } from "@/entities/run/ui/runCard";
import { Filters } from "@/widgets";

import { useRun } from "./model/hooks";
import { filterRuns } from "./model/utils";

import styles from "./styles.module.css";

export function RunPage() {
  const { runs, isLoading, isError } = useRun();

  const [searchValue, setSearchValue] = useState<string>("");
  const [filtersValue, setFiltersValue] = useState<string[]>([]);
  const [sortValue, setSortValue] = useState<string | null>(null);

  const filteredRuns = filterRuns({
    runs,
    searchValue,
    filtersValue,
    sortValue,
  });

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Recent runs</h1>

      <Filters
        searchValue={searchValue}
        filtersValue={filtersValue}
        sortValue={sortValue}
        setSearchValue={setSearchValue}
        setFiltersValue={setFiltersValue}
        setSortValue={setSortValue}
      />

      <div className={styles.runs}>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error</p>}

        {filteredRuns?.map((run) => (
          <RunCard run={run} key={run.id} />
        ))}
      </div>
    </div>
  );
}
