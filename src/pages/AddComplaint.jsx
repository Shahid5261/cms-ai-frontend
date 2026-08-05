import { useState } from "react";
import API from "../api";
import toast from "react-hot-toast";

export default function AddComplaint() {
  const [form, setForm] = useState({
    customer_name: "",
    email: "",
    product: "",
    complaint: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/complaints/", form);

      toast.success("Complaint submitted successfully!");

      setForm({
        customer_name: "",
        email: "",
        product: "",
        complaint: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Error submitting complaint");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-10">
      <h1 className="text-3xl font-bold mb-6">
        Add Complaint
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          className="w-full border p-3 rounded"
          name="customer_name"
          placeholder="Customer Name"
          value={form.customer_name}
          onChange={handleChange}
          required
        />

        <input
          className="w-full border p-3 rounded"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          className="w-full border p-3 rounded"
          name="product"
          placeholder="Product"
          value={form.product}
          onChange={handleChange}
          required
        />

        <textarea
          className="w-full border p-3 rounded h-40"
          name="complaint"
          placeholder="Write complaint..."
          value={form.complaint}
          onChange={handleChange}
          required
        />

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded"
          type="submit"
        >
          Submit Complaint
        </button>

      </form>
    </div>
  );
}