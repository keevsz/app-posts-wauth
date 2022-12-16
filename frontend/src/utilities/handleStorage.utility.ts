import { User } from "@/models";

export const loadUserToLocalStorageAndCookie = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
  document.cookie = "token=" + user.token + ";path=/";
};

export const getFromLocalStorage = (key: string) => {
  const getData = localStorage.getItem(key);
  return getData ? JSON.parse(getData) : null;
};

export const getFromCookie = (key: string) =>
  document.cookie.split(`${key}=`)[1];
