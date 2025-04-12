import { FC, useMemo } from "react";
import { TodoList } from "../TodoList";
import { useForm } from "../../hooks/use-form";
import { todoService } from "../../services/todoService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Queries } from "../../enums/queries";
import { RoutesPaths } from "../../enums/routes-path";

export const TodosContent: FC = () => {
  const queryClient = useQueryClient();

  const { addTodo, getTodos } = useMemo(
    () => todoService(RoutesPaths.TODOS),
    []
  );

  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: [Queries.TODOS],
    queryFn: getTodos,
  });

  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Queries.TODOS] });
    },
  });

  const { formState, handleChange, handleSubmit } = useForm(
    { task: "" },
    addTodoMutation.mutate
  );

  return (
    <div className="flex flex-col gap-10 mt-10 max-h-[506px]">
      <form onSubmit={handleSubmit}>
        <label>TODOS:</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-700"
          name="task"
          value={formState.description}
          onChange={handleChange}
        />
      </form>
      {isLoading && (
        <div className="flex justify-center items-center">
          <h3>Todos is loading</h3>
        </div>
      )}
      {isSuccess && <TodoList todos={data} />}
      {isError && (
        <div className="flex justify-center items-center">
          <h3>Todos can`t be loaded: </h3>
          <p>{error.message}</p>
        </div>
      )}
    </div>
  );
};
