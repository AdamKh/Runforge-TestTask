import type { Run } from "@/entities/run/model/types";

type FilterRunsParams = {
  runs: Run[];
  searchValue: string;
  filtersValue: string[];
  sortValue: string | null;
};

export function filterRuns({
  runs,
  searchValue,
  filtersValue,
  sortValue,
}: FilterRunsParams): Run[] {
  let res = [...runs];

  // Search
  if (searchValue.trim()) {
    const query = searchValue.trim().toLowerCase();

    res = res.filter((run) => run.name.toLowerCase().includes(query));
  }

  // Filter
  if (filtersValue.length > 0 && !filtersValue.includes("all")) {
    res = res.filter((run) => filtersValue.includes(run.status.toLowerCase()));
  }

  // Sort
  switch (sortValue) {
    case "newer":
      res.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      break;

    case "older":
      res.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
      break;

    case "longer":
      res.sort((a, b) => {
        if (a.durationSeconds == null && b.durationSeconds == null) return 0;
        if (a.durationSeconds == null) return 1;
        if (b.durationSeconds == null) return -1;

        return b.durationSeconds - a.durationSeconds;
      });
      break;

    case "shorter":
      res.sort((a, b) => {
        if (a.durationSeconds == null && b.durationSeconds == null) return 0;
        if (a.durationSeconds == null) return 1;
        if (b.durationSeconds == null) return -1;

        return a.durationSeconds - b.durationSeconds;
      });
      break;
  }

  return res;
}
