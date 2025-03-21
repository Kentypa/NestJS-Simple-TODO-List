import { FC, KeyboardEvent } from "react";
import { TodoItemType } from "../../types/todo-item";
import { useTodoItem } from "../../hooks/use-todo-item";

type TodoItemProps = {
  todo: TodoItemType;
  handleRemove: (id: number) => void;
  handleUpdate: (todo: TodoItemType) => void;
};

export const TodoItem: FC<TodoItemProps> = ({
  todo,
  handleRemove,
  handleUpdate,
}) => {
  const { description, id, isCompleted } = todo;

  const {
    isChecked,
    isEditing,
    toggleChecking,
    toggleEditing,
    tempDescription,
    handleChange,
    handleChangeByValue,
  } = useTodoItem(isCompleted, description);

  function handleEditingEnter(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      toggleEditing();
      handleUpdate({
        id: id,
        description: tempDescription,
        isCompleted: isChecked,
      });
    }
  }

  function handleEditingClose(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      toggleEditing();
      handleChangeByValue(description);
      console.log("Camera man");
    }
  }

  function handleKeyAction(e: KeyboardEvent<HTMLInputElement>) {
    const actionList = [handleEditingEnter, handleEditingClose];

    actionList.map((action) => action(e));
  }

  return (
    <div className="relative flex justify-between w-full p-4 bg-gray-500 max-h-[56px]">
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => {
            toggleChecking();
            handleUpdate({
              id: id,
              description: description,
              isCompleted: e.target.checked,
            });
          }}
        />
        {isEditing ? (
          <div>
            <input
              className="bg-gray-100 border rounded-xl p-1 w-full"
              value={tempDescription}
              onChange={handleChange}
              onKeyDown={handleKeyAction}
            />
          </div>
        ) : (
          <p className={`${isChecked && "text-green-500 line-through"}`}>
            {description}
          </p>
        )}
      </div>
      {!isEditing && (
        <div className="flex gap-2 items-center">
          <button
            onClick={() => {
              toggleEditing();
            }}
          >
            📝
          </button>
          <button
            onClick={() => {
              handleRemove(id);
            }}
          >
            ❌
          </button>
        </div>
      )}
    </div>
  );
};
