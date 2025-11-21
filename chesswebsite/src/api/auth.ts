import axios from "axios";
import { RegisterPayload, LoginPayload, User } from "../types";

const API = "http://localhost:8080/api/auth";

export const registerUser = async (user: RegisterPayload) => {
  return axios.post<User>(`${API}/register`, user);
};

export const loginUser = async (data: LoginPayload) => {
  return axios.post<{ token: string; user: User }>(`${API}/login`, data);
};
