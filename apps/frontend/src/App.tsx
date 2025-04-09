import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApplicationRoutes } from "./screens/ApplicationRoutes";
import { store } from "./stores/store";
import { Provider } from "react-redux";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ApplicationRoutes />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
