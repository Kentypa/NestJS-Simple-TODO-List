import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApplicationRoutes } from "./screens/ApplicationRoutes";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ApplicationRoutes />
    </QueryClientProvider>
  );
}

export default App;
