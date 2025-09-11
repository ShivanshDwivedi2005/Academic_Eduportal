// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import { Button } from "@/components/ui/button";

// interface Slot {
//   subject: string;
//   teacher: string;
// }

// type Timetable = Record<string, Record<string, Slot>>;

// const TimetablePage = () => {
//   const params = useParams<{ batch: string; branch: string; section: string }>();
//   const batch = params.batch || "";
//   const branch = params.branch || "";
//   const section = params.section || "";

//   const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//   const timeSlots = [
//     "8:00 AM - 9:00 AM",
//     "9:00 AM - 10:00 AM",
//     "10:00 AM - 11:00 AM",
//     "11:00 AM - 12:00 PM",
//     "12:00 PM - 1:00 PM",
//     "1:00 PM - 2:00 PM",
//     "2:00 PM - 3:00 PM",
//     "3:00 PM - 4:00 PM",
//     "4:00 PM - 5:00 PM",
//     "5:00 PM - 6:00 PM",
//   ];

//   const [timetable, setTimetable] = useState<Timetable>(() =>
//     days.reduce((acc, day) => {
//       acc[day] = timeSlots.reduce((slots, slot) => {
//         slots[slot] = { subject: "", teacher: "" };
//         return slots;
//       }, {} as Record<string, Slot>);
//       return acc;
//     }, {} as Timetable)
//   );

//   const [updateMode, setUpdateMode] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

//   const handleChange = (day: string, slot: string, field: keyof Slot, value: string) => {
//     setTimetable((prev) => ({
//       ...prev,
//       [day]: {
//         ...prev[day],
//         [slot]: {
//           ...prev[day][slot],
//           [field]: value,
//         },
//       },
//     }));
//   };

//   const handleSave = async () => {
//     setLoading(true);
//     setMessage(null);

//     // Filter out empty slots
//     const filteredTimetable: Timetable = Object.fromEntries(
//       Object.entries(timetable).map(([day, slots]) => [
//         day,
//         Object.fromEntries(
//           Object.entries(slots).filter(([_, slot]) => slot.subject || slot.teacher)
//         ),
//       ])
//     );

//     try {
//       const response = await fetch("http://localhost:5000/api/schedule", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ batch, branch, section, timetable: filteredTimetable }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         setMessage({ type: "success", text: "Timetable saved successfully!" });
//       } else {
//         setMessage({ type: "error", text: data.message || "Failed to save timetable" });
//       }
//     } catch (err) {
//       console.error("Error saving timetable:", err);
//       setMessage({ type: "error", text: "Error saving timetable" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen w-full bg-cover bg-center flex flex-col"
//       style={{ backgroundImage: "url('/images/student-bg.jpg')" }}
//     >
//       <div className="bg-black/50 flex-1 p-8 flex flex-col">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-white drop-shadow-lg">
//             Timetable - {batch} {branch} Section {section}
//           </h1>
//           <div className="flex gap-4">
//             <Button
//               onClick={() => setUpdateMode(!updateMode)}
//               className="bg-indigo-600 text-white hover:bg-indigo-700"
//             >
//               {updateMode ? "Disable Update Mode" : "Enable Update Mode"}
//             </Button>
//             <Button
//               onClick={handleSave}
//               className="bg-green-500 text-white hover:bg-green-600"
//               disabled={loading}
//             >
//               {loading ? "Saving..." : "Save Timetable"}
//             </Button>
//           </div>
//         </div>

//         {/* Success / Error Message */}
//         {message && (
//           <div
//             className={`mb-4 p-2 rounded text-white ${
//               message.type === "success" ? "bg-green-600" : "bg-red-600"
//             }`}
//           >
//             {message.text}
//           </div>
//         )}

//         {/* Timetable Grid */}
//         <div className="flex-1 overflow-auto rounded-xl shadow-2xl">
//           <table className="w-full border-collapse bg-white/95 backdrop-blur-lg rounded-xl">
//             <thead>
//               <tr>
//                 <th className="p-3 border bg-gray-200 text-left text-lg">Day / Time</th>
//                 {timeSlots.map((slot) => (
//                   <th key={slot} className="p-3 border bg-gray-100 text-sm text-center">
//                     {slot}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {days.map((day) => (
//                 <tr key={day}>
//                   <td className="p-3 border font-semibold bg-gray-50">{day}</td>
//                   {timeSlots.map((slot) => (
//                     <td
//                       key={slot}
//                       className="p-2 border text-center min-w-[140px] hover:bg-blue-50 transition"
//                     >
//                       {updateMode ? (
//                         <div className="flex flex-col gap-1">
//                           <input
//                             type="text"
//                             placeholder="Subject Code"
//                             value={timetable[day][slot].subject}
//                             onChange={(e) => handleChange(day, slot, "subject", e.target.value)}
//                             className="w-full px-2 py-1 border rounded text-sm"
//                           />
//                           <input
//                             type="text"
//                             placeholder="Teacher ID"
//                             value={timetable[day][slot].teacher}
//                             onChange={(e) => handleChange(day, slot, "teacher", e.target.value)}
//                             className="w-full px-2 py-1 border rounded text-sm"
//                           />
//                         </div>
//                       ) : (
//                         <div className="text-xs">
//                           <p className="font-medium">{timetable[day][slot].subject || "-"}</p>
//                           <p className="text-gray-500">{timetable[day][slot].teacher || ""}</p>
//                         </div>
//                       )}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TimetablePage;


