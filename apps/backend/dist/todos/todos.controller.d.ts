import { Todo } from 'src/todos/interfaces/todo.interface';
import { TodosService } from './todos.service';
import { AddTodoDto } from 'src/todos/dto/add-todo.dto';
import { UpdateTodoDto } from 'src/todos/dto/update-todo.dto';
export declare class TodosController {
    private todoService;
    constructor(todoService: TodosService);
    getTodos(): Promise<Todo[]>;
    addTodo(addTodo: AddTodoDto): Promise<void>;
    removeTodo(id: number): Promise<void>;
    updateTodo(id: number, updatedInfo: UpdateTodoDto): Promise<void>;
}
