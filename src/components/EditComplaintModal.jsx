import { useState, useEffect } from "react";
import API from "../api";
import toast from "react-hot-toast";

export default function EditComplaintModal({
  complaint,
  onClose,
  refresh,
}) {

  const [form, setForm] = useState({
    customer_name: "",
    email: "",
    product: "",
    complaint: "",
  });

  useEffect(() => {

    if (complaint) {

      setForm({
        customer_name: complaint.customer_name,
        email: complaint.email,
        product: complaint.product,
        complaint: complaint.complaint,
      });

    }

  }, [complaint]);

  if (!complaint) return null;

  const updateComplaint = async () => {

    try {

      await API.put(
        `/complaints/${complaint.id}`,
        form
      );

      toast.success("Complaint updated successfully.");

      refresh();

      onClose();

    } catch (err) {

      console.log(err);

      if (err.response) {

      toast.error(err.response.data.detail);

      } else {

       toast.error("Unable to update complaint.");

      }

    }

  };

  return (

    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-[700px] p-8">

        <h2 className="text-2xl font-bold mb-6">
          Edit Complaint
        </h2>

        <div className="space-y-4">

          <input
            className="border w-full p-3 rounded"
            placeholder="Customer Name"
            value={form.customer_name}
            onChange={(e)=>
              setForm({
                ...form,
                customer_name:e.target.value
              })
            }
          />

          <input
            className="border w-full p-3 rounded"
            placeholder="Email"
            value={form.email}
            onChange={(e)=>
              setForm({
                ...form,
                email:e.target.value
              })
            }
          />

          <input
            className="border w-full p-3 rounded"
            placeholder="Product"
            value={form.product}
            onChange={(e)=>
              setForm({
                ...form,
                product:e.target.value
              })
            }
          />

          <textarea
            rows={6}
            className="border w-full p-3 rounded"
            placeholder="Complaint"
            value={form.complaint}
            onChange={(e)=>
              setForm({
                ...form,
                complaint:e.target.value
              })
            }
          />

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={updateComplaint}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>

  );

}