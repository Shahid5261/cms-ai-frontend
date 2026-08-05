import "./DetailsModal.css";

function DetailsModal({ complaint, onClose }) {
  if (!complaint) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">

        <div className="modal-header">
          <h2>Complaint Details</h2>
          <button onClick={onClose}>✖</button>
        </div>

        <div className="modal-body">

          <h3>Customer Information</h3>

          <p><strong>Name:</strong> {complaint.customer_name}</p>
          <p><strong>Email:</strong> {complaint.email}</p>
          <p><strong>Product:</strong> {complaint.product}</p>

          <hr />

          <h3>Complaint</h3>

          <p>{complaint.complaint}</p>

          <hr />

          <h3>AI Analysis</h3>

          <p><strong>Summary:</strong> {complaint.complaint_summary}</p>

          <p><strong>Category:</strong> {complaint.category}</p>

          <p><strong>Severity:</strong> {complaint.severity}</p>

          <p><strong>Root Cause:</strong></p>

          <p>{complaint.root_cause}</p>

          <p><strong>CAPA:</strong></p>

          <p>{complaint.capa}</p>

          <p><strong>Suggested Response:</strong></p>

          <p>{complaint.suggested_response}</p>

          <hr />

          <p>
            <strong>Status:</strong> {complaint.status}
          </p>

        </div>

      </div>
    </div>
  );
}

export default DetailsModal;