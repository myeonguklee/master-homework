import React from 'react';
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {TodosContainer} from "./component/TodosContainer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      suspense: true,
      useErrorBoundary: true,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodosContainer/>
    </QueryClientProvider>
  );
}

export default App;