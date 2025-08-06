import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
import { useNavigate } from "react-router-dom";

const FacultyDashboard = () => {
  const navigate = useNavigate();

  const classStats = [
    { title: "My Classes", value: "6", icon: BookOpen, color: "faculty" },
    { title: "Total Students", value: "142", icon: Users, color: "student" },
    { title: "Pending Grades", value: "23", icon: ClipboardList, color: "destructive" },
    { title: "Attendance Rate", value: "87%", icon: CheckCircle, color: "accent" }
  ];

  const myClasses = [
    { 
      name: "Data Structures", 
      code: "CS201", 
      students: 35, 
      schedule: "Mon, Wed, Fri - 10:00 AM",
      attendance: 92,
      pendingGrades: 5
    },
    { 
      name: "Algorithms", 
      code: "CS301", 
      students: 28, 
      schedule: "Tue, Thu - 2:00 PM",
      attendance: 89,
      pendingGrades: 8
    },
    { 
      name: "Database Systems", 
      code: "CS401", 
      students: 42, 
      schedule: "Mon, Wed - 3:00 PM",
      attendance: 85,
      pendingGrades: 10
    }
  ];

  const recentActivities = [
    { action: "Grade submitted for CS201", time: "2 hours ago", type: "success" },
    { action: "Attendance marked for CS301", time: "4 hours ago", type: "info" },
    { action: "New feedback received", time: "1 day ago", type: "warning" },
    { action: "Assignment created", time: "2 days ago", type: "success" }
  ];

  const quickActions = [
    { title: "Take Attendance", icon: Clock, description: "Mark student attendance", variant: "default" },
    { title: "Add Grades", icon: Plus, description: "Submit student grades", variant: "default" },
    { title: "View Feedback", icon: MessageSquare, description: "Check student feedback", variant: "outline" },
    { title: "Class Schedule", icon: Calendar, description: "Manage class timings", variant: "outline" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-soft">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Faculty Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, Dr. Johnson</p>
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

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={action.title}
                    variant={action.variant as any}
                    className="h-auto p-4 justify-start hover:shadow-soft transition-all duration-300"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-faculty/10 rounded">
                        <action.icon className="h-4 w-4 text-faculty" />
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

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Recent Activities
              </CardTitle>
              <CardDescription>Your latest actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`p-1 rounded-full ${
                      activity.type === 'success' ? 'bg-green-100' :
                      activity.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'success' ? 'bg-green-600' :
                        activity.type === 'warning' ? 'bg-yellow-600' : 'bg-blue-600'
                      }`} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Classes */}
        <Card>
          <CardHeader>
            <CardTitle>My Classes</CardTitle>
            <CardDescription>Overview of your current classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myClasses.map((classInfo, index) => (
                <div key={classInfo.code} className="p-4 border rounded-lg hover:shadow-soft transition-all duration-300">
                  <div className="grid lg:grid-cols-5 gap-4 items-center">
                    <div className="lg:col-span-2">
                      <h3 className="font-semibold text-foreground">{classInfo.name}</h3>
                      <p className="text-sm text-muted-foreground">{classInfo.code}</p>
                      <p className="text-xs text-muted-foreground mt-1">{classInfo.schedule}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm font-medium">{classInfo.students} Students</p>
                      <Badge variant="secondary" className="mt-1">Active</Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Attendance</span>
                        <span>{classInfo.attendance}%</span>
                      </div>
                      <Progress value={classInfo.attendance} className="h-2" />
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Badge 
                        variant={classInfo.pendingGrades > 5 ? "destructive" : "secondary"}
                        className="text-center"
                      >
                        {classInfo.pendingGrades} Pending Grades
                      </Badge>
                      <Button size="sm" variant="faculty">
                        Manage
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Analytics */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Grade Distribution</CardTitle>
              <CardDescription>Overview of student performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">A Grade</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={25} className="w-24 h-2" />
                    <span className="text-sm font-medium">25%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">B Grade</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={35} className="w-24 h-2" />
                    <span className="text-sm font-medium">35%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">C Grade</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={30} className="w-24 h-2" />
                    <span className="text-sm font-medium">30%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Below C</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={10} className="w-24 h-2" />
                    <span className="text-sm font-medium">10%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Student Feedback</CardTitle>
              <CardDescription>Recent feedback from students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-muted/50 rounded">
                  <p className="text-sm">"Great explanation of algorithms!"</p>
                  <p className="text-xs text-muted-foreground mt-1">CS301 - Anonymous</p>
                </div>
                <div className="p-3 bg-muted/50 rounded">
                  <p className="text-sm">"More examples would be helpful."</p>
                  <p className="text-xs text-muted-foreground mt-1">CS201 - Anonymous</p>
                </div>
                <div className="p-3 bg-muted/50 rounded">
                  <p className="text-sm">"Love the interactive sessions!"</p>
                  <p className="text-xs text-muted-foreground mt-1">CS401 - Anonymous</p>
                </div>
                <Button variant="outline" className="w-full">
                  View All Feedback
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;