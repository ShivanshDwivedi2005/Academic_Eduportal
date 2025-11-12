// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { 
//   Users, 
//   GraduationCap, 
//   BookOpen, 
//   BarChart3, 
//   Plus, 
//   Settings,
//   LogOut,
//   Calendar,
//   TrendingUp,
//   UserCheck
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { set } from "date-fns";

// const AdminDashboard = () => {
//   const navigate = useNavigate();

//   //  State for total students fetched from backend
//   const [studentCount, setStudentCount] = useState<number | null>(null);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/student-count")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Student count fetched:", data);
//         setStudentCount(Number(data));
//       })
//       .catch((err) => {
//         console.error("Error fetching student count:", err);
//       });
//   }, []);

//   const [facultyCount, setFacultyCount] = useState<number | null>(null);
//   useEffect(()=>{
//     fetch("http://localhost:5000/api/faculty-count")
//     .then((res)=>res.json())
//     .then((data)=>{
//       console.log("faculty count fetched: ",data);
//       setFacultyCount(Number(data));
//     })
//     .catch((err)=>{
//       console.error("Error fetching faculty conunt: ",err);
//     });
//   },[]);
//   const stats = [
//     { title: "Total Students", value: studentCount !== null ? studentCount.toString() : "Loading...", icon: GraduationCap, change: "+12%", color: "student" },
//     { title: "Faculty Members", value: facultyCount !==null ? facultyCount.toString() : "Loading...", icon: BookOpen, change: "+3%", color: "faculty" },
//     { title: "Active Courses", value: "156", icon: Users, change: "+8%", color: "primary" },
//     { title: "System Usage", value: "94%", icon: BarChart3, change: "+2%", color: "accent" }
//   ];

//   const recentActivities = [
//     { action: "New student enrolled", user: "John Doe", time: "2 hours ago", type: "success" },
//     { action: "Faculty login", user: "Dr. Smith", time: "4 hours ago", type: "info" },
//     { action: "Grade submitted", user: "Prof. Johnson", time: "6 hours ago", type: "success" },
//     { action: "System update", user: "Admin", time: "1 day ago", type: "warning" }
//   ];

//   const quickActions = [
//     { title: "Add Faculty", icon: Plus, description: "Create new faculty account", action: () => navigate('/addfaculty') },
//     { title: "Add Student", icon: UserCheck, description: "Enroll new student", action: () => navigate('/addstudent') },
//     { title: "Schedule Settings", icon: Settings, description: "Schedule Timetable", action: () => navigate('/schedule-settings') },
//     { title: "View Reports", icon: BarChart3, description: "Analytics & insights", action: () => navigate('/reports') }
//   ];

//   return (
//     <div className="min-h-screen bg-background">
//       <header className="bg-card border-b shadow-soft">
//         <div className="px-6 py-4 flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
//             <p className="text-muted-foreground">Welcome back, Administrator</p>
//           </div>
//           <div className="flex items-center space-x-4">
//             <Button variant="outline" size="sm">
//               <Settings className="mr-2 h-4 w-4" />
//               Settings
//             </Button>
//             <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
//               <LogOut className="mr-2 h-4 w-4" />
//               Logout
//             </Button>
//           </div>
//         </div>
//       </header>

