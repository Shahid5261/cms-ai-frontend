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
      const res = await API.get("/complaints/", {
        params: {
          search,
          category: categoryFilter,
          status: statusFilter,
        },
      });

      setComplaints(res.data);
    } catch (err) {
      console.error("Failed to fetch complaints:", err);
      toast.error("Unable to load complaints.");
    }
  };

  const changeStatus = async (id, status) => {
    try {
      await API.put(`/complaints/${id}/status`, {
        status,
      });

      toast.success("Complaint status updated.");

      fetchComplaints();

      if (refreshDashboard) {
        refreshDashboard();
      }
    } catch (err) {
      console.error("Failed to update complaint status:", err);
      toast.error("Unable to update complaint status.");
    }
  };

  const deleteComplaint = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/complaints/${id}`);

      toast.success("Complaint deleted successfully.");

      fetchComplaints();

      if (refreshDashboard) {
        refreshDashboard();
      }
    } catch (err) {
      console.error("Failed to delete complaint:", err);
      toast.error("Unable to delete complaint.");
    }
  };

  const openPDF = (id) => {
    const pdfURL = `${import.meta.env.VITE_API_URL}/complaints/${id}/pdf`;

    window.open(pdfURL, "_blank");
  };

  return (
    <>
      {/* Filters */}
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

      {/* Complaint Table */}
      <div className="overflow-x-auto">
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
                <td className="p-3">
                  {item.id}
                </td>

                <td className="p-3">
                  {item.customer_name}
                </td>

                <td className="p-3">
                  {item.product}
                </td>

                <td className="p-3">
                  {item.category}
                </td>

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
                      changeStatus(
                        item.id,
                        e.target.value
                      )
                    }
                    className="border rounded-lg px-3 py-2"
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Resolved">
                      Resolved
                    </option>
                  </select>
                </td>

                <td className="p-3">
                  <div className="flex gap-2 flex-wrap">

                    {/* View */}
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
                      onClick={() =>
                        setSelectedComplaint(item)
                      }
                    >
                      View
                    </button>

                    {/* Edit */}
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
                      onClick={() =>
                        setEditingComplaint(item)
                      }
                    >
                      Edit
                    </button>

                    {/* PDF */}
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg"
                      onClick={() =>
                        openPDF(item.id)
                      }
                    >
                      PDF
                    </button>

                    {/* Delete */}
                    <button
                      className="bg-red-800 hover:bg-black text-white px-3 py-2 rounded-lg"
                      onClick={() =>
                        deleteComplaint(item.id)
                      }
                    >
                      Delete
                    </button>

                  </div>
                </td>
              </tr>
            ))}

            {complaints.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center p-8 text-gray-500"
                >
                  No complaints found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Complaint Details Modal */}
      <ComplaintModal
        complaint={selectedComplaint}
        onClose={() => {
          setSelectedComplaint(null);
          fetchComplaints();
        }}
      />

      {/* Edit Complaint Modal */}
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