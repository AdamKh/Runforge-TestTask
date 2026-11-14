import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./app/index.tsx";

async function enableMocking() {
  const { worker } = await import("@/entities/run/api/mocks/browser");
  await worker.start({ onUnhandledFrame: "bypass" });
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
