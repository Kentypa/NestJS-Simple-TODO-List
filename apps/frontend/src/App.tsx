import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { TodosContent } from "./components/TodosContent";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <Header />
        <TodosContent />
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
