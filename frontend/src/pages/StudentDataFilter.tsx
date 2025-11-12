// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Users } from "lucide-react";

// interface Student {
//   id: string;
//   name: string;
//   email: string;
//   branch: string;
//   contact: string;
//   batch: string; // derived from ID
// }

// const StudentList: React.FC = () => {
//   const [students, setStudents] = useState<Student[]>([]);
//   const [search, setSearch] = useState("");
//   const [batchFilter, setBatchFilter] = useState("all");
//   const [branchFilter, setBranchFilter] = useState("all");

//   const batches: string[] = ["BT22", "BT23", "BT24", "BT25", "BT26"];
//   const branches: string[] = ["CSE", "ECE", "ECI", "DSA", "HCIGT", "AIML"];

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/students-data");
//         if (!response.ok) throw new Error("Failed to fetch students");

//         const data = await response.json();
//         setStudents(
//           data.map((s: any) => ({
//             id: s.student_id,
//             name: s.student_name,
//             email: s.student_email,
//             branch: s.student_branch,
//             contact: s.student_contact,
//             batch: s.student_id.substring(0, 4), // derive batch for filter
//           }))
//         );
//       } catch (error) {
//         console.error("Error fetching students:", error);
//       }
//     };

//     fetchStudents();
//   }, []);

//   const filteredStudents = students.filter(
//     (s) =>
//       (search === "" ||
//         s.id.toLowerCase().includes(search.toLowerCase()) ||
//         s.email.toLowerCase().includes(search.toLowerCase())) &&
//       (batchFilter === "all" || s.batch === batchFilter) &&
//       (branchFilter === "all" || s.branch === branchFilter)
//   );

//   return (
//     <div
//       className="min-h-screen flex flex-col items-center p-8 bg-cover bg-center bg-fixed"
//       style={{ backgroundImage: "url('/images/student-bg.jpg')" }}
//     >
//       {/* Heading */}
//       <motion.div
//         initial={{ opacity: 0, y: -40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="text-center text-white drop-shadow-lg mb-10"
//       >
//         <h1 className="text-5xl font-extrabold text-blue-500">Student Reports</h1>
//         <p className="mt-2 text-lg text-white/90">
//           Search and filter students to explore performance analytics
//         </p>
//       </motion.div>

//       {/* Search & Filters */}
//       <Card className="w-full max-w-6xl backdrop-blur-lg bg-white/80 border-2 border-white shadow-2xl rounded-2xl mb-10">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Users className="h-6 w-6 text-blue-600" />
//             Manage Students
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Search Input */}
//           <Input
//             placeholder="Search by ID or Email"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="rounded-lg"
//           />

//           {/* Batch Filter */}
//           <Select value={batchFilter} onValueChange={(val) => setBatchFilter(val)}>
//             <SelectTrigger>
//               <SelectValue placeholder="Filter by Batch" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Batches</SelectItem>
//               {batches.map((b) => (
//                 <SelectItem key={b} value={b}>
//                   {b}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           {/* Branch Filter */}
//           <Select value={branchFilter} onValueChange={(val) => setBranchFilter(val)}>
//             <SelectTrigger>
//               <SelectValue placeholder="Filter by Branch" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Branches</SelectItem>
//               {branches.map((br) => (
//                 <SelectItem key={br} value={br}>
//                   {br}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </CardContent>
//       </Card>

