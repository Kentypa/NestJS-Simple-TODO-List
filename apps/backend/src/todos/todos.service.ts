import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Todo } from "./entities/todo.entity";
import { AddTodoDto } from "src/todos/dto/add-todo.dto";
import { UpdateTodoDto } from "src/todos/dto/update-todo.dto";

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>
  ) {}

  async add(todoDto: AddTodoDto, userId: number) {
    const newTodo = this.todosRepository.create({
      ...todoDto,
      user: { id: userId },
    });

    return this.todosRepository.save(newTodo);
  }

  getByUser(userId: number): Promise<Todo[]> {
    return this.todosRepository.find({ where: { user: { id: userId } } });
  }

  async getById(id: number, userId: number): Promise<Todo> {
    const todo = await this.todosRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    return todo;
  }

  async remove(id: number, userId: number) {
    const todo = await this.getById(id, userId);

    return this.todosRepository.remove(todo);
  }

  async update(id: number, todoInfo: UpdateTodoDto, userId: number) {
    const todo = await this.getById(id, userId);

    const updatedTodo = this.todosRepository.merge(todo, todoInfo);

    return this.todosRepository.save(updatedTodo);
  }
}
