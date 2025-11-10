import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FacultyLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //navigate("/faculty/dashboard");
    try{
      const response = await fetch("http://localhost:5000/faculty/login",{
        method : "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      const data = await response.json();
      if(response.ok && data.success){
        navigate(`/faculty/dashboard/${data.faculty.id}`);
      }else{
        alert(data.message || "Invalid credentials");
      }
    } catch(error){
      console.error("Login error:",error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-faculty/5 to-faculty/10 flex items-center justify-center p-6">
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
            <div className="mx-auto p-4 bg-gradient-faculty rounded-full mb-4">
              <BookOpen className="h-8 w-8 text-faculty-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold">Faculty Login</CardTitle>
            <CardDescription>
              Access your teaching dashboard and student management tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Faculty ID / Email</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="faculty@college.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
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

              <Button type="submit" variant="faculty" className="w-full" size="lg">
                Access Faculty Dashboard
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Demo credentials: faculty@college.edu / faculty123
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 shadow-soft">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-center mb-4">Faculty Tools</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-faculty rounded-full" />
                  <span>Grade Management</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-faculty rounded-full" />
                  <span>Attendance Tracking</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-faculty rounded-full" />
                  <span>Student Feedback</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-faculty rounded-full" />
                  <span>Class Management</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacultyLogin;