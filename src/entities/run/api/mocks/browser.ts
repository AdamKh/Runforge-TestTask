import { setupWorker } from "msw/browser";

import { runsHandlers } from "@/entities/run/api/mocks/handlers";

export const worker = setupWorker(...runsHandlers);
