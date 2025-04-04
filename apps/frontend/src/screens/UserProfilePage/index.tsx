import { FC, useEffect, useState } from "react";
import { PageWrapper } from "../../components/UI/PageWrapper";
import { useForm } from "../../hooks/use-form";
import { EditableInput } from "../../components/UI/EditableInput";
import { userService } from "../../services/userService";
import { Queries } from "../../enums/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { RoutesPaths } from "../../enums/routes-path";
import { authService } from "../../services/authService";
import { Modal } from "../../components/UI/Modal";
import { PasswordForm } from "../../components/PasswordForm";

export const UserProfilePage: FC = () => {
  const { getCurrentUser, updateEmail, updatePassword, deleteUser } =
    userService(Queries.USER);

  const { logoutUser } = authService(Queries.AUTH);

  const queryClient = useQueryClient();

  const navigation = useNavigate();

  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);

  const togglePasswordModal = () =>
    setIsPasswordModalVisible(!isPasswordModalVisible);

  const {
    data: user,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const changeUserEmailMutation = useMutation({
    mutationFn: updateEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      togglePasswordModal();
    },
  });

  const deleteAccountMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const { handleSubmit, handleChangeByValue } = useForm(
    { email: "", password: "" },
    (formState) => {
      changeUserEmailMutation.mutate(formState);
    }
  );

  useEffect(() => {
    if (isSuccess && user) {
      handleChangeByValue("email", user.email);
      handleChangeByValue("password", user.password);
    }
  }, [handleChangeByValue, isSuccess, user]);

  return (
    <PageWrapper>
      {isError && <div>Sign in/up to see user profile data</div>}
      {isSuccess && (
        <main className="flex flex-col p-8 gap-6 mt-10 border border-gray-300 rounded-2xl bg-white shadow-lg max-w-200 w-full">
          <h1 className="text-3xl font-semibold mb-6 text-gray-800">
            User Profile
          </h1>
          <h2 className="text-lg text-gray-600 mb-8">userID {user.id}</h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            name="setting-changes"
          >
            <div>
              <label className="block text-base font-medium text-gray-700">
                User email:
              </label>
              <EditableInput
                initialState={user.email}
                handleChangeByValue={(value) =>
                  handleChangeByValue("email", value)
                }
              />
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700">
                User password:
              </label>
              <div className="bg-gray-100 p-4 border rounded-xl flex justify-between items-center">
                <div className="flex items-center gap-2 w-full justify-between">
                  <h2 className="text-lg text-gray-800">••••••••</h2>
                  <button
                    type="button"
                    onClick={togglePasswordModal}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-gray-300 text-gray-800 px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-400 transition duration-300"
              >
                Save Changes
              </button>
              {changeUserEmailMutation.isError && (
                <h3>
                  Can`t make changes: {changeUserEmailMutation.error.message}
                </h3>
              )}
            </div>
            <div className="flex justify-between w-full">
              <button
                type="button"
                className="bg-gray-300 text-gray-800 px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-400 transition duration-300"
                onClick={() => {
                  logoutMutation.mutate();
                  navigation(RoutesPaths.MAIN_PAGE);
                }}
              >
                Logout
              </button>
              <button
                type="button"
                className="bg-red-300 text-gray-800 px-6 py-3 rounded-md text-lg font-medium hover:bg-red-400 transition duration-300"
                onClick={() => {
                  deleteAccountMutation.mutate();
                  navigation(RoutesPaths.MAIN_PAGE);
                }}
              >
                Remove user accout
              </button>
            </div>
          </form>

          <Modal
            visible={isPasswordModalVisible}
            toggleModal={togglePasswordModal}
            backgroundClassName="fixed inset-0 bg-[#000000ac] flex items-center justify-center z-10"
          >
            <PasswordForm
              toggleVisible={togglePasswordModal}
              handleUpdatePassword={(passwordData) =>
                changePasswordMutation.mutate(passwordData)
              }
              isLoading={changePasswordMutation.isPending}
              isError={changePasswordMutation.isError}
            />
          </Modal>
        </main>
      )}
    </PageWrapper>
  );
};
