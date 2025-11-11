import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectItem, SelectContent } from "@/components/ui/select";

const RegisterSubjects = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [studentInfo, setStudentInfo] = useState<any>(null);
  const [semOptions, setSemOptions] = useState<number[]>([]);
  const [selectedSem, setSelectedSem] = useState<number | null>(null);
  const [availableCourses, setAvailableCourses] = useState<any[]>([]);

  const getBranch = (bt: string) => {
    if (bt.includes("CS")) return "CS";
    if (bt.includes("EC")) return "EC";
    return "NA";
  };

  const getSemOptions = (year: number) => {
    if (year === 25) return [1, 2];
    if (year === 24) return [3, 4];
    if (year === 23) return [5, 6];
    if (year === 22) return [7, 8];
    return [];
  };

  useEffect(() => {
    const fetchStudent = async () => {
      const res = await fetch(`http://localhost:5000/api/student/${id}`);
      const data = await res.json();

      if (data.success) {
        const student = data.studentData;
        setStudentInfo(student);

        const year = parseInt(student.student_id.slice(2, 4));
        setSemOptions(getSemOptions(year));
      }
    };

    fetchStudent();
  }, [id]);

  const handleSemChange = async (sem: string) => {
    const semester = parseInt(sem);
    setSelectedSem(semester);

    const branch = getBranch(studentInfo.student_id);

    const res = await fetch(
      `http://localhost:5000/api/courses/allowed/${semester}/${branch}`
    );
    const data = await res.json();

    if (data.success) {
      setAvailableCourses(data.courses);
    }
  };

  const registerSubject = async (course_id: string) => {
    const res = await fetch("http://localhost:5000/api/student/register-subject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        student_id: id,
        course_id,
        st_semester: selectedSem,
      }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Registered successfully!");
      navigate(`/student/${id}`);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Register Subjects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <label>Select Semester:</label>
            <Select onValueChange={handleSemChange}>
              <SelectTrigger className="w-48 mt-2">
                Select
              </SelectTrigger>
              <SelectContent>
                {semOptions.map((s) => (
                  <SelectItem key={s} value={s.toString()}>
                    Semester {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {availableCourses.length === 0 && selectedSem && (
            <p>No subjects available for this semester.</p>
          )}

          {availableCourses.map((c) => (
            <div key={c.course_id} className="p-4 border rounded-lg flex justify-between mb-4">
              <div>
                <p className="font-bold">{c.course_name}</p>
                <p className="text-sm text-gray-600">{c.course_id}</p>
                <p className="text-sm text-gray-600">Credits: {c.credits}</p>
              </div>
              <Button onClick={() => registerSubject(c.course_id)}>
                Register
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterSubjects;
