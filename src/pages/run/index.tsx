import { useState } from "react";

import { RunCard } from "@/entities/run/ui/runCard";
import { Button } from "@/shared/ui";
import { Filters } from "@/widgets";

import { useRun } from "./model/hooks";
import { filterRuns } from "./model/utils";

import styles from "./styles.module.css";

export function RunPage() {
  const params = new URLSearchParams(location.search);
  const searchValueParam = params.get("searchValue");
  const filtersValueParam = params.get("filtersValue");
  const sortValueParam = params.get("sortValue");

  const { runs, isLoading, isError, refetch } = useRun();

  const [searchValue, setSearchValue] = useState<string>(
    searchValueParam ?? "",
  );
  const [filtersValue, setFiltersValue] = useState<string[]>(
    filtersValueParam?.slice(1, -1).split(",") ?? [],
  );
  const [sortValue, setSortValue] = useState<string | null>(
    sortValueParam ?? null,
  );

  const filteredRuns = filterRuns({
    runs,
    searchValue,
    filtersValue,
    sortValue,
  });

  const reset = () => {
    setSearchValue("");
    setFiltersValue([]);
  };

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
        disabled={isLoading || isError}
      />

      {isLoading || isError || filteredRuns.length === 0 ? (
        <div className={styles.state}>
          {isLoading && <p>Loading...</p>}
          {isError && (
            <>
              <p>Something went wrong</p>
              <Button
                extClassNames={{ button: styles.retryButton }}
                label="Retry"
                onClick={refetch}
              />
            </>
          )}
          {!isLoading && !isError && filteredRuns.length === 0 && (
            <>
              <p>No runs match your search or filters.</p>
              {runs.length !== 0 && (
                <Button
                  extClassNames={{ button: styles.retryButton }}
                  label="Reset filters & search"
                  onClick={reset}
                />
              )}
            </>
          )}
        </div>
      ) : (
        <div className={styles.runs}>
          {filteredRuns?.map((run) => (
            <RunCard run={run} key={run.id} />
          ))}
        </div>
      )}
    </div>
  );
}
