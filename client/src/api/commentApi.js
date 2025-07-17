import axios from "axios";
const API = import.meta.env.VITE_API_URL;
const token = () => localStorage.getItem("token");

export const addComment = (postId, text) =>
  axios.post(
    `${API}/comments`,
    { postId, text },
    { headers: { Authorization: `Bearer ${token()}` } }
  );

export const getComments = (postId) => axios.get(`${API}/comments/${postId}`);
