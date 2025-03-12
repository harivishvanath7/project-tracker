import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TopicsPage from "./pages/TopicsPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:category" element={<TopicsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
  