import axios from "axios";

export const getUsersFiltered = (search: any) => {
  const response = axios.get<any>(
    `http://localhost:5000/api/user?search=${search}`
  );
  return response;
};

export const getUserService = (id: any) => {
  const response = axios.get<any>(
    `http://localhost:5000/api/user/${id}`
  );
  return response;
};