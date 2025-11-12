import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Calendar,
  Bell,
  LogOut,
  ClipboardList,
  Award,
  User,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [studentInfo, setStudentInfo] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getYearFromBT = (btId: string) => {
    const yearCode = parseInt(btId.slice(2, 4));
    if (yearCode === 25) return "1st Year";
    if (yearCode === 24) return "2nd Year";
    if (yearCode === 23) return "3rd Year";
    if (yearCode === 22) return "4th Year";
    return "N/A";
  };

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/student/${id}`);
        const data = await res.json();
        console.log("Fetched student data:", data);

        if (data.success && Array.isArray(data.studentData) && data.studentData.length > 0) {
          const rows = data.studentData;

          setStudentInfo({
            student_id: rows[0].student_id,
            student_name: rows[0].student_name,
            student_email: rows[0].student_email,
            student_branch: rows[0].student_branch,
          });

          setCourses(rows);
        } else {
          console.error("Invalid studentData format:", data);
        }
      } catch (err) {
        console.error("Error fetching student data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchStudentData();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-lg font-semibold text-blue-700">
        Loading student data...
      </div>
    );

  if (!studentInfo)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-red-50 to-rose-100 text-lg font-semibold text-red-500">
        Student not found
      </div>
    );

  // ✅ Updated Grade-to-Points mapping for A, B, C, etc.
  const gradeToPoints = (grade: string) => {
    switch ((grade || "").toUpperCase()) {
      case "AA": return 10;
      case "A": return 9;
      case "AB": return 8;
      case "B": return 7;
      case "BC": return 6;
      case "C": return 5;
      case "CD": return 4;
      case "D": return 3;
      case "F": return 0;
      default: return 0;
    }
  };

  // ✅ Weighted GPA calculation
  const totalCredits = courses.reduce((sum, c) => sum + (c.credits || 0), 0);
  const weightedGPA =
    totalCredits > 0
      ? courses.reduce(
          (sum, c) => sum + gradeToPoints(c.st_grades || "NA") * (c.credits || 0),
          0
        ) / totalCredits
      : 0;

  const academicStats = [
    { title: "Current GPA", value: weightedGPA.toFixed(2), icon: Award },
    { title: "Enrolled Courses", value: courses.length.toString(), icon: BookOpen },
    { title: "Year", value: getYearFromBT(studentInfo.student_id), icon: Calendar },
    {
      title: "Branch",
      value: (studentInfo.student_branch || "N/A").toUpperCase(),
      icon: ClipboardList,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur border-b border-blue-100 shadow-sm sticky top-0 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-700 to-sky-500 text-transparent bg-clip-text">
              Student Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {studentInfo.student_name}
            </p>
            <p className="text-xs text-muted-foreground">
              {studentInfo.student_email} • {studentInfo.student_id}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="shadow-sm">
              <User className="mr-2 h-4 w-4" /> Profile
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="shadow-sm bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => navigate(`/student/${id}/register`)}
            >
              + Register Subjects
            </Button>

            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="text-red-600 hover:text-red-700"
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 space-y-8 max-w-6xl mx-auto">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {academicStats.map((stat, i) => (
            <Card
              key={i}
              className="hover:shadow-lg transition-transform hover:-translate-y-1 border-blue-100"
            >
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-blue-700">{stat.value}</p>
                </div>
                <stat.icon className="h-7 w-7 text-sky-500" />
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Courses */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-md border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
                <BookOpen className="mr-2 h-5 w-5" />
                Enrolled Courses
              </CardTitle>
              <CardDescription>All your registered courses.</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {courses.length === 0 ? (
                  <div className="p-6 text-center text-lg font-semibold text-blue-700">
                    No subjects registered
                  </div>
                ) : (
                  courses.map((c, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 border border-blue-100 rounded-xl bg-white/60 hover:bg-blue-50 transition-all shadow-sm"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-blue-800">
                            {c.course_name || "Unknown Course"}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {c.course_id}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Credits: {c.credits ?? 0} · Semester: {c.st_semester ?? "N/A"}
                          </p>
                        </div>

                        <Badge
                          variant={
                            (c.st_grades || "NA").toUpperCase() === "AA"
                              ? "default"
                              : (c.st_grades || "NA").toUpperCase() === "A"
                              ? "secondary"
                              : "outline"
                          }
                          className="text-sm font-semibold px-3 py-1"
                        >
                          {(c.st_grades || "NA").toUpperCase()}
                        </Badge>
                      </div>

                      <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-muted-foreground">
                        <p>Midsem: {c.midsem_marks ?? "N/A"}</p>
                        <p>Endsem: {c.endsem_marks ?? "N/A"}</p>
                        <p>TA: {c.TA ?? "N/A"}</p>
                        <p>Lab: {c.lab ?? "N/A"}</p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <footer className="text-center text-sm text-muted-foreground py-6">
        © 2025 Student Portal
      </footer>
    </div>
  );
};

export default StudentDashboard;
