import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    studentId: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/student/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: formData.studentId,
        password: formData.password
      })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      navigate("/student/dashboard");
    } else {
      alert(data.message || "Invalid credentials");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong. Please try again.");
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-student/5 to-student/10 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
        
        <Card className="shadow-strong animate-bounce-in">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto p-4 bg-gradient-student rounded-full mb-4">
              <GraduationCap className="h-8 w-8 text-student-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold">Student Login</CardTitle>
            <CardDescription>
              Access your academic portal and track your progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID / Email</Label>
                <Input
                  id="studentId"
                  type="text"
                  placeholder="student@college.edu or STU001"
                  value={formData.studentId}
                  onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                  required
                  className="transition-all duration-300 focus:shadow-soft"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                    className="pr-10 transition-all duration-300 focus:shadow-soft"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <Button type="submit" variant="student" className="w-full" size="lg">
                Access Student Portal
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Demo credentials: student@college.edu / student123
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 shadow-soft">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-center mb-4">Student Services</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-student rounded-full" />
                  <span>View Grades</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-student rounded-full" />
                  <span>Check Attendance</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-student rounded-full" />
                  <span>Notifications</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-student rounded-full" />
                  <span>Profile Updates</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentLogin;