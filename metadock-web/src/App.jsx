import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TargetInput from "./pages/TargetInput";
import JobStatus from "./pages/JobStatus";
import Results from "./pages/Results";
import Navbar from "./Components/layout/Navbar";
import Footer from "./Components/layout/Footer";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOTP from "./pages/VerifyOTP";
import History from "./pages/History";
import Contact from "./pages/ContactUs";

export default function App() {
  return (
    <div
      className="min-h-screen  bg-gray-50 text-gray-900
                    dark:bg-gray-950 dark:text-gray-100"
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<VerifyOTP />} />
          <Route path="/analyze" element={<Dashboard />} />

          <Route path="/status/:jobId" element={<JobStatus />} />
          <Route path="/results/:targetId" element={<Results />} />
          <Route path ="/history" element={<History/>}/>
          <Route path ="/contact-us" element={<Contact/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
