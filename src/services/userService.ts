import axios from "axios";
import { User } from "../model/User";

const baseUrl = "https://63dd490b2308e3e319f8f6ce.mockapi.io/";

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${baseUrl}/users`);
  return response.data;
};

export const getUser = async (id: string): Promise<User> => {
  const response = await axios.get(`${baseUrl}/users/${id}`);
  return response.data;
};

export const createUser = async (user?: User): Promise<User> => {
  const response = await axios.post(`${baseUrl}/users`, user);
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await axios.delete(`${baseUrl}/users/${id}`);
};

export const updateUser = async (id: string, user: User): Promise<User> => {
  const response = await axios.put(`${baseUrl}/users/${id}`, user);
  return response.data;
};
