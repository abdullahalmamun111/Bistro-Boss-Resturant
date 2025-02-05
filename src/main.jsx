import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Components/Router.jsx";
import { HelmetProvider } from "react-helmet-async";
import AuthContext from "./AuthProvider/AuthContext.jsx";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";


const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <AuthContext>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <StrictMode>
          <div className="max-w-screen-xl mx-auto">
            <RouterProvider router={router}></RouterProvider>
          </div>
        </StrictMode>
      </HelmetProvider>
    </QueryClientProvider>
  </AuthContext>
);
