
import React, { useEffect, useState } from "react";
import axios from "axios";

const FacultyReports = () => {
  const [faculties, setFaculties] = useState([]);
  const [search, setSearch] = useState("");
  
  // Fetch faculty data from backend
//   useEffect(() => {
//     axios.get("http://localhost:5000/api/faculty")
//       .then(res => {
//         //   console.log("API Response:", res.data);
//         setFaculties(res.data);
//       })
//       .catch(err => {
//         console.error("Error fetching faculty:", err);
//       });
//   }, []);
useEffect(() => {
  axios.get("http://localhost:5000/api/faculty")
    .then(res => {
      console.log("API Response:", res.data); 
      if (Array.isArray(res.data)) {
        setFaculties(res.data); 
      } else if (res.data.faculties) {
        setFaculties(res.data.faculties); 
      } else {
        setFaculties([]); 
      }
    })
    .catch(err => {
      console.error("Error fetching faculty:", err);
    });
}, []);


  // Filter by search
  const filteredFaculty = faculties.filter(f =>
    f.fac_name.toLowerCase().includes(search.toLowerCase()) ||
    f.fac_id.toString().includes(search)
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Faculty Reports</h1>
      <p className="mb-6">Search and view details of faculty members in your organization.</p>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by name or ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 w-full mb-6 rounded"
      />

      {/* Faculty Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Department</th>
            <th className="border p-2">Contact</th>
          </tr>
        </thead>
        <tbody>
          {filteredFaculty.map(f => (
            <tr key={f.fac_id} className="text-center">
              <td className="border p-2">{f.fac_id}</td>
              <td className="border p-2">{f.fac_name}</td>
              <td className="border p-2">{f.fac_email}</td>
              <td className="border p-2">{f.fac_department}</td>
              <td className="border p-2">{f.fac_contact}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredFaculty.length === 0 && (
        <p className="text-gray-500 mt-4">No faculty found</p>
      )}
    </div>
  );
};

export default FacultyReports;
