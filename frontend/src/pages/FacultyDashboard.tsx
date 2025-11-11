import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Users, 
  Calendar, 
  BarChart3, 
  Plus, 
  Settings,
  LogOut,
  ClipboardList,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle
} from "lucide-react";

const FacultyDashboard = () => {
  const { fac_id } = useParams<{ fac_id: string }>();
  const navigate = useNavigate();

  const [faculty, setFaculty] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get faculty info
        const resFaculty = await fetch(`http://localhost:5000/api/faculty/${fac_id}`);
        const dataFaculty = await resFaculty.json();
        if (dataFaculty.success) setFaculty(dataFaculty.faculty);

        // Get courses for faculty
        const resCourses = await fetch(`http://localhost:5000/api/faculty/${fac_id}/courses`);
        const dataCourses = await resCourses.json();
        console.log(dataCourses);
        if (dataCourses.success) setCourses(dataCourses.courses);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (fac_id) fetchData();
  }, [fac_id]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!faculty) return <div className="text-center mt-20 text-red-500">Faculty not found</div>;

  const classStats = [
    { title: "My Classes", value: courses.length, icon: BookOpen, color: "faculty" },
    { title: "Total Students", value: courses.reduce((acc, c) => acc + (c.total_students || 0), 0), icon: Users, color: "student" },
    { title: "Pending Grades", value: 23, icon: ClipboardList, color: "destructive" }, // keeping hardcoded for future update
    { title: "Attendance Rate", value: "87%", icon: CheckCircle, color: "accent" } // keeping hardcoded for future update
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-soft">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Faculty Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {faculty.fac_name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Profile
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/")}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {classStats.map((stat, index) => (
            <Card key={stat.title} className="hover:shadow-medium transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gradient-${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        
<Card>
  <CardHeader>
    <CardTitle>My Courses</CardTitle>
    <CardDescription>
      Total Subjects :{" "}
      <span className="text-gray-900 font-bold">
        {Array.from(new Set(courses.map(c => c.subject_id))).length}
      </span>
    </CardDescription>
  </CardHeader>
  <CardContent>
    {courses.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from(new Map(courses.map(c => [c.subject_id, c])).values()).map((cls, index) => (
          <div
            key={cls.subject_id}
            className="p-4 border rounded-lg shadow hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <p className="font-bold text-gray-900 text-lg">
              {index + 1}. {cls.course_name?.toUpperCase() || cls.subject_id.toUpperCase()}
            </p>
            <p className="text-gray-700">ID: {cls.subject_id.toUpperCase()}</p>
            <p className="text-gray-700">Students: {cls.total_students || 0}</p>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-sm text-muted-foreground">No courses assigned</p>
    )}
  </CardContent>
</Card>




        {/* My Classes */}
        <Card>
          <CardHeader>
            <CardTitle>My Classes</CardTitle>
            <CardDescription>Overview of your current classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courses.map((cls) => (
                <div key={cls.subject_id + cls.batch + cls.section} className="p-4 border rounded-lg hover:shadow-soft transition-all duration-300">
                  <div className="grid lg:grid-cols-5 gap-4 items-center">
                    <div className="lg:col-span-2">
                      <h3 className="font-semibold text-foreground">{cls.subject_id}</h3>
                      <p className="text-sm text-muted-foreground">{cls.batch} - Section {cls.section}</p>
                      <p className="text-xs text-muted-foreground mt-1">{cls.day_name} - {cls.time_slot}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm font-medium">{cls.total_students || 0} Students</p>
                      <Badge variant="secondary" className="mt-1">Active</Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Attendance</span>
                        <span>87%</span> {/* keeping hardcoded for future update */}
                      </div>
                      <Progress value={87} className="h-2" /> {/* hardcoded for now */}
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Badge 
                        variant="secondary"
                        className="text-center"
                      >
                        0 Pending Grades {/* hardcoded for now */}
                      </Badge>
                      <Button 
                          size="sm" 
                          variant="faculty"
                          onClick={() => navigate(`/faculty/${fac_id}/manage/${cls.subject_id}/${cls.batch}/${cls.section}`)}
                      >
                        Manage
                      </Button>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Keep rest of the dashboard hardcoded for future updates */}
      </div>
    </div>
  );
};

export default FacultyDashboard;
