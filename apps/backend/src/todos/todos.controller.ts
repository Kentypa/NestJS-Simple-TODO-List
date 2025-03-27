import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseFilters,
  ValidationPipe,
} from "@nestjs/common";
import { Todo } from "src/todos/interfaces/todo.interface";
import { TodosService } from "./todos.service";
import { AddTodoDto } from "src/todos/dto/add-todo.dto";
import { UpdateTodoDto } from "src/todos/dto/update-todo.dto";
import { HttpExceptionFilter } from "src/shared/filters/http-exception.filter";

@Controller("todos")
@UseFilters(HttpExceptionFilter)
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get()
  async getTodos(): Promise<Todo[]> {
    return this.todoService.get();
  }

  @Post()
  async addTodo(@Body(new ValidationPipe()) addTodo: AddTodoDto) {
    this.todoService.add(addTodo);
  }

  @Delete()
  async removeTodo(@Query("id", ParseIntPipe) id: number) {
    this.todoService.remove(id);
  }

  @Put()
  async updateTodo(
    @Query("id", ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updatedInfo: UpdateTodoDto
  ) {
    this.todoService.update(id, updatedInfo);
  }
}
