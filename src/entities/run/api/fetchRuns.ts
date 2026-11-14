import type { Run } from "../model/types";

export async function fetchRuns(): Promise<Run[]> {
  const res = await fetch("/api/runs");
  if (!res.ok) throw new Error(`Failed to load runs: ${res.status}`);
  return res.json();
}
