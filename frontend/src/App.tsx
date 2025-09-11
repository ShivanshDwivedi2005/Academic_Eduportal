import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AdminLogin from "./pages/AdminLogin";
import FacultyLogin from "./pages/FacultyLogin";
import StudentLogin from "./pages/StudentLogin";
import AdminDashboard from "./pages/AdminDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import AddFaculty from "./pages/Add_Faculty_auth/AddFaculty";
import AddStudent from "./pages/Add_students/AddStudents";
import NotFound from "./pages/NotFound";
import ReportsPage from "./pages/ReportsPage";
import StudentDataFilter from "./pages/StudentDataFilter";
import ScheduleSettings from "./pages/ScheduleSettings";
import { motion } from "framer-motion";
import FacultyReportsPage from "./pages/FacultyReportsPage";
import TimetablePage from "./pages/Timetable";z
import { Router } from "lucide-react";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/faculty/login" element={<FacultyLogin />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/addfaculty" element={<AddFaculty />} />
          <Route path = "/addstudent" element = {<AddStudent />} />
          <Route path="*" element={<NotFound />} />
          <Route path = "/reports" element={<ReportsPage/>}/>
          <Route path = "faculty-reports" element = {<FacultyReportsPage/>}/>
          <Route path = "/student-reports" element = {<StudentDataFilter/>}/>
          <Route path="/schedule-settings" element = {<ScheduleSettings/>}/>
          <Route path="/timetable" element = {<TimetablePage/>} />
          <Route path="/timetable/:batch/:branch/:section" element={<TimetablePage />}/>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
