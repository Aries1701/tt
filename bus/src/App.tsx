import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Booking from "./pages/Booking"
import BottomBar from "./components/BottomBar";
import TripList from "./pages/TripList";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/trips" element={<div>Trips</div>} /> */}
        <Route path="/tickets" element={<div>My Tickets</div>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/trips" element={<TripList />} />

      </Routes>

      {/* <BottomBar /> */}
    </BrowserRouter>
  );
}
