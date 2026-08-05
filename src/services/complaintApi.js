import API from "../api";

export const getComplaints = async () => {
  const response = await API.get("/complaints/");
  return response.data;
};

export const deleteComplaint = async (id) => {
  const response = await API.delete(`/complaints/${id}`);
  return response.data;
};