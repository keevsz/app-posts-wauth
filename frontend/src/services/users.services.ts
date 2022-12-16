import axios from "axios";

export const getUsersFiltered = (search: string) => {
  const response = axios.get<any>(
    `/api/user?search=${search}`
  );
  return response;
};

export const getUserService = (id: string) => {
  const response = axios.get<any>(
    `/api/user/${id}`
  );
  return response;
};