import axios from "axios";
import { formObject } from "../types/form-object";
import { TodoItemType } from "../types/todo-item";

export function todoService(url: string) {
  const addTodo = async (formState: formObject) => {
    return axios.post(url, formState);
  };

  const getTodos = async () => {
    return (await axios.get(url)).data;
  };

  const removeTodo = async (id: number) => {
    return axios.delete(url, { params: { id: id } });
  };

  const updateTodo = async (todo: TodoItemType) => {
    return axios.put(
      url,
      { description: todo.description, isCompleted: todo.isCompleted },
      {
        params: {
          id: todo.id,
        },
      }
    );
  };

  return { addTodo, getTodos, removeTodo, updateTodo };
}
