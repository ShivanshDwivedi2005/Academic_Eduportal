import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Users, GraduationCap, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const ReportsPage = () => {
  const navigate = useNavigate();

  const reportSections = [
    { 
      title: "Faculty Reports", 
      description: "View detailed reports of faculty performance and activities", 
      icon: GraduationCap, 
      action: () => navigate("/faculty-reports") 
    },
    { 
      title: "Student Reports", 
      description: "Analyze student progress, grades, and overall performance", 
      icon: Users, 
      action: () => navigate("/student-reports") 
    },
    { 
      title: "Schedule", 
      description: "Check and manage academic schedules and timetables", 
      icon: Calendar, 
      action: () => navigate("/schedule") 
    }
  ];

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center justify-center p-8"
      style={{ backgroundImage: "url('/images/iiit-nagpur.jpg')" }} 
    >
      <motion.div 
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center text-white drop-shadow-lg mb-10"
      >
        <h1 className="text-5xl font-extrabold text-orange-600">Reports Dashboard</h1>
        <p className="mt-2 bg-orange-600 text-lg text-blue-600">Choose a report section to explore detailed analytics and insights</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {reportSections.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
          >
            <Card 
              className="hover:shadow-2xl hover:scale-105 transform transition-all duration-300 cursor-pointer backdrop-blur-lg bg-white/80 border-2 border-white"
              onClick={section.action}
            >
              <CardHeader className="flex flex-col items-center text-center">
                <section.icon className="h-14 w-14 text-primary mb-4" />
                <CardTitle className="text-2xl">{section.title}</CardTitle>
                <CardDescription className="text-gray-700">{section.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button 
                  variant="default" 
                  className="rounded-xl shadow-md"
                  onClick={section.action}
                >
                  View {section.title}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;
