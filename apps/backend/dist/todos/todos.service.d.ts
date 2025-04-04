import { Repository } from "typeorm";
import { Todo } from "./entities/todo.entity";
import { AddTodoDto } from "src/todos/dto/add-todo.dto";
import { UpdateTodoDto } from "src/todos/dto/update-todo.dto";
export declare class TodosService {
    private todosRepository;
    constructor(todosRepository: Repository<Todo>);
    add(todoDto: AddTodoDto, userId: number): Promise<Todo>;
    getByUser(userId: number): Promise<Todo[]>;
    getById(id: number, userId: number): Promise<Todo>;
    remove(id: number, userId: number): Promise<Todo>;
    update(id: number, todoInfo: UpdateTodoDto, userId: number): Promise<Todo>;
}
