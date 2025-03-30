import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseFilters,
  ValidationPipe,
} from "@nestjs/common";
import { TodosService } from "./todos.service";
import { AddTodoDto } from "src/todos/dto/add-todo.dto";
import { UpdateTodoDto } from "src/todos/dto/update-todo.dto";
import { GetTodoDto } from "./dto/get-todo.dto";
import { HttpExceptionFilter } from "src/shared/filters/http-exception.filter";
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
} from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags("todos")
@Controller("todos")
@UseFilters(HttpExceptionFilter)
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get()
  @ApiOperation({ summary: "Get array of todos" })
  @ApiResponse({
    status: 200,
    description: "Array of todos",
    type: [GetTodoDto],
  })
  @HttpCode(200)
  async getTodos(): Promise<GetTodoDto[]> {
    return this.todoService.get();
  }

  @Post()
  @ApiOperation({ summary: "Add todo to database" })
  @ApiResponse({
    status: 201,
    description: "Todo created successfully",
  })
  @ApiBody({
    type: AddTodoDto,
    description: "Todo task information",
  })
  @HttpCode(201)
  async addTodo(@Body(new ValidationPipe()) addTodo: AddTodoDto) {
    return this.todoService.add(addTodo);
  }

  @Delete()
  @ApiOperation({ summary: "Remove todo from database" })
  @ApiResponse({
    status: 200,
    description: "Todo removed successfully",
  })
  @ApiQuery({
    name: "id",
    description: "ID of todo",
    type: "number",
    example: 1,
  })
  @HttpCode(200)
  async removeTodo(@Query("id", ParseIntPipe) id: number) {
    return this.todoService.remove(id);
  }

  @Put()
  @ApiOperation({ summary: "Update todo from database" })
  @ApiResponse({
    status: 200,
    description: "Todo updated successfully",
  })
  @ApiQuery({
    name: "id",
    description: "ID of todo",
    type: "number",
    example: 1,
  })
  @ApiBody({
    type: UpdateTodoDto,
    description: "Updated todo information",
  })
  @HttpCode(200)
  async updateTodo(
    @Query("id", ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updatedInfo: UpdateTodoDto
  ) {
    return this.todoService.update(id, updatedInfo);
  }
}
