import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  BarChart3, 
  Bell, 
  Settings,
  LogOut,
  ClipboardList,
  TrendingUp,
  Clock,
  CheckCircle,
  Award,
  User
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const academicStats = [
    { title: "Current GPA", value: "3.74", icon: Award, color: "student" },
    { title: "Enrolled Courses", value: "6", icon: BookOpen, color: "primary" },
    { title: "Attendance", value: "89%", icon: CheckCircle, color: "accent" },
    { title: "Pending Tasks", value: "4", icon: ClipboardList, color: "destructive" }
  ];

  const enrolledCourses = [
    { 
      name: "Data Structures", 
      code: "CS201", 
      instructor: "Dr. Johnson",
      grade: "A-",
      attendance: 92,
      nextClass: "Tomorrow 10:00 AM"
    },
    { 
      name: "Calculus II", 
      code: "MATH201", 
      instructor: "Prof. Smith",
      grade: "B+",
      attendance: 88,
      nextClass: "Today 2:00 PM"
    },
    { 
      name: "Physics", 
      code: "PHY101", 
      instructor: "Dr. Wilson",
      grade: "A",
      attendance: 95,
      nextClass: "Friday 11:00 AM"
    }
  ];

  const recentGrades = [
    { subject: "Data Structures", assignment: "Assignment 3", grade: "A-", date: "2 days ago" },
    { subject: "Calculus II", assignment: "Midterm Exam", grade: "B+", date: "1 week ago" },
    { subject: "Physics", assignment: "Lab Report", grade: "A", date: "1 week ago" },
    { subject: "Data Structures", assignment: "Quiz 2", grade: "A", date: "2 weeks ago" }
  ];

  const notifications = [
    { message: "Assignment due tomorrow for CS201", time: "2 hours ago", type: "warning" },
    { message: "New grade posted for MATH201", time: "1 day ago", type: "info" },
    { message: "Class cancelled for PHY101", time: "2 days ago", type: "info" },
    { message: "Fee payment reminder", time: "3 days ago", type: "warning" }
  ];

  const upcomingEvents = [
    { title: "Data Structures Quiz", date: "Tomorrow", time: "10:00 AM" },
    { title: "Physics Lab", date: "Friday", time: "2:00 PM" },
    { title: "Math Assignment Due", date: "Monday", time: "11:59 PM" },
    { title: "Career Fair", date: "Next Week", time: "All Day" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-soft">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Student Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, John Doe</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs flex items-center justify-center text-white">
                  3
                </span>
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
          {academicStats.map((stat, index) => (
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
          {/* Current Courses */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Current Courses
              </CardTitle>
              <CardDescription>Your enrolled courses this semester</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {enrolledCourses.map((course, index) => (
                  <div key={course.code} className="p-4 border rounded-lg hover:shadow-soft transition-all duration-300">
                    <div className="grid lg:grid-cols-4 gap-4 items-center">
                      <div>
                        <h3 className="font-semibold text-foreground">{course.name}</h3>
                        <p className="text-sm text-muted-foreground">{course.code}</p>
                        <p className="text-xs text-muted-foreground">{course.instructor}</p>
                      </div>
                      
                      <div className="text-center">
                        <Badge 
                          variant={course.grade.startsWith('A') ? 'default' : course.grade.startsWith('B') ? 'secondary' : 'outline'}
                          className="text-sm font-semibold"
                        >
                          {course.grade}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Attendance</span>
                          <span>{course.attendance}%</span>
                        </div>
                        <Progress value={course.attendance} className="h-2" />
                      </div>
                      
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Next Class</p>
                        <p className="text-sm font-medium">{course.nextClass}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Upcoming Events
              </CardTitle>
              <CardDescription>Your schedule at a glance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-3 border rounded hover:bg-muted/50 transition-colors">
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.date} • {event.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Grades */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Recent Grades
              </CardTitle>
              <CardDescription>Your latest academic performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentGrades.map((grade, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium text-sm">{grade.assignment}</p>
                      <p className="text-xs text-muted-foreground">{grade.subject}</p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={grade.grade.startsWith('A') ? 'default' : grade.grade.startsWith('B') ? 'secondary' : 'outline'}
                      >
                        {grade.grade}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{grade.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>Important updates and reminders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 border rounded">
                    <div className={`p-1 rounded-full ${
                      notification.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        notification.type === 'warning' ? 'bg-yellow-600' : 'bg-blue-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Academic Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Academic Progress</CardTitle>
            <CardDescription>Your semester performance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-student mb-2">3.74</div>
                <p className="text-sm text-muted-foreground">Current GPA</p>
                <p className="text-xs text-green-600 mt-1">↑ 0.12 from last semester</p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary mb-2">18</div>
                <p className="text-sm text-muted-foreground">Credit Hours</p>
                <p className="text-xs text-muted-foreground mt-1">This semester</p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-accent mb-2">89%</div>
                <p className="text-sm text-muted-foreground">Overall Attendance</p>
                <p className="text-xs text-muted-foreground mt-1">Above average</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;