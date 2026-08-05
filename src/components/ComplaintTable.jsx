import { useEffect, useState } from "react";
import API from "../api";
import ComplaintModal from "./ComplaintModal";
import EditComplaintModal from "./EditComplaintModal";
import toast from "react-hot-toast";

export default function ComplaintTable({ refreshDashboard }) {

  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [editingComplaint, setEditingComplaint] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    fetchComplaints();
  }, [search, statusFilter, categoryFilter]);

  const fetchComplaints = async () => {
    try {

      const res = await API.get(
        "http://127.0.0.1:8000/complaints/",
        {
          params: {
            search,
            category: categoryFilter,
            status: statusFilter,
          },
        }
      );

      setComplaints(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const changeStatus = async (id, status) => {

    try {

      await API.put(
        `/complaints/${id}/status`,
        { status }
      );

      fetchComplaints();

      if (refreshDashboard) {
        refreshDashboard();
      }

    } catch (err) {

      console.log(err);
      toast.error("Unable to update complaint status.");

    }

  };

  const deleteComplaint = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint?"
    );

    if (!confirmDelete) return;

    try {

      await API.delete(
        `/complaints/${id}`
      );

      toast.success("Complaint deleted successfully.");

      fetchComplaints();

      if (refreshDashboard) {
        refreshDashboard();
      }

    } catch (err) {

      console.log(err);
      atoast.error("Unable to delete complaint.");

    }

  };

  return (
    <>

      <div className="flex flex-wrap gap-4 mb-6">

        <input
          type="text"
          placeholder="Search customer, product..."
          className="border rounded-lg px-4 py-2 w-80"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-lg px-4 py-2"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Hardware">Hardware</option>
          <option value="Software">Software</option>
          <option value="Billing">Billing</option>
          <option value="Service">Service</option>
        </select>

        <select
          className="border rounded-lg px-4 py-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>

      </div>

      <table className="w-full bg-white rounded-xl shadow overflow-hidden">

        <thead className="bg-blue-600 text-white">

          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Customer</th>
            <th className="p-3">Product</th>
            <th className="p-3">Category</th>
            <th className="p-3">Severity</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>

        </thead>

        <tbody>

          {complaints.map((item) => (

            <tr
              key={item.id}
              className="border-b hover:bg-gray-50"
            >

              <td className="p-3">{item.id}</td>

              <td className="p-3">{item.customer_name}</td>

              <td className="p-3">{item.product}</td>

              <td className="p-3">{item.category}</td>

              <td className="p-3">

                <span
                  className={`px-3 py-1 rounded-full text-white ${
                    item.severity === "High"
                      ? "bg-red-500"
                      : item.severity === "Medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                >
                  {item.severity}
                </span>

              </td>

              <td className="p-3">

                <select
                  value={item.status}
                  onChange={(e) =>
                    changeStatus(item.id, e.target.value)
                  }
                  className="border rounded-lg px-3 py-2"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>

              </td>

              <td className="p-3">

                <div className="flex gap-2 flex-wrap">

                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
                    onClick={() => setSelectedComplaint(item)}
                  >
                    View
                  </button>

                  <button
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
                    onClick={() => setEditingComplaint(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg"
                    onClick={() =>
                      window.open(
                        `http://127.0.0.1:8000/complaints/${item.id}/pdf`,
                        "_blank"
                      )
                    }
                  >
                    PDF
                  </button>

                  <button
                    className="bg-red-800 hover:bg-black text-white px-3 py-2 rounded-lg"
                    onClick={() => deleteComplaint(item.id)}
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <ComplaintModal
  complaint={selectedComplaint}
  onClose={() => {

    setSelectedComplaint(null);

    fetchComplaints();

  }}
/>

<EditComplaintModal
  complaint={editingComplaint}
  onClose={() => {

    setEditingComplaint(null);

    fetchComplaints();

    if (refreshDashboard) {

      refreshDashboard();

    }

  }}
  refresh={fetchComplaints}
/>

    </>
  );

}