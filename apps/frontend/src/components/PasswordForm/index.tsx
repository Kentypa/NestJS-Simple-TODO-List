import { FC } from "react";
import { useForm } from "../../hooks/use-form";

type PasswordFormProps = {
  toggleVisible: () => void;
  handleUpdatePassword: (passwordData: {
    currentPassword: string;
    newPassword: string;
  }) => void;
  isLoading: boolean;
  isError: boolean;
};

export const PasswordForm: FC<PasswordFormProps> = ({
  toggleVisible,
  handleUpdatePassword,
  isLoading,
  isError,
}) => {
  const { formState, handleChange, handleSubmit } = useForm(
    { currentPassword: "", newPassword: "" },
    (formState) => {
      handleUpdatePassword({
        currentPassword: formState.currentPassword as string,
        newPassword: formState.newPassword as string,
      });
    }
  );

  return (
    <form
      className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Change Password
      </h2>

      <div className="mb-4">
        <label
          htmlFor="currentPassword"
          className="block text-base font-medium text-gray-700 mb-1"
        >
          Current password
        </label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          value={formState.currentPassword}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          required
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="newPassword"
          className="block text-base font-medium text-gray-700 mb-1"
        >
          New password
        </label>
        <input
          type="password"
          name="newPassword"
          id="newPassword"
          value={formState.newPassword}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          required
        />
      </div>

      {isError && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
          {"Failed to update password. Please try again."}
        </div>
      )}

      <div className="flex justify-between w-full">
        <button
          type="submit"
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Submit"}
        </button>
        <button
          type="button"
          onClick={toggleVisible}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
