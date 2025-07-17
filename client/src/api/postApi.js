import axios from "axios";
const API = import.meta.env.VITE_API_URL;
const token = () => localStorage.getItem("token");

export const getPosts = () => axios.get(`${API}/posts`);
export const createPost = (post) =>
  axios.post(`${API}/posts`, post, {
    headers: { Authorization: `Bearer ${token()}` },
  });

export const votePost = (id, type) =>
  axios.put(
    `${API}/posts/${id}/vote`,
    { type },
    { headers: { Authorization: `Bearer ${token()}` } }
  );

export const toggleSolved = (id) =>
  axios.put(
    `${API}/posts/${id}/solved`,
    {},
    { headers: { Authorization: `Bearer ${token()}` } }
  );
