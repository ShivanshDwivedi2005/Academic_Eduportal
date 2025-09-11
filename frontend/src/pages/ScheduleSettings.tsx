import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const ScheduleSettings = () => {
  const navigate = useNavigate();

  const [batch, setBatch] = useState<string>("");
  const [branch, setBranch] = useState<string>("");
  const [section, setSection] = useState<string>("");

  const batches = ["2022", "2023", "2024", "2025"];
  const branches = ["CSE", "CSD", "CSH", "CSL", "ECE", "ECI"];

  const getSections = (branch: string) => {
    if (branch === "CSE") return ["A", "B", "C"];
    if (branch === "ECE") return ["A", "B"];
    if (branch) return ["A"];
    return [];
  };

  const sections = useMemo(() => getSections(branch), [branch]);

  // Generate all possible combinations
  const allCombinations = useMemo(() => {
    let combos: { batch: string; branch: string; section: string }[] = [];
    for (const b of batches) {
      for (const br of branches) {
        const secList = getSections(br);
        for (const sec of secList) {
          combos.push({ batch: b, branch: br, section: sec });
        }
      }
    }
    return combos;
  }, []);

  // Filtered results
  const filteredCombinations = useMemo(() => {
    return allCombinations.filter((combo) => {
      return (
        (!batch || combo.batch === batch) &&
        (!branch || combo.branch === branch) &&
        (!section || combo.section === section)
      );
    });
  }, [batch, branch, section, allCombinations]);

  const handleSubmit = () => {
    if (batch && branch && section) {
      navigate(`/timetable/${batch}/${branch}/${section}`);
      //navigate("/timetable");
    }
  };

  const clearFilters = () => {
    setBatch("");
    setBranch("");
    setSection("");
  };

  return (
    <div
      className="min-h-screen p-6 space-y-8 bg-gradient-to-br from-indigo-200 via-white to-blue-200 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/student-bg.jpg')" }}
    >
      {/* Settings Card */}
      <Card className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold text-center bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent">
            Schedule Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Batch Filter */}
            <Select value={batch} onValueChange={setBatch}>
              <SelectTrigger className="bg-white shadow-md rounded-xl">
                <SelectValue placeholder="Select Batch" />
              </SelectTrigger>
              <SelectContent>
                {batches.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Branch Filter */}
            <Select value={branch} onValueChange={setBranch}>
              <SelectTrigger className="bg-white shadow-md rounded-xl">
                <SelectValue placeholder="Select Branch" />
              </SelectTrigger>
              <SelectContent>
                {branches.map((br) => (
                  <SelectItem key={br} value={br}>
                    {br}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Section Filter */}
            <Select value={section} onValueChange={setSection} disabled={!branch}>
              <SelectTrigger className="bg-white shadow-md rounded-xl">
                <SelectValue placeholder="Select Section" />
              </SelectTrigger>
              <SelectContent>
                {sections.map((sec) => (
                  <SelectItem key={sec} value={sec}>
                    {sec}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              onClick={handleSubmit}
              disabled={!batch || !branch || !section}
              className="px-6 py-2 text-lg rounded-xl shadow-lg bg-gradient-to-r from-indigo-500 to-blue-600 text-white hover:scale-105 transition"
            >
              Go to Timetable
            </Button>
            <Button
              variant="outline"
              onClick={clearFilters}
              className="px-6 py-2 text-lg rounded-xl shadow-md hover:bg-gray-100 transition"
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Classes List */}
      <Card className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Available Classes
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {filteredCombinations.length > 0 ? (
            filteredCombinations.map((combo, index) => (
              <div
                key={index}
                onClick={() =>
                  navigate(`/timetable/${combo.batch}/${combo.branch}/${combo.section}`)
                }
                className="cursor-pointer p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-100 border shadow-sm hover:shadow-md hover:scale-[1.02] transition"
              >
                {combo.batch} - {combo.branch} - Section {combo.section}
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic text-center">
              No classes match your selection.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleSettings;
