import { formObject } from "../types/form-object";
import api from "../config/axios";

export function authService(url: string) {
  const signInUser = async (formState: formObject) => {
    return api.post(`${url}/login`, formState).catch((error) => {
      console.log(error.toJSON());
      throw new Error(error.message);
    });
  };

  const signUpUser = async (formState: formObject) => {
    return api.post(`${url}/register`, formState).catch((error) => {
      console.log(error.toJSON());
      throw new Error(error.message);
    });
  };

  const logoutUser = async () => {
    return api.post(`${url}/logout`).catch((error) => {
      console.log(error.toJSON());
      throw new Error(error.message);
    });
  };

  return {
    logoutUser,
    signInUser,
    signUpUser,
  };
}