import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Slot {
  subject: string;
  teacher: string;
}

type Timetable = Record<string, Record<string, Slot>>;

const TimetablePage = () => {
  const params = useParams<{ batch: string; branch: string; section: string }>();
  const batch = params.batch || "";
  const branch = params.branch || "";
  const section = params.section || "";

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const timeSlots = [
    "8:00 AM - 9:00 AM",
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
  ];

  const [timetable, setTimetable] = useState<Timetable>(() =>
    days.reduce((acc, day) => {
      acc[day] = timeSlots.reduce((slots, slot) => {
        slots[slot] = { subject: "", teacher: "" };
        return slots;
      }, {} as Record<string, Slot>);
      return acc;
    }, {} as Timetable)
  );

  const [updateMode, setUpdateMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Fetch timetable on mount
  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const query = new URLSearchParams({ batch, section, branch }).toString();
        const res = await fetch(`http://localhost:5000/api/schedule?${query}`);
        const data = await res.json();
        if (data.success && data.timetable) {
          // Merge fetched timetable with default empty slots
          const newTimetable: Timetable = { ...timetable };
          for (const day of days) {
            if (!newTimetable[day]) newTimetable[day] = {};
            for (const slot of timeSlots) {
              newTimetable[day][slot] = data.timetable[day]?.[slot] || { subject: "", teacher: "" };
            }
          }
          setTimetable(newTimetable);
        }
      } catch (err) {
        console.error("Failed to fetch timetable:", err);
      }
    };
    fetchTimetable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batch, branch, section]);

  const handleChange = (day: string, slot: string, field: keyof Slot, value: string) => {
    setTimetable((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [slot]: {
          ...prev[day][slot],
          [field]: value,
        },
      },
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage(null);

    const filteredTimetable: Timetable = Object.fromEntries(
      Object.entries(timetable).map(([day, slots]) => [
        day,
        Object.fromEntries(Object.entries(slots).filter(([_, slot]) => slot.subject || slot.teacher)),
      ])
    );

    try {
      const response = await fetch("http://localhost:5000/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ batch, branch, section, timetable: filteredTimetable }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage({ type: "success", text: "Timetable saved successfully!" });
      } else {
        setMessage({ type: "error", text: data.error || "Failed to save timetable" });
      }
    } catch (err) {
      console.error("Error saving timetable:", err);
      setMessage({ type: "error", text: "Error saving timetable" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-cover bg-center flex flex-col" style={{ backgroundImage: "url('/images/student-bg.jpg')" }}>
      <div className="bg-black/50 flex-1 p-8 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white drop-shadow-lg">
            Timetable - {batch} {branch} Section {section}
          </h1>
          <div className="flex gap-4">
            <Button onClick={() => setUpdateMode(!updateMode)} className="bg-indigo-600 text-white hover:bg-indigo-700">
              {updateMode ? "Disable Update Mode" : "Enable Update Mode"}
            </Button>
            <Button onClick={handleSave} className="bg-green-500 text-white hover:bg-green-600" disabled={loading}>
              {loading ? "Saving..." : "Save Timetable"}
            </Button>
          </div>
        </div>

        {message && (
          <div className={`mb-4 p-2 rounded text-white ${message.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
            {message.text}
          </div>
        )}

        <div className="flex-1 overflow-auto rounded-xl shadow-2xl">
          <table className="w-full border-collapse bg-white/95 backdrop-blur-lg rounded-xl">
            <thead>
              <tr>
                <th className="p-3 border bg-gray-200 text-left text-lg">Day / Time</th>
                {timeSlots.map((slot) => (
                  <th key={slot} className="p-3 border bg-gray-100 text-sm text-center">
                    {slot}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day) => (
                <tr key={day}>
                  <td className="p-3 border font-semibold bg-gray-50">{day}</td>
                  {timeSlots.map((slot) => (
                    <td key={slot} className="p-2 border text-center min-w-[140px] hover:bg-blue-50 transition">
                      {updateMode ? (
                        <div className="flex flex-col gap-1">
                          <input
                            type="text"
                            placeholder="Subject Code"
                            value={timetable[day][slot].subject}
                            onChange={(e) => handleChange(day, slot, "subject", e.target.value)}
                            className="w-full px-2 py-1 border rounded text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Teacher ID"
                            value={timetable[day][slot].teacher}
                            onChange={(e) => handleChange(day, slot, "teacher", e.target.value)}
                            className="w-full px-2 py-1 border rounded text-sm"
                          />
                        </div>
                      ) : (
                        <div className="text-xs">
                          <p className="font-medium">{timetable[day][slot].subject || "-"}</p>
                          <p className="text-gray-500">{timetable[day][slot].teacher || ""}</p>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimetablePage;
