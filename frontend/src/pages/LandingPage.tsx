import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Users, BookOpen, Shield, BarChart3, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const roles = [
    {
      title: "Administrator",
      description: "Complete system control and user management",
      icon: Shield,
      features: ["Generate login credentials", "Manage faculty & students", "System analytics", "Role assignments"],
      variant: "admin" as const,
      path: "/admin/login"
    },
    {
      title: "Faculty",
      description: "Academic management and student tracking",
      icon: BookOpen,
      features: ["Manage academic records", "Track attendance", "Student feedback", "Classroom management"],
      variant: "faculty" as const,
      path: "/faculty/login"
    },
    {
      title: "Student",
      description: "Access your academic information",
      icon: GraduationCap,
      features: ["View academic performance", "Check attendance", "Access notifications", "Profile management"],
      variant: "student" as const,
      path: "/student/login"
    }
  ];

  const features = [
    {
      icon: Users,
      title: "Role-Based Access",
      description: "Secure authentication with customized dashboards for each user type"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Comprehensive insights and data visualization for informed decision making"
    },
    {
      icon: Calendar,
      title: "Academic Management",
      description: "Complete academic lifecycle management from enrollment to graduation"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b shadow-soft">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <GraduationCap className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">EduPortal</h1>
                <p className="text-sm text-muted-foreground">College Management Platform</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6 animate-fade-in">
            Welcome to <span className="bg-gradient-primary bg-clip-text text-transparent">EduPortal</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-slide-up">
            A comprehensive college management platform designed to streamline academic operations, 
            enhance transparency, and improve engagement for administrators, faculty, and students.
          </p>
          
          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {roles.map((role, index) => (
              <Card 
                key={role.title} 
                className="group hover:shadow-strong transition-all duration-300 transform hover:scale-105 cursor-pointer animate-bounce-in"
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={() => navigate(role.path)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto p-4 rounded-full bg-gradient-${role.variant.toLowerCase()} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <role.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{role.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    {role.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant={role.variant}
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(role.path);
                    }}
                  >
                    Access {role.title} Portal
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Platform Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="text-center p-6 rounded-lg hover:bg-card transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © 2024 EduPortal. Built for modern educational institutions.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;