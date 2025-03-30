import { BrowserRouter } from "react-router";
import Router from "./router";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <Router />
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
