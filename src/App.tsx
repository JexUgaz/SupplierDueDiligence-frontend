import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "@/navigation/navigation";

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
