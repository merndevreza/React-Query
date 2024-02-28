import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 5000, // it means the cached data remains fresh for 5 seconds before React-Query considers it stale.
      //If the data is requested again within this time frame, React-Query will return the cached data without making a new network request (unless forced to refetch).
      //After the specified staleTime duration elapses, the cached data becomes stale. This means that while React-Query will still return the cached data if requested, it will also attempt to fetch new data in the background to keep the cache up to date.
      //If a component renders while the data is stale, it will display the cached data immediately (optimistic UI), and the UI may update later if the new data arrives.
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
