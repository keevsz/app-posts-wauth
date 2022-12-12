import axios from "axios";

export const getUsersFiltered = (search: any) => {
  const response = axios.get<any>(
    `http://localhost:5000/api/user?search=${search}`
  );
  return response;
};