//       <div className="p-6 space-y-6">
//         {/* Stats Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {stats.map((stat, index) => (
//             <Card key={stat.title} className="hover:shadow-medium transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
//                     <p className="text-2xl font-bold text-foreground">{stat.value}</p>
//                     <p className="text-xs text-muted-foreground mt-1">
//                       <span className="text-green-600">{stat.change}</span> from last month
//                     </p>
//                   </div>
//                   <div className={`p-3 rounded-full bg-gradient-${stat.color}`}>
//                     <stat.icon className="h-6 w-6 text-white" />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* Quick Actions + Recent Activities */}
//         <div className="grid lg:grid-cols-3 gap-6">
//           <Card className="lg:col-span-2">
//             <CardHeader>
//               <CardTitle className="flex items-center">
//                 <TrendingUp className="mr-2 h-5 w-5" />
//                 Quick Actions
//               </CardTitle>
//               <CardDescription>Frequently used administrative tasks</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-2 gap-4">
//                 {quickActions.map((action) => (
//                   <Button
//                     key={action.title}
//                     variant="outline"
//                     className="h-auto p-4 justify-start hover:shadow-soft transition-all duration-300"
//                     onClick={action.action}
//                   >
//                     <div className="flex items-start space-x-3">
//                       <div className="p-2 bg-primary/10 rounded">
//                         <action.icon className="h-4 w-4 text-primary" />
//                       </div>
//                       <div className="text-left">
//                         <p className="font-medium text-sm">{action.title}</p>
//                         <p className="text-xs text-muted-foreground">{action.description}</p>
//                       </div>
//                     </div>
//                   </Button>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center">
//                 <Calendar className="mr-2 h-5 w-5" />
//                 Recent Activities
//               </CardTitle>
//               <CardDescription>Latest system activities</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {recentActivities.map((activity, index) => (
//                   <div key={index} className="flex items-start space-x-3">
//                     <div className={`p-1 rounded-full ${
//                       activity.type === 'success' ? 'bg-green-100' :
//                       activity.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
//                     }`}>
//                       <div className={`w-2 h-2 rounded-full ${
//                         activity.type === 'success' ? 'bg-green-600' :
//                         activity.type === 'warning' ? 'bg-yellow-600' : 'bg-blue-600'
//                       }`} />
//                     </div>
//                     <div className="flex-1 space-y-1">
//                       <p className="text-sm font-medium">{activity.action}</p>
//                       <p className="text-xs text-muted-foreground">{activity.user}</p>
//                       <p className="text-xs text-muted-foreground">{activity.time}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Faculty & Student Management */}
//         <div className="grid lg:grid-cols-2 gap-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Faculty Management</CardTitle>
//               <CardDescription>Manage faculty members and assignments</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm">Total Faculty</span>
//                 <Badge variant="secondary">84</Badge>
//               </div>
//               <div className="flex items-center justify-between">
//                 <span className="text-sm">Active This Month</span>
//                 <Badge variant="default">78</Badge>
//               </div>
//               <div className="flex items-center justify-between">
//                 <span className="text-sm">Pending Approvals</span>
//                 <Badge variant="destructive">3</Badge>
//               </div>
//               <Button variant="faculty" className="w-full mt-4">
//                 Manage Faculty
//               </Button>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Student Management</CardTitle>
//               <CardDescription>Oversee student enrollment and records</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm">Total Students</span>
//                 <Badge variant="secondary">
//                   {studentCount !== null ? studentCount : "Loading..."}
//                 </Badge>
//               </div>
//               <div className="flex items-center justify-between">
//                 <span className="text-sm">Active Enrollment</span>
//                 <Badge variant="default">{studentCount !== null ? studentCount - 5 : "Loading..."}</Badge>
//               </div>
//               <div className="flex items-center justify-between">
//                 <span className="text-sm">Pending Actions</span>
//                 <Badge variant="destructive">8</Badge>
//               </div>
//               <Button variant="student" className="w-full mt-4">
//                 Manage Students
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;




