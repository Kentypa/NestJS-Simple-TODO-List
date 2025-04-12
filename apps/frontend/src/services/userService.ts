import { formObject } from "../types/form-object";
import api from "../config/axios";

export function userService(url: string) {
  const getCurrentUser = async () => {
    return api
      .get(`${url}/me`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.toJSON());
        throw new Error(error.message);
      });
  };

  const deleteUser = async () => {
    return api.delete(url).catch((error) => {
      console.log(error.toJSON());
      throw new Error(error.message);
    });
  };

  const updateEmail = async (user: formObject) => {
    return api
      .patch(`${url}/update-email`, { email: user.email })
      .catch((error) => {
        console.log(error.toJSON());
        throw new Error(error.message);
      });
  };

  const updatePassword = async (passwordData: {
    currentPassword: string;
    newPassword: string;
  }) => {
    return api.patch(`${url}/update-password`, passwordData).catch((error) => {
      console.log(error.toJSON());
      throw new Error(error.message);
    });
  };

  return {
    deleteUser,
    updateEmail,
    updatePassword,
    getCurrentUser,
  };
}
