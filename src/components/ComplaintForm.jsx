import { useState } from "react";
import api from "../services/api";

export default function ComplaintForm() {
  const [form, setForm] = useState({
    customer_name: "",
    email: "",
    product: "",
    complaint: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      await api.post("/complaints/", form);

      setMessage("Complaint submitted successfully!");

      setForm({
        customer_name: "",
        email: "",
        product: "",
        complaint: "",
      });
    } catch (err) {
      console.error(err);
      setMessage("Failed to submit complaint.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white mt-8 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-5">
        Register Complaint
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          className="w-full border p-3 rounded"
          placeholder="Customer Name"
          name="customer_name"
          value={form.customer_name}
          onChange={handleChange}
          required
        />

        <input
          className="w-full border p-3 rounded"
          placeholder="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          className="w-full border p-3 rounded"
          placeholder="Product"
          name="product"
          value={form.product}
          onChange={handleChange}
          required
        />

        <textarea
          className="w-full border p-3 rounded"
          rows="5"
          placeholder="Complaint"
          name="complaint"
          value={form.complaint}
          onChange={handleChange}
          required
        />

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Submit Complaint"}
        </button>

      </form>

      {message && (
        <p className="mt-4 font-semibold">
          {message}
        </p>
      )}
    </div>
  );
}