import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  BarChart3, 
  Plus, 
  Settings,
  LogOut,
  Calendar,
  TrendingUp,
  UserCheck
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { set } from "date-fns";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [studentCount, setStudentCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/student-count")
      .then((res) => res.json())
      .then((data) => {
        console.log("Student count fetched:", data);
        setStudentCount(Number(data));
      })
      .catch((err) => {
        console.error("Error fetching student count:", err);
      });
  }, []);

  const [facultyCount, setFacultyCount] = useState<number | null>(null);
  useEffect(() => {
    fetch("http://localhost:5000/api/faculty-count")
      .then((res) => res.json())
      .then((data) => {
        console.log("faculty count fetched: ", data);
        setFacultyCount(Number(data));
      })
      .catch((err) => {
        console.error("Error fetching faculty conunt: ", err);
      });
  }, []);

  const stats = [
    { title: "Total Students", value: studentCount !== null ? studentCount.toString() : "Loading...", icon: GraduationCap, change: "+12%", color: "student" },
    { title: "Faculty Members", value: facultyCount !== null ? facultyCount.toString() : "Loading...", icon: BookOpen, change: "+3%", color: "faculty" },
    { title: "Active Courses", value: "156", icon: Users, change: "+8%", color: "primary" },
    { title: "System Usage", value: "94%", icon: BarChart3, change: "+2%", color: "accent" }
  ];

  const recentActivities = [
    { action: "New student enrolled", user: "John Doe", time: "2 hours ago", type: "success" },
    { action: "Faculty login", user: "Dr. Smith", time: "4 hours ago", type: "info" },
    { action: "Grade submitted", user: "Prof. Johnson", time: "6 hours ago", type: "success" },
    { action: "System update", user: "Admin", time: "1 day ago", type: "warning" }
  ];

  const quickActions = [
    { title: "Add Faculty", icon: Plus, description: "Create new faculty account", action: () => navigate('/addfaculty') },
    { title: "Add Student", icon: UserCheck, description: "Enroll new student", action: () => navigate('/addstudent') },
    { title: "Schedule Settings", icon: Settings, description: "Schedule Timetable", action: () => navigate('/schedule-settings') },
    { title: "View Reports", icon: BarChart3, description: "Analytics & insights", action: () => navigate('/reports') }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b shadow-soft">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Administrator</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={stat.title}
              className="hover:shadow-medium transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="text-green-600">{stat.change}</span> from last month
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-gradient-${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions + Recent Activities */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>Frequently used administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action) => (
                  <Button
                    key={action.title}
                    variant="outline"
                    className="h-auto p-4 justify-start hover:shadow-soft transition-all duration-300"
                    onClick={action.action}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-primary/10 rounded">
                        <action.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-sm">{action.title}</p>
                        <p className="text-xs text-muted-foreground">{action.description}</p>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Recent Activities
              </CardTitle>
              <CardDescription>Latest system activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div
                      className={`p-1 rounded-full ${
                        activity.type === "success"
                          ? "bg-green-100"
                          : activity.type === "warning"
                          ? "bg-yellow-100"
                          : "bg-blue-100"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.type === "success"
                            ? "bg-green-600"
                            : activity.type === "warning"
                            ? "bg-yellow-600"
                            : "bg-blue-600"
                        }`}
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.user}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Faculty & Student Management */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Faculty Management</CardTitle>
              <CardDescription>Manage faculty members and assignments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Faculty</span>
                <Badge variant="secondary">84</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Active This Month</span>
                <Badge variant="default">78</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Pending Approvals</span>
                <Badge variant="destructive">3</Badge>
              </div>
              {/* 🔹 Added navigation here */}
              <Button
                variant="faculty"
                className="w-full mt-4"
                onClick={() => navigate("/manage-faculty")}
              >
                Manage Faculty
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Student Management</CardTitle>
              <CardDescription>Oversee student enrollment and records</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Students</span>
                <Badge variant="secondary">
                  {studentCount !== null ? studentCount : "Loading..."}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Enrollment</span>
                <Badge variant="default">
                  {studentCount !== null ? studentCount - 5 : "Loading..."}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Pending Actions</span>
                <Badge variant="destructive">8</Badge>
              </div>
              {/* 🔹 Added navigation here */}
              <Button
                variant="student"
                className="w-full mt-4"
                onClick={() => navigate("/manage-students")}
              >
                Manage Students
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
