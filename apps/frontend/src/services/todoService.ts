import { formObject } from "../types/form-object";
import { TodoItemType } from "../types/todo-item";
import api from "../config/axios";

export function todoService(url: string) {
  const addTodo = async (formState: formObject) => {
    return api.post(url, formState).catch((error) => {
      console.log(error.toJSON());
      throw new Error(error.message);
    });
  };

  const getTodos = async () => {
    return api
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.toJSON());
        throw new Error(error.message);
      });
  };

  const removeTodo = async (id: number) => {
    return api.delete(url, { params: { id: id } }).catch((error) => {
      console.log(error.toJSON());
      throw new Error(error.message);
    });
  };

  const updateTodo = async (todo: TodoItemType) => {
    return api
      .put(
        url,
        { task: todo.task, isCompleted: todo.isCompleted },
        {
          params: {
            id: todo.id,
          },
        }
      )
      .catch((error) => {
        console.log(error.toJSON());
        throw new Error(error.message);
      });
  };

  return { addTodo, getTodos, removeTodo, updateTodo };
}
