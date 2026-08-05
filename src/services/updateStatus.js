import API from "../api";

export const updateStatus = async (id, status) => {
  const response = await API.put(
    `/complaints/${id}/status`,
    null,
    {
      params: { status },
    }
  );

  return response.data;
};