//       {/* Students Table */}
//       <Card className="w-full max-w-6xl backdrop-blur-lg bg-white/90 border-2 border-white shadow-xl rounded-2xl">
//         <CardContent className="overflow-x-auto p-6">
//           <table className="min-w-full border-collapse">
//             <thead className="bg-blue-600 text-white">
//               <tr>
//                 <th className="p-3 text-left">ID</th>
//                 <th className="p-3 text-left">Name</th>
//                 <th className="p-3 text-left">Email</th>
//                 <th className="p-3 text-left">Branch</th>
//                 <th className="p-3 text-left">Contact</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredStudents.map((s) => (
//                 <tr key={s.id} className="border-b hover:bg-gray-50">
//                   <td className="p-3">{s.id}</td>
//                   <td className="p-3">{s.name}</td>
//                   <td className="p-3">{s.email}</td>
//                   <td className="p-3">{s.branch}</td>
//                   <td className="p-3">{s.contact}</td>
//                 </tr>
//               ))}
//               {filteredStudents.length === 0 && (
//                 <tr>
//                   <td colSpan={5} className="text-center p-6 text-gray-500">
//                     No students found
//                   </td>
//                 </tr>
//               )}
//               {filteredStudents.length > 0 && (
//                 <tr className="font-bold bg-gray-100">
//                   <td colSpan={5} className="p-3 text-right">
//                     Total Students: {filteredStudents.length}
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default StudentList;









import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users } from "lucide-react";

interface Student {
  id: string;
  name: string;
  email: string;
  branch: string;
  contact: string;
  batch: string; // derived from ID
}

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [batchFilter, setBatchFilter] = useState("all");
  const [branchFilter, setBranchFilter] = useState("all");
  const navigate = useNavigate();

  const batches: string[] = ["BT22", "BT23", "BT24", "BT25", "BT26"];
  const branches: string[] = ["CSE", "ECE", "ECI", "DSA", "HCIGT", "AIML"];

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/students-data");
        if (!response.ok) throw new Error("Failed to fetch students");

        const data = await response.json();
        setStudents(
          data.map((s: any) => ({
            id: s.student_id,
            name: s.student_name,
            email: s.student_email,
            branch: s.student_branch,
            contact: s.student_contact,
            batch: s.student_id.substring(0, 4), // derive batch for filter
          }))
        );
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter(
    (s) =>
      (search === "" ||
        s.id.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase())) &&
      (batchFilter === "all" || s.batch === batchFilter) &&
      (branchFilter === "all" || s.branch === branchFilter)
  );

  return (
    <div
      className="min-h-screen flex flex-col items-center p-8 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/images/student-bg.jpg')" }}
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center text-white drop-shadow-lg mb-10"
      >
        <h1 className="text-5xl font-extrabold text-blue-500">Student Reports</h1>
        <p className="mt-2 text-lg text-white/90">
          Search and filter students to explore performance analytics
        </p>
      </motion.div>

      {/* Search & Filters */}
      <Card className="w-full max-w-6xl backdrop-blur-lg bg-white/80 border-2 border-white shadow-2xl rounded-2xl mb-10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-600" />
            Manage Students
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Search Input */}
          <Input
            placeholder="Search by ID or Email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg"
          />

          {/* Batch Filter */}
          <Select value={batchFilter} onValueChange={(val) => setBatchFilter(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Batch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Batches</SelectItem>
              {batches.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Branch Filter */}
          <Select value={branchFilter} onValueChange={(val) => setBranchFilter(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              {branches.map((br) => (
                <SelectItem key={br} value={br}>
                  {br}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card className="w-full max-w-6xl backdrop-blur-lg bg-white/90 border-2 border-white shadow-xl rounded-2xl">
        <CardContent className="overflow-x-auto p-6">
          <table className="min-w-full border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Branch</th>
                <th className="p-3 text-left">Contact</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => navigate(`/student/dashboard/${s.id}`)}
                  className="border-b hover:bg-blue-50 cursor-pointer transition-colors duration-200"
                >
                  <td className="p-3">{s.id}</td>
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.email}</td>
                  <td className="p-3">{s.branch}</td>
                  <td className="p-3">{s.contact}</td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-6 text-gray-500">
                    No students found
                  </td>
                </tr>
              )}
              {filteredStudents.length > 0 && (
                <tr className="font-bold bg-gray-100">
                  <td colSpan={5} className="p-3 text-right">
                    Total Students: {filteredStudents.length}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentList;
