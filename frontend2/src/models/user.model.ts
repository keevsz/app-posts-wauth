export interface User {
  id?: string;
  name: string;
  email: string;
  pic: string;
  verified: boolean;
  token: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserDataForRegistration {
  email: string;
  password: string;
  name: string;
  pic?: string;
}

export const UserEmptyState: User = {
  id: "",
  name: "",
  email: "",
  pic: "",
  verified: false,
  token: "",
};

export const EmailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,50}$/;
// al menos 4 caracteres, no más de 8 caracteres y debe incluir al menos una letra mayúscula, una letra minúscula y un dígito numérico.
