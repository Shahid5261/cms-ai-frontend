import React from "react";
import API from "../api";

export default function ComplaintModal({ complaint, onClose }) {
  if (!complaint) return null;

  const sendEmail = async () => {
    try {
      const res = await API.post(
        `/complaints/${complaint.id}/send-email`
      );

      alert(res.data.message);
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send email.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Complaint Details
          </h2>

          <button
            onClick={onClose}
            className="text-red-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">

          <div>
            <strong>Customer:</strong>{" "}
            {complaint.customer_name}
          </div>

          <div>
            <strong>Email:</strong>{" "}
            {complaint.email}
          </div>

          <div>
            <strong>Product:</strong>{" "}
            {complaint.product}
          </div>

          <div>
            <strong>Status:</strong>{" "}
            {complaint.status}
          </div>

          <hr />

          <div>
            <strong>Original Complaint</strong>

            <div className="bg-gray-100 rounded p-3 mt-2">
              {complaint.complaint}
            </div>
          </div>

          <div>
            <strong>AI Summary</strong>

            <div className="bg-blue-100 rounded p-3 mt-2">
              {complaint.complaint_summary}
            </div>
          </div>

          <div>
            <strong>Category:</strong>{" "}
            {complaint.category}
          </div>

          <div>
            <strong>Severity:</strong>{" "}
            {complaint.severity}
          </div>

          <div>
            <strong>Root Cause</strong>

            <div className="bg-yellow-100 rounded p-3 mt-2">
              {complaint.root_cause}
            </div>
          </div>

          <div>
            <strong>CAPA</strong>

            <div className="bg-green-100 rounded p-3 mt-2">
              {complaint.capa}
            </div>
          </div>

          <div>
            <strong>Suggested Response</strong>

            <div className="bg-purple-100 rounded p-3 mt-2">
              {complaint.suggested_response}
            </div>
          </div>

          <div className="flex gap-4 mt-6">

            <button
              onClick={sendEmail}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg font-semibold"
            >
              📧 Send AI Response Email
            </button>

            <button
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-3 rounded-lg font-semibold"
            >
              Close
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}