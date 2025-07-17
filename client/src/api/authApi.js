import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export const signup = (user) => axios.post(`${API}/auth/signup`, user);
export const login = (user) => axios.post(`${API}/auth/login`, user);
