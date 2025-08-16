import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const AddStudent = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone :"",
    id:"",
    branch:"",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const resp = await axios.post('http://localhost:5000/add_student',formData);
      console.log(resp);
      navigate("/admin/dashboard");
    }catch(e){
      console.log('student data not sent to server');
    }
    //navigate("/student/dashboard");
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
            <CardTitle className="text-2xl font-bold">Add Student</CardTitle>
            <CardDescription>
              Create student's account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email"> Student's Name</Label>
                <Input
                  id="fname"
                  type="text"
                  placeholder="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="transition-all duration-300 focus:shadow-soft"
                />
              </div>
              
               <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="bt23cse250@iiitn.ac.in"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="transition-all duration-300 focus:shadow-soft"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email"> Contact Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="2356522367"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                  className="transition-all duration-300 focus:shadow-soft"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email"> Unique Id</Label>
                <Input
                  id="id"
                  type="text"
                  placeholder="BT20CSE093"
                  value={formData.id}
                  onChange={(e) => setFormData({...formData, id: e.target.value})}
                  required
                  className="transition-all duration-300 focus:shadow-soft"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="branch">Branch</Label>
                <Input
                  id="branch"
                  type="branch"
                  placeholder="CSE"
                  value={formData.branch}
                  onChange={(e) => setFormData({...formData, branch: e.target.value})}
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
                Register Student
              </Button>
            </form>

            
          </CardContent>
        </Card>

        <Card className="mt-6 shadow-soft">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-center mb-4">Features for students</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-faculty rounded-full" />
                  <span>Check grades</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-faculty rounded-full" />
                  <span>Check attendence</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-faculty rounded-full" />
                  <span>Give Feedback</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-faculty rounded-full" />
                  <span>Class schedule</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddStudent;