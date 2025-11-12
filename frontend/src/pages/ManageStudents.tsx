import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Mail, UserPlus, UserMinus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ManageStudents = () => {
  const navigate = useNavigate();

  // States for forms
  const [newStudent, setNewStudent] = useState({
    id: "",
    name: "",
    email: "",
    branch: "",
  });
  const [removeId, setRemoveId] = useState("");
  const [message, setMessage] = useState("");

  // Handlers
  const handleAddStudent = () => {
    if (!newStudent.id || !newStudent.name || !newStudent.email || !newStudent.branch) {
      alert("Please fill all fields!");
      return;
    }
    console.log("Adding student:", newStudent);
    alert(`Student ${newStudent.name} added successfully!`);
    setNewStudent({ id: "", name: "", email: "", branch: "" });
  };

  const handleRemoveStudent = () => {
    if (!removeId) {
      alert("Enter a student ID to remove!");
      return;
    }
    console.log("Removing student:", removeId);
    alert(`Student ${removeId} removed successfully!`);
    setRemoveId("");
  };

  const handleSendNotification = () => {
    if (!message) {
      alert("Message cannot be empty!");
      return;
    }
    console.log("Sending notification:", message);
    alert("Notification sent to all students!");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">Manage Students</h1>
          <p className="text-gray-600">Add, remove, or notify students from here.</p>
        </div>
        <Button variant="outline" onClick={() => navigate("/admin/dashboard")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Add Student */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserPlus className="mr-2 h-5 w-5 text-green-600" />
              Add Student
            </CardTitle>
            <CardDescription>Enroll a new student into the system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder="Student ID"
              value={newStudent.id}
              onChange={(e) => setNewStudent({ ...newStudent, id: e.target.value })}
            />
            <Input
              placeholder="Full Name"
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            />
            <Input
              placeholder="Email Address"
              value={newStudent.email}
              onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
            />
            <Input
              placeholder="Branch (e.g. CSE, ECE)"
              value={newStudent.branch}
              onChange={(e) => setNewStudent({ ...newStudent, branch: e.target.value })}
            />
            <Button variant="student" className="w-full" onClick={handleAddStudent}>
              Add Student
            </Button>
          </CardContent>
        </Card>

        {/* Remove Student */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserMinus className="mr-2 h-5 w-5 text-red-600" />
              Remove Student
            </CardTitle>
            <CardDescription>Remove a student from the database</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder="Enter Student ID"
              value={removeId}
              onChange={(e) => setRemoveId(e.target.value)}
            />
            <Button variant="destructive" className="w-full" onClick={handleRemoveStudent}>
              Remove Student
            </Button>
            <div className="text-sm text-gray-500">
              Ensure you confirm student identity before removal.
            </div>
          </CardContent>
        </Card>

        {/* Send Notification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="mr-2 h-5 w-5 text-blue-600" />
              Send Notification
            </CardTitle>
            <CardDescription>Send announcements to all students</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <textarea
              className="w-full border rounded p-2 text-sm focus:ring focus:ring-blue-200"
              placeholder="Type your message..."
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant="outline" className="w-full" onClick={handleSendNotification}>
              Send Notification
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Summary Section */}
      <div className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>Overview of recent actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 text-sm">
              <Badge variant="secondary">Added 2 new students</Badge>
              <Badge variant="default">Removed 1 inactive student</Badge>
              {/* ✅ fixed: replaced 'accent' with 'default' */}
              <Badge variant="default">3 notifications sent</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageStudents;
