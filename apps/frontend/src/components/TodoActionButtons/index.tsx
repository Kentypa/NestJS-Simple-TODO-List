import { FC } from "react";

type TodoActionButtonsProps = {
  handleRemove: () => void;
  toggleEditing: () => void;
};

export const TodoActionButtons: FC<TodoActionButtonsProps> = ({
  handleRemove,
  toggleEditing,
}) => {
  return (
    <div className="flex gap-2 items-center">
      <button onClick={toggleEditing}>📝</button>
      <button onClick={handleRemove}>❌</button>
    </div>
  );
};
