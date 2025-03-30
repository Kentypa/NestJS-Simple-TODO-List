import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AddTodoDto } from "src/todos/dto/add-todo.dto";
import { UpdateTodoDto } from "src/todos/dto/update-todo.dto";
import { Repository } from "typeorm";
import { Todo } from "./entities/todo.entity";

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>
  ) {}

  async add(todo: AddTodoDto) {
    const newTodo = this.todosRepository.create({
      ...todo,
      isCompleted: false,
    });
    return this.todosRepository.save(newTodo);
  }

  get(): Promise<Todo[]> {
    return this.todosRepository.find();
  }

  async getById(id: number): Promise<Todo> {
    const todo = await this.todosRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  async remove(id: number) {
    const todo = await this.getById(id);
    return this.todosRepository.remove(todo);
  }

  async update(id: number, todoInfo: UpdateTodoDto) {
    const todo = await this.getById(id);
    const updatedTodo = this.todosRepository.merge(todo, todoInfo);
    return this.todosRepository.save(updatedTodo);
  }
}
