// api.ts
import axios from "axios";

const API_URL = "http://192.168.1.103:3000/parseils";


export const fetchParseils = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// export const createTodo = async (title) => {
//   const response = await axios.post(API_URL, { title, completed: false });
//   return response.data;
// };

// export const updateTodo = async (id, completed) => {
//   const response = await axios.patch(`${API_URL}/${id}`, { completed });
//   return response.data;
// };

export const deleteParseil = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (error) {
    console.error("Error deleting parseil:", error);
  }
};
