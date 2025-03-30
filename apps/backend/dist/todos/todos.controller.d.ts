import { TodosService } from "./todos.service";
import { AddTodoDto } from "src/todos/dto/add-todo.dto";
import { UpdateTodoDto } from "src/todos/dto/update-todo.dto";
import { GetTodoDto } from "./dto/get-todo.dto";
export declare class TodosController {
    private todoService;
    constructor(todoService: TodosService);
    getTodos(): Promise<GetTodoDto[]>;
    addTodo(addTodo: AddTodoDto): Promise<import("./entities/todo.entity").Todo>;
    removeTodo(id: number): Promise<import("./entities/todo.entity").Todo>;
    updateTodo(id: number, updatedInfo: UpdateTodoDto): Promise<import("./entities/todo.entity").Todo>;
}
