import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function AgentDashboard() {
  const [agents, setAgents] = useState([]);
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", mobile: "", password: "" });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    const { data } = await axios.get("http://localhost:3000/api/agents", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAgents(data);
  };

  const addAgent = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/api/agents", form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchAgents();
    setForm({ name: "", email: "", mobile: "", password: "" });
  };

  const uploadCSV = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    await axios.post("http://localhost:3000/api/leads/upload", formData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
    });

    toast.success("CSV uploaded and distributed!");
  };

  return (
    <div className="h-screen flex bg-gray-100">
      <div className="w-64 bg-blue-700 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-4">
          <li className="hover:bg-blue-600 p-2 rounded">Dashboard</li>
          <li className="hover:bg-blue-600 p-2 rounded">Agents</li>
          <li className="hover:bg-blue-600 p-2 rounded">Upload CSV</li>
        </ul>
      </div>

      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add Agent</h2>
          <form className="grid grid-cols-2 gap-4" onSubmit={addAgent}>
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border px-4 py-2 rounded"
            />
            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border px-4 py-2 rounded"
            />
            <input
              placeholder="Mobile"
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              className="border px-4 py-2 rounded"
            />
            <input
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="border px-4 py-2 rounded"
            />
            <button
              type="submit"
              className="col-span-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Add Agent
            </button>
          </form>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Upload CSV</h2>
          <form onSubmit={uploadCSV} className="flex items-center gap-4">
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files[0])}
              className="border px-4 py-2 rounded"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Upload
            </button>
          </form>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Agents</h2>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Mobile</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((a) => (
                <tr key={a._id} className="hover:bg-gray-50">
                  <td className="p-2 border">{a.name}</td>
                  <td className="p-2 border">{a.email}</td>
                  <td className="p-2 border">{a.mobile}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
