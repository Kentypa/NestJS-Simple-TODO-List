import { ChangeEvent, FC, useState } from "react";

type EditableInputProps = {
  initialState: string | number;
  handleChangeByValue: (value: string | number) => void;
};

export const EditableInput: FC<EditableInputProps> = ({
  handleChangeByValue,
  initialState,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(initialState);

  const toggleEditing = () => setIsEditing(!isEditing);

  const handleSave = () => {
    handleChangeByValue(tempValue);
    toggleEditing();
  };

  const handleCancel = () => {
    setTempValue(initialState);
    toggleEditing();
  };

  return (
    <div className="bg-gray-100 p-4 border rounded-xl flex justify-between items-center">
      <div className="flex items-center gap-2 w-full justify-between">
        {isEditing ? (
          <>
            <input
              type="text"
              value={tempValue}
              className="p-2 border rounded-md w-full text-gray-700"
              autoComplete="on"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTempValue(e.target.value)
              }
            />
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <h2 className="text-lg text-gray-800">{tempValue}</h2>
            <button
              type="button"
              onClick={toggleEditing}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};
