import { delay, http, HttpResponse } from "msw";

import { MOCK_RUNS } from "./runs.mock";

export const runsHandlers = [
  http.get("/api/runs", async () => {
    await delay(1000);
    return HttpResponse.json(MOCK_RUNS);
  }),
];
