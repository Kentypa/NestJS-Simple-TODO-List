import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Todo } from 'src/todos/interfaces/todo.interface';
import { TodosService } from './todos.service';
import { AddTodoDto } from 'src/todos/dto/add-todo.dto';
import { UpdateTodoDto } from 'src/todos/dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get()
  async getTodos(): Promise<Todo[]> {
    return this.todoService.get();
  }

  @Post()
  async addTodo(@Body() addTodo: AddTodoDto) {
    this.todoService.add(addTodo);
  }

  @Delete()
  async removeTodo(@Query('id', ParseIntPipe) id: number) {
    this.todoService.remove(id);
  }

  @Put()
  async updateTodo(@Query('id', ParseIntPipe) id: number, @Body() updatedInfo: UpdateTodoDto) {
    this.todoService.update(id, updatedInfo);
  }
}
