import axios from "axios";

export const getChatService = (userId: any) => {
  const data = { userId };
  const response = axios.post<any>(`http://localhost:5000/api/chat/`, data);
  return response;
};
