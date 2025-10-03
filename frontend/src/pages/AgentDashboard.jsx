import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function AgentDashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/leads/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLeads(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch leads");
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-indigo-900 to-black text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8"> Agent Dashboard</h1>

      {loading ? (
        <p className="text-center text-lg text-gray-300">Loading your leads...</p>
      ) : leads.length === 0 ? (
        <p className="text-center text-gray-300 text-lg">No leads assigned yet </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {leads.map((lead, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:scale-105 transform transition"
            >
              <h2 className="text-2xl font-semibold text-yellow-300 mb-2">
                {lead.firstName}
              </h2>
              <p className="text-gray-200 mb-1"> {lead.phone}</p>
              <p className="text-gray-300 mb-3"> {lead.notes}</p>
              <p className="text-xs text-gray-400">
                Assigned on: {new Date(lead.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
