import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ManageClass = () => {
  const { fac_id, subject_id, batch, section } = useParams();
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/faculty/${fac_id}/manage/${subject_id}/${batch}/${section}`
        );

        const data = await res.json();
        if (data.success) setStudents(data.students);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [fac_id, subject_id, batch, section]);

  const handleChange = (i: number, field: string, value: string) => {
    const updated = [...students];
    updated[i][field] = value;
    setStudents(updated);
  };

  const saveRecord = async (student: any) => {
    setSaving(true);
    try {
      const res = await fetch(`http://localhost:5000/api/faculty/update-acad`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id: student.student_id,
          course_id: subject_id,
          midsem: student.midsem_marks,
          endsem: student.endsem_marks,
          ta: student.TA,
          lab: student.lab,
          grade: student.st_grades,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Updated successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating!");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="mt-10 text-center">Loading...</div>;

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>
            Manage {subject_id.toUpperCase()} | Batch {batch} | Section{" "}
            {section}
          </CardTitle>
        </CardHeader>

        <CardContent>

          {students.length === 0 ? (
            <p>No students enrolled</p>
          ) : (
            <div className="space-y-4">
              {students.map((st, i) => (
                <div
                  key={st.student_id}
                  className="border p-4 rounded-lg shadow-sm"
                >
                  <p className="font-semibold mb-2">
                    {st.student_id} — {st.student_name}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    
                    <Input
                      type="number"
                      placeholder="Midsem"
                      value={st.midsem_marks || ""}
                      onChange={(e) =>
                        handleChange(i, "midsem_marks", e.target.value)
                      }
                    />

                    <Input
                      type="number"
                      placeholder="Endsem"
                      value={st.endsem_marks || ""}
                      onChange={(e) =>
                        handleChange(i, "endsem_marks", e.target.value)
                      }
                    />

                    <Input
                      type="number"
                      placeholder="TA"
                      value={st.TA || ""}
                      onChange={(e) =>
                        handleChange(i, "TA", e.target.value)
                      }
                    />

                    <Input
                      type="number"
                      placeholder="Lab"
                      value={st.lab || ""}
                      onChange={(e) =>
                        handleChange(i, "lab", e.target.value)
                      }
                    />

                    <Input
                      type="text"
                      placeholder="Grade"
                      value={st.st_grades || ""}
                      onChange={(e) =>
                        handleChange(i, "st_grades", e.target.value)
                      }
                    />
                  </div>

                  <Button
                    disabled={saving}
                    className="mt-4"
                    onClick={() => saveRecord(st)}
                  >
                    Save
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageClass;
