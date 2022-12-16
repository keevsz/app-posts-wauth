import axios from "axios";

export const getChatService = (userId: string) => {
  const data = { userId };
  const response = axios.post<any>(`/api/chat/`, data);
  return response;
};
