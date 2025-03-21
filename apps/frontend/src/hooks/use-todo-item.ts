import { ChangeEvent, useState } from "react";

export function useTodoItem(isCompleted: boolean, description: string) {
  const [tempDescription, setTempDescription] = useState(description);
  const [isEditing, setIsEditing] = useState(false);
  const [isChecked, setIsChecked] = useState(isCompleted);

  function toggleChecking() {
    setIsChecked((prev) => !prev);
  }

  function toggleEditing() {
    setIsEditing((prev) => !prev);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setTempDescription(e.target.value);
  }

  function handleChangeByValue(value: string) {
    setTempDescription(value);
  }

  return {
    isChecked,
    toggleChecking,
    isEditing,
    toggleEditing,
    tempDescription,
    handleChange,
    handleChangeByValue,
  };
}
