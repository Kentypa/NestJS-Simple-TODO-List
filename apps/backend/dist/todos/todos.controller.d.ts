import { TodosService } from "./todos.service";
import { AddTodoDto } from "src/todos/dto/add-todo.dto";
import { UpdateTodoDto } from "src/todos/dto/update-todo.dto";
export declare class TodosController {
    private todoService;
    constructor(todoService: TodosService);
    getTodos(session: Record<string, any>): Promise<import("./entities/todo.entity").Todo[]>;
    addTodo(addTodo: AddTodoDto, session: Record<string, any>): Promise<import("./entities/todo.entity").Todo>;
    removeTodo(id: number, session: Record<string, any>): Promise<import("./entities/todo.entity").Todo>;
    updateTodo(id: number, updatedInfo: UpdateTodoDto, session: Record<string, any>): Promise<import("./entities/todo.entity").Todo>;
}
