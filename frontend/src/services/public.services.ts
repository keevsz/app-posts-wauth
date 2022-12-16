import axios from "axios";
import {
  User,
  UserCredentials,
} from "../models/user.model";
import { loadAbort } from "../utilities/loadAbort.utility";
const baseURL = import.meta.env.VITE_APP_URL_BACKEND


export const login = ({ email, password }: Partial<UserCredentials>) => {
  const controller = loadAbort();
  const userCredentials = { email, password };
  return {
    call: axios.post<User>(
      `${baseURL}/api/user/login`,
      userCredentials,
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};

export const registerUser = ({
  email,
  password,
  name,
  pic,
}: Partial<UserCredentials>) => {
  const controller = loadAbort();
  const userData = { email, password, name, pic };
  return {
    call: axios.post<User>(
      `${baseURL}/api/user/register`,
      userData,
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};

export const verifyTokenAndGetUser = (token: string) => {
  const response = axios.get<any>(
    `${baseURL}/api/user/verify-token/${token}`
  );
  return response;
};

export const uploadImg = (files: any) => {
  const controller = loadAbort();
  const data = new FormData();
  data.append("file", files);
  data.append("upload_preset", "chat-app");
  data.append("cloud_name", "dalp4xrqs");
  return {
    call: axios.post(
      "https://api.cloudinary.com/v1_1/dalp4xrqs/image/upload",
      data,
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};

export const sendEmailToVerify = (email: String) => {
  const controller = loadAbort();
  const data = { userEmail: email, type: "email-verify" };
  return {
    call: axios.post(
      `${baseURL}/api/user/email-verify`,
      data,
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};

export const sendEmailChangePassword = (email: String) => {
  const controller = loadAbort();
  const data = { userEmail: email, type: "password-reset" };
  return {
    call: axios.post(
      `${baseURL}/api/user/password-reset`,
      data,
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};

export const changePasswordService = (password: String,userId:String |undefined,token:String | undefined) => {
  const controller = loadAbort();
  const data = { newPassword: password };  
  return {
    call: axios.post(
      `${baseURL}/api/user/password-reset/${userId}/${token}`,
      data,
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};
