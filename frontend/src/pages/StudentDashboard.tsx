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

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/student/${id}`);
        const data = await res.json();
        console.log("Fetched:", data);

        if (data.success && data.studentData.length > 0) {
          setStudentInfo(data.studentData[0]);
          setCourses(data.studentData);
        } else {
          console.error("Student not found");
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

  const gradeToPoints = (grade: string) => {
    switch (grade.toUpperCase()) {
      case "A":
        return 9;
      case "B":
        return 8;
      case "C":
        return 7;
      case "D":
        return 6;
      default:
        return 0;
    }
  };

  const gpa =
    courses.reduce((sum, c) => sum + gradeToPoints(c.st_grades), 0) /
    courses.length;

  const academicStats = [
    { title: "Current GPA", value: gpa.toFixed(2), icon: Award },
    { title: "Enrolled Courses", value: courses.length.toString(), icon: BookOpen },
    { title: "Semester", value: courses[0]?.st_semester || "N/A", icon: Calendar },
    { title: "Branch", value: studentInfo.student_branch.toUpperCase(), icon: ClipboardList },
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
              <User className="mr-2 h-4 w-4" />
              Profile
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
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="p-6 space-y-8 max-w-6xl mx-auto">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {academicStats.map((stat, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-transform hover:-translate-y-1 border-blue-100"
            >
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {stat.value}
                  </p>
                </div>
                <stat.icon className="h-7 w-7 text-sky-500" />
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Enrolled Courses Section */}
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
              <CardDescription>
                All the courses you are registered in this semester.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((c, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 border border-blue-100 rounded-xl bg-white/60 hover:bg-blue-50 transition-all shadow-sm"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-blue-800">
                          {c.course_name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{c.course_id}</p>
                        <p className="text-xs text-muted-foreground">
                          Credits: {c.credits} | Semester: {c.st_semester}
                        </p>
                      </div>
                      <Badge
                        variant={
                          c.st_grades === "A"
                            ? "default"
                            : c.st_grades === "B"
                            ? "secondary"
                            : "outline"
                        }
                        className="text-sm font-semibold px-3 py-1"
                      >
                        {c.st_grades}
                      </Badge>
                    </div>

                    <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-muted-foreground">
                      <p>Midsem: {c.midsem_marks}</p>
                      <p>Endsem: {c.endsem_marks}</p>
                      <p>TA: {c.TA}</p>
                      <p>Lab: {c.lab}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Academic Summary */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Card className="shadow-md border-blue-100">
            <CardHeader>
              <CardTitle className="text-blue-700">Academic Summary</CardTitle>
              <CardDescription>
                Quick snapshot of your current performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-100 to-sky-50 border">
                  <div className="text-3xl font-bold text-blue-700 mb-2">
                    {gpa.toFixed(2)}
                  </div>
                  <p className="text-sm text-muted-foreground">Current GPA</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-gradient-to-br from-sky-100 to-blue-50 border">
                  <div className="text-3xl font-bold text-blue-700 mb-2">
                    {courses.length}
                  </div>
                  <p className="text-sm text-muted-foreground">Courses Enrolled</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-50 border">
                  <div className="text-3xl font-bold text-blue-700 mb-2">
                    {studentInfo.student_branch.toUpperCase()}
                  </div>
                  <p className="text-sm text-muted-foreground">Branch</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <footer className="text-center text-sm text-muted-foreground py-6">
        © 2025 Student Portal — Designed with 💙 by Rohit
      </footer>
    </div>
  );
};

export default StudentDashboard;
