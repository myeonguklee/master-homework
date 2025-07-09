if (import.meta.env.DEV) {
  import("./test/mocks/browser").then(({ worker }) => {
    worker.start();
  });
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
