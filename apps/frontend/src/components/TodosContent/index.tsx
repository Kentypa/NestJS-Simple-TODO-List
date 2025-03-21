import { FC } from "react";
import { TodoList } from "../TodoList";
import { useForm } from "../../hooks/use-form";
import { todoService } from "../../services/todoService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const TodosContent: FC = () => {
  const queryClient = useQueryClient();

  const { addTodo, getTodos, removeTodo, updateTodo } = todoService(
    "http://localhost:3000/todos"
  );

  const getTodosQuery = useQuery({ queryKey: ["todos"], queryFn: getTodos });

  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const removeTodoMutation = useMutation({
    mutationFn: removeTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { formState, handleChange, handleSubmit } = useForm(
    { description: "" },
    addTodoMutation.mutate
  );

  return (
    <div className="flex flex-col gap-10 mt-10 max-h-[506px]">
      <form onSubmit={handleSubmit}>
        <label>TODOS:</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-700"
          name="description"
          value={formState.description}
          onChange={handleChange}
        />
      </form>
      <TodoList
        todos={getTodosQuery.data ?? []}
        handleRemove={removeTodoMutation.mutate}
        handleUpdate={updateTodoMutation.mutate}
      />
    </div>
  );
};
