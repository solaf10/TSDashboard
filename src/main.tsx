import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/router.tsx";

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
