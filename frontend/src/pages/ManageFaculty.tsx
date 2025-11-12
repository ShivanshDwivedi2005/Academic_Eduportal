import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, UserPlus, UserMinus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ManageFaculty = () => {
  const navigate = useNavigate();

  // States for form handling
  const [newFaculty, setNewFaculty] = useState({
    id: "",
    name: "",
    email: "",
    department: "",
  });
  const [removeId, setRemoveId] = useState("");
  const [schedule, setSchedule] = useState({
    facultyId: "",
    subject: "",
    day: "",
    time: "",
  });

  // Handlers
  const handleAddFaculty = () => {
    if (!newFaculty.id || !newFaculty.name || !newFaculty.email || !newFaculty.department) {
      alert("Please fill all fields!");
      return;
    }
    console.log("Adding faculty:", newFaculty);
    alert(`Faculty ${newFaculty.name} added successfully!`);
    setNewFaculty({ id: "", name: "", email: "", department: "" });
  };

  const handleRemoveFaculty = () => {
    if (!removeId) {
      alert("Enter a faculty ID to remove!");
      return;
    }
    console.log("Removing faculty:", removeId);
    alert(`Faculty ${removeId} removed successfully!`);
    setRemoveId("");
  };

  const handleSetSchedule = () => {
    if (!schedule.facultyId || !schedule.subject || !schedule.day || !schedule.time) {
      alert("Please fill all schedule fields!");
      return;
    }
    console.log("Setting schedule:", schedule);
    alert(`Schedule set successfully for ${schedule.facultyId}!`);
    setSchedule({ facultyId: "", subject: "", day: "", time: "" });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">Manage Faculty</h1>
          <p className="text-gray-600">Add, remove, or schedule faculty members from here.</p>
        </div>
        <Button variant="outline" onClick={() => navigate("/admin/dashboard")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Add Faculty */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserPlus className="mr-2 h-5 w-5 text-green-600" />
              Add Faculty
            </CardTitle>
            <CardDescription>Register a new faculty member</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder="Faculty ID"
              value={newFaculty.id}
              onChange={(e) => setNewFaculty({ ...newFaculty, id: e.target.value })}
            />
            <Input
              placeholder="Full Name"
              value={newFaculty.name}
              onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
            />
            <Input
              placeholder="Email Address"
              value={newFaculty.email}
              onChange={(e) => setNewFaculty({ ...newFaculty, email: e.target.value })}
            />
            <Input
              placeholder="Department (e.g. CSE, ECE)"
              value={newFaculty.department}
              onChange={(e) => setNewFaculty({ ...newFaculty, department: e.target.value })}
            />
            <Button variant="faculty" className="w-full" onClick={handleAddFaculty}>
              Add Faculty
            </Button>
          </CardContent>
        </Card>

        {/* Remove Faculty */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserMinus className="mr-2 h-5 w-5 text-red-600" />
              Remove Faculty
            </CardTitle>
            <CardDescription>Remove a faculty member from the system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder="Enter Faculty ID"
              value={removeId}
              onChange={(e) => setRemoveId(e.target.value)}
            />
            <Button variant="destructive" className="w-full" onClick={handleRemoveFaculty}>
              Remove Faculty
            </Button>
            <div className="text-sm text-gray-500">
              Please verify faculty details before removal.
            </div>
          </CardContent>
        </Card>

        {/* Set Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-blue-600" />
              Set Schedule
            </CardTitle>
            <CardDescription>Assign a class schedule to a faculty member</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder="Faculty ID"
              value={schedule.facultyId}
              onChange={(e) => setSchedule({ ...schedule, facultyId: e.target.value })}
            />
            <Input
              placeholder="Subject (e.g. Data Structures)"
              value={schedule.subject}
              onChange={(e) => setSchedule({ ...schedule, subject: e.target.value })}
            />
            <Input
              placeholder="Day (e.g. Monday)"
              value={schedule.day}
              onChange={(e) => setSchedule({ ...schedule, day: e.target.value })}
            />
            <Input
              placeholder="Time (e.g. 10:00 AM - 11:00 AM)"
              value={schedule.time}
              onChange={(e) => setSchedule({ ...schedule, time: e.target.value })}
            />
            <Button variant="outline" className="w-full" onClick={handleSetSchedule}>
              Set Schedule
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Summary Section */}
      <div className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>Overview of recent faculty actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 text-sm">
              <Badge variant="secondary">Added 1 new faculty</Badge>
              <Badge variant="default">Updated 3 schedules</Badge>
              <Badge variant="default">Removed 1 faculty</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageFaculty;
