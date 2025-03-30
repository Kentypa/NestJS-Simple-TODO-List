import { FC } from "react";
import { TodoItemType } from "../../types/todo-item";
import { TodoItem } from "../TodoItem";

type TodoListProps = {
  todos: TodoItemType[];
};

export const TodoList: FC<TodoListProps> = ({ todos }) => {
  return (
    <ul className="flex flex-col size-full max-w-100 max-h-100 border border-b-gray-600 rounded-2xl overflow-y-auto scroll-smooth">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
