import { Injectable } from '@nestjs/common';
import { AddTodoDto } from 'src/todos/dto/add-todo.dto';
import { UpdateTodoDto } from 'src/todos/dto/update-todo.dto';
import { Todo } from 'src/todos/interfaces/todo.interface';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];

  currentID: number = 1;

  add(todo: AddTodoDto) {
    const newTodo: Todo = { ...todo, id: this.currentID++, isCompleted: false };
    this.todos.push(newTodo);
  }

  get(): Todo[] {
    return this.todos;
  }

  remove(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  update(id: number, todoInfo: UpdateTodoDto) {
    const index = this.todos.findIndex((todo) => todo.id === id);

    if (index !== -1) {
      this.todos[index] = {
        ...this.todos[index],
        description: todoInfo.description,
        isCompleted: todoInfo.isCompleted,
      };
    }
  }
}
