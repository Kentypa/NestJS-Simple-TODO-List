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
  Session,
  UnauthorizedException,
  UseFilters,
  ValidationPipe,
} from "@nestjs/common";
import { TodosService } from "./todos.service";
import { AddTodoDto } from "src/todos/dto/add-todo.dto";
import { UpdateTodoDto } from "src/todos/dto/update-todo.dto";
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
  @ApiOperation({ summary: "Get user's todos" })
  @ApiResponse({ status: 200, description: "Array of todos" })
  @HttpCode(200)
  async getTodos(@Session() session: Record<string, any>) {
    if (!session.userId) {
      throw new UnauthorizedException("Not authenticated");
    }
    return this.todoService.getByUser(session.userId);
  }

  @Post()
  @ApiOperation({ summary: "Add a new todo" })
  @ApiResponse({ status: 201, description: "Todo created successfully" })
  @ApiBody({ type: AddTodoDto })
  @HttpCode(201)
  async addTodo(
    @Body(new ValidationPipe()) addTodo: AddTodoDto,
    @Session() session: Record<string, any>
  ) {
    if (!session.userId) {
      throw new UnauthorizedException("Not authenticated");
    }
    return this.todoService.add(addTodo, session.userId);
  }

  @Delete()
  @ApiOperation({ summary: "Remove a todo" })
  @ApiResponse({ status: 200, description: "Todo removed successfully" })
  @ApiQuery({ name: "id", type: "number", example: 1 })
  @HttpCode(200)
  async removeTodo(
    @Query("id", ParseIntPipe) id: number,
    @Session() session: Record<string, any>
  ) {
    if (!session.userId) {
      throw new UnauthorizedException("Not authenticated");
    }
    return this.todoService.remove(id, session.userId);
  }

  @Put()
  @ApiOperation({ summary: "Update a todo" })
  @ApiResponse({ status: 200, description: "Todo updated successfully" })
  @ApiQuery({ name: "id", type: "number", example: 1 })
  @ApiBody({ type: UpdateTodoDto })
  @HttpCode(200)
  async updateTodo(
    @Query("id", ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updatedInfo: UpdateTodoDto,
    @Session() session: Record<string, any>
  ) {
    if (!session.userId) {
      throw new UnauthorizedException("Not authenticated");
    }

    return this.todoService.update(id, updatedInfo, session.userId);
  }
}
