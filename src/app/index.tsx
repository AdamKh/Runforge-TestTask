import { LucideProvider } from "lucide-react";

import { RunPage } from "@/pages";

import "./styles/index.css";

function App() {
  return (
    <LucideProvider color="var(--bg-secondary)" size={18}>
      <main>
        <RunPage />
      </main>
    </LucideProvider>
  );
}

export default App;
