import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PageOne from "./pages/pageOne";
import PageTwo from "./pages/pageTwo";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Page 1</Link> |{" "}
        <Link to="/page2">Page 2</Link>
      </nav>

      <Routes>
        <Route path="/" element={<PageOne />} />
        <Route path="/page2" element={<PageTwo />} />
      </Routes>
    </BrowserRouter>
  );
}
