import { AddTodoDto } from "src/todos/dto/add-todo.dto";
import { UpdateTodoDto } from "src/todos/dto/update-todo.dto";
import { Repository } from "typeorm";
import { Todo } from "./entities/todo.entity";
export declare class TodosService {
    private todosRepository;
    constructor(todosRepository: Repository<Todo>);
    add(todo: AddTodoDto): Promise<Todo>;
    get(): Promise<Todo[]>;
    getById(id: number): Promise<Todo>;
    remove(id: number): Promise<Todo>;
    update(id: number, todoInfo: UpdateTodoDto): Promise<Todo>;
}
