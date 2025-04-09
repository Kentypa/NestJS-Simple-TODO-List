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
  UseGuards,
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
import { UserDecorator } from "src/shared/decorators/user.decorator";
import { User } from "src/shared/entities/user.entity";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";

@ApiBearerAuth()
@ApiTags("todos")
@Controller("todos")
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get()
  @ApiOperation({ summary: "Get user's todos" })
  @ApiResponse({ status: 200, description: "Array of todos" })
  @HttpCode(200)
  async getTodos(@UserDecorator() user: User) {
    return this.todoService.getByUser(user.id);
  }

  @Post()
  @ApiOperation({ summary: "Add a new todo" })
  @ApiResponse({ status: 201, description: "Todo created successfully" })
  @ApiBody({ type: AddTodoDto })
  @HttpCode(201)
  async addTodo(
    @Body(new ValidationPipe()) addTodo: AddTodoDto,
    @UserDecorator() user: User
  ) {
    return this.todoService.add(addTodo, user.id);
  }

  @Delete()
  @ApiOperation({ summary: "Remove a todo" })
  @ApiResponse({ status: 200, description: "Todo removed successfully" })
  @ApiQuery({ name: "id", type: "number", example: 1 })
  @HttpCode(200)
  async removeTodo(
    @Query("id", ParseIntPipe) id: number,
    @UserDecorator() user: User
  ) {
    return this.todoService.remove(id, user.id);
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
    @UserDecorator() user: User
  ) {
    return this.todoService.update(id, updatedInfo, user.id);
  }
}
