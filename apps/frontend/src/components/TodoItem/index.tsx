import { ChangeEvent, FC, KeyboardEvent } from "react";
import { TodoItemType } from "../../types/todo-item";
import { useTodoItem } from "../../hooks/use-todo-item";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Queries } from "../../enums/queries";
import { todoService } from "../../services/todoService";
import { TodoActionButtons } from "../TodoActionButtons";
import TextareaAutosize from "react-textarea-autosize";

type TodoItemProps = {
  todo: TodoItemType;
};

export const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const queryClient = useQueryClient();

  const { removeTodo, updateTodo } = todoService("/todos");

  const { task, id, isCompleted } = todo;

  const removeTodoMutation = useMutation({
    mutationFn: removeTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Queries.TODOS] });
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Queries.TODOS] });
    },
  });

  const {
    isChecked,
    isEditing,
    tempDescription,
    toggleChecking,
    toggleEditing,
    handleChange,
    handleChangeByValue,
  } = useTodoItem(isCompleted, task);

  function handleEditingEnter(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter") {
      toggleEditing();
      updateTodoMutation.mutate({
        id,
        task: tempDescription,
        isCompleted: isChecked,
      });
    }
  }

  function handleEditingClose(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Escape") {
      toggleEditing();
      handleChangeByValue(task);
    }
  }

  function handleKeyAction(e: KeyboardEvent<HTMLTextAreaElement>) {
    handleEditingEnter(e);
    handleEditingClose(e);
  }

  function handleChecking(e: ChangeEvent<HTMLInputElement>) {
    toggleChecking();
    updateTodoMutation.mutate({
      id,
      task,
      isCompleted: e.target.checked,
    });
  }

  return (
    <div className="relative flex justify-between w-full p-4 bg-gray-500">
      <div className="flex gap-2 items-center">
        <input type="checkbox" checked={isChecked} onChange={handleChecking} />
        {isEditing ? (
          <TextareaAutosize
            className="bg-gray-100 border rounded-xl p-1"
            value={tempDescription}
            onChange={handleChange}
            onKeyDown={handleKeyAction}
          />
        ) : (
          <p
            className={`${
              isChecked && "text-green-500 line-through"
            } break-words w-auto flex-grow max-w-[200px]`}
          >
            {task}
          </p>
        )}
      </div>
      {!isEditing && (
        <TodoActionButtons
          handleRemove={() => removeTodoMutation.mutate(id)}
          toggleEditing={toggleEditing}
        />
      )}
    </div>
  );
};
